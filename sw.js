// Service Worker - 离线缓存 + 通知 + 后台提醒检查
const CACHE_NAME = 'fitness-pwa-v27';
const CACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './style.css',
  './js/app.js',
  './js/store.js',
  './js/db.js',
  './js/router.js',
  './js/notify.js',
  './js/utils.js',
  './pages/dashboard.js',
  './pages/training.js',
  './pages/diet.js',
  './pages/progress.js',
  './pages/calculator.js',
  './pages/reminders.js',
  './pages/calendar.js',
  './pages/weight.js',
  './pages/prepregnancy.js',
  './pages/week-workout.js',
  './data/training-plan.js',
  './data/recipes.js',
  './data/recipes-week2.js',
  './data/recipes-week3.js',
  './data/recipes-week4.js',
  './data/prepregnancy-plan.js',
  './data/food-database.js',
  './components/bottom-nav.js',
  './assets/icon.svg'
];

// ===== 后台提醒检查 =====
let reminderCheckTimer = null;
const DB_NAME = 'fitnessDB';
const DB_VERSION = 1;

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function idbGetAll(storeName) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
    db.close();
  });
}

async function idbGet(storeName, key) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    const req = store.get(key);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
    db.close();
  });
}

async function idbPut(storeName, value) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    const req = store.put(value);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
    tx.oncomplete = () => { db.close(); resolve(); };
  });
}

// SW 中检查到期提醒并直接发通知
async function checkAndFireReminders() {
  try {
    const now = new Date();
    const todayKey = now.toISOString().split('T')[0];
    const dayOfWeek = now.getDay(); // 0=周日, 1=周一...

    const reminders = await idbGetAll('reminders');
    const enabled = reminders.filter(r => r.enabled && r.days.includes(dayOfWeek));

    for (const r of enabled) {
      const [h, m] = r.time.split(':').map(Number);
      const scheduled = new Date();
      scheduled.setHours(h, m, 0, 0);

      // 当前时间 >= 提醒时间，且今天还没触发过
      if (now >= scheduled) {
        const firedKey = `fired_${todayKey}_${r.id}`;
        const firedFlag = await idbGet('settings', firedKey);
        if (!firedFlag) {
          // 发送通知
          let title = r.label || '提醒';
          let body = '时间到了';
          if (r.type === 'meal') {
            title = `${r.label}时间到！`;
            body = `该吃${r.label}了，记得打卡`;
          } else if (r.type === 'workout') {
            title = '训练时间到！';
            body = '今天是训练日，别忘了练！';
          }

          await idbPut('settings', { key: firedKey, value: true });

          try {
            await self.registration.showNotification(title, {
              body: body,
              icon: './assets/icon-192.png',
              badge: './assets/icon-192.png',
              tag: `r-${r.id}`,
              data: { url: r.type === 'meal' ? '#/diet' : '#/training' },
              vibrate: [200, 100, 200],
              requireInteraction: false,
              silent: false
            });
          } catch (e) {
            console.warn('SW 通知发送失败:', e);
          }
        }
      }
    }
  } catch (e) {
    console.warn('SW 提醒检查失败:', e);
  }
}

function startReminderCheck() {
  if (reminderCheckTimer) clearInterval(reminderCheckTimer);
  reminderCheckTimer = setInterval(checkAndFireReminders, 30000);
  checkAndFireReminders();
}

// 安装
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll(CACHE_URLS).catch(err => {
        console.warn('Cache addAll failed, caching individually:', err);
        return Promise.allSettled(
          CACHE_URLS.map(url => cache.add(url))
        );
      })
    )
  );
  self.skipWaiting();
});

// 监听消息
self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data?.type === 'START_REMINDER_CHECK') {
    startReminderCheck();
  }
  // 调试：测试通知
  if (event.data?.type === 'TEST_NOTIFICATION') {
    self.registration.showNotification('测试通知', {
      body: '如果你看到这条通知，说明通知功能正常工作',
      icon: './assets/icon-192.png',
      badge: './assets/icon-192.png',
      vibrate: [200, 100, 200]
    });
  }
  // 调试：立即检查提醒
  if (event.data?.type === 'CHECK_NOW') {
    checkAndFireReminders();
  }
});

// 激活
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
  startReminderCheck();
});

// 拦截请求 - 网络优先
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);

  if (url.origin === self.origin && (
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.html') ||
    url.pathname === '/' ||
    url.pathname === '/fitness-pwa/'
  )) {
    event.respondWith(
      fetch(event.request).then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response.ok && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});

// 通知点击
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const hashUrl = event.notification.data?.url || '#/';
  // 构建完整 URL：SW scope + hash
  const baseUrl = self.registration.scope;
  const fullUrl = baseUrl + hashUrl;

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      // 优先找已打开的窗口
      for (const client of clientList) {
        if ('focus' in client) {
          client.navigate(fullUrl);
          return client.focus();
        }
      }
      // 没有已打开的窗口，打开新窗口
      if (clients.openWindow) {
        return clients.openWindow(fullUrl);
      }
    })
  );
});

// 周期性后台同步
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'check-reminders') {
    event.waitUntil(checkAndFireReminders());
  }
});

// Push
self.addEventListener('push', (event) => {
  if (!event.data) return;
  const data = event.data.json();
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: './assets/icon-192.png',
      badge: './assets/icon-192.png',
      data: { url: data.url || '/' }
    })
  );
});
