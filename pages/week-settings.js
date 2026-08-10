// 训练周期设置页（从首页卡片入口跳转至此，避免在首页卡片内展开下拉导致拥挤）
import { store } from '../js/store.js';
import { trainingPlan } from '../data/training-plan.js';
import { fatLossPlan } from '../data/fat-loss-plan.js';

export async function renderWeekSettings() {
  const container = document.getElementById('page-container');

  const activeMode = store.state.activeMode || 'both';
  const showFitness = activeMode === 'both' || activeMode === 'fitness';
  const showFatLoss = activeMode === 'both' || activeMode === 'fat-loss';

  const week = store.state.currentWeek || 1;
  const round = store.state.currentRound || 1;
  const totalRounds = store.state.totalRounds || 4;
  const phaseIdx = store.getCurrentPhase();
  const phase = trainingPlan.phases[phaseIdx];

  const flWeek = store.state.fatLossWeek || 1;
  const flRound = store.state.fatLossRound || 1;
  const flPhaseIdx = store.getFatLossPhase();
  const flPhase = fatLossPlan.phases[flPhaseIdx];

  const showOnHome = store.state.showWeekSelector !== false;

  const roundOpts = (sel) => Array.from({ length: 4 }, (_, i) => `<option value="${i + 1}" ${sel === i + 1 ? 'selected' : ''}>第${i + 1}轮</option>`).join('');
  const weekOpts = (sel) => Array.from({ length: 12 }, (_, i) => `<option value="${i + 1}" ${sel === i + 1 ? 'selected' : ''}>第${i + 1}周</option>`).join('');

  const selectStyle = "width:100%;padding:11px 12px;font-size:15px;border:1.5px solid var(--border);border-radius:12px;background:var(--surface);color:var(--text);outline:none;";

  let html = `<div class="page">`;

  // 头部
  html += `
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:18px;">
      <span onclick="location.hash='#/'" style="font-size:26px;line-height:1;cursor:pointer;color:var(--text-secondary);padding:0 4px;">‹</span>
      <div style="font-size:18px;font-weight:700;">训练周期设置</div>
    </div>
  `;

  // 锻炼卡片
  if (showFitness) {
    html += `
      <div class="card" style="margin-bottom:14px;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:2px;">
          <span style="font-size:18px;">💪</span>
          <span style="font-size:16px;font-weight:600;">锻炼训练周期</span>
        </div>
        <div class="font-sm text-secondary mb-12">当前阶段：${phase.name} · 共 ${totalRounds} 轮 12 周</div>
        <div style="display:flex;gap:12px;">
          <div style="flex:1;">
            <div class="font-sm text-secondary mb-6">轮次</div>
            <select onchange="wsSetFitness()" id="wsFitRound" style="${selectStyle}">${roundOpts(round)}</select>
          </div>
          <div style="flex:1;">
            <div class="font-sm text-secondary mb-6">周次</div>
            <select onchange="wsSetFitness()" id="wsFitWeek" style="${selectStyle}">${weekOpts(week)}</select>
          </div>
        </div>
        <div class="font-sm text-secondary mt-12">
          选定后以当天为锚点，之后每周自动顺延，无需每周手动调整。
        </div>
      </div>
    `;
  }

  // 减脂卡片
  if (showFatLoss) {
    html += `
      <div class="card" style="margin-bottom:14px;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:2px;">
          <span style="font-size:18px;">🫀</span>
          <span style="font-size:16px;font-weight:600;">减脂训练周期</span>
        </div>
        <div class="font-sm text-secondary mb-12">当前阶段：${flPhase.name} · 共 4 轮 12 周</div>
        <div style="display:flex;gap:12px;">
          <div style="flex:1;">
            <div class="font-sm text-secondary mb-6">轮次</div>
            <select onchange="wsSetFatLoss()" id="wsFlRound" style="${selectStyle}">${roundOpts(flRound)}</select>
          </div>
          <div style="flex:1;">
            <div class="font-sm text-secondary mb-6">周次</div>
            <select onchange="wsSetFatLoss()" id="wsFlWeek" style="${selectStyle}">${weekOpts(flWeek)}</select>
          </div>
        </div>
        <div class="font-sm text-secondary mt-12">
          选定后以当天为锚点，之后每周自动顺延。
        </div>
      </div>
    `;
  }

  // 首页显示开关
  html += `
    <div class="card" style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:18px;">
      <div style="flex:1;">
        <div style="font-size:14px;font-weight:600;">在首页显示周期进度</div>
        <div class="font-sm text-secondary mt-4">关闭后首页卡片更简洁</div>
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

  // 全局处理函数（模块作用域内闭包，重新渲染时更新）
  window.wsSetFitness = async () => {
    const r = parseInt(document.getElementById('wsFitRound').value, 10);
    const w = parseInt(document.getElementById('wsFitWeek').value, 10);
    await store.setManualWeek(w, r);
    await renderWeekSettings();
  };
  window.wsSetFatLoss = async () => {
    const r = parseInt(document.getElementById('wsFlRound').value, 10);
    const w = parseInt(document.getElementById('wsFlWeek').value, 10);
    await store.setFatLossWeek(w, r);
    await renderWeekSettings();
  };
  window.wsToggleShow = async () => {
    await store.setShowWeekSelector(!(store.state.showWeekSelector !== false));
    await renderWeekSettings();
  };
}
