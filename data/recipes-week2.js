// 第2周食谱数据（7天）
// 基于"1蛋白+1主食+2蔬菜"框架
// 适合女性减脂期：每日约1400-1600大卡，蛋白质120g+

export const week2Menus = [
  // ========== 周一 ==========
  {
    day: 1, dayName: "周一",
    meals: {
      breakfast: {
        id: "w2-mon-bf", mealType: "早餐", name: "紫薯牛奶燕麦配水煮蛋",
        totalTime: "12分钟", calories: "约420大卡", protein: "约30g",
        ingredients: [
          { name: "紫薯", amount: "1个", grams: "100g", fist: "1个拳头", protein: "1.5g", category: "carb" },
          { name: "燕麦片", amount: "40g", grams: "40g", fist: "1个拳头", protein: "5.2g", category: "carb" },
          { name: "鸡蛋", amount: "2个", grams: "100g", fist: "1个手掌", protein: "12.6g", category: "protein" },
          { name: "牛奶", amount: "300ml", grams: "300g", fist: "1杯", protein: "9.6g", category: "protein" }
        ],
        steps: [
          "紫薯洗净去皮切小块，上锅蒸10分钟至软烂",
          "燕麦片加水煮3分钟至浓稠",
          "鸡蛋水煮7分钟",
          "燕麦粥盛碗，放入紫薯块，倒入牛奶拌匀"
        ],
        tips: "紫薯花青素含量高，抗氧化效果好，蒸比煮更能保留营养。"
      },
      lunch: {
        id: "w2-mon-lunch", mealType: "午餐", name: "虾仁番茄意面",
        totalTime: "20分钟", calories: "约460大卡", protein: "约42g",
        ingredients: [
          { name: "虾仁", amount: "150g", grams: "150g", fist: "1个手掌", protein: "36g", category: "protein" },
          { name: "全麦意面", amount: "60g", grams: "60g（干）", fist: "1个拳头", protein: "7.8g", category: "carb" },
          { name: "番茄", amount: "2个", grams: "200g", fist: "2个拳头", protein: "1.8g", category: "vegetable" },
          { name: "洋葱", amount: "1/4个", grams: "50g", fist: "—", protein: "0.7g", category: "vegetable" },
          { name: "橄榄油", amount: "1瓷勺", grams: "10g", fist: "—", protein: "0g", category: "oil" }
        ],
        steps: [
          "意面放入加盐的沸水中煮8-10分钟至熟",
          "虾仁解冻沥干，加料酒、盐腌5分钟",
          "番茄切丁，洋葱切碎",
          "热锅少油，炒洋葱至透明，加番茄炒出汁",
          "下虾仁炒至变色，将意面捞出拌入，加盐调味"
        ],
        tips: "全麦意面比普通意面膳食纤维更高，饱腹感更强。"
      },
      dinner: {
        id: "w2-mon-dinner", mealType: "晚餐", name: "鸡胸肉芹菜炒百合配玉米",
        totalTime: "20分钟", calories: "约380大卡", protein: "约38g",
        ingredients: [
          { name: "鸡胸肉", amount: "150g", grams: "150g", fist: "1个手掌", protein: "35g", category: "protein" },
          { name: "玉米", amount: "1根", grams: "200g", fist: "1个拳头", protein: "8g", category: "carb" },
          { name: "芹菜", amount: "1把", grams: "150g", fist: "1.5个拳头", protein: "1.2g", category: "vegetable" },
          { name: "鲜百合", amount: "50g", grams: "50g", fist: "半个拳头", protein: "1.5g", category: "vegetable" },
          { name: "食用油", amount: "1瓷勺", grams: "10g", fist: "—", protein: "0g", category: "oil" }
        ],
        steps: [
          "玉米上锅蒸15分钟",
          "鸡胸肉切丝，加生抽、料酒腌制10分钟",
          "芹菜切段，百合掰开洗净",
          "热锅少油炒鸡丝至变色盛出",
          "炒芹菜和百合2分钟，倒回鸡丝，加盐调味"
        ],
        tips: "百合清热润肺，芹菜高纤维，很适合晚餐搭配。"
      },
      snack: {
        id: "w2-mon-snack", mealType: "加餐（训练后）", name: "酸奶+蓝莓+蛋白粉",
        totalTime: "2分钟", calories: "约250大卡", protein: "约20g",
        ingredients: [
          { name: "无糖酸奶", amount: "150g", grams: "150g", fist: "1杯", protein: "7.5g", category: "protein" },
          { name: "蓝莓", amount: "一小把", grams: "50g", fist: "半个拳头", protein: "0.4g", category: "fruit" },
          { name: "蛋白粉", amount: "半勺", grams: "15g", fist: "—", protein: "12g", category: "protein" }
        ],
        steps: ["酸奶倒入碗中，蓝莓洗净撒上即可"],
        tips: "选无糖酸奶，蛋白质高糖分低。蓝莓可换成草莓。"
      }
    }
  },
  // ========== 周二 ==========
  {
    day: 2, dayName: "周二",
    meals: {
      breakfast: {
        id: "w2-tue-bf", mealType: "早餐", name: "全麦吐司牛油果鸡蛋配牛奶",
        totalTime: "10分钟", calories: "约430大卡", protein: "约30g",
        ingredients: [
          { name: "全麦面包", amount: "2片", grams: "70g", fist: "1个拳头", protein: "6.3g", category: "carb" },
          { name: "牛油果", amount: "1/4个", grams: "50g", fist: "—", protein: "1g", category: "fruit" },
          { name: "鸡蛋", amount: "2个", grams: "100g", fist: "1个手掌", protein: "12.6g", category: "protein" },
          { name: "牛奶", amount: "300ml", grams: "300g", fist: "1杯", protein: "9.6g", category: "protein" }
        ],
        steps: [
          "全麦面包烤至微脆",
          "牛油果取出果肉，用叉子压成泥",
          "煎一个荷包蛋（少油）",
          "面包上抹牛油果泥，盖上荷包蛋"
        ],
        tips: "牛油果富含健康脂肪，减脂期适量吃。1/4个就够了。"
      },
      lunch: {
        id: "w2-tue-lunch", mealType: "午餐", name: "瘦牛肉青椒土豆丝配米饭",
        totalTime: "25分钟", calories: "约530大卡", protein: "约46g",
        ingredients: [
          { name: "瘦牛肉", amount: "150g", grams: "150g", fist: "1个手掌", protein: "39g", category: "protein" },
          { name: "米饭", amount: "1碗", grams: "熟150g", fist: "1个拳头", protein: "3.9g", category: "carb" },
          { name: "土豆", amount: "1个", grams: "150g", fist: "1个拳头", protein: "3g", category: "carb" },
          { name: "青椒", amount: "1个", grams: "100g", fist: "1个拳头", protein: "1g", category: "vegetable" },
          { name: "食用油", amount: "1瓷勺", grams: "10g", fist: "—", protein: "0g", category: "oil" }
        ],
        steps: [
          "牛肉逆纹切薄片，加生抽、料酒、淀粉腌制10分钟",
          "土豆去皮切细丝，泡水去淀粉，青椒切丝",
          "热锅少油炒牛肉至变色盛出",
          "下土豆丝翻炒3分钟，加青椒丝继续炒2分钟",
          "倒回牛肉，加盐调味，配米饭"
        ],
        tips: "土豆丝泡水去淀粉后炒出来更脆。土豆也含碳水，米饭可减量。"
      },
      dinner: {
        id: "w2-tue-dinner", mealType: "晚餐", name: "豆腐菌菇汤配红薯",
        totalTime: "20分钟", calories: "约380大卡", protein: "约24g",
        ingredients: [
          { name: "北豆腐", amount: "200g", grams: "200g", fist: "1个手掌", protein: "16.2g", category: "protein" },
          { name: "红薯", amount: "1个", grams: "200g", fist: "1个拳头", protein: "2.2g", category: "carb" },
          { name: "混合菌菇", amount: "200g", grams: "200g", fist: "2个拳头", protein: "4g", category: "vegetable" },
          { name: "小葱", amount: "适量", grams: "—", fist: "—", protein: "0g", category: "seasoning" },
          { name: "食用油", amount: "1瓷勺", grams: "10g", fist: "—", protein: "0g", category: "oil" }
        ],
        steps: [
          "红薯上锅蒸15分钟",
          "豆腐切小块，菌菇洗净撕开",
          "锅中少油炒菌菇出香，加水烧开",
          "放入豆腐中火煮8分钟，加盐调味",
          "撒葱花出锅"
        ],
        tips: "菌菇种类多更好吃，可搭配金针菇、香菇、蟹味菇。"
      },
      snack: {
        id: "w2-tue-snack", mealType: "加餐（训练后）", name: "橙子+鸡蛋+牛奶",
        totalTime: "10分钟", calories: "约280大卡", protein: "约22g",
        ingredients: [
          { name: "橙子", amount: "1个", grams: "200g", fist: "1个拳头", protein: "1.4g", category: "fruit" },
          { name: "鸡蛋", amount: "2个", grams: "100g", fist: "1个手掌", protein: "12.6g", category: "protein" },
          { name: "牛奶", amount: "200ml", grams: "200g", fist: "1杯", protein: "6.4g", category: "protein" }
        ],
        steps: ["鸡蛋水煮7分钟", "橙子剥皮食用"],
        tips: "维生素C帮助蛋白质吸收，水果配鸡蛋是很好的组合。"
      }
    }
  },
  // ========== 周三 ==========
  {
    day: 3, dayName: "周三",
    meals: {
      breakfast: {
        id: "w2-wed-bf", mealType: "早餐", name: "玉米鸡蛋牛奶配小番茄",
        totalTime: "15分钟", calories: "约420大卡", protein: "约30g",
        ingredients: [
          { name: "玉米", amount: "半根", grams: "100g", fist: "1个拳头", protein: "4g", category: "carb" },
          { name: "鸡蛋", amount: "3个", grams: "150g", fist: "1.5个手掌", protein: "19g", category: "protein" },
          { name: "牛奶", amount: "250ml", grams: "250g", fist: "1杯", protein: "8g", category: "protein" },
          { name: "小番茄", amount: "8-10个", grams: "100g", fist: "1个拳头", protein: "0.9g", category: "fruit" }
        ],
        steps: [
          "玉米上锅蒸15分钟",
          "鸡蛋水煮7分钟",
          "小番茄洗净直接食用",
          "搭配牛奶一起"
        ],
        tips: "小番茄比大番茄维C含量更高，可以当水果直接吃。"
      },
      lunch: {
        id: "w2-wed-lunch", mealType: "午餐", name: "虾仁芦笋炒饭",
        totalTime: "15分钟", calories: "约450大卡", protein: "约40g",
        ingredients: [
          { name: "虾仁", amount: "150g", grams: "150g", fist: "1个手掌", protein: "36g", category: "protein" },
          { name: "米饭", amount: "1碗", grams: "熟150g", fist: "1个拳头", protein: "3.9g", category: "carb" },
          { name: "芦笋", amount: "5-6根", grams: "150g", fist: "1.5个拳头", protein: "2.6g", category: "vegetable" },
          { name: "胡萝卜", amount: "1/3根", grams: "50g", fist: "—", protein: "0.5g", category: "vegetable" },
          { name: "食用油", amount: "1瓷勺", grams: "10g", fist: "—", protein: "0g", category: "oil" }
        ],
        steps: [
          "虾仁解冻沥干，芦笋切段，胡萝卜切丁",
          "热锅少油炒虾仁至变色盛出",
          "下胡萝卜和芦笋翻炒2分钟",
          "加入米饭翻炒3分钟",
          "倒回虾仁，加盐和少许生抽调味"
        ],
        tips: "隔夜饭炒饭更粒粒分明。芦笋焯水后再炒颜色更绿。"
      },
      dinner: {
        id: "w2-wed-dinner", mealType: "晚餐", name: "鸡胸肉炒油菜配紫薯",
        totalTime: "20分钟", calories: "约370大卡", protein: "约38g",
        ingredients: [
          { name: "鸡胸肉", amount: "150g", grams: "150g", fist: "1个手掌", protein: "35g", category: "protein" },
          { name: "紫薯", amount: "1个", grams: "150g", fist: "1个拳头", protein: "2.3g", category: "carb" },
          { name: "油菜", amount: "1把", grams: "200g", fist: "2个拳头", protein: "3.6g", category: "vegetable" },
          { name: "蒜末", amount: "适量", grams: "—", fist: "—", protein: "0g", category: "seasoning" },
          { name: "食用油", amount: "1瓷勺", grams: "10g", fist: "—", protein: "0g", category: "oil" }
        ],
        steps: [
          "紫薯上锅蒸15分钟",
          "鸡胸肉切片，腌制10分钟",
          "油菜洗净对半切",
          "热锅少油炒鸡肉至变色盛出",
          "爆香蒜末，下油菜炒软，倒回鸡肉调味"
        ],
        tips: "油菜钙含量高，快炒保留营养，不要炒太久出水多。"
      },
      snack: {
        id: "w2-wed-snack", mealType: "加餐（训练后）", name: "香蕉+牛奶+蛋白粉",
        totalTime: "2分钟", calories: "约250大卡", protein: "约20g",
        ingredients: [
          { name: "香蕉", amount: "1根", grams: "120g", fist: "1个拳头", protein: "1.3g", category: "fruit" },
          { name: "牛奶", amount: "250ml", grams: "250g", fist: "1杯", protein: "8g", category: "protein" },
          { name: "蛋白粉", amount: "半勺", grams: "15g", fist: "—", protein: "12g", category: "protein" }
        ],
        steps: ["直接食用"],
        tips: "训练后30分钟内补充蛋白质和碳水效果最好。"
      }
    }
  },
  // ========== 周四 ==========
  {
    day: 4, dayName: "周四",
    meals: {
      breakfast: {
        id: "w2-thu-bf", mealType: "早餐", name: "酸奶燕麦杯配香蕉",
        totalTime: "5分钟（需提前冷藏）", calories: "约420大卡", protein: "约26g",
        ingredients: [
          { name: "无糖酸奶", amount: "200g", grams: "200g", fist: "1杯", protein: "10g", category: "protein" },
          { name: "燕麦片", amount: "40g", grams: "40g", fist: "1个拳头", protein: "5.2g", category: "carb" },
          { name: "香蕉", amount: "1根", grams: "120g", fist: "1个拳头", protein: "1.3g", category: "fruit" },
          { name: "鸡蛋", amount: "1个", grams: "50g", fist: "半手掌", protein: "6.3g", category: "protein" },
          { name: "蛋白粉", amount: "半勺", grams: "15g", fist: "—", protein: "12g", category: "protein" }
        ],
        steps: [
          "前一晚将燕麦片放入酸奶中拌匀",
          "盖保鲜膜冷藏一晚",
          "早晨取出，香蕉切片铺上即可"
        ],
        tips: "隔夜燕麦冷藏后口感像布丁，夏天吃很舒服。也可以现拌现吃。"
      },
      lunch: {
        id: "w2-thu-lunch", mealType: "午餐", name: "龙利鱼番茄豆腐煲配米饭",
        totalTime: "25分钟", calories: "约440大卡", protein: "约40g",
        ingredients: [
          { name: "龙利鱼/巴沙鱼", amount: "150g", grams: "150g", fist: "1个手掌", protein: "30g", category: "protein" },
          { name: "北豆腐", amount: "100g", grams: "100g", fist: "—", protein: "8.1g", category: "protein" },
          { name: "米饭", amount: "1碗", grams: "熟150g", fist: "1个拳头", protein: "3.9g", category: "carb" },
          { name: "番茄", amount: "2个", grams: "200g", fist: "2个拳头", protein: "1.8g", category: "vegetable" },
          { name: "食用油", amount: "1瓷勺", grams: "10g", fist: "—", protein: "0g", category: "oil" }
        ],
        steps: [
          "鱼切块，豆腐切小块，番茄切块",
          "热锅少油炒番茄至出汁",
          "加水烧开，放入豆腐煮5分钟",
          "放入鱼块煮3分钟，加盐调味",
          "配米饭食用"
        ],
        tips: "鱼和豆腐双蛋白搭配，蛋白质含量很高且低脂。"
      },
      dinner: {
        id: "w2-thu-dinner", mealType: "晚餐", name: "虾仁冬瓜蒸蛋配玉米",
        totalTime: "20分钟", calories: "约350大卡", protein: "约35g",
        ingredients: [
          { name: "虾仁", amount: "100g", grams: "100g", fist: "—", protein: "24g", category: "protein" },
          { name: "鸡蛋", amount: "2个", grams: "100g", fist: "1个手掌", protein: "12.6g", category: "protein" },
          { name: "玉米", amount: "半根", grams: "100g", fist: "1个拳头", protein: "4g", category: "carb" },
          { name: "冬瓜", amount: "150g", grams: "150g", fist: "1.5个拳头", protein: "0.5g", category: "vegetable" },
          { name: "葱花", amount: "适量", grams: "—", fist: "—", protein: "0g", category: "seasoning" }
        ],
        steps: [
          "玉米上锅蒸15分钟",
          "鸡蛋打散加1.5倍温水、少许盐搅匀",
          "虾仁铺蛋液上，盖上保鲜膜",
          "大火蒸8-10分钟",
          "冬瓜切片另起锅煮5分钟，撒葱花在蒸蛋上"
        ],
        tips: "蒸蛋盖保鲜膜可防止水汽滴入，口感更嫩滑。"
      },
      snack: {
        id: "w2-thu-snack", mealType: "加餐（训练后）", name: "苹果+牛奶+蛋白粉",
        totalTime: "2分钟", calories: "约250大卡", protein: "约21g",
        ingredients: [
          { name: "苹果", amount: "1个", grams: "200g", fist: "1个拳头", protein: "0.6g", category: "fruit" },
          { name: "牛奶", amount: "250ml", grams: "250g", fist: "1杯", protein: "8g", category: "protein" },
          { name: "蛋白粉", amount: "半勺", grams: "15g", fist: "—", protein: "12g", category: "protein" }
        ],
        steps: ["直接食用"],
        tips: "苹果皮含膳食纤维，洗净后连皮吃更好。"
      }
    }
  },
  // ========== 周五 ==========
  {
    day: 5, dayName: "周五",
    meals: {
      breakfast: {
        id: "w2-fri-bf", mealType: "早餐", name: "鸡蛋蔬菜饼配牛奶橙子",
        totalTime: "15分钟", calories: "约420大卡", protein: "约28g",
        ingredients: [
          { name: "鸡蛋", amount: "3个", grams: "150g", fist: "1.5个手掌", protein: "19g", category: "protein" },
          { name: "面粉", amount: "30g", grams: "30g", fist: "—", protein: "3g", category: "carb" },
          { name: "胡萝卜", amount: "1/4根", grams: "30g", fist: "—", protein: "0.3g", category: "vegetable" },
          { name: "西葫芦", amount: "1/4根", grams: "50g", fist: "—", protein: "0.4g", category: "vegetable" },
          { name: "牛奶", amount: "200ml", grams: "200g", fist: "1杯", protein: "6.4g", category: "protein" },
          { name: "橙子", amount: "1个", grams: "200g", fist: "1个拳头", protein: "1.4g", category: "fruit" }
        ],
        steps: [
          "胡萝卜、西葫芦擦丝",
          "鸡蛋打散，加入面粉和蔬菜丝拌匀，加盐",
          "平底锅少油，倒入蛋液摊成饼，两面煎至金黄",
          "配牛奶和橙子"
        ],
        tips: "蔬菜饼可以把不爱吃的蔬菜都加进去，营养全面。"
      },
      lunch: {
        id: "w2-fri-lunch", mealType: "午餐", name: "鸡胸肉炒西兰花配红薯",
        totalTime: "20分钟", calories: "约420大卡", protein: "约40g",
        ingredients: [
          { name: "鸡胸肉", amount: "150g", grams: "150g", fist: "1个手掌", protein: "35g", category: "protein" },
          { name: "红薯", amount: "1个", grams: "200g", fist: "1个拳头", protein: "2.2g", category: "carb" },
          { name: "西兰花", amount: "半棵", grams: "200g", fist: "2个拳头", protein: "5.6g", category: "vegetable" },
          { name: "蒜末", amount: "适量", grams: "—", fist: "—", protein: "0g", category: "seasoning" },
          { name: "食用油", amount: "1瓷勺", grams: "10g", fist: "—", protein: "0g", category: "oil" }
        ],
        steps: [
          "红薯蒸15分钟",
          "鸡胸肉切片腌制10分钟",
          "西兰花掰小朵焯水1分钟",
          "热锅少油炒鸡肉至变色，加蒜末和西兰花翻炒",
          "加盐调味"
        ],
        tips: "红薯代替米饭，饱腹感更强，维生素A含量更高。"
      },
      dinner: {
        id: "w2-fri-dinner", mealType: "晚餐", name: "牛肉萝卜汤配杂粮饭",
        totalTime: "30分钟", calories: "约390大卡", protein: "约35g",
        ingredients: [
          { name: "瘦牛肉", amount: "120g", grams: "120g", fist: "1个手掌", protein: "31g", category: "protein" },
          { name: "杂粮饭", amount: "1碗", grams: "熟120g", fist: "1个拳头", protein: "3g", category: "carb" },
          { name: "白萝卜", amount: "200g", grams: "200g", fist: "2个拳头", protein: "0.8g", category: "vegetable" },
          { name: "姜片、葱花", amount: "适量", grams: "—", fist: "—", protein: "0g", category: "seasoning" },
          { name: "食用油", amount: "1瓷勺", grams: "10g", fist: "—", protein: "0g", category: "oil" }
        ],
        steps: [
          "牛肉切小块，冷水下锅焯水去血沫",
          "萝卜去皮切滚刀块",
          "锅中加水，放入牛肉和姜片，大火烧开转小火炖20分钟",
          "加入萝卜继续煮10分钟至软",
          "加盐调味，撒葱花"
        ],
        tips: "白萝卜帮助消化，和牛肉一起炖汤暖胃又减脂。"
      },
      snack: {
        id: "w2-fri-snack", mealType: "加餐（训练后）", name: "酸奶+全麦面包+蛋白粉",
        totalTime: "2分钟", calories: "约250大卡", protein: "约23g",
        ingredients: [
          { name: "无糖酸奶", amount: "150g", grams: "150g", fist: "1杯", protein: "7.5g", category: "protein" },
          { name: "全麦面包", amount: "1片", grams: "35g", fist: "半个拳头", protein: "3.2g", category: "carb" },
          { name: "蛋白粉", amount: "半勺", grams: "15g", fist: "—", protein: "12g", category: "protein" }
        ],
        steps: ["面包撕小块蘸酸奶食用"],
        tips: "酸奶可以替代牛奶换换口味，益生菌对肠道好。"
      }
    }
  },
  // ========== 周六 ==========
  {
    day: 6, dayName: "周六",
    meals: {
      breakfast: {
        id: "w2-sat-bf", mealType: "早餐", name: "牛奶玉米片配水煮蛋香蕉",
        totalTime: "5分钟", calories: "约420大卡", protein: "约28g",
        ingredients: [
          { name: "牛奶", amount: "300ml", grams: "300g", fist: "1杯", protein: "9.6g", category: "protein" },
          { name: "玉米片（无糖）", amount: "40g", grams: "40g", fist: "1个拳头", protein: "3g", category: "carb" },
          { name: "鸡蛋", amount: "2个", grams: "100g", fist: "1个手掌", protein: "12.6g", category: "protein" },
          { name: "香蕉", amount: "1根", grams: "120g", fist: "1个拳头", protein: "1.3g", category: "fruit" }
        ],
        steps: [
          "玉米片倒入碗中，加牛奶",
          "鸡蛋水煮7分钟",
          "香蕉剥皮食用"
        ],
        tips: "玉米片选无糖全麦款，避免含糖麦片。看配料表选全谷物排第一的。"
      },
      lunch: {
        id: "w2-sat-lunch", mealType: "午餐", name: "虾仁炒芦笋配土豆泥",
        totalTime: "20分钟", calories: "约460大卡", protein: "约42g",
        ingredients: [
          { name: "虾仁", amount: "180g", grams: "180g", fist: "1个手掌", protein: "43g", category: "protein" },
          { name: "土豆", amount: "1个", grams: "150g", fist: "1个拳头", protein: "3g", category: "carb" },
          { name: "芦笋", amount: "6-8根", grams: "150g", fist: "1.5个拳头", protein: "2.6g", category: "vegetable" },
          { name: "蒜末", amount: "适量", grams: "—", fist: "—", protein: "0g", category: "seasoning" },
          { name: "食用油", amount: "1瓷勺", grams: "10g", fist: "—", protein: "0g", category: "oil" }
        ],
        steps: [
          "土豆去皮切块蒸15分钟，取出压成泥，加少许盐和牛奶拌匀",
          "芦笋切段，焯水1分钟",
          "虾仁加料酒腌5分钟",
          "热锅少油爆香蒜末，下虾仁炒至变色",
          "加入芦笋翻炒1分钟，加盐调味，配土豆泥"
        ],
        tips: "土豆泥加一点牛奶更顺滑，不加黄油也很香。"
      },
      dinner: {
        id: "w2-sat-dinner", mealType: "晚餐", name: "鸡胸肉木耳炒山药",
        totalTime: "20分钟", calories: "约360大卡", protein: "约36g",
        ingredients: [
          { name: "鸡胸肉", amount: "150g", grams: "150g", fist: "1个手掌", protein: "35g", category: "protein" },
          { name: "山药", amount: "150g", grams: "150g", fist: "1个拳头", protein: "2g", category: "carb" },
          { name: "水发木耳", amount: "100g", grams: "100g", fist: "1个拳头", protein: "1.5g", category: "vegetable" },
          { name: "青椒", amount: "1个", grams: "80g", fist: "1个拳头", protein: "0.8g", category: "vegetable" },
          { name: "食用油", amount: "1瓷勺", grams: "10g", fist: "—", protein: "0g", category: "oil" }
        ],
        steps: [
          "鸡胸肉切片腌制10分钟",
          "山药去皮切片（戴手套防过敏），泡水",
          "木耳撕小朵，青椒切块",
          "热锅少油炒鸡肉至变色盛出",
          "炒山药和木耳3分钟，加青椒，倒回鸡肉调味"
        ],
        tips: "山药去皮一定要戴手套，黏液会引起皮肤瘙痒。山药健脾胃。"
      },
      snack: {
        id: "w2-sat-snack", mealType: "加餐（训练后）", name: "小番茄+鸡蛋+牛奶",
        totalTime: "10分钟", calories: "约220大卡", protein: "约15g",
        ingredients: [
          { name: "小番茄", amount: "10个", grams: "120g", fist: "1个拳头", protein: "1.1g", category: "fruit" },
          { name: "鸡蛋", amount: "1个", grams: "50g", fist: "半手掌", protein: "6.3g", category: "protein" },
          { name: "牛奶", amount: "200ml", grams: "200g", fist: "1杯", protein: "6.4g", category: "protein" }
        ],
        steps: ["鸡蛋水煮7分钟", "小番茄洗净食用"],
        tips: "周末加餐可以选择小番茄，低糖高维C。"
      }
    }
  },
  // ========== 周日 ==========
  {
    day: 7, dayName: "周日",
    meals: {
      breakfast: {
        id: "w2-sun-bf", mealType: "早餐", name: "紫薯酸奶杯配全麦面包",
        totalTime: "12分钟", calories: "约400大卡", protein: "约27g",
        ingredients: [
          { name: "紫薯", amount: "1个", grams: "100g", fist: "1个拳头", protein: "1.5g", category: "carb" },
          { name: "无糖酸奶", amount: "200g", grams: "200g", fist: "1杯", protein: "10g", category: "protein" },
          { name: "全麦面包", amount: "1片", grams: "35g", fist: "半个拳头", protein: "3.2g", category: "carb" },
          { name: "鸡蛋", amount: "2个", grams: "100g", fist: "1个手掌", protein: "12.6g", category: "protein" }
        ],
        steps: [
          "紫薯蒸10分钟至软烂",
          "紫薯压成泥铺碗底",
          "倒入酸奶",
          "面包烤一下，鸡蛋水煮7分钟"
        ],
        tips: "紫薯和酸奶的颜色搭配很漂亮，拍照也好看。"
      },
      lunch: {
        id: "w2-sun-lunch", mealType: "午餐", name: "鱼块烧豆腐配米饭",
        totalTime: "25分钟", calories: "约440大卡", protein: "约42g",
        ingredients: [
          { name: "龙利鱼/巴沙鱼", amount: "150g", grams: "150g", fist: "1个手掌", protein: "30g", category: "protein" },
          { name: "北豆腐", amount: "100g", grams: "100g", fist: "—", protein: "8.1g", category: "protein" },
          { name: "米饭", amount: "1碗", grams: "熟150g", fist: "1个拳头", protein: "3.9g", category: "carb" },
          { name: "香菇", amount: "5-6朵", grams: "100g", fist: "1个拳头", protein: "2.2g", category: "vegetable" },
          { name: "食用油", amount: "1瓷勺", grams: "10g", fist: "—", protein: "0g", category: "oil" }
        ],
        steps: [
          "鱼切块用盐腌5分钟，豆腐切块",
          "香菇切片",
          "热锅少油煎鱼块至两面金黄",
          "加豆腐和香菇，加水没过食材，大火烧开转小火煮10分钟",
          "加盐、少许生抽调味，配米饭"
        ],
        tips: "鱼和豆腐是减脂黄金搭档，双倍蛋白，脂肪很低。"
      },
      dinner: {
        id: "w2-sun-dinner", mealType: "晚餐", name: "虾仁西葫芦炒蛋配玉米",
        totalTime: "15分钟", calories: "约350大卡", protein: "约35g",
        ingredients: [
          { name: "虾仁", amount: "100g", grams: "100g", fist: "—", protein: "24g", category: "protein" },
          { name: "鸡蛋", amount: "2个", grams: "100g", fist: "1个手掌", protein: "12.6g", category: "protein" },
          { name: "玉米", amount: "半根", grams: "100g", fist: "1个拳头", protein: "4g", category: "carb" },
          { name: "西葫芦", amount: "1/2根", grams: "150g", fist: "1.5个拳头", protein: "1.2g", category: "vegetable" },
          { name: "食用油", amount: "1瓷勺", grams: "10g", fist: "—", protein: "0g", category: "oil" }
        ],
        steps: [
          "玉米蒸15分钟",
          "虾仁解冻沥干，西葫芦切片",
          "鸡蛋打散",
          "热锅少油炒蛋液至半凝固盛出",
          "下虾仁和西葫芦翻炒，倒回鸡蛋，加盐调味"
        ],
        tips: "西葫芦水分大，大火快炒保持口感。虾仁炒蛋是经典组合。"
      },
      snack: {
        id: "w2-sun-snack", mealType: "加餐（休息日）", name: "香蕉+牛奶+蛋白粉",
        totalTime: "2分钟", calories: "约250大卡", protein: "约20g",
        ingredients: [
          { name: "香蕉", amount: "1根", grams: "120g", fist: "1个拳头", protein: "1.3g", category: "fruit" },
          { name: "牛奶", amount: "250ml", grams: "250g", fist: "1杯", protein: "8g", category: "protein" },
          { name: "蛋白粉", amount: "半勺", grams: "15g", fist: "—", protein: "12g", category: "protein" }
        ],
        steps: ["直接食用"],
        tips: "休息日饿了可以加餐，不饿可以省略。"
      }
    }
  }
];
