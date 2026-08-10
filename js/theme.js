// 每周主题色：中国传统经典配色（沉稳、不刺眼），按周循环
// 每个颜色给出 主色 / 深一档（用于渐变与按钮）/ 浅一档（用于浅底）
export const THEMES = [
  { name: '松绿', primary: '#5E7E5E', dark: '#41603F', light: '#D8E4D8' },
  { name: '黛蓝', primary: '#3F5C7E', dark: '#2C4660', light: '#D6E2EC' },
  { name: '靛青', primary: '#364F73', dark: '#25385A', light: '#D2DEEA' },
  { name: '赭石', primary: '#855A3C', dark: '#64422B', light: '#E7D6C4' },
  { name: '绛红', primary: '#8A3F3F', dark: '#6B2E2E', light: '#E8CBCB' },
  { name: '秋香', primary: '#7E7E3E', dark: '#5E5E2C', light: '#E8E6C8' },
  { name: '藕荷', primary: '#937381', dark: '#6E545F', light: '#E8D7DC' },
  { name: '黛紫', primary: '#4A3D5E', dark: '#342A44', light: '#D9D2E4' },
  { name: '茶色', primary: '#8A6A40', dark: '#6A4F2C', light: '#E5D7BC' },
  { name: '墨绿', primary: '#35503F', dark: '#243829', light: '#CEDDCF' },
  { name: '缃色', primary: '#9A7E36', dark: '#74602A', light: '#ECE3C4' },
  { name: '青碧', primary: '#3E726A', dark: '#2B544E', light: '#D0E2DD' }
];

// 根据周次（1-12）取对应主题
export function themeForWeek(week) {
  const n = THEMES.length;
  const idx = (((week || 1) - 1) % n + n) % n;
  return THEMES[idx];
}

// 把当前周的主题色写入 CSS 变量，全站随之变化
export function applyTheme(week) {
  if (typeof document === 'undefined') return;
  const t = themeForWeek(week);
  const root = document.documentElement;
  root.style.setProperty('--primary', t.primary);
  root.style.setProperty('--primary-dark', t.dark);
  root.style.setProperty('--primary-light', t.light);
  root.style.setProperty('--info', t.primary);
}
