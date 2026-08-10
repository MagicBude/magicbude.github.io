/*
 * assets/js/data/uses.js
 * ============================================================================
 * 装备与工具箱数据模块。uses/index.html 只负责把这些数据转换成 DOM，内容本身集中在这里维护。
 *
 * 为什么拆成独立文件：
 *   装备与工具条目会长期增加。如果把几十条对象继续塞在 HTML 的内联脚本中，页面结构、
 *   内容数据和交互逻辑会混在一起。拆分后可以分别学习和维护“数据”“视图”“行为”。
 *
 * 数据边界：
 *   - window.USES：我实际使用或准备持续完善的装备清单；
 *   - window.TOOLBOX：值得收藏的工具目录，不表示每一项都是当前主力工具；
 *   - window.TOOL_CATEGORIES：工具分类的双语名称与本地图标名称。
 * ============================================================================
 */

// #region 装备数据

window.USES = [
  {
    title: { zh: "开发设备", en: "Development setup" },
    icon: "code",
    items: [
      {
        name: "ThinkPad X 系列",
        note: { zh: "主力笔记本，适合开发和日常移动使用。", en: "Primary laptop for development and daily mobile work." },
        url: "",
      },
      {
        name: "VS Code",
        note: { zh: "主力代码编辑器，扩展生态完整。", en: "Primary code editor with a broad extension ecosystem." },
        url: "https://code.visualstudio.com/",
      },
      {
        name: "Windows + WSL2",
        note: { zh: "在 Windows 桌面环境中使用 Linux 开发工具链。", en: "Linux development tools inside a Windows desktop workflow." },
        url: "https://learn.microsoft.com/windows/wsl/",
      },
    ],
  },
  {
    title: { zh: "硬件工具", en: "Hardware tools" },
    icon: "tool",
    items: [
      {
        name: "逻辑分析仪",
        note: { zh: "用于观察 UART、SPI 和 I²C 等数字通信信号。", en: "Used to inspect digital signals such as UART, SPI, and I²C." },
        url: "",
      },
      {
        name: "示波器",
        note: { zh: "观察模拟波形、时序和信号质量。", en: "For inspecting analog waveforms, timing, and signal quality." },
        url: "",
      },
      {
        name: "3D 打印机",
        note: { zh: "制作项目外壳、支架和快速原型。", en: "For project enclosures, brackets, and rapid prototypes." },
        url: "",
      },
    ],
  },
  {
    title: { zh: "知识与写作", en: "Knowledge and writing" },
    icon: "pen",
    items: [
      {
        name: "Obsidian",
        note: { zh: "本地优先的笔记与知识库。", en: "A local-first notes and knowledge base." },
        url: "https://obsidian.md/",
      },
      {
        name: "Typora",
        note: { zh: "专注 Markdown 写作与即时预览。", en: "Focused Markdown writing with immediate preview." },
        url: "https://typora.io/",
      },
    ],
  },
];

// #endregion 装备数据

// #region 工具分类

