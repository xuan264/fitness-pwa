// 全局状态管理 - 发布/订阅模式
export const store = {
  state: {
    currentWeek: 1,        // 实际显示的周（自动推算）
    currentRound: 1,       // 实际显示的轮（自动推算）
    totalRounds: 4,        // 总共4轮12周计划
    startDate: null,
    userProfile: null,
    todayWorkoutCompleted: false,
    todayMealsCompleted: {},
    reminders: [],
    activeMode: 'both',    // 'both' | 'fitness' | 'fat-loss'
    appMode: 'double',     // 'double' 双人版（默认） | 'single' 单人版
    showWeekSelector: true, // 首页是否显示"第几轮第几周"选择器
    // 锻炼训练：手动选择的"起点" + 锚点日期（选的那天=该周）
    manualWeek: 1,
    manualRound: 1,
    manualAnchorDate: null,
    // 减脂训练：手动选择的"起点" + 锚点日期
    fatLossWeek: 1,        // 实际显示的周（自动推算）
    fatLossRound: 1,       // 实际显示的轮（自动推算）
    fatLossTotalRounds: 4,
    fatLossBaseWeek: 1,
    fatLossBaseRound: 1,
    fatLossAnchorDate: null
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

  // 计算两个日期之间隔了多少个自然周（以周一为界）
  naturalWeeksBetween(startStr, nowDate) {
    const start = new Date(startStr + 'T00:00:00');
    const sDay = start.getDay(); // 0=周日
    const sMonday = new Date(start);
    sMonday.setDate(start.getDate() - (sDay === 0 ? 6 : sDay - 1));
    sMonday.setHours(0, 0, 0, 0);
    const nDay = nowDate.getDay();
    const nMonday = new Date(nowDate);
    nMonday.setDate(nowDate.getDate() - (nDay === 0 ? 6 : nDay - 1));
    nMonday.setHours(0, 0, 0, 0);
    return Math.round((nMonday - sMonday) / (1000 * 60 * 60 * 24 * 7));
  },

  // 根据"起点周/轮 + 锚点日期"推算当前实际周/轮（按自然周自动递增）
  recomputeWeek() {
    const anchor = this.state.manualAnchorDate;
    const baseWeek = this.state.manualWeek || 1;
    const baseRound = this.state.manualRound || 1;
    if (!anchor) {
      this.setState({ currentWeek: baseWeek, currentRound: baseRound });
      return;
    }
    const elapsed = this.naturalWeeksBetween(anchor, new Date());
    let total = (baseRound - 1) * 12 + (baseWeek - 1) + elapsed;
    total = Math.max(0, Math.min(total, 4 * 12 - 1)); // 封顶 第4轮第12周
    const round = Math.floor(total / 12) + 1;
    const week = (total % 12) + 1;
    this.setState({ currentWeek: week, currentRound: round });
  },

  // 减脂训练：同样按锚点自动递增
  recomputeFatLossWeek() {
    const anchor = this.state.fatLossAnchorDate;
    const baseWeek = this.state.fatLossBaseWeek || 1;
    const baseRound = this.state.fatLossBaseRound || 1;
    if (!anchor) {
      this.setState({ fatLossWeek: baseWeek, fatLossRound: baseRound });
      return;
    }
    const elapsed = this.naturalWeeksBetween(anchor, new Date());
    let total = (baseRound - 1) * 12 + (baseWeek - 1) + elapsed;
    total = Math.max(0, Math.min(total, 4 * 12 - 1));
    const round = Math.floor(total / 12) + 1;
    const week = (total % 12) + 1;
    this.setState({ fatLossWeek: week, fatLossRound: round });
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

  // 手动设置锻炼训练起点轮/周（设置锚点为今天，之后自动递增）
  async setManualWeek(week, round) {
    week = Math.max(1, Math.min(12, week));
    round = Math.max(1, Math.min(4, round));
    const anchor = new Date().toISOString().split('T')[0];
    this.setState({ manualWeek: week, manualRound: round, manualAnchorDate: anchor });
    this.recomputeWeek();
    try {
      const { db } = await import('./db.js');
      await db.put('settings', { key: 'manualWeek', value: week });
      await db.put('settings', { key: 'manualRound', value: round });
      await db.put('settings', { key: 'manualAnchorDate', value: anchor });
    } catch (e) {
      console.warn('保存手动轮/周失败:', e);
    }
  },

  // 手动设置减脂训练起点轮/周（设置锚点为今天，之后自动递增）
  async setFatLossWeek(week, round) {
    week = Math.max(1, Math.min(12, week));
    round = Math.max(1, Math.min(4, round));
    const anchor = new Date().toISOString().split('T')[0];
    this.setState({ fatLossBaseWeek: week, fatLossBaseRound: round, fatLossAnchorDate: anchor });
    this.recomputeFatLossWeek();
    try {
      const { db } = await import('./db.js');
      await db.put('settings', { key: 'flManualWeek', value: week });
      await db.put('settings', { key: 'flManualRound', value: round });
      await db.put('settings', { key: 'flManualAnchorDate', value: anchor });
    } catch (e) {
      console.warn('保存减脂手动轮/周失败:', e);
    }
  },

  // 切换 APP 模式（双人版 / 单人版）
  async setAppMode(mode) {
    mode = mode === 'single' ? 'single' : 'double';
    this.setState({ appMode: mode });
    try {
      const { db } = await import('./db.js');
      await db.put('settings', { key: 'appMode', value: mode });
    } catch (e) {
      console.warn('保存 APP 模式失败:', e);
    }
  },

  // 首页轮/周选择器 显示/隐藏
  async setShowWeekSelector(show) {
    show = !!show;
    this.setState({ showWeekSelector: show });
    try {
      const { db } = await import('./db.js');
      await db.put('settings', { key: 'showWeekSelector', value: show });
    } catch (e) {
      console.warn('保存选择器显示设置失败:', e);
    }
  }
};

// 暴露给依赖全局状态的模块（如 recipes.getCurrentWeekMenus）
if (typeof window !== 'undefined') window.__store = store;
