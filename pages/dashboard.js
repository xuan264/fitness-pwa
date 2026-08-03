// 仪表盘/首页
import { store } from '../js/store.js';
import { db } from '../js/db.js';
import { trainingPlan } from '../data/training-plan.js';
import { fatLossPlan } from '../data/fat-loss-plan.js';
import { recipes } from '../data/recipes.js';
import { renderBottomNav } from '../components/bottom-nav.js';
import { icons, getDayOfWeek, getWorkoutIndexForWeek, getDayName, todayStr } from '../js/utils.js';

// 全局打卡刷新标记 - 其他页面打卡后设置，首页渲染时检查
window._needRefreshDashboard = false;

export async function renderDashboard(params) {
  const container = document.getElementById('page-container');

  // 读取训练模式（从 IndexedDB 持久化）
  let activeMode = store.state.activeMode || 'both';
  try {
    const savedMode = await db.get('settings', 'activeMode');
    if (savedMode?.value) {
      activeMode = savedMode.value;
      store.setState({ activeMode });
    }
  } catch (e) {}

  const showFitness = activeMode === 'both' || activeMode === 'fitness';
  const showFatLoss = activeMode === 'both' || activeMode === 'fat-loss';

  const week = store.state.currentWeek;
  const round = store.state.currentRound || 1;
  const totalRounds = store.state.totalRounds || 4;
  const phaseIdx = store.getCurrentPhase();
  const phase = trainingPlan.phases[phaseIdx];
  const dow = getDayOfWeek();
  const todayWorkoutIdx = getWorkoutIndexForWeek(dow, phase.split);
  const dayMenu = recipes.getWeeklyMenus(store.state.currentWeek || 1).find(m => m.day === dow) || recipes.getWeeklyMenus(store.state.currentWeek || 1)[0];

  // 今日打卡状态（只统计原有训练计划，排除减脂训练 type='fat-loss'）
  const todayWorkouts = (await db.getByIndex('workoutLog', 'date', todayStr())).filter(l => l.type !== 'fat-loss');
  const todayMeals = await db.getByIndex('mealLog', 'date', todayStr());
  const progressRecords = (await db.getAll('progress')).sort((a, b) => new Date(a.date) - new Date(b.date));

  // 本周训练统计（周一为一周开始，排除减脂训练）
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0=周日
  // 计算本周一日期：周日时往前推6天，其他天往前推 dayOfWeek-1 天
  const monday = new Date(today);
  monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
  monday.setHours(0, 0, 0, 0);
  const mondayStr = monday.toISOString().split('T')[0];
  const allWorkouts = (await db.getAll('workoutLog')).filter(l => l.type !== 'fat-loss');
  // 用字符串比较避免时区问题：date >= 本周一
  const weekWorkouts = allWorkouts.filter(l => l.date >= mondayStr);

  // ===== 减脂训练独立计算 =====
  const FAT_LOSS_DAY_MAP = { 1: 0, 3: 1, 5: 2 };
  let fatLossWeek = 1, fatLossRound = 1, fatLossPhaseIdx = 0;
  let fatLossTodayIdx = FAT_LOSS_DAY_MAP[dow] ?? -1;  // 不依赖数据库，直接算
  let fatLossCompleted = false;
  let fatLossAllLogs = [];
  try {
    const flSaved = await db.get('settings', 'fatLossStartDate');
    let flStart;
    if (flSaved?.value) {
      flStart = new Date(flSaved.value);
    } else {
      // 未开始减脂计划，仍显示卡片但不计算周次
      flStart = null;
    }
    if (flStart) {
      const flDiffDays = Math.floor((now - flStart) / (1000 * 60 * 60 * 24));
      const flTotalWeeks = Math.floor(flDiffDays / 7) + 1;
      fatLossRound = Math.floor((flTotalWeeks - 1) / 12) + 1;
      fatLossWeek = ((flTotalWeeks - 1) % 12) + 1;
      if (fatLossWeek <= 3) fatLossPhaseIdx = 0;
      else if (fatLossWeek <= 6) fatLossPhaseIdx = 1;
      else if (fatLossWeek <= 9) fatLossPhaseIdx = 2;
      else fatLossPhaseIdx = 3;
    }
    const flTodayLogs = (await db.getByIndex('workoutLog', 'date', todayStr())).filter(l => l.type === 'fat-loss');
    fatLossCompleted = flTodayLogs.length > 0;
    // 本周减脂训练统计
    fatLossAllLogs = (await db.getAll('workoutLog')).filter(l => l.type === 'fat-loss');
  } catch (e) {
    console.warn('减脂训练状态计算失败:', e);
  }
  const flPhase = fatLossPlan.phases[fatLossPhaseIdx];
  const flWeekCount = fatLossAllLogs.filter(l => l.date >= mondayStr).length;

  // 今日日期
  const now = new Date();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const dateStr = `${month}月${date}日`;
  const greetings = ['周日好呀～ 🌿', '周一加油！ 💪', '周二继续冲～ 🔥', '周三过半啦！ ⭐', '周四坚持住！ 🌈', '周五辛苦啦！ 🎉', '周六愉快～ 🍰'];
  const greeting = greetings[now.getDay()];

  let html = `<div class="page">`;

  // 顶部进度卡片（可点击跳转打卡日历）
  html += `
    <a href="#/calendar" style="text-decoration:none;color:inherit;">
      <div style="background:linear-gradient(135deg,var(--primary),var(--primary-dark));color:#fff;padding:16px;border-radius:20px;margin-bottom:16px;position:relative;overflow:hidden;cursor:pointer;">
        <div style="position:absolute;top:-10px;right:-10px;font-size:60px;opacity:0.12;">🌱</div>
        <div style="position:absolute;bottom:-8px;left:-8px;font-size:40px;opacity:0.1;">⏱️</div>
        <div style="font-size:12px;opacity:0.9;">📅 ${dateStr} · ${getDayName(dow)} · ${greeting}</div>
        <div class="flex-between" style="position:relative;z-index:1;">
          <div>
            <div style="font-size:13px;opacity:0.9;">⭐ 第${round}轮 / 共${totalRounds}轮</div>
            <div style="font-size:22px;font-weight:700;margin:2px 0;">第${week}周 / 12周 · ${phase.name}</div>
          </div>
          <div style="text-align:center;">
            <div style="font-size:28px;">${todayWorkouts.length > 0 ? '💪' : '⭐'}</div>
            <div style="font-size:11px;opacity:0.8;">${todayWorkouts.length > 0 ? '已训练' : '待训练'}</div>
          </div>
        </div>
        <div class="progress-bar" style="margin-top:10px;background:rgba(255,255,255,0.3);border-radius:10px;">
          <div class="fill" style="width:${(week/12)*100}%;background:#fff;border-radius:10px;"></div>
        </div>
        <div style="font-size:11px;opacity:0.7;margin-top:8px;text-align:center;">点击查看打卡日历 📊</div>
      </div>
    </a>
  `;

  // 模式切换器
  const modeOptions = [
    { key: 'both', label: '全部', emoji: '⚡' },
    { key: 'fitness', label: '锻炼', emoji: '💪' },
    { key: 'fat-loss', label: '减脂', emoji: '🫀' }
  ];
  html += `
    <div style="display:flex;gap:0;margin-bottom:12px;background:var(--surface);border-radius:var(--radius);padding:3px;box-shadow:var(--shadow);">
  `;
  modeOptions.forEach(opt => {
    const isActive = activeMode === opt.key;
    const activeStyle = isActive
      ? (opt.key === 'fat-loss' ? 'background:#4A90D9;color:#fff;font-weight:600;'
      : opt.key === 'fitness' ? 'background:var(--primary);color:#fff;font-weight:600;'
      : 'background:var(--primary);color:#fff;font-weight:600;')
      : 'color:var(--text-secondary);';
    html += `
      <div onclick="switchMode('${opt.key}')" style="flex:1;padding:8px 4px;text-align:center;font-size:12px;border-radius:var(--radius-sm);cursor:pointer;transition:all 0.2s;${activeStyle}">
        ${opt.emoji} ${opt.label}
      </div>
    `;
  });
  html += `</div>`;

  // 统计卡片（根据模式动态生成）
  const todayMealCount = todayMeals.length;
  const weightDisplay = progressRecords.length > 0
    ? `${progressRecords[progressRecords.length - 1].weight}kg`
    : '—';

  const statItems = [];
  if (showFitness) {
    statItems.push(`
      <a href="#/week-workout" style="text-decoration:none;color:inherit;">
        <div class="stat-card" style="cursor:pointer;padding:10px;position:relative;overflow:hidden;">
          <div style="position:absolute;top:-4px;right:-4px;font-size:20px;opacity:0.1;">💪</div>
          <div style="font-size:16px;margin-bottom:2px;">🏃‍♀️</div>
          <div class="stat-value" style="font-size:20px;">${weekWorkouts.length}/${phase.frequency}</div>
          <div class="stat-label">本周训练</div>
        </div>
      </a>
    `);
  }
  if (showFatLoss) {
    statItems.push(`
      <a href="#/fat-loss" style="text-decoration:none;color:inherit;">
        <div class="stat-card" style="cursor:pointer;padding:10px;position:relative;overflow:hidden;border-top:3px solid #4A90D9;">
          <div style="position:absolute;top:-4px;right:-4px;font-size:20px;opacity:0.1;">🫀</div>
          <div style="font-size:16px;margin-bottom:2px;">🫀</div>
          <div class="stat-value" style="font-size:20px;color:#2563EB;">${flWeekCount}/3</div>
          <div class="stat-label">减脂训练</div>
        </div>
      </a>
    `);
  }
  statItems.push(`
    <div class="stat-card accent" style="padding:10px;position:relative;overflow:hidden;">
      <div style="position:absolute;top:-4px;right:-4px;font-size:20px;opacity:0.1;">🍽️</div>
      <div style="font-size:16px;margin-bottom:2px;">🥗</div>
      <div class="stat-value" style="font-size:20px;">${todayMealCount}/4</div>
      <div class="stat-label">今日餐食</div>
    </div>
  `);
  const statCols = statItems.length;
  html += `
    <div class="stat-grid" style="grid-template-columns:repeat(${statCols},1fr);">
      ${statItems.join('')}
    </div>
  `;

  // 今日训练（仅锻炼模式或全部模式时显示）
  if (showFitness) {
  if (todayWorkoutIdx >= 0 && phase.workouts[todayWorkoutIdx]) {
    const workout = phase.workouts[todayWorkoutIdx];
    const completed = todayWorkouts.length > 0;
    const cardStyle = completed
      ? 'border-left:4px solid var(--primary);background:var(--primary-light);'
      : 'border-left:4px solid var(--accent);';
    html += `
      <a href="#/training?expand=today" style="text-decoration:none;color:inherit;">
        <div class="card" style="${cardStyle}margin-bottom:12px;position:relative;overflow:hidden;">
          <div style="position:absolute;top:-5px;right:10px;font-size:28px;opacity:0.12;">${completed ? '✅' : '💪'}</div>
          <div class="flex-between">
            <div>
              <div class="font-sm text-secondary">💪 今日训练 · 第${round}轮/共${totalRounds}轮</div>
              <div class="font-lg font-bold mt-8">${workout.label}</div>
              <div class="font-sm text-secondary">${workout.exercises.length}个动作 · 预计45分钟</div>
            </div>
            <div style="text-align:right;">
              <span class="badge ${completed ? 'badge-primary' : 'badge-accent'}">${completed ? '✓ 已完成' : '待完成'}</span>
              <div style="margin-top:8px;color:var(--text-hint);">${icons.chevron}</div>
            </div>
          </div>
        </div>
      </a>
    `;
  } else {
    html += `
      <div class="card text-center" style="margin-bottom:12px;position:relative;overflow:hidden;">
        <div style="position:absolute;top:-8px;left:-8px;font-size:36px;opacity:0.08;">🌙</div>
        <div style="position:absolute;bottom:-8px;right:-8px;font-size:36px;opacity:0.08;">☕</div>
        <div style="font-size:32px;">🛌</div>
        <div class="font-bold mt-8">今天是休息日</div>
        <div class="font-sm text-secondary mt-8">建议做${phase.cardio.duration}的${phase.cardio.options[0]}</div>
      </div>
    `;
  }
  }

  // 减脂训练打卡卡片（仅减脂模式或全部模式时显示）
  if (showFatLoss) {
  if (fatLossTodayIdx >= 0 && flPhase.workouts[fatLossTodayIdx]) {
    const flWorkout = flPhase.workouts[fatLossTodayIdx];
    const flCardStyle = fatLossCompleted
      ? 'border-left:4px solid #4A90D9;background:linear-gradient(135deg,#EBF5FF,var(--surface));'
      : 'border-left:4px solid #4A90D9;';
    html += `
      <a href="#/fat-loss?expand=today" style="text-decoration:none;color:inherit;">
        <div class="card" style="${flCardStyle}margin-bottom:12px;position:relative;overflow:hidden;">
          <div style="position:absolute;top:-5px;right:10px;font-size:28px;opacity:0.12;">${fatLossCompleted ? '✅' : '🫀'}</div>
          <div class="flex-between">
            <div>
              <div class="font-sm text-secondary">🫀 减脂训练 · 第${fatLossRound}轮/共4轮 · 第${fatLossWeek}周</div>
              <div class="font-lg font-bold mt-8">${flWorkout.label}</div>
              <div class="font-sm text-secondary">${flWorkout.exercises.length}个环节 · ${flPhase.name}</div>
            </div>
            <div style="text-align:right;">
              <span class="badge ${fatLossCompleted ? 'badge-primary' : ''}" style="${fatLossCompleted ? '' : 'background:#4A90D9;color:#fff;'}">${fatLossCompleted ? '✓ 已完成' : '待完成'}</span>
              <div style="margin-top:8px;color:var(--text-hint);">${icons.chevron}</div>
            </div>
          </div>
        </div>
      </a>
    `;
  } else if (fatLossTodayIdx < 0) {
    // 非训练日也显示一个小提示
    html += `
      <a href="#/fat-loss" style="text-decoration:none;color:inherit;">
        <div class="card text-center" style="margin-bottom:12px;border-left:4px solid #4A90D9;position:relative;overflow:hidden;">
          <div style="position:absolute;top:-8px;left:-8px;font-size:36px;opacity:0.06;">🫀</div>
          <div style="font-size:28px;">🚶</div>
          <div class="font-bold mt-8" style="font-size:14px;color:#2563EB;">🫀 减脂休息日</div>
          <div class="font-sm text-secondary mt-8">建议20-30分钟轻松散步促进恢复</div>
        </div>
      </a>
    `;
  }
  }

  // 今日餐食概览
  const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];
  const mealLabels = { breakfast: '早餐', lunch: '午餐', dinner: '晚餐', snack: '加餐' };
  const mealIcons = { breakfast: '🌅', lunch: '☀️', dinner: '🌙', snack: '🍎' };

  html += `
    <a href="#/diet" style="text-decoration:none;color:inherit;">
      <div class="card" style="margin-bottom:12px;position:relative;overflow:hidden;">
        <div style="position:absolute;top:-5px;right:10px;font-size:28px;opacity:0.12;">🥗</div>
        <div class="flex-between mb-8">
          <div class="card-title" style="margin:0;">🥗 今日餐食</div>
          <span class="font-sm text-secondary">查看全部 ${icons.chevron}</span>
        </div>
  `;

  mealTypes.forEach(mt => {
    const meal = dayMenu.meals[mt];
    if (!meal) return;
    const done = todayMeals.some(m => m.recipeId === meal.id);
    html += `
      <div class="flex-between" style="padding:8px 0;border-bottom:1px solid var(--divider);">
        <div style="flex:1;">
          <span style="margin-right:6px;">${mealIcons[mt]}</span>
          <span class="font-sm">${mealLabels[mt]}</span>
          <span class="font-sm text-secondary" style="margin-left:6px;">${meal.name}</span>
        </div>
        <span class="${done ? 'text-accent' : 'text-secondary'}" style="${done ? 'font-weight:800;font-size:18px;' : ''}">${done ? '✓' : '○'}</span>
      </div>
    `;
  });

  html += `</div></a>`;

  // 体重追踪
  if (progressRecords.length > 0) {
    const latest = progressRecords[progressRecords.length - 1];
    const first = progressRecords[0];
    const change = (latest.weight - first.weight).toFixed(1);
    html += `
      <a href="#/progress" style="text-decoration:none;color:inherit;">
        <div class="card" style="margin-bottom:12px;">
          <div class="flex-between">
            <div>
              <div class="font-sm text-secondary">${icons.scale} 当前体重</div>
              <div class="font-lg font-bold text-primary">${latest.weight} kg</div>
            </div>
            <div class="text-right">
              <div class="font-sm text-secondary">变化</div>
              <div class="font-bold ${change < 0 ? 'text-primary' : change > 0 ? 'text-danger' : ''}">${change < 0 ? '↓' : change > 0 ? '↑' : '→'} ${Math.abs(change)}kg</div>
            </div>
          </div>
        </div>
      </a>
    `;
  }

  // 备孕运动入口
  html += `
    <a href="#/prepregnancy" style="text-decoration:none;color:inherit;">
      <div class="card" style="margin-bottom:12px;border-left:4px solid #FF9A8B;background:linear-gradient(135deg,#FFF5F3,var(--surface));">
        <div class="flex-between">
          <div>
            <div class="font-bold" style="color:#FF7E6B;font-size:15px;">🌸 备孕运动专项</div>
            <div class="font-sm text-secondary mt-8">盆底肌 · 核心稳定 · 骨盆灵活 · 分娩准备</div>
          </div>
          <span style="font-size:24px;color:var(--text-hint);">›</span>
        </div>
      </div>
    </a>
  `;

  // 热量计算器（内嵌可展开）
  const profile = store.state.userProfile;
  const hasProfile = profile && profile.weight && profile.height && profile.age;
  html += `
    <div class="card" style="margin-bottom:12px;">
      <div class="flex-between" onclick="toggleCalcCard()" style="cursor:pointer;">
        <div class="card-title" style="margin:0;">${icons.calc} 热量计算器</div>
        <span class="text-secondary" id="calc-chevron">${icons.chevronDown}</span>
      </div>
      <div class="font-sm text-secondary mt-8">${hasProfile ? '点击查看你的减脂方案' : '计算你的BMR和减脂期热量'}</div>
      <div id="calc-expand" class="exercise-detail" style="padding-top:12px;">
        <div class="form-group">
          <label>性别</label>
          <select class="form-control" id="calc-gender">
            <option value="male" ${profile?.gender === 'male' ? 'selected' : ''}>男</option>
            <option value="female" ${profile?.gender === 'female' ? 'selected' : ''}>女</option>
          </select>
        </div>
        <div class="form-group">
          <label>年龄</label>
          <input type="number" class="form-control" id="calc-age" placeholder="如：30" value="${profile?.age || ''}">
        </div>
        <div class="form-group">
          <label>身高（cm）</label>
          <input type="number" class="form-control" id="calc-height" placeholder="如：175" value="${profile?.height || ''}">
        </div>
        <div class="form-group">
          <label>体重（kg）</label>
          <input type="number" step="0.1" class="form-control" id="calc-weight" placeholder="如：75.0" value="${profile?.weight || ''}">
        </div>
        <div class="form-group">
          <label>活动水平</label>
          <select class="form-control" id="calc-activity">
            <option value="1.2" ${profile?.activityLevel === 1.2 ? 'selected' : ''}>久坐不动（办公室工作，不运动）</option>
            <option value="1.375" ${profile?.activityLevel === 1.375 ? 'selected' : ''}>轻度活动（每周1-3次运动）</option>
            <option value="1.55" ${profile?.activityLevel === 1.55 ? 'selected' : ''}>中度活动（每周3-5次运动）</option>
            <option value="1.725" ${profile?.activityLevel === 1.725 ? 'selected' : ''}>高度活动（每周6-7次运动）</option>
          </select>
        </div>
        <button class="btn btn-primary btn-full" onclick="calculateBMR()">开始计算</button>
        <div id="calc-result"></div>
        <div class="font-sm text-secondary mt-8" style="line-height:1.7;">
          <strong>公式：</strong>Mifflin-St Jeor<br>
          男：BMR = 10×体重 + 6.25×身高 − 5×年龄 + 5<br>
          女：BMR = 10×体重 + 6.25×身高 − 5×年龄 − 161<br>
          减脂期 = TDEE − 500大卡/天（约每周减0.5kg脂肪）
        </div>
      </div>
    </div>
  `;

  // 提醒入口（放在页面最底部）
  html += `
    <a href="#/reminders" style="text-decoration:none;color:inherit;">
      <div class="card" style="margin-bottom:12px;">
        <div class="flex-between">
          <div class="card-title" style="margin:0;">${icons.bell} 提醒设置</div>
          <span class="text-secondary">${icons.chevron}</span>
        </div>
        <div class="font-sm text-secondary mt-8">管理用餐和训练提醒</div>
      </div>
    </a>
  `;

  html += `</div>`;
  container.innerHTML = html;

  // 如果已有档案，自动展开并计算
  if (hasProfile) {
    const expand = document.getElementById('calc-expand');
    if (expand) expand.classList.add('show');
    const chevron = document.getElementById('calc-chevron');
    if (chevron) chevron.style.transform = 'rotate(180deg)';
    calculateBMR();
  }

  // 计算器展开/收起
  window.toggleCalcCard = () => {
    const el = document.getElementById('calc-expand');
    const chevron = document.getElementById('calc-chevron');
    if (el) {
      const isShow = el.classList.toggle('show');
      if (chevron) chevron.style.transform = isShow ? 'rotate(180deg)' : 'rotate(0deg)';
    }
  };

  // 计算函数
  window.calculateBMR = async () => {
    const gender = document.getElementById('calc-gender').value;
    const age = parseInt(document.getElementById('calc-age').value);
    const height = parseFloat(document.getElementById('calc-height').value);
    const weight = parseFloat(document.getElementById('calc-weight').value);
    const activity = parseFloat(document.getElementById('calc-activity').value);

    if (!age || !height || !weight) {
      alert('请填写完整信息');
      return;
    }

    let bmr;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const tdee = bmr * activity;
    const cutCalories = tdee - 500;
    const maintainCalories = tdee;
    const bulkCalories = tdee + 300;

    const proteinLow = Math.round(weight * 1.6);
    const proteinHigh = Math.round(weight * 2.2);

    const proteinCalories = proteinLow * 4;
    const fatCalories = cutCalories * 0.25;
    const carbCalories = cutCalories - proteinCalories - fatCalories;

    const resultDiv = document.getElementById('calc-result');
    if (resultDiv) {
      resultDiv.innerHTML = `
        <div style="background:var(--primary-light);padding:14px;border-radius:var(--radius);text-align:center;margin-top:12px;margin-bottom:12px;">
          <div class="font-sm text-secondary">减脂期每日摄入</div>
          <div style="font-size:28px;font-weight:700;color:var(--primary-dark);">${cutCalories.toFixed(0)}</div>
          <div class="font-sm text-secondary">大卡/天</div>
        </div>
        <table class="data-table">
          <tr><td>基础代谢 BMR</td><td class="text-right font-bold">${bmr.toFixed(0)}</td></tr>
          <tr><td>每日总消耗 TDEE</td><td class="text-right font-bold">${tdee.toFixed(0)}</td></tr>
          <tr><td>维持体重</td><td class="text-right">${maintainCalories.toFixed(0)}</td></tr>
          <tr><td>增肌期</td><td class="text-right">${bulkCalories.toFixed(0)}</td></tr>
        </table>
        <div class="stat-grid" style="margin-top:12px;">
          <div class="stat-card">
            <div class="stat-value">${proteinLow}-${proteinHigh}g</div>
            <div class="stat-label">蛋白质</div>
          </div>
          <div class="stat-card accent">
            <div class="stat-value">${(carbCalories/4).toFixed(0)}g</div>
            <div class="stat-label">碳水</div>
          </div>
        </div>
        <div class="stat-grid" style="grid-template-columns:1fr;">
          <div class="stat-card">
            <div class="stat-value" style="color:var(--warning);">${(fatCalories/9).toFixed(0)}g</div>
            <div class="stat-label">脂肪（占25%）</div>
          </div>
        </div>
        <div class="font-sm text-secondary mt-8" style="text-align:center;">
          预计每周减脂约 0.5kg
        </div>
      `;
    }

    // 保存到用户档案
    const profileData = { key: 'profile', gender, age, height, weight, activityLevel: activity };
    await db.put('userProfile', profileData);
    store.setState({ userProfile: profileData });
  };

  // 模式切换
  window.switchMode = async (mode) => {
    store.setState({ activeMode: mode });
    try {
      await db.put('settings', { key: 'activeMode', value: mode });
    } catch (e) {}
    // 重新渲染导航栏
    renderBottomNav();
    // 重新渲染首页
    await renderDashboard();
  };
}