window.TOOL_CATEGORIES = {
  dev: { label: { zh: "开发工具", en: "Development" }, icon: "code" },
  browser: { label: { zh: "浏览器", en: "Browsers" }, icon: "globe" },
  productivity: { label: { zh: "生产力", en: "Productivity" }, icon: "pen" },
  system: { label: { zh: "系统工具", en: "System" }, icon: "tool" },
  other: { label: { zh: "其他", en: "Other" }, icon: "sparkles" },
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
  { name: "Windsurf", category: "dev", note: { zh: "带有 AI 辅助能力的代码编辑器。", en: "A code editor with AI-assisted workflows." }, url: "https://windsurf.com/" },
  { name: "Keil MDK", category: "dev", note: { zh: "面向 Arm 微控制器的嵌入式开发工具。", en: "Embedded development tools for Arm microcontrollers." }, url: "https://www.keil.arm.com/" },
  { name: "STM32CubeMX", category: "dev", note: { zh: "STM32 引脚、时钟与外设配置工具。", en: "Pin, clock, and peripheral configuration for STM32." }, url: "https://www.st.com/en/development-tools/stm32cubemx.html" },
  { name: "WinMerge", category: "dev", note: { zh: "Windows 上的文件与目录比较工具。", en: "File and folder comparison for Windows." }, url: "https://winmerge.org/" },

  { name: "Chrome", category: "browser", note: { zh: "基于 Chromium 的网页浏览器。", en: "A Chromium-based web browser." }, url: "https://www.google.com/chrome/" },
  { name: "Firefox", category: "browser", note: { zh: "由 Mozilla 开发的开源浏览器。", en: "An open-source browser developed by Mozilla." }, url: "https://www.mozilla.org/firefox/" },
  { name: "Microsoft Edge", category: "browser", note: { zh: "与 Windows 服务集成的 Chromium 浏览器。", en: "A Chromium browser integrated with Windows services." }, url: "https://www.microsoft.com/edge" },
  { name: "Opera", category: "browser", note: { zh: "提供多种内置功能的 Chromium 浏览器。", en: "A Chromium browser with a range of built-in features." }, url: "https://www.opera.com/" },
  { name: "Yandex Browser", category: "browser", note: { zh: "Yandex 推出的 Chromium 浏览器。", en: "A Chromium browser from Yandex." }, url: "https://browser.yandex.com/" },

  { name: "Typora", category: "productivity", note: { zh: "所见即所得的 Markdown 编辑器。", en: "A what-you-see-is-what-you-mean Markdown editor." }, url: "https://typora.io/" },
  { name: "Obsidian", category: "productivity", note: { zh: "本地 Markdown 笔记与知识库。", en: "A local Markdown notes and knowledge base app." }, url: "https://obsidian.md/" },
  { name: "Notion", category: "productivity", note: { zh: "集文档、数据库和协作于一体的工作空间。", en: "A workspace combining documents, databases, and collaboration." }, url: "https://www.notion.com/" },
  { name: "WPS Office", category: "productivity", note: { zh: "桌面与移动端办公套件。", en: "An office suite for desktop and mobile devices." }, url: "https://www.wps.com/" },
  { name: "LibreOffice", category: "productivity", note: { zh: "自由开源的桌面办公套件。", en: "A free and open-source desktop office suite." }, url: "https://www.libreoffice.org/" },

  { name: "Everything", category: "system", note: { zh: "快速索引和搜索 Windows 文件名。", en: "Fast filename indexing and search for Windows." }, url: "https://www.voidtools.com/" },
  { name: "Listary", category: "system", note: { zh: "文件搜索与快速启动工具。", en: "File search and quick-launch utilities." }, url: "https://www.listary.com/" },
  { name: "Dism++", category: "system", note: { zh: "Windows 系统维护与映像管理工具。", en: "Windows maintenance and image-management utilities." }, url: "https://github.com/Chuyu-Team/Dism-Multi-language" },
  { name: "Geek Uninstaller", category: "system", note: { zh: "轻量的 Windows 软件卸载工具。", en: "A lightweight application uninstaller for Windows." }, url: "https://geekuninstaller.com/" },
  { name: "Quicker", category: "system", note: { zh: "通过动作面板自动化常用操作。", en: "Automates frequent actions through configurable panels." }, url: "https://getquicker.net/" },

  { name: "Internet Download Manager", category: "other", note: { zh: "Windows 下载管理工具。", en: "A download manager for Windows." }, url: "https://www.internetdownloadmanager.com/" },
  { name: "格式工厂", category: "other", note: { zh: "多媒体文件格式转换工具。", en: "A multimedia file conversion utility." }, url: "http://www.pcfreetime.com/formatfactory/" },
  { name: "Clash", category: "other", note: { zh: "基于规则的网络代理核心；原项目已归档。", en: "A rule-based proxy core; the original project is archived." }, url: "https://github.com/Dreamacro/clash" },
  { name: "Proxifier", category: "other", note: { zh: "为不支持代理的应用转发网络连接。", en: "Routes connections from applications without native proxy support." }, url: "https://www.proxifier.com/" },
  { name: "Telegram", category: "other", note: { zh: "跨平台即时通讯应用。", en: "A cross-platform messaging application." }, url: "https://telegram.org/" },
];

// #endregion 工具箱数据
