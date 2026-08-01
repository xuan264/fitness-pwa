// 本周训练计划页面
import { store } from '../js/store.js';
import { trainingPlan } from '../data/training-plan.js';
import { getDayOfWeek, getDayName, getWorkoutIndexForWeek, getWeeklyParams } from '../js/utils.js';

export async function renderWeekWorkout(params) {
  const container = document.getElementById('page-container');
  const week = store.state.currentWeek;
  const round = store.state.currentRound || 1;
  const totalRounds = store.state.totalRounds || 4;
  const phaseIdx = store.getCurrentPhase();
  const phase = trainingPlan.phases[phaseIdx];
  const dow = getDayOfWeek();

  let html = `<div class="page">`;

  // 顶部信息
  html += `
    <div style="background:linear-gradient(135deg,var(--primary),var(--primary-dark));color:#fff;padding:16px;border-radius:20px;margin-bottom:16px;position:relative;overflow:hidden;">
      <div style="position:absolute;top:-8px;right:-8px;font-size:50px;opacity:0.15;">💪</div>
      <div style="font-size:13px;opacity:0.9;">⭐ 第${round}轮 / 共${totalRounds}轮 · 第${week}周/12周</div>
      <div style="font-size:22px;font-weight:700;margin:4px 0;">📋 本周训练计划</div>
      <div style="font-size:13px;opacity:0.9;">${phase.name} · 每周${phase.frequency}次</div>
    </div>
  `;

  // 只显示训练日
  for (let d = 1; d <= 7; d++) {
    const wIdx = getWorkoutIndexForWeek(d, phase.split);
    if (wIdx < 0 || !phase.workouts[wIdx]) continue;

    const w = phase.workouts[wIdx];
    const isToday = d === dow;

    html += `
      <div class="card" style="margin-bottom:12px;${isToday ? 'border:2px solid var(--primary);' : ''}">
        <div class="flex-between mb-8">
          <div>
            <span class="font-bold" style="font-size:16px;">${getDayName(d)}</span>
            ${isToday ? '<span class="badge badge-primary" style="margin-left:6px;">今天</span>' : ''}
          </div>
          <span class="badge badge-accent">第${wIdx + 1}次</span>
        </div>
        <div style="font-size:14px;font-weight:600;color:var(--primary-dark);margin-bottom:8px;">💪 ${w.label}</div>
    `;

    w.exercises.forEach((ex, i) => {
      const wp = getWeeklyParams(ex, week, round);
      html += `
        <div style="display:flex;align-items:center;gap:8px;padding:6px 0;${i < w.exercises.length - 1 ? 'border-bottom:1px solid var(--divider);' : ''}">
          <span style="width:20px;height:20px;border-radius:50%;background:var(--primary);color:#fff;font-size:11px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">${i + 1}</span>
          <span style="flex:1;font-size:13px;">${ex.name}</span>
          <span class="badge badge-primary" style="font-size:11px;">${wp.sets}×${wp.reps}</span>
        </div>
      `;
    });

    html += `</div>`;
  }

  html += `</div>`;
  container.innerHTML = html;
}
