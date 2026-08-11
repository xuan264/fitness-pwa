// 训练 / 减脂 倒计时页面
// - 点击圆环：开始 / 暂停
// - 点击圆环中央时间：展开滑动条自定义时长
// - 声音：节拍音乐 / 数数 / 静音 一排
// - 界面固定，不上下滑动；支持空格(开始/暂停)、Esc(返回)

const CD_PRESETS = [
  { label: '30秒', sec: 30 },
  { label: '60秒', sec: 60 },
  { label: '2分钟', sec: 120 },
  { label: '3分钟', sec: 180 },
  { label: '休息90秒', sec: 90, rest: true }
];

const RING_C = 2 * Math.PI * 110; // SVG 进度环周长

// ===== 页面级状态（模块单例）=====
let cdTotal = 60;
let cdRemaining = 60;
let cdRunning = false;
let cdMode = 'beat';          // 'beat' 节拍音乐 | 'count' 数数 | 'mute' 静音
let cdCustomSec = null;
let cdTimer = null;
let cdEndTime = 0;
let cdLastSpoken = -1;
let cdPrep = false;           // 是否处于 3 秒准备倒计时
let cdPrepTimer = null;
let cdPrepLeft = 0;
let cdAudio = null;
let cdVoice = null;
let cdFrom = 'training';
let cdCleanupBound = false;
let cdKeyHandler = null;

// ===== 偏好持久化 =====
function cdLoadPrefs() {
  try {
    const p = JSON.parse(localStorage.getItem('xuan_countdown_prefs') || '{}');
    if (p.duration && p.duration > 0) cdTotal = p.duration;
    if (p.sound && ['beat', 'count', 'mute'].includes(p.sound)) cdMode = p.sound;
  } catch (e) {}
  cdCustomSec = CD_PRESETS.find(p => p.sec === cdTotal) ? null : cdTotal;
  cdRemaining = cdTotal;
}
function cdSavePrefs() {
  try { localStorage.setItem('xuan_countdown_prefs', JSON.stringify({ duration: cdTotal, sound: cdMode })); } catch (e) {}
}

// ===== 音频引擎 =====
function cdEnsureAudio() {
  if (!cdAudio) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (AC) cdAudio = new AC();
  }
  if (cdAudio && cdAudio.state === 'suspended') cdAudio.resume();
  return cdAudio;
}
function cdBeep(freq, durMs = 90, type = 'sine', vol = 0.2) {
  const ctx = cdEnsureAudio();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  const t = ctx.currentTime;
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(vol, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + durMs / 1000);
  osc.connect(g); g.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + durMs / 1000 + 0.02);
}
function cdEnsureVoice() {
  if (cdVoice || !('speechSynthesis' in window)) return;
  const voices = speechSynthesis.getVoices();
  cdVoice = voices.find(v => /zh|cmn/i.test(v.lang)) || voices[0] || null;
  if (!cdVoice && voices.length === 0) {
    speechSynthesis.onvoiceschanged = () => {
      const vs = speechSynthesis.getVoices();
      cdVoice = vs.find(v => /zh|cmn/i.test(v.lang)) || vs[0] || null;
    };
  }
}
function cdSpeak(text) {
  if (!('speechSynthesis' in window)) { cdBeep(880, 90); return; }
  cdEnsureVoice();
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'zh-CN';
    if (cdVoice) u.voice = cdVoice;
    u.rate = 1.1; u.pitch = 1;
    speechSynthesis.speak(u);
  } catch (e) { cdBeep(880, 90); }
}
function cdPlayTick(rem) {
  if (cdMode === 'beat') {
    if (rem <= 3 && rem > 0) cdBeep(1320, 120, 'triangle', 0.3);
    else cdBeep(880, 80, 'sine', 0.18);
  } else if (cdMode === 'count') {
    cdSpeak(String(rem));
  }
}
function cdPlayFinish() {
  if (cdMode === 'beat') {
    cdBeep(880, 160, 'sine', 0.25);
    setTimeout(() => cdBeep(1320, 280, 'triangle', 0.32), 180);
  } else if (cdMode === 'count') {
    cdSpeak('时间到');
  }
}

