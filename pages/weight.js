// 体重记录独立页面
import { store } from '../js/store.js';
import { db } from '../js/db.js';
import { todayStr, formatDate } from '../js/utils.js';

export async function renderWeight(params) {
  const container = document.getElementById('page-container');
  const progressRecords = (await db.getAll('progress')).sort((a, b) => new Date(a.date) - new Date(b.date));

  const week = store.state.currentWeek;
  const round = store.state.currentRound || 1;
  const totalRounds = store.state.totalRounds || 4;

  let html = `
    <div class="page" style="max-width:480px;margin:0 auto;">
      <div style="background:linear-gradient(135deg,var(--primary),var(--primary-dark));color:#fff;padding:16px;border-radius:20px;margin-bottom:14px;position:relative;overflow:hidden;">
        <div style="position:absolute;top:-8px;right:-8px;font-size:50px;opacity:0.15;">⚖️</div>
        <div style="font-size:13px;opacity:0.9;">⭐ 第${round}轮 / 共${totalRounds}轮 · 第${week}周/12周</div>
        <div style="font-size:20px;font-weight:700;margin:4px 0;">⚖️ 体重记录</div>
      </div>
  `;

  // ===== 添加体重记录（紧凑居中） =====
  html += `
      <div class="card" style="text-align:center;padding:16px 14px;margin-bottom:12px;">
        <div class="card-title" style="text-align:center;border:none;padding:0;margin-bottom:10px;">添加体重记录</div>
        <div style="display:flex;gap:8px;justify-content:center;align-items:flex-end;margin-bottom:10px;">
          <div style="display:flex;flex-direction:column;align-items:center;">
            <label style="font-size:12px;color:var(--text-secondary);margin-bottom:4px;">体重(kg)</label>
            <input type="number" step="0.1" class="form-control" id="weight-input" style="width:120px;text-align:center;">
          </div>
          <div style="display:flex;flex-direction:column;align-items:center;">
            <label style="font-size:12px;color:var(--text-secondary);margin-bottom:4px;">备注</label>
            <input type="text" class="form-control" id="weight-note" style="width:120px;text-align:center;">
          </div>
        </div>
        <button class="btn btn-primary" style="width:60%;" onclick="addWeight()">记录</button>
      </div>
  `;

  // ===== 当前体重 + 总变化 + 折线图 =====
  if (progressRecords.length > 0) {
    const latest = progressRecords[progressRecords.length - 1];
    const first = progressRecords[0];
    const latestWeight = latest.weight.toFixed(1);
    const change = (latest.weight - first.weight).toFixed(1);
    const arrow = change < 0 ? '↓' : change > 0 ? '↑' : '→';

    html += `
      <div class="card" style="text-align:center;padding:14px;margin-bottom:12px;">
        <div style="display:flex;justify-content:center;gap:32px;margin-bottom:8px;">
          <div>
            <div class="font-sm text-secondary" style="text-align:center;">当前体重</div>
            <div style="font-size:26px;font-weight:700;color:var(--primary);">${latestWeight} kg</div>
          </div>
          <div>
            <div class="font-sm text-secondary" style="text-align:center;">总变化</div>
            <div style="font-size:22px;font-weight:600;color:${change < 0 ? 'var(--primary)' : 'var(--danger)'};">${arrow} ${Math.abs(change)} kg</div>
          </div>
        </div>
        <canvas id="weight-chart" style="width:100%;height:160px;"></canvas>
      </div>
    `;

    // ===== 最近记录（倒序，今天在最上面） =====
    html += `
      <div class="card" style="padding:12px 14px;">
        <div class="font-sm text-secondary" style="text-align:center;margin-bottom:8px;">最近记录</div>
    `;

    progressRecords.slice(-5).reverse().forEach(r => {
      const isToday = r.date === todayStr();
      const wStr = r.weight.toFixed(1);
      html += `
        <div class="flex-between" style="padding:6px 4px;border-bottom:1px solid var(--divider);${isToday ? 'background:var(--primary-light);border-radius:8px;' : ''}">
          <span class="font-sm">${formatDate(r.date)}</span>
          <span class="font-bold">${wStr} kg</span>
          ${r.note ? `<span class="font-sm text-secondary">${r.note}</span>` : '<span></span>'}
        </div>
      `;
    });

    html += `</div>`;
  } else {
    html += `
      <div class="card" style="text-align:center;padding:24px 14px;">
        <div style="font-size:36px;margin-bottom:8px;">🌱</div>
        <div class="text-secondary">还没有体重记录</div>
        <div class="font-sm text-secondary mt-8">在上方添加第一条记录吧</div>
      </div>
    `;
  }

  html += `</div>`;
  container.innerHTML = html;

  if (progressRecords.length > 0) {
    drawWeightChart(progressRecords);
  }

  window.addWeight = async () => {
    const weight = parseFloat(document.getElementById('weight-input').value);
    const note = document.getElementById('weight-note').value.trim();
    if (!weight || weight <= 0) {
      alert('请输入有效体重');
      return;
    }
    await db.add('progress', { date: todayStr(), weight, note });
    renderWeight();
  };
}

function drawWeightChart(records) {
  const canvas = document.getElementById('weight-chart');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.clientWidth;
  const h = 160;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  ctx.scale(dpr, dpr);

  const weights = records.map(r => r.weight);
  const minW = Math.min(...weights) - 1;
  const maxW = Math.max(...weights) + 1;
  const range = Math.max(0.1, maxW - minW);

  const pad = { top: 12, right: 14, bottom: 28, left: 36 };
  const cw = w - pad.left - pad.right;
  const ch = h - pad.top - pad.bottom;

  // 横向网格 + Y轴标签
  ctx.strokeStyle = '#EEE';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = pad.top + (ch / 4) * i;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(w - pad.right, y);
    ctx.stroke();
    const val = (maxW - (range / 4) * i).toFixed(1);
    ctx.fillStyle = '#BDBDBD';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(val, pad.left - 4, y + 3);
  }

  // 折线
  if (records.length >= 2) {
    ctx.strokeStyle = '#6BCB77';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    records.forEach((r, i) => {
      const x = pad.left + (cw / Math.max(1, records.length - 1)) * i;
      const y = pad.top + ch - ((r.weight - minW) / range) * ch;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
  }

  // 数据点 + X轴日期标签
  records.forEach((r, i) => {
    const x = pad.left + (cw / Math.max(1, records.length - 1)) * i;
    const y = pad.top + ch - ((r.weight - minW) / range) * ch;

    // 数据点
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#6BCB77';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // X轴日期标签（MM/DD）
    const dateLabel = r.date.substring(5).replace('-', '/');
    ctx.fillStyle = '#999';
    ctx.font = '9px sans-serif';
    ctx.textAlign = 'center';
    // 记录少时全部显示，多时隔几个显示
    const showLabel = records.length <= 6 || i === 0 || i === records.length - 1 || i % Math.ceil(records.length / 5) === 0;
    if (showLabel) {
      ctx.fillText(dateLabel, x, h - 6);
    }
  });
}
