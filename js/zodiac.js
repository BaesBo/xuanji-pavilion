/* ============================================
   十二星座 · 核心脚本
   ============================================ */

// ---------- 1. 四元素配色 ----------
// 每种元素一个主题色，决定该星座结果卡片的顶部光带和强调色
const ELEMENTS = {
  fire:  { name: "火", icon: "🔥", color: "#ff6b35" },
  earth: { name: "土", icon: "🌍", color: "#c9a961" },
  air:   { name: "风", icon: "💨", color: "#4ecdc4" },
  water: { name: "水", icon: "💧", color: "#6c8eef" }
};

// ---------- 2. 12 星座完整数据 ----------
const ZODIACS = {
  aries: {
    icon: "♈", name: "白羊座", english: "Aries", range: "3 月 21 日 — 4 月 19 日",
    element: "fire", planet: "火星",
    slogan: "勇者无畏，永远先行",
    desc: "黄道带的第一宫，象征着新生与开拓。你天生热情、行动力强，敢于直面挑战，但有时也会显得急躁冲动。",
    strengths: ["勇敢果断", "热情似火", "行动派", "领导力强", "直率坦诚"],
    weaknesses: ["脾气急躁", "缺乏耐心", "冲动鲁莽"],
    bestMatch: ["leo", "sagittarius"],
    worstMatch: ["cancer", "capricorn"],
    luckyColor: "正红色", luckyNumber: 9
  },
  taurus: {
    icon: "♉", name: "金牛座", english: "Taurus", range: "4 月 20 日 — 5 月 20 日",
    element: "earth", planet: "金星",
    slogan: "脚踏实地，享受当下",
    desc: "由维纳斯守护的星座，懂得生活的美好。你务实可靠、坚定执着，重视品质和稳定，但有时会过于固执。",
    strengths: ["务实稳重", "坚韧不拔", "审美出众", "可靠忠诚", "享受生活"],
    weaknesses: ["过于固执", "贪图享乐", "占有欲强"],
    bestMatch: ["virgo", "capricorn"],
    worstMatch: ["leo", "aquarius"],
    luckyColor: "土黄色", luckyNumber: 6
  },
  gemini: {
    icon: "♊", name: "双子座", english: "Gemini", range: "5 月 21 日 — 6 月 21 日",
    element: "air", planet: "水星",
    slogan: "机敏多变，永葆好奇",
    desc: "风元素的代表，思维敏捷，永远充满好奇。你善于沟通、灵活多变，对世界保持着孩童般的探索欲。",
    strengths: ["聪明机敏", "口才出众", "适应力强", "求知欲旺", "幽默风趣"],
    weaknesses: ["三分钟热度", "善变浮躁", "缺乏深度"],
    bestMatch: ["libra", "aquarius"],
    worstMatch: ["virgo", "pisces"],
    luckyColor: "柠檬黄", luckyNumber: 5
  },
  cancer: {
    icon: "♋", name: "巨蟹座", english: "Cancer", range: "6 月 22 日 — 7 月 22 日",
    element: "water", planet: "月亮",
    slogan: "温柔守护，心系所爱",
    desc: "由月亮守护的水象星座，情感丰富而细腻。你温柔体贴、重视家庭，是亲近之人最坚实的港湾。",
    strengths: ["温柔体贴", "重情重义", "直觉敏锐", "保护欲强", "记忆力好"],
    weaknesses: ["情绪化", "易受伤", "过度敏感"],
    bestMatch: ["scorpio", "pisces"],
    worstMatch: ["aries", "libra"],
    luckyColor: "银白色", luckyNumber: 2
  },
  leo: {
    icon: "♌", name: "狮子座", english: "Leo", range: "7 月 23 日 — 8 月 22 日",
    element: "fire", planet: "太阳",
    slogan: "光芒万丈，王者风范",
    desc: "太阳守护的火象星座，天生散发光芒。你自信热情、充满魅力，乐于站在舞台中央，但要小心被自尊心绑架。",
    strengths: ["自信魅力", "慷慨大方", "天生领袖", "热情乐观", "创造力强"],
    weaknesses: ["自尊心强", "爱出风头", "傲慢专横"],
    bestMatch: ["aries", "sagittarius"],
    worstMatch: ["taurus", "scorpio"],
    luckyColor: "金黄色", luckyNumber: 1
  },
  virgo: {
    icon: "♍", name: "处女座", english: "Virgo", range: "8 月 23 日 — 9 月 22 日",
    element: "earth", planet: "水星",
    slogan: "精益求精，追求完美",
    desc: "水星守护的土象星座，注重细节而追求完美。你聪明细心、做事严谨，是团队中最可靠的执行者。",
    strengths: ["心思缜密", "做事严谨", "高效务实", "善于分析", "责任感强"],
    weaknesses: ["过度挑剔", "完美主义", "焦虑紧张"],
    bestMatch: ["taurus", "capricorn"],
    worstMatch: ["gemini", "sagittarius"],
    luckyColor: "墨绿色", luckyNumber: 7
  },
  libra: {
    icon: "♎", name: "天秤座", english: "Libra", range: "9 月 23 日 — 10 月 23 日",
    element: "air", planet: "金星",
    slogan: "优雅平衡，和而不同",
    desc: "金星守护的风象星座，追求和谐与美感。你温和优雅、善于平衡，能在人群中游刃有余，但有时陷入选择困难。",
    strengths: ["优雅温和", "公正客观", "审美一流", "善于交际", "理性平衡"],
    weaknesses: ["选择困难", "回避冲突", "犹豫不决"],
    bestMatch: ["gemini", "aquarius"],
    worstMatch: ["cancer", "capricorn"],
    luckyColor: "粉蓝色", luckyNumber: 6
  },
  scorpio: {
    icon: "♏", name: "天蝎座", english: "Scorpio", range: "10 月 24 日 — 11 月 22 日",
    element: "water", planet: "冥王星",
    slogan: "深沉炽烈，洞察一切",
    desc: "冥王星守护的水象星座，神秘而强烈。你深沉敏锐、意志坚定，对热爱的事物有近乎执着的投入。",
    strengths: ["洞察力强", "意志坚定", "专注深沉", "忠诚专一", "神秘魅力"],
    weaknesses: ["占有欲强", "嫉妒心重", "记仇善妒"],
    bestMatch: ["cancer", "pisces"],
    worstMatch: ["leo", "aquarius"],
    luckyColor: "深紫色", luckyNumber: 8
  },
  sagittarius: {
    icon: "♐", name: "射手座", english: "Sagittarius", range: "11 月 23 日 — 12 月 21 日",
    element: "fire", planet: "木星",
    slogan: "自由不羁，向远方奔跑",
    desc: "木星守护的火象星座，热爱自由与冒险。你乐观开朗、热爱探索，永远在追求更广阔的天地。",
    strengths: ["乐观开朗", "热爱自由", "诚实坦率", "冒险精神", "胸怀宽广"],
    weaknesses: ["不爱受束", "粗心大意", "口无遮拦"],
    bestMatch: ["aries", "leo"],
    worstMatch: ["virgo", "pisces"],
    luckyColor: "宝石蓝", luckyNumber: 3
  },
  capricorn: {
    icon: "♑", name: "摩羯座", english: "Capricorn", range: "12 月 22 日 — 1 月 19 日",
    element: "earth", planet: "土星",
    slogan: "稳步登顶，志在远方",
    desc: "土星守护的土象星座，目标坚定、自律严苛。你成熟稳重、富有责任感，是一步一个脚印的攀登者。",
    strengths: ["目标坚定", "自律自强", "踏实可靠", "责任感强", "成熟稳重"],
    weaknesses: ["过于严肃", "压抑情感", "悲观保守"],
    bestMatch: ["taurus", "virgo"],
    worstMatch: ["aries", "libra"],
    luckyColor: "咖啡色", luckyNumber: 4
  },
  aquarius: {
    icon: "♒", name: "水瓶座", english: "Aquarius", range: "1 月 20 日 — 2 月 18 日",
    element: "air", planet: "天王星",
    slogan: "特立独行，跳脱常规",
    desc: "天王星守护的风象星座，思维独特、不愿从众。你富有创新精神、博爱人道，常常领先时代半步。",
    strengths: ["创新独特", "博爱人道", "理性独立", "求知欲强", "前瞻思维"],
    weaknesses: ["疏离冷淡", "固执己见", "情感淡漠"],
    bestMatch: ["gemini", "libra"],
    worstMatch: ["taurus", "scorpio"],
    luckyColor: "电光蓝", luckyNumber: 4
  },
  pisces: {
    icon: "♓", name: "双鱼座", english: "Pisces", range: "2 月 19 日 — 3 月 20 日",
    element: "water", planet: "海王星",
    slogan: "浪漫多情，心怀诗意",
    desc: "海王星守护的水象星座，感性而富有想象力。你温柔浪漫、共情力强，是天生的艺术家与梦想家。",
    strengths: ["温柔浪漫", "富有同情心", "想象力丰富", "艺术天赋", "无私奉献"],
    weaknesses: ["容易逃避", "优柔寡断", "过度敏感"],
    bestMatch: ["cancer", "scorpio"],
    worstMatch: ["gemini", "sagittarius"],
    luckyColor: "海洋蓝", luckyNumber: 7
  }
};

