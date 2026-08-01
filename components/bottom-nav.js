// 底部导航栏组件
export function renderBottomNav() {
  const nav = document.getElementById('bottom-nav');
  if (!nav) return;

  const items = [
    { path: '/', label: '首页', emoji: '🏠' },
    { path: '/diet', label: '饮食', emoji: '🥗' },
    { path: '/training', label: '训练', emoji: '💪' },
    { path: '/progress', label: '进度', emoji: '📊' }
  ];

  nav.innerHTML = items.map(item => `
    <a href="#${item.path}" class="nav-item" data-path="${item.path}">
      <span style="font-size:22px;">${item.emoji}</span>
      <span style="font-size:11px;">${item.label}</span>
    </a>
  `).join('');
}
