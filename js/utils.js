// 工具函数
export function todayStr() {
  return new Date().toISOString().split('T')[0];
}

export function formatDate(dateStr) {
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}月${d.getDate()}日`;
}

export function getDayOfWeek(date = new Date()) {
  // 返回 1-7（周一到周日）
  const day = date.getDay();
  return day === 0 ? 7 : day;
}

export function getDayName(dayNum) {
  return ['周一', '周二', '周三', '周四', '周五', '周六', '周日'][dayNum - 1];
}

// 计算今日是该周第几次训练
export function getWorkoutIndexForWeek(dayOfWeek, phaseSplit) {
  // 基于星期几推算
  // 全身3次：周三=1, 周五=2, 周日=3
  // 上下肢4次：周三=上肢A, 周五=下肢A, 周六=上肢B, 周日=下肢B
  // 推拉腿5次：周三=推, 周四=拉, 周五=腿, 周六=推, 周日=拉
  const map = {
    'full-body': { 3: 0, 5: 1, 7: 2 },
    'upper-lower': { 3: 0, 5: 1, 6: 2, 7: 3 },
    'push-pull-legs': { 3: 0, 4: 1, 5: 2, 6: 3, 7: 4 }
  };
  return (map[phaseSplit] || {})[dayOfWeek] ?? -1;
}

// 根据当前周数和轮次获取动作的渐进参数
// 第2轮起在第1轮基础上真正增加训练负荷
export function getWeeklyParams(exercise, week, round) {
  if (!exercise.weeklyProgress || !exercise.weeklyProgress.length) {
    return { sets: exercise.sets, reps: exercise.reps, weight: exercise.weight, note: '' };
  }
  const entry = exercise.weeklyProgress.find(w => w.week === week);
  if (!entry) {
    const sorted = [...exercise.weeklyProgress].sort((a, b) => Math.abs(a.week - week) - Math.abs(b.week - week));
    const closest = sorted[0];
    return applyRound(closest, round);
  }
  return applyRound(entry, round);
}

// 第2轮起增加负荷：加组数、加重量或升级变式
export function applyRound(entry, round) {
  if (!round || round <= 1) {
    return { sets: entry.sets, reps: entry.reps, weight: entry.weight, note: entry.note || '' };
  }

  const roundNum = round - 1; // 第2轮=1次递增，第3轮=2次
  let sets = entry.sets;
  let reps = entry.reps;
  let weight = entry.weight;
  let note = entry.note || '';

  const isBodyweight = weight.includes('自重');

  if (isBodyweight) {
    // 自重动作：每轮+1组（上限6组），次数+2
    sets = Math.min(sets + roundNum, 6);
    // 尝试从 reps 中提取数字并增加
    const repsMatch = reps.match(/(\d+)/);
    if (repsMatch) {
      const baseReps = parseInt(repsMatch[1]);
      reps = reps.replace(repsMatch[1], String(baseReps + roundNum * 2));
    }
    note = `第${round}轮升级 · ${note}（增加组数+次数）`;
  } else {
    // 哑铃/弹力带动作：每轮+2kg
    weight = weight.replace(/(\d+(?:\.\d+)?)/g, (match) => {
      const num = parseFloat(match);
      return String(num + roundNum * 2);
    });
    if (!/\d/.test(weight) && !isBodyweight) {
      weight = `第${round}轮加重 · ${weight}`;
    }
    sets = Math.min(sets + (roundNum > 0 ? 1 : 0), 6);
    note = `第${round}轮升级 · ${note}（+2kg/轮）`;
  }

  return { sets, reps, weight, note };
}

// SVG 图标库
export const icons = {
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1h-5v-7H9v7H4a1 1 0 01-1-1V9.5z"/></svg>',
  dumbbell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6.5 6.5l11 11M3 7l3-3M18 18l3-3M2 9v6M22 9v6M5 5L2 8M19 19l3-3"/></svg>',
  food: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 3v8a3 3 0 003 3v7M7 3v8M4 3h6M19 3v18M19 14c-2 0-3-2-3-5s1-6 3-6"/></svg>',
  bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0"/></svg>',
  chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18M7 16l4-6 4 3 5-8"/></svg>',
  calc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h2M14 10h2M8 14h2M14 14h2M8 18h2M14 18h2"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12l5 5L20 7"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
  fire: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 14s1-3 4-3 4 3 4 6-2 5-4 5-4-2-4-5M12 2c1 4 5 5 5 10"/></svg>',
  protein: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 00-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>',
  chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>',
  chevronDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4a1 1 0 011-1h6a1 1 0 011 1v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/></svg>',
  settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z"/></svg>',
  play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
  scale: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v18M5 7l-3 6a3 3 0 006 0L5 7zM19 7l-3 6a3 3 0 006 0l-3-6zM5 7h14"/></svg>',
  target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>'
};
