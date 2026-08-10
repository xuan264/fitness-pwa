// 训练周期设置页（从首页卡片入口跳转至此，避免在首页卡片内展开下拉导致拥挤）
import { store } from '../js/store.js';
import { trainingPlan } from '../data/training-plan.js';

export async function renderWeekSettings() {
  const container = document.getElementById('page-container');

  const week = store.state.currentWeek || 1;
  const round = store.state.currentRound || 1;
  const totalRounds = store.state.totalRounds || 4;
  const phaseIdx = store.getCurrentPhase();
  const phase = trainingPlan.phases[phaseIdx];

  const showOnHome = store.state.showWeekSelector !== false;

  const roundPills = (sel) => Array.from({ length: 4 }, (_, i) => {
    const n = i + 1;
    const on = n === sel;
    return `<button onclick="wsSetRound(${n})" style="flex:1;min-width:0;padding:11px 0;border:1.5px solid ${on ? 'var(--primary)' : 'var(--divider)'};border-radius:12px;background:${on ? 'var(--primary)' : 'var(--surface)'};color:${on ? '#fff' : 'var(--text-primary)'};font-size:15px;font-weight:600;cursor:pointer;">第${n}轮</button>`;
  }).join('');

  const weekPills = (sel) => Array.from({ length: 12 }, (_, i) => {
    const n = i + 1;
    const on = n === sel;
    return `<button onclick="wsSetWeek(${n})" style="flex:1 1 22%;min-width:0;padding:10px 0;border:1.5px solid ${on ? 'var(--primary)' : 'var(--divider)'};border-radius:12px;background:${on ? 'var(--primary)' : 'var(--surface)'};color:${on ? '#fff' : 'var(--text-primary)'};font-size:14px;font-weight:600;cursor:pointer;">${n}</button>`;
  }).join('');

  let html = `<div class="page">`;

  // 头部
  html += `
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:18px;">
      <span onclick="location.hash='#/'" style="font-size:26px;line-height:1;cursor:pointer;color:var(--text-secondary);padding:0 4px;">‹</span>
      <div style="font-size:18px;font-weight:700;">训练周期</div>
    </div>
  `;

  // 统一的训练周期卡片（锻炼与减脂共用）
  html += `
    <div class="card" style="margin-bottom:14px;">
      <div style="display:flex;align-items:baseline;justify-content:space-between;margin-bottom:2px;">
        <span style="font-size:22px;font-weight:700;">第 ${round} 轮 · 第 ${week} 周</span>
        <span class="font-sm" style="color:var(--text-secondary);">${phase.name}</span>
      </div>
      <div class="font-sm" style="color:var(--text-secondary);margin-bottom:16px;">共 ${totalRounds} 轮 · 12 周</div>

      <div class="font-sm" style="color:var(--text-secondary);margin-bottom:8px;">轮次</div>
      <div style="display:flex;gap:8px;margin-bottom:16px;">${roundPills(round)}</div>

      <div class="font-sm" style="color:var(--text-secondary);margin-bottom:8px;">周次</div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;">${weekPills(week)}</div>
    </div>
  `;

  // 首页显示开关
  html += `
    <div class="card" style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:18px;">
      <div style="flex:1;">
        <div style="font-size:14px;font-weight:600;">首页显示周期进度</div>
      </div>
      <div onclick="wsToggleShow()" style="flex:0 0 auto;min-width:50px;height:30px;border-radius:999px;padding:3px;cursor:pointer;transition:background .2s;${showOnHome ? 'background:var(--primary);' : 'background:var(--border);'}">
        <div style="width:24px;height:24px;border-radius:50%;background:#fff;transition:transform .2s;${showOnHome ? 'transform:translateX(20px);' : 'transform:translateX(0);'}"></div>
      </div>
    </div>
  `;

  html += `
    <button class="btn btn-primary" style="width:100%;" onclick="location.hash='#/'">完成</button>
  `;

  html += `</div>`;
  container.innerHTML = html;

  // 全局处理函数
  window.wsSetRound = async (n) => {
    await store.setUnifiedWeek(week, n);
    await renderWeekSettings();
  };
  window.wsSetWeek = async (n) => {
    await store.setUnifiedWeek(n, round);
    await renderWeekSettings();
  };
  window.wsToggleShow = async () => {
    await store.setShowWeekSelector(!(store.state.showWeekSelector !== false));
    await renderWeekSettings();
  };
}
