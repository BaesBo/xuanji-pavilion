/* ============================================
   MBTI 性格测试 · 核心脚本
   ============================================ */

// ---------- 1. 28 道题目数据 ----------
// 每道题对应一个维度（dim），两个选项分别代表该维度的两端字母
// dim 字段说明：EI = 外向/内向，SN = 实感/直觉，TF = 思考/情感，JP = 判断/感知
const QUESTIONS = [
  // ====== E（外向） vs I（内向） ======
  { dim: "EI", q: "周末理想的安排是？",
    a: { text: "参加聚会、出门走走", letter: "E" },
    b: { text: "在家看书、追剧、独处", letter: "I" } },

  { dim: "EI", q: "在陌生人多的场合，我倾向于……",
    a: { text: "主动开口认识新朋友", letter: "E" },
    b: { text: "默默观察，等人来搭话", letter: "I" } },

  { dim: "EI", q: "辛苦工作一整天后，我恢复精力的方式是……",
    a: { text: "约朋友吃饭聊天", letter: "E" },
    b: { text: "独自待着安静放空", letter: "I" } },

  { dim: "EI", q: "讨论问题时，我更习惯……",
    a: { text: "边说边整理想法", letter: "E" },
    b: { text: "先想清楚再开口", letter: "I" } },

  { dim: "EI", q: "长时间一个人安静，我的感受是……",
    a: { text: "时间久了会觉得无聊", letter: "E" },
    b: { text: "感到平静、很舒适", letter: "I" } },

  { dim: "EI", q: "一群人讨论事情，我通常……",
    a: { text: "比较主动地发言", letter: "E" },
    b: { text: "更倾向于聆听观察", letter: "I" } },

  { dim: "EI", q: "认识朋友的方式上，我属于……",
    a: { text: "朋友多、圈子广", letter: "E" },
    b: { text: "朋友少但关系深", letter: "I" } },

  // ====== S（实感） vs N（直觉） ======
  { dim: "SN", q: "学习新技能时，我更喜欢……",
    a: { text: "具体的例子和清晰步骤", letter: "S" },
    b: { text: "整体的框架和原理", letter: "N" } },

  { dim: "SN", q: "读小说时我更关注……",
    a: { text: "真实细腻的情节描写", letter: "S" },
    b: { text: "深层寓意和象征意义", letter: "N" } },

  { dim: "SN", q: "工作中我更擅长……",
    a: { text: "处理具体务实的事情", letter: "S" },
    b: { text: "构思新点子和可能性", letter: "N" } },

  { dim: "SN", q: "描述一个去过的地方，我会说……",
    a: { text: "那里有什么、长什么样", letter: "S" },
    b: { text: "它给我什么感觉、像什么", letter: "N" } },

  { dim: "SN", q: "我更相信……",
    a: { text: "经验和事实", letter: "S" },
    b: { text: "直觉和预感", letter: "N" } },

  { dim: "SN", q: "对于未来，我喜欢……",
    a: { text: "看得见、能踏实做的目标", letter: "S" },
    b: { text: "想象各种可能的样子", letter: "N" } },

  { dim: "SN", q: "解决一个新问题时，我习惯……",
    a: { text: "一步一步地推进", letter: "S" },
    b: { text: "先想象终局再倒推", letter: "N" } },

  // ====== T（思考） vs F（情感） ======
  { dim: "TF", q: "做重要决定时，我更依靠……",
    a: { text: "理性分析和利弊权衡", letter: "T" },
    b: { text: "内心感受与价值取向", letter: "F" } },

  { dim: "TF", q: "和人发生分歧时，我会先……",
    a: { text: "指出对方的逻辑问题", letter: "T" },
    b: { text: "理解对方的情绪", letter: "F" } },

  { dim: "TF", q: "评价一件事，我首先想到……",
    a: { text: "它合不合理、效益如何", letter: "T" },
    b: { text: "谁会因此被影响", letter: "F" } },

  { dim: "TF", q: "朋友向我倾诉烦恼，我会……",
    a: { text: "帮他理清问题、给建议", letter: "T" },
    b: { text: "先共情、陪伴他", letter: "F" } },

  { dim: "TF", q: "我更欣赏的人是……",
    a: { text: "公正、有原则、讲逻辑", letter: "T" },
    b: { text: "温暖、善解人意、有爱", letter: "F" } },

  { dim: "TF", q: "我做事更在意……",
    a: { text: "把事情做对、做得高效", letter: "T" },
    b: { text: "让相关的人都感觉舒服", letter: "F" } },

  { dim: "TF", q: "被人批评时，我第一反应是……",
    a: { text: "判断批评是否有道理", letter: "T" },
    b: { text: "先感受到被伤害", letter: "F" } },

  // ====== J（判断） vs P（感知） ======
  { dim: "JP", q: "旅行之前，我倾向于……",
    a: { text: "列好详细行程和预订", letter: "J" },
    b: { text: "大方向定了就出发", letter: "P" } },

  { dim: "JP", q: "我的桌面 / 房间通常……",
    a: { text: "整齐有序，物品归位", letter: "J" },
    b: { text: "有点乱，但我知道东西在哪", letter: "P" } },

  { dim: "JP", q: "接到一项任务后，我会……",
    a: { text: "立刻规划并尽早开始", letter: "J" },
    b: { text: "拖一拖，临近截止再发力", letter: "P" } },

  { dim: "JP", q: "面对计划之外的变化，我……",
    a: { text: "不太喜欢，想按计划走", letter: "J" },
    b: { text: "挺享受随机应变", letter: "P" } },

  { dim: "JP", q: "我更喜欢的状态是……",
    a: { text: "事情有结论、做完了", letter: "J" },
    b: { text: "保持开放，继续探索", letter: "P" } },

  { dim: "JP", q: "看到一个不完美的方案，我会……",
    a: { text: "尽快敲定一个先用着", letter: "J" },
    b: { text: "继续打磨，不急于定", letter: "P" } },

  { dim: "JP", q: "一天结束时，我希望……",
    a: { text: "清单上的事都打勾完成", letter: "J" },
    b: { text: "没完全做完也没关系", letter: "P" } }
];

