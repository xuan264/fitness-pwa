// 备孕运动专项页面
import { store } from '../js/store.js';
import { prepregnancyPlan } from '../data/prepregnancy-plan.js';
import { getDayOfWeek, getDayName } from '../js/utils.js';

// 0=今日计划, 1-5=各类别
let activeTab = 0;
let expandedExercise = null;

// 构建动作ID到类别索引+动作的映射
function buildExerciseMap() {
  const map = {};
  prepregnancyPlan.categories.forEach((cat, catIdx) => {
    cat.exercises.forEach((ex) => {
      map[ex.id] = { catIdx: catIdx + 1, exercise: ex, category: cat };
    });
  });
  return map;
}

export function renderPrepregnancy(params) {
  const container = document.getElementById('page-container');
  const week = store.state.currentWeek || 1;
  const round = store.state.currentRound || 1;
  const totalRounds = store.state.totalRounds || 4;
  const weekInRound = ((week - 1) % 4) + 1;
  const todayDow = getDayOfWeek();

  const categories = prepregnancyPlan.categories;

  // Tab 列表：今日计划 + 5个类别
  const tabs = [
    { id: 'today', name: '今日计划', icon: '📌' },
    ...categories.map(c => ({ id: c.id, name: c.name, icon: c.icon, color: c.color }))
  ];

  let html = `
    <div class="page">
      <div style="background:linear-gradient(135deg,#FF9A8B,#FF7E6B);color:#fff;padding:16px;border-radius:20px;margin-bottom:16px;position:relative;overflow:hidden;">
        <div style="position:absolute;top:-10px;right:-10px;font-size:60px;opacity:0.15;">🤰</div>
        <div style="font-size:13px;opacity:0.9;">⭐ 第${round}轮 / 共${totalRounds}轮 · 第${week}周/12周</div>
        <div style="font-size:20px;font-weight:700;margin:4px 0;">🌸 备孕运动专项</div>
        <div style="font-size:13px;opacity:0.9;">为怀孕、生产、产后恢复打好身体基础</div>
      </div>

      <!-- 安全提示 -->
      <div class="card" style="border-left:4px solid var(--warning);background:#FFFDF5;">
        <div class="font-bold" style="color:#E6A700;margin-bottom:6px;">⚠️ 安全须知</div>
        ${prepregnancyPlan.meta.safetyNotes.map(n => `<div style="font-size:12px;color:var(--text-secondary);margin-bottom:3px;">${n}</div>`).join('')}
      </div>

      <!-- Tab 栏（换行布局） -->
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px;">
        ${tabs.map((t, i) => {
          const isActive = i === activeTab;
          const color = t.color || '#FF9A8B';
          return `
            <div onclick="switchPrepTab(${i})" style="padding:8px 12px;border-radius:20px;font-size:13px;font-weight:600;cursor:pointer;transition:all 0.2s;background:${isActive ? color : 'var(--surface)'};color:${isActive ? '#fff' : 'var(--text-secondary)'};border:1.5px solid ${isActive ? color : 'var(--divider)'};">
              ${t.icon} ${t.name}
            </div>
          `;
        }).join('')}
      </div>

      <!-- 内容区域 -->
      <div id="prep-content"></div>

      <div style="text-align:center;padding:16px 0;color:var(--text-hint);font-size:12px;">
        🌱 四轮减脂完成后，身体将达到最佳备孕状态<br>
        坚持备孕运动，迎接新生命 🤰
      </div>
    </div>

    <style>
      .prep-exercise-card {
        background: var(--surface);
        border-radius: 14px;
        padding: 14px;
        margin-bottom: 10px;
        border: 1px solid var(--divider);
        box-shadow: var(--shadow);
      }
      .prep-tag {
        display: inline-block;
        padding: 2px 8px;
        border-radius: 10px;
        font-size: 11px;
        font-weight: 600;
      }
    </style>
  `;

  container.innerHTML = html;

  window.switchPrepTab = (idx) => {
    activeTab = idx;
    expandedExercise = null;
    renderPrepregnancy();
  };

  window.togglePrepExercise = (exId) => {
    expandedExercise = expandedExercise === exId ? null : exId;
    renderPrepregnancy();
  };

  // 点击今日计划中的动作，跳转到对应类别并展开
  window.jumpToExercise = (exerciseId) => {
    const exMap = buildExerciseMap();
    const info = exMap[exerciseId];
    if (!info) return;
    activeTab = info.catIdx;
    expandedExercise = exerciseId;
    renderPrepregnancy();
    // 滚动到内容区域顶部
    const content = document.getElementById('prep-content');
    if (content) content.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // 渲染当前 Tab 内容
  if (activeTab === 0) {
    renderTodayPlan(todayDow, weekInRound);
  } else {
    renderCategoryContent(categories[activeTab - 1], weekInRound);
  }
}

// ===== 今日计划（只显示当天） =====
function renderTodayPlan(todayDow, weekInRound) {
  const el = document.getElementById('prep-content');
  if (!el) return;

  const plan = prepregnancyPlan.dailyPlan;
  const today = plan.find(d => d.day === todayDow) || plan[0];
  const exMap = buildExerciseMap();
  const typeColor = today.type === '训练日' ? '#6BCB77' : '#FF9A8B';
  const typeBg = today.type === '训练日' ? '#E8F5E9' : '#FFF5F3';

  let html = `
    <div class="card" style="border-left:4px solid ${typeColor};background:${typeBg};">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
        <div style="display:flex;align-items:center;gap:8px;">
          <span style="font-size:20px;font-weight:700;">${getDayName(todayDow)}</span>
          <span class="prep-tag" style="background:${typeColor};color:#fff;">今天</span>
          <span class="prep-tag" style="background:${typeColor}20;color:${typeColor};">${today.label}</span>
        </div>
        <span class="font-sm text-secondary">${today.duration}</span>
      </div>
      <div class="font-sm" style="color:var(--text-secondary);margin-bottom:4px;">${today.note}</div>
      <div class="font-sm" style="color:var(--text-hint);">📊 第${weekInRound}周训练参数 · 点击动作查看详情</div>
    </div>
  `;

  today.exercises.forEach((ex, i) => {
    const info = exMap[ex.exerciseId];
    const wp = info && info.exercise.weeklyProgress ? info.exercise.weeklyProgress[weekInRound - 1] : null;

    html += `
      <div class="prep-exercise-card" style="cursor:pointer;" onclick="jumpToExercise('${ex.exerciseId}')">
        <div style="display:flex;align-items:center;justify-content:space-between;">
          <div style="flex:1;">
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
              <span style="font-size:14px;color:var(--text-hint);">${i+1}</span>
              <span style="font-size:15px;font-weight:700;">${ex.name}</span>
              ${info && info.exercise.lumbarSafe ? '<span class="prep-tag" style="background:#E8F5E9;color:#2E7D32;">✅ 腰椎安全</span>' : ''}
            </div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
              ${wp ? `
                <span class="prep-tag" style="background:var(--primary-light);color:var(--primary-dark);">📊 ${wp.sets}组 × ${wp.reps}</span>
                ${wp.weight ? `<span class="prep-tag" style="background:var(--bg);color:var(--text-secondary);">${wp.weight}</span>` : ''}
              ` : ''}
              <span class="prep-tag" style="background:var(--bg);color:var(--text-secondary);">⏱ ${ex.duration}</span>
            </div>
            ${wp && wp.note ? `<div style="font-size:12px;color:var(--text-secondary);margin-top:4px;">${wp.note}</div>` : ''}
          </div>
          <span style="font-size:18px;color:var(--text-hint);">›</span>
        </div>
      </div>
    `;
  });

  // 底部提示
  html += `
    <div class="card" style="text-align:center;padding:12px;background:var(--bg);">
      <div class="font-sm text-secondary">💡 点击上方动作可查看详细介绍和动作要领</div>
      <div class="font-sm text-secondary mt-8">📅 切换上方Tab可浏览全部备孕运动</div>
    </div>
  `;

  el.innerHTML = html;
}

// ===== 类别内容 =====
function renderCategoryContent(cat, weekInRound) {
  const el = document.getElementById('prep-content');
  if (!el) return;

  let html = `
    <div class="card" style="border-left:4px solid ${cat.color};">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
        <span style="font-size:24px;">${cat.icon}</span>
        <span style="font-size:16px;font-weight:700;">${cat.name}</span>
      </div>
      <div style="font-size:13px;color:var(--text-secondary);margin-bottom:8px;">${cat.description}</div>
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px;">
        ${cat.benefits.map(b => `<span class="prep-tag" style="background:${cat.color}20;color:${cat.color};">✓ ${b}</span>`).join('')}
      </div>
      <div class="font-sm" style="color:var(--text-secondary);">📅 ${cat.schedule}</div>
    </div>
  `;

  cat.exercises.forEach((ex) => {
    const isOpen = expandedExercise === ex.id;
    const wp = ex.weeklyProgress ? ex.weeklyProgress[weekInRound - 1] : null;

    html += `
      <div class="prep-exercise-card">
        <div onclick="togglePrepExercise('${ex.id}')" style="cursor:pointer;">
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <div style="flex:1;">
              <div style="font-size:15px;font-weight:700;margin-bottom:4px;">${ex.name}</div>
              <div style="display:flex;gap:6px;flex-wrap:wrap;">
                <span class="prep-tag" style="background:var(--bg);color:var(--text-secondary);">⏱ ${ex.duration}</span>
                <span class="prep-tag" style="background:var(--primary-light);color:var(--primary-dark);">${ex.difficulty}</span>
                ${ex.lumbarSafe ? '<span class="prep-tag" style="background:#E8F5E9;color:#2E7D32;">✅ 腰椎安全</span>' : ''}
              </div>
            </div>
            <span style="font-size:18px;color:var(--text-hint);">${isOpen ? '▴' : '▾'}</span>
          </div>
        </div>
    `;

    if (isOpen) {
      html += `
        <div style="margin-top:12px;padding-top:12px;border-top:1px solid var(--divider);">
          ${ex.lumbarNote ? `<div style="font-size:12px;color:#2E7D32;margin-bottom:8px;font-weight:600;">${ex.lumbarNote}</div>` : ''}

          <div class="font-bold" style="font-size:13px;margin-bottom:6px;">📝 动作步骤</div>
          <ol style="margin:0 0 10px 0;padding-left:20px;">
            ${ex.steps.map(s => `<li style="font-size:13px;color:var(--text-primary);margin-bottom:4px;">${s}</li>`).join('')}
          </ol>

          <div class="font-bold" style="font-size:13px;margin-bottom:6px;">💡 要点提示</div>
          <div style="margin-bottom:10px;">
            ${ex.cues.map(c => `<div style="font-size:12px;color:var(--text-secondary);margin-bottom:3px;">• ${c}</div>`).join('')}
          </div>
      `;

      if (wp) {
        html += `
          <div style="background:var(--bg);border-radius:10px;padding:10px;margin-top:8px;">
            <div class="font-bold" style="font-size:13px;margin-bottom:6px;">📊 第${weekInRound}周训练参数</div>
            <div style="display:flex;gap:12px;flex-wrap:wrap;font-size:13px;">
              <span><b>${wp.sets}</b> 组</span>
              <span><b>${wp.reps}</b></span>
              ${wp.weight ? `<span>重量: <b>${wp.weight}</b></span>` : ''}
            </div>
            <div style="font-size:12px;color:var(--text-secondary);margin-top:4px;">${wp.note}</div>
          </div>
        `;
      }

      if (ex.weeklyProgress) {
        html += `
          <div style="margin-top:8px;">
            <div class="font-sm text-secondary" style="margin-bottom:4px;">📈 4周渐进计划</div>
            <div style="display:flex;gap:4px;">
              ${ex.weeklyProgress.map((w, i) => `
                <div style="flex:1;text-align:center;padding:6px 2px;border-radius:8px;background:${i === weekInRound-1 ? cat.color+'30' : 'var(--bg)'};border:1px solid ${i === weekInRound-1 ? cat.color : 'var(--divider)'};">
                  <div style="font-size:10px;color:var(--text-secondary);">W${i+1}</div>
                  <div style="font-size:11px;font-weight:600;">${w.sets}×${w.reps}</div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }

      html += `</div>`;
    }

    html += `</div>`;
  });

  el.innerHTML = html;
}
