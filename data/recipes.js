// 食谱数据（家常减脂健身版 · v65d）
// 设计目标（回归初心：家常、不花里胡哨、适合自己做饭）：
//  - 减脂健身框架：足量蛋白 + 适量主食（也可用水果/坚果替代部分主食）+ 足量蔬菜
//  - 烹饪以蒸、煮、凉拌、少油快炒、家常小炒为主，清淡少油
//  - 全部为普通人家里随手能做的一日三餐；三文鱼（买鱼柳煎）、牛油果（切开即食）、藜麦（煮饭一样煮）属日常买来即做的食材，保留
//  - 仅去除“豆腐脑”这类需要自己磨浆点卤、几乎不会在家自制的菜
//  - 每周 7 天不重样，相邻周不同，循环 8 周后再重复
//  - 蛋白质/蔬菜种类丰富（香菇、蒜毫/蒜苗、油麦菜、秋葵、荷兰豆、紫甘蓝、木耳、海带…）

export const recipes = {
  meta: {
    framework: "足量蛋白 + 适量主食 + 足量蔬菜",
    cookingPrinciple: "蒸、煮、凉拌、少油快炒、家常小炒为主，清淡少油，食材好买好做",
    portionGuide: {
      protein: "每餐100-150g（1个手掌大小和厚度）",
      carb: "每餐50-80g生重（1个拳头大小）",
      vegetable: "每餐200g+（2个拳头大小）",
      oil: "每天20-25g（2瓷勺以内）"
    },
    proteinTarget: "每公斤体重1.6-2.2g/天"
  },

  // ===== 菜品池（每道都是完整的一餐，家常、食材精简、好上手）=====
  pools: {
    breakfast: [
      {
        mealType: "早餐", name: "水煮蛋燕麦粥配苹果", totalTime: "10分钟", calories: "约620大卡", protein: "约46g",
        ingredients: [
          { name: "鸡蛋", amount: "4个", grams: "200g", fist: "1个手掌", protein: "25g", category: "protein" },
          { name: "燕麦片", amount: "80g", grams: "80g", fist: "0.8个拳头", protein: "10g", category: "carb" },
          { name: "苹果", amount: "1个", grams: "200g", fist: "0.5个拳头", protein: "1.2g", category: "fruit" }
        ],
        steps: ["锅中加水烧开，放入燕麦片小火煮5分钟", "鸡蛋另锅煮7-10分钟", "燕麦粥盛碗，苹果切块摆旁"],
        tips: "燕麦选纯燕麦片，煮蛋少油。"
      },
      {
        mealType: "早餐", name: "牛奶全麦面包配香蕉", totalTime: "5分钟", calories: "约640大卡", protein: "约44g",
        ingredients: [
          { name: "牛奶", amount: "400ml", grams: "400g", fist: "0.7杯", protein: "12.8g", category: "protein" },
          { name: "全麦面包", amount: "2片", grams: "70g", fist: "0.5个拳头", protein: "6.3g", category: "carb" },
          { name: "香蕉", amount: "1根", grams: "120g", fist: "0.5个拳头", protein: "1.3g", category: "fruit" }
        ],
        steps: ["全麦面包稍微烤一下", "配牛奶和香蕉食用"],
        tips: "全麦粉排第一才是真全麦。"
      },
      {
        mealType: "早餐", name: "红薯泥配煎蛋", totalTime: "15分钟", calories: "约620大卡", protein: "约44g",
        ingredients: [
          { name: "红薯", amount: "1个", grams: "200g", fist: "0.5个拳头", protein: "2.2g", category: "carb" },
          { name: "鸡蛋", amount: "3个", grams: "150g", fist: "0.8个手掌", protein: "18.9g", category: "protein" },
          { name: "菠菜", amount: "150g", grams: "150g", fist: "0.8个拳头", protein: "3.9g", category: "vegetable" }
        ],
        steps: ["红薯蒸熟压泥", "鸡蛋少油煎溏心", "菠菜焯水摆旁"],
        tips: "红薯替代精米面，升糖更平缓。"
      },
      {
        mealType: "早餐", name: "鸡胸蔬菜烘蛋", totalTime: "20分钟", calories: "约620大卡", protein: "约60g",
        ingredients: [
          { name: "鸡胸肉", amount: "150g", grams: "150g", fist: "0.6个手掌", protein: "35g", category: "protein" },
          { name: "鸡蛋", amount: "3个", grams: "150g", fist: "0.8个手掌", protein: "18.9g", category: "protein" },
          { name: "红黄彩椒", amount: "1个", grams: "150g", fist: "1个拳头", protein: "1.8g", category: "vegetable" }
        ],
        steps: ["鸡胸切丁用盐黑胡椒腌10分钟", "彩椒切丁与鸡蛋打散", "少油小火烘至凝固"],
        tips: "一道菜同时有蛋白和蔬菜。"
      },
      {
        mealType: "早餐", name: "玉米虾仁粥", totalTime: "20分钟", calories: "约580大卡", protein: "约48g",
        ingredients: [
          { name: "玉米", amount: "1根", grams: "150g", fist: "0.5个拳头", protein: "4.5g", category: "carb" },
          { name: "虾仁", amount: "150g", grams: "150g", fist: "0.5个手掌", protein: "29g", category: "protein" },
          { name: "鸡蛋", amount: "2个", grams: "100g", fist: "0.5个手掌", protein: "12.6g", category: "protein" }
        ],
        steps: ["玉米粒与米同煮成粥", "粥快好打入鸡蛋", "虾仁焯熟放入"],
        tips: "虾仁高蛋白低脂。"
      },
      {
        mealType: "早餐", name: "豆浆配鸡蛋蔬菜饼", totalTime: "15分钟", calories: "约560大卡", protein: "约42g",
        ingredients: [
          { name: "豆浆", amount: "400ml", grams: "400g", fist: "0.7杯", protein: "12g", category: "protein" },
          { name: "鸡蛋", amount: "3个", grams: "150g", fist: "0.8个手掌", protein: "18.9g", category: "protein" },
          { name: "西葫芦", amount: "100g", grams: "100g", fist: "0.5个拳头", protein: "1.2g", category: "vegetable" }
        ],
        steps: ["西葫芦擦丝与鸡蛋调糊", "少油小火煎薄饼", "配豆浆"],
        tips: "蔬菜饼藏着蔬菜。"
      },
      {
        mealType: "早餐", name: "小米南瓜粥配蒸蛋", totalTime: "20分钟", calories: "约540大卡", protein: "约42g",
        ingredients: [
          { name: "小米", amount: "80g", grams: "80g", fist: "0.6个拳头", protein: "9g", category: "carb" },
          { name: "南瓜", amount: "200g", grams: "200g", fist: "1个拳头", protein: "2g", category: "vegetable" },
          { name: "鸡蛋", amount: "4个", grams: "200g", fist: "1个手掌", protein: "25.2g", category: "protein" }
        ],
        steps: ["小米南瓜同煮成粥", "鸡蛋蒸成蛋羹"],
        tips: "小米养胃，早餐暖身。"
      },
      {
        mealType: "早餐", name: "杂粮包配水煮蛋牛奶", totalTime: "10分钟", calories: "约640大卡", protein: "约37g",
        ingredients: [
          { name: "杂粮包", amount: "2个", grams: "100g", fist: "0.7个拳头", protein: "8g", category: "carb" },
          { name: "鸡蛋", amount: "3个", grams: "150g", fist: "0.8个手掌", protein: "18.9g", category: "protein" },
          { name: "牛奶", amount: "300ml", grams: "300g", fist: "0.5杯", protein: "9.6g", category: "protein" }
        ],
        steps: ["杂粮包蒸热", "鸡蛋水煮", "配牛奶"],
        tips: "家常早餐，碳水蛋白都有了。"
      },
      {
        mealType: "早餐", name: "紫薯酸奶杯", totalTime: "10分钟", calories: "约560大卡", protein: "约38g",
        ingredients: [
          { name: "紫薯", amount: "1个", grams: "200g", fist: "0.5个拳头", protein: "2.4g", category: "carb" },
          { name: "希腊酸奶", amount: "250g", grams: "250g", fist: "0.7杯", protein: "25g", category: "protein" },
          { name: "蓝莓", amount: "100g", grams: "100g", fist: "0.5个拳头", protein: "0.6g", category: "fruit" }
        ],
        steps: ["紫薯蒸熟压泥铺底", "倒酸奶撒蓝莓"],
        tips: "紫薯富含花青素。"
      },
      {
        mealType: "早餐", name: "馒头片夹煎蛋配牛奶", totalTime: "10分钟", calories: "约550大卡", protein: "约32g",
        ingredients: [
          { name: "馒头", amount: "2个", grams: "100g", fist: "0.7个拳头", protein: "7g", category: "carb" },
          { name: "鸡蛋", amount: "3个", grams: "150g", fist: "0.8个手掌", protein: "18.9g", category: "protein" },
          { name: "牛奶", amount: "200ml", grams: "200g", fist: "0.4杯", protein: "6.4g", category: "protein" }
        ],
        steps: ["馒头切片少油煎脆", "鸡蛋水煮切片夹入", "配牛奶"],
        tips: "馒头鸡蛋最家常。"
      },
      {
        mealType: "早餐", name: "糙米鸡肉饭团", totalTime: "25分钟", calories: "约620大卡", protein: "约56g",
        ingredients: [
          { name: "糙米", amount: "100g生", grams: "100g", fist: "0.7个拳头", protein: "11g", category: "carb" },
          { name: "鸡胸肉", amount: "150g", grams: "150g", fist: "0.6个手掌", protein: "35g", category: "protein" },
          { name: "西兰花", amount: "150g", grams: "150g", fist: "0.8个拳头", protein: "4.2g", category: "vegetable" }
        ],
        steps: ["糙米煮熟", "鸡胸煮熟撕条", "西兰花焯水，拌饭捏团"],
        tips: "糙米GI低。"
      },
      {
        mealType: "早餐", name: "牛油果蛋吐司", totalTime: "10分钟", calories: "约620大卡", protein: "约42g",
        ingredients: [
          { name: "全麦面包", amount: "2片", grams: "70g", fist: "0.5个拳头", protein: "6.3g", category: "carb" },
          { name: "鸡蛋", amount: "3个", grams: "150g", fist: "0.8个手掌", protein: "18.9g", category: "protein" },
          { name: "牛油果", amount: "半个", grams: "100g", fist: "0.3个拳头", protein: "2g", category: "fruit" }
        ],
        steps: ["面包烤脆", "鸡蛋水煮", "牛油果压泥涂面包"],
        tips: "牛油果提供优质脂肪，切开即食。"
      }
    ],

    lunch: [
      {
        mealType: "午餐", name: "鸡胸肉炒西兰花配米饭", totalTime: "20分钟", calories: "约760大卡", protein: "约74g",
        ingredients: [
          { name: "鸡胸肉", amount: "200g", grams: "200g", fist: "0.8个手掌", protein: "56g", category: "protein" },
          { name: "米饭", amount: "1.5碗", grams: "熟250g", fist: "0.8个拳头", protein: "6.5g", category: "carb" },
          { name: "西兰花", amount: "300g", grams: "300g", fist: "1.5个拳头", protein: "8.4g", category: "vegetable" }
        ],
        steps: ["鸡胸切丁少油快炒", "西兰花焯水后同炒调味", "同时煮米饭"],
        tips: "鸡胸切丁更嫩。"
      },
      {
        mealType: "午餐", name: "番茄牛肉盖饭", totalTime: "30分钟", calories: "约820大卡", protein: "约66g",
        ingredients: [
          { name: "牛肉", amount: "200g", grams: "200g", fist: "0.8个手掌", protein: "42g", category: "protein" },
          { name: "米饭", amount: "1.5碗", grams: "熟250g", fist: "0.8个拳头", protein: "6.5g", category: "carb" },
          { name: "番茄", amount: "2个", grams: "300g", fist: "1.5个拳头", protein: "2.4g", category: "vegetable" }
        ],
        steps: ["牛肉切片腌10分钟", "番茄炒出汁下牛肉", "浇饭"],
        tips: "番茄提味少放油。"
      },
      {
        mealType: "午餐", name: "清蒸鱼配红薯油麦菜", totalTime: "25分钟", calories: "约680大卡", protein: "约58g",
        ingredients: [
          { name: "龙利鱼/巴沙鱼", amount: "200g", grams: "200g", fist: "0.7个手掌", protein: "40g", category: "protein" },
          { name: "红薯", amount: "1个", grams: "200g", fist: "0.5个拳头", protein: "2.2g", category: "carb" },
          { name: "油麦菜", amount: "250g", grams: "250g", fist: "1.2个拳头", protein: "4.3g", category: "vegetable" }
        ],
        steps: ["红薯蒸熟", "鱼块蒸8分钟淋豉油", "油麦菜焯水拌蒜蓉"],
        tips: "清蒸少油健康。"
      },
      {
        mealType: "午餐", name: "虾仁炒蛋配糙米", totalTime: "20分钟", calories: "约740大卡", protein: "约68g",
        ingredients: [
          { name: "虾仁", amount: "200g", grams: "200g", fist: "0.8个手掌", protein: "38g", category: "protein" },
          { name: "鸡蛋", amount: "3个", grams: "150g", fist: "0.8个手掌", protein: "18.9g", category: "protein" },
          { name: "糙米", amount: "100g生", grams: "100g", fist: "0.7个拳头", protein: "11g", category: "carb" }
        ],
        steps: ["糙米煮熟", "鸡蛋炒散下虾仁", "调味"],
        tips: "糙米替代白米。"
      },
      {
        mealType: "午餐", name: "清蒸豆腐配米饭小白菜", totalTime: "20分钟", calories: "约620大卡", protein: "约48g",
        ingredients: [
          { name: "豆腐", amount: "350g", grams: "350g", fist: "0.9个手掌", protein: "38g", category: "protein" },
          { name: "米饭", amount: "1.5碗", grams: "熟250g", fist: "0.8个拳头", protein: "6.5g", category: "carb" },
          { name: "小白菜", amount: "200g", grams: "200g", fist: "1个拳头", protein: "4.4g", category: "vegetable" }
        ],
        steps: ["豆腐切块蒸8分钟淋生抽", "小白菜焯水", "配米饭"],
        tips: "清淡植物蛋白，家常好做。"
      },
      {
        mealType: "午餐", name: "少油鸡腿炒西兰花", totalTime: "30分钟", calories: "约760大卡", protein: "约58g",
        ingredients: [
          { name: "鸡腿（去皮）", amount: "200g", grams: "200g", fist: "0.7个手掌", protein: "40g", category: "protein" },
          { name: "米饭", amount: "1.5碗", grams: "熟250g", fist: "0.8个拳头", protein: "6.5g", category: "carb" },
          { name: "西兰花", amount: "200g", grams: "200g", fist: "1个拳头", protein: "5.6g", category: "vegetable" }
        ],
        steps: ["鸡腿去皮切块少油煎", "西兰花焯水同炒", "配米饭"],
        tips: "去皮减脂。"
      },
      {
        mealType: "午餐", name: "瘦肉炒荷兰豆", totalTime: "20分钟", calories: "约720大卡", protein: "约62g",
        ingredients: [
          { name: "瘦猪肉", amount: "180g", grams: "180g", fist: "0.7个手掌", protein: "36g", category: "protein" },
          { name: "米饭", amount: "1.5碗", grams: "熟250g", fist: "0.8个拳头", protein: "6.5g", category: "carb" },
          { name: "荷兰豆", amount: "250g", grams: "250g", fist: "1.2个拳头", protein: "5g", category: "vegetable" }
        ],
        steps: ["瘦肉切丝腌", "荷兰豆焯水快炒", "配米饭"],
        tips: "荷兰豆脆嫩。"
      },
      {
        mealType: "午餐", name: "清蒸鲈鱼配米饭菜心", totalTime: "25分钟", calories: "约630大卡", protein: "约57g",
        ingredients: [
          { name: "鲈鱼", amount: "250g", grams: "250g", fist: "0.8个手掌", protein: "47g", category: "protein" },
          { name: "米饭", amount: "1.5碗", grams: "熟250g", fist: "0.8个拳头", protein: "6.5g", category: "carb" },
          { name: "菜心", amount: "250g", grams: "250g", fist: "1.2个拳头", protein: "4.3g", category: "vegetable" }
        ],
        steps: ["鲈鱼洗净蒸8分钟淋豉油", "米饭同煮", "菜心焯水拌蒜蓉"],
        tips: "清蒸鱼最家常也最省油。"
      },
      {
        mealType: "午餐", name: "蛤蜊冬瓜汤面", totalTime: "25分钟", calories: "约680大卡", protein: "约58g",
        ingredients: [
          { name: "蛤蜊", amount: "300g", grams: "300g", fist: "1.2个手掌", protein: "36g", category: "protein" },
          { name: "全麦面", amount: "120g", grams: "120g", fist: "0.8个拳头", protein: "14g", category: "carb" },
          { name: "冬瓜", amount: "250g", grams: "250g", fist: "1.2个拳头", protein: "1.5g", category: "vegetable" }
        ],
        steps: ["蛤蜊煮开口", "汤下冬瓜", "另煮全麦面放入"],
        tips: "汤鲜不需额外油。"
      },
      {
        mealType: "午餐", name: "鸭胸炒彩椒", totalTime: "25分钟", calories: "约720大卡", protein: "约60g",
        ingredients: [
          { name: "鸭胸（去皮）", amount: "200g", grams: "200g", fist: "0.7个手掌", protein: "40g", category: "protein" },
          { name: "米饭", amount: "1.5碗", grams: "熟250g", fist: "0.8个拳头", protein: "6.5g", category: "carb" },
          { name: "红黄彩椒", amount: "2个", grams: "300g", fist: "1.5个拳头", protein: "3.6g", category: "vegetable" }
        ],
        steps: ["鸭胸去皮切薄片少油煎", "彩椒翻炒", "配米饭"],
        tips: "去皮减脂。"
      },
      {
        mealType: "午餐", name: "清炖牛肉萝卜", totalTime: "35分钟", calories: "约760大卡", protein: "约60g",
        ingredients: [
          { name: "牛肉", amount: "200g", grams: "200g", fist: "0.8个手掌", protein: "42g", category: "protein" },
          { name: "米饭", amount: "1.5碗", grams: "熟250g", fist: "0.8个拳头", protein: "6.5g", category: "carb" },
          { name: "白萝卜", amount: "300g", grams: "300g", fist: "1.5个拳头", protein: "2.4g", category: "vegetable" }
        ],
        steps: ["牛肉焯水", "与萝卜同炖", "配米饭"],
        tips: "清炖少油。"
      },
      {
        mealType: "午餐", name: "金枪鱼拌饭配圣女果", totalTime: "15分钟", calories: "约540大卡", protein: "约48g",
        ingredients: [
          { name: "金枪鱼罐头", amount: "150g", grams: "150g", fist: "0.6个手掌", protein: "40g", category: "protein" },
          { name: "米饭", amount: "1.5碗", grams: "熟250g", fist: "0.8个拳头", protein: "6.5g", category: "carb" },
          { name: "圣女果", amount: "150g", grams: "150g", fist: "0.8个拳头", protein: "1.4g", category: "fruit" }
        ],
        steps: ["米饭盛碗", "金枪鱼铺上", "圣女果摆旁淋少许黑醋"],
        tips: "水浸金枪鱼更低脂，懒人快手饭。"
      },
      {
        mealType: "午餐", name: "香菇滑鸡饭", totalTime: "30分钟", calories: "约740大卡", protein: "约66g",
        ingredients: [
          { name: "鸡胸肉", amount: "200g", grams: "200g", fist: "0.8个手掌", protein: "56g", category: "protein" },
          { name: "米饭", amount: "1.5碗", grams: "熟250g", fist: "0.8个拳头", protein: "6.5g", category: "carb" },
          { name: "香菇（鲜）", amount: "150g", grams: "150g", fist: "0.8个拳头", protein: "4g", category: "vegetable" }
        ],
        steps: ["鸡片用蚝油腌", "香菇煸香滑炒", "配米饭"],
        tips: "鲜香菇提鲜。"
      },
      {
        mealType: "午餐", name: "毛豆炒肉丝", totalTime: "20分钟", calories: "约720大卡", protein: "约58g",
        ingredients: [
          { name: "瘦猪肉", amount: "180g", grams: "180g", fist: "0.7个手掌", protein: "36g", category: "protein" },
          { name: "米饭", amount: "1.5碗", grams: "熟250g", fist: "0.8个拳头", protein: "6.5g", category: "carb" },
          { name: "毛豆", amount: "200g", grams: "200g", fist: "1个拳头", protein: "20g", category: "vegetable" }
        ],
        steps: ["肉丝腌", "毛豆焯水", "少油快炒", "配米饭"],
        tips: "毛豆植物蛋白高。"
      },
      {
        mealType: "午餐", name: "海带豆腐汤", totalTime: "25分钟", calories: "约600大卡", protein: "约50g",
        ingredients: [
          { name: "豆腐", amount: "300g", grams: "300g", fist: "0.8个手掌", protein: "33g", category: "protein" },
          { name: "米饭", amount: "1.5碗", grams: "熟250g", fist: "0.8个拳头", protein: "6.5g", category: "carb" },
          { name: "海带", amount: "200g", grams: "200g", fist: "1个拳头", protein: "3.4g", category: "vegetable" }
        ],
        steps: ["豆腐海带同煮成汤", "少盐", "配米饭"],
        tips: "海带补碘，清淡。"
      },
      {
        mealType: "午餐", name: "香煎三文鱼配芦笋藜麦", totalTime: "25分钟", calories: "约780大卡", protein: "约70g",
        ingredients: [
          { name: "三文鱼", amount: "200g", grams: "200g", fist: "0.7个手掌", protein: "42g", category: "protein" },
          { name: "藜麦", amount: "80g生", grams: "80g", fist: "0.6个拳头", protein: "11g", category: "carb" },
          { name: "芦笋", amount: "200g", grams: "200g", fist: "1个拳头", protein: "4.4g", category: "vegetable" }
        ],
        steps: ["藜麦煮熟", "三文鱼少油每面煎3分钟", "芦笋焯水摆盘"],
        tips: "三文鱼买鱼柳煎即可，优质脂肪。"
      }
    ],

    dinner: [
      {
        mealType: "晚餐", name: "蒸鱼配红薯凉拌菠菜", totalTime: "25分钟", calories: "约660大卡", protein: "约58g",
        ingredients: [
          { name: "龙利鱼/巴沙鱼", amount: "200g", grams: "200g", fist: "0.7个手掌", protein: "40g", category: "protein" },
          { name: "红薯", amount: "1个", grams: "200g", fist: "0.5个拳头", protein: "2.2g", category: "carb" },
          { name: "菠菜", amount: "250g", grams: "250g", fist: "1.2个拳头", protein: "6.5g", category: "vegetable" }
        ],
        steps: ["红薯蒸熟", "鱼蒸8分钟", "菠菜焯水拌蒜蓉"],
        tips: "晚餐清淡。"
      },
      {
        mealType: "晚餐", name: "鸡胸蔬菜沙拉配红薯", totalTime: "20分钟", calories: "约560大卡", protein: "约65g",
        ingredients: [
          { name: "鸡胸肉", amount: "200g", grams: "200g", fist: "0.8个手掌", protein: "56g", category: "protein" },
          { name: "红薯", amount: "200g", grams: "200g", fist: "0.5个拳头", protein: "2.2g", category: "carb" },
          { name: "西兰花", amount: "200g", grams: "200g", fist: "1个拳头", protein: "5.6g", category: "vegetable" },
          { name: "圣女果", amount: "150g", grams: "150g", fist: "0.8个拳头", protein: "1.4g", category: "fruit" }
        ],
        steps: ["鸡胸煮熟撕条", "红薯蒸熟", "西兰花圣女果焯水拌油醋汁撒鸡丝"],
        tips: "沙拉用油醋，红薯当主食。"
      },
      {
        mealType: "晚餐", name: "牛肉炒芥蓝", totalTime: "20分钟", calories: "约680大卡", protein: "约56g",
        ingredients: [
          { name: "牛肉", amount: "150g", grams: "150g", fist: "0.6个手掌", protein: "31g", category: "protein" },
          { name: "糙米", amount: "80g生", grams: "80g", fist: "0.6个拳头", protein: "9g", category: "carb" },
          { name: "芥蓝", amount: "250g", grams: "250g", fist: "1.2个拳头", protein: "6.5g", category: "vegetable" }
        ],
        steps: ["牛肉腌", "糙米煮熟", "芥蓝快炒", "下牛肉"],
        tips: "晚餐少量主食。"
      },
      {
        mealType: "晚餐", name: "虾仁豆腐煲", totalTime: "25分钟", calories: "约680大卡", protein: "约62g",
        ingredients: [
          { name: "虾仁", amount: "180g", grams: "180g", fist: "0.7个手掌", protein: "34g", category: "protein" },
          { name: "豆腐", amount: "300g", grams: "300g", fist: "0.8个手掌", protein: "33g", category: "protein" },
          { name: "娃娃菜", amount: "200g", grams: "200g", fist: "1个拳头", protein: "3.6g", category: "vegetable" }
        ],
        steps: ["豆腐煎香", "加水虾仁娃娃菜煮", "调味"],
        tips: "双蛋白清淡。"
      },
      {
        mealType: "晚餐", name: "蒸蛋羹配秋葵", totalTime: "20分钟", calories: "约560大卡", protein: "约56g",
        ingredients: [
          { name: "鸡蛋", amount: "5个", grams: "250g", fist: "1.2个手掌", protein: "31.5g", category: "protein" },
          { name: "杂粮饭", amount: "1碗", grams: "熟200g", fist: "0.7个拳头", protein: "6g", category: "carb" },
          { name: "秋葵", amount: "200g", grams: "200g", fist: "1个拳头", protein: "3.6g", category: "vegetable" },
          { name: "香菇（鲜）", amount: "150g", grams: "150g", fist: "0.8个拳头", protein: "4g", category: "vegetable" }
        ],
        steps: ["鸡蛋蒸羹", "秋葵香菇焯水摆旁", "配杂粮饭"],
        tips: "蒸蛋更嫩。"
      },
      {
        mealType: "晚餐", name: "瘦肉炒莴笋", totalTime: "20分钟", calories: "约660大卡", protein: "约56g",
        ingredients: [
          { name: "瘦猪肉", amount: "180g", grams: "180g", fist: "0.7个手掌", protein: "36g", category: "protein" },
          { name: "红薯", amount: "1个", grams: "200g", fist: "0.5个拳头", protein: "2.2g", category: "carb" },
          { name: "莴笋", amount: "300g", grams: "300g", fist: "1.5个拳头", protein: "3g", category: "vegetable" }
        ],
        steps: ["瘦肉切丝腌", "红薯蒸熟", "莴笋快炒", "下肉丝"],
        tips: "莴笋清脆。"
      },
      {
        mealType: "晚餐", name: "瘦肉蔬菜卷饼", totalTime: "20分钟", calories: "约560大卡", protein: "约44g",
        ingredients: [
          { name: "瘦猪肉", amount: "150g", grams: "150g", fist: "0.6个手掌", protein: "30g", category: "protein" },
          { name: "全麦饼", amount: "2张", grams: "100g", fist: "0.7个拳头", protein: "10g", category: "carb" },
          { name: "黄瓜", amount: "1根", grams: "200g", fist: "1个拳头", protein: "1.8g", category: "vegetable" },
          { name: "生菜", amount: "120g", grams: "120g", fist: "0.6个拳头", protein: "1.9g", category: "vegetable" }
        ],
        steps: ["瘦肉切丝少油炒熟", "黄瓜生菜切丝", "铺全麦饼卷起"],
        tips: "一卷搞定，孩子也爱吃。"
      },
      {
        mealType: "晚餐", name: "白灼虾配空心菜", totalTime: "20分钟", calories: "约640大卡", protein: "约58g",
        ingredients: [
          { name: "虾", amount: "200g", grams: "200g", fist: "0.7个手掌", protein: "38g", category: "protein" },
          { name: "米饭", amount: "1碗", grams: "熟200g", fist: "0.7个拳头", protein: "5.2g", category: "carb" },
          { name: "空心菜", amount: "300g", grams: "300g", fist: "1.5个拳头", protein: "6.6g", category: "vegetable" }
        ],
        steps: ["虾白灼", "空心菜焯水拌蒜蓉", "配米饭"],
        tips: "白灼最省油。"
      },
      {
        mealType: "晚餐", name: "豆腐菌菇汤", totalTime: "25分钟", calories: "约560大卡", protein: "约50g",
        ingredients: [
          { name: "豆腐", amount: "300g", grams: "300g", fist: "0.8个手掌", protein: "33g", category: "protein" },
          { name: "糙米", amount: "80g生", grams: "80g", fist: "0.6个拳头", protein: "9g", category: "carb" },
          { name: "金针菇", amount: "200g", grams: "200g", fist: "1个拳头", protein: "5.4g", category: "vegetable" },
          { name: "水发木耳", amount: "100g", grams: "100g", fist: "0.5个拳头", protein: "1.2g", category: "vegetable" }
        ],
        steps: ["糙米煮熟", "金针菇木耳与豆腐煮汤"],
        tips: "菌菇提鲜不放油。"
      },
      {
        mealType: "晚餐", name: "鸡腿蔬菜汤", totalTime: "30分钟", calories: "约680大卡", protein: "约52g",
        ingredients: [
          { name: "鸡腿（去皮）", amount: "1个", grams: "200g", fist: "0.7个手掌", protein: "40g", category: "protein" },
          { name: "玉米", amount: "半根", grams: "75g", fist: "0.3个拳头", protein: "2.3g", category: "vegetable" },
          { name: "西葫芦", amount: "200g", grams: "200g", fist: "1个拳头", protein: "2.4g", category: "vegetable" }
        ],
        steps: ["鸡腿去皮焯水", "与玉米西葫芦炖", "少盐"],
        tips: "去皮鸡汤暖胃。"
      },
      {
        mealType: "晚餐", name: "蛤蜊蒸蛋", totalTime: "20分钟", calories: "约620大卡", protein: "约54g",
        ingredients: [
          { name: "蛤蜊", amount: "200g", grams: "200g", fist: "0.8个手掌", protein: "24g", category: "protein" },
          { name: "鸡蛋", amount: "4个", grams: "200g", fist: "1个手掌", protein: "25.2g", category: "protein" },
          { name: "米饭", amount: "1碗", grams: "熟200g", fist: "0.7个拳头", protein: "5.2g", category: "carb" }
        ],
        steps: ["蛤蜊煮开口取肉", "鸡蛋蒸半凝固铺蛤蜊", "配米饭"],
        tips: "鲜味无需味精。"
      },
      {
        mealType: "晚餐", name: "鸭胸炒韭菜配米饭", totalTime: "20分钟", calories: "约560大卡", protein: "约40g",
        ingredients: [
          { name: "鸭胸（去皮）", amount: "150g", grams: "150g", fist: "0.5个手掌", protein: "30g", category: "protein" },
          { name: "米饭", amount: "1碗", grams: "熟200g", fist: "0.7个拳头", protein: "5.2g", category: "carb" },
          { name: "韭菜", amount: "200g", grams: "200g", fist: "1个拳头", protein: "4.4g", category: "vegetable" }
        ],
        steps: ["鸭胸去皮切丝煎", "米饭煮熟", "韭菜快炒下鸭丝"],
        tips: "韭菜炒肉丝最家常。"
      },
      {
        mealType: "晚餐", name: "金枪鱼蔬菜沙拉配全麦面包", totalTime: "15分钟", calories: "约620大卡", protein: "约56g",
        ingredients: [
          { name: "金枪鱼罐头", amount: "150g", grams: "150g", fist: "0.6个手掌", protein: "40g", category: "protein" },
          { name: "全麦面包", amount: "2片", grams: "70g", fist: "0.5个拳头", protein: "6.3g", category: "carb" },
          { name: "生菜", amount: "150g", grams: "150g", fist: "0.8个拳头", protein: "1.9g", category: "vegetable" },
          { name: "圣女果", amount: "150g", grams: "150g", fist: "0.8个拳头", protein: "1.4g", category: "fruit" }
        ],
        steps: ["生菜撕小", "金枪鱼铺上", "淋油醋汁配面包"],
        tips: "快手晚餐。"
      },
      {
        mealType: "晚餐", name: "木耳炒蛋配杂粮饭", totalTime: "20分钟", calories: "约600大卡", protein: "约52g",
        ingredients: [
          { name: "鸡蛋", amount: "4个", grams: "200g", fist: "1个手掌", protein: "25.2g", category: "protein" },
          { name: "杂粮饭", amount: "1碗", grams: "熟200g", fist: "0.7个拳头", protein: "6g", category: "carb" },
          { name: "水发木耳", amount: "150g", grams: "150g", fist: "0.8个拳头", protein: "1.8g", category: "vegetable" },
          { name: "黄瓜", amount: "1根", grams: "200g", fist: "1个拳头", protein: "1.8g", category: "vegetable" }
        ],
        steps: ["鸡蛋炒散", "木耳黄瓜翻炒", "配杂粮饭"],
        tips: "木耳清肠。"
      },
      {
        mealType: "晚餐", name: "瘦肉番茄鸡蛋面", totalTime: "20分钟", calories: "约690大卡", protein: "约49g",
        ingredients: [
          { name: "瘦猪肉", amount: "100g", grams: "100g", fist: "0.4个手掌", protein: "20g", category: "protein" },
          { name: "番茄", amount: "2个", grams: "300g", fist: "1.5个拳头", protein: "2.4g", category: "vegetable" },
          { name: "鸡蛋", amount: "2个", grams: "100g", fist: "0.5个手掌", protein: "12.6g", category: "protein" },
          { name: "全麦面", amount: "100g", grams: "100g", fist: "0.7个拳头", protein: "14g", category: "carb" }
        ],
        steps: ["全麦面煮熟", "番茄炒出汁下肉丝鸡蛋", "浇面"],
        tips: "一碗面搞定晚餐。"
      },
      {
        mealType: "晚餐", name: "三文鱼蔬菜卷", totalTime: "25分钟", calories: "约620大卡", protein: "约54g",
        ingredients: [
          { name: "三文鱼", amount: "150g", grams: "150g", fist: "0.5个手掌", protein: "31g", category: "protein" },
          { name: "全麦饼", amount: "2张", grams: "100g", fist: "0.7个拳头", protein: "10g", category: "carb" },
          { name: "黄瓜", amount: "1根", grams: "200g", fist: "1个拳头", protein: "1.8g", category: "vegetable" },
          { name: "紫甘蓝", amount: "120g", grams: "120g", fist: "0.6个拳头", protein: "1.9g", category: "vegetable" }
        ],
        steps: ["三文鱼微煎切条", "黄瓜紫甘蓝切丝", "卷饼"],
        tips: "清爽适合晚餐，买来即做。"
      }
    ],

    snack: [
      {
        mealType: "加餐（休息日）", name: "香蕉+牛奶+蛋白粉", totalTime: "2分钟", calories: "约320大卡", protein: "约34g",
        ingredients: [
          { name: "香蕉", amount: "1根", grams: "120g", fist: "0.5个拳头", protein: "1.3g", category: "fruit" },
          { name: "牛奶", amount: "300ml", grams: "300g", fist: "0.5杯", protein: "9.6g", category: "protein" },
          { name: "蛋白粉", amount: "1勺", grams: "30g", fist: "—", protein: "24g", category: "protein" }
        ],
        steps: ["直接食用"],
        tips: "训练后30分钟内加餐。"
      },
      {
        mealType: "加餐（休息日）", name: "希腊酸奶+蓝莓+燕麦", totalTime: "3分钟", calories: "约340大卡", protein: "约32g",
        ingredients: [
          { name: "希腊酸奶", amount: "250g", grams: "250g", fist: "0.7杯", protein: "25g", category: "protein" },
          { name: "蓝莓", amount: "120g", grams: "120g", fist: "0.6个拳头", protein: "0.7g", category: "fruit" },
          { name: "燕麦片", amount: "40g", grams: "40g", fist: "0.4个拳头", protein: "5g", category: "carb" }
        ],
        steps: ["酸奶撒蓝莓燕麦"],
        tips: "低糖高蛋。"
      },
      {
        mealType: "加餐（休息日）", name: "水煮蛋+黄瓜", totalTime: "10分钟", calories: "约280大卡", protein: "约28g",
        ingredients: [
          { name: "鸡蛋", amount: "3个", grams: "150g", fist: "0.8个手掌", protein: "18.9g", category: "protein" },
          { name: "黄瓜", amount: "1根", grams: "200g", fist: "1个拳头", protein: "1.8g", category: "vegetable" }
        ],
        steps: ["鸡蛋煮熟", "黄瓜切条"],
        tips: "简单高蛋白。"
      },
      {
        mealType: "加餐（休息日）", name: "牛奶+全麦面包", totalTime: "2分钟", calories: "约300大卡", protein: "约26g",
        ingredients: [
          { name: "牛奶", amount: "300ml", grams: "300g", fist: "0.5杯", protein: "9.6g", category: "protein" },
          { name: "全麦面包", amount: "1片", grams: "35g", fist: "0.3个拳头", protein: "3g", category: "carb" }
        ],
        steps: ["直接食用"],
        tips: "便携蛋白加餐。"
      },
      {
        mealType: "加餐（休息日）", name: "坚果+酸奶", totalTime: "2分钟", calories: "约340大卡", protein: "约32g",
        ingredients: [
          { name: "无糖酸奶", amount: "250g", grams: "250g", fist: "0.7杯", protein: "7.5g", category: "protein" },
          { name: "混合坚果", amount: "20g", grams: "20g", fist: "—", protein: "4g", category: "vegetable" },
          { name: "蛋白粉", amount: "1勺", grams: "30g", fist: "—", protein: "24g", category: "protein" }
        ],
        steps: ["酸奶加蛋白粉搅匀撒坚果"],
        tips: "坚果补健康脂肪。"
      },
      {
        mealType: "加餐（休息日）", name: "蛋白棒+苹果", totalTime: "1分钟", calories: "约320大卡", protein: "约33g",
        ingredients: [
          { name: "蛋白棒", amount: "1根", grams: "60g", fist: "—", protein: "30g", category: "protein" },
          { name: "苹果", amount: "1个", grams: "200g", fist: "0.5个拳头", protein: "1.2g", category: "fruit" }
        ],
        steps: ["直接食用"],
        tips: "外出便携。"
      },
      {
        mealType: "加餐（休息日）", name: "白灼虾+牛奶", totalTime: "8分钟", calories: "约280大卡", protein: "约29g",
        ingredients: [
          { name: "虾", amount: "100g", grams: "100g", fist: "0.4个手掌", protein: "19g", category: "protein" },
          { name: "牛奶", amount: "300ml", grams: "300g", fist: "0.5杯", protein: "9.6g", category: "protein" }
        ],
        steps: ["虾白灼熟", "配牛奶"],
        tips: "优质蛋白加餐。"
      },
      {
        mealType: "加餐（休息日）", name: "水煮蛋+圣女果+牛奶", totalTime: "10分钟", calories: "约290大卡", protein: "约20g",
        ingredients: [
          { name: "鸡蛋", amount: "2个", grams: "100g", fist: "0.5个手掌", protein: "12.6g", category: "protein" },
          { name: "圣女果", amount: "120g", grams: "120g", fist: "0.6个拳头", protein: "1.1g", category: "fruit" },
          { name: "牛奶", amount: "200ml", grams: "200g", fist: "0.4杯", protein: "6.4g", category: "protein" }
        ],
        steps: ["鸡蛋煮熟", "圣女果洗净", "配牛奶"],
        tips: "轻食加餐。"
      },
      {
        mealType: "加餐（休息日）", name: "鸡胸沙拉+圣女果", totalTime: "10分钟", calories: "约240大卡", protein: "约34g",
        ingredients: [
          { name: "鸡胸肉", amount: "100g", grams: "100g", fist: "0.4个手掌", protein: "28g", category: "protein" },
          { name: "生菜", amount: "120g", grams: "120g", fist: "0.6个拳头", protein: "1.9g", category: "vegetable" },
          { name: "圣女果", amount: "120g", grams: "120g", fist: "0.6个拳头", protein: "1.1g", category: "fruit" }
        ],
        steps: ["鸡胸煮熟撕条", "蔬菜拌油醋汁撒鸡丝"],
        tips: "纯蛋白加餐。"
      },
      {
        mealType: "加餐（休息日）", name: "毛豆+玉米", totalTime: "15分钟", calories: "约320大卡", protein: "约28g",
        ingredients: [
          { name: "毛豆", amount: "150g", grams: "150g", fist: "0.8个拳头", protein: "15g", category: "vegetable" },
          { name: "玉米", amount: "半根", grams: "75g", fist: "0.3个拳头", protein: "2.3g", category: "vegetable" },
          { name: "牛奶", amount: "200ml", grams: "200g", fist: "0.4杯", protein: "6.4g", category: "protein" }
        ],
        steps: ["毛豆玉米煮熟", "配牛奶"],
        tips: "植物蛋白+钙。"
      },
      {
        mealType: "加餐（休息日）", name: "希腊酸奶+奇亚籽", totalTime: "3分钟", calories: "约320大卡", protein: "约30g",
        ingredients: [
          { name: "希腊酸奶", amount: "250g", grams: "250g", fist: "0.7杯", protein: "25g", category: "protein" },
          { name: "奇亚籽", amount: "15g", grams: "15g", fist: "—", protein: "2.6g", category: "vegetable" },
          { name: "草莓", amount: "120g", grams: "120g", fist: "0.6个拳头", protein: "0.8g", category: "fruit" }
        ],
        steps: ["奇亚籽泡酸奶", "草莓摆上"],
        tips: "奇亚籽补纤维。"
      },
      {
        mealType: "加餐（休息日）", name: "虾仁+牛油果", totalTime: "8分钟", calories: "约300大卡", protein: "约28g",
        ingredients: [
          { name: "虾仁", amount: "100g", grams: "100g", fist: "0.4个手掌", protein: "19g", category: "protein" },
          { name: "牛油果", amount: "半个", grams: "100g", fist: "0.3个拳头", protein: "2g", category: "fruit" }
        ],
        steps: ["虾仁煮熟", "牛油果切片撒黑胡椒"],
        tips: "优质蛋白配好脂肪，懒人加餐。"
      }
    ]
  },

  // ===== 由菜品池确定性生成某一周的菜单 =====
  // 每周 7 天，每种餐型从池中取 7 道连续且不重复的菜；
  // 不同周用不同偏移(步进7)，保证相邻周不同、且循环 8 周后才重复。
  // 池长度 11 / 15 / 15 / 11 均与 STEP=7 互质，可保证 8 周各周完全不同。
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
