// 饮食页面
import { store } from '../js/store.js';
import { db } from '../js/db.js';
import { recipes } from '../data/recipes.js';
import { icons, getDayOfWeek, getDayName, todayStr } from '../js/utils.js';

let selectedDay = getDayOfWeek();

export async function renderDiet(params) {
  if (params.day) selectedDay = parseInt(params.day);

  const container = document.getElementById('page-container');
  const week = store.state.currentWeek || 1;
  const currentMenus = recipes.getWeeklyMenus(week);
  const dayMenu = currentMenus.find(m => m.day === selectedDay) || currentMenus[0];

  // 计算全天蛋白质（protein 格式如 "约20g"，需要提取数字）
  let totalProtein = 0;
  ['breakfast', 'lunch', 'dinner', 'snack'].forEach(m => {
    const meal = dayMenu.meals[m];
    if (meal) {
      const match = (meal.protein || '').match(/(\d+)/);
      const p = match ? parseInt(match[1]) : 0;
      totalProtein += p;
    }
  });

  let html = `<div class="page">`;

  // 日期选择器
  const weekLabel = `第${week}周食谱`;
  html += `
    <div class="card">
      <div class="flex-between mb-8">
        <div class="font-lg font-bold">${dayMenu.dayName} 食谱</div>
        <div class="font-sm text-secondary">${weekLabel}</div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:6px;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none;">
        ${[1,2,3,4,5,6,7].map(d => `
          <div onclick="selectDietDay(${d})" class="btn btn-sm ${d === selectedDay ? 'btn-primary' : 'btn-outline'}" style="text-align:center;padding:6px 0;cursor:pointer;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none;">${getDayName(d)}</div>
        `).join('')}
      </div></div>`;

  // 蛋白质目标
  const profile = store.state.userProfile;
  let proteinTarget = '120-165g';
  if (profile && profile.weight) {
    proteinTarget = `${Math.round(profile.weight * 1.6)}-${Math.round(profile.weight * 2.2)}g`;
  }
  html += `
    <div class="stat-grid">
      <div class="stat-card">
        <div class="stat-value">${totalProtein}g</div>
        <div class="stat-label">今日蛋白质</div>
      </div>
      <div class="stat-card accent">
        <div class="stat-value">${proteinTarget}</div>
        <div class="stat-label">每日目标</div>
      </div>
    </div>
  `;

  // 三餐 + 加餐
  const mealOrder = ['breakfast', 'lunch', 'dinner', 'snack'];
  const mealIcons = { breakfast: '🌅', lunch: '☀️', dinner: '🌙', snack: '🍎' };

  for (const mealType of mealOrder) {
    const meal = dayMenu.meals[mealType];
    if (!meal) continue;

    const completed = await checkMealCompleted(meal.id);

    html += `
      <div class="meal-card" id="meal-${meal.id}">
        <div class="meal-header ${mealType === 'snack' ? 'accent' : ''}" style="${completed ? 'border-left-color:var(--primary);background:var(--primary-light);' : ''}">
          <div class="flex-between">
            <div class="meal-name">${mealIcons[mealType]} ${meal.mealType} · ${meal.name}</div>
            <div style="display:flex;align-items:center;gap:8px;">
              ${completed ? '<span class="badge badge-primary">✓ 已打卡</span>' : ''}
              ${completed ? `<button onclick="toggleMealDetail('${meal.id}')" id="toggle-btn-${meal.id}" style="background:none;border:none;color:var(--primary);font-size:12px;cursor:pointer;display:flex;align-items:center;gap:2px;">查看详情 ${icons.chevronDown}</button>` : ''}
            </div>
          </div>
          ${!completed ? `<div class="meal-meta">
            <span>${icons.clock}${meal.totalTime}</span>
            <span>${icons.fire}${meal.calories}</span>
            <span>${icons.protein}${meal.protein}</span>
          </div>` : ''}
        </div>
        <div class="meal-body" id="meal-body-${meal.id}" style="${completed ? 'display:none;' : ''}">
          ${completed ? `<div class="meal-meta" style="padding-top:10px;">
            <span>${icons.clock}${meal.totalTime}</span>
            <span>${icons.fire}${meal.calories}</span>
            <span>${icons.protein}${meal.protein}</span>
          </div>` : ''}
          <div class="meal-section">
            <h4>食材清单</h4>
            <table class="data-table">
              <thead>
                <tr><th>食材</th><th>用量</th><th>克数</th><th>拳头法则</th><th>蛋白质</th></tr>
              </thead>
              <tbody>
                ${meal.ingredients.map(i => `
                  <tr>
                    <td>${i.name}</td>
                    <td>${i.amount}</td>
                    <td>${i.grams}</td>
                    <td>${i.fist}</td>
                    <td>${i.protein}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          <div class="meal-section">
            <h4>做法步骤</h4>
            <ol class="meal-steps">
              ${meal.steps.map(s => `<li>${s}</li>`).join('')}
            </ol>
          </div>
          <div class="meal-tips"><strong>💡 小贴士：</strong>${meal.tips}</div>
          <button class="btn ${completed ? 'btn-primary' : 'btn-outline'} btn-full mt-8" onclick="markMealDone('${meal.id}', '${mealType}', '${meal.name}')">
            ${completed ? '✓ 已打卡（取消打卡）' : '打卡完成'}
          </button>
        </div>
      </div>
    `;
  }

  // 下一周食谱 + 食材统计
  const nextWeek = week + 1;
  const nextWeekMenus = recipes.getWeeklyMenus(nextWeek);
  html += `
    <div class="card mt-16" style="border-left:4px solid var(--accent);">
      <div class="flex-between">
        <div>
          <div class="font-bold" style="font-size:15px;">📋 第${nextWeek}周食材采购清单</div>
          <div class="font-sm text-secondary mt-8">下一周7天全部食材用量统计</div>
        </div>
        <button class="btn btn-accent btn-sm" onclick="toggleShoppingList()">查看清单</button>
      </div>
      <div id="shopping-list" class="exercise-detail" style="padding-top:12px;">
        ${renderShoppingList(nextWeekMenus)}
      </div>
    </div>
  `;

  // 饮食框架说明
  html += `
    <div class="card mt-16">
      <div class="card-title">${icons.food} 饮食框架</div>
      <div class="font-bold text-primary" style="font-size:18px;text-align:center;padding:12px 0;">
        1份蛋白 + 1份主食 + 2份蔬菜
      </div>
      <table class="data-table">
        <thead>
          <tr><th>类别</th><th>每餐份量</th><th>视觉参考</th></tr>
        </thead>
        <tbody>
          <tr><td>蛋白质</td><td>100-150g</td><td>1个手掌</td></tr>
          <tr><td>主食</td><td>50-80g(生重)</td><td>1个拳头</td></tr>
          <tr><td>蔬菜</td><td>200g+</td><td>2个拳头</td></tr>
          <tr><td>油</td><td>25-30g/天</td><td>2-3瓷勺</td></tr>
        </tbody>
      </table>
      <div class="font-sm text-secondary mt-8">蛋白质目标：${recipes.meta.proteinTarget}</div>
    </div>
  `;

  html += `</div>`;

  // 平滑替换：先在内存中构建新DOM，再一次性替换，避免空白帧
  const newContent = document.createElement('div');
  newContent.innerHTML = html;
  newContent.style.animation = 'fadeIn 0.15s ease';

  // 保留滚动位置
  const scrollY = window.scrollY;
  container.innerHTML = '';
  container.appendChild(newContent.firstChild);
  window.scrollTo(0, scrollY);

  window.markMealDone = async (mealId, mealType, mealName) => {
    const logs = await db.getByIndex('mealLog', 'date', todayStr());
    const exists = logs.find(l => l.recipeId === mealId);
    if (exists) {
      await db.delete('mealLog', exists.id);
    } else {
      await db.add('mealLog', {
        date: todayStr(),
        mealType,
        recipeId: mealId,
        mealName
      });
    }
    renderDiet({ day: selectedDay });
  };

  // 餐食详情展开/收起
  window.toggleMealDetail = (mealId) => {
    const body = document.getElementById('meal-body-' + mealId);
    const btn = document.getElementById('toggle-btn-' + mealId);
    if (!body || !btn) return;
    const isHidden = body.style.display === 'none';
    body.style.display = isHidden ? '' : 'none';
    btn.innerHTML = isHidden
      ? '收起详情 ' + icons.chevronDown.replace('rotate(0deg)', 'rotate(180deg)')
      : '查看详情 ' + icons.chevronDown;
    if (isHidden) {
      btn.querySelector('svg').style.transform = 'rotate(180deg)';
    } else {
      btn.querySelector('svg').style.transform = 'rotate(0deg)';
    }
  };

  // 日期切换：直接更新页面内容，不走路由（避免闪烁）
  window.selectDietDay = (day) => {
    selectedDay = day;
    renderDiet({ day: selectedDay });
  };

  // 食材清单展开/收起
  window.toggleShoppingList = () => {
    const el = document.getElementById('shopping-list');
    if (!el) return;
    const isShow = el.classList.toggle('show');
    if (isShow) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
}

// 生成一周食材采购清单
function renderShoppingList(menus) {
  // 汇总所有食材，按名称合并
  const ingredientMap = {};

  menus.forEach(dayMenu => {
    ['breakfast', 'lunch', 'dinner', 'snack'].forEach(mealType => {
      const meal = dayMenu.meals[mealType];
      if (!meal || !meal.ingredients) return;
      meal.ingredients.forEach(ing => {
        const key = ing.name;
        if (!ingredientMap[key]) {
          ingredientMap[key] = {
            name: ing.name,
            category: ing.category || 'other',
            entries: [],
            totalGrams: 0
          };
        }
        // 提取克数中的数字
        const gramMatch = (ing.grams || '').match(/(\d+(?:\.\d+)?)/);
        const grams = gramMatch ? parseFloat(gramMatch[1]) : 0;
        ingredientMap[key].totalGrams += grams;
        ingredientMap[key].entries.push({
          day: dayMenu.dayName,
          meal: meal.mealType,
          amount: ing.amount,
          grams: ing.grams
        });
      });
    });
  });

  // 按类别分组
  const categoryOrder = ['protein', 'carb', 'vegetable', 'fruit', 'oil', 'seasoning', 'other'];
  const categoryNames = {
    protein: '🍗 蛋白质类',
    carb: '🍚 主食类',
    vegetable: '🥬 蔬菜类',
    fruit: '🍎 水果类',
    oil: '🫒 油脂类',
    seasoning: '🧂 调味料',
    other: '📦 其他'
  };

  const byCategory = {};
  Object.values(ingredientMap).forEach(ing => {
    const cat = ing.category;
    if (!byCategory[cat]) byCategory[cat] = [];
    byCategory[cat].push(ing);
  });

  let html = '<div style="font-size:13px;color:var(--text-secondary);margin-bottom:12px;">以下为下一周7天所有食材汇总总量，可按此清单一次性采购</div>';

  categoryOrder.forEach(cat => {
    if (!byCategory[cat]) return;
    // 类别小计
    let catTotal = 0;
    byCategory[cat].forEach(ing => { catTotal += ing.totalGrams; });

    html += `
      <div style="margin-bottom:12px;">
        <div style="font-size:14px;font-weight:600;color:var(--primary-dark);margin-bottom:6px;">${categoryNames[cat] || cat} <span style="font-size:12px;color:var(--text-secondary);font-weight:400;">（共${byCategory[cat].length}种）</span></div>
        <table class="data-table">
          <thead>
            <tr><th>食材</th><th style="text-align:center;">采购总量</th><th style="text-align:center;">次数</th><th>每日明细</th></tr>
          </thead>
          <tbody>
    `;
    byCategory[cat].forEach(ing => {
      const count = ing.entries.length;
      const detail = ing.entries.map(e => `${e.day}${e.meal}:${e.amount}`).join('、');
      // 总量显示：有克数的显示克数，没有的显示"适量"
      let totalDisplay;
      if (ing.totalGrams > 0) {
        totalDisplay = ing.totalGrams >= 1000
          ? (ing.totalGrams / 1000).toFixed(1) + 'kg'
          : Math.round(ing.totalGrams) + 'g';
      } else {
        totalDisplay = '适量';
      }
      html += `
        <tr>
          <td style="font-weight:500;">${ing.name}</td>
          <td style="text-align:center;font-weight:600;color:var(--primary);">${totalDisplay}</td>
          <td style="text-align:center;">${count}</td>
          <td style="font-size:11px;">${detail}</td>
        </tr>
      `;
    });
    html += `
          </tbody>
        </table>
    `;
    // 类别小计
    if (catTotal > 0) {
      const catDisplay = catTotal >= 1000 ? (catTotal / 1000).toFixed(1) + 'kg' : Math.round(catTotal) + 'g';
      html += `<div style="font-size:12px;color:var(--text-secondary);text-align:right;padding:4px 8px;">小计：${catDisplay}</div>`;
    }
    html += `</div>`;
  });

  // 统计总数
  const totalItems = Object.keys(ingredientMap).length;
  const totalMeals = menus.reduce((sum, m) => {
    return sum + ['breakfast','lunch','dinner','snack'].filter(mt => m.meals[mt]).length;
  }, 0);
  const grandTotal = Object.values(ingredientMap).reduce((sum, ing) => sum + ing.totalGrams, 0);
  const grandDisplay = grandTotal >= 1000 ? (grandTotal / 1000).toFixed(1) + 'kg' : Math.round(grandTotal) + 'g';
  html += `<div style="font-size:13px;color:var(--primary-dark);text-align:center;padding:10px 0;font-weight:600;">共 ${totalItems} 种食材 · ${totalMeals} 餐 · 总重约 ${grandDisplay}</div>`;

  return html;
}

async function checkMealCompleted(mealId) {
  const logs = await db.getByIndex('mealLog', 'date', todayStr());
  return logs.some(l => l.recipeId === mealId);
}
