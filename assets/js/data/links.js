/*
 * assets/js/data/links.js
 * ============================================================================
 * 友链与资源数据模块：为收藏页和搜索页提供唯一的数据来源。
 *
 * 协作关系：
 *   - links/index.html 按 friends / resources 两组渲染链接卡片；
 *   - search/index.html 遍历这两组数据，将它们加入站内搜索索引。
 *
 * 数据与渲染分离后，新增链接只需要修改本文件，两个页面都会自动读取新内容。
 * 这里同时承担跨设备收藏夹：常用网站和工具都集中维护，搜索页也会自动收录。
 * ============================================================================
 */

// #region 更新时间与分类

window.LINKS_UPDATED = "2026-08-18";

window.LINK_CATEGORIES = {
  web: { label: { zh: "网页参考", en: "Web references" }, icon: "book" },
  dev: { label: { zh: "开发工具", en: "Development" }, icon: "code" },
  browser: { label: { zh: "浏览器", en: "Browsers" }, icon: "globe" },
  writing: { label: { zh: "知识与写作", en: "Knowledge & writing" }, icon: "pen" },
  system: { label: { zh: "系统工具", en: "System tools" }, icon: "tool" },
};

// #endregion 更新时间与分类

// #region 友链与资源数据

/*
 * 每一项包含：
 *   name  显示名称；
 *   url   目标地址；
 *   note  按语言代码保存的简短说明。
 *
 * friends 只保存已经确认的真实友链；空数组由页面渲染成诚实的邀请区。
 * resources 的 category 对应 LINK_CATEGORIES；kind 可标记 link / tool，供搜索页分组。
 */
window.LINKS = {
  friends: [],
  resources: [
    {
      name: "MDN Web Docs",
      url: "https://developer.mozilla.org/",
      category: "web",
      kind: "link",
      note: { zh: "HTML、CSS、JavaScript 与 Web API 的开放网页技术文档。", en: "Documentation for HTML, CSS, JavaScript, Web APIs, and the open web platform." },
    },
    {
      name: "Can I use",
      url: "https://caniuse.com/",
      category: "web",
      kind: "link",
      note: { zh: "查询网页功能在不同浏览器和版本中的支持情况。", en: "Support tables for web features across browsers and versions." },
    },
    {
      name: "web.dev",
      url: "https://web.dev/",
      category: "web",
      kind: "link",
      note: { zh: "围绕性能、可访问性与跨浏览器体验的网页实践指南。", en: "Practical guidance for performance, accessibility, and cross-browser experiences." },
    },
    {
      name: "GitHub Pages Docs",
      url: "https://docs.github.com/pages/",
      category: "web",
      kind: "link",
      note: { zh: "本站当前静态发布方式的官方配置与维护文档。", en: "Official setup and maintenance documentation for this site's publishing method." },
    },
    { name: "VS Code", url: "https://code.visualstudio.com/", category: "dev", kind: "tool", note: { zh: "可扩展的代码编辑器。", en: "An extensible code editor." } },
    { name: "Git", url: "https://git-scm.com/", category: "dev", kind: "tool", note: { zh: "分布式版本控制系统。", en: "A distributed version control system." } },
    { name: "Keil MDK", url: "https://www.keil.arm.com/", category: "dev", kind: "tool", note: { zh: "面向 Arm 微控制器的开发工具。", en: "Development tools for Arm microcontrollers." } },
    { name: "STM32CubeMX", url: "https://www.st.com/en/development-tools/stm32cubemx.html", category: "dev", kind: "tool", note: { zh: "STM32 引脚、时钟与外设配置工具。", en: "Pin, clock, and peripheral configuration for STM32." } },
    { name: "WinMerge", url: "https://winmerge.org/", category: "dev", kind: "tool", note: { zh: "Windows 文件与目录比较工具。", en: "File and folder comparison for Windows." } },
    { name: "Chrome", url: "https://www.google.com/chrome/", category: "browser", kind: "tool", note: { zh: "基于 Chromium 的网页浏览器。", en: "A Chromium-based web browser." } },
    { name: "Firefox", url: "https://www.mozilla.org/firefox/", category: "browser", kind: "tool", note: { zh: "Mozilla 开发的开源浏览器。", en: "An open-source browser by Mozilla." } },
    { name: "Microsoft Edge", url: "https://www.microsoft.com/edge", category: "browser", kind: "tool", note: { zh: "与 Windows 集成的 Chromium 浏览器。", en: "A Chromium browser integrated with Windows." } },
    { name: "Obsidian", url: "https://obsidian.md/", category: "writing", kind: "tool", note: { zh: "本地 Markdown 笔记与知识库。", en: "Local Markdown notes and knowledge base." } },
    { name: "Typora", url: "https://typora.io/", category: "writing", kind: "tool", note: { zh: "所见即所得的 Markdown 编辑器。", en: "A what-you-see-is-what-you-mean Markdown editor." } },
    { name: "Notion", url: "https://www.notion.com/", category: "writing", kind: "tool", note: { zh: "结合文档、数据库和协作的工作空间。", en: "A workspace for documents, databases, and collaboration." } },
    { name: "Everything", url: "https://www.voidtools.com/", category: "system", kind: "tool", note: { zh: "快速索引和搜索 Windows 文件名。", en: "Fast filename indexing and search for Windows." } },
    { name: "Geek Uninstaller", url: "https://geekuninstaller.com/", category: "system", kind: "tool", note: { zh: "轻量的 Windows 软件卸载工具。", en: "A lightweight Windows application uninstaller." } },
    { name: "Quicker", url: "https://getquicker.net/", category: "system", kind: "tool", note: { zh: "通过动作面板组合和自动化常用操作。", en: "Combines and automates frequent actions through panels." } },
  ],
};

// #endregion 友链与资源数据
