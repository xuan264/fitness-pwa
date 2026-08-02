// 减脂恢复脂肪肝训练计划数据
// 基于循证医学证据设计：
// [1] 中华医学会肝病学分会 MAFLD 防治指南（2024）
// [2] Nature 网络荟萃分析（2024, 43 RCT, 2070例）：AT改善肝酶最佳，AT+RT改善血脂最佳
// [3] STRRIDE 研究（AJP-Endo, 2011, 196例）：有氧运动显著减少内脏脂肪(-15.9cm²)和肝脏脂肪
// [4] Frontiers 网络荟萃分析（2024, 28 RCT, 1606例）：有氧降BMI最优
// [5] 每周≥150min中等强度运动可独立于减重减少肝脂肪≥30%
//
// 适用人群：173cm/90kg，BMI≈30，腹型肥胖，脂肪肝
// 训练日：周一、周三、周五
// 周期：4轮 × 12周，每轮4个阶段各3周（共12周）

export const fatLossPlan = {
  meta: {
    totalWeeks: 12,
    schedule: "每周3次（周一/周三/周五）",
    source: "MAFLD指南2024 · STRRIDE研究 · Nature/Frontiers网状Meta分析",
    target: "减重5-10% · 肝脂肪减少≥30% · 内脏脂肪显著下降",
    principles: [
      "有氧为主：STRRIDE研究证实有氧运动显著减少内脏脂肪和肝脏脂肪，抗阻训练无此效果",
      "≥150分钟/周：即使不减轻体重，也能使肝脏脂肪减少≥30%",
      "渐进超负荷：每1-2周增加时长或强度，持续刺激适应",
      "联合训练：后期加入抗阻，改善血脂和代谢（AT+RT联合效果最佳）",
      "中等强度为主：心率维持在最大心率60-70%（约110-125次/分），'能说话但不能唱歌'"
    ]
  },

  phases: [
    // ========== 阶段一：有氧基础建立期（1-3周）==========
    {
      id: "fl-phase-1",
      name: "有氧基础期",
      weeks: "第1-3周",
      weekRange: [1, 3],
      description: "从快走开始建立有氧基础。90kg体重跑步对膝盖压力大，此阶段以快走/椭圆机为主，培养运动习惯，让心肺和关节适应。目标：每次30分钟，每周累计90分钟。",
      schedule: "每周3次（周一/周三/周五），每次30分钟中等强度有氧",
      frequency: 3,
      split: "aerobic",
      focus: "建立有氧习惯、心肺适应、关节准备",
      acsmParams: {
        type: "中等强度持续有氧（MICT）",
        duration: "每次30分钟",
        intensity: "最大心率60-65%（心率约105-115次/分）",
        target: "微喘但能说出完整句子",
        progressiveOverload: "每周增加5分钟时长或提升速度"
      },
      workouts: [
        {
          day: 1,
          dayName: "周一",
          label: "有氧A — 快走基础",
          warmup: [
            { name: "慢走热身", duration: "5分钟" },
            { name: "动态拉伸（髋部环绕、腿部摆动）", duration: "3分钟" }
          ],
          exercises: [
            {
              id: "fl-walk-1",
              name: "快走",
              category: "有氧",
              muscle: ["全身"],
              sets: 1, reps: "30分钟", weight: "自重", rest: "—",
              cues: ["抬头挺胸，核心微收", "手臂自然摆动，肘约90度", "步幅适中，步频加快", "鼻吸口呼，保持节奏", "结束时能说出完整句子"],
              commonMistakes: ["步幅过大伤膝盖", "含胸驼背", "憋气"],
              tempo: "中等步频（约110-120步/分）",
              weeklyProgress: [
                { week: 1, sets: 1, reps: "25分钟", weight: "自重", note: "第1周建立习惯，25分钟起步" },
                { week: 2, sets: 1, reps: "30分钟", weight: "自重", note: "增加5分钟，保持中等强度" },
                { week: 3, sets: 1, reps: "35分钟", weight: "自重", note: "再增加5分钟，累计105分钟/周" }
              ]
            }
          ],
          cooldown: [
            { name: "慢走恢复", duration: "3分钟" },
            { name: "小腿拉伸", duration: "每侧30秒" },
            { name: "股四头肌拉伸", duration: "每侧30秒" }
          ]
        },
        {
          day: 2,
          dayName: "周三",
          label: "有氧B — 椭圆机/骑行",
          warmup: [
            { name: "慢走热身", duration: "5分钟" },
            { name: "动态拉伸", duration: "3分钟" }
          ],
          exercises: [
            {
              id: "fl-elliptical-1",
              name: "椭圆机 或 固定自行车",
              category: "有氧",
              muscle: ["全身", "下肢"],
              sets: 1, reps: "30分钟", weight: "自重", rest: "—",
              cues: ["阻力调至中等（感觉有些阻力但能持续）", "保持稳定节奏", "心率维持105-115次/分", "椭圆机：全脚掌踩踏，不要踮脚", "骑行：座位高度调至腿伸直时微屈膝"],
              commonMistakes: ["阻力太大变成力量训练", "阻力太小无效果", "弯腰驼背"],
              tempo: "稳定踏频（椭圆机约60-70转/分）",
              weeklyProgress: [
                { week: 1, sets: 1, reps: "25分钟", weight: "阻力3-4档", note: "第1周适应器械，低阻力" },
                { week: 2, sets: 1, reps: "30分钟", weight: "阻力4-5档", note: "增加5分钟+微调阻力" },
                { week: 3, sets: 1, reps: "35分钟", weight: "阻力5档", note: "增加5分钟，累计105分钟/周" }
              ]
            }
          ],
          cooldown: [
            { name: "慢走恢复", duration: "3分钟" },
            { name: "腘绳肌拉伸", duration: "每侧30秒" },
            { name: "小腿拉伸", duration: "每侧30秒" }
          ]
        },
        {
          day: 3,
          dayName: "周五",
          label: "有氧C — 快走+轻度间歇",
          warmup: [
            { name: "慢走热身", duration: "5分钟" },
            { name: "动态拉伸", duration: "3分钟" }
          ],
          exercises: [
            {
              id: "fl-walk-interval-1",
              name: "快走 + 轻度间歇",
              category: "有氧",
              muscle: ["全身"],
              sets: 1, reps: "30分钟", weight: "自重", rest: "—",
              cues: ["前10分钟：正常快走热身", "中间10分钟：快走2分钟 + 加速走1分钟，交替进行", "后10分钟：恢复正常快走", "加速段心率可升至120-130，恢复段回到105-115", "全程不跑步，保护膝盖"],
              commonMistakes: ["加速段变成跑步", "恢复段停下来", "强度过大无法完成"],
              tempo: "变速走",
              weeklyProgress: [
                { week: 1, sets: 1, reps: "25分钟", weight: "自重", note: "第1周以匀速快走为主，末尾5分钟尝试1-2次加速" },
                { week: 2, sets: 1, reps: "30分钟", weight: "自重", note: "正式引入间歇：快走2分+加速1分×5组" },
                { week: 3, sets: 1, reps: "35分钟", weight: "自重", note: "增加5分钟，间歇组数增至7组" }
              ]
            }
          ],
          cooldown: [
            { name: "慢走恢复", duration: "3分钟" },
            { name: "全身静态拉伸", duration: "5分钟" }
          ]
        }
      ],
      cardio: {
        type: "中等强度持续有氧（MICT）",
        frequency: "每周3次（训练日即有氧日）",
        duration: "每次30-35分钟",
        intensity: "最大心率60-65%（约105-115次/分）",
        options: ["快走", "椭圆机", "固定自行车", "游泳（可选替代）"]
      }
    },

    // ========== 阶段二：有氧强化期（4-6周）==========
    {
      id: "fl-phase-2",
      name: "有氧强化期",
      weeks: "第4-6周",
      weekRange: [4, 6],
      description: "有氧时长和强度渐进提升，引入更多间歇训练。目标：每次40分钟，每周累计150分钟以上——这是独立减少肝脂肪≥30%的循证阈值。开始加入核心训练为后续抗阻做准备。",
      schedule: "每周3次（周一/周三/周五），每次40分钟",
      frequency: 3,
      split: "aerobic-core",
      focus: "提升有氧能力、增加燃脂、核心稳定准备",
      acsmParams: {
        type: "中等强度有氧 + 间歇训练 + 核心准备",
        duration: "每次35-40分钟",
        intensity: "最大心率65-75%（心率约115-135次/分）",
        target: "间歇段'能说短句但说不了长句'",
        progressiveOverload: "增加间歇组数或延长加速段时间"
      },
      workouts: [
        {
          day: 1,
          dayName: "周一",
          label: "有氧+核心A — 间歇走跑",
          warmup: [
            { name: "慢走热身", duration: "5分钟" },
            { name: "动态拉伸", duration: "3分钟" },
            { name: "猫牛式（核心激活）", duration: "1分钟" }
          ],
          exercises: [
            {
              id: "fl-walk-jog-2",
              name: "走跑间歇",
              category: "有氧",
              muscle: ["全身", "下肢"],
              sets: 1, reps: "35分钟", weight: "自重", rest: "—",
              cues: ["前5分钟快走热身", "中间25分钟：快走3分钟 + 慢跑1分钟，交替进行", "后5分钟慢走恢复", "慢跑段心率可达130-140", "快走段回到110-120", "慢跑不是冲刺，是'能勉强说话'的慢跑"],
              commonMistakes: ["慢跑段跑太快", "跳过热身直接间歇", "恢复段停下来"],
              tempo: "走跑交替",
              weeklyProgress: [
                { week: 4, sets: 1, reps: "35分钟", weight: "自重", note: "走3分+跑1分×6组，累计35分钟" },
                { week: 5, sets: 1, reps: "38分钟", weight: "自重", note: "走3分+跑1.5分×6组，增加跑步时间" },
                { week: 6, sets: 1, reps: "40分钟", weight: "自重", note: "走2分+跑2分×7组，跑步时长翻倍" }
              ]
            },
            {
              id: "fl-plank-2",
              name: "平板支撑",
              category: "核心",
              muscle: ["腹横肌", "腹直肌", "核心整体"],
              sets: 3, reps: "30-45秒", weight: "自重", rest: "45秒",
              cues: ["前臂撑地，肘在肩正下方", "身体从头到脚成一条直线", "核心收紧，腹部不塌", "呼吸均匀，不要憋气"],
              commonMistakes: ["臀部抬高", "塌腰", "憋气"],
              tempo: "持续保持",
              weeklyProgress: [
                { week: 4, sets: 3, reps: "30秒", weight: "自重", note: "3组×30秒，建立核心耐力" },
                { week: 5, sets: 3, reps: "40秒", weight: "自重", note: "增加10秒" },
                { week: 6, sets: 3, reps: "45秒", weight: "自重", note: "冲刺45秒" }
              ]
            },
            {
              id: "fl-deadbug-2",
              name: "死虫式",
              category: "核心",
              muscle: ["腹横肌", "核心稳定性"],
              sets: 3, reps: "每侧8-10次", weight: "自重", rest: "45秒",
              cues: ["仰卧，双臂伸向天花板，屈膝90度", "对侧手脚同时缓慢伸出", "腰部始终贴地", "缓慢收回，换另一侧"],
              commonMistakes: ["腰部离开地面", "动作过快"],
              tempo: "3秒伸出 - 1秒收回",
              weeklyProgress: [
                { week: 4, sets: 3, reps: "每侧8次", weight: "自重", note: "3组×每侧8次" },
                { week: 5, sets: 3, reps: "每侧10次", weight: "自重", note: "增加次数" },
                { week: 6, sets: 3, reps: "每侧10次", weight: "自重", note: "放慢节奏增加控制时间" }
              ]
            }
          ],
          cooldown: [
            { name: "慢走恢复", duration: "3分钟" },
            { name: "股四头肌拉伸", duration: "每侧30秒" },
            { name: "髋屈肌拉伸", duration: "每侧30秒" }
          ]
        },
        {
          day: 2,
          dayName: "周三",
          label: "有氧+核心B — 椭圆机间歇",
          warmup: [
            { name: "慢走热身", duration: "5分钟" },
            { name: "动态拉伸", duration: "3分钟" }
          ],
          exercises: [
            {
              id: "fl-elliptical-2",
              name: "椭圆机间歇",
              category: "有氧",
              muscle: ["全身", "下肢"],
              sets: 1, reps: "35分钟", weight: "自重", rest: "—",
              cues: ["前5分钟低阻力热身", "中间25分钟：中阻力3分钟 + 高阻力1分钟，交替", "后5分钟低阻力恢复", "高阻力段心率升至130-140", "保持踏频不要因阻力增大而变太慢"],
              commonMistakes: ["高阻力段弯腰借力", "阻力变化幅度太小", "恢复段完全停止"],
              tempo: "阻力间歇",
              weeklyProgress: [
                { week: 4, sets: 1, reps: "35分钟", weight: "阻力5-7档交替", note: "中5档+高7档交替×6组" },
                { week: 5, sets: 1, reps: "38分钟", weight: "阻力5-8档交替", note: "高阻力升至8档，增加3分钟" },
                { week: 6, sets: 1, reps: "40分钟", weight: "阻力6-9档交替", note: "整体阻力上调，累计120分钟/周" }
              ]
            },
            {
              id: "fl-glute-2",
              name: "臀桥",
              category: "核心/臀",
              muscle: ["臀大肌", "腘绳肌"],
              sets: 3, reps: "12-15次", weight: "自重", rest: "45秒",
              cues: ["仰卧屈膝，双脚平踩地面", "臀部发力顶起至身体成直线", "顶峰收缩1秒", "缓慢下放"],
              commonMistakes: ["用腰顶而非臀部", "过度伸展腰椎"],
              tempo: "1秒顶起 - 1秒停顿 - 2秒下放",
              weeklyProgress: [
                { week: 4, sets: 3, reps: "12次", weight: "自重", note: "3组×12次激活臀肌" },
                { week: 5, sets: 3, reps: "15次", weight: "自重", note: "增加次数" },
                { week: 6, sets: 3, reps: "15次", weight: "自重（单腿变式）", note: "尝试单腿臀桥增加难度" }
              ]
            },
            {
              id: "fl-birddog-2",
              name: "鸟狗式",
              category: "核心",
              muscle: ["核心稳定性", "竖脊肌", "臀大肌"],
              sets: 3, reps: "每侧8-10次", weight: "自重", rest: "45秒",
              cues: ["四点跪姿，手在肩下膝在髋下", "对侧手脚同时伸出", "保持身体稳定不晃", "收回换另一侧"],
              commonMistakes: ["身体晃动", "腰部塌陷"],
              tempo: "2秒伸 - 1秒停 - 2秒收",
              weeklyProgress: [
                { week: 4, sets: 3, reps: "每侧8次", weight: "自重", note: "3组×每侧8次" },
                { week: 5, sets: 3, reps: "每侧10次", weight: "自重", note: "增加次数" },
                { week: 6, sets: 3, reps: "每侧10次", weight: "自重", note: "放慢节奏增加控制时间" }
              ]
            }
          ],
          cooldown: [
            { name: "慢走恢复", duration: "3分钟" },
            { name: "腘绳肌拉伸", duration: "每侧30秒" },
            { name: "臀大肌拉伸（鸽式）", duration: "每侧30秒" }
          ]
        },
        {
          day: 3,
          dayName: "周五",
          label: "有氧+核心C — 坡度走间歇",
          warmup: [
            { name: "慢走热身", duration: "5分钟" },
            { name: "动态拉伸", duration: "3分钟" }
          ],
          exercises: [
            {
              id: "fl-incline-walk-2",
              name: "坡度快走间歇（跑步机）或户外坡路走",
              category: "有氧",
              muscle: ["全身", "下肢", "臀大肌"],
              sets: 1, reps: "35分钟", weight: "自重", rest: "—",
              cues: ["前5分钟平地快走热身", "中间25分钟：坡度走3分钟 + 平地加速走1分钟，交替", "后5分钟平地慢走恢复", "坡度段心率升至125-135", "坡度走时身体略前倾，不要抓住扶手", "户外版：找有坡度的路段替代"],
              commonMistakes: ["抓住跑步机扶手", "坡度走时弯腰", "步幅过大"],
              tempo: "坡度+速度间歇",
              weeklyProgress: [
                { week: 4, sets: 1, reps: "35分钟", weight: "坡度5%", note: "坡度5%走3分+平地走1分×6组" },
                { week: 5, sets: 1, reps: "38分钟", weight: "坡度6%", note: "坡度升至6%，增加3分钟" },
                { week: 6, sets: 1, reps: "40分钟", weight: "坡度8%", note: "坡度升至8%，累计120分钟/周" }
              ]
            },
            {
              id: "fl-sideplank-2",
              name: "侧平板支撑",
              category: "核心",
              muscle: ["腹斜肌", "核心稳定性"],
              sets: 3, reps: "每侧20-30秒", weight: "自重", rest: "45秒",
              cues: ["侧卧，前臂撑地", "髋部顶起成直线", "保持稳定不晃"],
              commonMistakes: ["髋部下沉", "身体不直"],
              tempo: "持续保持",
              weeklyProgress: [
                { week: 4, sets: 3, reps: "每侧20秒", weight: "自重", note: "3组×每侧20秒" },
                { week: 5, sets: 3, reps: "每侧25秒", weight: "自重", note: "增加5秒" },
                { week: 6, sets: 3, reps: "每侧30秒", weight: "自重", note: "冲刺30秒" }
              ]
            }
          ],
          cooldown: [
            { name: "慢走恢复", duration: "3分钟" },
            { name: "小腿拉伸", duration: "每侧30秒" },
            { name: "髋屈肌拉伸", duration: "每侧30秒" }
          ]
        }
      ],
      cardio: {
        type: "中等强度有氧 + 间歇训练",
        frequency: "每周3次（训练日即有氧日）",
        duration: "每次35-40分钟",
        intensity: "最大心率65-75%（约115-135次/分）",
        options: ["走跑交替", "椭圆机间歇", "坡度走间歇", "游泳间歇（可选）"]
      }
    },

    // ========== 阶段三：有氧+抗阻联合期（7-9周）==========
    {
      id: "fl-phase-3",
      name: "有氧+抗阻联合期",
      weeks: "第7-9周",
      weekRange: [7, 9],
      description: "引入抗阻训练，与有氧联合。Nature网状Meta分析证实AT+RT联合改善血脂效果最佳。STRRIDE研究显示有氧减少内脏脂肪，联合抗阻可进一步提升代谢改善。此阶段每次训练先做抗阻（20分钟），后有氧（25分钟），总计约45分钟。",
      schedule: "每周3次（周一/周三/周五），每次45分钟（抗阻20分+有氧25分）",
      frequency: 3,
      split: "combined",
      focus: "有氧+抗阻联合、提升代谢、改善血脂",
      acsmParams: {
        type: "抗阻训练 + 有氧训练联合",
        duration: "每次45分钟（抗阻20分+有氧25分）",
        intensity: "有氧65-75%最大心率；抗阻1RM的60-70%",
        target: "抗阻每组最后2-3次感到困难",
        progressiveOverload: "抗阻每1-2周增加次数或重量；有氧增加时长或强度"
      },
      workouts: [
        {
          day: 1,
          dayName: "周一",
          label: "联合A — 下肢抗阻 + 走跑有氧",
          warmup: [
            { name: "慢走热身", duration: "5分钟" },
            { name: "动态拉伸", duration: "3分钟" },
            { name: "深蹲热身组（自重×10）", duration: "1组" }
          ],
          exercises: [
            {
              id: "fl-squat-3",
              name: "高脚杯深蹲",
              category: "抗阻/下肢",
              muscle: ["股四头肌", "臀大肌", "核心"],
              sets: 3, reps: "12-15次", weight: "8-12kg哑铃", rest: "60秒",
              cues: ["双手捧哑铃于胸前", "双脚与肩同宽，脚尖略外展", "下蹲至大腿与地面平行", "膝盖方向与脚尖一致", "起身时脚掌蹬地"],
              commonMistakes: ["膝盖内扣", "腰部过度前倾", "脚跟离地"],
              tempo: "3秒下蹲 - 1秒停顿 - 1秒起身",
              weeklyProgress: [
                { week: 7, sets: 3, reps: "12次", weight: "8kg哑铃", note: "3组×12次，建立抗阻基础" },
                { week: 8, sets: 3, reps: "15次", weight: "10kg哑铃", note: "增加次数+重量" },
                { week: 9, sets: 3, reps: "12次", weight: "12kg哑铃", note: "加重，次数回归，强度提升" }
              ]
            },
            {
              id: "fl-rdl-3",
              name: "罗马尼亚硬拉（哑铃）",
              category: "抗阻/后链",
              muscle: ["腘绳肌", "臀大肌", "竖脊肌"],
              sets: 3, reps: "10-12次", weight: "8-12kg哑铃", rest: "60秒",
              cues: ["微屈膝，髋部后推", "哑铃沿大腿前侧下滑", "感受腘绳肌拉伸", "臀部发力起身"],
              commonMistakes: ["弯腰而非屈髋", "膝盖过度弯曲变成深蹲"],
              tempo: "3秒下 - 1秒起",
              weeklyProgress: [
                { week: 7, sets: 3, reps: "12次", weight: "8kg哑铃", note: "3组×12次学习屈髋" },
                { week: 8, sets: 3, reps: "12次", weight: "10kg哑铃", note: "增加重量" },
                { week: 9, sets: 3, reps: "10次", weight: "12kg哑铃", note: "加重，次数减2" }
              ]
            },
            {
              id: "fl-lunge-3",
              name: "弓步蹲（交替）",
              category: "抗阻/下肢",
              muscle: ["股四头肌", "臀大肌", "腘绳肌"],
              sets: 3, reps: "每侧10-12次", weight: "自重或持哑铃", rest: "60秒",
              cues: ["前脚跨一大步", "后膝下沉接近地面", "前膝不超过脚尖太多", "蹬回起始位"],
              commonMistakes: ["前膝内扣", "步幅太小变成半蹲"],
              tempo: "2秒下 - 1秒起",
              weeklyProgress: [
                { week: 7, sets: 3, reps: "每侧10次", weight: "自重", note: "3组自重弓步" },
                { week: 8, sets: 3, reps: "每侧12次", weight: "持哑铃各3kg", note: "加轻度负重" },
                { week: 9, sets: 3, reps: "每侧10次", weight: "持哑铃各5kg", note: "增加负重" }
              ]
            },
            {
              id: "fl-walk-jog-3",
              name: "走跑有氧",
              category: "有氧",
              muscle: ["全身"],
              sets: 1, reps: "25分钟", weight: "自重", rest: "—",
              cues: ["抗阻训练后立即开始有氧", "快走2分钟 + 慢跑2分钟交替", "慢跑段心率130-140", "快走段回到110-120", "最后3分钟慢走恢复"],
              commonMistakes: ["慢跑段跑太快", "跳过恢复段"],
              tempo: "走跑交替",
              weeklyProgress: [
                { week: 7, sets: 1, reps: "25分钟", weight: "自重", note: "走2分+跑2分×6组" },
                { week: 8, sets: 1, reps: "25分钟", weight: "自重", note: "走1.5分+跑2.5分×6组，增加跑步占比" },
                { week: 9, sets: 1, reps: "28分钟", weight: "自重", note: "走1分+跑3分×7组，跑步为主" }
              ]
            }
          ],
          cooldown: [
            { name: "慢走恢复", duration: "3分钟" },
            { name: "股四头肌拉伸", duration: "每侧30秒" },
            { name: "腘绳肌拉伸", duration: "每侧30秒" },
            { name: "小腿拉伸", duration: "每侧30秒" }
          ]
        },
        {
          day: 2,
          dayName: "周三",
          label: "联合B — 上肢抗阻 + 椭圆机有氧",
          warmup: [
            { name: "慢走热身", duration: "5分钟" },
            { name: "手臂环绕+肩部绕环", duration: "3分钟" },
            { name: "俯卧撑热身×8（可跪姿）", duration: "1组" }
          ],
          exercises: [
            {
              id: "fl-pushup-3",
              name: "俯卧撑",
              category: "抗阻/上肢",
              muscle: ["胸大肌", "三角肌前束", "肱三头肌"],
              sets: 3, reps: "8-12次", weight: "自重（可跪姿降阶）", rest: "60秒",
              cues: ["双手与肩同宽，手掌在肩正下方", "身体从头到脚成一条直线", "下降至胸部接近地面", "核心收紧，不要塌腰"],
              commonMistakes: ["塌腰", "臀部过高", "下降不充分"],
              tempo: "2秒下降 - 1秒起身",
              weeklyProgress: [
                { week: 7, sets: 3, reps: "8次", weight: "自重（可跪姿）", note: "3组×8次建立上肢力量" },
                { week: 8, sets: 3, reps: "10次", weight: "自重", note: "增加次数，尝试标准俯卧撑" },
                { week: 9, sets: 3, reps: "12次", weight: "自重", note: "增加次数至上限" }
              ]
            },
            {
              id: "fl-row-3",
              name: "反向划船（桌子/低杠）或弹力带划船",
              category: "抗阻/背",
              muscle: ["背阔肌", "菱形肌", "肱二头肌"],
              sets: 3, reps: "10-12次", weight: "自重", rest: "60秒",
              cues: ["找一张稳固的桌子或低杠", "双手抓握，身体悬空伸直", "胸部拉向桌面/杠", "肩胛骨先收拢再拉"],
              commonMistakes: ["用手臂拉而非背部", "身体不直", "未全程控制"],
              tempo: "2秒拉 - 1秒回落",
              weeklyProgress: [
                { week: 7, sets: 3, reps: "10次", weight: "自重", note: "3组×10次" },
                { week: 8, sets: 3, reps: "12次", weight: "自重", note: "增加次数" },
                { week: 9, sets: 3, reps: "12次", weight: "自重（加背包3kg）", note: "加轻度负重" }
              ]
            },
            {
              id: "fl-ohp-3",
              name: "哑铃肩推（坐姿）",
              category: "抗阻/肩",
              muscle: ["三角肌", "肱三头肌"],
              sets: 3, reps: "10-12次", weight: "3-6kg哑铃", rest: "60秒",
              cues: ["坐直，双脚踩稳", "哑铃在肩两侧", "推举过头至手臂伸直", "控制下落"],
              commonMistakes: ["腰部过度前凸", "推到后面而非正上方"],
              tempo: "1秒推 - 2秒落",
              weeklyProgress: [
                { week: 7, sets: 3, reps: "12次", weight: "3kg哑铃", note: "3组×12次学习推举" },
                { week: 8, sets: 3, reps: "12次", weight: "4kg哑铃", note: "增加重量" },
                { week: 9, sets: 3, reps: "10次", weight: "6kg哑铃", note: "加重，次数减2" }
              ]
            },
            {
              id: "fl-plank-3",
              name: "平板支撑",
              category: "核心",
              muscle: ["腹横肌", "腹直肌", "核心整体"],
              sets: 3, reps: "40-50秒", weight: "自重", rest: "45秒",
              cues: ["前臂撑地，肘在肩正下方", "身体从头到脚成一条直线", "核心收紧，腹部不塌", "呼吸均匀"],
              commonMistakes: ["臀部抬高", "塌腰", "憋气"],
              tempo: "持续保持",
              weeklyProgress: [
                { week: 7, sets: 3, reps: "40秒", weight: "自重", note: "3组×40秒" },
                { week: 8, sets: 3, reps: "45秒", weight: "自重", note: "增加5秒" },
                { week: 9, sets: 3, reps: "50秒", weight: "自重", note: "冲刺50秒" }
              ]
            },
            {
              id: "fl-elliptical-3",
              name: "椭圆机有氧",
              category: "有氧",
              muscle: ["全身"],
              sets: 1, reps: "25分钟", weight: "自重", rest: "—",
              cues: ["抗阻训练后立即开始", "中阻力3分钟 + 高阻力1分钟交替", "高阻力段心率130-140", "最后3分钟低阻力恢复"],
              commonMistakes: ["弯腰借力", "阻力太小"],
              tempo: "阻力间歇",
              weeklyProgress: [
                { week: 7, sets: 1, reps: "25分钟", weight: "阻力5-7档", note: "中5+高7交替×6组" },
                { week: 8, sets: 1, reps: "25分钟", weight: "阻力6-8档", note: "整体阻力上调" },
                { week: 9, sets: 1, reps: "28分钟", weight: "阻力6-9档", note: "增加3分钟+高阻力升至9档" }
              ]
            }
          ],
          cooldown: [
            { name: "慢走恢复", duration: "3分钟" },
            { name: "胸大肌拉伸", duration: "每侧30秒" },
            { name: "背阔肌拉伸", duration: "每侧30秒" },
            { name: "肩部拉伸", duration: "每侧30秒" }
          ]
        },
        {
          day: 3,
          dayName: "周五",
          label: "联合C — 全身抗阻 + 坡度走有氧",
          warmup: [
            { name: "慢走热身", duration: "5分钟" },
            { name: "动态拉伸", duration: "3分钟" },
            { name: "深蹲热身组×10 + 俯卧撑×5", duration: "1组" }
          ],
          exercises: [
            {
              id: "fl-goblet-3",
              name: "高脚杯深蹲",
              category: "抗阻/下肢",
              muscle: ["股四头肌", "臀大肌", "核心"],
              sets: 3, reps: "10-12次", weight: "10-14kg哑铃", rest: "60秒",
              cues: ["双手捧哑铃于胸前", "下蹲至大腿平行", "膝盖跟脚尖方向", "蹬地起身"],
              commonMistakes: ["膝盖内扣", "腰部圆背", "脚跟离地"],
              tempo: "2秒下 - 1秒起",
              weeklyProgress: [
                { week: 7, sets: 3, reps: "12次", weight: "10kg哑铃", note: "3组×12次" },
                { week: 8, sets: 3, reps: "12次", weight: "12kg哑铃", note: "+2kg" },
                { week: 9, sets: 3, reps: "10次", weight: "14kg哑铃", note: "+2kg，次数减2" }
              ]
            },
            {
              id: "fl-pushup-3c",
              name: "俯卧撑",
              category: "抗阻/上肢",
              muscle: ["胸大肌", "三角肌前束", "肱三头肌"],
              sets: 3, reps: "10-12次", weight: "自重", rest: "60秒",
              cues: ["双手与肩同宽", "身体成一条直线", "下降至胸部接近地面", "推起"],
              commonMistakes: ["塌腰", "臀部过高"],
              tempo: "2秒下 - 1秒上",
              weeklyProgress: [
                { week: 7, sets: 3, reps: "10次", weight: "自重", note: "3组×10次" },
                { week: 8, sets: 3, reps: "12次", weight: "自重", note: "增加次数" },
                { week: 9, sets: 3, reps: "12次", weight: "自重（加背包3kg）", note: "加轻度负重" }
              ]
            },
            {
              id: "fl-row-3c",
              name: "反向划船或弹力带划船",
              category: "抗阻/背",
              muscle: ["背阔肌", "菱形肌", "肱二头肌"],
              sets: 3, reps: "10-12次", weight: "自重", rest: "60秒",
              cues: ["双手抓握桌子/低杠", "身体伸直", "胸部拉向杠", "肩胛骨先收拢"],
              commonMistakes: ["用手臂拉", "身体不直"],
              tempo: "2秒拉 - 1秒回",
              weeklyProgress: [
                { week: 7, sets: 3, reps: "10次", weight: "自重", note: "3组×10次" },
                { week: 8, sets: 3, reps: "12次", weight: "自重", note: "增加次数" },
                { week: 9, sets: 3, reps: "12次", weight: "自重（加背包）", note: "加轻度负重" }
              ]
            },
            {
              id: "fl-hipthrust-3",
              name: "臀推（哑铃放髋部）",
              category: "抗阻/臀",
              muscle: ["臀大肌", "腘绳肌"],
              sets: 3, reps: "12-15次", weight: "8-12kg哑铃", rest: "60秒",
              cues: ["上背靠凳/沙发", "哑铃放髋部", "顶起至身体成线", "顶峰收缩1秒"],
              commonMistakes: ["用腰代偿", "幅度不够"],
              tempo: "1秒顶 - 1秒停 - 2秒落",
              weeklyProgress: [
                { week: 7, sets: 3, reps: "15次", weight: "8kg哑铃", note: "3组×15次" },
                { week: 8, sets: 3, reps: "15次", weight: "10kg哑铃", note: "+2kg" },
                { week: 9, sets: 3, reps: "12次", weight: "12kg哑铃", note: "+2kg，次数减3" }
              ]
            },
            {
              id: "fl-incline-walk-3",
              name: "坡度走有氧",
              category: "有氧",
              muscle: ["全身", "下肢"],
              sets: 1, reps: "25分钟", weight: "自重", rest: "—",
              cues: ["抗阻训练后立即开始", "坡度走3分钟 + 平地加速走1分钟交替", "坡度段心率125-135", "最后3分钟平地慢走恢复"],
              commonMistakes: ["抓住扶手", "弯腰"],
              tempo: "坡度+速度间歇",
              weeklyProgress: [
                { week: 7, sets: 1, reps: "25分钟", weight: "坡度6%", note: "坡度6%走3分+平地走1分×6组" },
                { week: 8, sets: 1, reps: "25分钟", weight: "坡度8%", note: "坡度升至8%" },
                { week: 9, sets: 1, reps: "28分钟", weight: "坡度10%", note: "坡度升至10%，增加3分钟" }
              ]
            }
          ],
          cooldown: [
            { name: "慢走恢复", duration: "3分钟" },
            { name: "股四头肌拉伸", duration: "每侧30秒" },
            { name: "胸大肌拉伸", duration: "每侧30秒" },
            { name: "背阔肌拉伸", duration: "每侧30秒" }
          ]
        }
      ],
      cardio: {
        type: "抗阻训练 + 有氧训练联合",
        frequency: "每周3次（训练日含抗阻+有氧）",
        duration: "每次45分钟（抗阻20分+有氧25分）",
        intensity: "有氧65-75%最大心率；抗阻1RM的60-70%",
        options: ["走跑交替", "椭圆机间歇", "坡度走间歇"]
      }
    },

    // ========== 阶段四：强化减脂期（10-12周）==========
    {
      id: "fl-phase-4",
      name: "强化减脂期",
      weeks: "第10-12周",
      weekRange: [10, 12],
      description: "有氧和抗阻强度均提升，加入HIIT（高强度间歇训练）。此时体能和心肺已有明显改善，体重应已下降3-5%。目标：每次50分钟，每周累计有氧150分钟以上+抗阻训练，最大化肝脂肪减少和代谢改善。8周后建议复查肝功能和肝脏超声评估效果。",
      schedule: "每周3次（周一/周三/周五），每次50分钟（抗阻20分+有氧30分）",
      frequency: 3,
      split: "combined-hiit",
      focus: "强化燃脂、HIIT介入、力量提升、巩固代谢改善",
      acsmParams: {
        type: "抗阻 + HIIT/MICT联合",
        duration: "每次50分钟（抗阻20分+有氧30分）",
        intensity: "有氧75-85%最大心率（HIIT段）；抗阻1RM的65-75%",
        target: "HIIT段'说不了完整句子'，抗阻接近力竭",
        progressiveOverload: "HIIT增加冲刺时长或组数；抗阻增加重量"
      },
      workouts: [
        {
          day: 1,
          dayName: "周一",
          label: "强化A — 下肢抗阻 + HIIT有氧",
          warmup: [
            { name: "慢走热身", duration: "5分钟" },
            { name: "动态拉伸", duration: "3分钟" },
            { name: "深蹲热身组×10", duration: "1组" }
          ],
          exercises: [
            {
              id: "fl-squat-4",
              name: "高脚杯深蹲（加重）",
              category: "抗阻/下肢",
              muscle: ["股四头肌", "臀大肌", "核心"],
              sets: 4, reps: "10-12次", weight: "12-16kg哑铃", rest: "60秒",
              cues: ["双手捧哑铃于胸前", "下蹲至大腿平行或略低", "蹬地起身", "保持核心紧绷"],
              commonMistakes: ["膝盖内扣", "圆背", "脚跟离地"],
              tempo: "2秒下 - 1秒起",
              weeklyProgress: [
                { week: 10, sets: 4, reps: "12次", weight: "12kg哑铃", note: "4组×12次，增加1组" },
                { week: 11, sets: 4, reps: "10次", weight: "14kg哑铃", note: "+2kg，次数减2" },
                { week: 12, sets: 4, reps: "10次", weight: "16kg哑铃", note: "+2kg，冲刺" }
              ]
            },
            {
              id: "fl-rdl-4",
              name: "罗马尼亚硬拉（哑铃）",
              category: "抗阻/后链",
              muscle: ["腘绳肌", "臀大肌", "竖脊肌"],
              sets: 4, reps: "10-12次", weight: "12-16kg哑铃", rest: "60秒",
              cues: ["微屈膝，髋后推", "哑铃沿大腿下滑", "感受后链拉伸", "臀部发力起身"],
              commonMistakes: ["弯腰", "变成深蹲"],
              tempo: "3秒下 - 1秒起",
              weeklyProgress: [
                { week: 10, sets: 4, reps: "12次", weight: "12kg哑铃", note: "4组×12次" },
                { week: 11, sets: 4, reps: "10次", weight: "14kg哑铃", note: "+2kg，次数减2" },
                { week: 12, sets: 4, reps: "10次", weight: "16kg哑铃", note: "+2kg，冲刺" }
              ]
            },
            {
              id: "fl-lunge-4",
              name: "行走弓步（持哑铃）",
              category: "抗阻/下肢",
              muscle: ["股四头肌", "臀大肌", "腘绳肌"],
              sets: 3, reps: "每侧12步", weight: "持哑铃各5-8kg", rest: "60秒",
              cues: ["大步前进", "后膝下沉", "蹬起换腿", "保持平衡"],
              commonMistakes: ["步幅太小", "前膝内扣"],
              tempo: "2秒下 - 1秒起",
              weeklyProgress: [
                { week: 10, sets: 3, reps: "每侧12步", weight: "持哑铃各5kg", note: "3组×每侧12步" },
                { week: 11, sets: 3, reps: "每侧12步", weight: "持哑铃各6kg", note: "+1kg" },
                { week: 12, sets: 3, reps: "每侧12步", weight: "持哑铃各8kg", note: "+2kg，冲刺" }
              ]
            },
            {
              id: "fl-hiit-4",
              name: "HIIT有氧（走跑间歇强化版）",
              category: "有氧/HIIT",
              muscle: ["全身"],
              sets: 1, reps: "30分钟", weight: "自重", rest: "—",
              cues: ["前3分钟快走热身", "中间24分钟：慢跑1分钟 + 加速跑30秒 + 快走1.5分钟，循环8组", "后3分钟慢走恢复", "加速跑段心率可达145-160", "慢跑段130-140", "快走段回到110-120", "如膝盖不适，加速跑可改为加速快走"],
              commonMistakes: ["加速跑段跑太快导致无法完成后续组数", "跳过恢复段", "热身不充分"],
              tempo: "高强度间歇",
              weeklyProgress: [
                { week: 10, sets: 1, reps: "30分钟", weight: "自重", note: "慢跑1分+加速30秒+快走1.5分×8组" },
                { week: 11, sets: 1, reps: "30分钟", weight: "自重", note: "慢跑1.5分+加速30秒+快走1分×8组，增加跑步占比" },
                { week: 12, sets: 1, reps: "32分钟", weight: "自重", note: "慢跑2分+加速30秒+快走1分×9组，冲刺阶段" }
              ]
            }
          ],
          cooldown: [
            { name: "慢走恢复", duration: "3分钟" },
            { name: "股四头肌拉伸", duration: "每侧30秒" },
            { name: "腘绳肌拉伸", duration: "每侧30秒" },
            { name: "小腿拉伸", duration: "每侧30秒" }
          ]
        },
        {
          day: 2,
          dayName: "周三",
          label: "强化B — 上肢抗阻 + 椭圆机HIIT",
          warmup: [
            { name: "慢走热身", duration: "5分钟" },
            { name: "手臂环绕+肩部绕环", duration: "3分钟" },
            { name: "俯卧撑热身×8", duration: "1组" }
          ],
          exercises: [
            {
              id: "fl-pushup-4",
              name: "俯卧撑",
              category: "抗阻/上肢",
              muscle: ["胸大肌", "三角肌前束", "肱三头肌"],
              sets: 4, reps: "10-12次", weight: "自重", rest: "60秒",
              cues: ["双手与肩同宽", "身体成直线", "下降至胸部接近地面", "推起"],
              commonMistakes: ["塌腰", "臀部过高"],
              tempo: "2秒下 - 1秒上",
              weeklyProgress: [
                { week: 10, sets: 4, reps: "12次", weight: "自重", note: "4组×12次" },
                { week: 11, sets: 4, reps: "12次", weight: "自重（加背包3kg）", note: "加轻度负重" },
                { week: 12, sets: 4, reps: "10次", weight: "自重（加背包5kg）", note: "增加负重，冲刺" }
              ]
            },
            {
              id: "fl-row-4",
              name: "哑铃划船（单臂）",
              category: "抗阻/背",
              muscle: ["背阔肌", "菱形肌", "肱二头肌"],
              sets: 4, reps: "10-12次", weight: "10-14kg哑铃", rest: "60秒",
              cues: ["单膝跪凳，另一脚撑地", "哑铃拉向髋部", "肩胛骨先收拢", "控制下放"],
              commonMistakes: ["用手臂拉而非背", "旋转躯干", "重量过大借力"],
              tempo: "1秒拉 - 2秒放",
              weeklyProgress: [
                { week: 10, sets: 4, reps: "12次", weight: "10kg哑铃", note: "4组×12次" },
                { week: 11, sets: 4, reps: "10次", weight: "12kg哑铃", note: "+2kg，次数减2" },
                { week: 12, sets: 4, reps: "10次", weight: "14kg哑铃", note: "+2kg，冲刺" }
              ]
            },
            {
              id: "fl-ohp-4",
              name: "哑铃肩推",
              category: "抗阻/肩",
              muscle: ["三角肌", "肱三头肌"],
              sets: 3, reps: "10-12次", weight: "5-8kg哑铃", rest: "60秒",
              cues: ["坐或站立，核心收紧", "哑铃在肩两侧", "推举过头", "控制下落"],
              commonMistakes: ["腰部过度前凸", "推到后方"],
              tempo: "1秒推 - 2秒落",
              weeklyProgress: [
                { week: 10, sets: 3, reps: "12次", weight: "5kg哑铃", note: "3组×12次" },
                { week: 11, sets: 3, reps: "10次", weight: "6kg哑铃", note: "+1kg，次数减2" },
                { week: 12, sets: 3, reps: "10次", weight: "8kg哑铃", note: "+2kg，冲刺" }
              ]
            },
            {
              id: "fl-plank-4",
              name: "平板支撑 + 侧平板",
              category: "核心",
              muscle: ["腹横肌", "腹直肌", "腹斜肌"],
              sets: 3, reps: "50-60秒+每侧30秒", weight: "自重", rest: "45秒",
              cues: ["平板支撑保持50-60秒", "立即转侧平板每侧30秒", "核心全程收紧", "呼吸均匀"],
              commonMistakes: ["塌腰", "臀部抬高", "憋气"],
              tempo: "持续保持",
              weeklyProgress: [
                { week: 10, sets: 3, reps: "50秒+每侧25秒", weight: "自重", note: "平板50秒+侧平板每侧25秒" },
                { week: 11, sets: 3, reps: "55秒+每侧30秒", weight: "自重", note: "增加时间" },
                { week: 12, sets: 3, reps: "60秒+每侧30秒", weight: "自重", note: "冲刺60秒" }
              ]
            },
            {
              id: "fl-elliptical-hiit-4",
              name: "椭圆机HIIT",
              category: "有氧/HIIT",
              muscle: ["全身"],
              sets: 1, reps: "30分钟", weight: "自重", rest: "—",
              cues: ["前3分钟低阻力热身", "中间24分钟：高阻力全力1分钟 + 低阻力恢复1.5分钟，循环约10组", "后3分钟低阻力恢复", "全力段心率145-160", "恢复段回到110-120", "全力段踏频加快，感受明显喘"],
              commonMistakes: ["全力段弯腰借力", "恢复段完全停止", "阻力变化幅度不够"],
              tempo: "高强度间歇",
              weeklyProgress: [
                { week: 10, sets: 1, reps: "30分钟", weight: "阻力6-10档", note: "全力1分+恢复1.5分×10组" },
                { week: 11, sets: 1, reps: "30分钟", weight: "阻力7-11档", note: "阻力上调" },
                { week: 12, sets: 1, reps: "32分钟", weight: "阻力8-12档", note: "阻力再上调，增加2分钟" }
              ]
            }
          ],
          cooldown: [
            { name: "慢走恢复", duration: "3分钟" },
            { name: "胸大肌拉伸", duration: "每侧30秒" },
            { name: "背阔肌拉伸", duration: "每侧30秒" },
            { name: "肩部拉伸", duration: "每侧30秒" }
          ]
        },
        {
          day: 3,
          dayName: "周五",
          label: "强化C — 全身抗阻 + 坡度HIIT",
          warmup: [
            { name: "慢走热身", duration: "5分钟" },
            { name: "动态拉伸", duration: "3分钟" },
            { name: "深蹲×10 + 俯卧撑×8", duration: "1组" }
          ],
          exercises: [
            {
              id: "fl-goblet-4",
              name: "高脚杯深蹲（大重量）",
              category: "抗阻/下肢",
              muscle: ["股四头肌", "臀大肌", "核心"],
              sets: 4, reps: "8-10次", weight: "14-18kg哑铃", rest: "90秒",
              cues: ["双手捧哑铃于胸前", "下蹲至平行或略低", "蹬地起身", "核心紧绷"],
              commonMistakes: ["膝盖内扣", "圆背", "脚跟离地"],
              tempo: "2秒下 - 1秒起",
              weeklyProgress: [
                { week: 10, sets: 4, reps: "10次", weight: "14kg哑铃", note: "4组×10次" },
                { week: 11, sets: 4, reps: "8次", weight: "16kg哑铃", note: "+2kg，次数减2" },
                { week: 12, sets: 4, reps: "8次", weight: "18kg哑铃", note: "+2kg，冲刺" }
              ]
            },
            {
              id: "fl-pushup-4c",
              name: "钻石俯卧撑（或窄距）",
              category: "抗阻/上肢",
              muscle: ["肱三头肌", "胸大肌内侧", "三角肌前束"],
              sets: 3, reps: "8-10次", weight: "自重", rest: "60秒",
              cues: ["双手食指拇指相触成菱形", "身体保持直线", "下降至胸部接近手背", "推起"],
              commonMistakes: ["手距过宽", "塌腰"],
              tempo: "2秒下 - 1秒上",
              weeklyProgress: [
                { week: 10, sets: 3, reps: "8次", weight: "自重（可跪姿）", note: "3组×8次" },
                { week: 11, sets: 3, reps: "10次", weight: "自重", note: "增加次数" },
                { week: 12, sets: 3, reps: "10次", weight: "自重", note: "巩固" }
              ]
            },
            {
              id: "fl-row-4c",
              name: "哑铃划船（加重）",
              category: "抗阻/背",
              muscle: ["背阔肌", "菱形肌", "肱二头肌"],
              sets: 4, reps: "10-12次", weight: "12-16kg哑铃", rest: "60秒",
              cues: ["俯身约45度，背挺直", "哑铃拉向髋部", "肩胛骨先收拢", "控制下放"],
              commonMistakes: ["圆背", "直立过多"],
              tempo: "1秒拉 - 2秒放",
              weeklyProgress: [
                { week: 10, sets: 4, reps: "12次", weight: "12kg哑铃", note: "4组×12次" },
                { week: 11, sets: 4, reps: "10次", weight: "14kg哑铃", note: "+2kg，次数减2" },
                { week: 12, sets: 4, reps: "10次", weight: "16kg哑铃", note: "+2kg，冲刺" }
              ]
            },
            {
              id: "fl-hipthrust-4",
              name: "臀推（哑铃加重）",
              category: "抗阻/臀",
              muscle: ["臀大肌", "腘绳肌"],
              sets: 4, reps: "10-12次", weight: "12-16kg哑铃", rest: "60秒",
              cues: ["上背靠凳", "哑铃放髋部", "顶起至身体成线", "顶峰收缩1秒"],
              commonMistakes: ["用腰代偿", "幅度不够"],
              tempo: "1秒顶 - 1秒停 - 2秒落",
              weeklyProgress: [
                { week: 10, sets: 4, reps: "12次", weight: "12kg哑铃", note: "4组×12次" },
                { week: 11, sets: 4, reps: "10次", weight: "14kg哑铃", note: "+2kg，次数减2" },
                { week: 12, sets: 4, reps: "10次", weight: "16kg哑铃", note: "+2kg，冲刺" }
              ]
            },
            {
              id: "fl-incline-hiit-4",
              name: "坡度走HIIT",
              category: "有氧/HIIT",
              muscle: ["全身", "下肢", "臀大肌"],
              sets: 1, reps: "30分钟", weight: "自重", rest: "—",
              cues: ["前3分钟平地快走热身", "中间24分钟：高坡度全力走1分钟 + 平地慢走1.5分钟，循环约10组", "后3分钟平地慢走恢复", "高坡度段心率可达140-155", "平地段回到110-120", "高坡度段不要抓住扶手，身体略前倾", "户外版：坡路快走+平路慢走交替"],
              commonMistakes: ["抓住扶手", "弯腰", "坡度太低效果差"],
              tempo: "坡度间歇",
              weeklyProgress: [
                { week: 10, sets: 1, reps: "30分钟", weight: "坡度8-12%", note: "高坡度1分+平地1.5分×10组" },
                { week: 11, sets: 1, reps: "30分钟", weight: "坡度10-14%", note: "坡度上调" },
                { week: 12, sets: 1, reps: "32分钟", weight: "坡度12-15%", note: "坡度再上调，增加2分钟" }
              ]
            }
          ],
          cooldown: [
            { name: "慢走恢复", duration: "3分钟" },
            { name: "股四头肌拉伸", duration: "每侧30秒" },
            { name: "胸大肌拉伸", duration: "每侧30秒" },
            { name: "背阔肌拉伸", duration: "每侧30秒" },
            { name: "小腿拉伸", duration: "每侧30秒" }
          ]
        }
      ],
      cardio: {
        type: "抗阻训练 + HIIT/MICT联合",
        frequency: "每周3次（训练日含抗阻+有氧）",
        duration: "每次50分钟（抗阻20分+有氧30分）",
        intensity: "有氧75-85%最大心率（HIIT段）；抗阻1RM的65-75%",
        options: ["走跑HIIT", "椭圆机HIIT", "坡度走HIIT", "游泳间歇（可选替代有氧）"]
      }
    }
  ]
};
