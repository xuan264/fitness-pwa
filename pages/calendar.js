// 打卡日历页面
import { store } from '../js/store.js';
import { db } from '../js/db.js';
import { trainingPlan } from '../data/training-plan.js';
import { recipes } from '../data/recipes.js';
import { getDayOfWeek, getDayName, getWorkoutIndexForWeek, todayStr } from '../js/utils.js';

// 模块级状态：当前查看的年月
let viewYear, viewMonth;

export async function renderCalendar(params) {
  const container = document.getElementById('page-container');
  const now = new Date();

  // 如果没有指定或跨年了，初始化为当月
  if (viewYear === undefined || viewMonth === undefined) {
    viewYear = now.getFullYear();
    viewMonth = now.getMonth();
  }

  const year = viewYear;
  const month = viewMonth;
  const today = now.getDate();
  const isCurrentMonth = (year === now.getFullYear() && month === now.getMonth());

  const monthStart = new Date(year, month, 1);
  const monthEnd = new Date(year, month + 1, 0);

  // 获取所有打卡记录（全量，用于任意月份筛选）
  const allWorkouts = await db.getAll('workoutLog');
  const allMeals = await db.getAll('mealLog');
  const allProgress = await db.getAll('progress');

  // 按日期索引
  const workoutByDate = {};
  allWorkouts.forEach(w => { workoutByDate[w.date] = w; });
  const mealByDate = {};
  allMeals.forEach(m => {
    if (!mealByDate[m.date]) mealByDate[m.date] = [];
    mealByDate[m.date].push(m);
  });
  const weightByDate = {};
  allProgress.forEach(p => { weightByDate[p.date] = p.weight; });

  // 本月统计用变量
  const monthPrefix = `${year}-${String(month+1).padStart(2,'0')}`;
  const allMealDays = Object.keys(mealByDate);

  // 日历数据
  const firstDay = monthStart.getDay() === 0 ? 7 : monthStart.getDay();
  const daysInMonth = monthEnd.getDate();
  const monthNames = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
  const weekDays = ['一','二','三','四','五','六','日'];

  const week = store.state.currentWeek;
  const round = store.state.currentRound || 1;
  const totalRounds = store.state.totalRounds || 4;
  const phaseIdx = store.getCurrentPhase();
  const phase = trainingPlan.phases[phaseIdx];

  let html = `
    <div class="page">
      <div style="background:linear-gradient(135deg,var(--primary),var(--primary-dark));color:#fff;padding:16px;border-radius:20px;margin-bottom:16px;position:relative;overflow:hidden;">
        <div style="position:absolute;top:-10px;right:-10px;font-size:60px;opacity:0.15;">📊</div>
        <div style="font-size:13px;opacity:0.9;">⭐ 第${round}轮 / 共${totalRounds}轮 · 第${week}周/12周</div>
        <div style="display:flex;align-items:center;justify-content:center;gap:16px;margin:4px 0;">
          <span onclick="calPrevMonth()" style="font-size:22px;cursor:pointer;opacity:0.85;user-select:none;">‹</span>
          <span style="font-size:20px;font-weight:700;">📅 ${year}年${monthNames[month]}</span>
          <span onclick="calNextMonth()" style="font-size:22px;cursor:pointer;opacity:0.85;user-select:none;">›</span>
        </div>
        <div style="font-size:13px;opacity:0.9;text-align:center;">打卡日历 · 点击日期查看详情</div>
      </div>

      <!-- 本月统计：按天统计 -->
      <div class="stat-grid" style="margin-bottom:16px;grid-template-columns:1fr 1fr 1fr;">
        <div class="stat-card">
          <div style="font-size:18px;margin-bottom:2px;">💪</div>
          <div class="stat-value">${Object.keys(workoutByDate).filter(d => d.startsWith(monthPrefix)).length}</div>
          <div class="stat-label">训练打卡天数</div>
        </div>
        <div class="stat-card accent">
          <div style="font-size:18px;margin-bottom:2px;">🥗</div>
          <div class="stat-value">${allMealDays.filter(d => d.startsWith(monthPrefix) && mealByDate[d].length >= 4).length}</div>
          <div class="stat-label">四餐全打卡</div>
        </div>
        <div class="stat-card">
          <div style="font-size:18px;margin-bottom:2px;">🍽️</div>
          <div class="stat-value">${allMealDays.filter(d => d.startsWith(monthPrefix) && mealByDate[d].length > 0 && mealByDate[d].length < 4).length}</div>
          <div class="stat-label">部分打卡</div>
        </div>
      </div>

      <!-- 日历 -->
      <div class="card">
        <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px;margin-bottom:8px;">
          ${weekDays.map(d => `<div style="text-align:center;font-size:11px;color:var(--text-secondary);font-weight:600;padding:4px 0;">${d}</div>`).join('')}
        </div>
        <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px;" id="calendar-grid">
  `;

  // 空白格
  for (let i = 1; i < firstDay; i++) {
    html += `<div></div>`;
  }

  // 日期格
  for (let d = 1; d <= daysInMonth; d++) {
    const dateObj = new Date(year, month, d);
    const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const dow = getDayOfWeek(dateObj);
    const isToday = isCurrentMonth && d === today;
    const isFuture = isCurrentMonth && d > today;

    const workout = workoutByDate[dateStr];
    const meals = mealByDate[dateStr] || [];
    const weight = weightByDate[dateStr];

    const hasWorkout = !!workout;
    const mealCount = meals.length;

    // 背景色
    let bg = 'var(--bg)';
    if (isToday) bg = 'var(--primary-light)';
    else if (hasWorkout && mealCount >= 4) bg = '#E8F5E9';
    else if (hasWorkout) bg = '#F1F8E9';
    else if (mealCount > 0) bg = '#FFF8E1';

    // 打卡图标
    let marks = '';
    if (hasWorkout) marks += '💪';
    if (mealCount >= 4) marks += '🥗';
    else if (mealCount > 0) marks += '🍽️';
    if (weight) marks += '⚖️';

    html += `
      <div onclick="showDayDetail('${dateStr}')" style="aspect-ratio:1;background:${bg};border-radius:8px;padding:2px;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;${isToday ? 'border:2px solid var(--primary);' : ''}position:relative;">
        <div style="font-size:12px;font-weight:${isToday ? '700' : '400'};color:${isFuture ? 'var(--text-hint)' : 'var(--text-primary)'};">${d}</div>
        ${marks ? `<div style="font-size:9px;margin-top:1px;">${marks}</div>` : ''}
      </div>
    `;
  }

  html += `
        </div>
      </div>

      <!-- 图例 -->
      <div class="card" style="margin-top:12px;">
        <div style="display:flex;gap:16px;flex-wrap:wrap;font-size:12px;color:var(--text-secondary);justify-content:center;">
          <span>💪 训练打卡</span>
          <span>🥗 全部餐食</span>
          <span>🍽️ 部分餐食</span>
          <span>⚖️ 体重记录</span>
        </div>
      </div>

      <!-- 日详情 -->
      <div id="day-detail" style="margin-top:12px;"></div>
    </div>
  `;

  container.innerHTML = html;

  // 月份切换
  window.calPrevMonth = () => {
    viewMonth--;
    if (viewMonth < 0) { viewMonth = 11; viewYear--; }
    renderCalendar();
  };
  window.calNextMonth = () => {
    viewMonth++;
    if (viewMonth > 11) { viewMonth = 0; viewYear++; }
    renderCalendar();
  };

  // 日详情（先定义后调用）
  window.showDayDetail = async (dateStr) => {
    const detailEl = document.getElementById('day-detail');
    if (!detailEl) return;

    const workout = workoutByDate[dateStr];
    const meals = mealByDate[dateStr] || [];
    const weight = weightByDate[dateStr];
    const dateObj = new Date(dateStr);
    const dow = getDayOfWeek(dateObj);
    const dayMenu = recipes.getWeeklyMenus(store.state.currentWeek || 1).find(m => m.day === dow) || recipes.getWeeklyMenus(store.state.currentWeek || 1)[0];

    let detailHtml = `<div class="card"><div class="card-title">📋 ${dateStr} ${getDayName(dow)}</div>`;

    // 训练详情
    detailHtml += `<div style="margin-bottom:12px;">`;
    if (workout) {
      detailHtml += `
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
          <span style="font-size:18px;">💪</span>
          <span class="font-bold">${workout.workoutLabel || '训练'}</span>
          <span class="badge badge-primary">已完成</span>
        </div>
      `;
    } else {
      const todayWorkoutIdx = getWorkoutIndexForWeek(dow, phase.split);
      if (todayWorkoutIdx >= 0 && phase.workouts[todayWorkoutIdx]) {
        detailHtml += `
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
            <span style="font-size:18px;opacity:0.4;">💪</span>
            <span style="color:var(--text-secondary);">${phase.workouts[todayWorkoutIdx].label}</span>
            <span class="badge badge-gray">未打卡</span>
          </div>
        `;
      } else {
        detailHtml += `<div style="color:var(--text-secondary);font-size:13px;">😴 休息日</div>`;
      }
    }
    detailHtml += `</div>`;

    // 餐食详情
    detailHtml += `<div style="margin-bottom:12px;">`;
    const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];
    const mealLabelsMap = { breakfast: '🌅 早餐', lunch: '☀️ 午餐', dinner: '🌙 晚餐', snack: '🍎 加餐' };
    mealTypes.forEach(mt => {
      const meal = dayMenu.meals[mt];
      const done = meals.some(m => m.mealType === mt);
      if (meal) {
        detailHtml += `
          <div style="display:flex;align-items:center;gap:8px;padding:4px 0;border-bottom:1px solid var(--divider);">
            <span style="font-size:14px;">${mealLabelsMap[mt]}</span>
            <span style="flex:1;font-size:13px;color:var(--text-secondary);">${meal.name}</span>
            <span style="font-size:14px;">${done ? '✅' : '⭕'}</span>
          </div>
        `;
      }
    });
    detailHtml += `</div>`;

    // 体重
    if (weight) {
      detailHtml += `<div style="display:flex;align-items:center;gap:8px;"><span style="font-size:18px;">⚖️</span><span class="font-bold">${weight}kg</span></div>`;
    }

    detailHtml += `</div>`;
    detailEl.innerHTML = detailHtml;
  };

  // 默认显示今日详情（仅当查看当月时）
  if (isCurrentMonth) {
    window.showDayDetail(todayStr());
  }
}
