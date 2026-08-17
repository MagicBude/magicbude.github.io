/*
 * assets/js/core/i18n.js
 * ============================================================================
 * 多语言字典 + 应用函数。UI 文案在这里集中管理，页面不写死文字。
 *
 * 用法（三步）：
 *   1. 在这个文件的 dict 里加一个语言包，例如 en: { "nav.home": "Home" }
 *   2. 在 HTML 里给元素加 data-i18n="nav.home"
 *   3. 本文件会把该元素的文字填成当前语言对应的翻译
 *
 * 加一门新语言（如日语）：
 *   只在 dict 里加 ja: { ... }，UI 代码完全不用动。
 *   语言切换按钮目前只在 zh / en 间循环；要支持 ja，把 LANG_ORDER 加上 "ja" 即可。
 *
 * 存储：用户选择的语言存 localStorage["site-lang"]，刷新后保持。
 * 首屏防闪白脚本会在 CSS 加载前读这个值设好 <html lang>。
 *
 * 暴露的 API（挂在 window.i18n 上）：
 *   getLang()        取当前语言
 *   t(key, lang?)    取某 key 的译文
 *   apply(root?)     把 root 内所有 [data-i18n] 填上当前语言
 *   setLang(lang)    切换并持久化语言，刷新全站文案
 *   toggle()         在支持的语言间循环切换，返回新语言
 * ============================================================================
 */
