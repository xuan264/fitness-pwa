// 轻量 hash 路由器
const routes = {};

export function registerRoute(path, handler) {
  routes[path] = handler;
}

export const router = {
  currentPath: '/',

  init() {
    window.addEventListener('hashchange', () => this.render());
    this.render();
  },

  async render() {
    const hash = window.location.hash.slice(1) || '/';
    const [path, queryString] = hash.split('?');
    const params = {};
    if (queryString) {
      queryString.split('&').forEach(pair => {
        const [k, v] = pair.split('=');
        params[k] = decodeURIComponent(v || '');
      });
    }

    this.currentPath = path;
    const handler = routes[path] || routes['/'];

    // 更新底部导航高亮
    updateNavActive(path);

    // 平滑切换：先淡出，渲染完再淡入
    const container = document.getElementById('page-container');
    container.style.opacity = '0';

    // 等待一帧让浏览器应用透明
    await new Promise(r => requestAnimationFrame(() => r()));

    try {
      await handler(params);
    } catch (e) {
      console.error('路由渲染失败:', path, e);
      container.innerHTML = '<div class="page"><div class="card text-center"><div style="font-size:32px;">😵</div><div class="font-bold mt-8">页面加载出错</div><div class="font-sm text-secondary mt-8">' + (e.message || '未知错误') + '</div><button class="btn btn-primary mt-8" onclick="location.reload()">重新加载</button></div></div>';
    } finally {
      // 无论成功或失败，都恢复 opacity 并滚动到顶部
      window.scrollTo(0, 0);
      requestAnimationFrame(() => {
        container.style.opacity = '1';
      });
    }
  },

  navigate(path) {
    window.location.hash = path;
  }
};

function updateNavActive(path) {
  document.querySelectorAll('.nav-item').forEach(item => {
    const href = item.getAttribute('href').slice(1);
    item.classList.toggle('active', path === href || (href !== '/' && path.startsWith(href)));
  });
}
