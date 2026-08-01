// 通知管理
import { db } from './db.js';
import { store } from './store.js';
import { getDayOfWeek, icons } from './utils.js';
import { trainingPlan } from '../data/training-plan.js';
import { recipes } from '../data/recipes.js';

class NotificationManager {
  constructor() {
    this.permission = 'default';
    this.timers = new Map();
    this.pollInterval = null;
    this._visibilityBound = false;
  }

  // 检查是否支持通知（多种方式）
  isSupported() {
    return ('Notification' in window) || ('serviceWorker' in navigator);
  }

  async requestPermission() {
    // 方式1: 标准 Notification API
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        this.permission = 'granted';
        return true;
      }
      if (Notification.permission !== 'denied') {
        try {
          this.permission = await Notification.requestPermission();
          return this.permission === 'granted';
        } catch (e) {}
      }
    }

    // 方式2: 某些 Android 浏览器需要通过 SW 申请
    if ('serviceWorker' in navigator) {
      try {
        const reg = await navigator.serviceWorker.getRegistration();
        if (reg && 'Notification' in window) {
          this.permission = Notification.permission;
          return this.permission === 'granted';
        }
        // SW 注册了但 Notification 不在 window 上
        // PWA 模式下可能仍然可以发通知
        if (reg) {
          this.permission = 'granted'; // 假设 PWA 模式已授权
          return true;
        }
      } catch (e) {}
    }

    return false;
  }

  // 调度所有提醒
  async scheduleAll() {
    this.timers.forEach(t => clearTimeout(t));
    this.timers.clear();

    const reminders = await db.getAll('reminders');
    const enabled = reminders.filter(r => r.enabled);
    for (const r of enabled) {
      this.scheduleNext(r);
    }

    if (!this.pollInterval) {
      this.pollInterval = setInterval(() => this.checkDueReminders(), 15000);
    }

    if (!this._visibilityBound) {
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
          this.checkDueReminders();
          this.scheduleAll();
        }
      });
      window.addEventListener('pageshow', () => {
        this.checkDueReminders();
      });
      this._visibilityBound = true;
    }
  }

  clearAll() {
    this.timers.forEach(t => clearTimeout(t));
    this.timers.clear();
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
      this.pollInterval = null;
    }
  }

  scheduleNext(reminder) {
    const now = new Date();
    const [h, m] = reminder.time.split(':').map(Number);
    let next = new Date();
    next.setHours(h, m, 0, 0);

    if (next <= now) {
      next.setDate(next.getDate() + 1);
    }

    while (!reminder.days.includes(next.getDay())) {
      next.setDate(next.getDate() + 1);
    }

    const delay = next - now;

    const timerId = setTimeout(async () => {
      await this.fire(reminder);
      const fresh = await db.get('reminders', reminder.id);
      if (fresh && fresh.enabled) {
        this.scheduleNext(fresh);
      }
    }, delay);

    this.timers.set(reminder.id, timerId);
  }

  async checkDueReminders() {
    const now = new Date();
    const todayKey = now.toISOString().split('T')[0];

    let reminders;
    try {
      reminders = await db.getAll('reminders');
    } catch (e) {
      return;
    }

    const enabled = reminders.filter(r => r.enabled);

    for (const r of enabled) {
      if (!r.days.includes(now.getDay())) continue;

      const [h, m] = r.time.split(':').map(Number);
      const scheduled = new Date();
      scheduled.setHours(h, m, 0, 0);

      if (now >= scheduled) {
        const firedKey = `fired_${todayKey}_${r.id}`;
        const firedFlag = await db.get('settings', firedKey);
        if (!firedFlag) {
          await this.fire(r);
        }
      }
    }
  }

  // 触发通知 - 不检查 permission，直接尝试发
  async fire(reminder) {
    const content = await this.getContent(reminder);

    // 标记今天已触发
    const todayKey = new Date().toISOString().split('T')[0];
    const firedKey = `fired_${todayKey}_${reminder.id}`;
    try {
      await db.put('settings', { key: firedKey, value: true });
    } catch (e) {}

    const options = {
      body: content.body,
      icon: 'assets/icon-192.png',
      badge: 'assets/icon-192.png',
      tag: `r-${reminder.id}`,
      data: { url: content.url },
      vibrate: [200, 100, 200],
      requireInteraction: false,
      silent: false
    };

    // 方式1: 通过 Service Worker 发通知（最可靠，支持后台）
    try {
      const reg = await navigator.serviceWorker.getRegistration();
      if (reg && reg.showNotification) {
        await reg.showNotification(content.title, options);
        // 同时弹页面内 Toast
        if (document.visibilityState === 'visible') {
          this.showToast(content);
        }
        return;
      }
    } catch (e) {
      console.warn('SW 通知失败:', e);
    }

    // 方式2: 直接 new Notification
    try {
      new Notification(content.title, options);
      if (document.visibilityState === 'visible') {
        this.showToast(content);
      }
      return;
    } catch (e) {
      console.warn('Notification 失败:', e);
    }

    // 方式3: 只弹页面内 Toast
    if (document.visibilityState === 'visible') {
      this.showToast(content);
    }
  }

  async getContent(reminder) {
    if (reminder.type === 'meal') {
      const day = getDayOfWeek();
      const dayMenu = recipes.getWeeklyMenus(store.state.currentWeek || 1).find(m => m.day === day) || recipes.getWeeklyMenus(store.state.currentWeek || 1)[0];
      const meal = dayMenu.meals[reminder.mealType];
      if (meal) {
        return {
          title: `${reminder.label}时间到！`,
          body: `今日${reminder.label}：${meal.name}\n蛋白质约${meal.protein}`,
          url: `#/diet?meal=${reminder.mealType}`
        };
      }
      return { title: reminder.label, body: '该吃饭了', url: '#/diet' };
    }

    if (reminder.type === 'workout') {
      const week = store.state.currentWeek;
      const phaseIdx = week <= 4 ? 0 : week <= 8 ? 1 : 2;
      const phase = trainingPlan.phases[phaseIdx];
      const dow = getDayOfWeek();
      const workoutMap = {
        'full-body': { 3: 0, 5: 1, 7: 2 },
        'upper-lower': { 3: 0, 5: 1, 6: 2, 7: 3 },
        'push-pull-legs': { 3: 0, 4: 1, 5: 2, 6: 3, 7: 4 }
      };
      const wIdx = (workoutMap[phase.split] || {})[dow];
      if (wIdx !== undefined && phase.workouts[wIdx]) {
        const w = phase.workouts[wIdx];
        return {
          title: '训练时间到！',
          body: `今日训练：${w.label}\n${w.exercises.length}个动作，预计45分钟`,
          url: `#/training`
        };
      }
      return { title: '训练提醒', body: '今天是训练日，别忘了练！', url: '#/training' };
    }

    return { title: reminder.label || '提醒', body: '时间到了', url: '#/' };
  }

  showToast(content) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <div class="toast-title">${content.title}</div>
      <div class="toast-body">${content.body}</div>
      <div class="toast-action">
        <button class="btn btn-primary btn-sm" onclick="window.location.hash='${content.url}'; this.closest('.toast').classList.remove('show'); setTimeout(()=>this.closest('.toast').remove(),300)">查看详情</button>
      </div>
    `;
    container.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('show'));

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 350);
    }, 10000);
  }

  async checkMissed() {
    await this.checkDueReminders();
  }
}

export const notify = new NotificationManager();
