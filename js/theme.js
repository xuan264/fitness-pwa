// 每周主题色：直接取自用户提供的 3 张中国传统文物配色图 + 13 个衍生色
// 规则：4 轮 × 12 周 = 48 种组合，全部唯一；
//       按色相轮均匀分布到 4 轮中，避免‘一轮一个颜色’的感觉。

function hexToHsl(hex) {
  const v = parseInt(hex.slice(1), 16);
  const r = ((v >> 16) & 255) / 255, g = ((v >> 8) & 255) / 255, b = (v & 255) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h *= 60;
  }
  return [h, s * 100, l * 100];
}

function hslToHex(h, s, l) {
  h = ((h % 360) + 360) % 360;
  const c = (1 - Math.abs(2 * l / 100 - 1)) * (s / 100);
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l / 100 - c / 2;
  let [r1, g1, b1] = [0, 0, 0];
  if (h < 60) [r1, g1, b1] = [c, x, 0];
  else if (h < 120) [r1, g1, b1] = [x, c, 0];
  else if (h < 180) [r1, g1, b1] = [0, c, x];
  else if (h < 240) [r1, g1, b1] = [0, x, c];
  else if (h < 300) [r1, g1, b1] = [x, 0, c];
  else [r1, g1, b1] = [c, 0, x];
  const f = (c) => Math.round((c + m) * 255).toString(16).padStart(2, '0');
  return '#' + f(r1) + f(g1) + f(b1);
}

function lum(hex) {
  const v = parseInt(hex.slice(1), 16);
  const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
  return 0.2126 * f((v >> 16) & 255) + 0.7152 * f((v >> 8) & 255) + 0.0722 * f(v & 255);
}

function contrastWithWhite(hex) {
  return (1 + 0.05) / (lum(hex) + 0.05);
}

// 深档：确保与白字对比度 ≥3.0（黄色会自动压得更深）
function makeDark(primary) {
  const [h, s, l] = hexToHsl(primary);
  let ld = Math.max(28, Math.min(42, l * 0.58));
  let sd = Math.min(90, s * 1.1);
  let dark = hslToHex(h, sd, ld);
  // 若仍不达标，继续降低明度或微调色相（黄转橙棕）
  for (let step = 0; step < 20 && contrastWithWhite(dark) < 3.0; step++) {
    ld = Math.max(18, ld - 1.5);
    dark = hslToHex(h, sd, ld);
  }
  return dark;
}

function makeLight(primary) {
  const [h, s, l] = hexToHsl(primary);
  return hslToHex(h, Math.max(12, s * 0.55), Math.min(94, l + 16));
}

export const PALETTE = [
  // 第 1 轮
  [
    { name: '绯霞', primary: '#e05c58' },
    { name: '珠子褐', primary: '#BEA89D' },
    { name: '茉莉黄', primary: '#F8DF72' },
    { name: '绮钱', primary: '#D8DE8A' },
    { name: '柳绿', primary: '#a9c980' },
    { name: '水绿', primary: '#86c681' },
    { name: '天青', primary: '#8fcfc5' },
    { name: '湖水蓝', primary: '#BBDFE8' },
    { name: '蝶翅蓝', primary: '#4E7CA1' },
    { name: '紫苑', primary: '#757CBB' },
    { name: '靠红', primary: '#F7CDE3' },
    { name: '出炉银', primary: '#EDD2D8' },
  ],
  // 第 2 轮
  [
    { name: '瓜瓤红', primary: '#F68C60' },
    { name: '鹅黄', primary: '#ecca8c' },
    { name: '天球', primary: '#E0DFC6' },
    { name: '苹果', primary: '#A0BF52' },
    { name: '油绿', primary: '#647A60' },
    { name: '沧浪', primary: '#B1D5C8' },
    { name: '湖蓝', primary: '#99d6df' },
    { name: '星郎', primary: '#BCD4E7' },
    { name: '靛青', primary: '#6578c2' },
    { name: '藕荷', primary: '#d895e3' },
    { name: '霞光红', primary: '#EE819F' },
    { name: '嫣红', primary: '#E2767D' },
  ],
  // 第 3 轮
  [
    { name: '绯霞2', primary: '#e37254' },
    { name: '荷花白', primary: '#FBECDE' },
    { name: '黄白游', primary: '#FFFAA3' },
    { name: '艾绿', primary: '#9DAA6C' },
    { name: '竹青', primary: '#86be6f' },
    { name: '薄荷', primary: '#a3d5b3' },
    { name: '海天蓝', primary: '#C6E6E8' },
    { name: '鹊白', primary: '#EBEEF0' },
    { name: '苍苍', primary: '#5976BA' },
    { name: '雪青', primary: '#A59AC9' },
    { name: '初荷红', primary: '#E16C96' },
    { name: '桃夭', primary: '#F6BEC8' },
  ],
  // 第 4 轮
  [
    { name: '茜红', primary: '#CC5D4E' },
    { name: '海螺橙', primary: '#F0945D' },
    { name: '莺儿', primary: '#EBE1A9' },
    { name: '断肠', primary: '#E8EDB9' },
    { name: '无心绿', primary: '#BFD1B2' },
    { name: '豆白', primary: '#D5E0D5' },
    { name: '松石', primary: '#75C1C4' },
    { name: '井天蓝', primary: '#C3D7DF' },
    { name: '窃蓝', primary: '#88ABDA' },
    { name: '藤紫', primary: '#8782c7' },
    { name: '桃夭', primary: '#ec8cb7' },
    { name: '长春', primary: '#DC6B82' },
  ],
];

export function themeForRoundWeek(round, week) {
  const r = (((round || 1) - 1) % 4 + 4) % 4;
  const w = (((week || 1) - 1) % 12 + 12) % 12;
  const t = PALETTE[r][w];
  return { name: t.name, primary: t.primary, dark: makeDark(t.primary), light: makeLight(t.primary) };
}

export function themeForWeek(week) {
  return themeForRoundWeek(1, week);
}

export function applyTheme(week, round) {
  if (typeof document === 'undefined') return;
  const t = themeForRoundWeek(round, week);
  const root = document.documentElement;
  root.style.setProperty('--primary', t.primary);
  root.style.setProperty('--primary-dark', t.dark);
  root.style.setProperty('--primary-light', t.light);
  root.style.setProperty('--info', t.primary);
  root.setAttribute('data-theme-name', t.name);
  root.setAttribute('data-theme-round', String(round || 1));
  root.setAttribute('data-theme-week', String(week || 1));
}
