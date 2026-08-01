// 提醒设置页面
import { db } from '../js/db.js';
import { notify } from '../js/notify.js';
import { icons, getWorkoutIndexForWeek } from '../js/utils.js';
import { store } from '../js/store.js';
import { trainingPlan } from '../data/training-plan.js';

// 根据当前训练阶段计算训练日（返回 [0-6] 格式，0=周日）
function getWorkoutDays() {
  const phaseIdx = store.getCurrentPhase();
  const phase = trainingPlan.phases[phaseIdx];
  const split = phase.split;
  const days = [];
  for (let d = 1; d <= 7; d++) {
    if (getWorkoutIndexForWeek(d, split) >= 0) {
      // d: 1-7（1=周一...7=周日），转换为 0-6（0=周日）
      days.push(d === 7 ? 0 : d);
    }
  }
  return days;
}

export async function renderReminders(params) {
  const container = document.getElementById('page-container');
  const reminders = await db.getAll('reminders');

  // 计算当前训练日
  const workoutDays = getWorkoutDays();

  // 如果没有提醒，创建默认
  if (reminders.length === 0) {
    const defaults = [
      { type: 'meal', mealType: 'breakfast', label: '早餐', time: '08:00', enabled: true, days: [1,2,3,4,5,6,0] },
      { type: 'meal', mealType: 'lunch', label: '午餐', time: '12:00', enabled: true, days: [1,2,3,4,5,6,0] },
      { type: 'meal', mealType: 'dinner', label: '晚餐', time: '18:00', enabled: true, days: [1,2,3,4,5,6,0] },
      { type: 'workout', label: '训练提醒', time: '19:30', enabled: true, days: workoutDays, autoWorkoutDays: true }
    ];
    for (const d of defaults) {
      await db.add('reminders', d);
    }
  } else {
    // 自动同步训练提醒的训练日（跟随运动计划）
    let updated = false;
    for (const r of reminders) {
      if (r.type === 'workout') {
        // 迁移旧数据：如果没有 autoWorkoutDays 标记，自动设为 true
        if (r.autoWorkoutDays === undefined) {
          r.autoWorkoutDays = true;
          updated = true;
        }
        if (r.autoWorkoutDays) {
          const currentDaysStr = JSON.stringify([...r.days].sort());
          const newDaysStr = JSON.stringify([...workoutDays].sort());
          if (currentDaysStr !== newDaysStr) {
            r.days = workoutDays;
            updated = true;
          }
        }
      }
    }
    if (updated) {
      for (const r of reminders) {
        await db.put('reminders', r);
      }
      await notify.scheduleAll();
    }
  }

  const allReminders = await db.getAll('reminders');

  let html = `
    <div class="page">
      <div class="card">
        <div class="card-title">${icons.bell} 提醒管理</div>
        <p class="font-sm text-secondary mb-16">点击时间可修改，点击日期按钮可切换。</p>
        <div id="reminder-list">
          ${allReminders.map(r => renderReminderItem(r)).join('')}
        </div>
      </div>

      <div class="card">
        <div class="card-title">${icons.plus} 添加新提醒</div>
        <div class="form-group">
          <label>类型</label>
          <select class="form-control" id="new-type" onchange="toggleMealSelect()">
            <option value="meal">餐食提醒</option>
            <option value="workout">训练提醒</option>
          </select>
        </div>
        <div class="form-group" id="meal-type-group">
          <label>哪一餐</label>
          <select class="form-control" id="new-meal-type">
            <option value="breakfast">早餐</option>
            <option value="lunch">午餐</option>
            <option value="dinner">晚餐</option>
            <option value="snack">加餐</option>
          </select>
        </div>
        <div class="form-group">
          <label>时间</label>
          <div class="reminder-time-wrap" onclick="openNewTimePicker()" style="width:100%;height:44px;background:var(--surface);border:1.5px solid var(--divider);">
            <span class="reminder-time-display" id="new-time-display">12:00</span>
            <svg class="reminder-time-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <input type="hidden" id="new-time" value="12:00">
        </div>
        <div class="form-group">
          <label>重复日期</label>
          <div class="flex gap-8 flex-wrap" id="day-selector">
            ${['一','二','三','四','五','六','日'].map((d, i) => `
              <label class="btn btn-sm btn-outline" style="cursor:pointer;" data-day="${i < 6 ? i+1 : 0}">
                <input type="checkbox" style="display:none;" checked> ${d}
              </label>
            `).join('')}
          </div>
        </div>
        <button class="btn btn-primary btn-full" onclick="addReminder()">添加提醒</button>
      </div>

      <div class="card">
        <div class="card-title">🔔 通知测试</div>
        <p class="font-sm text-secondary mb-12">如果提醒没有弹出，先点下面按钮测试通知是否正常工作。</p>
        <button class="btn btn-primary btn-full mb-8" onclick="testNotification()">📱 发送测试通知</button>
        <button class="btn btn-outline btn-full mb-8" onclick="checkRemindersNow()">🔍 立即检查提醒</button>
        <div id="test-result" style="margin-top:8px;"></div>
      </div>

      <div class="card">
        <div class="card-title">⚠️ 使用提示</div>
        <ul class="font-sm" style="padding-left:20px;line-height:2;color:var(--text-secondary);">
          <li>首次使用时浏览器会请求通知权限，请选择"允许"</li>
          <li>手机端将本应用"添加到主屏幕"后使用效果最佳</li>
          <li>App 需在后台运行（或通过PWA安装）才能收到推送</li>
          <li>每天打开一次 App 确保提醒已调度</li>
        </ul>
      </div>

      <!-- 数据管理 -->
      <div class="card">
        <div class="card-title">💾 数据管理</div>
        <p class="font-sm text-secondary mb-12">导出数据用于备份或换手机迁移，导入数据会覆盖当前记录。</p>
        <button class="btn btn-primary btn-full mb-8" onclick="exportData()">📥 导出我的数据</button>
        <button class="btn btn-outline btn-full" onclick="document.getElementById('import-file').click()">📤 导入数据</button>
        <input type="file" id="import-file" accept=".json" style="display:none;" onchange="importData(event)">
        <div id="data-result" style="margin-top:8px;"></div>
      </div>
    </div>
  `;

  container.innerHTML = html;

  // 新增提醒的日期选择交互
  document.querySelectorAll('#day-selector label').forEach(label => {
    label.addEventListener('click', () => {
      const checkbox = label.querySelector('input');
      checkbox.checked = !checkbox.checked;
      label.classList.toggle('btn-primary');
      label.classList.toggle('btn-outline');
    });
  });

  // 已有提醒的日期按钮交互
  document.querySelectorAll('.rday').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = parseInt(btn.dataset.rid);
      const day = parseInt(btn.dataset.day);
      const r = await db.get('reminders', id);

      if (r.days.includes(day)) {
        if (r.days.length <= 1) {
          return; // 至少保留一天
        }
        r.days = r.days.filter(d => d !== day);
      } else {
        r.days.push(day);
      }
      await db.put('reminders', r);
      await notify.scheduleAll();

      // 只更新这一个按钮的样式，不重新渲染整个页面
      const isActive = r.days.includes(day);
      btn.classList.toggle('rday-on', isActive);
      btn.classList.toggle('rday-off', !isActive);

      // 更新日期文字摘要
      const summary = document.getElementById(`rday-summary-${id}`);
      if (summary) {
        summary.textContent = formatDays(r.days);
      }
    });
  });

  window.toggleMealSelect = () => {
    const type = document.getElementById('new-type').value;
    const group = document.getElementById('meal-type-group');
    group.style.display = type === 'meal' ? 'block' : 'none';
  };

  window.addReminder = async () => {
    const type = document.getElementById('new-type').value;
    const mealType = document.getElementById('new-meal-type').value;
    const time = document.getElementById('new-time').value;
    const days = [];
    document.querySelectorAll('#day-selector label').forEach(label => {
      const cb = label.querySelector('input');
      if (cb.checked) {
        days.push(parseInt(label.dataset.day));
      }
    });

    const mealLabels = { breakfast: '早餐', lunch: '午餐', dinner: '晚餐', snack: '加餐' };
    const label = type === 'meal' ? mealLabels[mealType] : '训练提醒';

    const reminder = { type, mealType: type === 'meal' ? mealType : undefined, label, time, enabled: true, days };
    await db.add('reminders', reminder);
    await notify.scheduleAll();
    renderReminders();
  };

  window.toggleReminder = async (id) => {
    const r = await db.get('reminders', id);
    r.enabled = !r.enabled;
    await db.put('reminders', r);
    await notify.scheduleAll();
  };

  window.deleteReminder = async (id) => {
    if (!confirm('确定删除此提醒？')) return;
    await db.delete('reminders', id);
    await notify.scheduleAll();
    renderReminders();
  };

  // 修改时间 - 不重新渲染页面，只更新数据
  window.updateReminderTime = async (id, newTime) => {
    if (!newTime) return;
    const r = await db.get('reminders', id);
    r.time = newTime;
    await db.put('reminders', r);
    await notify.scheduleAll();
    // 通知 SW 重新开始检查
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'START_REMINDER_CHECK' });
    }
  };

  // 测试通知 - 不依赖 Notification 对象，直接用 SW
  window.testNotification = async () => {
    const result = document.getElementById('test-result');
    let log = [];

    // 1. 检查环境
    log.push('Notification对象: ' + ('Notification' in window ? '有' : '无'));
    if ('Notification' in window) {
      log.push('权限: ' + Notification.permission);
    }
    log.push('SW支持: ' + ('serviceWorker' in navigator ? '是' : '否'));

    // 2. 确保 SW 注册
    let swReg = null;
    if ('serviceWorker' in navigator) {
      swReg = await navigator.serviceWorker.getRegistration();
      log.push('SW注册: ' + (swReg ? '是' : '否'));

      if (!swReg) {
        log.push('正在注册SW...');
        try {
          swReg = await navigator.serviceWorker.register('sw.js');
          log.push('SW注册成功');
        } catch (e) {
          log.push('SW注册失败: ' + e.message);
        }
      }
    }

    // 3. 如果 Notification 存在但权限未授权，先请求
    if ('Notification' in window && Notification.permission === 'default') {
      log.push('请求通知权限...');
      try {
        const perm = await Notification.requestPermission();
        log.push('权限结果: ' + perm);
      } catch (e) {
        log.push('请求权限失败: ' + e.message);
      }
    }

    // 4. 发通知
    let sent = false;
    if (swReg && swReg.showNotification) {
      try {
        await swReg.showNotification('🔔 测试通知', {
          body: '通知功能正常！时间到了会像这样提醒你。',
          icon: 'assets/icon-192.png',
          badge: 'assets/icon-192.png',
          vibrate: [200, 100, 200],
          requireInteraction: true,
          silent: false
        });
        log.push('SW通知: 已发送');
        sent = true;
      } catch (e) {
        log.push('SW通知失败: ' + e.message);
      }
    }

    if (!sent && 'Notification' in window) {
      try {
        new Notification('🔔 测试通知', {
          body: '通知功能正常！',
          icon: 'assets/icon-192.png',
          vibrate: [200, 100, 200]
        });
        log.push('直接通知: 已发送');
        sent = true;
      } catch (e) {
        log.push('直接通知失败: ' + e.message);
      }
    }

    // 5. 页面内 Toast
    notify.showToast({
      title: '🔔 测试通知',
      body: '这是页面内弹窗。如果你在手机通知栏也看到了通知，说明后台提醒能工作。',
      url: '#/reminders'
    });

    if (sent) {
      result.innerHTML = '<div style="color:var(--primary);font-size:13px;">✅ 系统通知已发送！请查看手机通知栏</div><div style="font-size:11px;color:var(--text-hint);margin-top:4px;">' + log.join('<br>') + '</div>';
    } else {
      result.innerHTML = '<div style="color:var(--danger);font-size:13px;">❌ 无法发送系统通知</div><div style="font-size:11px;color:var(--text-hint);margin-top:4px;">' + log.join('<br>') + '</div><div style="font-size:11px;color:var(--text-secondary);margin-top:4px;">💡 请确保：1.用Chrome浏览器 2.将本应用"添加到主屏幕" 3.手机设置→应用→Chrome→通知→允许</div>';
    }
  };

  // 立即检查提醒
  window.checkRemindersNow = async () => {
    const result = document.getElementById('test-result');
    let log = [];

    const now = new Date();
    const todayKey = now.toISOString().split('T')[0];
    const dayOfWeek = now.getDay();
    log.push('当前: ' + now.toTimeString().substring(0, 8) + ' 周' + dayOfWeek);

    let reminders;
    try {
      reminders = await db.getAll('reminders');
    } catch (e) {
      result.innerHTML = '<div style="color:var(--danger);font-size:13px;">❌ 读取提醒失败: ' + e.message + '</div>';
      return;
    }

    const enabled = reminders.filter(r => r.enabled);
    log.push('启用提醒: ' + enabled.length + '个');

    let fired = 0;
    for (const r of enabled) {
      if (!r.days.includes(dayOfWeek)) {
        log.push(r.label + '(' + r.time + '): 今天不提醒');
        continue;
      }
      const [h, m] = r.time.split(':').map(Number);
      const scheduled = new Date();
      scheduled.setHours(h, m, 0, 0);

      if (now >= scheduled) {
        const firedKey = `fired_${todayKey}_${r.id}`;
        const firedFlag = await db.get('settings', firedKey);
        if (firedFlag) {
          log.push(r.label + '(' + r.time + '): 今天已触发过');
        } else {
          log.push(r.label + '(' + r.time + '): 📢 触发通知！');
          await notify.fire(r);
          fired++;
        }
      } else {
        log.push(r.label + '(' + r.time + '): 还没到时间');
      }
    }

    result.innerHTML = '<div style="color:' + (fired > 0 ? 'var(--primary)' : 'var(--text-secondary)') + ';font-size:13px;">' + (fired > 0 ? '✅ 触发了 ' + fired + ' 个通知' : '没有到期未触发的提醒') + '</div><div style="font-size:11px;color:var(--text-hint);margin-top:4px;">' + log.join('<br>') + '</div>';
  };

  // 导出数据
  window.exportData = async () => {
    try {
      const exportObj = await db.exportAll();
      const json = JSON.stringify(exportObj, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const dateStr = new Date().toISOString().split('T')[0];
      const a = document.createElement('a');
      a.href = url;
      a.download = `健身数据备份_${dateStr}.json`;
      a.click();
      URL.revokeObjectURL(url);
      document.getElementById('data-result').innerHTML = '<div style="color:var(--primary);font-size:13px;">✅ 数据已导出下载</div>';
    } catch (e) {
      document.getElementById('data-result').innerHTML = '<div style="color:var(--danger);font-size:13px;">❌ 导出失败：' + e.message + '</div>';
    }
  };

  // 导入数据
  window.importData = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!confirm('导入数据将覆盖当前所有记录，确定继续吗？')) {
      event.target.value = '';
      return;
    }

    try {
      const text = await file.text();
      const jsonData = JSON.parse(text);

      if (!jsonData.data && !jsonData.progress) {
        document.getElementById('data-result').innerHTML = '<div style="color:var(--danger);font-size:13px;">❌ 文件格式不正确</div>';
        return;
      }

      const result = await db.importAll(jsonData, true);
      document.getElementById('data-result').innerHTML = `<div style="color:var(--primary);font-size:13px;">✅ 导入完成！成功 ${result.success} 条，跳过 ${result.skipped} 条</div>`;

      // 重新调度提醒并刷新页面
      await notify.scheduleAll();
      setTimeout(() => { window.location.reload(); }, 1500);
    } catch (e) {
      document.getElementById('data-result').innerHTML = '<div style="color:var(--danger);font-size:13px;">❌ 导入失败：' + e.message + '</div>';
    }
    event.target.value = '';
  };

  // 自定义时间选择器
  let pickerTarget = null; // { id } 或 { new: true }
  let pickerCurrent = '12:00';

  window.openTimePicker = (id, currentTime) => {
    pickerTarget = { id };
    pickerCurrent = currentTime || '12:00';
    showPicker(pickerCurrent);
  };

  window.openNewTimePicker = () => {
    pickerTarget = { new: true };
    pickerCurrent = document.getElementById('new-time')?.value || '12:00';
    showPicker(pickerCurrent);
  };

  function showPicker(timeStr) {
    const [h, m] = timeStr.split(':').map(Number);
    const hours = h.toString().padStart(2, '0');
    const minutes = m.toString().padStart(2, '0');

    const overlay = document.createElement('div');
    overlay.id = 'time-picker-overlay';
    overlay.className = 'time-picker-overlay';
    overlay.innerHTML = `
      <div class="time-picker" onclick="event.stopPropagation()">
        <div class="time-picker-header">
          <div class="time-picker-title">选择时间</div>
          <button class="time-picker-close" onclick="closeTimePicker()">×</button>
        </div>
        <div class="time-picker-wheels">
          <div class="time-picker-sel"></div>
          <div class="time-picker-wheel" id="hour-wheel">
            ${'<div class="time-picker-pad"></div>'.repeat(2)}
            ${Array.from({length: 24}, (_, i) => {
              const val = i.toString().padStart(2, '0');
              const active = val === hours ? 'active' : '';
              return `<div class="time-picker-item ${active}" data-value="${val}">${val}</div>`;
            }).join('')}
            ${'<div class="time-picker-pad"></div>'.repeat(2)}
          </div>
          <div class="time-picker-divider">:</div>
          <div class="time-picker-wheel" id="minute-wheel">
            ${'<div class="time-picker-pad"></div>'.repeat(2)}
            ${Array.from({length: 60}, (_, i) => {
              const val = i.toString().padStart(2, '0');
              const active = val === minutes ? 'active' : '';
              return `<div class="time-picker-item ${active}" data-value="${val}">${val}</div>`;
            }).join('')}
            ${'<div class="time-picker-pad"></div>'.repeat(2)}
          </div>
        </div>
        <div class="time-picker-actions">
          <button class="btn btn-outline" onclick="closeTimePicker()">取消</button>
          <button class="btn btn-primary" onclick="confirmTimePicker()">确定</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeTimePicker();
    });

    // 滚动到选中位置
    requestAnimationFrame(() => {
      overlay.classList.add('show');
      scrollToActive('hour-wheel');
      scrollToActive('minute-wheel');
      setupWheel('hour-wheel');
      setupWheel('minute-wheel');
    });
  }

  function scrollToActive(wheelId) {
    const wheel = document.getElementById(wheelId);
    if (!wheel) return;
    const active = wheel.querySelector('.active');
    if (!active) return;
    const wheelRect = wheel.getBoundingClientRect();
    const itemRect = active.getBoundingClientRect();
    const offset = itemRect.top - wheelRect.top - (wheelRect.height / 2) + (itemRect.height / 2);
    wheel.scrollTop += offset;
  }

  function setupWheel(wheelId) {
    const wheel = document.getElementById(wheelId);
    if (!wheel) return;
    const itemHeight = 40;
    const padCount = 2;

    const clampScroll = () => {
      const maxScroll = wheel.scrollHeight - wheel.clientHeight;
      // 限制 scrollTop 在 [0, maxScroll] 范围内
      if (wheel.scrollTop < 0) wheel.scrollTop = 0;
      if (wheel.scrollTop > maxScroll) wheel.scrollTop = maxScroll;
    };

    const updateActive = () => {
      const items = wheel.querySelectorAll('.time-picker-item');
      const wheelRect = wheel.getBoundingClientRect();
      const center = wheelRect.top + wheelRect.height / 2;
      let closest = null;
      let minDist = Infinity;
      items.forEach(item => {
        const rect = item.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;
        const dist = Math.abs(itemCenter - center);
        if (dist < minDist) {
          minDist = dist;
          closest = item;
        }
      });
      items.forEach(item => item.classList.remove('active'));
      if (closest) closest.classList.add('active');
    };

    let scrollTimer = null;
    wheel.addEventListener('scroll', () => {
      window.requestAnimationFrame(() => {
        updateActive();
        clampScroll();
      });
      // 滚动结束后 snap 到最近的 item
      if (scrollTimer) clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        const active = wheel.querySelector('.active');
        if (active) {
          const wheelRect = wheel.getBoundingClientRect();
          const itemRect = active.getBoundingClientRect();
          const offset = itemRect.top - wheelRect.top - (wheelRect.height / 2) + (itemRect.height / 2);
          if (Math.abs(offset) > 2) {
            wheel.scrollTop += offset;
          }
        }
      }, 150);
    }, { passive: true });

    wheel.querySelectorAll('.time-picker-item').forEach(item => {
      item.addEventListener('click', () => {
        item.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    });
  }

  window.closeTimePicker = () => {
    const overlay = document.getElementById('time-picker-overlay');
    if (!overlay) return;
    overlay.classList.remove('show');
    setTimeout(() => overlay.remove(), 300);
  };

  window.confirmTimePicker = async () => {
    const hourEl = document.querySelector('#hour-wheel .time-picker-item.active');
    const minuteEl = document.querySelector('#minute-wheel .time-picker-item.active');
    if (!hourEl || !minuteEl) return;
    const newTime = `${hourEl.dataset.value}:${minuteEl.dataset.value}`;

    if (pickerTarget?.id) {
      await window.updateReminderTime(pickerTarget.id, newTime);
      // 只更新时间显示，不重新渲染
      const row = document.querySelector(`.reminder-time-wrap[onclick*="openTimePicker(${pickerTarget.id},"]`);
      if (row) {
        const display = row.querySelector('.reminder-time-display');
        if (display) display.textContent = newTime;
        row.setAttribute('onclick', `openTimePicker(${pickerTarget.id}, '${newTime}')`);
      }
    } else if (pickerTarget?.new) {
      document.getElementById('new-time').value = newTime;
      const display = document.getElementById('new-time-display');
      if (display) display.textContent = newTime;
    }

    closeTimePicker();
  };
}

function formatDays(days) {
  if (days.length === 7) return '每天';
  const dayNames = ['日','一','二','三','四','五','六'];
  const sorted = [...days].sort((a, b) => {
    // 周一(1)到周日(0)，0 排最后
    if (a === 0) return 1;
    if (b === 0) return -1;
    return a - b;
  });
  return sorted.map(d => '周' + dayNames[d]).join('、');
}

function renderReminderItem(r) {
  const dayNames = ['日','一','二','三','四','五','六'];
  const allDays = [1,2,3,4,5,6,0];
  const isAutoWorkout = r.type === 'workout' && r.autoWorkoutDays;

  return `
    <div class="reminder-row">
      <div class="reminder-row-main">
        <div class="reminder-row-left">
          <div class="reminder-time-wrap" onclick="openTimePicker(${r.id}, '${r.time}')">
            <span class="reminder-time-display">${r.time}</span>
            <svg class="reminder-time-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <div class="reminder-row-info">
            <span class="reminder-row-label">${r.label}</span>
            <span class="reminder-row-summary" id="rday-summary-${r.id}">${formatDays(r.days)}</span>
          </div>
        </div>
        <div class="reminder-row-right">
          <label class="switch">
            <input type="checkbox" ${r.enabled ? 'checked' : ''} onchange="toggleReminder(${r.id})">
            <span class="switch-slider"></span>
          </label>
          <span class="reminder-row-del" onclick="deleteReminder(${r.id})">${icons.trash}</span>
        </div>
      </div>
      <div class="reminder-row-days">
        ${allDays.map(d => {
          const isActive = r.days.includes(d);
          if (isAutoWorkout) {
            return `<span class="rday ${isActive ? 'rday-on' : 'rday-off'}" style="cursor:default;opacity:${isActive ? '1' : '0.4'};">${dayNames[d]}</span>`;
          }
          return `<span class="rday ${isActive ? 'rday-on' : 'rday-off'}" data-rid="${r.id}" data-day="${d}">${dayNames[d]}</span>`;
        }).join('')}
      </div>
      ${isAutoWorkout ? '<div class="font-sm text-secondary" style="margin-top:6px;font-size:11px;">🔒 训练日自动跟随运动计划，随阶段切换自动更新</div>' : ''}
    </div>
  `;
}