// ---------- 2. 16 种人格类型数据 ----------
const TYPES = {
  // —— NT 分析家 ——
  INTJ: {
    name: "建筑师", nickname: "战略家",
    icon: "♟", color: "#7e57c2",
    slogan: "运筹帷幄，决胜千里",
    desc: "富有想象力的战略家，凡事都有计划，并且按计划行事。你独立思考、目标明确，眼光长远，习惯用系统性的方式拆解复杂问题。",
    strengths: ["独立思考", "战略眼光", "执行力强", "高度自律"],
    weaknesses: ["过度理性", "容易显冷漠", "不轻易表达情感"],
    famous: ["伊隆·马斯克", "尼采", "诸葛亮"]
  },
  INTP: {
    name: "逻辑学家", nickname: "思想家",
    icon: "🔍", color: "#5c6bc0",
    slogan: "求真求知，思辨为乐",
    desc: "对知识有近乎贪婪的渴求，喜欢探索抽象概念。你思维灵活、富有创造力，能在看似无关的事物之间发现联系。",
    strengths: ["逻辑严密", "创造力强", "客观分析", "独立思考"],
    weaknesses: ["容易拖延", "不善表达情感", "对琐事缺乏耐心"],
    famous: ["爱因斯坦", "牛顿", "比尔·盖茨"]
  },
  ENTJ: {
    name: "指挥官", nickname: "统帅",
    icon: "♛", color: "#c62828",
    slogan: "天生领袖，开拓者无所畏惧",
    desc: "大胆而富有想象力的强势领导者，总能找到或创造解决办法。你目标明确、行动力强，擅长组织资源去达成宏伟目标。",
    strengths: ["决断力强", "领导魅力", "战略思维", "高效执行"],
    weaknesses: ["过于强势", "缺乏耐心", "忽视他人情感"],
    famous: ["拿破仑", "史蒂夫·乔布斯", "凯撒大帝"]
  },
  ENTP: {
    name: "辩论家", nickname: "发明家",
    icon: "💡", color: "#ef6c00",
    slogan: "思想交锋，永不停息",
    desc: "聪明好奇的思想者，喜欢挑战智力上的难题。你思维敏捷、富有创造力，善于辩论，永远在寻找新点子和新可能。",
    strengths: ["思维活跃", "口才出众", "创新精神", "适应力强"],
    weaknesses: ["不爱守规矩", "容易半途而废", "好辩"],
    famous: ["苏格拉底", "马克·吐温", "莱昂纳多·达·芬奇"]
  },

  // —— NF 外交官 ——
  INFJ: {
    name: "提倡者", nickname: "守护神秘者",
    icon: "🕯", color: "#26a69a",
    slogan: "静水流深，理想主义者",
    desc: "安静而神秘，富有理想且能激励他人。你直觉敏锐、共情力强，常常能洞察他人内心，并为深信的事业默默坚持。",
    strengths: ["洞察力强", "富有同情心", "理想坚定", "创造力强"],
    weaknesses: ["对自己过度严苛", "容易倦怠", "过于敏感"],
    famous: ["柏拉图", "马丁·路德·金", "甘地"]
  },
  INFP: {
    name: "调停者", nickname: "诗人",
    icon: "🌸", color: "#ec407a",
    slogan: "心怀诗意，温柔以待世界",
    desc: "诗意而善良的利他主义者，总愿为正义事业贡献力量。你内心丰富、价值感强，重视真诚与人性的美好。",
    strengths: ["富有同情心", "想象力丰富", "理想主义", "心思细腻"],
    weaknesses: ["过于敏感", "回避冲突", "容易自我怀疑"],
    famous: ["威廉·莎士比亚", "约翰·列侬", "J·K·罗琳"]
  },
  ENFJ: {
    name: "主人公", nickname: "教导者",
    icon: "🌟", color: "#fb8c00",
    slogan: "魅力四射，鼓舞人心",
    desc: "富有魅力的领导者，能激发听众的热情。你温暖且有感染力，擅长理解他人需求，能把团队凝聚起来共同向前。",
    strengths: ["天生魅力", "共情力强", "鼓舞他人", "组织协调"],
    weaknesses: ["过于在意他人评价", "容易过度付出", "理想化"],
    famous: ["奥巴马", "马丁·路德·金", "奥普拉"]
  },
  ENFP: {
    name: "竞选者", nickname: "自由灵魂",
    icon: "🎈", color: "#fdd835",
    slogan: "热情似火，活成自己的样子",
    desc: "热情而富有创造力的社交家，总能在事物中找到微笑的理由。你充满活力、富有想象力，相信每个人都拥有独特的潜能。",
    strengths: ["热情洋溢", "创造力强", "善于交际", "独立性强"],
    weaknesses: ["注意力分散", "情绪起伏", "讨厌琐事"],
    famous: ["罗宾·威廉姆斯", "沃尔特·迪士尼", "安妮·弗兰克"]
  },

  // —— SJ 守护者 ——
  ISTJ: {
    name: "物流师", nickname: "检查员",
    icon: "📋", color: "#546e7a",
    slogan: "踏实守信，言出必行",
    desc: "实际且注重事实，可靠性无可挑剔。你做事认真严谨、责任感强，是团队中最值得信赖的那个人。",
    strengths: ["责任感强", "做事严谨", "有条理", "诚实可靠"],
    weaknesses: ["不喜变化", "固执己见", "情感表达较少"],
    famous: ["乔治·华盛顿", "沃伦·巴菲特", "安吉拉·默克尔"]
  },
  ISFJ: {
    name: "守卫者", nickname: "护卫者",
    icon: "🛡", color: "#8d6e63",
    slogan: "默默守护，温暖如灯",
    desc: "非常专注而温暖的守护者，时刻准备保护爱着的人们。你细心、有耐心，把家人朋友的需要放在心上。",
    strengths: ["温暖可靠", "极有耐心", "细致周到", "忠诚奉献"],
    weaknesses: ["过度迁就他人", "回避冲突", "容易委屈自己"],
    famous: ["特蕾莎修女", "凯特王妃", "罗莎·帕克斯"]
  },
  ESTJ: {
    name: "总经理", nickname: "执行者",
    icon: "🏛", color: "#1565c0",
    slogan: "秩序井然，雷厉风行",
    desc: "出色的管理者，在管理事物或人方面无与伦比。你重规则、讲效率，能把混乱变得有序、把目标变成成果。",
    strengths: ["执行力强", "组织能力", "原则性强", "果断决策"],
    weaknesses: ["不够灵活", "缺乏耐心", "看重传统"],
    famous: ["米歇尔·奥巴马", "弗兰克·辛纳屈", "亨利·福特"]
  },
  ESFJ: {
    name: "执政官", nickname: "提供者",
    icon: "🤝", color: "#43a047",
    slogan: "热心助人，凝聚人心",
    desc: "极有同情心、爱交际且受欢迎，乐于帮助他人。你重视和谐与传统，能让身边的人感到被照顾、被关心。",
    strengths: ["热心助人", "有责任感", "善于交际", "忠诚可靠"],
    weaknesses: ["在意他人评价", "回避冲突", "不喜批评"],
    famous: ["泰勒·斯威夫特", "比尔·克林顿", "詹妮弗·加纳"]
  },

  // —— SP 探险家 ——
  ISTP: {
    name: "鉴赏家", nickname: "巧匠",
    icon: "🔧", color: "#37474f",
    slogan: "动手探索，沉稳从容",
    desc: "大胆而实际的实验家，擅长使用各种工具。你冷静、灵活，喜欢用手解决问题，享受弄清事物运转方式的乐趣。",
    strengths: ["动手能力强", "冷静理性", "适应力强", "独立自主"],
    weaknesses: ["不爱长期承诺", "情感表达少", "容易冒险"],
    famous: ["克林特·伊斯特伍德", "汤姆·克鲁斯", "丹尼尔·克雷格"]
  },
  ISFP: {
    name: "探险家", nickname: "艺术家",
    icon: "🎨", color: "#ad1457",
    slogan: "自由灵动，活在当下",
    desc: "灵活而有魅力的艺术家，时刻准备探索新事物。你温柔、敏感，重视个人价值与体验，用自己的方式表达世界。",
    strengths: ["艺术感强", "敏感细腻", "温和友善", "灵活适应"],
    weaknesses: ["回避冲突", "缺乏长远规划", "过于敏感"],
    famous: ["迈克尔·杰克逊", "鲍勃·迪伦", "弗里达·卡罗"]
  },
  ESTP: {
    name: "企业家", nickname: "挑战者",
    icon: "🎯", color: "#d84315",
    slogan: "敢闯敢拼，活力四射",
    desc: "聪明、精力充沛、感知敏锐的人，真心享受冒险。你行动力极强，喜欢直接面对挑战，在压力中反而能爆发。",
    strengths: ["行动力强", "敢于冒险", "观察敏锐", "随机应变"],
    weaknesses: ["容易冲动", "不爱长期计划", "对规则不耐烦"],
    famous: ["麦当娜", "唐纳德·特朗普", "欧内斯特·海明威"]
  },
  ESFP: {
    name: "表演者", nickname: "娱乐家",
    icon: "🎭", color: "#f4511e",
    slogan: "热爱生活，自带聚光灯",
    desc: "自发的、精力充沛而热情的表演者，生活在他们周围永不无聊。你乐观开朗、感染力强，把欢乐带给身边每一个人。",
    strengths: ["热情洋溢", "感染力强", "善于交际", "活在当下"],
    weaknesses: ["容易冲动", "讨厌冲突", "缺乏长远规划"],
    famous: ["玛丽莲·梦露", "猫王", "亚德里安·布洛迪"]
  }
};

