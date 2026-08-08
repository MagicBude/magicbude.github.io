/*
 * js/site.config.js
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
 * 这个文件通过 <script src="js/site.config.js"> 加载，
 * 会把数据挂到全局 window.SITE_CONFIG 上供其他脚本读取。
 * 加载顺序：site.config.js → icons.js → i18n.js → main.js
 * ============================================================================
 */

// 直接赋值给 window，确保任何脚本（main.js / i18n.js）都能访问到。
window.SITE_CONFIG = {

  // #region 身份与基础信息（name / tagline / bio）
  // 站点名 / 你的网络 ID。开屏页大标题、导航 Logo 都用它。
  name: "magicbude",

  // 一句话标语。多语：用 { zh, en } 对象。
  // 首页 Hero 的小徽章、开屏页副标题会用到。
  tagline: {
    zh: "在代码与兴趣之间",
    en: "Between code and curiosity",
  },

  // 自我介绍（首页 / 关于页正文）。多语对象。可长可短，随时改。
  // 文案基调：真诚、有信息量、不尬。身份不写死，给未来挂子站/工具留空间。
  bio: {
    zh: "我是 magicbude，一个喜欢动手的全栈开发者。代码既是工作也是爱好——从底层固件到网页前端都愿意碰一碰。" +
        "生活里，羽毛球、动漫和电影是我的三大消遣。这个站是我的数字花园：记录折腾的过程与思考，" +
        "也随时可能挂上我做过的其他网站和小工具——既给自己留个备份，也希望能帮到同样爱折腾的人。",
    en: "I'm magicbude, a hands-on full-stack developer. Code is both my work and my hobby — " +
        "I'll happily poke at everything from low-level firmware to web front-ends. " +
        "Off the keyboard, badminton, anime, and films keep me busy. " +
        "This site is my digital garden: notes from what I build and tinker with, " +
        "and a place to host the other sites and small tools I make — partly a backup for myself, " +
        "partly for anyone else who likes to tinker.",
  },

  // #endregion 身份与基础信息
  // #region 社交链接与导航
  // 社交 / 外部链接。type 必须对应 js/icons.js 里定义的图标名，
  // 例如 "github" / "gitee" / "x" / "mail" / "rss"。
  social: [
    { type: "github", url: "https://github.com/magicbude",    label: "GitHub" },
    { type: "gitee",  url: "https://gitee.com/magicbude",     label: "Gitee" },
    { type: "x",      url: "https://x.com/",                  label: "X" },
    { type: "mail",   url: "mailto:hi@magicbude.example",     label: "Email" },
    { type: "rss",    url: "feed.xml",                        label: "RSS" },
  ],

  // 主导航。顺序即展示顺序。i18n 是对应的多语字典 key（见 js/i18n.js）。
  // href 指向页面文件；首页是 home.html（index.html 被开屏页占用了）。
  nav: [
    { key: "home",     href: "home.html",     i18n: "nav.home" },
    { key: "blog",     href: "blog.html",     i18n: "nav.blog" },
    { key: "projects", href: "projects.html", i18n: "nav.projects" },
    { key: "now",      href: "now.html",      i18n: "nav.now" },
    { key: "uses",     href: "uses.html",     i18n: "nav.uses" },
    { key: "links",    href: "links.html",    i18n: "nav.links" },
    { key: "search",   href: "search.html",   i18n: "nav.search" },
    { key: "about",    href: "about.html",    i18n: "nav.about" },
  ],
  // #endregion 社交链接与导航
  // #region 皮肤定义与默认值

  // 可切换的视觉皮肤。value 对应 css/main.css 里的 [data-style="xxx"]。
  // label 也做多语，下拉框里会按当前语言显示。
  // 想加新皮肤？在 css/main.css 加一个 [data-style="yyy"] 令牌块，再在这里加一项即可，
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
    style: "instrument",
    lang: "zh",
  },
  // #endregion 皮肤定义与默认值
};
