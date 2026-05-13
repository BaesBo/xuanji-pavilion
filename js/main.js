/* ============================================
   玄机阁 · 主脚本
   说明：JavaScript 让网页具有"交互"能力
   ============================================ */

// 等页面 HTML 加载完毕后再执行（避免找不到元素）
document.addEventListener("DOMContentLoaded", function () {

  console.log("☯ 玄机阁已加载，欢迎光临");

  // 给每张功能卡片绑定点击日志（之后可扩展成埋点）
  // <a> 标签会自然跳转，所以不调用 preventDefault
  const cards = document.querySelectorAll(".feature-card");
  cards.forEach(function (card) {
    card.addEventListener("click", function () {
      console.log("用户点击了功能：" + card.dataset.feature);
    });
  });

  // 点击页内锚点时平滑滚动到对应区块
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      const targetId = link.getAttribute("href");
      if (targetId.length > 1) {
        event.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });

  // 滚动越过 50px 时，让顶部导航更不透明
  // 用 isScrolled 缓存上一次状态，避免每次滚动都写入相同的 style（节省样式重算）
  const header = document.querySelector(".site-header");
  let isScrolled = false;
  window.addEventListener("scroll", function () {
    const shouldBeScrolled = window.scrollY > 50;
    if (shouldBeScrolled !== isScrolled) {
      isScrolled = shouldBeScrolled;
      header.style.background = isScrolled
        ? "rgba(10, 10, 12, 0.92)"
        : "rgba(10, 10, 12, 0.75)";
    }
  });

});
