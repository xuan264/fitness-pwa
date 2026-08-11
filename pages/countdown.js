// 训练 / 减脂 倒计时页面
// 提供固定快捷时长（30秒 / 60秒 / 2分钟 / 3分钟 / 休息90秒），可切换两种声音：
// 「节拍音乐」(按秒蜂鸣) 与 「数数」(语音报数)，另含静音。

const CD_PRESETS = [
  { label: '30秒', sec: 30 },
  { label: '60秒', sec: 60 },
  { label: '2分钟', sec: 120 },
  { label: '3分钟', sec: 180 },
  { label: '休息90秒', sec: 90, rest: true }
];

const RING_C = 2 * Math.PI * 110; // SVG 进度环周长

// ===== 页面级状态（模块单例，跨渲染保留）=====
let cdTotal = 60;
let cdRemaining = 60;
let cdRunning = false;
let cdMode = 'beat';          // 'beat' 节拍音乐 | 'count' 数数 | 'mute' 静音
let cdCustomSec = null;       // 自定义时长（非预设时为 number）
let cdTimer = null;
let cdEndTime = 0;
let cdLastSpoken = -1;
let cdAudio = null;
let cdVoice = null;
let cdFrom = 'training';
let cdCleanupBound = false;

// ===== 偏好持久化（localStorage）=====
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
// 每一秒的声音
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
  if (cdRunning) return;
  if (cdRemaining <= 0) cdRemaining = cdTotal;
  cdRunning = true;
  cdLastSpoken = -1;
  cdEndTime = Date.now() + cdRemaining * 1000;
  cdTimer = setInterval(cdTick, 200);
  cdUpdateControls();
}
function cdTick() {
  const rem = Math.max(0, Math.round((cdEndTime - Date.now()) / 1000));
  if (rem !== cdLastSpoken) {
    cdLastSpoken = rem;
    cdRemaining = rem;
    cdUpdateDisplay(rem);
    if (rem > 0) {
      cdPlayTick(rem);
    } else {
      cdFinish();
    }
  }
}
function cdPause() {
  if (!cdRunning) return;
  cdRunning = false;
  if (cdTimer) clearInterval(cdTimer);
  cdTimer = null;
  cdUpdateControls();
}
function cdReset() {
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
  cdTimer = null;
  cdRunning = false;
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
    `<button class="cd-pill${cdMode === m ? ' active' : ''}" onclick="cdSelectSound('${m}')">${label}</button>`
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
};
window.cdSelectSound = (m) => {
  cdMode = m;
  cdSavePrefs();
  cdRenderSounds();
};
window.cdApplyCustom = () => {
  const min = parseInt(document.getElementById('cd-min')?.value || '0', 10) || 0;
  const sec = parseInt(document.getElementById('cd-sec')?.value || '0', 10) || 0;
  const total = min * 60 + sec;
  if (total <= 0 || total > 5999) return;
  cdPause();
  cdTotal = total;
  cdCustomSec = total;
  cdRemaining = total;
  cdSavePrefs();
  cdRenderPresets();
  cdUpdateDisplay(cdRemaining);
  cdUpdateControls();
};
window.cdStart = () => cdStart();
window.cdPause = () => cdPause();
window.cdReset = () => cdReset();
window.cdBack = () => { location.hash = '/' + (cdFrom || 'training'); };

function cdBindCleanup() {
  if (cdCleanupBound) return;
  cdCleanupBound = true;
  const onLeave = () => {
    cdStopAll();
    window.removeEventListener('hashchange', onLeave);
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
  let html = `<div class="page" style="max-width:480px;margin:0 auto;">`;

  // 顶部返回 + 标题
  html += `
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">
      <button onclick="cdBack()" style="background:var(--surface);border:1px solid var(--divider);border-radius:50%;width:38px;height:38px;font-size:18px;cursor:pointer;flex-shrink:0;">←</button>
      <div class="font-bold" style="font-size:17px;">⏱️ 训练倒计时</div>
    </div>
  `;

  // 大圆盘（SVG 进度环 + 时间）
  html += `
    <div style="display:flex;justify-content:center;margin:8px 0 18px;position:relative;">
      <svg width="240" height="240" viewBox="0 0 240 240">
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
      <div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;">
        <div id="cd-time" style="font-size:46px;font-weight:700;font-variant-numeric:tabular-nums;letter-spacing:1px;">${cdFmt(cdRemaining)}</div>
        <div id="cd-status" class="font-sm text-secondary" style="margin-top:4px;">准备就绪</div>
      </div>
    </div>
  `;

  // 快捷时长
  html += `
    <div class="card" style="margin-bottom:14px;">
      <div class="card-title">⚡ 快捷时长</div>
      <div id="cd-presets" style="display:flex;flex-wrap:wrap;gap:8px;"></div>
      <div style="display:flex;align-items:center;gap:8px;margin-top:10px;">
        <input id="cd-min" type="number" min="0" max="99" placeholder="分" inputmode="numeric"
               style="width:54px;text-align:center;border:1.5px solid var(--divider);border-radius:10px;padding:8px 4px;font-size:14px;outline:none;">
        <span class="text-secondary">分</span>
        <input id="cd-sec" type="number" min="0" max="59" placeholder="秒" inputmode="numeric"
               style="width:54px;text-align:center;border:1.5px solid var(--divider);border-radius:10px;padding:8px 4px;font-size:14px;outline:none;">
        <span class="text-secondary">秒</span>
        <button class="cd-pill" onclick="cdApplyCustom()">自定义</button>
      </div>
    </div>
  `;

  // 声音选择
  html += `
    <div class="card" style="margin-bottom:14px;">
      <div class="card-title">🔊 倒计时声音</div>
      <div id="cd-sounds" style="display:flex;flex-wrap:wrap;gap:8px;"></div>
      <div class="font-sm text-secondary" style="margin-top:8px;">节拍音乐：每秒蜂鸣，最后3秒提速；数数：语音逐秒报数。</div>
    </div>
  `;

  // 控制按钮
  html += `
    <div style="display:flex;gap:10px;justify-content:center;margin-top:6px;">
      <button id="cd-start" class="btn btn-primary" style="flex:1;max-width:160px;font-size:16px;padding:14px;" onclick="cdStart()">▶ 开始</button>
      <button id="cd-pause" class="btn btn-accent" style="flex:1;max-width:160px;font-size:16px;padding:14px;display:none;" onclick="cdPause()">⏸ 暂停</button>
      <button id="cd-reset" class="btn btn-outline" style="flex:1;max-width:160px;font-size:16px;padding:14px;display:none;" onclick="cdReset()">↺ 重置</button>
    </div>
  `;

  html += `</div>`;

  container.innerHTML = html;

  // 初始化子区域
  cdRenderPresets();
  cdRenderSounds();
  cdUpdateDisplay(cdRemaining);
  cdUpdateControls();
  cdBindCleanup();
}