// ===== 计时逻辑 =====
function cdStart() {
  cdEnsureAudio();
  if (cdRunning || cdPrep) return;
  if (cdRemaining <= 0) cdRemaining = cdTotal;
  // 全新开始（停在满时长，而非从暂停续接）先走 3 秒准备倒计时
  const fresh = cdRemaining >= cdTotal;
  if (fresh) { cdEnterPrep(); return; }
  cdBeginCountdown();
}
// 3 秒准备倒计时：3 → 2 → 1，每秒一声提示，再正式开始
function cdEnterPrep() {
  cdPrep = true;
  cdPrepLeft = 3;
  cdRemaining = cdTotal;     // 环保持满
  cdLastSpoken = -1;
  cdUpdateDisplayPrep();
  cdUpdateControls();
  cdPlayPrepCue();
  cdPrepTimer = setInterval(() => {
    cdPrepLeft -= 1;
    if (cdPrepLeft > 0) {
      cdUpdateDisplayPrep();
      cdPlayPrepCue();
    } else {
      if (cdPrepTimer) clearInterval(cdPrepTimer);
      cdPrepTimer = null;
      cdPrep = false;
      cdBeginCountdown();
    }
  }, 1000);
}
function cdUpdateDisplayPrep() {
  const t = document.getElementById('cd-time');
  const status = document.getElementById('cd-status');
  const ring = document.getElementById('cd-ring');
  if (t) t.textContent = String(cdPrepLeft);
  if (status) status.textContent = '准备…';
  if (ring) ring.style.strokeDashoffset = '0'; // 满环
}
function cdPlayPrepCue() {
  if (cdMode === 'mute') return;
  if (cdMode === 'count') cdSpeak(String(cdPrepLeft));
  else cdBeep(880, 90, 'sine', 0.2);
}
// 正式开始（跳过准备）
function cdBeginCountdown() {
  cdRunning = true;
  cdLastSpoken = -1;
  cdEndTime = Date.now() + cdRemaining * 1000;
  cdTimer = setInterval(cdTick, 200);
  cdUpdateControls();
}
function cdCancelPrep() {
  cdPrep = false;
  if (cdPrepTimer) clearInterval(cdPrepTimer);
  cdPrepTimer = null;
  cdRemaining = cdTotal;
  cdUpdateDisplay(cdRemaining);
  cdUpdateControls();
}
function cdTick() {
  const rem = Math.max(0, Math.round((cdEndTime - Date.now()) / 1000));
  if (rem !== cdLastSpoken) {
    cdLastSpoken = rem;
    cdRemaining = rem;
    cdUpdateDisplay(rem);
    if (rem > 0) cdPlayTick(rem);
    else cdFinish();
  }
}
function cdPause() {
  if (cdPrep) { cdCancelPrep(); return; }
  if (!cdRunning) return;
  cdRunning = false;
  if (cdTimer) clearInterval(cdTimer);
  cdTimer = null;
  cdUpdateControls();
}
function cdReset() {
  if (cdPrep) { cdCancelPrep(); return; }
  cdPause();
  cdRemaining = cdTotal;
  cdUpdateDisplay(cdRemaining);
  cdUpdateControls();
}
function cdFinish() {
  cdRunning = false;
  if (cdTimer) clearInterval(cdTimer);
  cdTimer = null;
  cdRemaining = 0;
  cdUpdateDisplay(0);
  cdPlayFinish();
  cdUpdateControls(true);
}
function cdStopAll() {
  if (cdTimer) clearInterval(cdTimer);
  if (cdPrepTimer) clearInterval(cdPrepTimer);
  cdTimer = null;
  cdPrepTimer = null;
  cdRunning = false;
  cdPrep = false;
  if ('speechSynthesis' in window) speechSynthesis.cancel();
}