// ---------- 3. 根据月日判断星座 ----------
// 每月的"星座切换日"：从该日起进入此月对应的新星座，之前则是上一个星座
const MONTH_TRANSITIONS = [
  { day: 20, sign: "aquarius"    }, // 1 月 20 日起 → 水瓶
  { day: 19, sign: "pisces"      }, // 2 月 19 日起 → 双鱼
  { day: 21, sign: "aries"       },
  { day: 20, sign: "taurus"      },
  { day: 21, sign: "gemini"      },
  { day: 22, sign: "cancer"      },
  { day: 23, sign: "leo"         },
  { day: 23, sign: "virgo"       },
  { day: 23, sign: "libra"       },
  { day: 24, sign: "scorpio"     },
  { day: 23, sign: "sagittarius" },
  { day: 22, sign: "capricorn"   }
];

function getZodiacSign(month, day) {
  const t = MONTH_TRANSITIONS[month - 1];
  if (day >= t.day) return t.sign;
  // 不到切换日：返回上一个月对应的星座（处理 1 月时回到 12 月的摩羯）
  return MONTH_TRANSITIONS[(month - 2 + 12) % 12].sign;
}

// ---------- 4. DOM 引用 ----------
const els = {};

document.addEventListener("DOMContentLoaded", function () {
  els.dateInput   = document.getElementById("birth-date");
  els.resultArea  = document.getElementById("result-area");
  els.placeholder = document.getElementById("result-placeholder");

  // 默认日期：今天（让用户一进来就看到一个示例）
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  els.dateInput.value = `${yyyy}-${mm}-${dd}`;
  renderResult();

  // 用户改日期时实时刷新（不需要点按钮）
  els.dateInput.addEventListener("input", renderResult);
  els.dateInput.addEventListener("change", renderResult);
});

