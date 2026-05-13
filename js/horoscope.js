/* ============================================
   每日运势 · 核心脚本
   说明：基于"日期 + 星座"做确定性伪随机，
   从本地内容池组合生成今日运势。
   同一天同一星座结果固定，跨天会变化。
   未来如要升级到 AI 接口，只需替换 buildFortune() 即可。
   ============================================ */

// ---------- 1. 12 星座基础数据（精简版，与 zodiac.js 同名星座保持一致） ----------
const SIGNS = [
  { key: "aries",       icon: "♈", name: "白羊",  element: "fire"  },
  { key: "taurus",      icon: "♉", name: "金牛",  element: "earth" },
  { key: "gemini",      icon: "♊", name: "双子",  element: "air"   },
  { key: "cancer",      icon: "♋", name: "巨蟹",  element: "water" },
  { key: "leo",         icon: "♌", name: "狮子",  element: "fire"  },
  { key: "virgo",       icon: "♍", name: "处女",  element: "earth" },
  { key: "libra",       icon: "♎", name: "天秤",  element: "air"   },
  { key: "scorpio",     icon: "♏", name: "天蝎",  element: "water" },
  { key: "sagittarius", icon: "♐", name: "射手",  element: "fire"  },
  { key: "capricorn",   icon: "♑", name: "摩羯",  element: "earth" },
  { key: "aquarius",    icon: "♒", name: "水瓶",  element: "air"   },
  { key: "pisces",      icon: "♓", name: "双鱼",  element: "water" }
];

const ELEMENT_COLOR = {
  fire:  "#ff6b35",
  earth: "#c9a961",
  air:   "#4ecdc4",
  water: "#6c8eef"
};

// ---------- 2. 内容池：4 分项 × 5 星级 × 3 变体 ----------
const FORTUNE_TEXTS = {
  career: {
    5: [
      "机遇主动找上门，把握住能上一个台阶。",
      "灵感喷涌，是处理棘手任务的好时机。",
      "贵人相助，合作顺畅，效率拉满。"
    ],
    4: [
      "进展平稳，重点任务能按节奏推进。",
      "和同事合作顺畅，团队氛围加分。",
      "适合主动推动延误已久的项目。"
    ],
    3: [
      "平淡的一天，按部就班即可。",
      "没有大起大落，专注手头工作。",
      "效率一般，建议劳逸结合。"
    ],
    2: [
      "容易因小事被打断节奏，注意收心。",
      "沟通不畅，重要事项尽量发文字确认。",
      "拖延感袭来，先完成易做的小事。"
    ],
    1: [
      "状态低迷，今天不宜启动新项目。",
      "决策容易失误，重大事项延后定。",
      "易遇阻力，保持低调勿争辩。"
    ]
  },
  love: {
    5: [
      "桃花运旺盛，单身的人有机会遇到心仪对象。",
      "和伴侣感情升温，适合制造小惊喜。",
      "敞开心扉，今天的对话能拉近距离。"
    ],
    4: [
      "关系融洽，适合相约出门走走。",
      "对方的小细心让你感到温暖。",
      "暧昧对象有进一步发展的可能。"
    ],
    3: [
      "平稳的一天，没有特别值得记的事。",
      "维持现状即可，不必刻意为之。",
      "感情如常，但记得发条消息问候对方。"
    ],
    2: [
      "容易因小事产生分歧，多倾听少争辩。",
      "情绪起伏大，独处反而比强行社交舒服。",
      "暧昧对象可能态度模糊，不必急于追问。"
    ],
    1: [
      "容易感到孤独或被忽略，先照顾好自己。",
      "切忌冲动表白或翻旧账。",
      "不适合相亲或初次约会。"
    ]
  },
  wealth: {
    5: [
      "偏财运极佳，意外之财有可能。",
      "适合谈合同、谈薪酬，可以硬气一点。",
      "投资判断敏锐，但仍要控制仓位。"
    ],
    4: [
      "收入稳定，账单可控。",
      "适合做长期理财规划。",
      "处理闲置物品能小赚一笔。"
    ],
    3: [
      "收支平衡，不必担心也不必兴奋。",
      "钱包平稳，注意小额开销。",
      "今日不宜大额消费，缓两天再决定。"
    ],
    2: [
      "容易冲动消费，看到喜欢的先放购物车。",
      "请客或人情往来可能超预算。",
      "投资理财类决策今日不宜出手。"
    ],
    1: [
      "破财预警：贵重物品看管好、合同细看条款。",
      "投资判断容易失误，今天什么都不要买。",
      "陌生人许诺的好事千万别信。"
    ]
  },
  health: {
    5: [
      "精神饱满，适合开始一项新的运动。",
      "睡眠质量好，整个人神清气爽。",
      "今天饮食有节，身体状态在线。"
    ],
    4: [
      "身体状态不错，注意保持。",
      "适合中等强度运动，例如散步或瑜伽。",
      "饮食清淡能给你额外加分。"
    ],
    3: [
      "状态平平，正常作息即可。",
      "没什么不适，但也别熬夜。",
      "记得多喝水，少看屏幕。"
    ],
    2: [
      "容易疲倦，午间能小憩 15 分钟最好。",
      "情绪起伏影响食欲，避免重口味。",
      "肩颈或眼睛容易酸，记得活动一下。"
    ],
    1: [
      "疲劳累积，今天能早睡就早睡。",
      "免疫力偏弱，避免淋雨着凉。",
      "心情低落，找一项让自己放松的事做。"
    ]
  }
};

