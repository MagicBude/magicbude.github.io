/*
 * assets/js/data/projects.js
 * ============================================================================
 * 项目数据模块：集中保存项目页与搜索页共同使用的项目资料。
 *
 * 协作关系：
 *   - projects/index.html 读取 window.PROJECTS 并渲染项目卡片；
 *   - search/index.html 读取同一数组，把项目加入站内搜索索引。
 *
 * 为什么单独成文件：搜索页不会执行项目页里的内联脚本，共享数据必须独立加载。
 * 将共享数据放进普通 JS 文件后，不同页面可以通过 <script src> 加载同一份数据，
 * 从而避免复制两份项目列表，以及修改一处、忘记同步另一处的问题。
 * ============================================================================
 */

// #region 项目数据

/*
 * 字段说明：
 *   title  按语言代码保存的项目名称；
 *   desc   按语言代码保存的简介，当前支持 zh / en；
 *   url    项目详情页或外部仓库地址；
 *   icon   js/icons.js 中的图标名称；
 *   featured 是否作为当前代表作品展示；只有已经可访问、值得重点介绍的项目才设为 true；
 *   highlights 按语言保存的事实亮点数组，项目页会把它渲染成简短清单；
 *   linkType 链接语义：site(访问成品) / profile(查看作者主页) / project(查看项目)；
 *   status active(运行中) / wip(开发中) / idea(规划中) / arch(已归档)，
 *          对应不同颜色徽章；idea 暂时复用 wip 的琥珀色，但保留独立文案和数据语义；
 *   tags   用于概括技术或项目类型的标签数组。
 */
window.PROJECTS = [
  {
    title: { zh: "个人数字基地（本站）", en: "Personal digital base (this site)" },
    desc: {
      zh: "你正在看的这个纯静态个人站，零构建、手写 HTML/CSS/JS。",
      en: "The static personal site you're on — zero-build, hand-written HTML/CSS/JS.",
    },
    url: "index.html",
    icon: "layout",
    featured: true,
    highlights: {
      zh: ["原生 HTML / CSS / JavaScript", "四套可切换皮肤与中英界面", "Markdown 静态文章工作流"],
      en: ["Plain HTML / CSS / JavaScript", "Four switchable skins with Chinese and English UI", "A static Markdown publishing workflow"],
    },
    linkType: "site",
    status: "active",
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: { zh: "SensorLink", en: "SensorLink" },
    desc: {
      zh: "计划制作的传感器数据采集与可视化工具，目标是支持串口直连和实时绘图。",
      en: "A planned sensor data tool intended to support serial input and live charts.",
    },
    url: "https://github.com/magicbude",
    icon: "code",
    featured: false,
    linkType: "profile",
    status: "idea",
    tags: ["Tool", "Embedded"],
  },
  {
    title: { zh: "Markdown 速记板", en: "Markdown Quick Notes" },
    desc: {
      zh: "计划制作的浏览器 Markdown 笔记工具，目标是本地保存并支持导出。",
      en: "A planned in-browser Markdown notepad intended to be local-first and exportable.",
    },
    url: "https://github.com/magicbude",
    icon: "pen",
    featured: false,
    linkType: "profile",
    status: "idea",
    tags: ["Web", "PWA"],
  },
  {
    title: { zh: "像素天气", en: "Pixel Weather" },
    desc: {
      zh: "计划中的像素天气练习：尝试把天气数据表现为像素风动画。",
      en: "A planned exercise exploring weather data as pixel-art animation.",
    },
    url: "https://github.com/magicbude",
    icon: "sparkles",
    featured: false,
    linkType: "profile",
    status: "idea",
    tags: ["Fun"],
  },
];

// #endregion 项目数据
