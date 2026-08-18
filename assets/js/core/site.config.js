/*
 * assets/js/core/site.config.js
 * ============================================================================
 * 全站「身份与导航」的唯一真源（single source of truth）。
 *
 * 为什么要有这个文件？
 *   个人网站会随兴趣演化：名字、slogan、社交链接、导航项经常变。
 *   如果把这些硬编码进每一个 HTML 页面，改一次要改 N 个文件，迟早出错。
 *   所以统一抽到这里，所有页面运行时读取它来填头部 / 首页 Hero。
 *   加子站、改名字、加社交 —— 只动这一个文件，全站自动同步。
 *
 * 怎么改？
 *   - 改名字 / slogan / 简介：直接改下面的字段（多语用 { zh, en } 对象）
 *   - 加导航项：往 nav 数组里加一项 { key, href, i18n }
 *   - 加社交：往 social 数组里加 { type, url }（type 对应 icons.js 里的图标名）
 *   - 加皮肤：往 skins 数组加一项，并在 css/main.css 加一个 [data-style="xxx"] 令牌块
 *
 * 这个文件通过各页面的 <script src="assets/js/core/site.config.js"> 加载，
 * 会把数据挂到全局 window.SITE_CONFIG 上供其他脚本读取。
 * 加载顺序：site.config.js → icons.js → i18n.js → main.js
 * ============================================================================
 */