// ---------- 3. MBTI 四个维度 ----------
// 数据驱动：每个维度由两个字母组成。所有计分、计数逻辑都从这里派生
// 这样改一处即可，不会出现某处写 "E"、另一处写 "e" 的散布
const DIMENSIONS = [
  ["E", "I"],
  ["S", "N"],
  ["T", "F"],
  ["J", "P"]
];

// ---------- 4. 状态变量 ----------
// 用户的所有作答：每项是选中的字母（"E"/"I"/...）
// 当前题号无需单独存：answers.length 就是下一题的索引
let answers = [];

// ---------- 5. DOM 元素引用 ----------
// 等页面加载完再去找元素，避免找不到
const els = {};

document.addEventListener("DOMContentLoaded", function () {
  els.screens = {
    welcome: document.getElementById("screen-welcome"),
    quiz:    document.getElementById("screen-quiz"),
    result:  document.getElementById("screen-result")
  };
  els.progressBar  = document.getElementById("progress-bar");
  els.progressText = document.getElementById("progress-text");
  els.questionText = document.getElementById("question-text");
  els.optionA      = document.getElementById("option-a");
  els.optionB      = document.getElementById("option-b");
  els.optionATxt   = els.optionA.querySelector(".option-text");
  els.optionBTxt   = els.optionB.querySelector(".option-text");
  els.questionCard = document.getElementById("question-card");
  els.resultBox    = document.getElementById("result-box");

  document.getElementById("btn-start").addEventListener("click", startTest);
  document.getElementById("btn-restart").addEventListener("click", restartTest);
  els.optionA.addEventListener("click", function () { selectAnswer("a"); });
  els.optionB.addEventListener("click", function () { selectAnswer("b"); });
});

