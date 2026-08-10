// 全局状态管理 - 发布/订阅模式
export const store = {
  state: {
    currentWeek: 1,
    currentRound: 1,
    totalRounds: 4,  // 总共4轮12周计划
    startDate: null,
    userProfile: null,
    todayWorkoutCompleted: false,
    todayMealsCompleted: {},
    reminders: [],
    activeMode: 'both',  // 'both' | 'fitness' | 'fat-loss'
    // 减脂训练独立的轮/周（手动选择）
    fatLossWeek: 1,
    fatLossRound: 1,
    fatLossTotalRounds: 4
  },

  listeners: new Set(),

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  },

  setState(partial) {
    this.state = { ...this.state, ...partial };
    this.listeners.forEach(fn => fn(this.state));
  },

  getState() {
    return this.state;
  },

  // 根据当前周数推算阶段
  getCurrentPhase() {
    const week = this.state.currentWeek;
    if (week <= 4) return 0;
    if (week <= 8) return 1;
    return 2;
  },

  // 减脂训练：根据当前周数推算阶段
  getFatLossPhase() {
    const week = this.state.fatLossWeek;
    if (week <= 3) return 0;
    if (week <= 6) return 1;
    if (week <= 9) return 2;
    return 3;
  },

  // 手动设置锻炼训练轮/周（持久化到 IndexedDB）
  async setManualWeek(week, round) {
    week = Math.max(1, Math.min(12, week));
    round = Math.max(1, Math.min(4, round));
    this.setState({ currentWeek: week, currentRound: round });
    try {
      const { db } = await import('./db.js');
      await db.put('settings', { key: 'manualWeek', value: week });
      await db.put('settings', { key: 'manualRound', value: round });
    } catch (e) {
      console.warn('保存手动轮/周失败:', e);
    }
  },

  // 手动设置减脂训练轮/周（持久化到 IndexedDB）
  async setFatLossWeek(week, round) {
    week = Math.max(1, Math.min(12, week));
    round = Math.max(1, Math.min(4, round));
    this.setState({ fatLossWeek: week, fatLossRound: round });
    try {
      const { db } = await import('./db.js');
      await db.put('settings', { key: 'flManualWeek', value: week });
      await db.put('settings', { key: 'flManualRound', value: round });
    } catch (e) {
      console.warn('保存减脂手动轮/周失败:', e);
    }
  }
};