// 直接赋值给 window，确保任何脚本（main.js / i18n.js）都能访问到。
window.SITE_CONFIG = {

  // #region 身份与基础信息（name / tagline / bio）
  // 站点名 / 你的网络 ID。首页与导航 Logo 都用它。
  name: "magicbude",

  // 一句话标语。多语：用 { zh, en } 对象。
  // 首页 Hero 的主标题会用到。
  tagline: {
    zh: "在代码与兴趣之间，留下自己的数字轨迹",
    en: "A personal trail between code and curiosity",
  },

  // 采用不依赖当前开发阶段的长期表述，避免网站每完成一个阶段就重写自我介绍。
  // 以后只有身份、兴趣或站点定位真正变化时才需要修改这里。
  bio: {
    zh: "我是 magicbude，一个喜欢编程、动手实践和探索不同兴趣的人。这里是我的个人数字基地：" +
        "汇集作品、文章和长期收藏，也连接我创建的其他网站与项目。数字花园则是其中持续整理知识与想法的部分。",
    en: "I'm magicbude, interested in programming, hands-on creation, and exploring different interests. " +
        "This is my personal digital base for projects, writing, long-term bookmarks, and the other things I create. " +
        "Its digital garden is where knowledge and ideas continue to grow.",
  },

  // 首页只展示一句摘要；完整自我介绍留在 About，避免两个页面逐字重复。
  summary: {
    zh: "喜欢编程、动手实践，也持续探索游戏、动漫、电影和运动。",
    en: "Interested in programming, hands-on making, games, anime, film, and sport.",
  },

  /*
   * 关于页的个人资料也属于站点身份，因此继续放在唯一配置源里，而不是写死进 HTML。
   * facts 用于快速认识，interests 记录长期兴趣，principles 解释为什么维护这个站。
   * 这些字段只陈述已经确认的信息；未来兴趣或定位变化时，在这里统一更新。
   */
  about: {
    mark: "MB",
    facts: [
      {
        label: { zh: "角色", en: "Role" },
        value: { zh: "个人数字基地维护者", en: "Keeper of a personal digital base" },
      },
      {
        label: { zh: "兴趣", en: "Interests" },
        value: { zh: "编程、游戏、动漫、电影、羽毛球", en: "Programming, games, anime, film, badminton" },
      },
      {
        label: { zh: "建站方式", en: "Built as" },
        value: { zh: "原生静态网页", en: "A plain static website" },
      },
    ],
    interests: [
      {
        icon: "code",
        title: { zh: "编程与动手", en: "Programming & making" },
        desc: {
          zh: "喜欢把想法做成可以运行的小工具，也把实现过程整理成可复习的记录。",
          en: "I like turning ideas into small working tools and keeping the process as notes I can revisit.",
        },
      },
      {
        icon: "gamepad",
        title: { zh: "游戏与动漫", en: "Games & anime" },
        desc: {
          zh: "游戏和动漫是技术之外长期保留的兴趣，也构成这个站个人气质的一部分。",
          en: "Games and anime are long-running interests beyond technology, and part of this site's personality.",
        },
      },
      {
        icon: "film",
        title: { zh: "电影与故事", en: "Film & stories" },
        desc: {
          zh: "电影也是日常兴趣的一部分，相关的观看与想法会在内容积累后慢慢留下。",
          en: "Film is part of everyday life too; viewing notes and thoughts can grow here over time.",
        },
      },
      {
        icon: "heart",
        title: { zh: "羽毛球与日常", en: "Badminton & everyday life" },
        desc: {
          zh: "羽毛球是屏幕之外的日常活动之一，这里也会保留真实生活的痕迹。",
          en: "Badminton is one of my regular activities away from the screen, alongside traces of everyday life.",
        },
      },
    ],
    principles: [
      {
        title: { zh: "自己掌握的空间", en: "A space I control" },
        desc: {
          zh: "不依赖社交平台的时间线，把重要内容放在自己能够长期维护的位置。",
          en: "Keep important work somewhere I can maintain over time, instead of relying on a social feed.",
        },
      },
      {
        title: { zh: "随时找得回来", en: "Easy to find again" },
        desc: {
          zh: "把文章、项目和收藏放进清晰稳定的结构，换设备或隔很久回来也能快速定位。",
          en: "Keep writing, projects, and bookmarks in a stable structure that stays useful across devices and over time.",
        },
      },
      {
        title: { zh: "边做边整理", en: "Build, then organize" },
        desc: {
          zh: "这个站不是一次写完的简历，而是随项目、文章和兴趣持续更新的个人档案。",
          en: "This is not a résumé finished in one sitting, but a personal archive that grows with projects, writing, and interests.",
        },
      },
    ],
  },

  // #endregion 身份与基础信息
  // #region 社交链接与导航
  // 社交 / 外部链接。type 必须对应 assets/js/core/icons.js 里定义的图标名，
  // 例如 "github" / "gitee" / "x" / "mail" / "rss"。
  social: [
    { type: "github", url: "https://github.com/magicbude",    label: "GitHub" },
    { type: "gitee",  url: "https://gitee.com/magicbude",     label: "Gitee" },
    { type: "mail",   url: "mailto:magicbude1998@gmail.com", label: "Email" },
    { type: "rss",    url: "feed.xml",                       label: "RSS" },
  ],

  // 主导航。顺序即展示顺序。i18n 是对应的多语字典 key（见 js/i18n.js）。
  // href 保存相对于站点根目录的语义化路径；main.js 会按当前部署位置解析为完整地址。
  nav: [
    { key: "home",     href: "index.html",          i18n: "nav.home" },
    { key: "blog",     href: "blog/index.html",     i18n: "nav.blog" },
    { key: "projects", href: "projects/index.html", i18n: "nav.projects" },
    { key: "links",    href: "links/index.html",    i18n: "nav.links" },
    { key: "search",   href: "search/index.html",   i18n: "nav.search" },
    { key: "about",    href: "about/index.html",    i18n: "nav.about" },
  ],
  // #endregion 社交链接与导航
  // #region 皮肤定义与默认值

  // 可切换的视觉皮肤。value 对应 assets/css/main.css 里的 [data-style="xxx"]。
  // label 也做多语，下拉框里会按当前语言显示。
  // 想加新皮肤？在 assets/css/main.css 加一个 [data-style="yyy"] 令牌块，再在这里加一项即可，
  // 页面组件零改动。
  skins: [
    { value: "instrument", label: { zh: "工程仪器", en: "Instrument" } },
    { value: "minimal",     label: { zh: "浅色极简", en: "Minimal" } },
    { value: "terminal",    label: { zh: "终端黑客", en: "Terminal" } },
    { value: "magazine",    label: { zh: "杂志编辑", en: "Magazine" } },
  ],

  // 默认皮肤与默认语言（仅在 localStorage 没有记录时生效）。
  // 注意：真正的首屏应用由 HTML 里的防闪白内联脚本完成，这里只是兜底值。
  defaults: {
    style: "magazine",
    lang: "zh",
  },
  // #endregion 皮肤定义与默认值
};
