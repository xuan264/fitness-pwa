// 进度追踪页面
import { store } from '../js/store.js';
import { db } from '../js/db.js';
import { todayStr, getDayOfWeek, getDayName, getWorkoutIndexForWeek } from '../js/utils.js';
import { trainingPlan } from '../data/training-plan.js';
import { recipes } from '../data/recipes.js';

export async function renderProgress(params) {
  const container = document.getElementById('page-container');
  const progressRecords = (await db.getAll('progress')).sort((a, b) => new Date(a.date) - new Date(b.date));
  const workoutLogs = await db.getAll('workoutLog');
  const mealLogs = await db.getAll('mealLog');

  const week = store.state.currentWeek;
  const round = store.state.currentRound || 1;
  const totalRounds = store.state.totalRounds || 4;
  const phaseIdx = store.getCurrentPhase();
  const phase = trainingPlan.phases[phaseIdx];

  // 获取最近7天的打卡记录
  const today = new Date();
  const last7Days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const dow = getDayOfWeek(d);

    const workout = workoutLogs.find(l => l.date === dateStr);
    const meals = mealLogs.filter(l => l.date === dateStr);
    const weight = progressRecords.find(r => r.date === dateStr);

    // 获取当日训练内容
    const todayWorkoutIdx = getWorkoutIndexForWeek(dow, phase.split);
    let workoutContent = '';
    let workoutDone = !!workout;
    if (workout) {
      workoutContent = workout.workoutLabel || '训练完成';
    } else if (todayWorkoutIdx >= 0 && phase.workouts[todayWorkoutIdx]) {
      workoutContent = phase.workouts[todayWorkoutIdx].label;
    } else {
      workoutContent = '休息日';
    }

    // 获取当日餐食内容
    const dayMenu = recipes.getWeeklyMenus(week).find(m => m.day === dow) || recipes.getWeeklyMenus(week)[0];
    const mealDetails = [];
    const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];
    const mealLabels = { breakfast: '早餐', lunch: '午餐', dinner: '晚餐', snack: '加餐' };
    mealTypes.forEach(mt => {
      if (dayMenu && dayMenu.meals[mt]) {
        const done = meals.some(m => m.mealType === mt);
        mealDetails.push({
          label: mealLabels[mt],
          name: dayMenu.meals[mt].name,
          done
        });
      }
    });

    last7Days.push({
      dateStr,
      dayName: getDayName(dow),
      isToday: i === 0,
      workoutContent,
      workoutDone,
      mealDetails,
      weight: weight ? weight.weight : null
    });
  }

  // 统计
  const totalWorkouts = workoutLogs.length;
  const totalMeals = mealLogs.length;

  let html = `
    <div class="page">
      <div style="background:linear-gradient(135deg,var(--primary),var(--primary-dark));color:#fff;padding:16px;border-radius:20px;margin-bottom:16px;position:relative;overflow:hidden;">
        <div style="position:absolute;top:-8px;right:-8px;font-size:50px;opacity:0.15;">📊</div>
        <div style="font-size:13px;opacity:0.9;">⭐ 第${round}轮 / 共${totalRounds}轮 · 第${week}周/12周</div>
        <div style="font-size:22px;font-weight:700;margin:4px 0;">📈 打卡记录</div>
        <div style="font-size:13px;opacity:0.9;">累计训练 ${totalWorkouts} 次 · 餐食打卡 ${totalMeals} 次</div>
      </div>

      <!-- 体重记录入口（跳转独立页面） -->
  `;

  if (progressRecords.length > 0) {
    const latest = progressRecords[progressRecords.length - 1];
    const first = progressRecords[0];
    const latestWeight = latest.weight.toFixed(1);
    const change = (latest.weight - first.weight).toFixed(1);
    const arrow = change < 0 ? '↓' : change > 0 ? '↑' : '→';
    html += `
      <div class="card" style="margin-bottom:16px;cursor:pointer;" onclick="location.hash='#/weight'">
        <div class="flex-between">
          <div>
            <div class="font-sm text-secondary">⚖️ 体重记录</div>
            <div style="font-size:22px;font-weight:700;color:var(--primary);">${latestWeight} kg</div>
            <div class="font-sm text-secondary">${arrow} ${Math.abs(change)} kg · 点击查看详情</div>
          </div>
          <div style="font-size:28px;color:var(--text-hint);">›</div>
        </div>
      </div>
    `;
  } else {
    html += `
      <div class="card" style="margin-bottom:16px;cursor:pointer;" onclick="location.hash='#/weight'">
        <div style="text-align:center;padding:12px 0;">
          <div style="font-size:28px;margin-bottom:4px;">⚖️</div>
          <div class="font-bold">体重记录</div>
          <div class="font-sm text-secondary">点击添加第一条记录</div>
        </div>
      </div>
    `;
  }

  html += `
      <!-- 最近7天每日打卡 -->
      <div class="card-title" style="margin:0 0 8px;">📋 最近7天打卡</div>
  `;

  // 今天在最上面：倒序渲染
  last7Days.slice().reverse().forEach(day => {
    const workoutIcon = day.workoutDone ? '✅' : (day.workoutContent === '休息日' ? '😴' : '⭕');
    const mealDoneCount = day.mealDetails.filter(m => m.done).length;

    html += `
      <div class="card" style="margin-bottom:10px;${day.isToday ? 'border:2px solid var(--primary);' : ''}">
        <div class="flex-between mb-8">
          <div>
            <span class="font-bold">${day.dayName}</span>
            ${day.isToday ? '<span class="badge badge-primary" style="margin-left:6px;">今天</span>' : ''}
            <span class="font-sm text-secondary" style="margin-left:6px;">${day.dateStr.substring(5)}</span>
          </div>
          ${day.weight ? `<span class="badge badge-accent">⚖️ ${day.weight}kg</span>` : ''}
        </div>

        <!-- 训练打卡 -->
        <div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid var(--divider);">
          <span style="font-size:16px;">${workoutIcon}</span>
          <span style="flex:1;font-size:13px;">💪 ${day.workoutContent}</span>
        </div>

        <!-- 餐食打卡 -->
        ${day.mealDetails.map(m => `
          <div style="display:flex;align-items:center;gap:8px;padding:4px 0;${day.mealDetails.indexOf(m) < day.mealDetails.length - 1 ? 'border-bottom:1px solid var(--divider);' : ''}">
            <span style="font-size:14px;">${m.done ? '✅' : '⭕'}</span>
            <span style="font-size:12px;color:var(--text-secondary);width:36px;">${m.label}</span>
            <span style="flex:1;font-size:13px;${m.done ? '' : 'color:var(--text-hint);'}">${m.name}</span>
          </div>
        `).join('')}
      </div>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;
}