// ===== DOM 更新 =====
function cdFmt(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}
function cdUpdateDisplay(rem) {
  const t = document.getElementById('cd-time');
  const ring = document.getElementById('cd-ring');
  const status = document.getElementById('cd-status');
  if (t) t.textContent = cdFmt(rem);
  if (ring) {
    const ratio = cdTotal > 0 ? rem / cdTotal : 0;
    ring.style.strokeDashoffset = String(RING_C * (1 - ratio));
  }
  if (status) {
    if (rem <= 0) status.textContent = '完成 🎉';
    else if (cdRunning) status.textContent = '进行中…';
    else if (rem < cdTotal) status.textContent = '已暂停';
    else status.textContent = '准备就绪';
  }
}
function cdUpdateControls(finished = false) {
  const startBtn = document.getElementById('cd-start');
  const pauseBtn = document.getElementById('cd-pause');
  const resetBtn = document.getElementById('cd-reset');
  // 准备倒计时期间隐藏全部控制按钮，圆环即控制器
  if (cdPrep) {
    if (startBtn) startBtn.style.display = 'none';
    if (pauseBtn) pauseBtn.style.display = 'none';
    if (resetBtn) resetBtn.style.display = 'none';
    return;
  }
  if (startBtn) startBtn.style.display = (cdRunning || finished) ? 'none' : 'inline-block';
  if (pauseBtn) pauseBtn.style.display = cdRunning ? 'inline-block' : 'none';
  if (resetBtn) resetBtn.style.display = (cdRunning || cdRemaining < cdTotal || finished) ? 'inline-block' : 'none';
  cdUpdateDisplay(cdRemaining);
}
function cdRenderPresets() {
  const box = document.getElementById('cd-presets');
  if (!box) return;
  box.innerHTML = CD_PRESETS.map(p => {
    const active = (cdCustomSec === null && p.sec === cdTotal) ? ' active' : '';
    const rest = p.rest ? ' rest' : '';
    return `<button class="cd-pill${active}${rest}" onclick="cdSelectPreset(${p.sec})">${p.label}</button>`;
  }).join('');
}
function cdRenderSounds() {
  const box = document.getElementById('cd-sounds');
  if (!box) return;
  const opts = [['beat', '🔊 节拍音乐'], ['count', '🔢 数数'], ['mute', '🔇 静音']];
  box.innerHTML = opts.map(([m, label]) =>
    `<button class="cd-pill${cdMode === m ? ' active' : ''}" style="flex:1;text-align:center;" onclick="cdSelectSound('${m}')">${label}</button>`
  ).join('');
}

// ===== 交互 =====
window.cdSelectPreset = (sec) => {
  cdPause();
  cdTotal = sec;
  cdCustomSec = null;
  cdRemaining = sec;
  cdSavePrefs();
  cdRenderPresets();
  cdUpdateDisplay(cdRemaining);
  cdUpdateControls();
  // 选中预设时收起滑动条
  const ed = document.getElementById('cd-edit');
  if (ed) ed.classList.remove('open');
};
window.cdSelectSound = (m) => {
  cdMode = m;
  cdSavePrefs();
  cdRenderSounds();
};
window.cdSlider = (v) => {
  const sec = parseInt(v, 10) || 5;
  cdPause();
  cdTotal = sec;
  cdCustomSec = sec;
  cdRemaining = sec;
  cdSavePrefs();
  cdRenderPresets();
  cdUpdateDisplay(cdRemaining);
  cdUpdateControls();
  const val = document.getElementById('cd-slider-val');
  if (val) val.textContent = cdFmt(sec);
};
window.cdEditDuration = () => {
  const ed = document.getElementById('cd-edit');
  const sl = document.getElementById('cd-slider');
  if (!ed || !sl) return;
  cdPause();
  const willShow = !ed.classList.contains('open');
  if (willShow) {
    sl.value = String(Math.min(600, Math.max(5, cdTotal)));
    const val = document.getElementById('cd-slider-val');
    if (val) val.textContent = cdFmt(cdTotal);
  }
  ed.classList.toggle('open', willShow);
};
window.cdToggle = () => { if (cdRunning) cdPause(); else if (cdPrep) cdCancelPrep(); else cdStart(); };
window.cdStart = () => cdStart();
window.cdPause = () => cdPause();
window.cdReset = () => cdReset();
window.cdBack = () => { window.cdUnlockScroll(); location.hash = '/' + (cdFrom || 'training'); };

function cdBindCleanup() {
  if (cdCleanupBound) return;
  cdCleanupBound = true;
  const onLeave = () => {
    cdStopAll();
    if (cdKeyHandler) window.removeEventListener('keydown', cdKeyHandler);
    window.removeEventListener('hashchange', onLeave);
    window.cdUnlockScroll();
    cdCleanupBound = false;
  };
  window.addEventListener('hashchange', onLeave);
}

