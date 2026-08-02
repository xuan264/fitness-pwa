// 减脂恢复脂肪肝训练页面
import { store } from '../js/store.js';
import { db } from '../js/db.js';
import { fatLossPlan } from '../data/fat-loss-plan.js';
import { icons, getDayOfWeek, getWeeklyParams } from '../js/utils.js';
import { todayStr } from '../js/utils.js';

// 减脂训练的周次/轮次独立计算
// 使用独立的 startDate 存储，首次访问时自动设置
let fatLossState = {
  startDate: null,
  currentWeek: 1,
  currentRound: 1,
  totalRounds: 4
};

// 训练日映射：周一→0, 周三→1, 周五→2
const FAT_LOSS_DAY_MAP = { 1: 0, 3: 1, 5: 2 };

async function initFatLossState() {
  // 读取独立的开始日期
  try {
    const saved = await db.get('settings', 'fatLossStartDate');
    if (saved?.value) {
      fatLossState.startDate = saved.value;
    } else {
      // 首次访问：设为今天
      const today = todayStr();
      fatLossState.startDate = today;
      await db.put('settings', { key: 'fatLossStartDate', value: today });
      fatLossState.currentWeek = 1;
      fatLossState.currentRound = 1;
      return;
    }
  } catch (e) {
    // 降级：用今天
    fatLossState.startDate = todayStr();
  }

  // 计算当前周数和轮次
  const start = new Date(fatLossState.startDate);
  const now = new Date();
  const diffDays = Math.floor((now - start) / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(diffDays / 7) + 1;
  fatLossState.currentRound = Math.floor((totalWeeks - 1) / 12) + 1;
  fatLossState.currentWeek = ((totalWeeks - 1) % 12) + 1;
}

function getFatLossPhase() {
  const week = fatLossState.currentWeek;
  if (week <= 3) return 0;
  if (week <= 6) return 1;
  if (week <= 9) return 2;
  return 3;
}

export async function renderFatLoss(params) {
  await initFatLossState();

  const week = fatLossState.currentWeek;
  const round = fatLossState.currentRound;
  const totalRounds = fatLossState.totalRounds;
  const currentPhaseIdx = getFatLossPhase();
  const phase = fatLossPlan.phases[currentPhaseIdx];
  const dow = getDayOfWeek();
  const todayWorkoutIdx = FAT_LOSS_DAY_MAP[dow] ?? -1;

  const container = document.getElementById('page-container');

  // 是否从首页点击过来，自动展开今日训练详情
  const autoExpandToday = params && params.expand === 'today';

  // 检查今日训练是否已完成（用 type='fat-loss' 区分）
  let completed = false;
  if (todayWorkoutIdx >= 0) {
    completed = await checkFatLossCompleted();
  }

  let html = `<div class="page">`;

  // ===== 顶部进度条 =====
  html += `
    <div style="background:linear-gradient(135deg,#4A90D9,#2563EB);color:#fff;padding:16px;border-radius:20px;margin-bottom:16px;position:relative;overflow:hidden;">
      <div style="position:absolute;top:-8px;right:-8px;font-size:50px;opacity:0.15;">🫀</div>
      <div style="font-size:13px;opacity:0.9;">⭐ 第${round}轮 / 共${totalRounds}轮 · 第${week}周/12周</div>
      <div style="font-size:24px;font-weight:700;margin:4px 0;">${phase.name}</div>
      <div style="font-size:14px;opacity:0.9;">🎯 ${fatLossPlan.meta.target}</div>
      <div class="progress-bar" style="margin-top:10px;background:rgba(255,255,255,0.3);border-radius:10px;">
        <div class="fill" style="width:${(week/12)*100}%;background:#fff;border-radius:10px;"></div>
      </div>
    </div>
  `;

  // ===== 减脂目标提示卡 =====
  html += `
    <div class="card" style="margin-bottom:16px;border-left:4px solid #4A90D9;background:linear-gradient(135deg,#EBF5FF,var(--surface));">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
        <span style="font-size:18px;">📋</span>
        <span class="font-bold" style="color:#2563EB;">减重目标</span>
      </div>
      <div style="font-size:13px;line-height:1.8;">
        <div><span class="text-secondary">减重3-5%：</span>改善肝脂肪变</div>
        <div><span class="text-secondary">减重5-7%：</span>肝脂肪变明显缓解</div>
        <div><span class="text-secondary">减重7-10%：</span>NASH缓解</div>
        <div><span class="text-secondary">减重>10%：</span>肝纤维化逆转</div>
      </div>
      <div class="font-sm text-secondary mt-8" style="font-size:11px;">依据：中华医学会肝病学分会 MAFLD 防治指南（2024）</div>
    </div>
  `;

  // ===== 今日训练（最显眼区域）=====
  if (todayWorkoutIdx >= 0 && phase.workouts[todayWorkoutIdx]) {
    const workout = phase.workouts[todayWorkoutIdx];
    const totalTime = phase.split.startsWith('combined') ? '50分钟' : (phase.split === 'aerobic-core' ? '40分钟' : '30-35分钟');
    html += `
      <div class="card" style="border-left:4px solid var(--accent);margin-bottom:16px;">
        <div class="flex-between mb-8">
          <div>
            <div class="font-sm text-secondary">今日训练 · ${workout.dayName}</div>
            <div class="font-lg font-bold">${workout.label}</div>
          </div>
          <span class="badge ${completed ? 'badge-primary' : 'badge-accent'}">${completed ? '已完成 ✓' : '待完成'}</span>
        </div>
        <div class="font-sm text-secondary mb-12">${workout.exercises.length}个环节 · 预计${totalTime}</div>
    `;

    // 今日动作快速预览（显示当前周参数）
    html += `<div style="margin-bottom:12px;">`;
    workout.exercises.forEach((ex, i) => {
      const wp = getWeeklyParams(ex, week, round);
      html += `
        <div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid var(--divider);">
          <span style="width:20px;height:20px;border-radius:50%;background:#4A90D9;color:#fff;font-size:11px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">${i+1}</span>
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
    html += `<button class="btn btn-primary btn-full" onclick="toggleFatLossTodayDetail()">${autoExpandToday ? '收起动作详情' : '查看动作详情'}</button>`;

    // 详情区域
    html += `<div id="fl-today-detail" class="exercise-detail ${autoExpandToday ? 'show' : ''}" style="padding-top:12px;">`;

    // 热身详情
    if (workout.warmup && workout.warmup.length) {
      html += `<div class="exercise-section"><h4>热身</h4><ul>`;
      workout.warmup.forEach(item => {
        html += `<li>${item.name} <span class="text-secondary">(${item.duration})</span></li>`;
      });
      html += `</ul></div>`;
    }

    // 动作详情
    html += `<div class="exercise-section"><h4>正式训练</h4>`;
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
            <span class="text-secondary">强度/重量：</span>${wp.weight}
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
          <div class="font-sm text-secondary" style="margin-top:4px;">目标：${(ex.muscle || []).join('、')}</div>
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
    html += `<button class="btn btn-accent btn-full mt-8" onclick="markFatLossDone()">${completed ? '✓ 已完成训练' : '打卡完成训练'}</button>`;

    html += `</div>`; // 关闭 today-detail
    html += `</div>`; // 关闭 card
  } else {
    html += `
      <div class="card text-center" style="margin-bottom:16px;">
        <div style="font-size:32px;">🛌</div>
        <div class="font-bold mt-8">今天是休息日</div>
        <div class="font-sm text-secondary mt-8">建议做20-30分钟的轻松散步，促进恢复</div>
        <div class="font-sm text-secondary mt-8" style="font-size:12px;">休息日也是减脂的重要环节——身体在恢复中消耗脂肪</div>
      </div>
    `;
  }

  // ===== 阶段总览（Tab 切换）=====
  html += `<div class="card-title" style="margin:16px 0 8px;">训练阶段总览</div>`;

  // Tab 栏
  html += `<div class="phase-tabs" style="display:flex;gap:0;margin-bottom:12px;background:var(--surface);border-radius:var(--radius);padding:3px;box-shadow:var(--shadow);">`;
  for (let i = 0; i < fatLossPlan.phases.length; i++) {
    const p = fatLossPlan.phases[i];
    const isActive = i === currentPhaseIdx;
    html += `
      <div class="fl-phase-tab ${isActive ? 'active' : ''}" onclick="switchFlPhaseTab(${i})" style="flex:1;padding:10px 4px;text-align:center;font-size:12px;border-radius:var(--radius-sm);cursor:pointer;transition:all 0.2s;${isActive ? 'background:#4A90D9;color:#fff;font-weight:600;' : 'color:var(--text-secondary);'}">
        ${p.name}
      </div>
    `;
  }
  html += `</div>`;

  // 阶段内容容器
  for (let i = 0; i < fatLossPlan.phases.length; i++) {
    const p = fatLossPlan.phases[i];
    const isActive = i === currentPhaseIdx;
    const displayStyle = isActive ? 'block' : 'none';

    html += `<div id="fl-phase-tab-content-${i}" style="display:${displayStyle};">`;

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
          <div><span class="text-secondary">类型：</span>${p.acsmParams.type}</div>
          <div><span class="text-secondary">时长：</span>${p.acsmParams.duration}</div>
          <div><span class="text-secondary">强度：</span>${p.acsmParams.intensity}</div>
          <div style="grid-column:span 2;"><span class="text-secondary">超负荷：</span>${p.acsmParams.progressiveOverload}</div>
        </div>
      </div>
    `;

    // 训练日列表
    p.workouts.forEach((w, wIdx) => {
      const isToday = i === currentPhaseIdx && wIdx === todayWorkoutIdx;
      const exercisePreview = w.exercises.map((e, idx) => {
        const wp = getWeeklyParams(e, week, round);
        return `<span style="display:inline-block;background:var(--bg);border-radius:4px;padding:2px 8px;font-size:12px;margin:2px 2px 2px 0;">${idx+1}.${e.name} ${wp.sets}×${wp.reps}</span>`;
      }).join('');

      html += `
        <div class="card" style="margin-bottom:12px;${isToday ? 'border:2px solid var(--accent);' : ''}">
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:8px;">
            <span class="font-bold" style="font-size:15px;">${w.dayName} · ${w.label}</span>
            ${isToday ? '<span class="badge badge-accent">今日</span>' : ''}
          </div>
          <div style="margin-bottom:8px;">${exercisePreview}</div>
          <button class="btn btn-primary btn-full" onclick="toggleFlWorkoutDetail(${i},${wIdx})" id="fl-workout-btn-${i}-${wIdx}">查看动作详情</button>
          <div id="fl-workout-detail-${i}-${wIdx}" class="exercise-detail" style="padding-top:12px;">
      `;

      // 热身
      if (w.warmup && w.warmup.length) {
        html += `<div class="exercise-section"><h4>热身</h4><ul>`;
        w.warmup.forEach(item => {
          html += `<li>${item.name} <span class="text-secondary">(${item.duration})</span></li>`;
        });
        html += `</ul></div>`;
      }

      // 动作详情
      html += `<div class="exercise-section"><h4>正式训练</h4>`;
      w.exercises.forEach((ex, exIdx) => {
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
              <span class="text-secondary">强度/重量：</span>${wp.weight}
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
            <div class="font-sm text-secondary" style="margin-top:4px;">目标：${(ex.muscle || []).join('、')}</div>
          </div>
        `;
      });
      html += `</div>`;

      // 拉伸
      if (w.cooldown && w.cooldown.length) {
        html += `<div class="exercise-section"><h4>拉伸放松</h4><ul>`;
        w.cooldown.forEach(item => {
          html += `<li>${item.name} <span class="text-secondary">(${item.duration})</span></li>`;
        });
        html += `</ul></div>`;
      }

      html += `</div></div>`;
    });

    // 有氧建议
    html += `
      <div class="card" style="margin-bottom:12px;">
        <div class="card-title" style="margin-bottom:8px;">配套有氧</div>
        <div style="font-size:13px;line-height:1.8;">
          <div><span class="text-secondary">类型：</span>${p.cardio.type}</div>
          <div><span class="text-secondary">频率：</span>${p.cardio.frequency}</div>
          <div><span class="text-secondary">时长：</span>${p.cardio.duration}</div>
          <div><span class="text-secondary">强度：</span>${p.cardio.intensity}</div>
          <div><span class="text-secondary">推荐：</span>${p.cardio.options.join('、')}</div>
        </div>
      </div>
    `;

    html += `</div>`;
  }

  // ===== 科学原理 =====
  html += `
    <div class="card mt-16">
      <div class="card-title">${icons.target} 减脂护肝核心原则</div>
      <ul style="font-size:14px;padding-left:20px;line-height:2;">
        ${fatLossPlan.meta.principles.map(p => `<li>${p}</li>`).join('')}
      </ul>
      <div class="font-sm text-secondary mt-8">依据：${fatLossPlan.meta.source}</div>
    </div>
  `;

  html += `</div>`;
  container.innerHTML = html;

  // ===== 全局函数 =====
  window.toggleFatLossTodayDetail = () => {
    const el = document.getElementById('fl-today-detail');
    if (el) {
      const isShow = el.classList.toggle('show');
      const btn = el.previousElementSibling;
      if (btn && btn.tagName === 'BUTTON') {
        btn.textContent = isShow ? '收起动作详情' : '查看动作详情';
      }
    }
  };

  window.toggleFlWorkoutDetail = (pIdx, wIdx) => {
    const el = document.getElementById(`fl-workout-detail-${pIdx}-${wIdx}`);
    const btn = document.getElementById(`fl-workout-btn-${pIdx}-${wIdx}`);
    if (el) {
      const isShow = el.classList.toggle('show');
      if (btn) btn.textContent = isShow ? '收起动作详情' : '查看动作详情';
    }
  };

  window.switchFlPhaseTab = (idx) => {
    for (let i = 0; i < fatLossPlan.phases.length; i++) {
      const content = document.getElementById(`fl-phase-tab-content-${i}`);
      const tab = document.querySelectorAll('.fl-phase-tab')[i];
      if (content) content.style.display = (i === idx) ? 'block' : 'none';
      if (tab) {
        if (i === idx) {
          tab.style.background = '#4A90D9';
          tab.style.color = '#fff';
          tab.style.fontWeight = '600';
        } else {
          tab.style.background = '';
          tab.style.color = 'var(--text-secondary)';
          tab.style.fontWeight = '';
        }
      }
    }
  };

  window.markFatLossDone = async () => {
    const existing = await db.getByIndex('workoutLog', 'date', todayStr());
    // 只处理 type='fat-loss' 的记录
    const fatLossLogs = existing.filter(l => l.type === 'fat-loss');

    if (fatLossLogs.length > 0) {
      // 已打卡，取消打卡
      for (const log of fatLossLogs) {
        await db.delete('workoutLog', log.id);
      }
      window._needRefreshDashboard = true;
      alert('已取消减脂训练打卡');
    } else {
      await db.add('workoutLog', {
        date: todayStr(),
        week: fatLossState.currentWeek,
        phaseId: phase.id,
        workoutLabel: phase.workouts[todayWorkoutIdx].label,
        type: 'fat-loss'
      });
      window._needRefreshDashboard = true;
      alert('减脂训练打卡成功！🫀 坚持就是胜利！');
    }
    await renderFatLoss();
  };
}

async function checkFatLossCompleted() {
  const logs = await db.getByIndex('workoutLog', 'date', todayStr());
  return logs.some(l => l.type === 'fat-loss');
}