window.i18n = (function () {
  "use strict";

  // 字典：第一层是语言代码，第二层是「文案 key → 译文」。
  // #region 字典（zh / en 语言包）
  var dict = {
    zh: {
      "nav.home": "首页",
      "nav.blog": "博客",
      "nav.projects": "项目",
      "nav.now": "近况",
      "nav.uses": "装备",
      "nav.links": "导航",
      "nav.search": "搜索",
      "nav.about": "关于",

      "splash.subtitle": "个人数字基地",
      "splash.enter": "进入",

      "home.greeting": "你好，我是",
      "home.badge": "在代码与兴趣之间，留下自己的数字轨迹",
      "home.intro": "这里汇集作品、文章、近况、常用工具与收藏，也连接我创建的其他网站和项目。",
      "home.hero.eyebrow": "个人数字基地",
      "home.hero.lead": "把做过的、想过的和正在发生的事，整理成一个可以长期生长的坐标。",
      "home.search.aria": "搜索站内内容",
      "home.search.placeholder": "搜索文章、项目、工具与收藏…",
      "home.dashboard.aria": "基地总览",
      "home.profile.kicker": "基地维护者",
      "home.profile.more": "认识更多",
      "home.stat.posts": "文章",
      "home.stat.tags": "标签",
      "home.stat.projects": "项目",
      "home.feed.kicker": "中文独立网站",
      "home.now.kicker": "此刻切片",
      "home.now.more": "查看全部近况",
      "home.clock.kicker": "浏览器本地时间",
      "home.calendar.kicker": "更新轨迹",
      "home.calendar.updated": "最近更新",
      "home.calendar.empty": "暂无文章",
      "home.tags.empty": "主题会随着文章一起生长。",
      "home.section.featured": "精选项目",
      "home.section.recent": "最新文章",
      "home.section.now": "最近在做",
      "home.section.clock": "此刻",
      "home.weather.kicker": "实时天气",
      "home.weather.title": "你所在地区",
      "home.weather.intro": "点击后获取当前位置天气；位置不会被本站保存。",
      "home.weather.locate": "使用我的位置",
      "home.weather.retry": "重新获取",
      "home.weather.loading": "正在定位并获取天气…",
      "home.weather.unsupported": "此浏览器不支持定位，或当前页面不是安全连接。",
      "home.weather.denied": "没有获得定位权限，其他内容仍可正常使用。",
      "home.weather.unavailable": "暂时无法确定位置，请稍后再试。",
      "home.weather.network": "天气服务暂时不可用，请稍后再试。",
      "home.weather.feels": "体感",
      "home.weather.humidity": "湿度",
      "home.weather.wind": "风速",
      "home.weather.source": "天气数据",
      "home.weather.clear": "晴朗",
      "home.weather.partlyCloudy": "少云",
      "home.weather.overcast": "阴天",
      "home.weather.fog": "有雾",
      "home.weather.drizzle": "毛毛雨",
      "home.weather.rain": "有雨",
      "home.weather.snow": "有雪",
      "home.weather.showers": "阵雨",
      "home.weather.thunderstorm": "雷暴",
      "home.section.tags": "正在生长的主题",
      "home.section.calendar": "发布日历",
      "home.section.explore": "探索更多",
      "home.noPosts": "还没有文章，去博客写第一篇吧。",

      "about.eyebrow": "关于",
      "about.section.here": "这个站有",
      "about.section.contact": "联系我",
      "about.section.contactDesc": "在这些地方可以找到我：",

      "notfound.quick": "或者去",

      "section.viewAll": "查看全部",
      "common.all": "全部",
      "common.search": "搜索",
      "common.searchPlaceholder": "搜索站内内容…",
      "common.theme": "主题",
      "common.language": "语言",
      "common.skip": "跳到主内容",
      "common.mainNav": "主导航",
      "common.menu": "菜单",

      "footer.builtWith": "用原生 HTML / CSS / JS 手写",
      "footer.rss": "订阅 RSS",

      "notfound.title": "404",
      "notfound.text": "你想找的页面走丢了。",
      "notfound.home": "回到首页",

      "projects.eyebrow": "作品",
      "projects.title": "项目",
      "projects.lead": "已经完成、正在制作和计划中的网站、工具与项目。",
      "projects.empty": "还没有公开的项目，先去 GitHub 看看？",
      "projects.view": "查看",
      "projects.status.active": "运行中",
      "projects.status.wip": "开发中",
      "projects.status.idea": "规划中",
      "projects.status.arch": "已归档",

      "uses.eyebrow": "装备",
      "uses.title": "我在用什么",
      "uses.lead": "日常使用的硬件、软件与服务，以及选择它们的原因。",
      "uses.gearTitle": "我的装备",
      "uses.gearLead": "我实际使用的设备、软件与服务；这部分会随着使用习惯继续更新。",
      "uses.toolboxTitle": "工具箱",
      "uses.toolboxLead": "值得收藏的软件与开发工具目录；收录不等于当前正在使用。",
      "uses.filterAll": "全部",
      "uses.officialSite": "访问官网",

      "now.eyebrow": "近况",
      "now.title": "最近在搞啥",
      "now.lead": "不是简历，是此刻正在进行的事——会随兴趣更新。",

      "links.eyebrow": "导航",
      "links.title": "朋友们和好站",
      "links.lead": "我常逛、或觉得有用的地方；也欢迎交换友链。",
      "links.friend": "朋友站点",
      "links.resource": "资源 / 工具",
      "links.empty": "友链暂空，欢迎来撩。",

      "search.eyebrow": "搜索",
      "search.title": "搜一搜",
      "search.results": "找到 {n} 条结果",
      "search.empty": "没有匹配的内容，换个关键词试试。",
      "search.hint": "支持搜索页面、文章、项目、友链与资源。",
      "search.kind.blog": "文章",
      "search.kind.page": "页面",
      "search.kind.project": "项目",
      "search.kind.link": "链接",
      "search.kind.tool": "工具",

      "blog.eyebrow": "博客",
      "blog.title": "博客",
      "blog.lead": "写代码、做小工具的记录，以及一些碎碎念。",
      "blog.filterLang": "语言",
      "blog.filterTag": "标签",
      "blog.langZh": "中文",
      "blog.langEn": "English",
      "blog.back": "返回博客",
      "blog.toc": "目录",
      "blog.published": "发布于",
      "blog.prev": "上一篇",
      "blog.next": "下一篇",
      "blog.empty": "没有匹配的文章。",
    },

    en: {
      "nav.home": "Home",
      "nav.blog": "Blog",
      "nav.projects": "Projects",
      "nav.now": "Now",
      "nav.uses": "Uses",
      "nav.links": "Links",
      "nav.search": "Search",
      "nav.about": "About",

      "splash.subtitle": "Personal digital base",
      "splash.enter": "Enter",

      "home.greeting": "Hi, I'm",
      "home.badge": "A personal trail between code and curiosity",
      "home.intro": "A home for projects, writing, current notes, tools, collections, and links to everything else I create.",
      "home.hero.eyebrow": "Personal digital base",
      "home.hero.lead": "A lasting coordinate for the things I make, think about, and live through.",
      "home.search.aria": "Search the site",
      "home.search.placeholder": "Search writing, projects, tools, and collections…",
      "home.dashboard.aria": "Digital base overview",
      "home.profile.kicker": "Base keeper",
      "home.profile.more": "More about me",
      "home.stat.posts": "Posts",
      "home.stat.tags": "Tags",
      "home.stat.projects": "Projects",
      "home.feed.kicker": "Independent personal site",
      "home.now.kicker": "A slice of now",
      "home.now.more": "View all current notes",
      "home.clock.kicker": "Browser local time",
      "home.calendar.kicker": "Update trail",
      "home.calendar.updated": "Last updated",
      "home.calendar.empty": "No posts yet",
      "home.tags.empty": "Topics will grow with the writing.",
      "home.section.featured": "Featured projects",
      "home.section.recent": "Latest writing",
      "home.section.now": "What I'm doing",
      "home.section.clock": "Right now",
      "home.weather.kicker": "Live weather",
      "home.weather.title": "Your area",
      "home.weather.intro": "Use your location to load local weather. This site does not store it.",
      "home.weather.locate": "Use my location",
      "home.weather.retry": "Try again",
      "home.weather.loading": "Locating and loading weather…",
      "home.weather.unsupported": "Location is unavailable in this browser or outside a secure connection.",
      "home.weather.denied": "Location permission was not granted. The rest of the site still works.",
      "home.weather.unavailable": "Your location is temporarily unavailable. Please try again.",
      "home.weather.network": "The weather service is temporarily unavailable. Please try again.",
      "home.weather.feels": "Feels",
      "home.weather.humidity": "Humidity",
      "home.weather.wind": "Wind",
      "home.weather.source": "Weather data",
      "home.weather.clear": "Clear",
      "home.weather.partlyCloudy": "Partly cloudy",
      "home.weather.overcast": "Overcast",
      "home.weather.fog": "Fog",
      "home.weather.drizzle": "Drizzle",
      "home.weather.rain": "Rain",
      "home.weather.snow": "Snow",
      "home.weather.showers": "Showers",
      "home.weather.thunderstorm": "Thunderstorm",
      "home.section.tags": "Growing topics",
      "home.section.calendar": "Publishing calendar",
      "home.section.explore": "Explore more",
      "home.noPosts": "No posts yet — go write the first one.",

      "about.eyebrow": "About",
      "about.section.here": "What's on this site",
      "about.section.contact": "Get in touch",
      "about.section.contactDesc": "You can find me on:",

      "notfound.quick": "Or head to",

      "section.viewAll": "View all",
      "common.all": "All",
      "common.search": "Search",
      "common.searchPlaceholder": "Search the site…",
      "common.theme": "Theme",
      "common.language": "Language",
      "common.skip": "Skip to content",
      "common.mainNav": "Primary navigation",
      "common.menu": "Menu",

      "footer.builtWith": "Hand-written with plain HTML / CSS / JS",
      "footer.rss": "RSS",

      "notfound.title": "404",
      "notfound.text": "The page you're looking for is lost.",
      "notfound.home": "Back to home",

      "projects.eyebrow": "Works",
      "projects.title": "Projects",
      "projects.lead": "Completed, active, and planned websites, tools, and projects.",
      "projects.empty": "No public projects yet — check GitHub?",
      "projects.view": "View",
      "projects.status.active": "Active",
      "projects.status.wip": "In progress",
      "projects.status.idea": "Planned",
      "projects.status.arch": "Archived",

      "uses.eyebrow": "Uses",
      "uses.title": "What I use",
      "uses.lead": "Hardware, software, and services I use, with the reasons behind those choices.",
      "uses.gearTitle": "My setup",
      "uses.gearLead": "Devices, software, and services I actually use; this list evolves with my workflow.",
      "uses.toolboxTitle": "Toolbox",
      "uses.toolboxLead": "A curated directory of useful software and development tools; inclusion does not imply daily use.",
      "uses.filterAll": "All",
      "uses.officialSite": "Official site",

      "now.eyebrow": "Now",
      "now.title": "What I'm up to",
      "now.lead": "Not a résumé — just what's happening right now. Updates with my mood.",

      "links.eyebrow": "Links",
      "links.title": "Friends & good sites",
      "links.lead": "Places I hang out or find useful; happy to swap links.",
      "links.friend": "Friends",
      "links.resource": "Resources / Tools",
      "links.empty": "No links yet — say hi!",

      "search.eyebrow": "Search",
      "search.title": "Search",
      "search.results": "{n} results found",
      "search.empty": "Nothing matched. Try another keyword.",
      "search.hint": "Searches pages, posts, projects, friends, and resources.",
      "search.kind.blog": "Post",
      "search.kind.page": "Page",
      "search.kind.project": "Project",
      "search.kind.link": "Link",
      "search.kind.tool": "Tool",

      "blog.eyebrow": "Blog",
      "blog.title": "Blog",
      "blog.lead": "Notes from coding, building small tools, and the occasional ramble.",
      "blog.filterLang": "Language",
      "blog.filterTag": "Tags",
      "blog.langZh": "中文",
      "blog.langEn": "English",
      "blog.back": "Back to blog",
      "blog.toc": "Contents",
      "blog.published": "Published",
      "blog.prev": "Previous",
      "blog.next": "Next",
      "blog.empty": "No matching posts.",
    },
  };

  // 语言切换按钮循环支持的语言顺序。要加日语就在这里加 "ja"。
  // #endregion 字典
  // #region 语言状态与存储
  var LANG_ORDER = ["zh", "en"];

  // localStorage 里存语言的键名。必须和 HTML 防闪白脚本里的一致。
  var STORAGE_KEY = "site-lang";

  // 取当前语言：优先 localStorage，没有就回落到 zh。
  function getLang() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved && dict[saved]) return saved;
    } catch (e) {}
    return "zh";
  }

  // 取某 key 在当前语言下的译文；找不到就回落 zh，再找不到就返回 key 本身。
  function t(key, lang) {
    lang = lang || getLang();
    if (dict[lang] && dict[lang][key] != null) return dict[lang][key];
    if (dict.zh && dict.zh[key] != null) return dict.zh[key];
    return key;
  }

  // 把某个根元素内所有带 data-i18n 的元素填上当前语言的文字。
  // 默认写 textContent；若元素声明 data-i18n-attr，则改写逗号分隔的属性列表。
  // 属性翻译必须显式声明，避免脚本仅凭标签名猜测 placeholder 或 aria-label。
  // #endregion 语言状态与存储
  // #region 翻译与渲染
  // 不传 root 就处理整个 document。幂等，可反复调用。
  function apply(root) {
    root = root || document;
    var nodes = root.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute("data-i18n");
      var attrs = nodes[i].getAttribute("data-i18n-attr");
      if (attrs) {
        attrs.split(",").forEach(function (attr) {
          nodes[i].setAttribute(attr.trim(), t(key));
        });
      } else {
        nodes[i].textContent = t(key);
      }
    }
  }

  // 切换并持久化语言，同时更新 <html lang> 并刷新页面上所有文案。
  // 之后调用方（main.js）通常还会重渲染头部/页脚，让下拉选项等也跟着变语言。
  function setLang(lang) {
    if (!dict[lang]) return;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    document.documentElement.setAttribute("lang", lang);
    apply(document);
  }

  // #endregion 翻译与渲染
  // #region 语言切换
  // 在支持的语言间循环切换（zh → en → zh …），返回新的语言代码。
  function toggle() {
    var cur = getLang();
    var idx = LANG_ORDER.indexOf(cur);
    var next = LANG_ORDER[(idx + 1) % LANG_ORDER.length];
    setLang(next);
    return next;
  }

  // 暴露公开 API 挂在 window.i18n 上。
  // #endregion 语言切换
  // #region 公开 API 导出
  return {
    dict: dict,
    getLang: getLang,
    t: t,
    apply: apply,
    setLang: setLang,
    toggle: toggle,
  };
  // #endregion 公开 API 导出
})();