// ---------- 6. 测试流程函数 ----------
function showScreen(name) {
  Object.keys(els.screens).forEach(function (key) {
    els.screens[key].classList.toggle("active", key === name);
  });
}

function updateProgress(current) {
  const percent = (current / QUESTIONS.length) * 100;
  els.progressBar.style.width = percent + "%";
  els.progressText.textContent = current + " / " + QUESTIONS.length;
}

function startTest() {
  answers = [];
  showScreen("quiz");
  renderQuestion();
}

function renderQuestion() {
  const index = answers.length;
  const q = QUESTIONS[index];

  updateProgress(index + 1);

  els.questionText.textContent = q.q;
  els.optionATxt.textContent = q.a.text;
  els.optionBTxt.textContent = q.b.text;

  // 重新触发淡入动画（移除 class、强制重排、再加回去）
  els.questionCard.classList.remove("fade-in");
  void els.questionCard.offsetWidth;
  els.questionCard.classList.add("fade-in");
}

function selectAnswer(choice) {
  const q = QUESTIONS[answers.length];
  answers.push(choice === "a" ? q.a.letter : q.b.letter);

  if (answers.length >= QUESTIONS.length) {
    showResult(calculateType());
  } else {
    renderQuestion();
  }
}

function calculateType() {
  const count = {};
  DIMENSIONS.flat().forEach(function (letter) { count[letter] = 0; });
  answers.forEach(function (letter) { count[letter]++; });

  return DIMENSIONS
    .map(function (pair) { return count[pair[0]] >= count[pair[1]] ? pair[0] : pair[1]; })
    .join("");
}

