// 计算器页面
import { store } from '../js/store.js';
import { db } from '../js/db.js';
import { icons } from '../js/utils.js';

export async function renderCalculator(params) {
  const container = document.getElementById('page-container');
  const profile = store.state.userProfile || {};

  container.innerHTML = `
    <div class="page">
      <div class="card">
        <div class="card-title">${icons.calc} BMR / TDEE 计算器</div>
        <p class="font-sm text-secondary mb-16">输入你的基本信息，自动计算基础代谢率、每日总消耗和减脂期建议摄入量。</p>

        <div class="form-group">
          <label>性别</label>
          <select class="form-control" id="calc-gender">
            <option value="male" ${profile.gender === 'male' ? 'selected' : ''}>男</option>
            <option value="female" ${profile.gender === 'female' ? 'selected' : ''}>女</option>
          </select>
        </div>

        <div class="form-group">
          <label>年龄</label>
          <input type="number" class="form-control" id="calc-age" placeholder="如：30" value="${profile.age || ''}">
        </div>

        <div class="form-group">
          <label>身高（cm）</label>
          <input type="number" class="form-control" id="calc-height" placeholder="如：175" value="${profile.height || ''}">
        </div>

        <div class="form-group">
          <label>体重（kg）</label>
          <input type="number" step="0.1" class="form-control" id="calc-weight" placeholder="如：75.0" value="${profile.weight || ''}">
        </div>

        <div class="form-group">
          <label>活动水平</label>
          <select class="form-control" id="calc-activity">
            <option value="1.2" ${profile.activityLevel === 1.2 ? 'selected' : ''}>久坐不动（办公室工作，不运动）</option>
            <option value="1.375" ${profile.activityLevel === 1.375 ? 'selected' : ''}>轻度活动（每周1-3次运动）</option>
            <option value="1.55" ${profile.activityLevel === 1.55 ? 'selected' : ''}>中度活动（每周3-5次运动）</option>
            <option value="1.725" ${profile.activityLevel === 1.725 ? 'selected' : ''}>高度活动（每周6-7次运动）</option>
          </select>
        </div>

        <button class="btn btn-primary btn-full" onclick="calculateBMR()">开始计算</button>
      </div>

      <div id="calc-result" class="hidden"></div>

      <div class="card mt-16">
        <div class="card-title">${icons.target} 计算公式说明</div>
        <div class="font-sm" style="line-height:1.8;">
          <p><strong>BMR（基础代谢）</strong>使用 Mifflin-St Jeor 公式，是目前最准确的估算方法：</p>
          <p style="background:var(--bg);padding:10px;border-radius:8px;margin:8px 0;">
            男性：BMR = 10×体重 + 6.25×身高 − 5×年龄 + 5<br>
            女性：BMR = 10×体重 + 6.25×身高 − 5×年龄 − 161
          </p>
          <p><strong>TDEE（每日总消耗）</strong>= BMR × 活动系数</p>
          <p><strong>减脂期</strong>= TDEE − 500大卡（约每周减0.5kg脂肪）</p>
          <p><strong>蛋白质需求</strong>= 体重 × 1.6~2.2g（减脂期取高值保护肌肉）</p>
          <p class="text-secondary">1kg脂肪 ≈ 7700大卡。500大卡/天赤字 × 7天 ≈ 0.5kg/周</p>
        </div>
      </div>
    </div>
  `;

  // 如果已有档案，自动计算
  if (profile.weight && profile.height && profile.age) {
    calculateBMR();
  }
}

window.calculateBMR = async () => {
  const gender = document.getElementById('calc-gender').value;
  const age = parseInt(document.getElementById('calc-age').value);
  const height = parseFloat(document.getElementById('calc-height').value);
  const weight = parseFloat(document.getElementById('calc-weight').value);
  const activity = parseFloat(document.getElementById('calc-activity').value);

  if (!age || !height || !weight) {
    alert('请填写完整信息');
    return;
  }

  let bmr;
  if (gender === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  const tdee = bmr * activity;
  const cutCalories = tdee - 500;
  const maintainCalories = tdee;
  const bulkCalories = tdee + 300;

  const proteinLow = Math.round(weight * 1.6);
  const proteinHigh = Math.round(weight * 2.2);

  const proteinCalories = proteinLow * 4;
  const fatCalories = cutCalories * 0.25;
  const carbCalories = cutCalories - proteinCalories - fatCalories;

  const resultDiv = document.getElementById('calc-result');
  resultDiv.classList.remove('hidden');
  resultDiv.innerHTML = `
    <div class="card" style="border:2px solid var(--primary);">
      <div class="card-title">${icons.fire} 计算结果</div>

      <div style="background:var(--primary-light);padding:16px;border-radius:var(--radius);text-align:center;margin-bottom:12px;">
        <div class="font-sm text-secondary">减脂期每日摄入</div>
        <div style="font-size:32px;font-weight:700;color:var(--primary-dark);">${cutCalories.toFixed(0)}</div>
        <div class="font-sm text-secondary">大卡/天</div>
      </div>

      <table class="data-table">
        <tr><td>基础代谢 BMR</td><td class="text-right font-bold">${bmr.toFixed(0)} 大卡/天</td></tr>
        <tr><td>每日总消耗 TDEE</td><td class="text-right font-bold">${tdee.toFixed(0)} 大卡/天</td></tr>
        <tr><td>维持体重摄入</td><td class="text-right">${maintainCalories.toFixed(0)} 大卡/天</td></tr>
        <tr><td>增肌期摄入</td><td class="text-right">${bulkCalories.toFixed(0)} 大卡/天</td></tr>
      </table>

      <div class="card-title mt-16">三大营养素分配（减脂期）</div>
      <div class="stat-grid">
        <div class="stat-card">
          <div class="stat-value">${proteinLow}-${proteinHigh}g</div>
          <div class="stat-label">蛋白质</div>
        </div>
        <div class="stat-card accent">
          <div class="stat-value">${(carbCalories/4).toFixed(0)}g</div>
          <div class="stat-label">碳水化合物</div>
        </div>
      </div>
      <div class="stat-grid" style="grid-template-columns:1fr;">
        <div class="stat-card">
          <div class="stat-value" style="color:var(--warning);">${(fatCalories/9).toFixed(0)}g</div>
          <div class="stat-label">脂肪（占25%）</div>
        </div>
      </div>

      <div class="font-sm text-secondary mt-8" style="text-align:center;">
        预计每周减脂约 0.5kg（500大卡/天赤字 × 7天 ≈ 3500大卡）
      </div>
    </div>
  `;

  // 保存到用户档案
  const profileData = { key: 'profile', gender, age, height, weight, activityLevel: activity };
  await db.put('userProfile', profileData);
  store.setState({ userProfile: profileData });
};
