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
    activeMode: 'both'  // 'both' | 'fitness' | 'fat-loss'
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

  // 设置开始日期并计算当前周数
  initStartDate(dateStr) {
    if (!dateStr) {
      dateStr = new Date().toISOString().split('T')[0];
    }
    this.setState({ startDate: dateStr });
    this.updateCurrentWeek();
  },

  updateCurrentWeek() {
    if (!this.state.startDate) return;
    const start = new Date(this.state.startDate);
    const now = new Date();
    const diffDays = Math.floor((now - start) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(diffDays / 7) + 1;
    // 12周一个循环，计算当前是第几轮的第几周
    const round = Math.floor((totalWeeks - 1) / 12) + 1;
    const weekInRound = ((totalWeeks - 1) % 12) + 1;
    this.setState({ currentWeek: weekInRound, currentRound: round });
  }
};