const DOS = [
  "早起", "散步", "整理桌面", "独处阅读", "约人见面",
  "和朋友通话", "家庭聚餐", "清淡饮食", "做一顿饭", "看一场电影",
  "去健身房", "断舍离", "复盘工作", "写日记", "给久未联系的人发消息"
];

const DONTS = [
  "熬夜", "冲动消费", "和人争吵", "签重要合同", "过度饮酒",
  "暴饮暴食", "做重大决定", "玩手机到深夜", "盲目网购", "轻信陌生人",
  "刷视频上瘾", "翻旧账", "说他人坏话", "强行社交", "听信流言"
];

const COLORS     = ["金色", "银色", "酒红", "宝蓝", "墨绿", "米白", "烟灰", "咖啡"];
const DIRECTIONS = ["东", "东南", "南", "西南", "西", "西北", "北", "东北"];

// 星级权重池：3-4 星占多数，1 星和 5 星较稀有
// pick() 从中选一个数字就得到星级
const STAR_WEIGHTS = [1, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 5];

// ---------- 3. 种子伪随机 ----------
// 同一个 seed 输入永远生成同一串数字，保证"同一天同一星座结果固定"
function makeRandom(seed) {
  let s = seed % 233280;
  if (s < 0) s += 233280;
  return function () {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function dailySeed(date, signKey) {
  const dateNum = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
  return dateNum * 7919 + hashString(signKey);
}

function pick(rand, arr) {
  return arr[Math.floor(rand() * arr.length)];
}

function pickN(rand, arr, n) {
  // 不重复地从数组中取 n 个
  const pool = arr.slice();
  const out = [];
  for (let i = 0; i < n && pool.length > 0; i++) {
    const idx = Math.floor(rand() * pool.length);
    out.push(pool.splice(idx, 1)[0]);
  }
  return out;
}

// ---------- 4. 核心：根据 date + sign 生成一份完整运势 ----------
function buildFortune(date, signKey) {
  const rand = makeRandom(dailySeed(date, signKey));

  const career = pick(rand, STAR_WEIGHTS);
  const love   = pick(rand, STAR_WEIGHTS);
  const wealth = pick(rand, STAR_WEIGHTS);
  const health = pick(rand, STAR_WEIGHTS);
  const overall = Math.round((career + love + wealth + health) / 4);

  return {
    overall: overall,
    sections: [
      { key: "career", label: "事业", icon: "💼", stars: career, text: pick(rand, FORTUNE_TEXTS.career[career]) },
      { key: "love",   label: "爱情", icon: "❤️", stars: love,   text: pick(rand, FORTUNE_TEXTS.love[love])     },
      { key: "wealth", label: "财运", icon: "💰", stars: wealth, text: pick(rand, FORTUNE_TEXTS.wealth[wealth]) },
      { key: "health", label: "健康", icon: "🌿", stars: health, text: pick(rand, FORTUNE_TEXTS.health[health]) }
    ],
    dos:       pickN(rand, DOS, 2),
    donts:     pickN(rand, DONTS, 2),
    color:     pick(rand, COLORS),
    direction: pick(rand, DIRECTIONS),
    number:    1 + Math.floor(rand() * 9)
  };
}

// ---------- 5. DOM 与交互 ----------
const STORAGE_KEY = "horoscope-last-sign";
const els = {};

document.addEventListener("DOMContentLoaded", function () {
  els.dateLabel  = document.getElementById("today-date");
  els.signGrid   = document.getElementById("sign-grid");
  els.resultArea = document.getElementById("result-area");

  renderTodayDate();
  renderSignGrid();

  // 恢复上次选择的星座（若有）
  const lastSign = localStorage.getItem(STORAGE_KEY);
  if (lastSign && SIGNS.find(function (s) { return s.key === lastSign; })) {
    selectSign(lastSign);
  }
});

function renderTodayDate() {
  const now = new Date();
  const weekdays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  const weekday = weekdays[now.getDay()];
  els.dateLabel.innerHTML = `
    <div class="date-big">${now.getFullYear()}.${pad(now.getMonth() + 1)}.${pad(now.getDate())}</div>
    <div class="date-sub">${weekday} · 今日运势</div>
  `;
}

function pad(n) { return String(n).padStart(2, "0"); }

function renderSignGrid() {
  els.signGrid.innerHTML = SIGNS.map(function (s) {
    return `
      <button class="sign-chip" data-sign="${s.key}" data-element="${s.element}">
        <img src="../images/zodiac/${s.key}.png" alt="${s.name}" class="sign-chip-icon">
        <span class="sign-chip-name">${s.name}</span>
      </button>
    `;
  }).join("");

  els.signGrid.addEventListener("click", function (event) {
    const btn = event.target.closest(".sign-chip");
    if (!btn) return;
    selectSign(btn.dataset.sign);
  });
}

function selectSign(signKey) {
  const sign = SIGNS.find(function (s) { return s.key === signKey; });
  if (!sign) return;

  // 视觉：高亮当前选中
  els.signGrid.querySelectorAll(".sign-chip").forEach(function (b) {
    b.classList.toggle("active", b.dataset.sign === signKey);
  });

  localStorage.setItem(STORAGE_KEY, signKey);
  renderResult(sign, buildFortune(new Date(), signKey));
}

function renderResult(sign, fortune) {
  const color = ELEMENT_COLOR[sign.element];
  els.resultArea.style.setProperty("--element-color", color);
  els.resultArea.innerHTML = `
    <div class="fortune-card">
      <div class="fortune-header">
        <div class="fortune-symbol"><img src="../images/zodiac/${sign.key}.png" alt="${sign.name}"></div>
        <div class="fortune-sign-info">
          <h2 class="fortune-sign-name">${sign.name}座 · 今日运势</h2>
          <div class="fortune-overall">
            <span class="fortune-overall-label">综合</span>
            <span class="stars stars-big">${renderStars(fortune.overall)}</span>
          </div>
        </div>
      </div>

      <div class="fortune-sections">
        ${fortune.sections.map(renderSection).join("")}
      </div>

      <div class="fortune-yi-ji">
        <div class="yi-ji-col">
          <div class="yi-ji-head yi-head">宜</div>
          <ul class="yi-ji-list">
            ${fortune.dos.map(function (d) { return `<li>${d}</li>`; }).join("")}
          </ul>
        </div>
        <div class="yi-ji-col">
          <div class="yi-ji-head ji-head">忌</div>
          <ul class="yi-ji-list">
            ${fortune.donts.map(function (d) { return `<li>${d}</li>`; }).join("")}
          </ul>
        </div>
      </div>

      <div class="lucky-row">
        <div class="lucky-item"><span class="lucky-label">幸运色</span><span class="lucky-value">${fortune.color}</span></div>
        <div class="lucky-item"><span class="lucky-label">幸运方位</span><span class="lucky-value">${fortune.direction}</span></div>
        <div class="lucky-item"><span class="lucky-label">幸运数字</span><span class="lucky-value">${fortune.number}</span></div>
      </div>
    </div>
  `;
}

function renderSection(section) {
  return `
    <div class="fortune-section">
      <div class="fortune-section-head">
        <span class="section-icon">${section.icon}</span>
        <span class="section-label">${section.label}</span>
        <span class="stars">${renderStars(section.stars)}</span>
      </div>
      <p class="section-text">${section.text}</p>
    </div>
  `;
}

function renderStars(n) {
  const full = "★".repeat(n);
  const empty = "☆".repeat(5 - n);
  return `<span class="star-full">${full}</span><span class="star-empty">${empty}</span>`;
}
