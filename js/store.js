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
    // 按自然周计算：安装的那一周是第1周，过了一个周一就进第2周
    const startStr = this.state.startDate; // "YYYY-MM-DD"
    const now = new Date();
    const nowStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const startDate = new Date(startStr + 'T00:00:00');
    const nowDate = new Date(nowStr + 'T00:00:00');
    // 计算两个日期之间隔了几个周一
    // 找到 startDate 那周的周一
    const startDay = startDate.getDay(); // 0=周日
    const startMonday = new Date(startDate);
    startMonday.setDate(startDate.getDate() - (startDay === 0 ? 6 : startDay - 1));
    // 找到 now 那周的周一
    const nowDay = nowDate.getDay();
    const nowMonday = new Date(nowDate);
    nowMonday.setDate(nowDate.getDate() - (nowDay === 0 ? 6 : nowDay - 1));
    // 两个周一之间的天数差 / 7 = 经过了几周
    const weekDiff = Math.round((nowMonday - startMonday) / (1000 * 60 * 60 * 24 * 7));
    const totalWeeks = weekDiff + 1;
    // 12周一个循环，计算当前是第几轮的第几周
    const round = Math.floor((totalWeeks - 1) / 12) + 1;
    const weekInRound = ((totalWeeks - 1) % 12) + 1;
    this.setState({ currentWeek: weekInRound, currentRound: round });
  }
};
