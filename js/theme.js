// 每周主题色：年轻明快的中国传统配色
// 设计目标：
//  1) 颜色更亮、更年轻（用嫩绿/天青/藕粉/杏色这类清新生动的色相，告别沉稳的深墨绿/赭石）
//  2) 每一轮的每一周都不重样 —— 4 轮 × 12 周 = 48 种组合，全部唯一
// 实现：每轮一个基色相（两两相隔足够远，互不撞色），
//       每周在该轮色相族内做 色相(±20°) 偏移，保证 12 周彼此不同又同轮协调。
// 可读性：亮色(--primary)用于进度条/描边等图形强调；白字背景与正文强调统一用更深的
//        --primary-dark（固定 L≈38，白字对比 ≥3:1），既清晰又保留每周期的色相差异。

// HSL -> HEX（h 允许 <0 或 >360，公式内部取模处理）
function hslToHex(h, s, l) {
  s /= 100; l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const toHex = (x) => Math.round(x * 255).toString(16).padStart(2, '0');
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
}

// 每轮一个年轻色系（基色相）
export const ROUND_THEMES = [
  { name: '青碧', hue: 150 }, // 轮1：嫩绿 / 柳绿
  { name: '天青', hue: 198 }, // 轮2：清澈青蓝 / 湖蓝
  { name: '藕荷', hue: 336 }, // 轮3：藕粉 / 桃粉
  { name: '杏色', hue: 32 }   // 轮4：明亮杏橙 / 暖黄（比纯缃色更易读）
];

const N_ROUNDS = ROUND_THEMES.length; // 4
const N_WEEKS = 12;
const DARK_L = 38; // 白字背景固定明度，保证对比度

// 根据 (轮, 周) 取唯一主题色
export function themeForRoundWeek(round, week) {
  const ri = (((round || 1) - 1) % N_ROUNDS + N_ROUNDS) % N_ROUNDS;
  const wi = (((week || 1) - 1) % N_WEEKS + N_WEEKS) % N_WEEKS;
  const base = ROUND_THEMES[ri];
  const t = wi / (N_WEEKS - 1); // 0..1

  // 每周色相在基色 ±20° 内线性偏移（12 周各不相同，且都在同族内）
  const hue = base.hue + (t - 0.5) * 40;
  // 主色明度随周次渐亮（57→68），年轻通透
  const Lp = 57 + t * 11;
  // 饱和度中段略高、两端柔和，避免刺眼
  const Sp = 52 + 6 * Math.cos(t * Math.PI);

  const primary = hslToHex(hue, Sp, Lp);
  // 深档：固定较低明度，白字背景清晰可读；色相仍随周变化 → 每周期背景各异
  const dark = hslToHex(hue, Sp + 6, DARK_L);
  // 浅档：用于浅底（如训练日标签底）
  const light = hslToHex(hue, Math.max(22, Sp - 22), Math.min(94, 82 + t * 6));

  return { name: base.name, primary, dark, light };
}

// 兼容旧调用：仅按周（默认第 1 轮）
export function themeForWeek(week) {
  return themeForRoundWeek(1, week);
}

// 把当前 (轮, 周) 的主题色写入 CSS 变量，全站随之变化
export function applyTheme(week, round) {
  if (typeof document === 'undefined') return;
  const t = themeForRoundWeek(round, week);
  const root = document.documentElement;
  root.style.setProperty('--primary', t.primary);
  root.style.setProperty('--primary-dark', t.dark);
  root.style.setProperty('--primary-light', t.light);
  root.style.setProperty('--info', t.primary);
  // 暴露当前主题名，便于将来展示（如“本周主题：青碧”）
  root.setAttribute('data-theme-name', t.name);
  root.setAttribute('data-theme-round', String(round || 1));
  root.setAttribute('data-theme-week', String(week || 1));
}
