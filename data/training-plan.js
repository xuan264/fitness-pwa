// 12周训练计划数据
// 基于 ACSM 2026 抗阻训练立场声明

export const trainingPlan = {
  meta: {
    totalWeeks: 12,
    source: "ACSM 2026 Resistance Training Position Stand",
    principles: [
      "渐进性超负荷：每1-2周尝试增加重量或次数",
      "接近力竭：每组最后2-3次应感到困难",
      "每肌群每周2-3次频率",
      "休息2-3分钟（复合动作）/ 60-90秒（孤立动作）"
    ]
  },

  phases: [
    // ========== 阶段一：基础适应期（1-4周）==========
    {
      id: "phase-1",
      name: "基础适应期",
      weeks: "第1-4周",
      weekRange: [1, 4],
      description: "学习正确动作模式，建立神经肌肉连接。此阶段力量增长主要来自神经适应，肌肉尚未明显增大——这是正常的。",
      schedule: "每周3次全身训练（周三/五/日），每次45-60分钟",
      frequency: 3,
      split: "full-body",
      focus: "动作学习、神经适应、基础力量",
      acsmParams: {
        setsPerMusclePerWeek: "8-10组",
        repsPerSet: "10-15次",
        intensity: "1RM的60-65%（感觉还能多做3-4次）",
        restInterval: "60-90秒",
        progressiveOverload: "每2周尝试增加1-2次或小幅加重"
      },
      workouts: [
        {
          day: 1,
          label: "全身训练A",
          warmup: [
            { name: "原地慢跑/开合跳", duration: "3分钟" },
            { name: "动态拉伸（髋部环绕、手臂环绕）", duration: "3分钟" },
            { name: "深蹲热身组（自重×10）", duration: "1组" }
          ],
          exercises: [
            {
              id: "goblet-squat",
              name: "高脚杯深蹲",
              category: "下肢/股四头肌",
              muscle: ["股四头肌", "臀大肌", "核心"],
              sets: 3, reps: "12-15", weight: "自重或8-12kg哑铃", rest: "90秒",
              cues: ["双脚与肩同宽，脚尖略外展", "双手捧哑铃于胸前", "下蹲至大腿与地面平行", "膝盖方向与脚尖一致", "起身时脚掌蹬地"],
              commonMistakes: ["膝盖内扣", "腰部过度前倾", "脚跟离地"],
              tempo: "3秒下蹲 - 1秒停顿 - 1秒起身",
              weeklyProgress: [
                { week: 1, sets: 2, reps: "12", weight: "自重", note: "学习动作，2组建立基础" },
                { week: 2, sets: 3, reps: "12", weight: "自重", note: "增加1组，容量提升" },
                { week: 3, sets: 3, reps: "15", weight: "自重", note: "增加次数，耐力适应" },
                { week: 4, sets: 3, reps: "12", weight: "8-12kg哑铃", note: "加重量减次数，强度提升" }
              ]
            },
            {
              id: "push-up",
              name: "俯卧撑",
              category: "上肢/胸",
              muscle: ["胸大肌", "三角肌前束", "肱三头肌"],
              sets: 3, reps: "8-12", weight: "自重（可跪姿降阶）", rest: "90秒",
              cues: ["双手与肩同宽，手掌在肩正下方", "身体从头到脚成一条直线", "下降至胸部接近地面", "核心收紧，不要塌腰"],
              commonMistakes: ["塌腰", "臀部过高", "下降不充分"],
              tempo: "2秒下降 - 1秒起身",
              weeklyProgress: [
                { week: 1, sets: 2, reps: "8", weight: "自重（或跪姿降阶）", note: "2组建立动作模式" },
                { week: 2, sets: 3, reps: "10", weight: "自重", note: "增加1组" },
                { week: 3, sets: 3, reps: "12", weight: "自重", note: "增加次数至上限" },
                { week: 4, sets: 3, reps: "10", weight: "自重（加背包负重）", note: "加轻度负重，次数回归" }
              ]
            },
            {
              id: "inverted-row",
              name: "反向划船（桌子/低杠）",
              category: "上肢/背",
              muscle: ["背阔肌", "菱形肌", "肱二头肌"],
              sets: 3, reps: "8-12", weight: "自重", rest: "90秒",
              cues: ["找一张稳固的桌子或低杠", "双手抓握，身体悬空伸直", "胸部拉向桌面/杠", "肩胛骨先收拢再拉"],
              commonMistakes: ["用手臂拉而非背部", "身体不直", "未全程控制"],
              tempo: "2秒拉 - 1秒回落",
              weeklyProgress: [
                { week: 1, sets: 2, reps: "8", weight: "自重", note: "2组学习发力模式" },
                { week: 2, sets: 3, reps: "10", weight: "自重", note: "增加1组" },
                { week: 3, sets: 3, reps: "12", weight: "自重", note: "增加次数至上限" },
                { week: 4, sets: 3, reps: "10", weight: "自重（加背包负重）", note: "加轻度负重" }
              ]
            },
            {
              id: "glute-bridge",
              name: "臀桥",
              category: "下肢/臀",
              muscle: ["臀大肌", "腘绳肌"],
              sets: 3, reps: "12-15", weight: "自重", rest: "60秒",
              cues: ["仰卧屈膝，双脚平踩地面", "臀部发力顶起至身体成直线", "顶峰收缩1秒", "缓慢下放"],
              commonMistakes: ["用腰顶而非臀部", "过度伸展腰椎"],
              tempo: "1秒顶起 - 1秒停顿 - 2秒下放",
              weeklyProgress: [
                { week: 1, sets: 2, reps: "12", weight: "自重", note: "2组激活臀肌" },
                { week: 2, sets: 3, reps: "12", weight: "自重", note: "增加1组" },
                { week: 3, sets: 3, reps: "15", weight: "自重", note: "增加次数" },
                { week: 4, sets: 3, reps: "12", weight: "自重（单腿变式）", note: "尝试单腿臀桥增加强度" }
              ]
            },
            {
              id: "plank",
              name: "平板支撑",
              category: "核心",
              muscle: ["腹横肌", "腹直肌", "核心整体"],
              sets: 3, reps: "30-45秒", weight: "自重", rest: "60秒",
              cues: ["前臂撑地，肘在肩正下方", "身体从头到脚成一条直线", "核心收紧，腹部不塌", "呼吸均匀，不要憋气"],
              commonMistakes: ["臀部抬高", "塌腰", "憋气"],
              tempo: "持续保持",
              weeklyProgress: [
                { week: 1, sets: 2, reps: "20秒", weight: "自重", note: "2组适应，20秒起步" },
                { week: 2, sets: 3, reps: "30秒", weight: "自重", note: "增加1组+10秒" },
                { week: 3, sets: 3, reps: "40秒", weight: "自重", note: "再增加10秒" },
                { week: 4, sets: 3, reps: "45秒", weight: "自重", note: "冲刺45秒" }
              ]
            },
            {
              id: "dead-bug",
              name: "死虫式",
              category: "核心",
              muscle: ["腹横肌", "核心稳定性"],
              sets: 3, reps: "每侧8-10次", weight: "自重", rest: "60秒",
              cues: ["仰卧，双臂伸向天花板，屈膝90度", "对侧手脚同时缓慢伸出", "腰部始终贴地", "缓慢收回，换另一侧"],
              commonMistakes: ["腰部离开地面", "动作过快"],
              tempo: "3秒伸出 - 1秒收回",
              weeklyProgress: [
                { week: 1, sets: 2, reps: "每侧6次", weight: "自重", note: "2组建立核心控制" },
                { week: 2, sets: 3, reps: "每侧8次", weight: "自重", note: "增加1组+次数" },
                { week: 3, sets: 3, reps: "每侧10次", weight: "自重", note: "增加至上限" },
                { week: 4, sets: 3, reps: "每侧10次", weight: "自重", note: "放慢节奏，增加控制时间" }
              ]
            }
          ],
          cooldown: [
            { name: "股四头肌拉伸", duration: "每侧30秒" },
            { name: "胸大肌门框拉伸", duration: "每侧30秒" },
            { name: "背阔肌拉伸", duration: "每侧30秒" }
          ]
        },
        {
          day: 2,
          label: "全身训练B",
          warmup: [
            { name: "原地慢跑/开合跳", duration: "3分钟" },
            { name: "动态拉伸", duration: "3分钟" },
            { name: "弓步热身组（自重×每侧5）", duration: "1组" }
          ],
          exercises: [
            {
              id: "lunge",
              name: "弓步蹲（交替）",
              category: "下肢",
              muscle: ["股四头肌", "臀大肌", "腘绳肌"],
              sets: 3, reps: "每侧10-12", weight: "自重", rest: "90秒",
              cues: ["前脚跨一大步", "后膝下沉接近地面", "前膝不超过脚尖太多", "蹬回起始位"],
              commonMistakes: ["前膝内扣", "步幅太小变成半蹲"],
              tempo: "2秒下 - 1秒起",
              weeklyProgress: [
                { week: 1, sets: 2, reps: "每侧8次", weight: "自重", note: "2组学习平衡与动作" },
                { week: 2, sets: 3, reps: "每侧10次", weight: "自重", note: "增加1组+次数" },
                { week: 3, sets: 3, reps: "每侧12次", weight: "自重", note: "增加次数至上限" },
                { week: 4, sets: 3, reps: "每侧10次", weight: "持哑铃3-5kg", note: "加轻度负重" }
              ]
            },
            {
              id: "db-press-p1",
              name: "哑铃肩推（坐姿）",
              category: "上肢/肩",
              muscle: ["三角肌", "肱三头肌", "上斜方肌"],
              sets: 3, reps: "10-12", weight: "3-8kg哑铃", rest: "90秒",
              cues: ["坐直，双脚踩稳", "哑铃在肩两侧", "推举过头至手臂伸直", "控制下落"],
              commonMistakes: ["腰部过度前凸", "推到后面而非正上方"],
              tempo: "1秒推 - 2秒落",
              weeklyProgress: [
                { week: 1, sets: 2, reps: "12", weight: "3kg哑铃", note: "2组学习推举动作" },
                { week: 2, sets: 3, reps: "10", weight: "5kg哑铃", note: "增加1组+重量" },
                { week: 3, sets: 3, reps: "12", weight: "5kg哑铃", note: "增加次数" },
                { week: 4, sets: 3, reps: "10", weight: "8kg哑铃", note: "加重量，次数回归" }
              ]
            },
            {
              id: "band-pulldown",
              name: "弹力带下拉",
              category: "上肢/背",
              muscle: ["背阔肌", "肱二头肌"],
              sets: 3, reps: "12-15", weight: "中等弹力带", rest: "60秒",
              cues: ["弹力带挂高处", "跪地双手抓握", "拉向锁骨", "肩胛骨先下沉再拉"],
              commonMistakes: ["完全用手臂拉", "身体过度后仰"],
              tempo: "2秒拉 - 1秒回",
              weeklyProgress: [
                { week: 1, sets: 2, reps: "12", weight: "轻弹力带", note: "2组学习下拉发力" },
                { week: 2, sets: 3, reps: "12", weight: "中等弹力带", note: "增加1组+阻力" },
                { week: 3, sets: 3, reps: "15", weight: "中等弹力带", note: "增加次数" },
                { week: 4, sets: 3, reps: "12", weight: "较重弹力带", note: "增加阻力" }
              ]
            },
            {
              id: "rdl-p1",
              name: "罗马尼亚硬拉（哑铃）",
              category: "下肢/后链",
              muscle: ["腘绳肌", "臀大肌", "竖脊肌"],
              sets: 3, reps: "10-12", weight: "8-15kg哑铃", rest: "90秒",
              cues: ["微屈膝，髋部后推", "哑铃沿大腿前侧下滑", "感受腘绳肌拉伸", "臀部发力起身"],
              commonMistakes: ["弯腰而非屈髋", "膝盖过度弯曲变成深蹲"],
              tempo: "3秒下 - 1秒起",
              weeklyProgress: [
                { week: 1, sets: 2, reps: "12", weight: "8kg哑铃", note: "2组学习屈髋模式" },
                { week: 2, sets: 3, reps: "10", weight: "12kg哑铃", note: "增加1组+重量" },
                { week: 3, sets: 3, reps: "12", weight: "12kg哑铃", note: "增加次数" },
                { week: 4, sets: 3, reps: "10", weight: "15kg哑铃", note: "加重，次数回归" }
              ]
            },
            {
              id: "side-plank",
              name: "侧平板支撑",
              category: "核心",
              muscle: ["腹斜肌", "核心稳定性"],
              sets: 3, reps: "每侧20-30秒", weight: "自重", rest: "60秒",
              cues: ["侧卧，前臂撑地", "髋部顶起成直线", "保持稳定不晃"],
              commonMistakes: ["髋部下沉", "身体不直"],
              tempo: "持续保持",
              weeklyProgress: [
                { week: 1, sets: 2, reps: "每侧15秒", weight: "自重", note: "2组适应侧向稳定" },
                { week: 2, sets: 3, reps: "每侧20秒", weight: "自重", note: "增加1组+时间" },
                { week: 3, sets: 3, reps: "每侧25秒", weight: "自重", note: "增加时间" },
                { week: 4, sets: 3, reps: "每侧30秒", weight: "自重", note: "冲刺30秒" }
              ]
            }
          ],
          cooldown: [
            { name: "腘绳肌拉伸", duration: "每侧30秒" },
            { name: "肩部拉伸", duration: "每侧30秒" },
            { name: "小腿拉伸", duration: "每侧30秒" }
          ]
        },
        {
          day: 3,
          label: "全身训练C",
          warmup: [
            { name: "跳绳/开合跳", duration: "3分钟" },
            { name: "动态拉伸", duration: "3分钟" },
            { name: "俯卧撑热身组（自重×5）", duration: "1组" }
          ],
          exercises: [
            {
              id: "step-up",
              name: "登台阶（椅子/台阶）",
              category: "下肢",
              muscle: ["股四头肌", "臀大肌", "腘绳肌"],
              sets: 3, reps: "每侧10-12", weight: "自重或持哑铃", rest: "90秒",
              cues: ["一脚踩上稳固的椅子/台阶", "用该侧腿发力蹬起", "完全站直后缓慢下放", "控制下落，不要弹"],
              commonMistakes: ["用后腿蹬地借力", "下落太快"],
              tempo: "1秒上 - 2秒下",
              weeklyProgress: [
                { week: 1, sets: 2, reps: "每侧8次", weight: "自重", note: "2组学习动作" },
                { week: 2, sets: 3, reps: "每侧10次", weight: "自重", note: "增加1组+次数" },
                { week: 3, sets: 3, reps: "每侧12次", weight: "自重", note: "增加次数至上限" },
                { week: 4, sets: 3, reps: "每侧10次", weight: "持哑铃3-5kg", note: "加轻度负重" }
              ]
            },
            {
              id: "push-up-diamond",
              name: "钻石俯卧撑（或窄距）",
              category: "上肢/三头",
              muscle: ["肱三头肌", "胸大肌内侧", "三角肌前束"],
              sets: 3, reps: "6-10", weight: "自重", rest: "90秒",
              cues: ["双手食指拇指相触成菱形", "身体保持直线", "下降至胸部接近手背", "推起"],
              commonMistakes: ["手距过宽", "塌腰"],
              tempo: "2秒下 - 1秒上",
              weeklyProgress: [
                { week: 1, sets: 2, reps: "6", weight: "自重（或跪姿降阶）", note: "2组适应三头肌发力" },
                { week: 2, sets: 3, reps: "8", weight: "自重", note: "增加1组+次数" },
                { week: 3, sets: 3, reps: "10", weight: "自重", note: "增加次数至上限" },
                { week: 4, sets: 3, reps: "8", weight: "自重（加背包负重）", note: "加轻度负重" }
              ]
            },
            {
              id: "superman",
              name: "超人式（背部伸展）",
              category: "背/后链",
              muscle: ["竖脊肌", "臀大肌", "背阔肌"],
              sets: 3, reps: "12-15", weight: "自重", rest: "60秒",
              cues: ["俯卧，双臂向前伸直", "同时抬起手臂和对侧腿", "顶峰停1秒", "缓慢下放"],
              commonMistakes: ["动作过快", "抬得太高伤腰"],
              tempo: "1秒起 - 1秒停 - 2秒落",
              weeklyProgress: [
                { week: 1, sets: 2, reps: "10", weight: "自重", note: "2组激活后链" },
                { week: 2, sets: 3, reps: "12", weight: "自重", note: "增加1组+次数" },
                { week: 3, sets: 3, reps: "15", weight: "自重", note: "增加次数至上限" },
                { week: 4, sets: 3, reps: "15", weight: "自重", note: "顶峰停留2秒增加张力时间" }
              ]
            },
            {
              id: "bird-dog",
              name: "鸟狗式",
              category: "核心",
              muscle: ["核心稳定性", "竖脊肌", "臀大肌"],
              sets: 3, reps: "每侧8-10", weight: "自重", rest: "60秒",
              cues: ["四点跪姿，手在肩下膝在髋下", "对侧手脚同时伸出", "保持身体稳定不晃", "收回换另一侧"],
              commonMistakes: ["身体晃动", "腰部塌陷"],
              tempo: "2秒伸 - 1秒停 - 2秒收",
              weeklyProgress: [
                { week: 1, sets: 2, reps: "每侧6次", weight: "自重", note: "2组建立核心稳定" },
                { week: 2, sets: 3, reps: "每侧8次", weight: "自重", note: "增加1组+次数" },
                { week: 3, sets: 3, reps: "每侧10次", weight: "自重", note: "增加次数至上限" },
                { week: 4, sets: 3, reps: "每侧10次", weight: "自重", note: "放慢节奏增加张力时间" }
              ]
            },
            {
              id: "hollow-hold",
              name: "空心支撑",
              category: "核心",
              muscle: ["腹直肌", "腹横肌"],
              sets: 3, reps: "15-30秒", weight: "自重", rest: "60秒",
              cues: ["仰卧，腰部贴地", "双腿伸直抬起约30度", "双臂伸直向脚尖方向", "保持全身紧绷"],
              commonMistakes: ["腰部离开地面", "腿抬太高"],
              tempo: "持续保持",
              weeklyProgress: [
                { week: 1, sets: 2, reps: "15秒", weight: "自重", note: "2组建立腹肌耐力" },
                { week: 2, sets: 3, reps: "20秒", weight: "自重", note: "增加1组+时间" },
                { week: 3, sets: 3, reps: "25秒", weight: "自重", note: "增加时间" },
                { week: 4, sets: 3, reps: "30秒", weight: "自重", note: "冲刺30秒" }
              ]
            }
          ],
          cooldown: [
            { name: "髋屈肌拉伸", duration: "每侧30秒" },
            { name: "下背拉伸（婴儿式）", duration: "30秒" },
            { name: "胸椎旋转拉伸", duration: "每侧30秒" }
          ]
        }
      ],
      cardio: {
        type: "中等强度持续有氧",
        frequency: "每周2-3次（非训练日或训练后）",
        duration: "20-30分钟",
        intensity: "微喘但能说话（最大心率60-70%）",
        options: ["快走", "慢跑", "骑车", "游泳", "跳绳（低强度）"]
      }
    },

    // ========== 阶段二：进阶期（5-8周）==========
    {
      id: "phase-2",
      name: "进阶期",
      weeks: "第5-8周",
      weekRange: [5, 8],
      description: "上下肢分化训练，增加训练容量和重量。此阶段肌肉开始可见增大（肌肥大启动），体脂开始下降。注意：腰部有不适时，硬拉改用更轻的哑铃，避免大重量。",
      schedule: "每周4次（周三/五/六/日），上下肢交替",
      frequency: 4,
      split: "upper-lower",
      focus: "肌肥大、力量提升、增加容量",
      acsmParams: {
        setsPerMusclePerWeek: "12-16组",
        repsPerSet: "8-12次",
        intensity: "1RM的65-75%（接近力竭，最后2-3次困难）",
        restInterval: "90秒-2分钟",
        progressiveOverload: "每周尝试增加1次或小幅加重1-2kg"
      },
      workouts: [
        {
          day: 1,
          label: "上肢A",
          warmup: [
            { name: "手臂环绕+肩部绕环", duration: "3分钟" },
            { name: "俯卧撑热身组×8", duration: "1组" },
            { name: "弹力带拉热身×15", duration: "1组" }
          ],
          exercises: [
            {
              id: "db-bench-press",
              name: "哑铃卧推",
              category: "上肢/胸",
              muscle: ["胸大肌", "三角肌前束", "肱三头肌"],
              sets: 4, reps: "8-10", weight: "每组能做8-10次的哑铃", rest: "2分钟",
              cues: ["仰卧凳上，双脚踩地", "哑铃在胸两侧", "推起至手臂伸直（不锁死）", "控制下落至胸部"],
              commonMistakes: ["臀部离凳", "手腕弯曲", "下落不充分"],
              tempo: "1秒推 - 2秒落",
              weeklyProgress: [
                { week: 5, sets: 4, reps: "10", weight: "8kg哑铃", note: "基础重量建立动作" },
                { week: 6, sets: 4, reps: "10", weight: "10kg哑铃", note: "+2kg" },
                { week: 7, sets: 4, reps: "8", weight: "12kg哑铃", note: "+2kg，次数减2" },
                { week: 8, sets: 4, reps: "8", weight: "14kg哑铃", note: "+2kg，巩固大重量" }
              ]
            },
            {
              id: "db-row",
              name: "哑铃划船",
              category: "上肢/背",
              muscle: ["背阔肌", "菱形肌", "肱二头肌"],
              sets: 4, reps: "8-10", weight: "比上阶段增加", rest: "90秒",
              cues: ["单膝跪凳，另一脚撑地", "哑铃拉向髋部", "肩胛骨先收拢", "控制下放"],
              commonMistakes: ["用手臂拉而非背", "旋转躯干", "重量过大借力"],
              tempo: "1秒拉 - 2秒放",
              weeklyProgress: [
                { week: 5, sets: 4, reps: "10", weight: "10kg哑铃", note: "基础重量" },
                { week: 6, sets: 4, reps: "10", weight: "12kg哑铃", note: "+2kg" },
                { week: 7, sets: 4, reps: "8", weight: "14kg哑铃", note: "+2kg，次数减2" },
                { week: 8, sets: 4, reps: "8", weight: "16kg哑铃", note: "+2kg，巩固" }
              ]
            },
            {
              id: "db-ohp",
              name: "哑铃肩推",
              category: "上肢/肩",
              muscle: ["三角肌", "肱三头肌"],
              sets: 3, reps: "10-12", weight: "中等重量", rest: "90秒",
              cues: ["坐或站立，核心收紧", "哑铃在肩两侧", "推举过头", "控制下落至肩"],
              commonMistakes: ["腰部过度前凸", "推到后方"],
              tempo: "1秒推 - 2秒落",
              weeklyProgress: [
                { week: 5, sets: 3, reps: "12", weight: "5kg哑铃", note: "基础重量" },
                { week: 6, sets: 3, reps: "12", weight: "7kg哑铃", note: "+2kg" },
                { week: 7, sets: 3, reps: "10", weight: "8kg哑铃", note: "+1kg，次数减2" },
                { week: 8, sets: 3, reps: "10", weight: "10kg哑铃", note: "+2kg，巩固" }
              ]
            },
            {
              id: "db-curl",
              name: "哑铃弯举",
              category: "上肢/肱二头肌",
              muscle: ["肱二头肌", "肱肌"],
              sets: 3, reps: "10-12", weight: "轻-中", rest: "60秒",
              cues: ["站直，肘紧贴体侧", "弯举至肩部", "缓慢下放", "不借身体摆动"],
              commonMistakes: ["身体摆动借力", "肘部前移"],
              tempo: "1秒弯 - 2秒放",
              weeklyProgress: [
                { week: 5, sets: 3, reps: "12", weight: "5kg哑铃", note: "基础重量" },
                { week: 6, sets: 3, reps: "12", weight: "6kg哑铃", note: "+1kg" },
                { week: 7, sets: 3, reps: "10", weight: "7kg哑铃", note: "+1kg，次数减2" },
                { week: 8, sets: 3, reps: "10", weight: "8kg哑铃", note: "+1kg，巩固" }
              ]
            },
            {
              id: "tricep-ext",
              name: "哑铃颈后臂屈伸",
              category: "上肢/肱三头肌",
              muscle: ["肱三头肌"],
              sets: 3, reps: "10-12", weight: "轻", rest: "60秒",
              cues: ["双手捧一个哑铃举过头", "前臂下放至颈后", "伸直手臂", "肘部不动"],
              commonMistakes: ["肘部外展", "下放不充分"],
              tempo: "1秒伸 - 2秒落",
              weeklyProgress: [
                { week: 5, sets: 3, reps: "12", weight: "4kg哑铃", note: "基础重量" },
                { week: 6, sets: 3, reps: "12", weight: "5kg哑铃", note: "+1kg" },
                { week: 7, sets: 3, reps: "10", weight: "6kg哑铃", note: "+1kg，次数减2" },
                { week: 8, sets: 3, reps: "10", weight: "7kg哑铃", note: "+1kg，巩固" }
              ]
            }
          ],
          cooldown: [
            { name: "胸大肌拉伸", duration: "每侧30秒" },
            { name: "背阔肌拉伸", duration: "每侧30秒" },
            { name: "肱三头肌拉伸", duration: "每侧30秒" }
          ]
        },
        {
          day: 2,
          label: "下肢A",
          warmup: [
            { name: "深蹲热身组×10（空手）", duration: "1组" },
            { name: "髋部动态拉伸", duration: "3分钟" },
            { name: "踝关节环绕", duration: "1分钟" }
          ],
          exercises: [
            {
              id: "back-squat",
              name: "高脚杯深蹲（加重）",
              category: "下肢",
              muscle: ["股四头肌", "臀大肌", "核心"],
              sets: 4, reps: "8-10", weight: "大重量哑铃", rest: "2-3分钟",
              cues: ["双手捧哑铃于胸前", "双脚肩宽", "下蹲至大腿平行", "膝盖跟脚尖方向", "蹬地起身"],
              commonMistakes: ["膝盖内扣", "腰部圆背", "脚跟离地"],
              tempo: "2秒下 - 1秒起",
              weeklyProgress: [
                { week: 5, sets: 4, reps: "10", weight: "12kg哑铃", note: "基础重量建立深蹲模式" },
                { week: 6, sets: 4, reps: "10", weight: "16kg哑铃", note: "+4kg" },
                { week: 7, sets: 4, reps: "8", weight: "20kg哑铃", note: "+4kg，次数减2" },
                { week: 8, sets: 4, reps: "8", weight: "24kg哑铃", note: "+4kg，巩固" }
              ]
            },
            {
              id: "rdl-p2",
              name: "罗马尼亚硬拉",
              category: "下肢/后链",
              muscle: ["腘绳肌", "臀大肌", "竖脊肌"],
              sets: 4, reps: "8-10", weight: "增加重量", rest: "2分钟",
              cues: ["微屈膝，髋后推", "沿大腿下滑", "感受后链拉伸", "臀部发力起身"],
              commonMistakes: ["弯腰", "变成深蹲"],
              tempo: "3秒下 - 1秒起",
              weeklyProgress: [
                { week: 5, sets: 4, reps: "10", weight: "20kg", note: "基础重量" },
                { week: 6, sets: 4, reps: "10", weight: "25kg", note: "+5kg" },
                { week: 7, sets: 4, reps: "8", weight: "30kg", note: "+5kg，次数减2" },
                { week: 8, sets: 4, reps: "8", weight: "35kg", note: "+5kg，巩固" }
              ]
            },
            {
              id: "walking-lunge",
              name: "行走弓步",
              category: "下肢",
              muscle: ["股四头肌", "臀大肌", "腘绳肌"],
              sets: 3, reps: "每侧10步", weight: "自重或持哑铃", rest: "90秒",
              cues: ["大步前进", "后膝下沉", "蹬起换腿", "保持平衡"],
              commonMistakes: ["步幅太小", "前膝内扣"],
              tempo: "2秒下 - 1秒起",
              weeklyProgress: [
                { week: 5, sets: 3, reps: "每侧10步", weight: "自重", note: "基础，先自重" },
                { week: 6, sets: 3, reps: "每侧10步", weight: "持哑铃各5kg", note: "加负重" },
                { week: 7, sets: 3, reps: "每侧12步", weight: "持哑铃各5kg", note: "增加步数" },
                { week: 8, sets: 3, reps: "每侧12步", weight: "持哑铃各8kg", note: "增加负重" }
              ]
            },
            {
              id: "calf-raise",
              name: "提踵",
              category: "下肢/小腿",
              muscle: ["腓肠肌", "比目鱼肌"],
              sets: 3, reps: "15-20", weight: "自重或持哑铃", rest: "60秒",
              cues: ["前脚掌踩台阶", "踮起至最高点", "缓慢下放"],
              commonMistakes: ["动作过快", "幅度不够"],
              tempo: "1秒起 - 2秒落",
              weeklyProgress: [
                { week: 5, sets: 3, reps: "20", weight: "自重", note: "基础，先自重" },
                { week: 6, sets: 3, reps: "20", weight: "持哑铃各5kg", note: "加负重" },
                { week: 7, sets: 3, reps: "15", weight: "持哑铃各8kg", note: "加负重，次数减5" },
                { week: 8, sets: 3, reps: "15", weight: "持哑铃各10kg", note: "+2kg，巩固" }
              ]
            }
          ],
          cooldown: [
            { name: "股四头肌拉伸", duration: "每侧30秒" },
            { name: "腘绳肌拉伸", duration: "每侧30秒" },
            { name: "小腿拉伸", duration: "每侧30秒" }
          ]
        },
        {
          day: 3,
          label: "上肢B",
          warmup: [
            { name: "肩部环绕", duration: "2分钟" },
            { name: "弹力带拉热身×15", duration: "1组" },
            { name: "俯卧撑热身×8", duration: "1组" }
          ],
          exercises: [
            {
              id: "incline-db-press",
              name: "上斜哑铃推举",
              category: "上肢/胸上束",
              muscle: ["胸大肌上束", "三角肌前束", "肱三头肌"],
              sets: 4, reps: "8-10", weight: "中等", rest: "2分钟",
              cues: ["凳子调30-45度", "哑铃在胸两侧", "推起至伸直", "控制下落"],
              commonMistakes: ["角度过大变肩推", "臀部离凳"],
              tempo: "1秒推 - 2秒落",
              weeklyProgress: [
                { week: 5, sets: 4, reps: "10", weight: "8kg哑铃", note: "基础重量" },
                { week: 6, sets: 4, reps: "10", weight: "10kg哑铃", note: "+2kg" },
                { week: 7, sets: 4, reps: "8", weight: "12kg哑铃", note: "+2kg，次数减2" },
                { week: 8, sets: 4, reps: "8", weight: "14kg哑铃", note: "+2kg，巩固" }
              ]
            },
            {
              id: "assisted-pullup",
              name: "辅助引体向上（弹力带/脚踩地）",
              category: "上肢/背",
              muscle: ["背阔肌", "肱二头肌", "菱形肌"],
              sets: 4, reps: "6-10", weight: "自重+辅助", rest: "2分钟",
              cues: ["肩胛骨先下沉", "拉至下巴过杠", "控制下放至伸直", "全程控制"],
              commonMistakes: ["不完整幅度", "摆动借力"],
              tempo: "1秒拉 - 2秒放",
              weeklyProgress: [
                { week: 5, sets: 4, reps: "10", weight: "自重+弹力带辅助", note: "基础，用弹力带辅助" },
                { week: 6, sets: 4, reps: "10", weight: "自重+轻弹力带", note: "减少辅助，增加难度" },
                { week: 7, sets: 4, reps: "8", weight: "自重+最轻辅助", note: "进一步减少辅助" },
                { week: 8, sets: 4, reps: "8", weight: "自重（无辅助）", note: "尝试无辅助引体" }
              ]
            },
            {
              id: "lateral-raise",
              name: "哑铃侧平举",
              category: "上肢/肩中束",
              muscle: ["三角肌中束"],
              sets: 3, reps: "12-15", weight: "轻", rest: "60秒",
              cues: ["微屈肘", "向两侧抬至肩高", "小拇指略高于拇指", "缓慢下放"],
              commonMistakes: ["借力甩", "耸肩", "抬过高"],
              tempo: "1秒起 - 2秒落",
              weeklyProgress: [
                { week: 5, sets: 3, reps: "15", weight: "3kg哑铃", note: "基础重量" },
                { week: 6, sets: 3, reps: "15", weight: "4kg哑铃", note: "+1kg" },
                { week: 7, sets: 3, reps: "12", weight: "5kg哑铃", note: "+1kg，次数减3" },
                { week: 8, sets: 3, reps: "12", weight: "5kg哑铃", note: "巩固" }
              ]
            },
            {
              id: "hammer-curl",
              name: "锤式弯举",
              category: "上肢/肱肌",
              muscle: ["肱肌", "肱桡肌", "肱二头肌"],
              sets: 3, reps: "10-12", weight: "中等", rest: "60秒",
              cues: ["哑铃竖握（掌心相对）", "弯举保持中立握", "肘不动", "控制下放"],
              commonMistakes: ["借力", "肘部前移"],
              tempo: "1秒弯 - 2秒放",
              weeklyProgress: [
                { week: 5, sets: 3, reps: "12", weight: "6kg哑铃", note: "基础重量" },
                { week: 6, sets: 3, reps: "12", weight: "7kg哑铃", note: "+1kg" },
                { week: 7, sets: 3, reps: "10", weight: "8kg哑铃", note: "+1kg，次数减2" },
                { week: 8, sets: 3, reps: "10", weight: "9kg哑铃", note: "+1kg，巩固" }
              ]
            },
            {
              id: "push-up-close",
              name: "窄距俯卧撑",
              category: "上肢/三头",
              muscle: ["肱三头肌", "胸大肌", "三角肌前束"],
              sets: 3, reps: "8-12", weight: "自重", rest: "60秒",
              cues: ["双手与肩同宽或略窄", "肘部贴近体侧", "下降至胸部接近地面", "推起"],
              commonMistakes: ["肘外展", "塌腰"],
              tempo: "2秒下 - 1秒上",
              weeklyProgress: [
                { week: 5, sets: 3, reps: "12", weight: "自重", note: "基础，自重" },
                { week: 6, sets: 3, reps: "12", weight: "自重（加背包3kg）", note: "加轻度负重" },
                { week: 7, sets: 3, reps: "10", weight: "自重（加背包5kg）", note: "加负重，次数减2" },
                { week: 8, sets: 3, reps: "10", weight: "自重（加背包8kg）", note: "+3kg，巩固" }
              ]
            }
          ],
          cooldown: [
            { name: "胸大肌拉伸", duration: "每侧30秒" },
            { name: "三角肌拉伸", duration: "每侧30秒" },
            { name: "前臂拉伸", duration: "每侧30秒" }
          ]
        },
        {
          day: 4,
          label: "下肢B",
          warmup: [
            { name: "臀桥热身×15", duration: "1组" },
            { name: "髋部动态拉伸", duration: "3分钟" }
          ],
          exercises: [
            {
              id: "front-squat",
              name: "高脚杯深蹲（加重变式）",
              category: "下肢",
              muscle: ["股四头肌", "臀大肌", "核心"],
              sets: 4, reps: "8-10", weight: "大重量哑铃", rest: "2分钟",
              cues: ["哑铃捧胸前（掌心朝上托底）", "躯干更直立", "下蹲至大腿平行", "保持核心紧绷"],
              commonMistakes: ["肘部下垂", "躯干前倾"],
              tempo: "2秒下 - 1秒起",
              weeklyProgress: [
                { week: 5, sets: 4, reps: "10", weight: "12kg哑铃", note: "基础，高脚杯深蹲" },
                { week: 6, sets: 4, reps: "10", weight: "16kg哑铃", note: "+4kg" },
                { week: 7, sets: 4, reps: "8", weight: "20kg哑铃", note: "+4kg，次数减2" },
                { week: 8, sets: 4, reps: "8", weight: "24kg哑铃", note: "+4kg，巩固" }
              ]
            },
            {
              id: "hip-thrust",
              name: "臀推",
              category: "下肢/臀",
              muscle: ["臀大肌", "腘绳肌"],
              sets: 4, reps: "8-10", weight: "哑铃放髋部", rest: "2分钟",
              cues: ["上背靠凳", "哑铃放髋部", "顶起至身体成线", "顶峰收缩1秒"],
              commonMistakes: ["用腰代偿", "幅度不够", "过度伸展"],
              tempo: "1秒顶 - 1秒停 - 2秒落",
              weeklyProgress: [
                { week: 5, sets: 4, reps: "10", weight: "12kg哑铃", note: "基础，哑铃放髋部" },
                { week: 6, sets: 4, reps: "10", weight: "16kg哑铃", note: "+4kg" },
                { week: 7, sets: 4, reps: "8", weight: "20kg哑铃", note: "+4kg，次数减2" },
                { week: 8, sets: 4, reps: "8", weight: "24kg哑铃", note: "+4kg，巩固" }
              ]
            },
            {
              id: "split-squat",
              name: "保加利亚分腿蹲",
              category: "下肢",
              muscle: ["股四头肌", "臀大肌", "腘绳肌"],
              sets: 3, reps: "每侧10-12", weight: "自重或持哑铃", rest: "90秒",
              cues: ["后脚搭凳上", "前脚向前一步", "下蹲至后膝接近地面", "前腿发力起身"],
              commonMistakes: ["前膝内扣", "步幅不当"],
              tempo: "2秒下 - 1秒起",
              weeklyProgress: [
                { week: 5, sets: 3, reps: "每侧10次", weight: "自重", note: "基础，先自重" },
                { week: 6, sets: 3, reps: "每侧10次", weight: "持哑铃各5kg", note: "加负重" },
                { week: 7, sets: 3, reps: "每侧8次", weight: "持哑铃各8kg", note: "加负重，次数减2" },
                { week: 8, sets: 3, reps: "每侧8次", weight: "持哑铃各10kg", note: "+2kg，巩固" }
              ]
            },
            {
              id: "leg-curl",
              name: "腿弯举（或弹力带替代）",
              category: "下肢/腘绳",
              muscle: ["腘绳肌"],
              sets: 3, reps: "10-12", weight: "中等", rest: "60秒",
              cues: ["俯卧", "腘绳肌发力弯曲膝盖", "控制下放"],
              commonMistakes: ["借力", "幅度不够"],
              tempo: "1秒弯 - 2秒放",
              weeklyProgress: [
                { week: 5, sets: 3, reps: "12", weight: "中等弹力带", note: "基础，弹力带替代" },
                { week: 6, sets: 3, reps: "12", weight: "较重弹力带", note: "增加阻力" },
                { week: 7, sets: 3, reps: "10", weight: "较重弹力带+慢速", note: "加慢速控制，次数减2" },
                { week: 8, sets: 3, reps: "10", weight: "双弹力带", note: "叠加弹力带增加阻力" }
              ]
            }
          ],
          cooldown: [
            { name: "髋屈肌拉伸", duration: "每侧30秒" },
            { name: "臀大肌拉伸（鸽式）", duration: "每侧30秒" },
            { name: "股四头肌拉伸", duration: "每侧30秒" }
          ]
        }
      ],
      cardio: {
        type: "可加入1次HIIT",
        frequency: "每周1次HIIT + 1-2次持续有氧",
        duration: "HIIT 15-20分钟 / 持续有氧 30分钟",
        intensity: "HIIT: 全力20秒 + 休息40秒 × 8-10轮",
        options: ["动感单车HIIT", "划船机HIIT", "跳绳间歇"]
      }
    },

    // ========== 阶段三：强化期（9-12周）==========
    {
      id: "phase-3",
      name: "强化期",
      weeks: "第9-12周",
      weekRange: [9, 12],
      description: "推拉腿分化，追求持续超负荷。此阶段力量、肌肉量、体成分应有明显可见改变。注意：腰椎有伤病史，所有动作以控制为主，不追求极限重量。",
      schedule: "每周5次（推/拉/腿/推/拉，周三/四/五/六/日）",
      frequency: 5,
      split: "push-pull-legs",
      focus: "持续超负荷、肌肥大最大化、力量突破",
      acsmParams: {
        setsPerMusclePerWeek: "16-20组",
        repsPerSet: "6-12次（大重量6-8，辅助10-12）",
        intensity: "1RM的70-80%（接近力竭）",
        restInterval: "2-3分钟（大重量）/ 60-90秒（孤立）",
        progressiveOverload: "每周尝试增加重量或次数，确保刺激持续增加"
      },
      workouts: [
        {
          day: 1,
          label: "推（胸/肩/三头）",
          warmup: [
            { name: "肩部环绕+手臂环绕", duration: "3分钟" },
            { name: "轻哑铃卧推热身×10", duration: "1组" }
          ],
          exercises: [
            {
              id: "bench-press-bb",
              name: "哑铃卧推（加重）",
              category: "推/胸",
              muscle: ["胸大肌", "三角肌前束", "肱三头肌"],
              sets: 4, reps: "6-8", weight: "较大重量哑铃", rest: "3分钟",
              cues: ["肩胛骨后缩收紧", "双脚踩地", "控制下放至胸", "爆发推起"],
              commonMistakes: ["臀部离凳", "手腕弯曲", "弹胸借力"],
              tempo: "1秒推 - 2秒落",
              weeklyProgress: [
                { week: 9, sets: 4, reps: "8", weight: "10kg哑铃", note: "基础，哑铃卧推" },
                { week: 10, sets: 4, reps: "8", weight: "12.5kg哑铃", note: "+2.5kg" },
                { week: 11, sets: 4, reps: "6", weight: "15kg哑铃", note: "+2.5kg，次数减2" },
                { week: 12, sets: 4, reps: "6", weight: "17.5kg哑铃", note: "+2.5kg，冲刺" }
              ]
            },
            {
              id: "incline-db-press-p3",
              name: "上斜哑铃推举",
              category: "推/胸上束",
              muscle: ["胸大肌上束", "三角肌前束"],
              sets: 3, reps: "8-10", weight: "中等", rest: "2分钟",
              cues: ["凳子调30-45度", "哑铃推起", "感受上胸发力", "控制下落"],
              commonMistakes: ["角度过大变肩推"],
              tempo: "1秒推 - 2秒落",
              weeklyProgress: [
                { week: 9, sets: 3, reps: "10", weight: "10kg哑铃", note: "基础" },
                { week: 10, sets: 3, reps: "10", weight: "12.5kg哑铃", note: "+2.5kg" },
                { week: 11, sets: 3, reps: "8", weight: "15kg哑铃", note: "+2.5kg，次数减2" },
                { week: 12, sets: 3, reps: "8", weight: "17.5kg哑铃", note: "+2.5kg，冲刺" }
              ]
            },
            {
              id: "lateral-raise-p3",
              name: "哑铃侧平举",
              category: "推/肩中束",
              muscle: ["三角肌中束"],
              sets: 4, reps: "12-15", weight: "轻", rest: "60秒",
              cues: ["微屈肘", "向两侧抬至肩高", "缓慢下放"],
              commonMistakes: ["借力甩", "耸肩"],
              tempo: "1秒起 - 2秒落",
              weeklyProgress: [
                { week: 9, sets: 4, reps: "15", weight: "4kg哑铃", note: "基础" },
                { week: 10, sets: 4, reps: "15", weight: "5kg哑铃", note: "+1kg" },
                { week: 11, sets: 4, reps: "12", weight: "6kg哑铃", note: "+1kg，次数减3" },
                { week: 12, sets: 4, reps: "12", weight: "7kg哑铃", note: "+1kg，冲刺" }
              ]
            },
            {
              id: "tricep-pushdown",
              name: "弹力带下压",
              category: "推/三头",
              muscle: ["肱三头肌"],
              sets: 3, reps: "10-12", weight: "弹力带", rest: "60秒",
              cues: ["弹力带挂高处", "肘紧贴体侧", "下压至伸直", "只动前臂"],
              commonMistakes: ["肘部移动", "身体前倾借力"],
              tempo: "1秒压 - 2秒回",
              weeklyProgress: [
                { week: 9, sets: 3, reps: "12", weight: "中等弹力带", note: "基础，弹力带下压" },
                { week: 10, sets: 3, reps: "12", weight: "较重弹力带", note: "增加阻力" },
                { week: 11, sets: 3, reps: "10", weight: "较重弹力带+慢速", note: "加慢速控制，次数减2" },
                { week: 12, sets: 3, reps: "10", weight: "双弹力带", note: "叠加弹力带，冲刺" }
              ]
            }
          ],
          cooldown: [
            { name: "胸大肌拉伸", duration: "每侧30秒" },
            { name: "三角肌拉伸", duration: "每侧30秒" },
            { name: "肱三头肌拉伸", duration: "每侧30秒" }
          ]
        },
        {
          day: 2,
          label: "拉（背/二头）",
          warmup: [
            { name: "弹力带拉热身×15", duration: "1组" },
            { name: "肩部动态拉伸", duration: "2分钟" }
          ],
          exercises: [
            {
              id: "deadlift",
              name: "哑铃罗马尼亚硬拉（轻重量，腰部安全）",
              category: "拉/后链",
              muscle: ["竖脊肌", "臀大肌", "腘绳肌", "背阔肌"],
              sets: 4, reps: "8-10", weight: "中等哑铃", rest: "3分钟",
              cues: ["双手持哑铃", "髋膝同时屈", "哑铃贴腿", "髋部发力起身"],
              commonMistakes: ["圆背", "哑铃远离身体"],
              tempo: "1秒起 - 控制下放",
              weeklyProgress: [
                { week: 9, sets: 4, reps: "8", weight: "12kg哑铃×2", note: "基础，哑铃罗马尼亚硬拉" },
                { week: 10, sets: 4, reps: "8", weight: "15kg哑铃×2", note: "+3kg" },
                { week: 11, sets: 4, reps: "6", weight: "17.5kg哑铃×2", note: "+2.5kg，次数减2" },
                { week: 12, sets: 4, reps: "6", weight: "20kg哑铃×2", note: "+2.5kg，冲刺" }
              ]
            },
            {
              id: "pullup-assisted-p3",
              name: "引体向上（弹力带辅助，居家门框杠）",
              category: "拉/背",
              muscle: ["背阔肌", "肱二头肌", "菱形肌"],
              sets: 4, reps: "6-10", weight: "自重+弹力带辅助", rest: "2分钟",
              cues: ["肩胛骨先下沉", "拉至下巴过杠", "控制下放"],
              commonMistakes: ["不完整幅度", "摆动借力"],
              tempo: "1秒拉 - 2秒放",
              weeklyProgress: [
                { week: 9, sets: 4, reps: "10", weight: "自重+弹力带辅助", note: "基础，弹力带辅助，居家门框杠" },
                { week: 10, sets: 4, reps: "10", weight: "自重+轻弹力带", note: "减少辅助" },
                { week: 11, sets: 4, reps: "8", weight: "自重+最轻辅助", note: "进一步减少辅助" },
                { week: 12, sets: 4, reps: "8", weight: "自重（无辅助）", note: "尝试无辅助，冲刺" }
              ]
            },
            {
              id: "face-pull",
              name: "弹力带面拉",
              category: "拉/后三角",
              muscle: ["三角肌后束", "菱形肌", "斜方肌中下束"],
              sets: 3, reps: "12-15", weight: "轻弹力带", rest: "60秒",
              cues: ["弹力带固定于面前高度", "拉向面部", "肘外展", "肩外旋", "顶峰停1秒"],
              commonMistakes: ["阻力过大", "用背阔肌代偿"],
              tempo: "1秒拉 - 2秒回",
              weeklyProgress: [
                { week: 9, sets: 3, reps: "15", weight: "轻弹力带", note: "基础，弹力带面拉" },
                { week: 10, sets: 3, reps: "15", weight: "中等弹力带", note: "增加阻力" },
                { week: 11, sets: 3, reps: "12", weight: "中等弹力带+慢速", note: "加慢速控制，次数减3" },
                { week: 12, sets: 3, reps: "12", weight: "较重弹力带", note: "增加阻力，冲刺" }
              ]
            },
            {
              id: "hammer-curl-p3",
              name: "锤式弯举",
              category: "拉/二头+前臂",
              muscle: ["肱肌", "肱桡肌", "肱二头肌"],
              sets: 3, reps: "10-12", weight: "中等", rest: "60秒",
              cues: ["哑铃竖握", "弯举保持中立握", "肘不动"],
              commonMistakes: ["借力"],
              tempo: "1秒弯 - 2秒放",
              weeklyProgress: [
                { week: 9, sets: 3, reps: "12", weight: "8kg哑铃", note: "基础" },
                { week: 10, sets: 3, reps: "12", weight: "9kg哑铃", note: "+1kg" },
                { week: 11, sets: 3, reps: "10", weight: "10kg哑铃", note: "+1kg，次数减2" },
                { week: 12, sets: 3, reps: "10", weight: "11kg哑铃", note: "+1kg，冲刺" }
              ]
            }
          ],
          cooldown: [
            { name: "背阔肌拉伸", duration: "每侧30秒" },
            { name: "下背拉伸（婴儿式）", duration: "30秒" },
            { name: "肱二头肌拉伸", duration: "每侧30秒" }
          ]
        },
        {
          day: 3,
          label: "腿（股四/腘绳/臀/小腿）",
          warmup: [
            { name: "高脚杯深蹲热身×10（轻哑铃）", duration: "1组" },
            { name: "髋部动态拉伸", duration: "3分钟" }
          ],
          exercises: [
            {
              id: "back-squat-p3",
              name: "高脚杯深蹲（大重量哑铃）",
              category: "腿",
              muscle: ["股四头肌", "臀大肌", "核心"],
              sets: 4, reps: "6-8", weight: "大重量哑铃", rest: "3分钟",
              cues: ["双手捧哑铃于胸前", "下蹲至平行或略低", "蹬地起身", "保持核心紧绷"],
              commonMistakes: ["膝盖内扣", "圆背", "脚跟离地"],
              tempo: "2秒下 - 1秒起",
              weeklyProgress: [
                { week: 9, sets: 4, reps: "8", weight: "16kg哑铃", note: "基础，高脚杯深蹲" },
                { week: 10, sets: 4, reps: "8", weight: "20kg哑铃", note: "+4kg" },
                { week: 11, sets: 4, reps: "6", weight: "24kg哑铃", note: "+4kg，次数减2" },
                { week: 12, sets: 4, reps: "6", weight: "28kg哑铃", note: "+4kg，冲刺" }
              ]
            },
            {
              id: "leg-curl-p3",
              name: "弹力带腿弯举",
              category: "腿/腘绳",
              muscle: ["腘绳肌"],
              sets: 3, reps: "10-12", weight: "弹力带", rest: "90秒",
              cues: ["俯卧，弹力带套脚踝", "腘绳肌发力弯曲膝盖", "控制下放"],
              commonMistakes: ["借力"],
              tempo: "1秒弯 - 2秒放",
              weeklyProgress: [
                { week: 9, sets: 3, reps: "12", weight: "较重弹力带", note: "基础，弹力带腿弯举" },
                { week: 10, sets: 3, reps: "12", weight: "双弹力带", note: "叠加阻力" },
                { week: 11, sets: 3, reps: "10", weight: "双弹力带+慢速", note: "加慢速控制，次数减2" },
                { week: 12, sets: 3, reps: "10", weight: "双弹力带+顶峰停顿", note: "增加停顿，冲刺" }
              ]
            },
            {
              id: "hip-thrust-p3",
              name: "臀推",
              category: "腿/臀",
              muscle: ["臀大肌", "腘绳肌"],
              sets: 4, reps: "8-10", weight: "哑铃", rest: "2分钟",
              cues: ["上背靠凳", "哑铃放髋部", "顶起至身体成线", "顶峰收缩"],
              commonMistakes: ["用腰代偿", "幅度不够"],
              tempo: "1秒顶 - 1秒停 - 2秒落",
              weeklyProgress: [
                { week: 9, sets: 4, reps: "10", weight: "20kg哑铃", note: "基础" },
                { week: 10, sets: 4, reps: "10", weight: "24kg哑铃", note: "+4kg" },
                { week: 11, sets: 4, reps: "8", weight: "28kg哑铃", note: "+4kg，次数减2" },
                { week: 12, sets: 4, reps: "8", weight: "30kg哑铃", note: "+2kg，冲刺" }
              ]
            },
            {
              id: "calf-raise-p3",
              name: "负重提踵",
              category: "腿/小腿",
              muscle: ["腓肠肌", "比目鱼肌"],
              sets: 4, reps: "12-15", weight: "中等", rest: "60秒",
              cues: ["前脚掌踩台阶", "踮起最高点", "缓慢下放"],
              commonMistakes: ["弹跳", "幅度不够"],
              tempo: "1秒起 - 2秒落",
              weeklyProgress: [
                { week: 9, sets: 4, reps: "15", weight: "持哑铃各10kg", note: "基础" },
                { week: 10, sets: 4, reps: "15", weight: "持哑铃各12kg", note: "+2kg" },
                { week: 11, sets: 4, reps: "12", weight: "持哑铃各15kg", note: "+3kg，次数减3" },
                { week: 12, sets: 4, reps: "12", weight: "持哑铃各17.5kg", note: "+2.5kg，冲刺" }
              ]
            }
          ],
          cooldown: [
            { name: "股四头肌拉伸", duration: "每侧30秒" },
            { name: "腘绳肌拉伸", duration: "每侧30秒" },
            { name: "小腿拉伸", duration: "每侧30秒" }
          ]
        },
        {
          day: 4,
          label: "推（变式）",
          warmup: [
            { name: "肩部环绕", duration: "2分钟" },
            { name: "俯卧撑热身×10", duration: "1组" }
          ],
          exercises: [
            {
              id: "db-bench-p3",
              name: "哑铃卧推",
              category: "推/胸",
              muscle: ["胸大肌", "三角肌前束", "肱三头肌"],
              sets: 4, reps: "8-10", weight: "较大", rest: "2分钟",
              cues: ["仰卧凳上", "哑铃在胸两侧", "推起至伸直", "控制下落"],
              commonMistakes: ["臀部离凳", "手腕弯曲"],
              tempo: "1秒推 - 2秒落",
              weeklyProgress: [
                { week: 9, sets: 4, reps: "10", weight: "12kg哑铃", note: "基础" },
                { week: 10, sets: 4, reps: "10", weight: "14kg哑铃", note: "+2kg" },
                { week: 11, sets: 4, reps: "8", weight: "16kg哑铃", note: "+2kg，次数减2" },
                { week: 12, sets: 4, reps: "8", weight: "18kg哑铃", note: "+2kg，冲刺" }
              ]
            },
            {
              id: "db-fly",
              name: "哑铃飞鸟",
              category: "推/胸",
              muscle: ["胸大肌"],
              sets: 3, reps: "10-12", weight: "轻-中", rest: "90秒",
              cues: ["仰卧，哑铃在胸上方", "微屈肘向两侧打开", "感受胸肌拉伸", "弧线合拢"],
              commonMistakes: ["重量过大", "肘过度弯曲变推举"],
              tempo: "2秒开 - 1秒合",
              weeklyProgress: [
                { week: 9, sets: 3, reps: "12", weight: "5kg哑铃", note: "基础" },
                { week: 10, sets: 3, reps: "12", weight: "6kg哑铃", note: "+1kg" },
                { week: 11, sets: 3, reps: "10", weight: "7kg哑铃", note: "+1kg，次数减2" },
                { week: 12, sets: 3, reps: "10", weight: "8kg哑铃", note: "+1kg，冲刺" }
              ]
            },
            {
              id: "arnold-press",
              name: "阿诺德推举",
              category: "推/肩",
              muscle: ["三角肌前中束", "肱三头肌"],
              sets: 3, reps: "10-12", weight: "中等", rest: "90秒",
              cues: ["坐姿，哑铃在肩前掌心朝己", "推举时旋转手腕至掌心朝前", "完全伸直", "反向控制下落"],
              commonMistakes: ["旋转过快", "腰部过度前凸"],
              tempo: "1秒推 - 2秒落",
              weeklyProgress: [
                { week: 9, sets: 3, reps: "12", weight: "6kg哑铃", note: "基础" },
                { week: 10, sets: 3, reps: "12", weight: "8kg哑铃", note: "+2kg" },
                { week: 11, sets: 3, reps: "10", weight: "9kg哑铃", note: "+1kg，次数减2" },
                { week: 12, sets: 3, reps: "10", weight: "10kg哑铃", note: "+1kg，冲刺" }
              ]
            },
            {
              id: "overhead-tricep",
              name: "哑铃过顶臂屈伸（单臂）",
              category: "推/三头",
              muscle: ["肱三头肌"],
              sets: 3, reps: "10-12", weight: "轻", rest: "60秒",
              cues: ["单手举哑铃过头", "前臂下放至颈后", "伸直手臂", "肘不动"],
              commonMistakes: ["肘外展", "下放不充分"],
              tempo: "1秒伸 - 2秒落",
              weeklyProgress: [
                { week: 9, sets: 3, reps: "12", weight: "5kg哑铃", note: "基础" },
                { week: 10, sets: 3, reps: "12", weight: "6kg哑铃", note: "+1kg" },
                { week: 11, sets: 3, reps: "10", weight: "7kg哑铃", note: "+1kg，次数减2" },
                { week: 12, sets: 3, reps: "10", weight: "8kg哑铃", note: "+1kg，冲刺" }
              ]
            }
          ],
          cooldown: [
            { name: "胸大肌拉伸", duration: "每侧30秒" },
            { name: "三角肌拉伸", duration: "每侧30秒" },
            { name: "肱三头肌拉伸", duration: "每侧30秒" }
          ]
        },
        {
          day: 5,
          label: "拉（变式）",
          warmup: [
            { name: "弹力带拉热身×15", duration: "1组" },
            { name: "猫牛式", duration: "1分钟" }
          ],
          exercises: [
            {
              id: "bb-row",
              name: "哑铃划船（加重）",
              category: "拉/背",
              muscle: ["背阔肌", "菱形肌", "斜方肌中下束", "肱二头肌"],
              sets: 4, reps: "8-10", weight: "中等-大重量哑铃", rest: "2分钟",
              cues: ["俯身约45度，背挺直", "哑铃拉向髋部", "肩胛骨先收拢", "控制下放"],
              commonMistakes: ["圆背", "直立过多", "重量过大借力"],
              tempo: "1秒拉 - 2秒放",
              weeklyProgress: [
                { week: 9, sets: 4, reps: "10", weight: "12kg哑铃", note: "基础，哑铃划船" },
                { week: 10, sets: 4, reps: "10", weight: "14kg哑铃", note: "+2kg" },
                { week: 11, sets: 4, reps: "8", weight: "16kg哑铃", note: "+2kg，次数减2" },
                { week: 12, sets: 4, reps: "8", weight: "18kg哑铃", note: "+2kg，冲刺" }
              ]
            },
            {
              id: "lat-pulldown",
              name: "弹力带高位下拉（或门框引体辅助）",
              category: "拉/背",
              muscle: ["背阔肌", "肱二头肌"],
              sets: 3, reps: "10-12", weight: "弹力带", rest: "90秒",
              cues: ["弹力带挂高处", "跪地双手抓握", "拉至锁骨", "肩胛骨先下沉", "控制放回"],
              commonMistakes: ["身体过度后仰", "用手臂拉"],
              tempo: "1秒拉 - 2秒放",
              weeklyProgress: [
                { week: 9, sets: 3, reps: "12", weight: "中等弹力带", note: "基础，弹力带高位下拉" },
                { week: 10, sets: 3, reps: "12", weight: "较重弹力带", note: "增加阻力" },
                { week: 11, sets: 3, reps: "10", weight: "较重弹力带+慢速", note: "加慢速控制，次数减2" },
                { week: 12, sets: 3, reps: "10", weight: "双弹力带", note: "叠加弹力带，冲刺" }
              ]
            },
            {
              id: "reverse-fly",
              name: "反向飞鸟（哑铃/弹力带）",
              category: "拉/后三角",
              muscle: ["三角肌后束", "菱形肌"],
              sets: 3, reps: "12-15", weight: "轻", rest: "60秒",
              cues: ["俯身45度", "哑铃向两侧打开", "感受后肩收缩", "控制合拢"],
              commonMistakes: ["重量过大", "借力"],
              tempo: "1秒开 - 2秒合",
              weeklyProgress: [
                { week: 9, sets: 3, reps: "15", weight: "3kg哑铃", note: "基础" },
                { week: 10, sets: 3, reps: "15", weight: "4kg哑铃", note: "+1kg" },
                { week: 11, sets: 3, reps: "12", weight: "5kg哑铃", note: "+1kg，次数减3" },
                { week: 12, sets: 3, reps: "12", weight: "5kg哑铃+慢速", note: "加慢速控制，冲刺" }
              ]
            },
            {
              id: "concentration-curl",
              name: "集中弯举",
              category: "拉/二头",
              muscle: ["肱二头肌", "肱肌"],
              sets: 3, reps: "10-12", weight: "中等", rest: "60秒",
              cues: ["坐姿，肘抵大腿内侧", "弯举至肩", "缓慢下放至伸直", "顶峰收缩1秒"],
              commonMistakes: ["下放不充分", "身体借力"],
              tempo: "1秒弯 - 2秒放",
              weeklyProgress: [
                { week: 9, sets: 3, reps: "12", weight: "7kg哑铃", note: "基础" },
                { week: 10, sets: 3, reps: "12", weight: "8kg哑铃", note: "+1kg" },
                { week: 11, sets: 3, reps: "10", weight: "9kg哑铃", note: "+1kg，次数减2" },
                { week: 12, sets: 3, reps: "10", weight: "10kg哑铃", note: "+1kg，冲刺" }
              ]
            }
          ],
          cooldown: [
            { name: "背阔肌拉伸", duration: "每侧30秒" },
            { name: "上背拉伸", duration: "30秒" },
            { name: "前臂拉伸", duration: "每侧30秒" }
          ]
        }
      ],
      cardio: {
        type: "恢复性低强度为主",
        frequency: "每周1-2次",
        duration: "20-30分钟",
        intensity: "低-中等（主动恢复）",
        options: ["快走", "轻松骑行", "游泳"]
      }
    }
  ]
};
