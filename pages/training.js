// 训练计划页面
import { store } from '../js/store.js';
import { db } from '../js/db.js';
import { trainingPlan } from '../data/training-plan.js';
import { icons, getDayOfWeek, getWorkoutIndexForWeek, getWeeklyParams } from '../js/utils.js';
import { todayStr } from '../js/utils.js';

export async function renderTraining(params) {
  const week = store.state.currentWeek;
  const round = store.state.currentRound || 1;
  const totalRounds = store.state.totalRounds || 4;
  const currentPhaseIdx = store.getCurrentPhase();
  const phase = trainingPlan.phases[currentPhaseIdx];
  const dow = getDayOfWeek();
  const todayWorkoutIdx = getWorkoutIndexForWeek(dow, phase.split);

  const container = document.getElementById('page-container');

  // 是否从首页点击过来，自动展开今日训练详情
  const autoExpandToday = params && params.expand === 'today';

  // 检查今日训练是否已完成
  let completed = false;
  if (todayWorkoutIdx >= 0) {
    completed = await checkWorkoutCompleted();
  }

  let html = `<div class="page">`;

  // ===== 顶部进度条 =====
  html += `
    <div style="background:linear-gradient(135deg,var(--primary),var(--primary-dark));color:#fff;padding:16px;border-radius:20px;margin-bottom:16px;position:relative;overflow:hidden;">
      <div style="position:absolute;top:-8px;right:-8px;font-size:50px;opacity:0.15;">🎯</div>
      <div style="font-size:13px;opacity:0.9;">⭐ 第${round}轮 / 共${totalRounds}轮 · 第${week}周/12周</div>
      <div style="font-size:24px;font-weight:700;margin:4px 0;">${phase.name}</div>
      <div style="font-size:14px;opacity:0.9;">${phase.split === 'full-body' ? '🌿 全身训练' : phase.split === 'upper-lower' ? '💪 上下肢分化' : '🔥 推拉腿分化'}</div>
      <div class="progress-bar" style="margin-top:10px;background:rgba(255,255,255,0.3);border-radius:10px;">
        <div class="fill" style="width:${(week/12)*100}%;background:#fff;border-radius:10px;"></div>
      </div>
    </div>
  `;

  // ===== 今日训练（最显眼区域）=====
  if (todayWorkoutIdx >= 0 && phase.workouts[todayWorkoutIdx]) {
    const workout = phase.workouts[todayWorkoutIdx];
    html += `
      <div class="card" style="border-left:4px solid var(--accent);margin-bottom:16px;">
        <div class="flex-between mb-8">
          <div>
            <div class="font-sm text-secondary">今日训练</div>
            <div class="font-lg font-bold">${workout.label}</div>
          </div>
          <span class="badge ${completed ? 'badge-primary' : 'badge-accent'}">${completed ? '已完成 ✓' : '待完成'}</span>
        </div>
        <div class="font-sm text-secondary mb-12">${workout.exercises.length}个动作 · 预计45分钟</div>
    `;

    // 今日动作快速预览（显示当前周参数）
    html += `<div style="margin-bottom:12px;">`;
    workout.exercises.forEach((ex, i) => {
      const wp = getWeeklyParams(ex, week, round);
      html += `
        <div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid var(--divider);">
          <span style="width:20px;height:20px;border-radius:50%;background:var(--primary);color:#fff;font-size:11px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">${i+1}</span>
          <span style="flex:1;font-size:14px;">${ex.name}</span>
          <span class="badge badge-primary" style="font-size:11px;">${wp.sets}×${wp.reps}</span>
        </div>
      `;
    });
    html += `</div>`;

    // 热身提示
    if (workout.warmup && workout.warmup.length) {
      html += `<div class="font-sm text-secondary mb-8">热身：${workout.warmup.map(w => w.name).join('、')}</div>`;
    }

    // 展开详情按钮
    html += `<button class="btn btn-primary btn-full" onclick="toggleTodayDetail()">${autoExpandToday ? '收起动作详情' : '查看动作详情'}</button>`;

    // 详情区域（根据参数决定是否默认展开）
    html += `<div id="today-detail" class="exercise-detail ${autoExpandToday ? 'show' : ''}" style="padding-top:12px;">`;

    // 热身详情
    if (workout.warmup && workout.warmup.length) {
      html += `<div class="exercise-section"><h4>热身</h4><ul>`;
      workout.warmup.forEach(item => {
        html += `<li>${item.name} <span class="text-secondary">(${item.duration})</span></li>`;
      });
      html += `</ul></div>`;
    }

    // 动作详情（显示当前周参数）
    html += `<div class="exercise-section"><h4>正式动作</h4>`;
    workout.exercises.forEach((ex, exIdx) => {
      const wp = getWeeklyParams(ex, week, round);
      html += `
        <div style="background:var(--bg);border-radius:var(--radius-sm);padding:12px;margin-bottom:8px;">
          <div class="flex-between">
            <div>
              <div class="font-bold">${exIdx + 1}. ${ex.name}</div>
              <div class="font-sm text-secondary">${ex.category}</div>
            </div>
            <div class="text-right">
              <div class="badge badge-primary">${wp.sets}组×${wp.reps}</div>
            </div>
          </div>
          <div class="font-sm mt-8">
            <span class="text-secondary">重量：</span>${wp.weight}
            <span class="text-secondary" style="margin-left:8px;">休息：</span>${ex.rest}
          </div>
          <div class="font-sm text-secondary" style="margin-top:2px;">节奏：${ex.tempo}</div>
          <div class="exercise-section" style="margin-top:8px;">
            <h4 style="font-size:12px;">动作要领</h4>
            <ol style="font-size:13px;padding-left:18px;">
              ${ex.cues.map(c => `<li>${c}</li>`).join('')}
            </ol>
          </div>
          <div class="exercise-section">
            <h4 style="font-size:12px;">常见错误</h4>
            <ul style="font-size:13px;padding-left:18px;">
              ${ex.commonMistakes.map(m => `<li class="text-danger">${m}</li>`).join('')}
            </ul>
          </div>
          <div class="font-sm text-secondary" style="margin-top:4px;">目标肌群：${(ex.muscle || []).join('、')}</div>
        </div>
      `;
    });
    html += `</div>`;

    // 拉伸
    if (workout.cooldown && workout.cooldown.length) {
      html += `<div class="exercise-section"><h4>拉伸放松</h4><ul>`;
      workout.cooldown.forEach(item => {
        html += `<li>${item.name} <span class="text-secondary">(${item.duration})</span></li>`;
      });
      html += `</ul></div>`;
    }

    // 打卡按钮
    html += `<button class="btn btn-accent btn-full mt-8" onclick="markWorkoutDone()">${completed ? '✓ 已完成训练' : '打卡完成训练'}</button>`;

    html += `</div>`; // 关闭 today-detail
    html += `</div>`; // 关闭 card
  } else {
    html += `
      <div class="card text-center" style="margin-bottom:16px;">
        <div style="font-size:32px;">🛌</div>
        <div class="font-bold mt-8">今天是休息日</div>
        <div class="font-sm text-secondary mt-8">建议做${phase.cardio.duration}的${phase.cardio.options[0]}</div>
      </div>
    `;
  }

  // ===== 备孕运动入口 =====
  html += `
    <div class="card" style="margin-top:12px;cursor:pointer;border-left:4px solid #FF9A8B;background:linear-gradient(135deg,#FFF5F3,var(--surface));" onclick="location.hash='#/prepregnancy'">
      <div style="display:flex;align-items:center;gap:12px;">
        <div style="font-size:32px;">🌸</div>
        <div style="flex:1;">
          <div class="font-bold" style="color:#FF7E6B;">备孕运动专项</div>
          <div class="font-sm text-secondary">盆底肌训练 · 核心稳定 · 骨盆灵活 · 分娩准备</div>
        </div>
        <div style="font-size:24px;color:var(--text-hint);">›</div>
      </div>
    </div>
  `;

  // ===== 阶段总览（Tab 切换，不用折叠）=====
  html += `<div class="card-title" style="margin:16px 0 8px;">训练阶段总览</div>`;

  // Tab 栏
  html += `<div class="phase-tabs" style="display:flex;gap:0;margin-bottom:12px;background:var(--surface);border-radius:var(--radius);padding:3px;box-shadow:var(--shadow);">`;
  for (let i = 0; i < trainingPlan.phases.length; i++) {
    const p = trainingPlan.phases[i];
    const isActive = i === currentPhaseIdx;
    html += `
      <div class="phase-tab ${isActive ? 'active' : ''}" onclick="switchPhaseTab(${i})" style="flex:1;padding:10px 4px;text-align:center;font-size:13px;border-radius:var(--radius-sm);cursor:pointer;transition:all 0.2s;${isActive ? 'background:var(--primary);color:#fff;font-weight:600;' : 'color:var(--text-secondary);'}">
        ${p.name}
      </div>
    `;
  }
  html += `</div>`;

  // 阶段内容容器（只显示当前选中的阶段）
  for (let i = 0; i < trainingPlan.phases.length; i++) {
    const p = trainingPlan.phases[i];
    const isActive = i === currentPhaseIdx;
    const displayStyle = isActive ? 'block' : 'none';

    html += `<div id="phase-tab-content-${i}" style="display:${displayStyle};">`;

    // 阶段信息
    html += `
      <div class="card" style="margin-bottom:12px;">
        <div class="flex-between mb-8">
          <span class="font-bold">${p.name}</span>
          <span class="badge ${isActive ? 'badge-primary' : 'badge-gray'}">${p.weeks}</span>
        </div>
        <div class="font-sm text-secondary mb-8">${p.description}</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px 12px;background:var(--bg);border-radius:var(--radius-sm);padding:10px 12px;font-size:12px;line-height:1.6;">
          <div><span class="text-secondary">频率：</span>${p.frequency}次/周</div>
          <div><span class="text-secondary">强度：</span>${p.acsmParams.intensity.split(';')[0]}</div>
          <div><span class="text-secondary">次数：</span>${p.acsmParams.reps