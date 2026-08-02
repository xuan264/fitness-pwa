// 底部导航栏组件
import { store } from '../js/store.js';

export function renderBottomNav() {
  const nav = document.getElementById('bottom-nav');
  if (!nav) return;

  const mode = store.state.activeMode || 'both';

  let items = [
    { path: '/', label: '首页', emoji: '🏠' },
    { path: '/diet', label: '饮食', emoji: '🥗' }
  ];

  // 根据模式添加训练/减脂导航项
  if (mode === 'both' || mode === 'fitness') {
    items.push({ path: '/training', label: '训练', emoji: '💪' });
  }
  if (mode === 'both' || mode === 'fat-loss') {
    items.push({ path: '/fat-loss', label: '减脂', emoji: '🫀' });
  }

  items.push({ path: '/progress', label: '进度', emoji: '📊' });

  // 4项时字号稍大，5项时紧凑
  const count = items.length;
  const emojiSize = count <= 4 ? '22px' : '20px';
  const labelSize = count <= 4 ? '11px' : '10px';

  nav.innerHTML = items.map(item => `
    <a href="#${item.path}" class="nav-item" data-path="${item.path}">
      <span style="font-size:${emojiSize};">${item.emoji}</span>
      <span style="font-size:${labelSize};">${item.label}</span>
    </a>
  `).join('');
}
