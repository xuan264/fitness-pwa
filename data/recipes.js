// 7天食谱数据
// 基于"1蛋白+1主食+2蔬菜"框架
// 4周轮换，每周食材有变化

import { week2Menus } from './recipes-week2.js';
import { week3Menus } from './recipes-week3.js';
import { week4Menus } from './recipes-week4.js';

export const recipes = {
  meta: {
    framework: "1份蛋白 + 1份主食 + 2份蔬菜",
    cookingPrinciple: "蒸、煮、少油炒为主",
    portionGuide: {
      protein: "每餐100-150g（1个手掌大小和厚度）",
      carb: "每餐50-80g生重（1个拳头大小）",
      vegetable: "每餐200g+（2个拳头大小）",
      oil: "每天25-30g（2-3瓷勺）"
    },
    proteinTarget: "每公斤体重1.6-2.2g/天"
  },

  // 第1周食谱（原始）
  weeklyMenus: [
    // ========== 周一 ==========
    {
      day: 1, dayName: "周一",
      meals: {
        breakfast: {
          id: "mon-bf", mealType: "早餐", name: "水煮蛋燕麦粥配苹果",
          totalTime: "10分钟", calories: "约430大卡", protein: "约33g",
          ingredients: [
            { name: "鸡蛋", amount: "3个", grams: "150g", fist: "1.5个手掌", protein: "19g", category: "protein" },
            { name: "燕麦片", amount: "50g", grams: "50g", fist: "1个拳头", protein: "6.5g", category: "carb" },
            { name: "苹果", amount: "1个", grams: "200g", fist: "1个拳头", protein: "0.6g", category: "fruit" },
            { name: "牛奶", amount: "300ml", grams: "300g", fist: "1杯", protein: "9.6g", category: "protein" }
          ],
          steps: [
            "锅中加水烧开，放入燕麦片小火煮5分钟至浓稠",
            "另起锅烧水，水沸后放入鸡蛋煮7分钟（溏心）或10分钟（全熟）",
            "燕麦粥盛碗，可倒入牛奶拌匀",
            "苹果洗净切块摆旁"
          ],
          tips: "燕麦选纯燕麦片，不要速溶加糖款。鸡蛋冷水下锅不易破壳。"
        },
        lunch: {
          id: "mon-lunch", mealType: "午餐", name: "鸡胸肉炒西兰花配米饭",
          totalTime: "20分钟", calories: "约450大卡", protein: "约48g",
          ingredients: [
            { name: "鸡胸肉", amount: "150g", grams: "150g", fist: "1个手掌", protein: "35g", category: "protein" },
            { name: "米饭", amount: "1碗", grams: "熟150g", fist: "1个拳头", protein: "3.9g", category: "carb" },
            { name: "西兰花", amount: "半棵", grams: "200g", fist: "2个拳头", protein: "5.6g", category: "vegetable" },
            { name: "蒜瓣", amount: "2瓣", grams: "10g", fist: "—", protein: "0g", category: "seasoning" },
            { name: "食用油", amount: "1瓷勺", grams: "10g", fist: "—", protein: "0g", category: "oil" }
          ],
          steps: [
            "鸡胸肉切丁，加少许盐、料酒、生抽腌制10分钟",
            "西兰花掰小朵，沸水焯1分钟捞出沥干",
            "热锅冷油，爆香蒜片，下鸡丁翻炒至变色",
            "加入西兰花翻炒2分钟，加盐调味即可",
            "同时用电饭煲煮好米饭"
          ],
          tips: "鸡胸肉切丁比切片更嫩。腌制时加少许淀粉可锁水。西兰花焯水保持翠绿。"
        },
        dinner: {
          id: "mon-dinner", mealType: "晚餐", name: "香煎鱼配红薯凉拌菠菜",
          totalTime: "25分钟", calories: "约400大卡", protein: "约35g",
          ingredients: [
            { name: "龙利鱼/巴沙鱼", amount: "150g", grams: "150g", fist: "1个手掌", protein: "30g", category: "protein" },
            { name: "红薯", amount: "1个中等", grams: "200g", fist: "1个拳头", protein: "2.2g", category: "carb" },
            { name: "菠菜", amount: "1把", grams: "200g", fist: "2个拳头", protein: "5.2g", category: "vegetable" },
            { name: "蒜末、生抽、醋", amount: "适量", grams: "—", fist: "—", protein: "0g", category: "seasoning" },
            { name: "食用油", amount: "1瓷勺", grams: "10g", fist: "—", protein: "0g", category: "oil" }
          ],
          steps: [
            "红薯洗净，上锅蒸15-20分钟至软烂",
            "鱼块用厨房纸吸干水分，撒盐和黑胡椒腌5分钟",
            "平底锅少油，中火煎鱼每面3-4分钟至金黄",
            "菠菜焯水30秒捞出，过凉水沥干",
            "菠菜加蒜末、生抽、醋、几滴香油拌匀"
          ],
          tips: "煎鱼不粘锅秘诀：锅烧够热再下鱼，不要急着翻面。菠菜焯水去草酸。"
        },
        snack: {
          id: "mon-snack", mealType: "加餐（训练后）", name: "香蕉+牛奶+蛋白粉",
          totalTime: "2分钟", calories: "约250大卡", protein: "约20g",
          ingredients: [
            { name: "香蕉", amount: "1根", grams: "120g", fist: "1个拳头", protein: "1.3g", category: "fruit" },
            { name: "牛奶", amount: "250ml", grams: "250g", fist: "1杯", protein: "8g", category: "protein" },
            { name: "蛋白粉", amount: "1勺", grams: "30g", fist: "—", protein: "24g", category: "protein" }
          ],
          steps: ["直接食用即可"],
          tips: "训练后30分钟内加餐，蛋白质+碳水帮助恢复。"
        }
      }
    },
    // ========== 周二 ==========
    {
      day: 2, dayName: "周二",
      meals: {
        breakfast: {
          id: "tue-bf", mealType: "早餐", name: "牛奶全麦面包配香蕉",
          totalTime: "5分钟", calories: "约450大卡", protein: "约30g",
          ingredients: [
            { name: "牛奶", amount: "300ml", grams: "300g", fist: "1杯", protein: "9.6g", category: "protein" },
            { name: "全麦面包", amount: "2片", grams: "70g", fist: "1个拳头", protein: "6.3g", category: "carb" },
            { name: "鸡蛋", amount: "2个", grams: "100g", fist: "1个手掌", protein: "12.6g", category: "protein" },
            { name: "香蕉", amount: "1根", grams: "120g", fist: "1个拳头", protein: "1.3g", category: "fruit" },
            { name: "蛋白粉", amount: "半勺", grams: "15g", fist: "—", protein: "12g", category: "protein" }
          ],
          steps: [
            "全麦面包放入烤箱/平底锅稍微烤一下",
            "煎一个荷包蛋（少油）",
            "鸡蛋夹入面包中，配牛奶和香蕉食用"
          ],
          tips: "选全麦面包时看配料表，全麦粉排第一才是真全麦。"
        },
        lunch: {
          id: "tue-lunch", mealType: "午餐", name: "番茄牛肉盖饭",
          totalTime: "30分钟", calories: "约530大卡", protein: "约46g",
          ingredients: [
            { name: "瘦牛肉", amount: "150g", grams: "150g", fist: "1个手掌", protein: "39g", category: "protein" },
            { name: "米饭", amount: "1碗", grams: "熟150g", fist: "1个拳头", protein: "3.9g", category: "carb" },
            { name: "番茄", amount: "2个", grams: "200g", fist: "2个拳头", protein: "1.8g", category: "vegetable" },
            { name: "洋葱", amount: "1/4个", grams: "50g", fist: "—", protein: "0.7g", category: "vegetable" },
            { name: "食用油", amount: "1瓷勺", grams: "10g", fist: "—", protein: "0g", category: "oil" }
          ],
          steps: [
            "牛肉切薄片，加生抽、料酒、少许淀粉腌制10分钟",
            "番茄切块，洋葱切丝",
            "热锅少油，下牛肉快速翻炒至变色盛出",
            "再加少许油，炒洋葱至透明，加番茄炒出汁",
            "倒回牛肉，加盐、少许糖调味，浇在米饭上"
          ],
          tips: "牛肉逆纹切片更嫩。番茄选熟透的出汁多。加少许糖提鲜不减脂。"
        },
        dinner: {
          id: "tue-dinner", mealType: "晚餐", name: "豆腐蔬菜汤配玉米",
          totalTime: "20分钟", calories: "约380大卡", protein: "约24g",
          ingredients: [
            { name: "北豆腐", amount: "1块", grams: "250g", fist: "1个手掌", protein: "20.3g", category: "protein" },
            { name: "玉米", amount: "1根", grams: "200g", fist: "1个拳头", protein: "8g", category: "carb" },
            { name: "白菜", amount: "3-4叶", grams: "200g", fist: "2个拳头", protein: "2.6g", category: "vegetable" },
            { name: "番茄", amount: "1个", grams: "100g", fist: "1个拳头", protein: "0.9g", category: "vegetable" },
            { name: "食用油", amount: "1瓷勺", grams: "10g", fist: "—", protein: "0g", category: "oil" }
          ],
          steps: [
            "玉米切段，上锅蒸15分钟",
            "豆腐切小块，白菜切段，番茄切块",
            "锅中少油，炒番茄出汁，加水烧开",
            "放入豆腐和白菜，中火煮8分钟",
            "加盐、少许白胡椒调味"
          ],
          tips: "豆腐先用盐水焯一下不易碎。汤里加番茄天然提鲜，不需要味精。"
        },
        snack: {
          id: "tue-snack", mealType: "加餐（训练后）", name: "苹果+水煮蛋+牛奶",
          totalTime: "10分钟", calories: "约260大卡", protein: "约21g",
          ingredients: [
            { name: "苹果", amount: "1个", grams: "200g", fist: "1个拳头", protein: "0.6g", category: "fruit" },
            { name: "鸡蛋", amount: "2个", grams: "100g", fist: "1个手掌", protein: "12.6g", category: "protein" },
            { name: "牛奶", amount: "200ml", grams: "200g", fist: "1杯", protein: "6.4g", category: "protein" }
          ],
          steps: ["鸡蛋水煮7-10分钟", "苹果洗净直接食用"],
          tips: "没有训练的日子可以省略加餐。"
        }
      }
    },
    // ========== 周三 ==========
    {
      day: 3, dayName: "周三",
      meals: {
        breakfast: {
          id: "wed-bf", mealType: "早餐", name: "鸡蛋燕麦粥配橙子",
          totalTime: "10分钟", calories: "约400大卡", protein: "约30g",
          ingredients: [
            { name: "鸡蛋", amount: "3个", grams: "150g", fist: "1.5个手掌", protein: "19g", category: "protein" },
            { name: "燕麦片", amount: "50g", grams: "50g", fist: "1个拳头", protein: "6.5g", category: "carb" },
            { name: "橙子", amount: "1个", grams: "200g", fist: "1个拳头", protein: "1.4g", category: "fruit" },
            { name: "牛奶", amount: "200ml", grams: "200g", fist: "1杯", protein: "6.4g", category: "protein" }
          ],
          steps: [
            "燕麦加水煮5分钟至浓稠",
            "鸡蛋水煮7-10分钟",
            "燕麦粥可加少许盐调味",
            "橙子洗净食用"
          ],
          tips: "燕麦粥加一点点盐比加糖更健康，也能提味。"
        },
        lunch: {
          id: "wed-lunch", mealType: "午餐", name: "虾仁炒黄瓜配米饭",
          totalTime: "15分钟", calories: "约400大卡", protein: "约40g",
          ingredients: [
            { name: "虾仁", amount: "150g", grams: "150g", fist: "1个手掌", protein: "36g", category: "protein" },
            { name: "米饭", amount: "1碗", grams: "熟150g", fist: "1个拳头", protein: "3.9g", category: "carb" },
            { name: "黄瓜", amount: "1根", grams: "200g", fist: "2个拳头", protein: "1.6g", category: "vegetable" },
            { name: "蒜末、姜片", amount: "适量", grams: "—", fist: "—", protein: "0g", category: "seasoning" },
            { name: "食用油", amount: "1瓷勺", grams: "10g", fist: "—", protein: "0g", category: "oil" }
          ],
          steps: [
            "虾仁解冻沥干，加料酒、盐腌5分钟",
            "黄瓜切丁",
            "热锅少油，爆香蒜姜，下虾仁翻炒至变色",
            "加入黄瓜丁翻炒1分钟，加盐调味",
            "配米饭食用"
          ],
          tips: "虾仁炒的时间不要太长，变色即可，否则会老。"
        },
        dinner: {
          id: "wed-dinner", mealType: "晚餐", name: "鸡胸肉红薯冬瓜汤",
          totalTime: "25分钟", calories: "约380大卡", protein: "约38g",
          ingredients: [
            { name: "鸡胸肉", amount: "150g", grams: "150g", fist: "1个手掌", protein: "35g", category: "protein" },
            { name: "红薯", amount: "1个", grams: "200g", fist: "1个拳头", protein: "2.2g", category: "carb" },
            { name: "冬瓜", amount: "300g", grams: "300g", fist: "2个拳头", protein: "0.9g", category: "vegetable" },
            { name: "姜片、盐", amount: "适量", grams: "—", fist: "—", protein: "0g", category: "seasoning" }
          ],
          steps: [
            "鸡胸肉切小块，焯水去血沫",
            "冬瓜去皮切厚片",
            "锅中加水，放入鸡块和姜片，大火烧开转小火炖15分钟",
            "加入冬瓜和红薯块，继续煮10分钟",
            "加盐调味"
          ],
          tips: "鸡胸肉炖汤容易柴，切小块缩短烹饪时间。冬瓜煮到透明即可。"
        },
        snack: {
          id: "wed-snack", mealType: "加餐（训练后）", name: "牛奶+全麦面包+蛋白粉",
          totalTime: "2分钟", calories: "约280大卡", protein: "约24g",
          ingredients: [
            { name: "牛奶", amount: "250ml", grams: "250g", fist: "1杯", protein: "8g", category: "protein" },
            { name: "全麦面包", amount: "1片", grams: "35g", fist: "半个拳头", protein: "3.2g", category: "carb" },
            { name: "蛋白粉", amount: "半勺", grams: "15g", fist: "—", protein: "12g", category: "protein" }
          ],
          steps: ["牛奶加热后配面包食用"],
          tips: "全麦面包提供碳水帮助训练后恢复。"
        }
      }
    },
    // ========== 周四 ==========
    {
      day: 4, dayName: "周四",
      meals: {
        breakfast: {
          id: "thu-bf", mealType: "早餐", name: "牛奶燕麦粥配苹果",
          totalTime: "8分钟", calories: "约420大卡", protein: "约28g",
          ingredients: [
            { name: "牛奶", amount: "300ml", grams: "300g", fist: "1杯", protein: "9.6g", category: "protein" },
            { name: "燕麦片", amount: "50g", grams: "50g", fist: "1个拳头", protein: "6.5g", category: "carb" },
            { name: "苹果", amount: "1个", grams: "200g", fist: "1个拳头", protein: "0.6g", category: "fruit" },
            { name: "鸡蛋", amount: "2个", grams: "100g", fist: "1个手掌", protein: "12.6g", category: "protein" }
          ],
          steps: [
            "牛奶倒入锅中加热（不要煮沸）",
            "加入燕麦片搅拌煮3分钟",
            "苹果洗净切块放入碗中"
          ],
          tips: "用牛奶代替水煮燕麦，蛋白质和钙含量更高。"
        },
        lunch: {
          id: "thu-lunch", mealType: "午餐", name: "煎鱼配米饭炒菠菜",
          totalTime: "20分钟", calories: "约460大卡", protein: "约38g",
          ingredients: [
            { name: "龙利鱼/巴沙鱼", amount: "180g", grams: "180g", fist: "1个手掌", protein: "36g", category: "protein" },
            { name: "米饭", amount: "1碗", grams: "熟150g", fist: "1个拳头", protein: "3.9g", category: "carb" },
            { name: "菠菜", amount: "1把", grams: "200g", fist: "2个拳头", protein: "5.2g", category: "vegetable" },
            { name: "蒜末", amount: "适量", grams: "—", fist: "—", protein: "0g", category: "seasoning" },
            { name: "食用油", amount: "1瓷勺", grams: "10g", fist: "—", protein: "0g", category: "oil" }
          ],
          steps: [
            "鱼块吸干水分，撒盐黑胡椒腌5分钟",
            "平底锅少油，中火煎鱼每面3分钟",
            "菠菜焯水30秒捞出",
            "热锅少油爆香蒜，下菠菜翻炒，加盐调味",
            "配米饭食用"
          ],
          tips: "鱼不要频繁翻面，一面煎好再翻。"
        },
        dinner: {
          id: "thu-dinner", mealType: "晚餐", name: "豆腐玉米沙拉",
          totalTime: "15分钟", calories: "约380大卡", protein: "约24g",
          ingredients: [
            { name: "北豆腐", amount: "200g", grams: "200g", fist: "1个手掌", protein: "16.2g", category: "protein" },
            { name: "玉米", amount: "1根", grams: "200g", fist: "1个拳头", protein: "8g", category: "carb" },
            { name: "生菜", amount: "5-6叶", grams: "150g", fist: "2个拳头", protein: "2.1g", category: "vegetable" },
            { name: "番茄", amount: "1个", grams: "100g", fist: "1个拳头", protein: "0.9g", category: "vegetable" },
            { name: "生抽、醋、香油", amount: "适量", grams: "—", fist: "—", protein: "0g", category: "seasoning" }
          ],
          steps: [
            "玉米蒸熟，剥下玉米粒",
            "豆腐切丁，开水焯1分钟沥干",
            "生菜撕小片，番茄切块",
            "所有食材放大碗，加生抽、醋、几滴香油拌匀"
          ],
          tips: "豆腐焯水去豆腥味且口感更好。沙拉酱热量高，用生抽醋替代。"
        },
        snack: {
          id: "thu-snack", mealType: "加餐（训练后）", name: "香蕉+牛奶+蛋白粉",
          totalTime: "2分钟", calories: "约310大卡", protein: "约32g",
          ingredients: [
            { name: "香蕉", amount: "1根", grams: "120g", fist: "1个拳头", protein: "1.3g", category: "fruit" },
            { name: "牛奶", amount: "250ml", grams: "250g", fist: "1杯", protein: "8g", category: "protein" },
            { name: "蛋白粉", amount: "1勺", grams: "30g", fist: "—", protein: "24g", category: "protein" }
          ],
          steps: ["直接食用"],
          tips: "香蕉提供快碳，牛奶提供蛋白质，是训练后的黄金组合。"
        }
      }
    },
    // ========== 周五 ==========
    {
      day: 5, dayName: "周五",
      meals: {
        breakfast: {
          id: "fri-bf", mealType: "早餐", name: "鸡蛋三明治配橙子",
          totalTime: "10分钟", calories: "约420大卡", protein: "约30g",
          ingredients: [
            { name: "全麦面包", amount: "2片", grams: "70g", fist: "1个拳头", protein: "6.3g", category: "carb" },
            { name: "鸡蛋", amount: "2个", grams: "100g", fist: "1个手掌", protein: "12.6g", category: "protein" },
            { name: "生菜", amount: "2叶", grams: "30g", fist: "—", protein: "0.4g", category: "vegetable" },
            { name: "橙子", amount: "1个", grams: "200g", fist: "1个拳头", protein: "1.4g", category: "fruit" },
            { name: "牛奶", amount: "250ml", grams: "250g", fist: "1杯", protein: "8g", category: "protein" }
          ],
          steps: [
            "煎两个荷包蛋（少油）",
            "面包上铺生菜和荷包蛋，盖上面包",
            "橙子洗净食用"
          ],
          tips: "荷包蛋不要煎太老，蛋黄微糖心更好吃。"
        },
        lunch: {
          id: "fri-lunch", mealType: "午餐", name: "鸡胸肉炒番茄配米饭",
          totalTime: "20分钟", calories: "约440大卡", protein: "约42g",
          ingredients: [
            { name: "鸡胸肉", amount: "150g", grams: "150g", fist: "1个手掌", protein: "35g", category: "protein" },
            { name: "米饭", amount: "1碗", grams: "熟150g", fist: "1个拳头", protein: "3.9g", category: "carb" },
            { name: "番茄", amount: "2个", grams: "200g", fist: "2个拳头", protein: "1.8g", category: "vegetable" },
            { name: "青椒", amount: "1个", grams: "100g", fist: "1个拳头", protein: "1g", category: "vegetable" },
            { name: "食用油", amount: "1瓷勺", grams: "10g", fist: "—", protein: "0g", category: "oil" }
          ],
          steps: [
            "鸡胸肉切丁，腌制10分钟",
            "番茄切块，青椒切条",
            "热锅少油炒鸡丁至变色盛出",
            "炒番茄出汁，加青椒翻炒",
            "倒回鸡丁，加盐调味，配米饭食用"
          ],
          tips: "番茄炒出汁再放鸡丁，味道更均匀。"
        },
        dinner: {
          id: "fri-dinner", mealType: "晚餐", name: "瘦牛肉红薯炒西兰花",
          totalTime: "25分钟", calories: "约420大卡", protein: "约35g",
          ingredients: [
            { name: "瘦牛肉", amount: "120g", grams: "120g", fist: "1个手掌", protein: "31g", category: "protein" },
            { name: "红薯", amount: "1个", grams: "200g", fist: "1个拳头", protein: "2.2g", category: "carb" },
            { name: "西兰花", amount: "半棵", grams: "200g", fist: "2个拳头", protein: "5.6g", category: "vegetable" },
            { name: "蒜末", amount: "适量", grams: "—", fist: "—", protein: "0g", category: "seasoning" },
            { name: "食用油", amount: "1瓷勺", grams: "10g", fist: "—", protein: "0g", category: "oil" }
          ],
          steps: [
            "牛肉逆纹切薄片，腌制10分钟",
            "红薯去皮切小块，蒸10分钟至半熟",
            "西兰花焯水1分钟",
            "热锅少油炒牛肉至变色盛出",
            "炒蒜末，加红薯块和西兰花翻炒，倒回牛肉调味"
          ],
          tips: "牛肉逆纹切才嫩。红薯先蒸再炒省时间。"
        },
        snack: {
          id: "fri-snack", mealType: "加餐（训练后）", name: "牛奶+苹果+蛋白粉",
          totalTime: "2分钟", calories: "约250大卡", protein: "约21g",
          ingredients: [
            { name: "牛奶", amount: "250ml", grams: "250g", fist: "1杯", protein: "8g", category: "protein" },
            { name: "苹果", amount: "1个", grams: "200g", fist: "1个拳头", protein: "0.6g", category: "fruit" },
            { name: "蛋白粉", amount: "半勺", grams: "15g", fist: "—", protein: "12g", category: "protein" }
          ],
          steps: ["直接食用"],
          tips: "周五训练后补充蛋白质恢复周末。"
        }
      }
    },
    // ========== 周六 ==========
    {
      day: 6, dayName: "周六",
      meals: {
        breakfast: {
          id: "sat-bf", mealType: "早餐", name: "水煮蛋全麦面包配香蕉",
          totalTime: "10分钟", calories: "约420大卡", protein: "约28g",
          ingredients: [
            { name: "鸡蛋", amount: "3个", grams: "150g", fist: "1.5个手掌", protein: "19g", category: "protein" },
            { name: "全麦面包", amount: "2片", grams: "70g", fist: "1个拳头", protein: "6.3g", category: "carb" },
            { name: "香蕉", amount: "1根", grams: "120g", fist: "1个拳头", protein: "1.3g", category: "fruit" },
            { name: "牛奶", amount: "200ml", grams: "200g", fist: "1杯", protein: "6.4g", category: "protein" }
          ],
          steps: [
            "鸡蛋水煮7-10分钟",
            "全麦面包烤一下",
            "鸡蛋切片夹面包，配香蕉食用"
          ],
          tips: "周末可以多花点时间做一顿丰盛的早餐。"
        },
        lunch: {
          id: "sat-lunch", mealType: "午餐", name: "虾仁冬瓜汤配米饭",
          totalTime: "20分钟", calories: "约430大卡", protein: "约42g",
          ingredients: [
            { name: "虾仁", amount: "180g", grams: "180g", fist: "1个手掌", protein: "43g", category: "protein" },
            { name: "米饭", amount: "1碗", grams: "熟150g", fist: "1个拳头", protein: "3.9g", category: "carb" },
            { name: "冬瓜", amount: "300g", grams: "300g", fist: "2个拳头", protein: "0.9g", category: "vegetable" },
            { name: "姜片、葱花", amount: "适量", grams: "—", fist: "—", protein: "0g", category: "seasoning" },
            { name: "食用油", amount: "1瓷勺", grams: "10g", fist: "—", protein: "0g", category: "oil" }
          ],
          steps: [
            "虾仁解冻沥干，冬瓜去皮切薄片",
            "锅中少油，放姜片爆香，加冬瓜翻炒",
            "加水烧开，中火煮10分钟至冬瓜透明",
            "下虾仁煮2分钟，加盐调味，撒葱花"
          ],
          tips: "冬瓜煮到透明口感最好。虾仁最后放保持嫩。"
        },
        dinner: {
          id: "sat-dinner", mealType: "晚餐", name: "三文鱼配烤蔬菜",
          totalTime: "25分钟", calories: "约450大卡", protein: "约35g",
          ingredients: [
            { name: "三文鱼", amount: "120g", grams: "120g", fist: "1个手掌", protein: "26.4g", category: "protein" },
            { name: "土豆", amount: "1个", grams: "150g", fist: "1个拳头", protein: "3g", category: "carb" },
            { name: "西兰花", amount: "半棵", grams: "150g", fist: "1.5个拳头", protein: "4.2g", category: "vegetable" },
            { name: "青椒", amount: "1个", grams: "100g", fist: "1个拳头", protein: "1g", category: "vegetable" },
            { name: "橄榄油", amount: "1瓷勺", grams: "10g", fist: "—", protein: "0g", category: "oil" }
          ],
          steps: [
            "土豆切小块，蒸10分钟至半熟",
            "西兰花掰小朵，青椒切块",
            "蔬菜拌少许橄榄油和盐，铺烤盘",
            "三文鱼放蔬菜上，烤箱200°C烤15分钟",
            "（没有烤箱可平底锅煎鱼+炒蔬菜）"
          ],
          tips: "三文鱼含Omega-3脂肪酸，对减脂和心血管都有益。烤蔬菜比炒更省油。"
        },
        snack: {
          id: "sat-snack", mealType: "加餐（训练后）", name: "橙子+水煮蛋+牛奶",
          totalTime: "10分钟", calories: "约230大卡", protein: "约16g",
          ingredients: [
            { name: "橙子", amount: "1个", grams: "200g", fist: "1个拳头", protein: "1.4g", category: "fruit" },
            { name: "鸡蛋", amount: "1个", grams: "50g", fist: "半手掌", protein: "6.3g", category: "protein" },
            { name: "牛奶", amount: "200ml", grams: "200g", fist: "1杯", protein: "6.4g", category: "protein" }
          ],
          steps: ["鸡蛋水煮", "橙子洗净食用"],
          tips: "周末加餐可以更随意。"
        }
      }
    },
    // ========== 周日 ==========
    {
      day: 7, dayName: "周日",
      meals: {
        breakfast: {
          id: "sun-bf", mealType: "早餐", name: "牛奶燕麦粥配水煮蛋",
          totalTime: "10分钟", calories: "约430大卡", protein: "约30g",
          ingredients: [
            { name: "牛奶", amount: "300ml", grams: "300g", fist: "1杯", protein: "9.6g", category: "protein" },
            { name: "燕麦片", amount: "50g", grams: "50g", fist: "1个拳头", protein: "6.5g", category: "carb" },
            { name: "鸡蛋", amount: "2个", grams: "100g", fist: "1个手掌", protein: "12.6g", category: "protein" },
            { name: "蓝莓", amount: "一小把", grams: "50g", fist: "半个拳头", protein: "0.4g", category: "fruit" }
          ],
          steps: [
            "牛奶加热后加燕麦煮3分钟",
            "鸡蛋水煮7分钟",
            "蓝莓洗净放在燕麦粥上"
          ],
          tips: "蓝莓富含花青素，抗氧化效果好，是减脂期的好水果。"
        },
        lunch: {
          id: "sun-lunch", mealType: "午餐", name: "鸡胸肉炒白菜配米饭",
          totalTime: "20分钟", calories: "约430大卡", protein: "约40g",
          ingredients: [
            { name: "鸡胸肉", amount: "150g", grams: "150g", fist: "1个手掌", protein: "35g", category: "protein" },
            { name: "米饭", amount: "1碗", grams: "熟150g", fist: "1个拳头", protein: "3.9g", category: "carb" },
            { name: "白菜", amount: "4-5叶", grams: "250g", fist: "2个拳头", protein: "3.3g", category: "vegetable" },
            { name: "蒜末", amount: "适量", grams: "—", fist: "—", protein: "0g", category: "seasoning" },
            { name: "食用油", amount: "1瓷勺", grams: "10g", fist: "—", protein: "0g", category: "oil" }
          ],
          steps: [
            "鸡胸肉切片，腌制10分钟",
            "白菜切段",
            "热锅少油炒鸡肉至变色盛出",
            "炒蒜末，下白菜炒软",
            "倒回鸡肉，加盐调味，配米饭"
          ],
          tips: "白菜炒软才好吃，不要急。鸡胸肉切片比切丁更入味。"
        },
        dinner: {
          id: "sun-dinner", mealType: "晚餐", name: "豆腐番茄蛋花汤配红薯",
          totalTime: "20分钟", calories: "约420大卡", protein: "约32g",
          ingredients: [
            { name: "北豆腐", amount: "200g", grams: "200g", fist: "1个手掌", protein: "16.2g", category: "protein" },
            { name: "红薯", amount: "1个", grams: "200g", fist: "1个拳头", protein: "2.2g", category: "carb" },
            { name: "番茄", amount: "2个", grams: "200g", fist: "2个拳头", protein: "1.8g", category: "vegetable" },
            { name: "鸡蛋", amount: "2个", grams: "100g", fist: "1个手掌", protein: "12.6g", category: "protein" },
            { name: "虾皮", amount: "1小把", grams: "10g", fist: "—", protein: "4g", category: "protein" },
            { name: "食用油", amount: "1瓷勺", grams: "10g", fist: "—", protein: "0g", category: "oil" }
          ],
          steps: [
            "红薯蒸15分钟",
            "豆腐切小块，番茄切块",
            "锅中少油炒番茄出汁，加水烧开",
            "放入豆腐煮5分钟",
            "鸡蛋打散淋入汤中，加盐调味"
          ],
          tips: "蛋花要在汤沸腾时淋，边淋边搅才能形成细丝。"
        },
        snack: {
          id: "sun-snack", mealType: "加餐（休息日）", name: "香蕉+牛奶+蛋白粉",
          totalTime: "2分钟", calories: "约250大卡", protein: "约20g",
          ingredients: [
            { name: "香蕉", amount: "1根", grams: "120g", fist: "1个拳头", protein: "1.3g", category: "fruit" },
            { name: "牛奶", amount: "250ml", grams: "250g", fist: "1杯", protein: "8g", category: "protein" },
            { name: "蛋白粉", amount: "半勺", grams: "15g", fist: "—", protein: "12g", category: "protein" }
          ],
          steps: ["直接食用"],
          tips: "休息日加餐可选，如果饿了就吃。"
        }
      }
    }
  ]
};

// 4周食谱轮换池
recipes.allWeeklyMenus = [
  recipes.weeklyMenus,  // 第1周
  week2Menus,            // 第2周
  week3Menus,            // 第3周
  week4Menus             // 第4周
];

// 根据当前周数获取对应周的食谱（4周轮换）
// weekInRound: 1-12（一个周期12周），每4周换一轮食谱
recipes.getWeeklyMenus = function(weekInRound) {
  if (!weekInRound || weekInRound < 1) weekInRound = 1;
  const weekIdx = (weekInRound - 1) % 4;  // 0-3 对应第1-4周食谱
  return this.allWeeklyMenus[weekIdx];
};

// 获取当前是第几周（从store中获取）
recipes.getCurrentWeekMenus = function() {
  // 从全局状态获取当前周数
  const week = (window.__store?.state?.currentWeek) || 1;
  return this.getWeeklyMenus(week);
};
