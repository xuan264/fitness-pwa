// 第3周食谱数据（7天）
// 基于"1蛋白+1主食+2蔬菜"框架
// 适合女性减脂期：每日约1400-1600大卡，蛋白质120g+

export const week3Menus = [
  // ========== 周一 ==========
  {
    day: 1, dayName: "周一",
    meals: {
      breakfast: {
        id: "w3-mon-bf", mealType: "早餐", name: "鸡蛋玉米饼配牛奶苹果",
        totalTime: "15分钟", calories: "约430大卡", protein: "约30g",
        ingredients: [
          { name: "鸡蛋", amount: "3个", grams: "150g", fist: "1.5个手掌", protein: "19g", category: "protein" },
          { name: "玉米粒", amount: "50g", grams: "50g", fist: "—", protein: "2g", category: "carb" },
          { name: "面粉", amount: "30g", grams: "30g", fist: "—", protein: "3g", category: "carb" },
          { name: "牛奶", amount: "250ml", grams: "250g", fist: "1杯", protein: "8g", category: "protein" },
          { name: "苹果", amount: "1个", grams: "200g", fist: "1个拳头", protein: "0.6g", category: "fruit" }
        ],
        steps: [
          "鸡蛋打散，加入面粉、玉米粒和少许盐搅匀",
          "平底锅少油，倒入蛋液摊成饼",
          "两面煎至金黄，切块",
          "配牛奶和苹果食用"
        ],
        tips: "玉米粒可以用罐头或冷冻的，方便快捷。面饼可以加葱花增香。"
      },
      lunch: {
        id: "w3-mon-lunch", mealType: "午餐", name: "鸡胸肉炒莴笋配杂粮饭",
        totalTime: "20分钟", calories: "约430大卡", protein: "约40g",
        ingredients: [
          { name: "鸡胸肉", amount: "150g", grams: "150g", fist: "1个手掌", protein: "35g", category: "protein" },
          { name: "杂粮饭", amount: "1碗", grams: "熟150g", fist: "1个拳头", protein: "3.5g", category: "carb" },
          { name: "莴笋", amount: "1根", grams: "200g", fist: "2个拳头", protein: "1g", category: "vegetable" },
          { name: "胡萝卜", amount: "1/3根", grams: "50g", fist: "—", protein: "0.5g", category: "vegetable" },
          { name: "食用油", amount: "1瓷勺", grams: "10g", fist: "—", protein: "0g", category: "oil" }
        ],
        steps: [
          "鸡胸肉切片，加生抽、料酒腌制10分钟",
          "莴笋去皮切片，胡萝卜切花片",
          "热锅少油炒鸡肉至变色盛出",
          "炒莴笋和胡萝卜2分钟",
          "倒回鸡肉，加盐调味，配杂粮饭"
        ],
        tips: "莴笋清脆爽口，快炒保持脆感。莴笋叶也可以一起炒，营养更高。"
      },
      dinner: {
        id: "w3-mon-dinner", mealType: "晚餐", name: "豆腐虾仁裙带菜汤配红薯",
        totalTime: "20分钟", calories: "约350大卡", protein: "约35g",
        ingredients: [
          { name: "虾仁", amount: "100g", grams: "100g", fist: "—", protein: "24g", category: "protein" },
          { name: "北豆腐", amount: "100g", grams: "100g", fist: "—", protein: "8.1g", category: "protein" },
          { name: "红薯", amount: "1个", grams: "200g", fist: "1个拳头", protein: "2.2g", category: "carb" },
          { name: "干裙带菜", amount: "5g", grams: "5g（泡发约50g）", fist: "1个拳头", protein: "0.5g", category: "vegetable" },
          { name: "葱花", amount: "适量", grams: "—", fist: "—", protein: "0g", category: "seasoning" }
        ],
        steps: [
          "红薯上锅蒸15分钟",
          "裙带菜泡发5分钟，豆腐切小块",
          "锅中加水烧开，放豆腐和裙带菜煮5分钟",
          "下虾仁煮2分钟，加盐调味",
          "撒葱花出锅"
        ],
        tips: "裙带菜富含碘和矿物质，热量极低。干裙带菜泡发量很大，5g就够。"
      },
      snack: {
        id: "w3-mon-snack", mealType: "加餐（训练后）", name: "香蕉+酸奶+蛋白粉",
        totalTime: "2分钟", calories: "约260大卡", protein: "约21g",
        ingredients: [
          { name: "香蕉", amount: "1根", grams: "120g", fist: "1个拳头", protein: "1.3g", category: "fruit" },
          { name: "无糖酸奶", amount: "150g", grams: "150g", fist: "1杯", protein: "7.5g", category: "protein" },
          { name: "蛋白粉", amount: "半勺", grams: "15g", fist: "—", protein: "12g", category: "protein" }
        ],
        steps: ["香蕉切片放入酸奶中食用"],
        tips: "香蕉配酸奶口感像甜品，减脂期解馋首选。"
      }
    }
  },
  // ========== 周二 ==========
  {
    day: 2, dayName: "周二",
    meals: {
      breakfast: {
        id: "w3-tue-bf", mealType: "早餐", name: "牛奶燕麦粥配紫薯蓝莓",
        totalTime: "10分钟", calories: "约430大卡", protein: "约28g",
        ingredients: [
          { name: "牛奶", amount: "300ml", grams: "300g", fist: "1杯", protein: "9.6g", category: "protein" },
          { name: "燕麦片", amount: "40g", grams: "40g", fist: "1个拳头", protein: "5.2g", category: "carb" },
          { name: "紫薯", amount: "1个", grams: "80g", fist: "—", protein: "1.2g", category: "carb" },
          { name: "蓝莓", amount: "一小把", grams: "50g", fist: "半个拳头", protein: "0.4g", category: "fruit" },
          { name: "鸡蛋", amount: "2个", grams: "100g", fist: "1个手掌", protein: "12.6g", category: "protein" }
        ],
        steps: [
          "紫薯蒸10分钟",
          "牛奶加热后加入燕麦煮3分钟",
          "紫薯压成泥放入燕麦粥",
          "撒蓝莓"
        ],
        tips: "紫薯让燕麦粥变成漂亮的紫色，蓝莓的酸甜让粥更好吃。"
      },
      lunch: {
        id: "w3-tue-lunch", mealType: "午餐", name: "瘦牛肉西兰花炒意面",
        totalTime: "25分钟", calories: "约470大卡", protein: "约42g",
        ingredients: [
          { name: "瘦牛肉", amount: "120g", grams: "120g", fist: "1个手掌", protein: "31g", category: "protein" },
          { name: "全麦意面", amount: "60g", grams: "60g（干）", fist: "1个拳头", protein: "7.8g", category: "carb" },
          { name: "西兰花", amount: "半棵", grams: "150g", fist: "1.5个拳头", protein: "4.2g", category: "vegetable" },
          { name: "蒜末", amount: "适量", grams: "—", fist: "—", protein: "0g", category: "seasoning" },
          { name: "橄榄油", amount: "1瓷勺", grams: "10g", fist: "—", protein: "0g", category: "oil" }
        ],
        steps: [
          "意面放加盐沸水中煮8-10分钟",
          "牛肉逆纹切薄片，加生抽、料酒腌制10分钟",
          "西兰花掰小朵焯水1分钟",
          "热锅少油炒牛肉至变色，加蒜末和西兰花翻炒",
          "捞出意面拌入，加盐和少许黑胡椒调味"
        ],
        tips: "全麦意面GI值低，饱腹感强。牛肉和西兰花是经典健身搭配。"
      },
      dinner: {
        id: "w3-tue-dinner", mealType: "晚餐", name: "鸡胸肉蒸蛋配冬瓜汤",
        totalTime: "20分钟", calories: "约350大卡", protein: "约38g",
        ingredients: [
          { name: "鸡胸肉", amount: "120g", grams: "120g", fist: "—", protein: "28g", category: "protein" },
          { name: "鸡蛋", amount: "1个", grams: "50g", fist: "半手掌", protein: "6.3g", category: "protein" },
          { name: "冬瓜", amount: "250g", grams: "250g", fist: "2个拳头", protein: "0.8g", category: "vegetable" },
          { name: "海带丝", amount: "50g", grams: "50g", fist: "—", protein: "0.5g", category: "vegetable" },
          { name: "葱花、盐", amount: "适量", grams: "—", fist: "—", protein: "0g", category: "seasoning" }
        ],
        steps: [
          "鸡胸肉剁成肉泥，加少许盐和生抽拌匀",
          "鸡蛋打散加1.5倍温水，倒入鸡肉泥中搅匀",
          "盖保鲜膜大火蒸10分钟",
          "冬瓜切片和海带丝另起锅煮10分钟",
          "蒸蛋切块，配汤食用"
        ],
        tips: "鸡肉蒸蛋口感嫩滑，比纯水煮鸡胸肉好吃很多。"
      },
      snack: {
        id: "w3-tue-snack", mealType: "加餐（训练后）", name: "橙子+牛奶+蛋白粉",
        totalTime: "2分钟", calories: "约240大卡", protein: "约21g",
        ingredients: [
          { name: "橙子", amount: "1个", grams: "200g", fist: "1个拳头", protein: "1.4g", category: "fruit" },
          { name: "牛奶", amount: "250ml", grams: "250g", fist: "1杯", protein: "8g", category: "protein" },
          { name: "蛋白粉", amount: "半勺", grams: "15g", fist: "—", protein: "12g", category: "protein" }
        ],
        steps: ["直接食用"],
        tips: "橙子维C含量高，帮助铁质吸收，适合餐后食用。"
      }
    }
  },
  // ========== 周三 ==========
  {
    day: 3, dayName: "周三",
    meals: {
      breakfast: {
        id: "w3-wed-bf", mealType: "早餐", name: "全麦馒头夹蛋配牛奶小番茄",
        totalTime: "12分钟", calories: "约430大卡", protein: "约30g",
        ingredients: [
          { name: "全麦馒头", amount: "1个", grams: "80g", fist: "1个拳头", protein: "5g", category: "carb" },
          { name: "鸡蛋", amount: "3个", grams: "150g", fist: "1.5个手掌", protein: "19g", category: "protein" },
          { name: "生菜", amount: "2叶", grams: "30g", fist: "—", protein: "0.4g", category: "vegetable" },
          { name: "牛奶", amount: "250ml", grams: "250g", fist: "1杯", protein: "8g", category: "protein" },
          { name: "小番茄", amount: "8个", grams: "80g", fist: "1个拳头", protein: "0.7g", category: "fruit" }
        ],
        steps: [
          "全麦馒头蒸热对半切开",
          "煎两个荷包蛋（少油）",
          "馒头中夹入生菜和荷包蛋",
          "配牛奶和小番茄"
        ],
        tips: "全麦馒头可以一次蒸多个冷冻保存，早晨蒸热即可。"
      },
      lunch: {
        id: "w3-wed-lunch", mealType: "午餐", name: "虾仁番茄豆腐盖饭",
        totalTime: "20分钟", calories: "约440大卡", protein: "约42g",
        ingredients: [
          { name: "虾仁", amount: "150g", grams: "150g", fist: "1个手掌", protein: "36g", category: "protein" },
          { name: "米饭", amount: "1碗", grams: "熟150g", fist: "1个拳头", protein: "3.9g", category: "carb" },
          { name: "番茄", amount: "2个", grams: "200g", fist: "2个拳头", protein: "1.8g", category: "vegetable" },
          { name: "嫩豆腐", amount: "1块", grams: "100g", fist: "—", protein: "5g", category: "protein" },
          { name: "食用油", amount: "1瓷勺", grams: "10g", fist: "—", protein: "0g", category: "oil" }
        ],
        steps: [
          "虾仁解冻沥干，番茄切块，豆腐切丁",
          "热锅少油炒番茄出汁",
          "加水烧开，放豆腐煮3分钟",
          "下虾仁煮2分钟，加盐调味",
          "浇在米饭上"
        ],
        tips: "嫩豆腐口感滑嫩，和虾仁番茄搭配像一道日式料理。"
      },
      dinner: {
        id: "w3-wed-dinner", mealType: "晚餐", name: "鸡胸肉白菜炖粉条",
        totalTime: "25分钟", calories: "约370大卡", protein: "约38g",
        ingredients: [
          { name: "鸡胸肉", amount: "150g", grams: "150g", fist: "1个手掌", protein: "35g", category: "protein" },
          { name: "红薯粉丝", amount: "30g", grams: "30g（干）", fist: "1个拳头", protein: "0.3g", category: "carb" },
          { name: "白菜", amount: "4-5叶", grams: "250g", fist: "2个拳头", protein: "3.3g", category: "vegetable" },
          { name: "胡萝卜", amount: "1/3根", grams: "50g", fist: "—", protein: "0.5g", category: "vegetable" },
          { name: "食用油", amount: "1瓷勺", grams: "10g", fist: "—", protein: "0g", category: "oil" }
        ],
        steps: [
          "鸡胸肉切小块，焯水去血沫",
          "白菜切段，胡萝卜切片，粉丝泡软",
          "热锅少油炒鸡肉至变色",
          "加白菜和胡萝卜翻炒，加水烧开",
          "放粉丝煮5分钟，加盐调味"
        ],
        tips: "红薯粉丝比普通粉条热量低，GI值也更低。粉丝最后放防止煮烂。"
      },
      snack: {
        id: "w3-wed-snack", mealType: "加餐（训练后）", name: "苹果+鸡蛋+牛奶",
        totalTime: "10分钟", calories: "约220大卡", protein: "约15g",
        ingredients: [
          { name: "苹果", amount: "1个", grams: "200g", fist: "1个拳头", protein: "0.6g", category: "fruit" },
          { name: "鸡蛋", amount: "1个", grams: "50g", fist: "半手掌", protein: "6.3g", category: "protein" },
          { name: "牛奶", amount: "200ml", grams: "200g", fist: "1杯", protein: "6.4g", category: "protein" }
        ],
        steps: ["鸡蛋水煮7分钟", "苹果洗净食用"],
        tips: "苹果果胶丰富，有助降低胆固醇。连皮吃膳食纤维更多。"
      }
    }
  },
  // ========== 周四 ==========
  {
    day: 4, dayName: "周四",
    meals: {
      breakfast: {
        id: "w3-thu-bf", mealType: "早餐", name: "牛奶鸡蛋玉米羹配全麦面包",
        totalTime: "10分钟", calories: "约420大卡", protein: "约28g",
        ingredients: [
          { name: "牛奶", amount: "300ml", grams: "300g", fist: "1杯", protein: "9.6g", category: "protein" },
          { name: "鸡蛋", amount: "2个", grams: "100g", fist: "1个手掌", protein: "12.6g", category: "protein" },
          { name: "玉米粒", amount: "80g", grams: "80g", fist: "—", protein: "3.2g", category: "carb" },
          { name: "全麦面包", amount: "1片", grams: "35g", fist: "半个拳头", protein: "3.2g", category: "carb" }
        ],
        steps: [
          "玉米粒加水用料理机打成浆（或用玉米面代替）",
          "玉米浆倒入锅中加热，打入鸡蛋花",
          "倒入牛奶搅匀，加少许盐",
          "配全麦面包食用"
        ],
        tips: "没有料理机可以用玉米面（细玉米粉）加水调匀代替，同样好喝。"
      },
      lunch: {
        id: "w3-thu-lunch", mealType: "午餐", name: "鸡胸肉炒山药木耳配米饭",
        totalTime: "20分钟", calories: "约430大卡", protein: "约40g",
        ingredients: [
          { name: "鸡胸肉", amount: "150g", grams: "150g", fist: "1个手掌", protein: "35g", category: "protein" },
          { name: "米饭", amount: "1碗", grams: "熟150g", fist: "1个拳头", protein: "3.9g", category: "carb" },
          { name: "山药", amount: "150g", grams: "150g", fist: "1个拳头", protein: "2g", category: "carb" },
          { name: "水发木耳", amount: "100g", grams: "100g", fist: "1个拳头", protein: "1.5g", category: "vegetable" },
          { name: "食用油", amount: "1瓷勺", grams: "10g", fist: "—", protein: "0g", category: "oil" }
        ],
        steps: [
          "鸡胸肉切片腌制10分钟",
          "山药去皮切片（戴手套），泡水",
          "木耳撕小朵",
          "热锅少油炒鸡肉至变色盛出",
          "炒山药和木耳3分钟，倒回鸡肉，加盐调味，配米饭"
        ],
        tips: "山药去皮一定要戴手套。山药切好后泡水防氧化变黑。"
      },
      dinner: {
        id: "w3-thu-dinner", mealType: "晚餐", name: "三文鱼配蒸蔬菜",
        totalTime: "20分钟", calories: "约440大卡", protein: "约38g",
        ingredients: [
          { name: "三文鱼", amount: "150g", grams: "150g", fist: "1个手掌", protein: "33g", category: "protein" },
          { name: "土豆", amount: "1个", grams: "120g", fist: "1个拳头", protein: "2.4g", category: "carb" },
          { name: "西兰花", amount: "半棵", grams: "150g", fist: "1.5个拳头", protein: "4.2g", category: "vegetable" },
          { name: "胡萝卜", amount: "1/2根", grams: "80g", fist: "—", protein: "0.8g", category: "vegetable" },
          { name: "柠檬", amount: "2片", grams: "—", fist: "—", protein: "0g", category: "seasoning" }
        ],
        steps: [
          "土豆切小块，西兰花掰小朵，胡萝卜切条",
          "蔬菜铺盘底，撒少许盐",
          "三文鱼放蔬菜上，挤柠檬汁",
          "上锅大火蒸12分钟",
          "（没有蒸锅可用平底锅煎鱼+煮蔬菜）"
        ],
        tips: "蒸比煎更省油，三文鱼的油脂刚好渗入蔬菜。柠檬去腥提鲜。"
      },
      snack: {
        id: "w3-thu-snack", mealType: "加餐（训练后）", name: "香蕉+牛奶+蛋白粉",
        totalTime: "2分钟", calories: "约250大卡", protein: "约20g",
        ingredients: [
          { name: "香蕉", amount: "1根", grams: "120g", fist: "1个拳头", protein: "1.3g", category: "fruit" },
          { name: "牛奶", amount: "250ml", grams: "250g", fist: "1杯", protein: "8g", category: "protein" },
          { name: "蛋白粉", amount: "半勺", grams: "15g", fist: "—", protein: "12g", category: "protein" }
        ],
        steps: ["直接食用"],
        tips: "香蕉和牛奶是训练后的经典恢复组合。"
      }
    }
  },
  // ========== 周五 ==========
  {
    day: 5, dayName: "周五",
    meals: {
      breakfast: {
        id: "w3-fri-bf", mealType: "早餐", name: "水煮蛋全麦面包配牛奶猕猴桃",
        totalTime: "10分钟", calories: "约430大卡", protein: "约30g",
        ingredients: [
          { name: "鸡蛋", amount: "2个", grams: "100g", fist: "1个手掌", protein: "12.6g", category: "protein" },
          { name: "全麦面包", amount: "2片", grams: "70g", fist: "1个拳头", protein: "6.3g", category: "carb" },
          { name: "牛奶", amount: "300ml", grams: "300g", fist: "1杯", protein: "9.6g", category: "protein" },
          { name: "猕猴桃", amount: "1个", grams: "80g", fist: "—", protein: "0.8g", category: "fruit" }
        ],
        steps: [
          "鸡蛋水煮7分钟",
          "全麦面包烤一下",
          "鸡蛋切片夹面包",
          "猕猴桃去皮切片，配牛奶"
        ],
        tips: "猕猴桃维C含量是橙子的2倍，是水果中的营养冠军。"
      },
      lunch: {
        id: "w3-fri-lunch", mealType: "午餐", name: "虾仁炒蛋配米饭西兰花",
        totalTime: "15分钟", calories: "约440大卡", protein: "约44g",
        ingredients: [
          { name: "虾仁", amount: "120g", grams: "120g", fist: "—", protein: "29g", category: "protein" },
          { name: "鸡蛋", amount: "2个", grams: "100g", fist: "1个手掌", protein: "12.6g", category: "protein" },
          { name: "米饭", amount: "1碗", grams: "熟150g", fist: "1个拳头", protein: "3.9g", category: "carb" },
          { name: "西兰花", amount: "半棵", grams: "150g", fist: "1.5个拳头", protein: "4.2g", category: "vegetable" },
          { name: "食用油", amount: "1瓷勺", grams: "10g", fist: "—", protein: "0g", category: "oil" }
        ],
        steps: [
          "虾仁解冻沥干，鸡蛋打散",
          "西兰花焯水1分钟",
          "热锅少油炒蛋液至半凝固，加入虾仁翻炒",
          "炒至虾仁变色，加盐调味",
          "配米饭和焯好的西兰花"
        ],
        tips: "虾仁炒蛋是高蛋白低脂的经典菜，做法简单快捷。"
      },
      dinner: {
        id: "w3-fri-dinner", mealType: "晚餐", name: "瘦牛肉番茄炖菜配红薯",
        totalTime: "30分钟", calories: "约400大卡", protein: "约36g",
        ingredients: [
          { name: "瘦牛肉", amount: "120g", grams: "120g", fist: "1个手掌", protein: "31g", category: "protein" },
          { name: "红薯", amount: "1个", grams: "200g", fist: "1个拳头", protein: "2.2g", category: "carb" },
          { name: "番茄", amount: "2个", grams: "200g", fist: "2个拳头", protein: "1.8g", category: "vegetable" },
          { name: "洋葱", amount: "1/4个", grams: "50g", fist: "—", protein: "0.7g", category: "vegetable" },
          { name: "食用油", amount: "1瓷勺", grams: "10g", fist: "—", protein: "0g", category: "oil" }
        ],
        steps: [
          "红薯蒸15分钟",
          "牛肉切小块焯水去血沫",
          "番茄切块，洋葱切丁",
          "热锅少油炒洋葱，加番茄炒出汁",
          "加牛肉和水，小火炖15分钟，加盐调味"
        ],
        tips: "番茄炖牛肉酸甜开胃，番茄的酸能让牛肉更软烂。"
      },
      snack: {
        id: "w3-fri-snack", mealType: "加餐（训练后）", name: "酸奶+蓝莓+蛋白粉",
        totalTime: "2分钟", calories: "约240大卡", protein: "约20g",
        ingredients: [
          { name: "无糖酸奶", amount: "150g", grams: "150g", fist: "1杯", protein: "7.5g", category: "protein" },
          { name: "蓝莓", amount: "一小把", grams: "50g", fist: "半个拳头", protein: "0.4g", category: "fruit" },
          { name: "蛋白粉", amount: "半勺", grams: "15g", fist: "—", protein: "12g", category: "protein" }
        ],
        steps: ["蓝莓洗净撒入酸奶中"],
        tips: "蓝莓花青素抗氧化，酸奶补充蛋白质和益生菌。"
      }
    }
  },
  // ========== 周六 ==========
  {
    day: 6, dayName: "周六",
    meals: {
      breakfast: {
        id: "w3-sat-bf", mealType: "早餐", name: "紫薯鸡蛋卷配牛奶",
        totalTime: "15分钟", calories: "约420大卡", protein: "约30g",
        ingredients: [
          { name: "鸡蛋", amount: "3个", grams: "150g", fist: "1.5个手掌", protein: "19g", category: "protein" },
          { name: "紫薯", amount: "1个", grams: "80g", fist: "—", protein: "1.2g", category: "carb" },
          { name: "面粉", amount: "20g", grams: "20g", fist: "—", protein: "2g", category: "carb" },
          { name: "牛奶", amount: "300ml", grams: "300g", fist: "1杯", protein: "9.6g", category: "protein" }
        ],
        steps: [
          "紫薯蒸10分钟，压成泥",
          "鸡蛋加面粉和少许盐打散搅匀",
          "平底锅少油，倒入蛋液摊薄饼",
          "蛋饼上抹紫薯泥，卷起切段",
          "配牛奶"
        ],
        tips: "紫薯蛋卷颜色漂亮，像甜品一样好吃，很适合周末做。"
      },
      lunch: {
        id: "w3-sat-lunch", mealType: "午餐", name: "鸡胸肉炒彩椒配土豆",
        totalTime: "20分钟", calories: "约430大卡", protein: "约40g",
        ingredients: [
          { name: "鸡胸肉", amount: "150g", grams: "150g", fist: "1个手掌", protein: "35g", category: "protein" },
          { name: "土豆", amount: "1个", grams: "150g", fist: "1个拳头", protein: "3g", category: "carb" },
          { name: "红黄彩椒", amount: "各半个", grams: "150g", fist: "1.5个拳头", protein: "1.5g", category: "vegetable" },
          { name: "洋葱", amount: "1/4个", grams: "50g", fist: "—", protein: "0.7g", category: "vegetable" },
          { name: "食用油", amount: "1瓷勺", grams: "10g", fist: "—", protein: "0g", category: "oil" }
        ],
        steps: [
          "鸡胸肉切丁腌制10分钟",
          "土豆去皮切丁，彩椒和洋葱切块",
          "土豆丁蒸10分钟至半熟",
          "热锅少油炒鸡肉至变色，加洋葱和彩椒翻炒",
          "加土豆丁翻炒，加盐调味"
        ],
        tips: "彩椒维C含量比青椒更高，颜色丰富让人更有食欲。"
      },
      dinner: {
        id: "w3-sat-dinner", mealType: "晚餐", name: "豆腐菌菇蒸虾配玉米",
        totalTime: "20分钟", calories: "约360大卡", protein: "约35g",
        ingredients: [
          { name: "虾仁", amount: "120g", grams: "120g", fist: "—", protein: "29g", category: "protein" },
          { name: "嫩豆腐", amount: "1块", grams: "150g", fist: "1个手掌", protein: "7.5g", category: "protein" },
          { name: "玉米", amount: "半根", grams: "100g", fist: "1个拳头", protein: "4g", category: "carb" },
          { name: "金针菇", amount: "100g", grams: "100g", fist: "1个拳头", protein: "2.2g", category: "vegetable" },
          { name: "蒜末、生抽", amount: "适量", grams: "—", fist: "—", protein: "0g", category: "seasoning" }
        ],
        steps: [
          "玉米蒸15分钟",
          "豆腐切片铺盘底，金针菇铺上",
          "虾仁铺最上层，撒蒜末和少许生抽",
          "上锅大火蒸8分钟",
          "出锅淋少许热油"
        ],
        tips: "蒸菜最大程度保留营养，不用太多油也很香。"
      },
      snack: {
        id: "w3-sat-snack", mealType: "加餐（训练后）", name: "橙子+鸡蛋+牛奶",
        totalTime: "10分钟", calories: "约230大卡", protein: "约16g",
        ingredients: [
          { name: "橙子", amount: "1个", grams: "200g", fist: "1个拳头", protein: "1.4g", category: "fruit" },
          { name: "鸡蛋", amount: "1个", grams: "50g", fist: "半手掌", protein: "6.3g", category: "protein" },
          { name: "牛奶", amount: "200ml", grams: "200g", fist: "1杯", protein: "6.4g", category: "protein" }
        ],
        steps: ["鸡蛋水煮7分钟", "橙子剥皮食用"],
        tips: "周末训练后补充维C和蛋白质，帮助肌肉恢复。"
      }
    }
  },
  // ========== 周日 ==========
  {
    day: 7, dayName: "周日",
    meals: {
      breakfast: {
        id: "w3-sun-bf", mealType: "早餐", name: "牛奶燕麦配香蕉坚果",
        totalTime: "8分钟", calories: "约440大卡", protein: "约28g",
        ingredients: [
          { name: "牛奶", amount: "300ml", grams: "300g", fist: "1杯", protein: "9.6g", category: "protein" },
          { name: "燕麦片", amount: "50g", grams: "50g", fist: "1个拳头", protein: "6.5g", category: "carb" },
          { name: "香蕉", amount: "1根", grams: "120g", fist: "1个拳头", protein: "1.3g", category: "fruit" },
          { name: "核桃", amount: "2个", grams: "15g", fist: "—", protein: "1.8g", category: "fruit" },
          { name: "鸡蛋", amount: "2个", grams: "100g", fist: "1个手掌", protein: "12.6g", category: "protein" }
        ],
        steps: [
          "牛奶加热后加燕麦煮3分钟",
          "香蕉切片铺上",
          "核桃掰碎撒上"
        ],
        tips: "核桃富含Omega-3，每天2个就够，不要多吃因为热量较高。"
      },
      lunch: {
        id: "w3-sun-lunch", mealType: "午餐", name: "龙利鱼炒蛋配米饭芦笋",
        totalTime: "15分钟", calories: "约440大卡", protein: "约42g",
        ingredients: [
          { name: "龙利鱼/巴沙鱼", amount: "150g", grams: "150g", fist: "1个手掌", protein: "30g", category: "protein" },
          { name: "鸡蛋", amount: "1个", grams: "50g", fist: "半手掌", protein: "6.3g", category: "protein" },
          { name: "米饭", amount: "1碗", grams: "熟150g", fist: "1个拳头", protein: "3.9g", category: "carb" },
          { name: "芦笋", amount: "6根", grams: "150g", fist: "1.5个拳头", protein: "2.6g", category: "vegetable" },
          { name: "食用油", amount: "1瓷勺", grams: "10g", fist: "—", protein: "0g", category: "oil" }
        ],
        steps: [
          "鱼切块，鸡蛋打散",
          "芦笋切段焯水1分钟",
          "热锅少油炒蛋液至半凝固，加鱼块翻炒",
          "鱼块变白即可，加盐调味",
          "配米饭和芦笋"
        ],
        tips: "鱼肉和鸡蛋都是优质蛋白，消化吸收率很高。"
      },
      dinner: {
        id: "w3-sun-dinner", mealType: "晚餐", name: "鸡胸肉萝卜汤配红薯",
        totalTime: "25分钟", calories: "约370大卡", protein: "约38g",
        ingredients: [
          { name: "鸡胸肉", amount: "150g", grams: "150g", fist: "1个手掌", protein: "35g", category: "protein" },
          { name: "红薯", amount: "1个", grams: "150g", fist: "1个拳头", protein: "2.2g", category: "carb" },
          { name: "白萝卜", amount: "200g", grams: "200g", fist: "2个拳头", protein: "0.8g", category: "vegetable" },
          { name: "枸杞", amount: "少许", grams: "5g", fist: "—", protein: "0g", category: "seasoning" },
          { name: "姜片、盐", amount: "适量", grams: "—", fist: "—", protein: "0g", category: "seasoning" }
        ],
        steps: [
          "红薯蒸15分钟",
          "鸡胸肉切小块焯水",
          "萝卜去皮切厚片",
          "锅中加水放鸡肉、姜片、萝卜，大火烧开转小火炖15分钟",
          "加枸杞和盐调味"
        ],
        tips: "白萝卜消食化滞，配合鸡胸肉炖汤清淡滋补，适合晚餐。"
      },
      snack: {
        id: "w3-sun-snack", mealType: "加餐（休息日）", name: "苹果+牛奶+蛋白粉",
        totalTime: "2分钟", calories: "约240大卡", protein: "约21g",
        ingredients: [
          { name: "苹果", amount: "1个", grams: "200g", fist: "1个拳头", protein: "0.6g", category: "fruit" },
          { name: "牛奶", amount: "250ml", grams: "250g", fist: "1杯", protein: "8g", category: "protein" },
          { name: "蛋白粉", amount: "半勺", grams: "15g", fist: "—", protein: "12g", category: "protein" }
        ],
        steps: ["直接食用"],
        tips: "休息日不训练可以减少加餐量，饿了再吃。"
      }
    }
  }
];
