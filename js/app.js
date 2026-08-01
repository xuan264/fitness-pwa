// 应用入口
import { router, registerRoute } from './router.js';
import { store } from './store.js';
import { db } from './db.js';
import { notify } from './notify.js';
import { renderBottomNav } from '../components/bottom-nav.js';
import { renderDashboard } from '../pages/dashboard.js';
import { renderTraining } from '../pages/training.js';
import { renderDiet } from '../pages/diet.js';
import { renderProgress } from '../pages/progress.js';
import { renderReminders } from '../pages/reminders.js';
import { renderCalendar } from '../pages/calendar.js';
import { renderWeight } from '../pages/weight.js';
import { renderPrepregnancy } from '../pages/prepregnancy.js';
import { renderWeekWorkout } from '../pages/week-workout.js';
import { todayStr } from './utils.js';

async function init() {
  try {
    // 1. 初始化数据库（失败时降级到内存）
    try {
      await db.init();
    } catch (e) {
      console.warn('IndexedDB 初始化失败，使用内存模式:', e);
    }

    // 2. 读取用户设置
    let profile, settings;
    try {
      profile = await db.get('userProfile', 'profile');
      settings = await db.get('settings', 'startDate');
    } catch (e) {
      console.warn('读取设置失败:', e);
    }

    if (settings?.value) {
      store.setState({ startDate: settings.value });
      store.updateCurrentWeek();
    } else {
      // 首次安装：无论何时安装，都设置为第1轮第1周
      const today = todayStr();
      store.setState({ startDate: today });
      try {
        await db.put('settings', { key: 'startDate', value: today });
      } catch (e) {
        // 忽略
      }
      store.setState({ currentWeek: 1, currentRound: 1 });
    }

    store.setState({ userProfile: profile || null });
  } catch (e) {
    console.error('初始化设置失败:', e);
  }

  // 3. 渲染底部导航
  renderBottomNav();

  // 4. 注册路由
  registerRoute('/', renderDashboard);
  registerRoute('/training', renderTraining);
  registerRoute('/diet', renderDiet);
  registerRoute('/progress', renderProgress);
  registerRoute('/reminders', renderReminders);
  registerRoute('/calendar', renderCalendar);
  registerRoute('/weight', renderWeight);
  registerRoute('/prepregnancy', renderPrepregnancy);
  registerRoute('/week-workout', renderWeekWorkout);

  // 5. 初始化路由
  router.init();

  // 6. 注册 Service Worker
  if ('serviceWorker' in navigator) {
    try {
      // 先清理旧版本的Service Worker，确保获取最新版本
      const existingReg = await navigator.serviceWorker.getRegistration();
      if (existingReg) {
        await existingReg.update();
      }

      const reg = await navigator.serviceWorker.register('sw.js');

      // 检测 SW 更新
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        if (!newWorker) return;

        newWorker.addEventListener('statechange', () => {
          if (newWorker.state !== 'installed') return;

          if (navigator.serviceWorker.controller) {
            // 有旧版本，新版本已就绪，立即激活并刷新
            newWorker.postMessage({ type: 'SKIP_WAITING' });
          }
        });
      });

      // 监听控制器变化，自动刷新
      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
          refreshing = true;
          window.location.reload();
        }
      });

      // 主动检查 SW 更新（每次进入页面时）
      reg.update().catch(() => {});

      // 定期检查更新（每 30 秒）
      setInterval(() => {
        reg.update().catch(() => {});
      }, 30 * 1000);

    } catch (e) {
      console.warn('SW 注册失败:', e);
    }
  }

  // 7. 请求通知权限并调度提醒
  try {
    await notify.requestPermission();
    await notify.scheduleAll();
    await notify.checkMissed();
  } catch (e) {
    console.warn('通知初始化失败:', e);
  }

  // 8. 监听 SW 消息
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('message', (event) => {
      if (event.data?.type === 'CHECK_REMINDERS') {
        notify.scheduleAll();
      }
    });
  }

  // 9. PWA 安装引导
  let deferredPrompt = null;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showInstallBanner();
  });

  function showInstallBanner() {
    if (document.getElementById('install-banner')) return;
    const banner = document.createElement('div');
    banner.id = 'install-banner';
    banner.style.cssText = 'position:fixed;bottom:calc(var(--nav-height) + var(--safe-bottom) + 12px);left:50%;transform:translateX(-50%);width:calc(100% - 32px);max-width:448px;background:var(--surface);border-radius:16px;box-shadow:0 4px 24px rgba(0,0,0,0.15);padding:14px 16px;z-index:500;display:flex;align-items:center;gap:12px;border:1.5px solid var(--primary);';
    banner.innerHTML = `
      <div style="font-size:28px;">📱</div>
      <div style="flex:1;">
        <div style="font-size:14px;font-weight:600;">安装到桌面</div>
        <div style="font-size:12px;color:var(--text-secondary);">安装后可后台接收提醒通知</div>
      </div>
      <button id="install-btn" style="background:var(--primary);color:#fff;border:none;border-radius:10px;padding:8px 16px;font-size:13px;font-weight:600;cursor:pointer;white-space:nowrap;">安装</button>
    `;
    document.body.appendChild(banner);

    document.getElementById('install-btn').addEventListener('click', async () => {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        banner.remove();
      }
      deferredPrompt = null;
    });
  }

  // 检测是否已安装
  window.addEventListener('appinstalled', () => {
    const banner = document.getElementById('install-banner');
    if (banner) banner.remove();
  });

  // 如果已安装为 PWA（standalone 模式），不再显示安装提示
  if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
    // 已安装
  } else {
    // 3 秒后如果还没安装，显示手动安装提示
    setTimeout(() => {
      if (!deferredPrompt && !window.matchMedia('(display-mode: standalone)').matches) {
        showManualInstallTip();
      }
    }, 5000);
  }

  function showManualInstallTip() {
    // 只显示一次
    if (sessionStorage.getItem('manual-install-tip-shown')) return;
    sessionStorage.setItem('manual-install-tip-shown', '1');

    const tip = document.createElement('div');
    tip.style.cssText = 'position:fixed;bottom:calc(var(--nav-height) + var(--safe-bottom) + 12px);left:50%;transform:translateX(-50%);width:calc(100% - 32px);max-width:448px;background:var(--primary-light);border-radius:16px;box-shadow:var(--shadow);padding:14px 16px;z-index:500;border:1.5px solid var(--primary);';
    tip.innerHTML = `
      <div style="font-size:13px;font-weight:600;color:var(--primary-dark);margin-bottom:6px;">📲 安装到桌面方法</div>
      <div style="font-size:12px;color:var(--text-secondary);line-height:1.7;">
        <strong>Chrome浏览器：</strong>点右上角 ⋮ 菜单 → 添加到主屏幕<br>
        <strong>安装后可后台接收提醒通知</strong>
      </div>
      <button id="close-tip" style="position:absolute;top:8px;right:10px;background:none;border:none;font-size:18px;color:var(--text-hint);cursor:pointer;">×</button>
    `;
    document.body.appendChild(tip);
    const closeBtn = document.getElementById('close-tip');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => tip.remove());
    }
    setTimeout(() => { if (tip.parentNode) tip.remove(); }, 15000);
  }
}

init();
