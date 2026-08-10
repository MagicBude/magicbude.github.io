/*
 * assets/js/core/main.js
 * ============================================================================
 * 全站全局脚本。负责把「共享外观」动态渲染出来，并接上交互。
 *
 * 它做四件事：
 *   1. 渲染顶部导航栏（从 SITE_CONFIG.nav 来，单一数据源）
 *   2. 渲染页脚（版权 + 社交链接，也从 SITE_CONFIG 来）
 *   3. 接上「皮肤选择器」和「语言切换」两个控件（状态存 localStorage）
 *   4. 接上移动端汉堡菜单的展开 / 收起
 *
 * 为什么头部 / 页脚用 JS 渲染而不是写死在每个 HTML 里？
 *   避免 9 个页面重复拷贝一份导航；改导航只改 site.config.js。
 *   这正是「数据 → DOM」的典型例子，也是你学前端会反复遇到的模式。
 *
 * 依赖（必须在本文件之前用 <script> 引入，顺序不能乱）：
 *   site.config.js → icons.js → i18n.js → main.js
 * ============================================================================
 */

(function () {
  "use strict";

  // #region 常量与状态
  // 取全局配置与工具。给个兜底，防止某个脚本没加载导致整页脚本报错。
  var CONFIG = window.SITE_CONFIG || {};
  var ICON = window.icon || function () { return ""; };
  var I18N = window.i18n || {
    t: function (k) { return k; },
    getLang: function () { return "zh"; },
    apply: function () {},
    toggle: function () { return "zh"; },
  };

  // main.js 固定位于 assets/js/core/：从脚本自身地址向上三级即可得到站点根目录。
  // 以脚本地址为基准，而不是以当前页面为基准，可让任意深度的页面共享同一套路由配置。
  var SITE_ROOT = new URL("../../../", document.currentScript.src);

  // 把配置中的站内路径转换为当前部署环境可用的完整地址。
  // new URL 同时支持 https:// 与 file://，因此 GitHub Pages 和双击预览都无需写两套路径。
  function siteUrl(path) {
    return new URL(path, SITE_ROOT).href;
  }

  // 内容页的内联渲染函数也需要解析数据文件里的站内路径，因此公开这个小工具。
  window.siteUrl = siteUrl;

  // localStorage 里存皮肤用的键。必须和 HTML 防闪白脚本里的一致。
  var STYLE_KEY = "site-style";

  // 当前皮肤 → 明暗方案（决定代码高亮配色）。
  function schemeOf(style) {
    return style === "instrument" || style === "terminal" ? "dark" : "light";
  }

  // #endregion 常量与状态
  // #region 皮肤应用与控件 HTML
  // 应用一个皮肤：改 <html> 上的 data-* 属性 + 记忆到 localStorage。
  function applyStyle(style) {
    document.documentElement.setAttribute("data-style", style);
    document.documentElement.setAttribute("data-scheme", schemeOf(style));
    try { localStorage.setItem(STYLE_KEY, style); } catch (e) {}
    var sel = document.getElementById("skin-select");
    if (sel) sel.value = style;
  }

  // 当前语言（委托给 i18n 模块）。
  function currentLang() { return I18N.getLang(); }

  // ---- 构建「皮肤选择器」HTML（头部和开屏页复用）-------------------------
  function skinSelectHTML() {
    var skins = CONFIG.skins || [];
    // 用 <html data-style> 上的当前值决定哪个 option 选中，保证刷新后选择器显示正确。
    var style = document.documentElement.getAttribute("data-style") || "instrument";
    var lang = currentLang();
    var opts = skins.map(function (s) {
      var label = (s.label && s.label[lang]) ? s.label[lang] : s.value;
      var selected = s.value === style ? " selected" : "";
      return '<option value="' + s.value + '"' + selected + ">" + label + "</option>";
    }).join("");
    // label.sr-only 是给屏幕阅读器的可见文字（视觉上隐藏但无障碍可读）。
    return (
      '<label class="sr-only" for="skin-select">' + I18N.t("common.theme") + "</label>" +
      '<select id="skin-select" class="skin-select" aria-label="' + I18N.t("common.theme") + '">' +
      opts +
      "</select>"
    );
  }

  // ---- 构建「语言切换」按钮 HTML（显示的是「将要切到的语言」）-------------
  function langToggleHTML() {
    // 当前是中文就显示 "EN"，当前是英文就显示 "中"，点一下切到另一个。
    var next = currentLang() === "zh" ? "EN" : "中";
    return (
      '<button id="lang-toggle" class="lang-toggle" type="button" ' +
      'aria-label="' + I18N.t("common.language") + '">' + next + "</button>"
    );
  }

  // #endregion 皮肤应用与控件 HTML
  // #region 头部 / 开屏 / 页脚渲染
  // ---- 渲染完整头部（内容页用）------------------------------------------
  function renderHeader() {
    var host = document.getElementById("site-header");
    if (!host) return; // 开屏页没有这个容器，直接返回

    // 导航项：默认填中文，i18n.apply 会在需要时覆盖成英文。
    var nav = (CONFIG.nav || []).map(function (item) {
      var text = I18N.t(item.i18n);
      return (
        '<li><a class="site-nav__link" href="' + siteUrl(item.href) +
        '" data-i18n="' + item.i18n + '">' + text + "</a></li>"
      );
    }).join("");

    host.innerHTML =
      '<div class="site-header__inner container">' +
        '<a class="site-logo" href="' + siteUrl("home/index.html") + '">' +
          '<span class="site-logo__mark"></span>' +
          "<span>" + (CONFIG.name || "site") + "</span>" +
        "</a>" +
        '<nav class="site-nav" id="site-nav" aria-label="' + I18N.t("common.mainNav") + '">' +
          '<ul class="site-nav__list">' + nav + "</ul>" +
        "</nav>" +
        skinSelectHTML() +
        langToggleHTML() +
        // 汉堡按钮：桌面端被 CSS 隐藏，移动端才出现。三条杠由 CSS 在展开时变 X。
        '<button id="nav-toggle" class="nav-toggle" type="button" ' +
          'aria-expanded="false" aria-controls="site-nav" aria-label="' + I18N.t("common.menu") + '">' +
          '<span class="nav-toggle__bar"></span>' +
          '<span class="nav-toggle__bar"></span>' +
          '<span class="nav-toggle__bar"></span>' +
        "</button>" +
      "</div>";

    bindSkin(host);
    bindLang(host);
    bindNavToggle(host);
    markActive();
    I18N.apply(host); // 把 data-i18n 填上当前语言
  }

  // ---- 渲染开屏页右上角控件（仅皮肤 + 语言）-----------------------------
  function renderSplashControls() {
    var host = document.getElementById("splash-controls");
    if (!host) return;
    host.innerHTML = skinSelectHTML() + langToggleHTML();
    bindSkin(host);
    bindLang(host);
    I18N.apply(host);
  }

  // ---- 渲染页脚 ----------------------------------------------------------
  function renderFooter() {
    var host = document.getElementById("site-footer");
    if (!host) return;

    var social = (CONFIG.social || []).map(function (s) {
      // 社交链接默认新标签打开；rss 是本站的 feed.xml，相对路径也可，统一加 rel 防钓鱼。
      return (
        '<a class="social-links__item" href="' + (/^(?:[a-z]+:|\/\/)/i.test(s.url) ? s.url : siteUrl(s.url)) +
        '" title="' + (s.label || s.type) + '" aria-label="' + (s.label || s.type) +
        '" target="_blank" rel="noopener">' + ICON(s.type) + "</a>"
      );
    }).join("");

    host.innerHTML =
      '<div class="site-footer__inner container">' +
        '<div class="social-links">' + social + "</div>" +
        '<p class="site-footer__meta">' +
          "© <span id=\"year\"></span> " + (CONFIG.name || "site") +
          '. <span data-i18n="footer.builtWith">' + I18N.t("footer.builtWith") + "</span>" +
        "</p>" +
      "</div>";

    // 年份自动更新，不用每年手改。
    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();

    I18N.apply(host);
  }

  // #endregion 头部 / 开屏 / 页脚渲染
  // #region 事件绑定
  // ---- 事件绑定 ----------------------------------------------------------
  function bindSkin(scope) {
    var sel = scope.querySelector("#skin-select");
    if (!sel) return;
    sel.addEventListener("change", function () {
      applyStyle(sel.value);
    });
  }

  function bindLang(scope) {
    var btn = scope.querySelector("#lang-toggle");
    if (!btn) return;
    btn.addEventListener("click", function () {
      I18N.toggle(); // 切换语言并刷新页面文案
      // 重渲染头部/页脚，让下拉选项、按钮文字等也跟着变语言。
      renderHeader();
      renderFooter();
      renderSplashControls();
      // 各页自己挂的「数据 → DOM」渲染函数，切换语言后让它们也跟着刷新文案。
      // 这是解耦的扩展点：main.js 不用知道每个页面的细节，
      // 任何页面只要在全局挂了对应的 renderXxx，这里就会自动调用。
      if (typeof window.renderHome === "function") window.renderHome();
      if (typeof window.renderAbout === "function") window.renderAbout();
      if (typeof window.render404 === "function") window.render404();
      // 以下内容页各自挂了 renderXxx，
      // 切换语言时一并重渲染，保证卡片文案、状态徽章、搜索标签都跟着变语言。
      if (typeof window.renderProjects === "function") window.renderProjects();
      if (typeof window.renderUses === "function") window.renderUses();
      if (typeof window.renderNow === "function") window.renderNow();
      if (typeof window.renderLinks === "function") window.renderLinks();
      if (typeof window.renderSearch === "function") window.renderSearch();
      // 博客列表页：切语言时重渲染，让筛选标签/卡片文案跟着变语言。
      if (typeof window.renderBlog === "function") window.renderBlog();
    });
  }

  function bindNavToggle(scope) {
    var btn = scope.querySelector("#nav-toggle");
    var nav = scope.querySelector("#site-nav");
    if (!btn || !nav) return;
    btn.addEventListener("click", function () {
      // classList.toggle 返回切换后是否存在该类，据此同步 aria-expanded（无障碍状态）。
      var open = nav.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // 移动端点了链接就收起菜单，体验更顺。
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        nav.classList.remove("is-open");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  }

  // 给当前页对应的导航项加 .is-active（高亮）。
  function markActive() {
    // pathname 末尾的文件名；开屏页是 index.html。
    function normalizePath(url) {
      var pathname = new URL(url).pathname;
      return pathname.endsWith("/index.html")
        ? pathname.slice(0, -"index.html".length)
        : pathname;
    }
    var here = normalizePath(location.href);
    var splash = normalizePath(siteUrl("index.html"));
    var links = document.querySelectorAll(".site-nav__link");
    links.forEach(function (a) {
      var href = normalizePath(a.href);
      // index.html（开屏页）不算「当前页」，避免和 home 重复高亮。
      if (href === here && here !== splash) {
        a.classList.add("is-active");
      }
    });
  }

  // #endregion 事件绑定
  // #region 启动
  // ---- 启动 --------------------------------------------------------------
  function init() {
    renderHeader();
    renderSplashControls();
    renderFooter();

    // 把页面正文里（<main> 等）的 data-i18n 也填上当前语言。
    I18N.apply(document);

    // 开屏页：把站点名填到大标题上（数据驱动，不写死）。
    var nameEl = document.getElementById("splash-name");
    if (nameEl && CONFIG.name) nameEl.textContent = CONFIG.name;
  }

  // 脚本放在 body 末尾，DOM 大多已就绪；用 readyState 兜底，确保不漏触发。
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
  // #endregion 启动
})();