function renderTags(list, kind) {
  return list
    .map(function (item) { return `<span class="tag tag-${kind}">${item}</span>`; })
    .join("");
}

function showResult(typeCode) {
  const type = TYPES[typeCode];
  els.resultBox.style.setProperty("--type-color", type.color);

  els.resultBox.innerHTML = `
    <div class="result-header">
      <div class="result-icon">${type.icon}</div>
      <div class="result-code">${typeCode}</div>
      <h2 class="result-name">${type.name} · ${type.nickname}</h2>
      <p class="result-slogan">"${type.slogan}"</p>
    </div>

    <div class="result-section">
      <h3>性格描述</h3>
      <p>${type.desc}</p>
    </div>

    <div class="result-section">
      <h3>核心优势</h3>
      <div class="tag-list">${renderTags(type.strengths, "strength")}</div>
    </div>

    <div class="result-section">
      <h3>潜在盲点</h3>
      <div class="tag-list">${renderTags(type.weaknesses, "weakness")}</div>
    </div>

    <div class="result-section">
      <h3>同型代表人物</h3>
      <p class="famous-list">${type.famous.join("　·　")}</p>
    </div>
  `;

  updateProgress(QUESTIONS.length);
  showScreen("result");
}

function restartTest() {
  answers = [];
  updateProgress(0);
  showScreen("welcome");
}