// ---------- 5. 渲染结果 ----------
function renderResult() {
  const value = els.dateInput.value;
  if (!value) {
    showPlaceholder();
    return;
  }
  const [, monthStr, dayStr] = value.split("-");
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);
  if (!month || !day) {
    showPlaceholder();
    return;
  }

  const signKey = getZodiacSign(month, day);
  const sign = ZODIACS[signKey];
  const element = ELEMENTS[sign.element];

  els.resultArea.style.setProperty("--element-color", element.color);
  els.resultArea.innerHTML = `
    <div class="zodiac-card">
      <div class="zodiac-header">
        <div class="zodiac-symbol"><img src="../images/zodiac/${signKey}.png" alt="${sign.name}"></div>
        <div class="zodiac-title-block">
          <h2 class="zodiac-name">${sign.name}</h2>
          <p class="zodiac-english">${sign.english}</p>
          <p class="zodiac-range">${sign.range}</p>
        </div>
        <div class="element-badge">
          <span class="element-icon">${element.icon}</span>
          <span class="element-text">${element.name}象</span>
        </div>
      </div>

      <div class="zodiac-meta">
        <div class="meta-item"><span class="meta-label">守护星</span><span class="meta-value">${sign.planet}</span></div>
        <div class="meta-item"><span class="meta-label">幸运色</span><span class="meta-value">${sign.luckyColor}</span></div>
        <div class="meta-item"><span class="meta-label">幸运数字</span><span class="meta-value">${sign.luckyNumber}</span></div>
      </div>

      <p class="zodiac-slogan">"${sign.slogan}"</p>

      <div class="zodiac-section">
        <h3>性格描述</h3>
        <p>${sign.desc}</p>
      </div>

      <div class="zodiac-section">
        <h3>核心优势</h3>
        <div class="tag-list">${renderTags(sign.strengths, "strength")}</div>
      </div>

      <div class="zodiac-section">
        <h3>潜在盲点</h3>
        <div class="tag-list">${renderTags(sign.weaknesses, "weakness")}</div>
      </div>

      <div class="zodiac-section">
        <h3>星座配对</h3>
        <div class="match-grid">
          <div class="match-column">
            <div class="match-label match-label-best">最佳配对</div>
            ${sign.bestMatch.map(renderMatchMini).join("")}
          </div>
          <div class="match-column">
            <div class="match-label match-label-worst">最差配对</div>
            ${sign.worstMatch.map(renderMatchMini).join("")}
          </div>
        </div>
      </div>
    </div>
  `;
}

function showPlaceholder() {
  els.resultArea.innerHTML = `
    <p class="zodiac-placeholder">请输入生日以查询星座</p>
  `;
}

function renderTags(list, kind) {
  return list
    .map(function (item) { return `<span class="tag tag-${kind}">${item}</span>`; })
    .join("");
}

function renderMatchMini(signKey) {
  const s = ZODIACS[signKey];
  return `
    <div class="match-mini">
      <img src="../images/zodiac/${signKey}.png" alt="${s.name}" class="match-mini-icon">
      <span class="match-mini-name">${s.name}</span>
    </div>
  `;
}
