// 第4周食谱数据（7天）
// 基于"1蛋白+1主食+2蔬菜"框架
// 适合女性减脂期：每日约1400-1600大卡，蛋白质120g+

export const week4Menus = [
  // ========== 周一 ==========
  {
    day: 1, dayName: "周一",
    meals: {
      breakfast: {
        id: "w4-mon-bf", mealType: "早餐", name: "鸡蛋牛油果全麦吐司配牛奶",
        totalTime: "10分钟", calories: "约430大卡", protein: "约30g",
        ingredients: [
          { name: "全麦面包", amount: "2片", grams: "70g", fist: "1个拳头", protein: "6.3g", category: "carb" },
          { name: "鸡蛋", amount: "2个", grams: "100g", fist: "1个手掌", protein: "12.6g", category: "protein" },
          { name: "牛油果", amount: "1/4个", grams: "50g", fist: "—", protein: "1g", category: "fruit" },
          { name: "牛奶", amount: "300ml", grams: "300g", fist: "1杯", protein: "9.6g", category: "protein" }
        ],
        steps: [
          "全麦面包烤至微脆",
          "牛油果压成泥抹在面包上",
          "煎一个荷包蛋（少油）盖在上面",
          "配牛奶"
        ],
        tips: "牛油果选捏起来微软的刚好熟。太硬可以和香蕉放一起催熟。"
      },
      lunch: {
        id: "w4-mon-lunch", mealType: "午餐", name: "虾仁荷兰豆炒饭配小番茄",
        totalTime: "15分钟", calories: "约450大卡", protein: "约42g",
        ingredients: [
          { name: "虾仁", amount: "150g", grams: "150g", fist: "1个手掌", protein: "36g", category: "protein" },
          { name: "米饭", amount: "1碗", grams: "熟150g", fist: "1个拳头", protein: "3.9g", category: "carb" },
          { name: "荷兰豆", amount: "100g", grams: "100g", fist: "1个拳头", protein: "3g", category: "vegetable" },
          { name: "小番茄", amount: "10个", grams: "100g", fist: "1个拳头", protein: "0.9g", category: "vegetable" },
          { name: "食用油", amount: "1瓷勺", grams: "10g", fist: "—", protein: "0g", category: "oil" }
        ],
        steps: [
          "虾仁解冻沥干，荷兰豆去筋",
          "小番茄对半切",
          "热锅少油炒虾仁至变色盛出",
          "下荷兰豆翻炒1分钟，加米饭翻炒",
          "倒回虾仁和小番茄，加盐调味"
        ],
        tips: "荷兰豆脆甜爽口，快炒保持口感。小番茄最后放保留维C。"
      },
      dinner: {
        id: "w4-mon-dinner", mealType: "晚餐", name: "鸡胸肉蒸南瓜配菠菜",
        totalTime: "25分钟", calories: "约380大卡", protein: "约38g",
        ingredients: [
          { name: "鸡胸肉", amount: "150g", grams: "150g", fist: "1个手掌", protein: "35g", category: "protein" },
          { name: "南瓜", amount: "200g", grams: "200g", fist: "1个拳头", protein: "1.6g", category: "carb" },
          { name: "菠菜", amount: "1把", grams: "200g", fist: "2个拳头", protein: "5.2g", category: "vegetable" },
          { name: "蒜末、生抽", amount: "适量", grams: "—", fist: "—", protein: "0g", category: "seasoning" },
          { name: "食用油", amount: "1瓷勺", grams: "10g", fist: "—", protein: "0g", category: "oil" }
        ],
        steps: [
          "南瓜去皮切块蒸15分钟",
          "鸡胸肉切片腌制10分钟",
          "菠菜焯水30秒捞出",
          "热锅少油炒鸡肉至变色",
          "菠菜加蒜末、生抽拌匀，配南瓜和鸡肉"
        ],
        tips: "南瓜β-胡萝卜素含量高，蒸熟直接吃就很甜。比红薯热量更低。"
      },
      snack: {
        id: "w4-mon-snack", mealType: "加餐（休息日）", name: "香蕉+酸奶+蛋白粉",
        totalTime: "2分钟", calories: "约260大卡", protein: "约21g",
        ingredients: [
          { name: "香蕉", amount: "1根", grams: "120g", fist: "1个拳头", protein: "1.3g", category: "fruit" },
          { name: "无糖酸奶", amount: "150g", grams: "150g", fist: "1杯", protein: "7.5g", category: "protein" },
          { name: "蛋白粉", amount: "半勺", grams: "15g", fist: "—", protein: "12g", category: "protein" }
        ],
        steps: ["香蕉切片拌入酸奶"],
        tips: "香蕉和酸奶搅拌后口感像冰淇淋，减脂期甜品替代。"
      }
    }
  },
  // ========== 周二 ==========
  {
    day: 2, dayName: "周二",
    meals: {
      breakfast: {
        id: "w4-tue-bf", mealType: "早餐", name: "紫薯牛奶配全麦面包水煮蛋",
        totalTime: "12分钟", calories: "约420大卡", protein: "约28g",
        ingredients: [
          { name: "紫薯", amount: "1个", grams: "100g", fist: "1个拳头", protein: "1.5g", category: "carb" },
          { name: "牛奶", amount: "300ml", grams: "300g", fist: "1杯", protein: "9.6g", category: "protein" },
          { name: "鸡蛋", amount: "2个", grams: "100g", fist: "1个手掌", protein: "12.6g", category: "protein" },
          { name: "全麦面包", amount: "1片", grams: "35g", fist: "半个拳头", protein: "3.2g", category: "carb" }
        ],
        steps: [
          "紫薯蒸10分钟至软烂",
          "牛奶加热",
          "鸡蛋水煮7分钟",
          "紫薯配热牛奶吃，面包烤一下"
        ],
        tips: "紫薯和牛奶一起吃，花青素和钙同时补充。紫薯蒸比煮不流失营养。"
      },
      lunch: {
        id: "w4-tue-lunch", mealType: "午餐", name: "瘦牛肉芹菜炒配杂粮饭",
        totalTime: "25分钟", calories: "约530大卡", protein: "约46g",
        ingredients: [
          { name: "瘦牛肉", amount: "150g", grams: "150g", fist: "1个手掌", protein: "39g", category: "protein" },
          { name: "杂粮饭", amount: "1碗", grams: "熟150g", fist: "1个拳头", protein: "3.5g", category: "carb" },
          { name: "芹菜", amount: "1把", grams: "150g", fist: "1.5个拳头", protein: "1.2g", category: "vegetable" },
          { name: "胡萝卜", amount: "1/3根", grams: "50g", fist: "—", protein: "0.5g", category: "vegetable" },
          { name: "食用油", amount: "1瓷勺", grams: "10g", fist: "—", protein: "0g", category: "oil" }
        ],
        steps: [
          "牛肉逆纹切薄片，加生抽、料酒、淀粉腌制10分钟",
          "芹菜切段，胡萝卜切丝",
          "热锅少油炒牛肉至变色盛出",
          "下芹菜和胡萝卜翻炒2分钟",
          "倒回牛肉，加盐调味，配杂粮饭"
        ],
        tips: "芹菜高纤维帮助消化，和牛肉搭配经典。芹菜叶营养更高可以一起炒。"
      },
      dinner: {
        id: "w4-tue-dinner", mealType: "晚餐", name: "豆腐鱼头汤配玉米",
        totalTime: "30分钟", calories: "约380大卡", protein: "约35g",
        ingredients: [
          { name: "鱼头/鱼块", amount: "150g", grams: "150g", fist: "1个手掌", protein: "28g", category: "protein" },
          { name: "北豆腐", amount: "100g", grams: "100g", fist: "—", protein: "8.1g", category: "protein" },
          { name: "玉米", amount: "半根", grams: "100g", fist: "1个拳头", protein: "4g", category: "carb" },
          { name: "白菜", amount: "3叶", grams: "150g", fist: "1.5个拳头", protein: "2g", category: "vegetable" },
          { name: "食用油", amount: "1瓷勺", grams: "10g", fist: "—", protein: "0g", category: "oil" }
        ],
        steps: [
          "玉米蒸15分钟",
          "鱼块煎至两面金黄",
          "加开水大火煮5分钟至汤变白",
          "加豆腐和白菜煮5分钟",
          "加盐调味"
        ],
        tips: "鱼汤变白的秘诀是煎鱼后加开水大火煮。豆腐和鱼搭配钙吸收率更高。"
      },
      snack: {
        id: "w4-tue-snack", mealType: "加餐（休息日）", name: "桃子+鸡蛋+牛奶",
        totalTime: "10分钟", calories: "约230大卡", protein: "约16g",
        ingredients: [
          { name: "桃子", amount: "1个", grams: "150g", fist: "1个拳头", protein: "1g", category: "fruit" },
          { name: "鸡蛋", amount: "1个", grams: "50g", fist: "半手掌", protein: "6.3g", category: "protein" },
          { name: "牛奶", amount: "200ml", grams: "200g", fist: "1杯", protein: "6.4g", category: "protein" }
        ],
        steps: ["鸡蛋水煮7分钟", "桃子洗净去核切块食用"],
        tips: "桃子富含维生素A和膳食纤维，夏天吃补水又养颜。"
      }
    }
  },
  // ========== 周三 ==========
  {
    day: 3, dayName: "周三",
    meals: {
      breakfast: {
        id: "w4-wed-bf", mealType: "早餐", name: "鸡蛋蔬菜炒面配牛奶",
        totalTime: "12分钟", calories: "约440大卡", protein: "约30g",
        ingredients: [
          { name: "全麦面条", amount: "50g", grams: "50g（干）", fist: "1个拳头", protein: "5.5g", category: "carb" },
          { name: "鸡蛋", amount: "2个", grams: "100g", fist: "1个手掌", protein: "12.6g", category: "protein" },
          { name: "小白菜", amount: "100g", grams: "100g", fist: "1个拳头", protein: "1.5g", category: "vegetable" },
          { name: "胡萝卜", amount: "1/4根", grams: "30g", fist: "—", protein: "0.3g", category: "vegetable" },
          { name: "牛奶", amount: "300ml", grams: "300g", fist: "1杯", protein: "9.6g", category: "protein" }
        ],
        steps: [
          "面条煮至8分熟捞出",
          "鸡蛋打散，小白菜切段，胡萝卜切丝",
          "热锅少油炒蛋液至半凝固盛出",
          "下蔬菜翻炒，加面条和蛋，加少许生抽炒匀"
        ],
        tips: "全麦面条比普通面条纤维高。早上吃热面条暖胃又饱腹。"
      },
      lunch: {
        id: "w4-wed-lunch", mealType: "午餐", name: "鸡胸肉炒西葫芦配红薯",
        totalTime: "20分钟", calories: "约420大卡", protein: "约40g",
        ingredients: [
          { name: "鸡胸肉", amount: "150g", grams: "150g", fist: "1个手掌", protein: "35g", category: "protein" },
          { name: "红薯", amount: "1个", grams: "200g", fist: "1个拳头", protein: "2.2g", category: "carb" },
          { name: "西葫芦", amount: "1根", grams: "200g", fist: "2个拳头", protein: "1.6g", category: "vegetable" },
          { name: "蒜末", amount: "适量", grams: "—", fist: "—", protein: "0g", category: "seasoning" },
          { name: "食用油", amount: "1瓷勺", grams: "10g", fist: "—", protein: "0g", category: "oil" }
        ],
        steps: [
          "红薯蒸15分钟",
          "鸡胸肉切丁腌制10分钟",
          "西葫芦切片",
          "热锅少油炒鸡肉至变色盛出",
          "爆香蒜末，下西葫芦炒1分钟，倒回鸡肉调味"
        ],
        tips: "西葫芦水分大热量低，减脂期的好蔬菜。大火快炒不出太多水。"
      },
      dinner: {
        id: "w4-wed-dinner", mealType: "晚餐", name: "虾仁豆腐蛋花汤配南瓜",
        totalTime: "20分钟", calories: "约350大卡", protein: "约35g",
        ingredients: [
          { name: "虾仁", amount: "100g", grams: "100g", fist: "—", protein: "24g", category: "protein" },
          { name: "嫩豆腐", amount: "100g", grams: "100g", fist: "—", protein: "5g", category: "protein" },
          { name: "南瓜", amount: "150g", grams: "150g", fist: "1个拳头", protein: "1.2g", category: "carb" },
          { name: "鸡蛋", amount: "1个", grams: "50g", fist: "半手掌", protein: "6.3g", category: "protein" },
          { name: "葱花、盐", amount: "适量", grams: "—", fist: "—", protein: "0g", category: "seasoning" }
        ],
        steps: [
          "南瓜蒸15分钟",
          "豆腐切小块，虾仁解冻",
          "锅中加水烧开，放豆腐煮3分钟",
          "下虾仁煮2分钟，淋入蛋液",
          "加盐调味，撒葱花"
        ],
        tips: "蛋花要在汤沸腾时淋，边淋边搅，形成漂亮的蛋花丝。"
      },
      snack: {
        id: "w4-wed-snack", mealType: "加餐（训练后）", name: "苹果+牛奶+蛋白粉",
        totalTime: "2分钟", calories: "约240大卡", protein: "约21g",
        ingredients: [
          { name: "苹果", amount: "1个", grams: "200g", fist: "1个拳头", protein: "0.6g", category: "fruit" },
          { name: "牛奶", amount: "250ml", grams: "250g", fist: "1杯", protein: "8g", category: "protein" },
          { name: "蛋白粉", amount: "半勺", grams: "15g", fist: "—", protein: "12g", category: "protein" }
        ],
        steps: ["直接食用"],
        tips: "训练后苹果和牛奶快速补充能量和蛋白质。"
      }
    }
  },
  // ========== 周四 ==========
  {
    day: 4, dayName: "周四",
    meals: {
      breakfast: {
        id: "w4-thu-bf", mealType: "早餐", name: "牛奶燕麦紫薯粥配水煮蛋",
        totalTime: "10分钟", calories: "约430大卡", protein: "约30g",
        ingredients: [
          { name: "牛奶", amount: "300ml", grams: "300g", fist: "1杯", protein: "9.6g", category: "protein" },
          { name: "燕麦片", amount: "40g", grams: "40g", fist: "1个拳头", protein: "5.2g", category: "carb" },
          { name: "紫薯", amount: "1个", grams: "80g", fist: "—", protein: "1.2g", category: "carb" },
          { name: "鸡蛋", amount: "2个", grams: "100g", fist: "1个手掌", protein: "12.6g", category: "protein" }
        ],
        steps: [
          "紫薯蒸10分钟，压成泥",
          "牛奶加热，加燕麦煮3分钟",
          "加入紫薯泥搅匀",
          "鸡蛋水煮7分钟"
        ],
        tips: "紫薯燕麦牛奶粥颜色好看营养全面，蛋白质、碳水、花青素都有了。"
      },
      lunch: {
        id: "w4-thu-lunch", mealType: "午餐", name: "虾仁炒西兰花意面",
        totalTime: "20分钟", calories: "约450大卡", protein: "约44g",
        ingredients: [
          { name: "虾仁", amount: "150g", grams: "150g", fist: "1个手掌", protein: "36g", category: "protein" },
          { name: "全麦意面", amount: "60g", grams: "60g（干）", fist: "1个拳头", protein: "7.8g", category: "carb" },
          { name: "西兰花", amount: "半棵", grams: "150g", fist: "1.5个拳头", protein: "4.2g", category: "vegetable" },
          { name: "蒜末", amount: "适量", grams: "—", fist: "—", protein: "0g", category: "seasoning" },
          { name: "橄榄油", amount: "1瓷勺", grams: "10g", fist: "—", protein: "0g", category: "oil" }
        ],
        steps: [
          "意面放加盐沸水中煮8-10分钟",
          "西兰花掰小朵焯水1分钟",
          "虾仁解冻沥干",
          "热锅少油爆香蒜末，下虾仁炒至变色",
          "加西兰花翻炒，捞出意面拌入，加盐调味"
        ],
        tips: "虾仁西兰花意面是减脂餐的经典，高蛋白高纤维低脂肪。"
      },
      dinner: {
        id: "w4-thu-dinner", mealType: "晚餐", name: "鸡胸肉番茄白菜炖粉条",
        totalTime: "25分钟", calories: "约370大卡", protein: "约38g",
        ingredients: [
          { name: "鸡胸肉", amount: "150g", grams: "150g", fist: "1个手掌", protein: "35g", category: "protein" },
          { name: "红薯粉丝", amount: "30g", grams: "30g（干）", fist: "1个拳头", protein: "0.3g", category: "carb" },
          { name: "白菜", amount: "4叶", grams: "200g", fist: "2个拳头", protein: "2.6g", category: "vegetable" },
          { name: "番茄", amount: "1个", grams: "100g", fist: "1个拳头", protein: "0.9g", category: "vegetable" },
          { name: "食用油", amount: "1瓷勺", grams: "10g", fist: "—", protein: "0g", category: "oil" }
        ],
        steps: [
          "鸡胸肉切小块，焯水去血沫",
          "白菜切段，番茄切块，粉丝泡软",
          "热锅少油炒番茄出汁",
          "加鸡肉和白菜翻炒，加水烧开",
          "放粉丝煮5分钟，加盐调味"
        ],
        tips: "白菜炖粉条是家常菜，加了番茄和鸡肉更营养，减脂也能吃得满足。"
      },
      snack: {
        id: "w4-thu-snack", mealType: "加餐（休息日）", name: "香蕉+鸡蛋+牛奶",
        totalTime: "10分钟", calories: "约230大卡", protein: "约16g",
        ingredients: [
          { name: "香蕉", amount: "1根", grams: "120g", fist: "1个拳头", protein: "1.3g", category: "fruit" },
          { name: "鸡蛋", amount: "1个", grams: "50g", fist: "半手掌", protein: "6.3g", category: "protein" },
          { name: "牛奶", amount: "200ml", grams: "200g", fist: "1杯", protein: "6.4g", category: "protein" }
        ],
        steps: ["鸡蛋水煮7分钟", "香蕉直接食用"],
        tips: "香蕉提供快碳补充训练消耗，鸡蛋补充蛋白质。"
      }
    }
  },
  // ========== 周五 ==========
  {
    day: 5, dayName: "周五",
    meals: {
      breakfast: {
        id: "w4-fri-bf", mealType: "早餐", name: "全麦面包煎蛋配牛奶猕猴桃",
        totalTime: "10分钟", calories: "约440大卡", protein: "约31g",
        ingredients: [
          { name: "全麦面包", amount: "2片", grams: "70g", fist: "1个拳头", protein: "6.3g", category: "carb" },
          { name: "鸡蛋", amount: "2个", grams: "100g", fist: "1个手掌", protein: "12.6g", category: "protein" },
          { name: "牛奶", amount: "300ml", grams: "300g", fist: "1杯", protein: "9.6g", category: "protein" },
          { name: "猕猴桃", amount: "1个", grams: "80g", fist: "—", protein: "0.8g", category: "fruit" },
          { name: "蛋白粉", amount: "半勺", grams: "15g", fist: "—", protein: "12g", category: "protein" }
        ],
        steps: [
          "煎两个荷包蛋（少油）",
          "全麦面包烤一下",
          "鸡蛋夹入面包",
          "猕猴桃去皮切片，配牛奶"
        ],
        tips: "猕猴桃不要和牛奶一起煮，蛋白质遇果酸会凝结，分开吃即可。"
      },
      lunch: {
        id: "w4-fri-lunch", mealType: "午餐", name: "龙利鱼烧豆腐配米饭",
        totalTime: "25分钟", calories: "约450大卡", protein: "约42g",
        ingredients: [
          { name: "龙利鱼/巴沙鱼", amount: "150g", grams: "150g", fist: "1个手掌", protein: "30g", category: "protein" },
          { name: "北豆腐", amount: "100g", grams: "100g", fist: "—", protein: "8.1g", category: "protein" },
          { name: "米饭", amount: "1碗", grams: "熟150g", fist: "1个拳头", protein: "3.9g", category: "carb" },
          { name: "香菇", amount: "4朵", grams: "80g", fist: "1个拳头", protein: "1.8g", category: "vegetable" },
          { name: "食用油", amount: "1瓷勺", grams: "10g", fist: "—", protein: "0g", category: "oil" }
        ],
        steps: [
          "鱼切块，豆腐切块，香菇切片",
          "热锅少油煎鱼块至两面金黄",
          "加豆腐和香菇，加水没过食材",
          "大火烧开转小火煮8分钟",
          "加盐和少许生抽调味，配米饭"
        ],
        tips: "鱼和豆腐双重蛋白，香菇增鲜，炖出来不用加味精就很鲜。"
      },
      dinner: {
        id: "w4-fri-dinner", mealType: "晚餐", name: "鸡胸肉炒油菜配土豆",
        totalTime: "20分钟", calories: "约380大卡", protein: "约38g",
        ingredients: [
          { name: "鸡胸肉", amount: "150g", grams: "150g", fist: "1个手掌", protein: "35g", category: "protein" },
          { name: "土豆", amount: "1个", grams: "120g", fist: "1个拳头", protein: "2.4g", category: "carb" },
          { name: "油菜", amount: "1把", grams: "200g", fist: "2个拳头", protein: "3.6g", category: "vegetable" },
          { name: "蒜末", amount: "适量", grams: "—", fist: "—", protein: "0g", category: "seasoning" },
          { name: "食用油", amount: "1瓷勺", grams: "10g", fist: "—", protein: "0g", category: "oil" }
        ],
        steps: [
          "土豆去皮切小块蒸12分钟",
          "鸡胸肉切片腌制10分钟",
          "油菜洗净对半切",
          "热锅少油炒鸡肉至变色盛出",
          "爆香蒜末，下油菜炒软，倒回鸡肉，配土豆"
        ],
        tips: "油菜快炒保留维C和钙。土豆蒸代替米饭，饱腹感更强。"
      },
      snack: {
        id: "w4-fri-snack", mealType: "加餐（训练后）", name: "酸奶+苹果+蛋白粉",
        totalTime: "2分钟", calories: "约240大卡", protein: "约20g",
        ingredients: [
          { name: "无糖酸奶", amount: "150g", grams: "150g", fist: "1杯", protein: "7.5g", category: "protein" },
          { name: "苹果", amount: "1个", grams: "200g", fist: "1个拳头", protein: "0.6g", category: "fruit" },
          { name: "蛋白粉", amount: "半勺", grams: "15g", fist: "—", protein: "12g", category: "protein" }
        ],
        steps: ["苹果切丁拌入酸奶"],
        tips: "苹果和酸奶搭配，酸甜可口，是减脂期最好的甜品替代。"
      }
    }
  },
  // ========== 周六 ==========
  {
    day: 6, dayName: "周六",
    meals: {
      breakfast: {
        id: "w4-sat-bf", mealType: "早餐", name: "玉米鸡蛋羹配牛奶蓝莓",
        totalTime: "15分钟", calories: "约420大卡", protein: "约30g",
        ingredients: [
          { name: "玉米粒", amount: "80g", grams: "80g", fist: "—", protein: "3.2g", category: "carb" },
          { name: "鸡蛋", amount: "3个", grams: "150g", fist: "1.5个手掌", protein: "19g", category: "protein" },
          { name: "牛奶", amount: "300ml", grams: "300g", fist: "1杯", protein: "9.6g", category: "protein" },
          { name: "蓝莓", amount: "一小把", grams: "50g", fist: "半个拳头", protein: "0.4g", category: "fruit" }
        ],
        steps: [
          "玉米粒加水打成浆（或用玉米面加水调匀）",
          "鸡蛋打散，加入玉米浆中搅匀",
          "上锅大火蒸8分钟",
          "配牛奶和蓝莓"
        ],
        tips: "玉米鸡蛋羹口感嫩滑，颜色金黄，周末做很有仪式感。"
      },
      lunch: {
        id: "w4-sat-lunch", mealType: "午餐", name: "瘦牛肉炒洋葱彩椒配米饭",
        totalTime: "25分钟", calories: "约530大卡", protein: "约46g",
        ingredients: [
          { name: "瘦牛肉", amount: "150g", grams: "150g", fist: "1个手掌", protein: "39g", category: "protein" },
          { name: "米饭", amount: "1碗", grams: "熟150g", fist: "1个拳头", protein: "3.9g", category: "carb" },
          { name: "洋葱", amount: "1/2个", grams: "100g", fist: "1个拳头", protein: "1.4g", category: "vegetable" },
          { name: "红黄彩椒", amount: "各半个", grams: "100g", fist: "1个拳头", protein: "1g", category: "vegetable" },
          { name: "食用油", amount: "1瓷勺", grams: "10g", fist: "—", protein: "0g", category: "oil" }
        ],
        steps: [
          "牛肉逆纹切薄片，加生抽、料酒、淀粉腌制10分钟",
          "洋葱切条，彩椒切条",
          "热锅少油炒牛肉至变色盛出",
          "下洋葱炒出香气，加彩椒翻炒",
          "倒回牛肉，加盐调味，配米饭"
        ],
        tips: "牛肉大火快炒保持嫩度。洋葱炒出甜味后整道菜更香。"
      },
      dinner: {
        id: "w4-sat-dinner", mealType: "晚餐", name: "三文鱼蒸蛋配蒸蔬菜",
        totalTime: "20分钟", calories: "约400大卡", protein: "约34g",
        ingredients: [
          { name: "三文鱼", amount: "100g", grams: "100g", fist: "—", protein: "22g", category: "protein" },
          { name: "鸡蛋", amount: "2个", grams: "100g", fist: "1个手掌", protein: "12.6g", category: "protein" },
          { name: "西兰花", amount: "半棵", grams: "150g", fist: "1.5个拳头", protein: "4.2g", category: "vegetable" },
          { name: "胡萝卜", amount: "1/2根", grams: "80g", fist: "—", protein: "0.8g", category: "vegetable" },
          { name: "葱花、盐", amount: "适量", grams: "—", fist: "—", protein: "0g", category: "seasoning" }
        ],
        steps: [
          "三文鱼切小块，鸡蛋打散加1.5倍温水",
          "三文鱼铺碗底，倒入蛋液，盖保鲜膜蒸8分钟",
          "西兰花和胡萝卜另起锅蒸5分钟",
          "蒸蛋撒葱花，蔬菜撒少许盐"
        ],
        tips: "三文鱼蒸蛋鲜美嫩滑，三文鱼的油脂渗入蛋液非常香。"
      },
      snack: {
        id: "w4-sat-snack", mealType: "加餐（休息日）", name: "小番茄+牛奶+蛋白粉",
        totalTime: "2分钟", calories: "约230大卡", protein: "约21g",
        ingredients: [
          { name: "小番茄", amount: "12个", grams: "150g", fist: "1个拳头", protein: "1.4g", category: "fruit" },
          { name: "牛奶", amount: "250ml", grams: "250g", fist: "1杯", protein: "8g", category: "protein" },
          { name: "蛋白粉", amount: "半勺", grams: "15g", fist: "—", protein: "12g", category: "protein" }
        ],
        steps: ["小番茄洗净配牛奶食用"],
        tips: "小番茄糖分低维C高，是减脂期最推荐的水果之一。"
      }
    }
  },
  // ========== 周日 ==========
  {
    day: 7, dayName: "周日",
    meals: {
      breakfast: {
        id: "w4-sun-bf", mealType: "早餐", name: "水煮蛋全麦馒头配牛奶葡萄",
        totalTime: "12分钟", calories: "约430大卡", protein: "约30g",
        ingredients: [
          { name: "全麦馒头", amount: "1个", grams: "80g", fist: "1个拳头", protein: "5g", category: "carb" },
          { name: "鸡蛋", amount: "3个", grams: "150g", fist: "1.5个手掌", protein: "19g", category: "protein" },
          { name: "牛奶", amount: "250ml", grams: "250g", fist: "1杯", protein: "8g", category: "protein" },
          { name: "葡萄", amount: "一小串", grams: "150g", fist: "1个拳头", protein: "0.5g", category: "fruit" }
        ],
        steps: [
          "全麦馒头蒸热",
          "鸡蛋水煮7分钟",
          "鸡蛋剥壳夹入馒头",
          "配牛奶和葡萄"
        ],
        tips: "全麦馒头可以一次多做几个冷冻，吃的时候蒸10分钟就好，很方便。"
      },
      lunch: {
        id: "w4-sun-lunch", mealType: "午餐", name: "鸡胸肉炒番茄木耳配米饭",
        totalTime: "20分钟", calories: "约440大卡", protein: "约42g",
        ingredients: [
          { name: "鸡胸肉", amount: "150g", grams: "150g", fist: "1个手掌", protein: "35g", category: "protein" },
          { name: "米饭", amount: "1碗", grams: "熟150g", fist: "1个拳头", protein: "3.9g", category: "carb" },
          { name: "番茄", amount: "2个", grams: "200g", fist: "2个拳头", protein: "1.8g", category: "vegetable" },
          { name: "水发木耳", amount: "100g", grams: "100g", fist: "1个拳头", protein: "1.5g", category: "vegetable" },
          { name: "食用油", amount: "1瓷勺", grams: "10g", fist: "—", protein: "0g", category: "oil" }
        ],
        steps: [
          "鸡胸肉切丁腌制10分钟",
          "番茄切块，木耳撕小朵",
          "热锅少油炒鸡肉至变色盛出",
          "炒番茄出汁，加木耳翻炒",
          "倒回鸡肉，加盐调味，配米饭"
        ],
        tips: "番茄炒出汁再放鸡肉，味道更入味。木耳增加口感和纤维。"
      },
      dinner: {
        id: "w4-sun-dinner", mealType: "晚餐", name: "虾仁冬瓜蒸豆腐配红薯",
        totalTime: "20分钟", calories: "约360大卡", protein: "约36g",
        ingredients: [
          { name: "虾仁", amount: "120g", grams: "120g", fist: "—", protein: "29g", category: "protein" },
          { name: "嫩豆腐", amount: "150g", grams: "150g", fist: "1个手掌", protein: "7.5g", category: "protein" },
          { name: "红薯", amount: "1个", grams: "150g", fist: "1个拳头", protein: "2.2g", category: "carb" },
          { name: "冬瓜", amount: "150g", grams: "150g", fist: "1.5个拳头", protein: "0.5g", category: "vegetable" },
          { name: "蒜末、生抽", amount: "适量", grams: "—", fist: "—", protein: "0g", category: "seasoning" }
        ],
        steps: [
          "红薯蒸15分钟",
          "豆腐切片铺盘，冬瓜切薄片铺上，虾仁放最上层",
          "撒蒜末和少许生抽",
          "上锅大火蒸10分钟",
          "出锅淋几滴香油"
        ],
        tips: "蒸菜最大程度保留食材原味和营养。虾仁豆腐蒸冬瓜清甜鲜美。"
      },
      snack: {
        id: "w4-sun-snack", mealType: "加餐（休息日）", name: "香蕉+牛奶+蛋白粉",
        totalTime: "2分钟", calories: "约250大卡", protein: "约20g",
        ingredients: [
          { name: "香蕉", amount: "1根", grams: "120g", fist: "1个拳头", protein: "1.3g", category: "fruit" },
          { name: "牛奶", amount: "250ml", grams: "250g", fist: "1杯", protein: "8g", category: "protein" },
          { name: "蛋白粉", amount: "半勺", grams: "15g", fist: "—", protein: "12g", category: "protein" }
        ],
        steps: ["直接食用"],
        tips: "休息日加餐可选，如果当天活动量不大可以省略。"
      }
    }
  }
];