// ===== 渲染 =====
export async function renderCountdown(params) {
  cdStopAll();
  cdFrom = (params && params.from) || 'training';
  cdLoadPrefs();

  const container = document.getElementById('page-container');
  let html = `<div class="page cd-page">`;

  // 顶部返回 + 标题
  const titleText = cdFrom === 'fat-loss' ? '⏱️ 减脂倒计时' : '⏱️ 训练倒计时';
  html += `
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:4px;">
      <button onclick="cdBack()" style="background:var(--surface);border:1px solid var(--divider);border-radius:50%;width:38px;height:38px;font-size:18px;cursor:pointer;flex-shrink:0;">←</button>
      <div class="font-bold" style="font-size:17px;">${titleText}</div>
    </div>
  `;

  // 大圆盘（可点按：开始/暂停；点时间：展开滑动条）
  html += `
    <div id="cd-ring-wrap" onclick="cdToggle()" style="position:relative;margin:0 auto;cursor:pointer;touch-action:manipulation;">
      <svg width="100%" height="100%" viewBox="0 0 240 240">
        <defs>
          <linearGradient id="cdgrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#6BCB77"/>
            <stop offset="100%" stop-color="#FF9A8B"/>
          </linearGradient>
        </defs>
        <circle cx="120" cy="120" r="110" fill="none" stroke="var(--divider)" stroke-width="14"/>
        <circle id="cd-ring" cx="120" cy="120" r="110" fill="none" stroke="url(#cdgrad)" stroke-width="14"
                stroke-linecap="round" transform="rotate(-90 120 120)"
                stroke-dasharray="${RING_C.toFixed(2)}" stroke-dashoffset="0"/>
      </svg>
      <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;">
        <div id="cd-time" onclick="event.stopPropagation(); cdEditDuration()" style="font-size:50px;font-weight:700;font-variant-numeric:tabular-nums;letter-spacing:1px;cursor:pointer;padding:0 8px;">${cdFmt(cdRemaining)}</div>
        <div id="cd-status" class="font-sm text-secondary" style="margin-top:2px;">准备就绪</div>
      </div>
    </div>
    <div class="font-sm text-hint" style="text-align:center;margin-top:6px;">点击圆环开始/暂停 · 点击时间调整时长 · 开始后 3 秒准备</div>
  `;

  // 滑动自定义时长（点时间后展开）。外层槽位高度恒定，开合只切透明度，避免整页重新居中导致圆环跳动
  html += `
    <div id="cd-edit-slot" class="cd-edit-slot">
      <div id="cd-edit" class="cd-edit">
        <input id="cd-slider" class="cd-range" type="range" min="5" max="600" step="5" value="${Math.min(600, Math.max(5, cdTotal))}" style="width:100%;" oninput="cdSlider(this.value)">
        <div class="cd-edit-label"><span id="cd-slider-val">${cdFmt(cdTotal)}</span> · 拖动调整</div>
      </div>
    </div>
  `;

  // 快捷时长
  html += `
    <div class="card" style="margin:14px 0;">
      <div class="card-title">⚡ 快捷时长</div>
      <div id="cd-presets" style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;"></div>
    </div>
  `;

  // 声音选择（一排）
  html += `
    <div class="card" style="margin-bottom:14px;">
      <div class="card-title">🔊 倒计时声音</div>
      <div id="cd-sounds" style="display:flex;gap:8px;flex-wrap:nowrap;"></div>
      <div class="font-sm text-secondary" style="margin-top:8px;">节拍：每秒蜂鸣，最后3秒提速；数数：语音逐秒报数。</div>
    </div>
  `;

  // 注：开始/暂停/续接/结束后重开 全部由圆环点击完成，故不再放置底部按钮

  html += `</div>`;

  container.innerHTML = html;

  // 初始化
  cdRenderPresets();
  cdRenderSounds();
  cdUpdateDisplay(cdRemaining);
  cdUpdateControls();

  // 键盘快捷键：空格 开始/暂停，Esc 返回
  cdKeyHandler = (e) => {
    if (e.code === 'Space') { e.preventDefault(); cdToggle(); }
    else if (e.key === 'Escape') { cdBack(); }
  };
  window.addEventListener('keydown', cdKeyHandler);
  document.body.classList.add('cd-lock'); // 锁死整页滚动
  cdBindCleanup();
}

// 离开倒计时页时解锁滚动
window.cdUnlockScroll = () => { document.body.classList.remove('cd-lock'); };
