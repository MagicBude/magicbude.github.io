/*
 * assets/js/data/uses.js
 * ============================================================================
 * 工作台与工具箱数据模块。uses/index.html 只负责把这些数据转换成 DOM，内容本身集中在这里维护。
 *
 * 为什么拆成独立文件：
 *   工作流与工具条目会长期调整。如果把几十条对象继续塞在 HTML 的内联脚本中，页面结构、
 *   内容数据和交互逻辑会混在一起。拆分后可以分别学习和维护“数据”“视图”“行为”。
 *
 * 数据边界：
 *   - window.USES_UPDATED：公开工作流最后一次人工核对的日期；
 *   - window.USES：从当前仓库可以确认的本站制作与发布流程；
 *   - window.TOOLBOX：值得回看的工具目录，不表示安装、购买或日常使用；
 *   - window.TOOL_CATEGORIES：工具分类的双语名称与本地图标名称。
 * ============================================================================
 */

// #region 已确认工作流

window.USES_UPDATED = "2026-08-18";

window.USES = [
  {
    key: "making",
    title: { zh: "页面制作", en: "Making pages" },
    icon: "code",
    items: [
      {
        name: { zh: "原生 HTML / CSS / JavaScript", en: "Plain HTML / CSS / JavaScript" },
        type: { zh: "页面运行时", en: "Page runtime" },
        note: {
          zh: "页面直接由浏览器运行，不使用框架、打包器或外部界面运行时。",
          en: "Pages run directly in the browser without a framework, bundler, or external UI runtime.",
        },
        url: "",
      },
      {
        name: { zh: "四套本地皮肤", en: "Four local skins" },
        type: { zh: "视觉系统", en: "Visual system" },
        note: {
          zh: "Instrument、Minimal、Terminal 与 Magazine 共用同一套组件，只替换设计变量。",
          en: "Instrument, Minimal, Terminal, and Magazine share components and swap only design tokens.",
        },
        url: "",
      },
    ],
  },
  {
    key: "content",
    title: { zh: "内容维护", en: "Maintaining content" },
    icon: "pen",
    items: [
      {
        name: { zh: "Markdown 文章源", en: "Markdown post sources" },
        type: { zh: "写作", en: "Writing" },
        note: {
          zh: "文章写在 content/posts/，正文与页面模板分开维护。",
          en: "Posts live in content/posts/, keeping article text separate from page templates.",
        },
        url: "",
      },
      {
        name: { zh: "按需文章构建器", en: "On-demand post builder" },
        type: { zh: "本地维护", en: "Local maintenance" },
        note: {
          zh: "Node.js 脚本只把 Markdown 转成文章页、索引和 RSS，不参与主站页面开发。",
          en: "A Node.js script turns Markdown into post pages, an index, and RSS without building the main site.",
        },
        url: "",
      },
    ],
  },
  {
    key: "shipping",
    title: { zh: "版本与发布", en: "Versioning and publishing" },
    icon: "github",
    items: [
      {
        name: "Git",
        type: { zh: "版本记录", en: "Version history" },
        note: {
          zh: "用提交记录保存每组相关改动，让网站演进过程可以追溯。",
          en: "Related changes are captured in commits so the site's evolution remains traceable.",
        },
        url: "https://git-scm.com/",
      },
      {
        name: "GitHub Pages",
        type: { zh: "静态发布", en: "Static publishing" },
        note: {
          zh: "从仓库根目录直接发布静态文件，不在云端安装依赖或执行整站构建。",
          en: "Static files publish directly from the repository root with no cloud install or site-wide build.",
        },
        url: "https://docs.github.com/pages/",
      },
    ],
  },
];

// #endregion 已确认工作流

// #region 工具分类

window.TOOL_CATEGORIES = {
  dev: { label: { zh: "开发工具", en: "Development" }, icon: "code" },
  browser: { label: { zh: "浏览器", en: "Browsers" }, icon: "globe" },
  writing: { label: { zh: "知识与写作", en: "Knowledge & writing" }, icon: "pen" },
  system: { label: { zh: "系统工具", en: "System" }, icon: "tool" },
};

// #endregion 工具分类

// #region 工具箱数据

/*
 * 工具条目字段：
 *   name      产品名称；
 *   category  TOOL_CATEGORIES 中的分类键，也是筛选条件；
 *   note      双语简述，说明工具的核心用途，不写容易过时的营销结论；
 *   url       产品官网或官方项目地址，避免第三方下载站。
 */
window.TOOLBOX = [
  { name: "VS Code", category: "dev", note: { zh: "可扩展的代码编辑器。", en: "An extensible code editor." }, url: "https://code.visualstudio.com/" },
  { name: "Git", category: "dev", note: { zh: "分布式版本控制系统。", en: "A distributed version control system." }, url: "https://git-scm.com/" },
  { name: "Keil MDK", category: "dev", note: { zh: "面向 Arm 微控制器的开发工具。", en: "Development tools for Arm microcontrollers." }, url: "https://www.keil.arm.com/" },
  { name: "STM32CubeMX", category: "dev", note: { zh: "STM32 引脚、时钟与外设配置工具。", en: "Pin, clock, and peripheral configuration for STM32." }, url: "https://www.st.com/en/development-tools/stm32cubemx.html" },
  { name: "WinMerge", category: "dev", note: { zh: "Windows 文件与目录比较工具。", en: "File and folder comparison for Windows." }, url: "https://winmerge.org/" },

  { name: "Chrome", category: "browser", note: { zh: "基于 Chromium 的网页浏览器。", en: "A Chromium-based web browser." }, url: "https://www.google.com/chrome/" },
  { name: "Firefox", category: "browser", note: { zh: "Mozilla 开发的开源浏览器。", en: "An open-source browser by Mozilla." }, url: "https://www.mozilla.org/firefox/" },
  { name: "Microsoft Edge", category: "browser", note: { zh: "与 Windows 集成的 Chromium 浏览器。", en: "A Chromium browser integrated with Windows." }, url: "https://www.microsoft.com/edge" },

  { name: "Obsidian", category: "writing", note: { zh: "本地 Markdown 笔记与知识库。", en: "Local Markdown notes and knowledge base." }, url: "https://obsidian.md/" },
  { name: "Typora", category: "writing", note: { zh: "所见即所得的 Markdown 编辑器。", en: "A what-you-see-is-what-you-mean Markdown editor." }, url: "https://typora.io/" },
  { name: "Notion", category: "writing", note: { zh: "结合文档、数据库和协作的工作空间。", en: "A workspace for documents, databases, and collaboration." }, url: "https://www.notion.com/" },

  { name: "Everything", category: "system", note: { zh: "快速索引和搜索 Windows 文件名。", en: "Fast filename indexing and search for Windows." }, url: "https://www.voidtools.com/" },
  { name: "Geek Uninstaller", category: "system", note: { zh: "轻量的 Windows 软件卸载工具。", en: "A lightweight Windows application uninstaller." }, url: "https://geekuninstaller.com/" },
  { name: "Quicker", category: "system", note: { zh: "通过动作面板组合和自动化常用操作。", en: "Combines and automates frequent actions through panels." }, url: "https://getquicker.net/" },
];

// #endregion 工具箱数据
