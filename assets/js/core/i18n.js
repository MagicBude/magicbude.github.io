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
      "nav.links": "收藏",
      "nav.search": "搜索",
      "nav.about": "关于",

      "splash.subtitle": "个人数字基地",
      "splash.enter": "进入",

      "home.greeting": "你好，我是",
      "home.badge": "在代码与兴趣之间，留下自己的数字轨迹",
      "home.intro": "这里汇集作品、文章和长期收藏，也连接我创建的其他网站和项目。",
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
      "home.moment.kicker": "当地信息",
      "home.calendar.kicker": "更新轨迹",
      "home.calendar.updated": "最近更新",
      "home.calendar.empty": "暂无文章",
      "home.tags.empty": "主题会随着文章一起生长。",
      "home.section.featured": "精选项目",
      "home.section.recent": "最新文章",
      "home.section.clock": "此刻",
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
      "about.identity.kicker": "个人档案",
      "about.identity.title": "快速资料",
      "about.identity.base": "PERSONAL DIGITAL BASE",
      "about.interests.title": "我关注的事",
      "about.interests.lead": "技术是长期主线，但不是全部。这里也会留下游戏、动漫、电影、运动和日常生活。",
      "about.principles.title": "为什么保留这个站",
      "about.principles.lead": "它首先服务于我自己：整理做过的事，也让后来的人能够沿着真实记录认识我。",
      "about.contact.title": "找到我",
      "about.contact.desc": "代码与公开项目优先放在 GitHub 和 Gitee；也可以通过邮件联系，或订阅本站 RSS。",

      "notfound.eyebrow": "这条路暂时没有内容",
      "notfound.quick": "继续浏览",

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

      "notfound.title": "页面没有找到",
      "notfound.text": "链接可能已经改变，也可能只是多打了一个字符。你仍然可以从下面继续探索。",
      "notfound.path": "当前地址",
      "notfound.home": "回到首页",
      "notfound.search": "搜索本站",
      "notfound.routesTitle": "或从主要栏目重新出发",
      "notfound.routesAria": "可继续访问的主要栏目",

      "projects.eyebrow": "作品",
      "projects.title": "项目",
      "projects.lead": "记录已经运行的作品，也保存仍在孵化、等待慢慢成形的想法。",
      "projects.statsLabel": "项目概览",
      "projects.stat.total": "收录项目",
      "projects.stat.active": "正在运行",
      "projects.stat.incubating": "孵化中",
      "projects.current.title": "当前作品",
      "projects.current.lead": "已经可以访问、持续维护，并且最能代表当前实践的项目。",
      "projects.current.eyebrow": "正在运行",
      "projects.incubator.title": "孵化中的实验",
      "projects.incubator.lead": "一些尚未完成、但值得继续探索的方向。",
      "projects.highlights": "实现要点",
      "projects.empty": "还没有公开的项目，先去 GitHub 看看？",
      "projects.view": "查看",
      "projects.visitSite": "访问本站",
      "projects.visitGithub": "查看 GitHub 动态",
      "projects.viewProject": "查看项目",
      "projects.status.active": "运行中",
      "projects.status.wip": "开发中",
      "projects.status.idea": "规划中",
      "projects.status.arch": "已归档",

      "links.eyebrow": "个人收藏",
      "links.title": "网站与工具收藏夹",
      "links.lead": "把常用网站、软件工具、参考资料和朋友站点收在一起，换一台设备也能快速找回来。",
      "links.snapshot.kicker": "BOOKMARK LIBRARY",
      "links.updated": "最后核对",
      "links.friendsCount": "公开友链",
      "links.resourcesCount": "收藏条目",
      "links.friend": "朋友站点",
      "links.friendLead": "与其他个人网站建立的长期连接。",
      "links.resource": "收藏库",
      "links.resourceLead": "按用途整理的网站、开发工具、写作软件和系统工具。",
      "links.empty": "目前还没有公开友链。",
      "links.emptyLead": "如果你也维护个人网站，并愿意交换一个长期有效的链接，可以通过邮件联系。",
      "links.contact": "发邮件交换友链",
      "links.visit": "访问站点",

      "search.eyebrow": "全站索引",
      "search.title": "搜索这座数字基地",
      "search.lead": "从页面、文章、项目、资源和工具中查找内容，也可以不输入关键词，直接按类型浏览。",
      "search.snapshot.kicker": "LOCAL INDEX",
      "search.items": "索引条目",
      "search.sources": "内容类型",
      "search.label": "搜索关键词",
      "search.results": "找到 {n} 条结果",
      "search.browse": "正在浏览全部 {n} 条内容",
      "search.empty": "没有匹配的内容，换个关键词试试。",
      "search.emptyLead": "可以清空关键词，或者切回“全部”查看完整索引。",
      "search.filterAll": "全部",
      "search.filtersLabel": "按内容类型筛选",
      "search.groupItem": "{n} 条",
      "search.groupCount": "{n} 条",
      "search.clear": "清空搜索",
      "search.shortcut": "按 / 聚焦",
      "search.open": "打开",
      "search.kind.blog": "文章",
      "search.kind.page": "页面",
      "search.kind.project": "项目",
      "search.kind.link": "链接",
      "search.kind.tool": "工具",

      "blog.eyebrow": "写作档案",
      "blog.title": "文章与实践记录",
      "blog.lead": "把已经做过、想明白或值得复习的内容写下来，慢慢积累成可以反复查阅的记录。",
      "blog.snapshot.kicker": "WRITING ARCHIVE",
      "blog.articleCount": "公开文章",
      "blog.tagCount": "主题标签",
      "blog.languageCount": "写作语言",
      "blog.rss": "订阅 RSS",
      "blog.article": "文章",
      "blog.filtersLabel": "文章筛选",
      "blog.archiveTitle": "全部文章",
      "blog.archiveLead": "按语言或标签缩小范围；筛选只作用于当前公开文章。",
      "blog.browseOne": "正在显示 {n} 篇文章",
      "blog.browse": "正在显示 {n} 篇文章",
      "blog.filterLang": "语言",
      "blog.filterTag": "标签",
      "blog.langZh": "中文",
      "blog.langEn": "English",
      "blog.back": "返回博客",
      "blog.toc": "目录",
      "blog.tocAria": "文章目录",
      "blog.published": "发布于",
      "blog.prev": "上一篇",
      "blog.next": "下一篇",
      "blog.empty": "没有匹配的文章。",
      "blog.emptyLead": "清空筛选条件即可回到完整文章档案。",
      "blog.reset": "清空筛选",
      "blog.read": "阅读全文",
    },

    en: {
      "nav.home": "Home",
      "nav.blog": "Blog",
      "nav.projects": "Projects",
      "nav.links": "Bookmarks",
      "nav.search": "Search",
      "nav.about": "About",

      "splash.subtitle": "Personal digital base",
      "splash.enter": "Enter",

      "home.greeting": "Hi, I'm",
      "home.badge": "A personal trail between code and curiosity",
      "home.intro": "A home for projects, writing, long-term bookmarks, and links to everything else I create.",
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
      "home.moment.kicker": "Local information",
      "home.calendar.kicker": "Update trail",
      "home.calendar.updated": "Last updated",
      "home.calendar.empty": "No posts yet",
      "home.tags.empty": "Topics will grow with the writing.",
      "home.section.featured": "Featured projects",
      "home.section.recent": "Latest writing",
      "home.section.clock": "Right now",
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
      "about.identity.kicker": "Profile",
      "about.identity.title": "At a glance",
      "about.identity.base": "PERSONAL DIGITAL BASE",
      "about.interests.title": "What I care about",
      "about.interests.lead": "Technology is a long-running thread, but not the whole picture. Games, anime, film, movement, and everyday life belong here too.",
      "about.principles.title": "Why keep this site",
      "about.principles.lead": "It serves me first: organizing what I make while letting others get to know me through an honest record.",
      "about.contact.title": "Find me",
      "about.contact.desc": "Code and public projects live primarily on GitHub and Gitee. You can also email me or subscribe to this site's RSS feed.",

      "notfound.eyebrow": "Nothing lives on this path yet",
      "notfound.quick": "Keep exploring",

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

      "notfound.title": "Page not found",
      "notfound.text": "The link may have changed, or perhaps one character slipped in. You can still continue exploring below.",
      "notfound.path": "Current address",
      "notfound.home": "Back to home",
      "notfound.search": "Search this site",
      "notfound.routesTitle": "Or restart from a main section",
      "notfound.routesAria": "Main sections you can still visit",

      "projects.eyebrow": "Works",
      "projects.title": "Projects",
      "projects.lead": "A record of what is already live, alongside ideas still incubating and waiting to take shape.",
      "projects.statsLabel": "Project overview",
      "projects.stat.total": "Projects listed",
      "projects.stat.active": "Live now",
      "projects.stat.incubating": "Incubating",
      "projects.current.title": "Current work",
      "projects.current.lead": "Projects that are accessible, actively maintained, and representative of my current practice.",
      "projects.current.eyebrow": "Live now",
      "projects.incubator.title": "Experiments in incubation",
      "projects.incubator.lead": "Unfinished directions that are still worth exploring.",
      "projects.highlights": "Implementation notes",
      "projects.empty": "No public projects yet — check GitHub?",
      "projects.view": "View",
      "projects.visitSite": "Visit this site",
      "projects.visitGithub": "View GitHub activity",
      "projects.viewProject": "View project",
      "projects.status.active": "Active",
      "projects.status.wip": "In progress",
      "projects.status.idea": "Planned",
      "projects.status.arch": "Archived",

      "links.eyebrow": "Personal collection",
      "links.title": "Websites & tools library",
      "links.lead": "A home for useful websites, software tools, references, and friend sites — easy to find again from any device.",
      "links.snapshot.kicker": "BOOKMARK LIBRARY",
      "links.updated": "Last reviewed",
      "links.friendsCount": "Public friends",
      "links.resourcesCount": "Bookmarks",
      "links.friend": "Friend sites",
      "links.friendLead": "Long-term connections with other personal websites.",
      "links.resource": "Bookmark library",
      "links.resourceLead": "Websites, development tools, writing apps, and system utilities organized by purpose.",
      "links.empty": "No public friend links yet.",
      "links.emptyLead": "If you maintain a personal website and would like to exchange a lasting link, get in touch by email.",
      "links.contact": "Email for a link exchange",
      "links.visit": "Visit site",

      "search.eyebrow": "Site index",
      "search.title": "Search this digital base",
      "search.lead": "Find pages, posts, projects, resources, and tools — or browse the full index by content type without entering a query.",
      "search.snapshot.kicker": "LOCAL INDEX",
      "search.items": "Indexed entries",
      "search.sources": "Content types",
      "search.label": "Search query",
      "search.results": "{n} results found",
      "search.browse": "Browsing all {n} entries",
      "search.empty": "Nothing matched. Try another keyword.",
      "search.emptyLead": "Clear the query or switch back to All to see the complete index.",
      "search.filterAll": "All",
      "search.filtersLabel": "Filter by content type",
      "search.groupItem": "{n} entry",
      "search.groupCount": "{n} entries",
      "search.clear": "Clear search",
      "search.shortcut": "Press / to focus",
      "search.open": "Open",
      "search.kind.blog": "Post",
      "search.kind.page": "Page",
      "search.kind.project": "Project",
      "search.kind.link": "Link",
      "search.kind.tool": "Tool",

      "blog.eyebrow": "Writing archive",
      "blog.title": "Articles & practice notes",
      "blog.lead": "A growing record of things built, understood, or worth revisiting later.",
      "blog.snapshot.kicker": "WRITING ARCHIVE",
      "blog.articleCount": "Published posts",
      "blog.tagCount": "Topic tags",
      "blog.languageCount": "Writing languages",
      "blog.rss": "Subscribe via RSS",
      "blog.article": "Article",
      "blog.filtersLabel": "Article filters",
      "blog.archiveTitle": "All articles",
      "blog.archiveLead": "Narrow the archive by language or tag; filters only apply to currently published posts.",
      "blog.browseOne": "Showing {n} post",
      "blog.browse": "Showing {n} posts",
      "blog.filterLang": "Language",
      "blog.filterTag": "Tags",
      "blog.langZh": "中文",
      "blog.langEn": "English",
      "blog.back": "Back to blog",
      "blog.toc": "Contents",
      "blog.tocAria": "Article contents",
      "blog.published": "Published",
      "blog.prev": "Previous",
      "blog.next": "Next",
      "blog.empty": "No matching posts.",
      "blog.emptyLead": "Clear the filters to return to the complete writing archive.",
      "blog.reset": "Clear filters",
      "blog.read": "Read article",
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
