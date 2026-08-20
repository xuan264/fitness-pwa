// 食物营养数据库
// 数据来源：中国食物成分表（中国营养学会）常见值，单位 每100g
// 用于「食材替换」功能：同一类别内可互相替换

export const foodDatabase = {
  proteins: [
    { name: "鸡胸肉（生）", proteinPer100g: 23.3, caloriesPer100g: 133 },
    { name: "鸡蛋（全蛋）", proteinPer100g: 12.6, caloriesPer100g: 144 },
    { name: "瘦牛肉", proteinPer100g: 26.1, caloriesPer100g: 175 },
    { name: "龙利鱼/巴沙鱼", proteinPer100g: 20.0, caloriesPer100g: 83 },
    { name: "虾仁", proteinPer100g: 24.0, caloriesPer100g: 99 },
    { name: "北豆腐", proteinPer100g: 8.1, caloriesPer100g: 116 },
    { name: "牛奶", proteinPer100g: 3.2, caloriesPer100g: 54 },
    { name: "猪里脊", proteinPer100g: 26.0, caloriesPer100g: 155 },
    { name: "三文鱼", proteinPer100g: 22.0, caloriesPer100g: 208 },
    { name: "鸡蛋白", proteinPer100g: 11.6, caloriesPer100g: 48 },
    { name: "鳕鱼", proteinPer100g: 20.4, caloriesPer100g: 88 },
    { name: "牛里脊", proteinPer100g: 22.0, caloriesPer100g: 125 },
    { name: "鸡腿肉（去皮）", proteinPer100g: 19.0, caloriesPer100g: 121 },
    { name: "蛤蜊", proteinPer100g: 10.1, caloriesPer100g: 62 },
    { name: "鱿鱼", proteinPer100g: 15.0, caloriesPer100g: 92 },
    { name: "豆腐干", proteinPer100g: 16.0, caloriesPer100g: 140 },
    { name: "鹰嘴豆（熟）", proteinPer100g: 8.9, caloriesPer100g: 164 },
    { name: "鸭胸肉（去皮）", proteinPer100g: 19.0, caloriesPer100g: 135 },
    { name: "鲈鱼", proteinPer100g: 18.6, caloriesPer100g: 105 }
  ],
  carbs: [
    { name: "米饭（熟）", proteinPer100g: 2.6, caloriesPer100g: 116 },
    { name: "燕麦片", proteinPer100g: 13.0, caloriesPer100g: 367 },
    { name: "红薯", proteinPer100g: 1.1, caloriesPer100g: 99 },
    { name: "玉米", proteinPer100g: 4.0, caloriesPer100g: 112 },
    { name: "全麦面包", proteinPer100g: 9.0, caloriesPer100g: 247 },
    { name: "糙米（熟）", proteinPer100g: 3.0, caloriesPer100g: 110 },
    { name: "意面（熟）", proteinPer100g: 5.0, caloriesPer100g: 158 },
    { name: "土豆", proteinPer100g: 2.0, caloriesPer100g: 77 },
    { name: "藜麦（熟）", proteinPer100g: 4.4, caloriesPer100g: 120 },
    { name: "荞麦面（熟）", proteinPer100g: 3.5, caloriesPer100g: 110 },
    { name: "紫薯", proteinPer100g: 1.6, caloriesPer100g: 106 },
    { name: "贝贝南瓜", proteinPer100g: 1.0, caloriesPer100g: 26 },
    { name: "山药", proteinPer100g: 1.9, caloriesPer100g: 57 },
    { name: "杂粮饭（熟）", proteinPer100g: 2.8, caloriesPer100g: 115 }
  ],
  vegetables: [
    { name: "西兰花", proteinPer100g: 2.8, caloriesPer100g: 28 },
    { name: "菠菜", proteinPer100g: 2.6, caloriesPer100g: 24 },
    { name: "白菜", proteinPer100g: 1.3, caloriesPer100g: 17 },
    { name: "番茄", proteinPer100g: 0.9, caloriesPer100g: 18 },
    { name: "黄瓜", proteinPer100g: 0.8, caloriesPer100g: 15 },
    { name: "冬瓜", proteinPer100g: 0.3, caloriesPer100g: 10 },
    { name: "生菜", proteinPer100g: 1.4, caloriesPer100g: 15 },
    { name: "芹菜", proteinPer100g: 1.2, caloriesPer100g: 16 },
    { name: "芦笋", proteinPer100g: 2.6, caloriesPer100g: 22 },
    { name: "青椒", proteinPer100g: 1.0, caloriesPer100g: 22 },
    { name: "蒜毫/蒜苗", proteinPer100g: 2.1, caloriesPer100g: 35 },
    { name: "香菇（鲜）", proteinPer100g: 2.2, caloriesPer100g: 26 },
    { name: "金针菇", proteinPer100g: 2.4, caloriesPer100g: 32 },
    { name: "水发木耳", proteinPer100g: 1.5, caloriesPer100g: 21 },
    { name: "海带", proteinPer100g: 1.2, caloriesPer100g: 13 },
    { name: "油麦菜", proteinPer100g: 1.2, caloriesPer100g: 15 },
    { name: "茼蒿", proteinPer100g: 1.9, caloriesPer100g: 21 },
    { name: "绿豆芽", proteinPer100g: 1.8, caloriesPer100g: 18 },
    { name: "秋葵", proteinPer100g: 2.0, caloriesPer100g: 33 },
    { name: "红黄彩椒", proteinPer100g: 1.0, caloriesPer100g: 26 },
    { name: "娃娃菜", proteinPer100g: 1.0, caloriesPer100g: 12 },
    { name: "芥蓝", proteinPer100g: 2.8, caloriesPer100g: 22 },
    { name: "竹笋", proteinPer100g: 2.6, caloriesPer100g: 25 },
    { name: "莴笋", proteinPer100g: 1.0, caloriesPer100g: 15 },
    { name: "荷兰豆", proteinPer100g: 2.5, caloriesPer100g: 30 },
    { name: "毛豆", proteinPer100g: 13.1, caloriesPer100g: 131 },
    { name: "紫甘蓝", proteinPer100g: 1.4, caloriesPer100g: 25 },
    { name: "苦菊", proteinPer100g: 1.4, caloriesPer100g: 18 },
    { name: "西葫芦", proteinPer100g: 0.9, caloriesPer100g: 18 },
    { name: "白萝卜", proteinPer100g: 0.9, caloriesPer100g: 16 },
    { name: "小白菜", proteinPer100g: 1.5, caloriesPer100g: 15 },
    { name: "油菜", proteinPer100g: 1.8, caloriesPer100g: 20 },
    { name: "空心菜", proteinPer100g: 2.6, caloriesPer100g: 20 },
    { name: "韭菜", proteinPer100g: 2.4, caloriesPer100g: 29 },
    { name: "莲藕", proteinPer100g: 2.6, caloriesPer100g: 74 },
    { name: "胡萝卜", proteinPer100g: 1.0, caloriesPer100g: 39 },
    { name: "洋葱", proteinPer100g: 1.1, caloriesPer100g: 40 }
  ],
  fruits: [
    { name: "苹果", proteinPer100g: 0.3, caloriesPer100g: 53 },
    { name: "香蕉", proteinPer100g: 1.1, caloriesPer100g: 93 },
    { name: "橙子", proteinPer100g: 0.7, caloriesPer100g: 48 },
    { name: "蓝莓", proteinPer100g: 0.7, caloriesPer100g: 57 },
    { name: "猕猴桃", proteinPer100g: 1.1, caloriesPer100g: 61 },
    { name: "草莓", proteinPer100g: 0.7, caloriesPer100g: 32 },
    { name: "柚子", proteinPer100g: 0.8, caloriesPer100g: 42 },
    { name: "火龙果", proteinPer100g: 1.1, caloriesPer100g: 60 },
    { name: "木瓜", proteinPer100g: 0.4, caloriesPer100g: 29 }
  ]
};

// 类别 -> 默认一份用量（替换时用于生成新食材的用量/克数/拳头/蛋白）
export const swapDefaults = {
  protein:   { amount: "150g", grams: "150g", fist: "1个手掌" },
  carb:      { amount: "1个拳头", grams: "80g(生)", fist: "1个拳头" },
  vegetable: { amount: "200g", grams: "200g", fist: "2个拳头" },
  fruit:     { amount: "1个", grams: "150g", fist: "1个拳头" }
};
