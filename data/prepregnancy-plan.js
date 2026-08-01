// 备孕运动专项数据
// 基于备孕、孕期、产后恢复的运动科学指南
// 针对用户情况：女性、腰椎有伤、居家哑铃训练

export const prepregnancyPlan = {
  meta: {
    title: "备孕运动专项",
    subtitle: "为怀孕、生产、产后恢复打好身体基础",
    targetUser: "计划四轮减脂后备孕的女性",
    principles: [
      "盆底肌训练（凯格尔运动）—— 每天3组，孕期产后都能做",
      "核心稳定性训练 —— 强化腹横肌，预防孕期腰痛和腹直肌分离",
      "骨盆灵活性训练 —— 改善骨盆血液循环，利于受孕",
      "臀腿力量训练 —— 深蹲/臀桥为分娩用力做准备",
      "腰椎安全保护 —— 所有动作避免腰部负重和过度前倾",
      "柔韧与放松 —— 缓解压力，调节内分泌"
    ],
    safetyNotes: [
      "⚠️ 所有动作保持自然呼吸，不要憋气",
      "⚠️ 腰椎不适时立即停止，降低难度或跳过该动作",
      "⚠️ 备孕期间避免：大重量负重、高冲击跳跃、腹部挤压动作",
      "⚠️ 确认怀孕后需切换为孕期专项运动， consulted 医生后调整"
    ]
  },

  // 按类别分组的运动
  categories: [
    {
      id: "pelvic-floor",
      name: "盆底肌训练",
      icon: "🌸",
      color: "#FF9A8B",
      description: "盆底肌是支撑子宫、膀胱、直肠的'吊床'。强化盆底肌能预防孕期漏尿、子宫脱垂，促进顺产，加速产后恢复。",
      benefits: ["预防孕期尿失禁", "助力顺产", "加速产后恢复", "改善性生活质量"],
      schedule: "每天3组，每组10-15次收缩，随时随地可做",
      exercises: [
        {
          id: "kegel-basic",
          name: "凯格尔基础收缩",
          duration: "5分钟",
          difficulty: "入门",
          steps: [
            "排空膀胱，坐姿/仰卧/站立均可",
            "想象憋尿的感觉，收缩阴道和肛门周围的肌肉",
            "收缩保持5-10秒（初期可从3秒开始）",
            "缓慢放松5-10秒，完全放松很重要",
            "重复10-15次为1组"
          ],
          cues: ["只收缩盆底肌，不要夹臀或收腹", "保持正常呼吸，不要憋气", "放松和收缩同样重要"],
          weeklyProgress: [
            { week: 1, sets: 3, reps: "10次×3秒保持", note: "学习感知盆底肌" },
            { week: 2, sets: 3, reps: "12次×5秒保持", note: "增加保持时间" },
            { week: 3, sets: 3, reps: "15次×8秒保持", note: "增加次数和时长" },
            { week: 4, sets: 4, reps: "15次×10秒保持", note: "增加1组，达到目标强度" }
          ]
        },
        {
          id: "kegel-elevator",
          name: "电梯式凯格尔（渐进收缩）",
          duration: "5分钟",
          difficulty: "进阶",
          steps: [
            "收缩盆底肌，想象一部电梯缓缓上升",
            "分3级逐步收紧：轻收→中收→全收，每级停2秒",
            "到达顶部后停留3秒",
            "再分3级缓缓下降放松：全松→中松→全放",
            "重复5-8次为1组"
          ],
          cues: ["每一级都要明显感觉肌肉收紧程度不同", "下降放松阶段同样重要", "全程呼吸平稳"],
          weeklyProgress: [
            { week: 1, sets: 2, reps: "5次", note: "感受分级收缩" },
            { week: 2, sets: 2, reps: "8次", note: "增加次数" },
            { week: 3, sets: 3, reps: "8次", note: "增加1组" },
            { week: 4, sets: 3, reps: "10次", note: "巩固强化" }
          ]
        },
        {
          id: "kegel-quick",
          name: "快速脉冲收缩",
          duration: "3分钟",
          difficulty: "进阶",
          steps: [
            "快速收缩盆底肌1秒，立刻放松1秒",
            "连续做20次为1组",
            "组间休息30秒"
          ],
          cues: ["快收快放，像脉冲一样", "确保每次都能完全放松", "这是快肌纤维训练，帮助应对咳嗽/打喷嚏时的压力"],
          weeklyProgress: [
            { week: 1, sets: 2, reps: "10次", note: "快速收缩入门" },
            { week: 2, sets: 2, reps: "15次", note: "增加次数" },
            { week: 3, sets: 3, reps: "20次", note: "增加1组和次数" },
            { week: 4, sets: 3, reps: "25次", note: "巩固强化" }
          ]
        }
      ]
    },

    {
      id: "core-stability",
      name: "核心稳定性训练",
      icon: "💪",
      color: "#6BCB77",
      description: "强化腹横肌和深层核心，为孕期承托逐渐增大的腹部重量做准备，预防腹直肌分离和孕期腰痛。腰椎安全友好！",
      benefits: ["预防孕期腰痛", "预防腹直肌分离", "稳定腰椎保护腰部", "为分娩发力打基础"],
      schedule: "每周3-4次，与常规训练日合并",
      exercises: [
        {
          id: "dead-bug",
          name: "死虫子（Dead Bug）",
          duration: "5分钟",
          difficulty: "入门",
          lumbarSafe: true,
          steps: [
            "仰卧，双臂伸直指向天花板，双腿屈膝90度抬起",
            "腰部紧贴地面（关键！腰椎不能拱起）",
            "缓慢伸直右臂和左腿，直到接近地面",
            "保持腰部贴地，原路返回",
            "换左臂右腿，交替进行"
          ],
          cues: ["腰部始终贴地是核心", "动作要慢，控制优先", "呼吸均匀，不要憋气"],
          lumbarNote: "✅ 腰椎安全：腰部全程贴地，无轴向负荷",
          weeklyProgress: [
            { week: 1, sets: 2, reps: "8次/侧", note: "学习动作，慢速控制" },
            { week: 2, sets: 3, reps: "10次/侧", note: "增加组和次数" },
            { week: 3, sets: 3, reps: "12次/侧", note: "增加次数" },
            { week: 4, sets: 3, reps: "15次/侧", note: "达到目标容量" }
          ]
        },
        {
          id: "bird-dog",
          name: "鸟狗式（Bird Dog）",
          duration: "4分钟",
          difficulty: "入门",
          lumbarSafe: true,
          steps: [
            "四点跪姿：双手在肩正下方，双膝在髋正下方",
            "同时伸直右臂向前、左腿向后",
            "保持脊柱中立，身体不晃动",
            "停留2秒后返回，换另一侧"
          ],
          cues: ["想象背上放一杯水不能洒", "核心收紧，臀部不左右摇晃", "伸展的肢体不要过高"],
          lumbarNote: "✅ 腰椎安全：脊柱保持中立位，强化多裂肌",
          weeklyProgress: [
            { week: 1, sets: 2, reps: "8次/侧", note: "学习平衡和控制" },
            { week: 2, sets: 3, reps: "10次/侧", note: "增加容量" },
            { week: 3, sets: 3, reps: "12次/侧", note: "增加次数" },
            { week: 4, sets: 3, reps: "12次/侧", note: "可增加2秒停留时间" }
          ]
        },
        {
          id: "plank-modified",
          name: "改良平板支撑（跪姿）",
          duration: "3分钟",
          difficulty: "入门",
          lumbarSafe: true,
          steps: [
            "前臂支撑，膝盖着地（跪姿降阶）",
            "身体从头顶到膝盖成一条直线",
            "腹部收紧，不要塌腰",
            "保持呼吸均匀"
          ],
          cues: ["塌腰是最大禁忌，腰部有弧度就停下", "臀部不要翘太高", "循序渐进增加时间"],
          lumbarNote: "✅ 腰椎安全：跪姿降低负荷，前臂支撑减少压力",
          weeklyProgress: [
            { week: 1, sets: 2, reps: "15秒", note: "短时间建立基础" },
            { week: 2, sets: 3, reps: "20秒", note: "增加时间和组数" },
            { week: 3, sets: 3, reps: "30秒", note: "达到目标时长" },
            { week: 4, sets: 3, reps: "40秒", note: "巩固强化" }
          ]
        },
        {
          id: "side-plank-knee",
          name: "跪姿侧平板",
          duration: "3分钟",
          difficulty: "进阶",
          lumbarSafe: true,
          steps: [
            "侧卧，前臂撑地，膝盖弯曲着地",
            "抬起髋部，身体侧面成一条线",
            "保持20-30秒，换另一侧"
          ],
          cues: ["髋部不要下沉", "核心侧面收紧", "呼吸均匀"],
          lumbarNote: "✅ 腰椎安全：跪姿侧平板减少腰椎轴向压力",
          weeklyProgress: [
            { week: 1, sets: 2, reps: "10秒/侧", note: "学习动作" },
            { week: 2, sets: 2, reps: "15秒/侧", note: "增加时长" },
            { week: 3, sets: 3, reps: "20秒/侧", note: "增加组数和时长" },
            { week: 4, sets: 3, reps: "30秒/侧", note: "达到目标时长" }
          ]
        }
      ]
    },

    {
      id: "pelvic-mobility",
      name: "骨盆灵活性训练",
      icon: "🦋",
      color: "#9B7EDE",
      description: "改善骨盆区域血液循环，利于卵巢供血和受孕。放松紧绷的髋部和骨盆周围肌肉，为分娩时骨盆打开做准备。",
      benefits: ["改善骨盆血液循环利于受孕", "放松髋部和腰部", "为分娩骨盆扩张做准备", "缓解腰椎压力"],
      schedule: "每周3-5次，可每日做",
      exercises: [
        {
          id: "cat-cow",
          name: "猫牛式（脊柱灵活性）",
          duration: "3分钟",
          difficulty: "入门",
          lumbarSafe: true,
          steps: [
            "四点跪姿，双手在肩下，双膝在髋下",
            "吸气时抬头塌腰（牛式），腹部微下沉",
            "呼气时低头拱背（猫式），收紧腹部",
            "缓慢交替，配合呼吸"
          ],
          cues: ["动作缓慢流畅", "配合呼吸节奏", "感受脊柱一节一节运动"],
          lumbarNote: "✅ 腰椎安全：温和的脊柱灵活性训练，缓解腰部僵硬",
          weeklyProgress: [
            { week: 1, sets: 2, reps: "8次", note: "学习动作模式" },
            { week: 2, sets: 2, reps: "10次", note: "增加次数" },
            { week: 3, sets: 3, reps: "12次", note: "增加组数" },
            { week: 4, sets: 3, reps: "15次", note: "巩固强化" }
          ]
        },
        {
          id: "pelvic-tilt",
          name: "骨盆前后倾（仰卧）",
          duration: "3分钟",
          difficulty: "入门",
          lumbarSafe: true,
          steps: [
            "仰卧，双膝弯曲，脚平放地面",
            "吸气时腰部自然拱起（骨盆前倾）",
            "呼气时收紧腹部，腰部贴向地面（骨盆后倾）",
            "缓慢交替"
          ],
          cues: ["动作幅度小而精准", "感受骨盆的倾斜变化", "配合呼吸"],
          lumbarNote: "✅ 腰椎安全：仰卧位，无轴向负荷，温和活动腰椎",
          weeklyProgress: [
            { week: 1, sets: 2, reps: "10次", note: "感知骨盆运动" },
            { week: 2, sets: 3, reps: "12次", note: "增加容量" },
            { week: 3, sets: 3, reps: "15次", note: "增加次数" },
            { week: 4, sets: 3, reps: "15次", note: "可加入弹力带抗阻" }
          ]
        },
        {
          id: "butterfly-stretch",
          name: "蝴蝶式（髋部开放）",
          duration: "3分钟",
          difficulty: "入门",
          lumbarSafe: true,
          steps: [
            "坐姿，脚掌相对，双膝向两侧打开",
            "双手握住脚掌，背部挺直",
            "温和地用肘部轻压双膝向下",
            "保持30秒，放松10秒，重复3次"
          ],
          cues: ["背部挺直不要弓背", "膝盖不要强压，有拉伸感即可", "保持均匀呼吸"],
          lumbarNote: "✅ 腰椎安全：坐姿拉伸，背部保持中立",
          weeklyProgress: [
            { week: 1, sets: 2, reps: "20秒保持", note: "感受髋部拉伸" },
            { week: 2, sets: 3, reps: "25秒保持", note: "增加时长" },
            { week: 3, sets: 3, reps: "30秒保持", note: "达到目标时长" },
            { week: 4, sets: 3, reps: "35秒保持", note: "巩固强化" }
          ]
        },
        {
          id: "hip-circle",
          name: "髋部环绕（站立）",
          duration: "2分钟",
          difficulty: "入门",
          lumbarSafe: true,
          steps: [
            "站立，双手叉腰，双脚与肩同宽",
            "以髋部为轴，顺时针画圆10圈",
            "再逆时针画圆10圈",
            "动作幅度适中，保持上身稳定"
          ],
          cues: ["上半身尽量不动，只动髋部", "画圆幅度由小到大", "呼吸均匀"],
          lumbarNote: "✅ 腰椎安全：站立位温和活动，改善骨盆血液循环",
          weeklyProgress: [
            { week: 1, sets: 2, reps: "8圈/方向", note: "学习动作" },
            { week: 2, sets: 2, reps: "10圈/方向", note: "增加圈数" },
            { week: 3, sets: 3, reps: "12圈/方向", note: "增加组数" },
            { week: 4, sets: 3, reps: "15圈/方向", note: "巩固强化" }
          ]
        }
      ]
    },

    {
      id: "birth-prep",
      name: "分娩准备训练",
      icon: "🤰",
      color: "#FFD93D",
      description: "强化分娩需要用到的肌肉群——臀腿力量、核心发力、呼吸控制。为顺产时的推力阶段和耐力做准备。",
      benefits: ["增强分娩推力", "提高分娩耐力", "学习正确呼吸模式", "加速产后恢复"],
      schedule: "每周2-3次，融入常规训练日",
      exercises: [
        {
          id: "sumo-squat",
          name: "相扑深蹲（宽距）",
          duration: "5分钟",
          difficulty: "中级",
          lumbarSafe: true,
          steps: [
            "双脚站距比肩宽，脚尖外展30-45度",
            "双手持一个哑铃垂直于体前（或自重）",
            "下蹲时膝盖沿脚尖方向打开",
            "蹲到大腿与地面平行，起身时臀部发力"
          ],
          cues: ["宽站距打开骨盆，利于分娩", "膝盖方向与脚尖一致", "起身时夹紧臀部"],
          lumbarNote: "✅ 腰椎安全：哑铃在体前，脊柱保持中立，负荷分布均匀",
          weeklyProgress: [
            { week: 1, sets: 2, reps: "10次", weight: "自重", note: "学习宽距深蹲" },
            { week: 2, sets: 3, reps: "12次", weight: "自重", note: "增加容量" },
            { week: 3, sets: 3, reps: "12次", weight: "6-8kg哑铃", note: "加入负重" },
            { week: 4, sets: 3, reps: "15次", weight: "8-10kg哑铃", note: "增加重量和次数" }
          ]
        },
        {
          id: "glute-bridge",
          name: "臀桥",
          duration: "4分钟",
          difficulty: "入门",
          lumbarSafe: true,
          steps: [
            "仰卧，双膝弯曲，脚平放地面与臀同宽",
            "脚跟发力抬起臀部，直到身体成一条线",
            "顶部夹紧臀部，停顿2秒",
            "缓慢下放"
          ],
          cues: ["顶部不要过度挺腰", "臀部发力而非腰部", "膝盖不要外翻或内扣"],
          lumbarNote: "✅ 腰椎安全：仰卧位，强化臀部减少腰部代偿",
          weeklyProgress: [
            { week: 1, sets: 2, reps: "12次", weight: "自重", note: "学习臀部发力" },
            { week: 2, sets: 3, reps: "15次", weight: "自重", note: "增加容量" },
            { week: 3, sets: 3, reps: "12次", weight: "骨盆上放哑铃", note: "加入负重" },
            { week: 4, sets: 3, reps: "15次", weight: "8-10kg哑铃", note: "增加重量和次数" }
          ]
        },
        {
          id: "wall-sit",
          name: "靠墙静蹲",
          duration: "3分钟",
          difficulty: "入门",
          lumbarSafe: true,
          steps: [
            "背靠墙站立，双脚向前迈一步",
            "缓慢下蹲至大腿与地面平行（或接近）",
            "背部贴墙，保持静止",
            "坚持目标时间"
          ],
          cues: ["膝盖不超过脚尖", "背部全程贴墙", "大腿前侧发力"],
          lumbarNote: "✅ 腰椎安全：背部有墙面支撑，腰椎几乎无负荷",
          weeklyProgress: [
            { week: 1, sets: 2, reps: "20秒", note: "建立基础耐力" },
            { week: 2, sets: 3, reps: "30秒", note: "增加时长和组数" },
            { week: 3, sets: 3, reps: "45秒", note: "增加时长" },
            { week: 4, sets: 3, reps: "60秒", note: "达到目标时长" }
          ]
        },
        {
          id: "birth-breathing",
          name: "分娩呼吸法练习",
          duration: "5分钟",
          difficulty: "入门",
          lumbarSafe: true,
          steps: [
            "舒适坐姿或仰卧，一手放胸、一手放腹",
            "缓慢鼻吸气4秒——感受腹部隆起（腹式呼吸）",
            "嘴唇微撅缓慢呼气6-8秒——感受腹部回缩",
            "模拟推力阶段：快速短促呼吸3次+长呼气1次",
            "循环练习"
          ],
          cues: ["胸部的手几乎不动，腹部的手起伏明显", "呼气比吸气长，帮助放松", "这是拉玛泽呼吸法的基础"],
          lumbarNote: "✅ 腰椎安全：纯呼吸练习，无身体负荷",
          weeklyProgress: [
            { week: 1, sets: 1, reps: "3分钟腹式呼吸", note: "掌握腹式呼吸" },
            { week: 2, sets: 1, reps: "4分钟（含呼气延长）", note: "延长呼气时间" },
            { week: 3, sets: 2, reps: "5分钟（含推力模拟）", note: "加入推力呼吸" },
            { week: 4, sets: 2, reps: "5分钟完整练习", note: "熟练掌握整套" }
          ]
        }
      ]
    },

    {
      id: "relax-stretch",
      name: "柔韧与放松",
      icon: "🌿",
      color: "#4ECDC4",
      description: "缓解训练压力，调节内分泌平衡。放松紧绷的腰背和髋部，改善睡眠质量，为受孕创造良好的身心状态。",
      benefits: ["缓解压力调节内分泌", "改善睡眠质量", "放松腰背和髋部", "促进身心平衡利于受孕"],
      schedule: "每日睡前或训练后5-10分钟",
      exercises: [
        {
          id: "child-pose",
          name: "婴儿式（放松腰背）",
          duration: "2分钟",
          difficulty: "入门",
          lumbarSafe: true,
          steps: [
            "跪坐，双膝分开与垫同宽",
            "上身前倾，额头触地",
            "双臂向前伸展或放体侧",
            "完全放松，深呼吸"
          ],
          cues: ["臀部坐在脚跟上", "背部完全放松延展", "每次呼气时放松更多"],
          lumbarNote: "✅ 腰椎安全：跪姿前屈，温和延展腰背肌群",
          weeklyProgress: [
            { week: 1, sets: 1, reps: "30秒", note: "感受腰背放松" },
            { week: 2, sets: 1, reps: "60秒", note: "延长保持时间" },
            { week: 3, sets: 2, reps: "60秒", note: "增加组数" },
            { week: 4, sets: 2, reps: "90秒", note: "延长保持时间" }
          ]
        },
        {
          id: "supine-twist",
          name: "仰卧脊柱扭转（温和）",
          duration: "3分钟",
          difficulty: "入门",
          lumbarSafe: true,
          steps: [
            "仰卧，双臂张开呈T形",
            "右膝弯曲，跨过身体向左侧倒",
            "头部转向右侧，保持双肩贴地",
            "保持30秒后换另一侧"
          ],
          cues: ["双肩尽量不离开地面", "扭转幅度温和，不要勉强", "配合深呼吸放松"],
          lumbarNote: "✅ 腰椎安全：仰卧位温和扭转，幅度可控",
          weeklyProgress: [
            { week: 1, sets: 1, reps: "20秒/侧", note: "感受脊柱放松" },
            { week: 2, sets: 2, reps: "25秒/侧", note: "增加时长和组数" },
            { week: 3, sets: 2, reps: "30秒/侧", note: "达到目标时长" },
            { week: 4, sets: 2, reps: "35秒/侧", note: "巩固强化" }
          ]
        },
        {
          id: "deep-breathing",
          name: "腹式深呼吸冥想",
          duration: "5分钟",
          difficulty: "入门",
          lumbarSafe: true,
          steps: [
            "舒适仰卧或坐姿，闭眼",
            "一手放胸、一手放腹",
            "鼻吸气4秒，腹部隆起（胸部不动）",
            "屏息2秒",
            "嘴呼气6秒，腹部回缩",
            "循环5-10分钟"
          ],
          cues: ["专注呼吸节奏", "思绪飘走时温柔地拉回", "这是减压和调节自主神经的最佳练习"],
          lumbarNote: "✅ 腰椎安全：纯呼吸冥想，无身体负荷",
          weeklyProgress: [
            { week: 1, sets: 1, reps: "3分钟", note: "建立腹式呼吸习惯" },
            { week: 2, sets: 1, reps: "5分钟", note: "延长练习时间" },
            { week: 3, sets: 1, reps: "8分钟", note: "加深冥想" },
            { week: 4, sets: 2, reps: "5分钟（早晚各一次）", note: "每日两次巩固习惯" }
          ]
        }
      ]
    }
  ],

  // 7天每日备孕训练计划（每天约15-20分钟）
  // 与常规减脂训练并行，不冲突
  // 训练日（周三五日）安排较短的备孕专项，休息日（周一二四六）安排较完整的练习
  dailyPlan: [
    {
      day: 1, dayName: "周一", type: "休息日", duration: "约20分钟",
      label: "休息日·骨盆专项",
      note: "重点骨盆灵活+放松，促进血液循环",
      exercises: [
        { exerciseId: "kegel-elevator", name: "凯格尔电梯式", duration: "5分钟" },
        { exerciseId: "cat-cow", name: "猫牛式", duration: "3分钟" },
        { exerciseId: "pelvic-tilt", name: "骨盆前后倾", duration: "3分钟" },
        { exerciseId: "butterfly-stretch", name: "蝴蝶式", duration: "3分钟" },
        { exerciseId: "child-pose", name: "婴儿式", duration: "3分钟" }
      ]
    },
    {
      day: 2, dayName: "周二", type: "休息日", duration: "约20分钟",
      label: "休息日·核心稳定",
      note: "强化核心，保护腰椎",
      exercises: [
        { exerciseId: "kegel-basic", name: "凯格尔基础收缩", duration: "5分钟" },
        { exerciseId: "dead-bug", name: "死虫子", duration: "4分钟" },
        { exerciseId: "plank-modified", name: "改良平板支撑", duration: "3分钟" },
        { exerciseId: "side-plank-knee", name: "跪姿侧平板", duration: "3分钟" },
        { exerciseId: "supine-twist", name: "仰卧脊柱扭转", duration: "3分钟" }
      ]
    },
    {
      day: 3, dayName: "周三", type: "训练日", duration: "约15分钟",
      label: "训练日·简版",
      note: "常规训练后追加，重点盆底肌+核心",
      exercises: [
        { exerciseId: "kegel-basic", name: "凯格尔基础收缩", duration: "5分钟" },
        { exerciseId: "dead-bug", name: "死虫子", duration: "4分钟" },
        { exerciseId: "cat-cow", name: "猫牛式", duration: "3分钟" },
        { exerciseId: "deep-breathing", name: "腹式深呼吸", duration: "3分钟" }
      ]
    },
    {
      day: 4, dayName: "周四", type: "休息日", duration: "约20分钟",
      label: "休息日·分娩准备",
      note: "模拟分娩发力+呼吸法",
      exercises: [
        { exerciseId: "kegel-basic", name: "凯格尔基础收缩", duration: "5分钟" },
        { exerciseId: "sumo-squat", name: "相扑深蹲", duration: "4分钟" },
        { exerciseId: "wall-sit", name: "靠墙静蹲", duration: "3分钟" },
        { exerciseId: "glute-bridge", name: "臀桥", duration: "3分钟" },
        { exerciseId: "birth-breathing", name: "分娩呼吸法练习", duration: "5分钟" }
      ]
    },
    {
      day: 5, dayName: "周五", type: "训练日", duration: "约15分钟",
      label: "训练日·简版",
      note: "常规训练后追加，重点盆底肌+臀部",
      exercises: [
        { exerciseId: "kegel-quick", name: "凯格尔快速脉冲", duration: "3分钟" },
        { exerciseId: "glute-bridge", name: "臀桥", duration: "4分钟" },
        { exerciseId: "bird-dog", name: "鸟狗式", duration: "4分钟" },
        { exerciseId: "deep-breathing", name: "腹式深呼吸", duration: "3分钟" }
      ]
    },
    {
      day: 6, dayName: "周六", type: "休息日", duration: "约15分钟",
      label: "休息日·放松恢复",
      note: "彻底放松，调节身心",
      exercises: [
        { exerciseId: "kegel-quick", name: "凯格尔快速脉冲", duration: "3分钟" },
        { exerciseId: "cat-cow", name: "猫牛式", duration: "3分钟" },
        { exerciseId: "butterfly-stretch", name: "蝴蝶式", duration: "3分钟" },
        { exerciseId: "child-pose", name: "婴儿式", duration: "3分钟" },
        { exerciseId: "deep-breathing", name: "腹式深呼吸冥想", duration: "5分钟" }
      ]
    },
    {
      day: 7, dayName: "周日", type: "训练日", duration: "约15分钟",
      label: "训练日·简版",
      note: "常规训练后追加，重点盆底肌+分娩准备",
      exercises: [
        { exerciseId: "kegel-elevator", name: "凯格尔电梯式", duration: "5分钟" },
        { exerciseId: "sumo-squat", name: "相扑深蹲", duration: "4分钟" },
        { exerciseId: "pelvic-tilt", name: "骨盆前后倾", duration: "2分钟" },
        { exerciseId: "deep-breathing", name: "腹式深呼吸", duration: "3分钟" }
      ]
    }
  ]
};
