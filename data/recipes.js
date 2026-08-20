// 食谱数据（v65 重构：菜品池 + 确定性周生成）
// 设计目标：
//  - 每道菜均符合「1份蛋白 + 1份主食 + 2份蔬菜」框架
//  - 每周 7 天不重样，相邻周不同，循环 8 周后再重复
//  - 蛋白质/蔬菜种类丰富（充分利用扩充后的食材库：香菇、蒜毫/蒜苗、油麦菜、秋葵、荷兰豆、紫甘蓝、木耳、海带…）

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

  // ===== 菜品池（每道都是完整的一餐）=====
  pools: {
    breakfast: [
      {
        mealType: "早餐", name: "水煮蛋燕麦粥配苹果", totalTime: "10分钟", calories: "约860大卡", protein: "约66g",
        ingredients: [
          { name: "鸡蛋", amount: "6个", grams: "300g", fist: "1.5个手掌", protein: "38g", category: "protein" },
          { name: "燕麦片", amount: "100g", grams: "100g", fist: "1个拳头", protein: "13g", category: "carb" },
          { name: "苹果", amount: "2个", grams: "400g", fist: "1个拳头", protein: "1.2g", category: "fruit" },
          { name: "牛奶", amount: "600ml", grams: "600g", fist: "1杯", protein: "19.2g", category: "protein" }
        ],
        steps: ["锅中加水烧开，放入燕麦片小火煮5分钟至浓稠", "另起锅烧水，水沸后放入鸡蛋煮7-10分钟", "燕麦粥盛碗，可倒入牛奶拌匀", "苹果洗净切块摆旁"],
        tips: "燕麦选纯燕麦片，不要速溶加糖款。"
      },
      {
        mealType: "早餐", name: "牛奶全麦面包配香蕉", totalTime: "5分钟", calories: "约900大卡", protein: "约60g",
        ingredients: [
          { name: "牛奶", amount: "600ml", grams: "600g", fist: "1杯", protein: "19.2g", category: "protein" },
          { name: "全麦面包", amount: "4片", grams: "140g", fist: "1个拳头", protein: "12.6g", category: "carb" },
          { name: "鸡蛋", amount: "4个", grams: "200g", fist: "1个手掌", protein: "25.2g", category: "protein" },
          { name: "香蕉", amount: "2根", grams: "240g", fist: "1个拳头", protein: "2.6g", category: "fruit" }
        ],
        steps: ["全麦面包稍微烤一下", "煎一个荷包蛋（少油）", "鸡蛋夹入面包，配牛奶和香蕉食用"],
        tips: "选全麦面包看配料表，全麦粉排第一才是真全麦。"
      },
      {
        mealType: "早餐", name: "希腊酸奶莓果碗", totalTime: "5分钟", calories: "约820大卡", protein: "约64g",
        ingredients: [
          { name: "希腊酸奶", amount: "400g", grams: "400g", fist: "1杯", protein: "40g", category: "protein" },
          { name: "蓝莓", amount: "200g", grams: "200g", fist: "1个拳头", protein: "1.2g", category: "fruit" },
          { name: "燕麦片", amount: "80g", grams: "80g", fist: "0.8个拳头", protein: "10g", category: "carb" },
          { name: "核桃", amount: "40g", grams: "40g", fist: "—", protein: "5g", category: "vegetable" }
        ],
        steps: ["希腊酸奶舀入碗中", "撒入蓝莓和燕麦片", "核桃掰碎撒表面即可"],
        tips: "希腊酸奶蛋白质高、碳水低，减脂期友好。"
      },
      {
        mealType: "早餐", name: "红薯泥配煎蛋", totalTime: "15分钟", calories: "约880大卡", protein: "约62g",
        ingredients: [
          { name: "红薯", amount: "2个中等", grams: "400g", fist: "1个拳头", protein: "4.4g", category: "carb" },
          { name: "鸡蛋", amount: "5个", grams: "250g", fist: "1.2个手掌", protein: "31.5g", category: "protein" },
          { name: "菠菜", amount: "2把", grams: "300g", fist: "1.5个拳头", protein: "7.8g", category: "vegetable" },
          { name: "牛奶", amount: "400ml", grams: "400g", fist: "0.7杯", protein: "12.8g", category: "protein" }
        ],
        steps: ["红薯蒸熟压成泥", "鸡蛋少油煎至溏心", "菠菜焯水30秒沥干摆旁", "配牛奶食用"],
        tips: "红薯替代精米面，升糖更平缓。"
      },
      {
        mealType: "早餐", name: "鸡胸蔬菜烘蛋", totalTime: "20分钟", calories: "约900大卡", protein: "约78g",
        ingredients: [
          { name: "鸡胸肉", amount: "250g", grams: "250g", fist: "1个手掌", protein: "58g", category: "protein" },
          { name: "鸡蛋", amount: "4个", grams: "200g", fist: "1个手掌", protein: "25.2g", category: "protein" },
          { name: "红黄彩椒", amount: "1个", grams: "150g", fist: "1个拳头", protein: "1.8g", category: "vegetable" },
          { name: "全麦面包", amount: "3片", grams: "105g", fist: "0.8个拳头", protein: "9.5g", category: "carb" }
        ],
        steps: ["鸡胸肉切丁用盐黑胡椒腌10分钟", "彩椒切丁与鸡蛋打散混合", "少油煎锅倒入蛋液小火烘至凝固", "配全麦面包食用"],
        tips: "烘蛋比煎蛋更嫩，蔬菜可随意替换。"
      },
      {
        mealType: "早餐", name: "玉米虾仁粥", totalTime: "20分钟", calories: "约840大卡", protein: "约70g",
        ingredients: [
          { name: "玉米", amount: "2根", grams: "300g", fist: "1个拳头", protein: "9g", category: "carb" },
          { name: "虾仁", amount: "250g", grams: "250g", fist: "1个手掌", protein: "48g", category: "protein" },
          { name: "鸡蛋", amount: "3个", grams: "150g", fist: "0.8个手掌", protein: "18.9g", category: "protein" },
          { name: "小白菜", amount: "2把", grams: "250g", fist: "1.2个拳头", protein: "5.5g", category: "vegetable" }
        ],
        steps: ["玉米粒与大米同煮成粥", "粥快好时打入鸡蛋搅散", "虾仁焯熟放入，最后下小白菜"],
        tips: "虾仁高蛋白低脂，粥里放点姜丝去腥。"
      },
      {
        mealType: "早餐", name: "豆腐脑配杂粮包", totalTime: "10分钟", calories: "约800大卡", protein: "约58g",
        ingredients: [
          { name: "豆腐", amount: "400g", grams: "400g", fist: "1个手掌", protein: "44g", category: "protein" },
          { name: "杂粮包", amount: "3个", grams: "150g", fist: "1个拳头", protein: "12g", category: "carb" },
          { name: "紫菜", amount: "10g", grams: "10g", fist: "—", protein: "3g", category: "vegetable" },
          { name: "苹果", amount: "1个", grams: "200g", fist: "0.5个拳头", protein: "0.6g", category: "fruit" }
        ],
        steps: ["豆腐脑盛碗，撒紫菜、淋生抽香油", "杂粮包蒸热", "配苹果食用"],
        tips: "豆腐脑用内酯豆腐自制或买现成均可。"
      },
      {
        mealType: "早餐", name: "牛油果蛋吐司", totalTime: "10分钟", calories: "约880大卡", protein: "约60g",
        ingredients: [
          { name: "全麦面包", amount: "4片", grams: "140g", fist: "1个拳头", protein: "12.6g", category: "carb" },
          { name: "鸡蛋", amount: "4个", grams: "200g", fist: "1个手掌", protein: "25.2g", category: "protein" },
          { name: "牛油果", amount: "1个", grams: "200g", fist: "0.5个拳头", protein: "4g", category: "fruit" },
          { name: "牛奶", amount: "400ml", grams: "400g", fist: "0.7杯", protein: "12.8g", category: "protein" }
        ],
        steps: ["面包烤脆", "鸡蛋水煮或煎熟", "牛油果压泥涂面包，夹蛋", "配牛奶"],
        tips: "牛油果提供优质脂肪，饱腹感强。"
      },
      {
        mealType: "早餐", name: "糙米鸡肉饭团", totalTime: "25分钟", calories: "约860大卡", protein: "约72g",
        ingredients: [
          { name: "糙米", amount: "150g生", grams: "150g", fist: "1个拳头", protein: "11g", category: "carb" },
          { name: "鸡胸肉", amount: "250g", grams: "250g", fist: "1个手掌", protein: "58g", category: "protein" },
          { name: "西兰花", amount: "200g", grams: "200g", fist: "1个拳头", protein: "5.6g", category: "vegetable" },
          { name: "圣女果", amount: "200g", grams: "200g", fist: "1个拳头", protein: "1.8g", category: "fruit" }
        ],
        steps: ["糙米煮熟", "鸡胸肉煮熟撕条", "西兰花焯水", "米饭拌鸡丝捏成饭团，配圣女果"],
        tips: "糙米GI低，适合减脂期主食。"
      },
      {
        mealType: "早餐", name: "紫薯酸奶杯", totalTime: "10分钟", calories: "约820大卡", protein: "约62g",
        ingredients: [
          { name: "紫薯", amount: "2个", grams: "350g", fist: "1个拳头", protein: "4g", category: "carb" },
          { name: "希腊酸奶", amount: "350g", grams: "350g", fist: "0.9杯", protein: "35g", category: "protein" },
          { name: "蓝莓", amount: "150g", grams: "150g", fist: "0.8个拳头", protein: "0.9g", category: "fruit" },
          { name: "杏仁", amount: "30g", grams: "30g", fist: "—", protein: "6g", category: "vegetable" }
        ],
        steps: ["紫薯蒸熟压泥铺杯底", "倒入希腊酸奶", "蓝莓与杏仁撒表面"],
        tips: "紫薯富含花青素，颜色好看又健康。"
      },
      {
        mealType: "早餐", name: "豆浆配鸡蛋蔬菜饼", totalTime: "15分钟", calories: "约840大卡", protein: "约66g",
        ingredients: [
          { name: "豆浆", amount: "600ml", grams: "600g", fist: "1杯", protein: "18g", category: "protein" },
          { name: "鸡蛋", amount: "4个", grams: "200g", fist: "1个手掌", protein: "25.2g", category: "protein" },
          { name: "全麦面粉", amount: "100g", grams: "100g", fist: "0.7个拳头", protein: "12g", category: "carb" },
          { name: "西葫芦", amount: "200g", grams: "200g", fist: "1个拳头", protein: "2.4g", category: "vegetable" }
        ],
        steps: ["西葫芦擦丝与鸡蛋面粉调成糊", "少油小火煎成薄饼", "配豆浆"],
        tips: "蔬菜饼藏着蔬菜，挑食也爱吃。"
      },
      {
        mealType: "早餐", name: "小米南瓜粥配蒸蛋", totalTime: "20分钟", calories: "约800大卡", protein: "约64g",
        ingredients: [
          { name: "小米", amount: "100g", grams: "100g", fist: "0.7个拳头", protein: "11g", category: "carb" },
          { name: "南瓜", amount: "300g", grams: "300g", fist: "1.5个拳头", protein: "3g", category: "vegetable" },
          { name: "鸡蛋", amount: "5个", grams: "250g", fist: "1.2个手掌", protein: "31.5g", category: "protein" },
          { name: "牛奶", amount: "300ml", grams: "300g", fist: "0.5杯", protein: "9.6g", category: "protein" }
        ],
        steps: ["小米南瓜同煮成粥", "鸡蛋蒸成蛋羹", "配牛奶"],
        tips: "小米养胃，适合早餐暖身。"
      }
    ],

    lunch: [
      {
        mealType: "午餐", name: "鸡胸肉炒西兰花配米饭", totalTime: "20分钟", calories: "约900大卡", protein: "约96g",
        ingredients: [
          { name: "鸡胸肉", amount: "300g", grams: "300g", fist: "1个手掌", protein: "70g", category: "protein" },
          { name: "米饭", amount: "2碗", grams: "熟300g", fist: "1个拳头", protein: "7.8g", category: "carb" },
          { name: "西兰花", amount: "1棵", grams: "400g", fist: "2个拳头", protein: "11.2g", category: "vegetable" },
          { name: "蒜瓣", amount: "4瓣", grams: "20g", fist: "—", protein: "0g", category: "seasoning" },
          { name: "食用油", amount: "2瓷勺", grams: "20g", fist: "—", protein: "0g", category: "oil" }
        ],
        steps: ["鸡胸肉切丁腌制10分钟", "西兰花掰小朵焯1分钟", "热锅爆香蒜片下鸡丁翻炒", "加西兰花炒2分钟调味", "同时煮好米饭"],
        tips: "鸡胸肉切丁比切片更嫩，腌时加淀粉锁水。"
      },
      {
        mealType: "午餐", name: "番茄牛肉盖饭", totalTime: "30分钟", calories: "约1060大卡", protein: "约92g",
        ingredients: [
          { name: "牛肉", amount: "300g", grams: "300g", fist: "1个手掌", protein: "62g", category: "protein" },
          { name: "米饭", amount: "2碗", grams: "熟300g", fist: "1个拳头", protein: "7.8g", category: "carb" },
          { name: "番茄", amount: "3个", grams: "450g", fist: "2个拳头", protein: "3.6g", category: "vegetable" },
          { name: "青椒", amount: "1个", grams: "150g", fist: "1个拳头", protein: "1.8g", category: "vegetable" }
        ],
        steps: ["牛肉切片用生抽淀粉腌10分钟", "番茄去皮切块炒出汁", "下牛肉与青椒翻炒至熟", "浇在米饭上"],
        tips: "番茄炒出红油更开胃，牛肉逆纹切更嫩。"
      },
      {
        mealType: "午餐", name: "清蒸鱼配蒜蓉油麦菜", totalTime: "25分钟", calories: "约820大卡", protein: "约80g",
        ingredients: [
          { name: "龙利鱼/巴沙鱼", amount: "300g", grams: "300g", fist: "1个手掌", protein: "60g", category: "protein" },
          { name: "红薯", amount: "2个中等", grams: "400g", fist: "1个拳头", protein: "4.4g", category: "carb" },
          { name: "油麦菜", amount: "2把", grams: "400g", fist: "2个拳头", protein: "6.8g", category: "vegetable" },
          { name: "蒜末、生抽", amount: "适量", grams: "—", fist: "—", protein: "0g", category: "seasoning" }
        ],
        steps: ["红薯蒸熟", "鱼块腌5分钟后中火蒸8分钟", "油麦菜焯水拌蒜蓉生抽", "鱼淋蒸鱼豉油"],
        tips: "清蒸保留鱼肉鲜嫩，少油更健康。"
      },
      {
        mealType: "午餐", name: "虾仁炒蛋配糙米", totalTime: "20分钟", calories: "约880大卡", protein: "约86g",
        ingredients: [
          { name: "虾仁", amount: "300g", grams: "300g", fist: "1个手掌", protein: "58g", category: "protein" },
          { name: "鸡蛋", amount: "4个", grams: "200g", fist: "1个手掌", protein: "25.2g", category: "protein" },
          { name: "糙米", amount: "150g生", grams: "150g", fist: "1个拳头", protein: "11g", category: "carb" },
          { name: "秋葵", amount: "200g", grams: "200g", fist: "1个拳头", protein: "3.6g", category: "vegetable" }
        ],
        steps: ["糙米煮熟", "鸡蛋打散炒至半凝固盛出", "虾仁与秋葵翻炒", "倒回鸡蛋翻炒调味"],
        tips: "秋葵黏液助消化，焯水去涩更爽口。"
      },
      {
        mealType: "午餐", name: "麻婆豆腐配米饭", totalTime: "20分钟", calories: "约900大卡", protein: "约84g",
        ingredients: [
          { name: "豆腐", amount: "400g", grams: "400g", fist: "1个手掌", protein: "44g", category: "protein" },
          { name: "米饭", amount: "2碗", grams: "熟300g", fist: "1个拳头", protein: "7.8g", category: "carb" },
          { name: "韭菜", amount: "150g", grams: "150g", fist: "0.8个拳头", protein: "3.3g", category: "vegetable" },
          { name: "胡萝卜", amount: "1根", grams: "100g", fist: "0.5个拳头", protein: "1.1g", category: "vegetable" }
        ],
        steps: ["豆腐切块焯水去豆腥", "肉末炒香下豆瓣酱", "加水焖豆腐入味", "韭黄胡萝卜收汁"],
        tips: "豆腐植物蛋白丰富，少放油版更低脂。"
      },
      {
        mealType: "午餐", name: "照烧鸡腿饭", totalTime: "30分钟", calories: "约1000大卡", protein: "约88g",
        ingredients: [
          { name: "鸡腿", amount: "2个", grams: "300g", fist: "1个手掌", protein: "50g", category: "protein" },
          { name: "米饭", amount: "2碗", grams: "熟300g", fist: "1个拳头", protein: "7.8g", category: "carb" },
          { name: "西兰花", amount: "200g", grams: "200g", fist: "1个拳头", protein: "5.6g", category: "vegetable" },
          { name: "玉米", amount: "1根", grams: "150g", fist: "0.5个拳头", protein: "4.5g", category: "vegetable" }
        ],
        steps: ["鸡腿去骨煎至两面金黄", "淋照烧酱汁收浓", "西兰花玉米焯水", "铺在米饭上"],
        tips: "鸡腿去皮可减少脂肪，照烧酱少放糖。"
      },
      {
        mealType: "午餐", name: "瘦肉炒荷兰豆", totalTime: "20分钟", calories: "约880大卡", protein: "约82g",
        ingredients: [
          { name: "瘦猪肉", amount: "250g", grams: "250g", fist: "1个手掌", protein: "50g", category: "protein" },
          { name: "米饭", amount: "2碗", grams: "熟300g", fist: "1个拳头", protein: "7.8g", category: "carb" },
          { name: "荷兰豆", amount: "250g", grams: "250g", fist: "1.2个拳头", protein: "5g", category: "vegetable" },
          { name: "胡萝卜", amount: "1根", grams: "100g", fist: "0.5个拳头", protein: "1.1g", category: "vegetable" }
        ],
        steps: ["瘦肉切丝用生抽腌10分钟", "荷兰豆去筋焯水", "热锅快炒肉丝", "下荷兰豆胡萝卜翻炒调味"],
        tips: "荷兰豆脆嫩，焯水保色后快炒。"
      },
      {
        mealType: "午餐", name: "香煎三文鱼配芦笋藜麦", totalTime: "25分钟", calories: "约920大卡", protein: "约90g",
        ingredients: [
          { name: "三文鱼", amount: "300g", grams: "300g", fist: "1个手掌", protein: "62g", category: "protein" },
          { name: "藜麦", amount: "120g生", grams: "120g", fist: "0.8个拳头", protein: "16g", category: "carb" },
          { name: "芦笋", amount: "200g", grams: "200g", fist: "1个拳头", protein: "4.4g", category: "vegetable" },
          { name: "圣女果", amount: "150g", grams: "150g", fist: "0.8个拳头", protein: "1.4g", category: "fruit" }
        ],
        steps: ["藜麦煮熟", "三文鱼少油每面煎3分钟", "芦笋焯水", "摆盘配圣女果"],
        tips: "三文鱼富含Omega-3，减脂期优质脂肪来源。"
      },
      {
        mealType: "午餐", name: "蛤蜊冬瓜汤面", totalTime: "25分钟", calories: "约840大卡", protein: "约78g",
        ingredients: [
          { name: "蛤蜊", amount: "400g", grams: "400g", fist: "1.5个手掌", protein: "48g", category: "protein" },
          { name: "全麦面", amount: "150g", grams: "150g", fist: "1个拳头", protein: "18g", category: "carb" },
          { name: "冬瓜", amount: "300g", grams: "300g", fist: "1.5个拳头", protein: "1.8g", category: "vegetable" },
          { name: "小白菜", amount: "150g", grams: "150g", fist: "0.8个拳头", protein: "3.3g", category: "vegetable" }
        ],
        steps: ["蛤蜊吐沙后加水煮开口", "汤中下冬瓜煮软", "另煮全麦面捞出", "面入汤加小白菜"],
        tips: "蛤蜊低脂蛋白，汤鲜不需额外调味。"
      },
      {
        mealType: "午餐", name: "鸭胸炒彩椒", totalTime: "25分钟", calories: "约900大卡", protein: "约84g",
        ingredients: [
          { name: "鸭胸", amount: "300g", grams: "300g", fist: "1个手掌", protein: "60g", category: "protein" },
          { name: "米饭", amount: "2碗", grams: "熟300g", fist: "1个拳头", protein: "7.8g", category: "carb" },
          { name: "红黄彩椒", amount: "2个", grams: "300g", fist: "1.5个拳头", protein: "3.6g", category: "vegetable" },
          { name: "西葫芦", amount: "200g", grams: "200g", fist: "1个拳头", protein: "2.4g", category: "vegetable" }
        ],
        steps: ["鸭胸去皮切薄片煎香", "彩椒西葫芦切条翻炒", "调味后配米饭"],
        tips: "鸭胸去皮减脂，配彩椒维生素丰富。"
      },
      {
        mealType: "午餐", name: "羊肉萝卜煲", totalTime: "35分钟", calories: "约960大卡", protein: "约86g",
        ingredients: [
          { name: "羊肉", amount: "300g", grams: "300g", fist: "1个手掌", protein: "60g", category: "protein" },
          { name: "米饭", amount: "2碗", grams: "熟300g", fist: "1个拳头", protein: "7.8g", category: "carb" },
          { name: "白萝卜", amount: "400g", grams: "400g", fist: "2个拳头", protein: "3.2g", category: "vegetable" },
          { name: "香菜", amount: "少许", grams: "10g", fist: "—", protein: "0.2g", category: "vegetable" }
        ],
        steps: ["羊肉切块焯水去膻", "与萝卜同炖至软烂", "撒香菜", "配米饭"],
        tips: "白萝卜解腻，炖煮更入味。"
      },
      {
        mealType: "午餐", name: "金枪鱼藜麦碗", totalTime: "20分钟", calories: "约860大卡", protein: "约88g",
        ingredients: [
          { name: "金枪鱼罐头", amount: "200g", grams: "200g", fist: "1个手掌", protein: "54g", category: "protein" },
          { name: "藜麦", amount: "120g生", grams: "120g", fist: "0.8个拳头", protein: "16g", category: "carb" },
          { name: "牛油果", amount: "1个", grams: "200g", fist: "0.5个拳头", protein: "4g", category: "fruit" },
          { name: "圣女果", amount: "200g", grams: "200g", fist: "1个拳头", protein: "1.8g", category: "fruit" }
        ],
        steps: ["藜麦煮熟沥干", "金枪鱼沥干铺上", "牛油果切片、圣女果对半摆", "淋少许黑醋"],
        tips: "金枪鱼罐头选水浸款，少油更健康。"
      },
      {
        mealType: "午餐", name: "香菇滑鸡饭", totalTime: "30分钟", calories: "约940大卡", protein: "约90g",
        ingredients: [
          { name: "鸡胸肉", amount: "300g", grams: "300g", fist: "1个手掌", protein: "70g", category: "protein" },
          { name: "米饭", amount: "2碗", grams: "熟300g", fist: "1个拳头", protein: "7.8g", category: "carb" },
          { name: "香菇（鲜）", amount: "200g", grams: "200g", fist: "1个拳头", protein: "5.4g", category: "vegetable" },
          { name: "芥蓝", amount: "200g", grams: "200g", fist: "1个拳头", protein: "5.2g", category: "vegetable" }
        ],
        steps: ["鸡胸切片用蚝油腌", "香菇煸炒出香", "下鸡片滑炒熟", "芥蓝焯水摆旁配饭"],
        tips: "鲜香菇提鲜，不必放味精。"
      },
      {
        mealType: "午餐", name: "毛豆炒肉丝", totalTime: "20分钟", calories: "约880大卡", protein: "约84g",
        ingredients: [
          { name: "瘦猪肉", amount: "250g", grams: "250g", fist: "1个手掌", protein: "50g", category: "protein" },
          { name: "米饭", amount: "2碗", grams: "熟300g", fist: "1个拳头", protein: "7.8g", category: "carb" },
          { name: "毛豆", amount: "200g", grams: "200g", fist: "1个拳头", protein: "20g", category: "vegetable" },
          { name: "莴笋", amount: "200g", grams: "200g", fist: "1个拳头", protein: "2g", category: "vegetable" }
        ],
        steps: ["肉丝用生抽腌", "毛豆焯水", "热锅炒肉丝", "下毛豆莴笋翻炒"],
        tips: "毛豆植物蛋白高，口感清爽。"
      },
      {
        mealType: "午餐", name: "海带豆腐炖排骨", totalTime: "40分钟", calories: "约940大卡", protein: "约86g",
        ingredients: [
          { name: "排骨（瘦）", amount: "300g", grams: "300g", fist: "1个手掌", protein: "58g", category: "protein" },
          { name: "米饭", amount: "2碗", grams: "熟300ml", fist: "1个拳头", protein: "7.8g", category: "carb" },
          { name: "海带", amount: "200g", grams: "200g", fist: "1个拳头", protein: "3.4g", category: "vegetable" },
          { name: "冬瓜", amount: "200g", grams: "200g", fist: "1个拳头", protein: "1.2g", category: "vegetable" }
        ],
        steps: ["排骨焯水去血沫", "与海带冬瓜同炖40分钟", "少盐调味", "配米饭"],
        tips: "海带补碘，炖汤鲜甜。"
      }
    ],

    dinner: [
      {
        mealType: "晚餐", name: "香煎鱼配红薯凉拌菠菜", totalTime: "25分钟", calories: "约800大卡", protein: "约70g",
        ingredients: [
          { name: "龙利鱼/巴沙鱼", amount: "300g", grams: "300g", fist: "1个手掌", protein: "60g", category: "protein" },
          { name: "红薯", amount: "2个中等", grams: "400g", fist: "1个拳头", protein: "4.4g", category: "carb" },
          { name: "菠菜", amount: "2把", grams: "400g", fist: "2个拳头", protein: "10.4g", category: "vegetable" },
          { name: "蒜末、生抽、醋", amount: "适量", grams: "—", fist: "—", protein: "0g", category: "seasoning" }
        ],
        steps: ["红薯蒸熟", "鱼块煎每面3-4分钟", "菠菜焯水拌蒜蓉生抽", "摆盘"],
        tips: "晚餐清淡，凉拌菜少放油。"
      },
      {
        mealType: "晚餐", name: "鸡胸芦笋沙拉", totalTime: "20分钟", calories: "约760大卡", protein: "约82g",
        ingredients: [
          { name: "鸡胸肉", amount: "300g", grams: "300g", fist: "1个手掌", protein: "70g", category: "protein" },
          { name: "藜麦", amount: "100g生", grams: "100g", fist: "0.7个拳头", protein: "13g", category: "carb" },
          { name: "芦笋", amount: "200g", grams: "200g", fist: "1个拳头", protein: "4.4g", category: "vegetable" },
          { name: "圣女果", amount: "150g", grams: "150g", fist: "0.8个拳头", protein: "1.4g", category: "fruit" }
        ],
        steps: ["鸡胸煮熟撕条", "藜麦煮熟", "芦笋焯水切段", "混合淋油醋汁"],
        tips: "沙拉酱用油醋代替蛋黄酱，热量更低。"
      },
      {
        mealType: "晚餐", name: "牛肉炒芥蓝", totalTime: "20分钟", calories: "约840大卡", protein: "约84g",
        ingredients: [
          { name: "牛肉", amount: "250g", grams: "250g", fist: "1个手掌", protein: "52g", category: "protein" },
          { name: "糙米", amount: "120g生", grams: "120g", fist: "0.8个拳头", protein: "9g", category: "carb" },
          { name: "芥蓝", amount: "250g", grams: "250g", fist: "1.2个拳头", protein: "6.5g", category: "vegetable" },
          { name: "红黄彩椒", amount: "1个", grams: "150g", fist: "1个拳头", protein: "1.8g", category: "vegetable" }
        ],
        steps: ["牛肉逆纹切片腌", "糙米煮熟", "芥蓝彩椒快炒", "下牛肉翻炒调味"],
        tips: "芥蓝梗去皮更嫩，快炒保脆。"
      },
      {
        mealType: "晚餐", name: "虾仁豆腐煲", totalTime: "25分钟", calories: "约820大卡", protein: "约86g",
        ingredients: [
          { name: "虾仁", amount: "250g", grams: "250g", fist: "1个手掌", protein: "48g", category: "protein" },
          { name: "米饭", amount: "2碗", grams: "熟300g", fist: "1个拳头", protein: "7.8g", category: "carb" },
          { name: "豆腐", amount: "300g", grams: "300g", fist: "0.8个手掌", protein: "33g", category: "protein" },
          { name: "娃娃菜", amount: "200g", grams: "200g", fist: "1个拳头", protein: "3.6g", category: "vegetable" }
        ],
        steps: ["豆腐切块煎香", "加水和虾仁娃娃菜煮", "调味收汁", "配米饭"],
        tips: "虾仁豆腐双蛋白，清淡饱腹。"
      },
      {
        mealType: "晚餐", name: "蒸蛋羹配秋葵", totalTime: "20分钟", calories: "约740大卡", protein: "约70g",
        ingredients: [
          { name: "鸡蛋", amount: "6个", grams: "300g", fist: "1.5个手掌", protein: "37.8g", category: "protein" },
          { name: "米饭", amount: "2碗", grams: "熟300g", fist: "1个拳头", protein: "7.8g", category: "carb" },
          { name: "秋葵", amount: "200g", grams: "200g", fist: "1个拳头", protein: "3.6g", category: "vegetable" },
          { name: "香菇（鲜）", amount: "150g", grams: "150g", fist: "0.8个拳头", protein: "4g", category: "vegetable" }
        ],
        steps: ["鸡蛋打散加温水蒸成羹", "秋葵香菇焯水切段摆旁", "淋少许生抽"],
        tips: "蒸蛋用温水更嫩滑，比例1:1.5。"
      },
      {
        mealType: "晚餐", name: "瘦肉炒莴笋", totalTime: "20分钟", calories: "约800大卡", protein: "约78g",
        ingredients: [
          { name: "瘦猪肉", amount: "250g", grams: "250g", fist: "1个手掌", protein: "50g", category: "protein" },
          { name: "红薯", amount: "2个中等", grams: "400g", fist: "1个拳头", protein: "4.4g", category: "carb" },
          { name: "莴笋", amount: "300g", grams: "300g", fist: "1.5个拳头", protein: "3g", category: "vegetable" },
          { name: "胡萝卜", amount: "1根", grams: "100g", fist: "0.5个拳头", protein: "1.1g", category: "vegetable" }
        ],
        steps: ["瘦肉切丝腌", "红薯蒸熟", "莴笋胡萝卜切丝快炒", "下肉丝调味"],
        tips: "莴笋清脆，晚餐吃着没负担。"
      },
      {
        mealType: "晚餐", name: "三文鱼蔬菜卷", totalTime: "25分钟", calories: "约860大卡", protein: "约82g",
        ingredients: [
          { name: "三文鱼", amount: "250g", grams: "250g", fist: "0.8个手掌", protein: "52g", category: "protein" },
          { name: "全麦饼", amount: "3张", grams: "150g", fist: "1个拳头", protein: "15g", category: "carb" },
          { name: "黄瓜", amount: "1根", grams: "200g", fist: "1个拳头", protein: "1.8g", category: "vegetable" },
          { name: "紫甘蓝", amount: "150g", grams: "150g", fist: "0.8个拳头", protein: "2.4g", category: "vegetable" }
        ],
        steps: ["三文鱼切条微微煎", "黄瓜紫甘蓝切丝", "铺在全麦饼上卷起", "对半切摆盘"],
        tips: "蔬菜卷清爽，适合晚餐。"
      },
      {
        mealType: "晚餐", name: "白灼虾配蒜蓉空心菜", totalTime: "20分钟", calories: "约780大卡", protein: "约80g",
        ingredients: [
          { name: "虾", amount: "300g", grams: "300g", fist: "1个手掌", protein: "57g", category: "protein" },
          { name: "米饭", amount: "2碗", grams: "熟300g", fist: "1个拳头", protein: "7.8g", category: "carb" },
          { name: "空心菜", amount: "300g", grams: "300g", fist: "1.5个拳头", protein: "6.6g", category: "vegetable" },
          { name: "蒜末、生抽", amount: "适量", grams: "—", fist: "—", protein: "0g", category: "seasoning" }
        ],
        steps: ["虾沸水煮红捞出", "空心菜焯水拌蒜蓉生抽", "配米饭"],
        tips: "白灼最省油，虾鲜甜原味。"
      },
      {
        mealType: "晚餐", name: "豆腐菌菇汤", totalTime: "25分钟", calories: "约720大卡", protein: "约76g",
        ingredients: [
          { name: "豆腐", amount: "350g", grams: "350g", fist: "0.9个手掌", protein: "38g", category: "protein" },
          { name: "糙米", amount: "120g生", grams: "120g", fist: "0.8个拳头", protein: "9g", category: "carb" },
          { name: "金针菇", amount: "200g", grams: "200g", fist: "1个拳头", protein: "5.4g", category: "vegetable" },
          { name: "水发木耳", amount: "100g", grams: "100g", fist: "0.5个拳头", protein: "1.2g", category: "vegetable" }
        ],
        steps: ["糙米煮熟", "金针菇木耳撕小", "与豆腐同煮成汤", "撒葱花"],
        tips: "菌菇提鲜，汤里不放油也好喝。"
      },
      {
        mealType: "晚餐", name: "鸡腿蔬菜汤", totalTime: "30分钟", calories: "约820大卡", protein: "约78g",
        ingredients: [
          { name: "鸡腿", amount: "2个", grams: "300g", fist: "1个手掌", protein: "50g", category: "protein" },
          { name: "玉米", amount: "1根", grams: "150g", fist: "0.5个拳头", protein: "4.5g", category: "vegetable" },
          { name: "西葫芦", amount: "200g", grams: "200g", fist: "1个拳头", protein: "2.4g", category: "vegetable" },
          { name: "胡萝卜", amount: "1根", grams: "100g", fist: "0.5个拳头", protein: "1.1g", category: "vegetable" }
        ],
        steps: ["鸡腿去皮焯水", "与玉米胡萝卜同炖", "下西葫芦煮软", "少盐调味"],
        tips: "鸡汤暖胃，去皮减脂。"
      },
      {
        mealType: "晚餐", name: "蛤蜊蒸蛋", totalTime: "20分钟", calories: "约760大卡", protein: "约76g",
        ingredients: [
          { name: "蛤蜊", amount: "300g", grams: "300g", fist: "1个手掌", protein: "36g", category: "protein" },
          { name: "鸡蛋", amount: "5个", grams: "250g", fist: "1.2个手掌", protein: "31.5g", category: "protein" },
          { name: "米饭", amount: "2碗", grams: "熟300g", fist: "1个拳头", protein: "7.8g", category: "carb" },
          { name: "小白菜", amount: "150g", grams: "150g", fist: "0.8个拳头", protein: "3.3g", category: "vegetable" }
        ],
        steps: ["蛤蜊煮开口取肉", "鸡蛋加温水蒸半凝固", "铺蛤蜊续蒸", "配米饭与小白菜"],
        tips: "蛤蜊鲜味融入蛋羹，无需味精。"
      },
      {
        mealType: "晚餐", name: "鸭胸炒韭菜", totalTime: "20分钟", calories: "约800大卡", protein: "约78g",
        ingredients: [
          { name: "鸭胸", amount: "250g", grams: "250g", fist: "0.8个手掌", protein: "50g", category: "protein" },
          { name: "藜麦", amount: "100g生", grams: "100g", fist: "0.7个拳头", protein: "13g", category: "carb" },
          { name: "韭菜", amount: "200g", grams: "200g", fist: "1个拳头", protein: "4.4g", category: "vegetable" },
          { name: "红黄彩椒", amount: "1个", grams: "150g", fist: "1个拳头", protein: "1.8g", category: "vegetable" }
        ],
        steps: ["鸭胸去皮切丝煎", "藜麦煮熟", "韭菜彩椒快炒", "下鸭丝调味"],
        tips: "韭菜香气足，快炒不出水。"
      },
      {
        mealType: "晚餐", name: "羊肉炒蒜毫", totalTime: "20分钟", calories: "约860大卡", protein: "约80g",
        ingredients: [
          { name: "羊肉", amount: "250g", grams: "250g", fist: "0.8个手掌", protein: "50g", category: "protein" },
          { name: "米饭", amount: "2碗", grams: "熟300g", fist: "1个拳头", protein: "7.8g", category: "carb" },
          { name: "蒜毫/蒜苗", amount: "200g", grams: "200g", fist: "1个拳头", protein: "3.6g", category: "vegetable" },
          { name: "胡萝卜", amount: "1根", grams: "100g", fist: "0.5个拳头", protein: "1.1g", category: "vegetable" }
        ],
        steps: ["羊肉切丝用生抽腌", "蒜毫切段", "热锅快炒羊肉", "下蒜毫胡萝卜翻炒"],
        tips: "蒜毫比蒜苗更嫩，炒肉很香。"
      },
      {
        mealType: "晚餐", name: "金枪鱼蔬菜沙拉", totalTime: "15分钟", calories: "约740大卡", protein: "约80g",
        ingredients: [
          { name: "金枪鱼罐头", amount: "200g", grams: "200g", fist: "1个手掌", protein: "54g", category: "protein" },
          { name: "全麦面包", amount: "3片", grams: "105g", fist: "0.8个拳头", protein: "9.5g", category: "carb" },
          { name: "苦菊", amount: "150g", grams: "150g", fist: "0.8个拳头", protein: "3g", category: "vegetable" },
          { name: "圣女果", amount: "200g", grams: "200g", fist: "1个拳头", protein: "1.8g", category: "fruit" }
        ],
        steps: ["苦菊洗净撕小", "金枪鱼沥干铺上", "圣女果对半", "淋油醋汁配面包"],
        tips: "苦菊微苦清热，适合夏天。"
      },
      {
        mealType: "晚餐", name: "木耳炒鸡蛋配杂粮饭", totalTime: "20分钟", calories: "约760大卡", protein: "约74g",
        ingredients: [
          { name: "鸡蛋", amount: "5个", grams: "250g", fist: "1.2个手掌", protein: "31.5g", category: "protein" },
          { name: "杂粮饭", amount: "2碗", grams: "熟300g", fist: "1个拳头", protein: "8g", category: "carb" , },
          { name: "水发木耳", amount: "150g", grams: "150g", fist: "0.8个拳头", protein: "1.8g", category: "vegetable" },
          { name: "黄瓜", amount: "1根", grams: "200g", fist: "1个拳头", protein: "1.8g", category: "vegetable" }
        ],
        steps: ["鸡蛋炒散盛出", "木耳黄瓜翻炒", "倒回鸡蛋调味", "配杂粮饭"],
        tips: "木耳清肠，晚餐负担小。"
      }
    ],

    snack: [
      {
        mealType: "加餐（休息日）", name: "香蕉+牛奶+蛋白粉", totalTime: "2分钟", calories: "约500大卡", protein: "约40g",
        ingredients: [
          { name: "香蕉", amount: "2根", grams: "240g", fist: "1个拳头", protein: "2.6g", category: "fruit" },
          { name: "牛奶", amount: "500ml", grams: "500g", fist: "1杯", protein: "16g", category: "protein" },
          { name: "蛋白粉", amount: "2勺", grams: "60g", fist: "—", protein: "48g", category: "protein" }
        ],
        steps: ["直接食用即可"],
        tips: "训练后30分钟内加餐，蛋白质+碳水帮助恢复。"
      },
      {
        mealType: "加餐（休息日）", name: "希腊酸奶+蓝莓+燕麦", totalTime: "3分钟", calories: "约460大卡", protein: "约38g",
        ingredients: [
          { name: "希腊酸奶", amount: "300g", grams: "300g", fist: "0.8杯", protein: "30g", category: "protein" },
          { name: "蓝莓", amount: "150g", grams: "150g", fist: "0.8个拳头", protein: "0.9g", category: "fruit" },
          { name: "燕麦片", amount: "50g", grams: "50g", fist: "0.5个拳头", protein: "6.5g", category: "carb" }
        ],
        steps: ["酸奶舀碗", "撒蓝莓燕麦"],
        tips: "低糖高蛋，训练后好选择。"
      },
      {
        mealType: "加餐（休息日）", name: "水煮蛋+黄瓜", totalTime: "10分钟", calories: "约380大卡", protein: "约34g",
        ingredients: [
          { name: "鸡蛋", amount: "4个", grams: "200g", fist: "1个手掌", protein: "25.2g", category: "protein" },
          { name: "黄瓜", amount: "1根", grams: "200g", fist: "1个拳头", protein: "1.8g", category: "vegetable" }
        ],
        steps: ["鸡蛋煮熟", "黄瓜洗净切条"],
        tips: "简单高蛋白，热量低。"
      },
      {
        mealType: "加餐（休息日）", name: "牛奶+全麦面包", totalTime: "2分钟", calories: "约420大卡", protein: "约32g",
        ingredients: [
          { name: "牛奶", amount: "400ml", grams: "400g", fist: "0.7杯", protein: "12.8g", category: "protein" },
          { name: "全麦面包", amount: "2片", grams: "70g", fist: "0.5个拳头", protein: "6.3g", category: "carb" }
        ],
        steps: ["直接食用"],
        tips: "方便携带的蛋白加餐。"
      },
      {
        mealType: "加餐（休息日）", name: "坚果+酸奶", totalTime: "2分钟", calories: "约440大卡", protein: "约30g",
        ingredients: [
          { name: "无糖酸奶", amount: "300g", grams: "300g", fist: "0.8杯", protein: "9g", category: "protein" },
          { name: "混合坚果", amount: "30g", grams: "30g", fist: "—", protein: "6g", category: "vegetable" },
          { name: "蛋白粉", amount: "1勺", grams: "30g", fist: "—", protein: "24g", category: "protein" }
        ],
        steps: ["酸奶加蛋白粉搅匀", "撒坚果"],
        tips: "坚果补健康脂肪，控制量。"
      },
      {
        mealType: "加餐（休息日）", name: "蛋白棒+苹果", totalTime: "1分钟", calories: "约400大卡", protein: "约35g",
        ingredients: [
          { name: "蛋白棒", amount: "1根", grams: "60g", fist: "—", protein: "30g", category: "protein" },
          { name: "苹果", amount: "1个", grams: "200g", fist: "0.5个拳头", protein: "0.6g", category: "fruit" }
        ],
        steps: ["直接食用"],
        tips: "外出便携加餐。"
      },
      {
        mealType: "加餐（休息日）", name: "虾仁+牛油果", totalTime: "8分钟", calories: "约420大卡", protein: "约36g",
        ingredients: [
          { name: "虾仁", amount: "150g", grams: "150g", fist: "0.5个手掌", protein: "29g", category: "protein" },
          { name: "牛油果", amount: "半个", grams: "100g", fist: "0.3个拳头", protein: "2g", category: "fruit" }
        ],
        steps: ["虾仁煮熟", "牛油果切片", "撒黑胡椒"],
        tips: "优质蛋白配好脂肪。"
      },
      {
        mealType: "加餐（休息日）", name: "豆腐脑+圣女果", totalTime: "3分钟", calories: "约360大卡", protein: "约33g",
        ingredients: [
          { name: "豆腐", amount: "300g", grams: "300g", fist: "0.8个手掌", protein: "33g", category: "protein" },
          { name: "圣女果", amount: "150g", grams: "150g", fist: "0.8个拳头", protein: "1.4g", category: "fruit" }
        ],
        steps: ["豆腐脑淋生抽香油", "圣女果洗净"],
        tips: "低卡清爽的加餐。"
      },
      {
        mealType: "加餐（休息日）", name: "鸡胸沙拉+圣女果", totalTime: "10分钟", calories: "约380大卡", protein: "约40g",
        ingredients: [
          { name: "鸡胸肉", amount: "150g", grams: "150g", fist: "0.5个手掌", protein: "35g", category: "protein" },
          { name: "生菜", amount: "150g", grams: "150g", fist: "0.8个拳头", protein: "2.4g", category: "vegetable" },
          { name: "圣女果", amount: "150g", grams: "150g", fist: "0.8个拳头", protein: "1.4g", category: "fruit" }
        ],
        steps: ["鸡胸煮熟撕条", "生菜圣女果拌油醋汁", "撒鸡丝"],
        tips: "纯蛋白加餐，几乎无负担。"
      },
      {
        mealType: "加餐（休息日）", name: "毛豆+玉米", totalTime: "15分钟", calories: "约400大卡", protein: "约34g",
        ingredients: [
          { name: "毛豆", amount: "200g", grams: "200g", fist: "1个拳头", protein: "20g", category: "vegetable" },
          { name: "玉米", amount: "1根", grams: "150g", fist: "0.5个拳头", protein: "4.5g", category: "vegetable" },
          { name: "牛奶", amount: "300ml", grams: "300g", fist: "0.5杯", protein: "9.6g", category: "protein" }
        ],
        steps: ["毛豆玉米煮熟", "配牛奶"],
        tips: "植物蛋白+钙质，简单顶饿。"
      },
      {
        mealType: "加餐（休息日）", name: "希腊酸奶+奇亚籽", totalTime: "3分钟", calories: "约420大卡", protein: "约36g",
        ingredients: [
          { name: "希腊酸奶", amount: "300g", grams: "300g", fist: "0.8杯", protein: "30g", category: "protein" },
          { name: "奇亚籽", amount: "20g", grams: "20g", fist: "—", protein: "3.4g", category: "vegetable" },
          { name: "草莓", amount: "150g", grams: "150g", fist: "0.8个拳头", protein: "1g", category: "fruit" }
        ],
        steps: ["奇亚籽泡入酸奶", "草莓切片摆上"],
        tips: "奇亚籽补Omega-3与纤维。"
      }
    ]
  },

  // ===== 由菜品池确定性生成某一周的菜单 =====
  // 每周 7 天，每种餐型从池中取 7 道连续且不重复的菜；
  // 不同周用不同偏移(步进5)，保证相邻周不同、且循环 8 周后才重复。
  _buildWeek(weekNum) {
    const types = ['breakfast', 'lunch', 'dinner', 'snack'];
    const typeOffset = { breakfast: 0, lunch: 3, dinner: 6, snack: 9 };
    const STEP = 7;
    const dayNames = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    const days = [];
    for (let d = 1; d <= 7; d++) {
      const meals = {};
      for (const t of types) {
        const pool = this.pools[t];
        const L = pool.length;
        const start = ((weekNum - 1) * STEP + typeOffset[t]) % L;
        const idx = (start + (d - 1)) % L;
        const base = pool[idx];
        meals[t] = { ...base, id: `w${weekNum}-d${d}-${t}`, mealType: base.mealType };
      }
      days.push({ day: d, dayName: dayNames[d - 1], meals });
    }
    return days;
  },

  _buildAllWeeks() {
    const N = 8;
    const all = [];
    for (let w = 1; w <= N; w++) all.push(this._buildWeek(w));
    return all;
  }
};

