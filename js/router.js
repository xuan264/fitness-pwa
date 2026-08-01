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

    await handler(params);

    // 滚动到顶部
    window.scrollTo(0, 0);

    // 淡入新内容
    requestAnimationFrame(() => {
      container.style.opacity = '1';
    });
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