// 单人份：在双人份基础上把用量减半
function halfNumInStr(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/-?\d+(\.\d+)?/g, (m) => {
    const n = parseFloat(m);
    if (isNaN(n)) return m;
    let h = Math.round((n / 2) * 10) / 10;
    return String(h).endsWith('.0') ? String(Math.round(h)) : String(h);
  });
}

function scaleMenusToSingle(menus) {
  const clone = JSON.parse(JSON.stringify(menus));
  const fields = ['amount', 'grams', 'protein', 'calories'];
  clone.forEach(day => {
    ['breakfast', 'lunch', 'dinner', 'snack'].forEach(mt => {
      const meal = day.meals[mt];
      if (!meal) return;
      fields.forEach(f => { if (meal[f]) meal[f] = halfNumInStr(meal[f]); });
      if (meal.ingredients) meal.ingredients.forEach(ing => {
        ['amount', 'grams', 'protein'].forEach(f => { if (ing[f]) ing[f] = halfNumInStr(ing[f]); });
      });
    });
  });
  return clone;
}

recipes.allWeeklyMenus = recipes._buildAllWeeks();
recipes.allWeeklyMenusSingle = recipes.allWeeklyMenus.map(m => scaleMenusToSingle(m));

// 根据当前周数获取对应周的食谱（8周轮换）
// weekInRound: 1-N（一个周期最多按 8 周轮换）
// mode: 'double'（双人份，默认）| 'single'（单人份）
recipes.getWeeklyMenus = function(weekInRound, mode) {
  if (!weekInRound || weekInRound < 1) weekInRound = 1;
  const N = this.allWeeklyMenus.length; // 8
  const weekIdx = (weekInRound - 1) % N;
  const single = mode === 'single';
  return single ? this.allWeeklyMenusSingle[weekIdx] : this.allWeeklyMenus[weekIdx];
};

// 获取当前是第几周（从store中获取）
recipes.getCurrentWeekMenus = function() {
  const week = (window.__store?.state?.currentWeek) || 1;
  const mode = (window.__store?.state?.appMode) || 'double';
  return this.getWeeklyMenus(week, mode);
};
