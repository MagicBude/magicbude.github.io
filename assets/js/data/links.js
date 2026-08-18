/*
 * assets/js/data/links.js
 * ============================================================================
 * 友链与资源数据模块：为导航页和搜索页提供唯一的数据来源。
 *
 * 协作关系：
 *   - links/index.html 按 friends / resources 两组渲染链接卡片；
 *   - search/index.html 遍历这两组数据，将它们加入站内搜索索引。
 *
 * 数据与渲染分离后，新增链接只需要修改本文件，两个页面都会自动读取新内容。
 * 友链必须来自真实交换，不放示例域名；资源只保留仍适合当前站点工作流的入口。
 * ============================================================================
 */

// #region 更新时间与分类

window.LINKS_UPDATED = "2026-08-18";

window.LINK_CATEGORIES = {
  reference: { label: { zh: "网页参考", en: "Web reference" }, icon: "book" },
  compatibility: { label: { zh: "兼容性", en: "Compatibility" }, icon: "globe" },
  practice: { label: { zh: "实践指南", en: "Practical guidance" }, icon: "sparkles" },
  hosting: { label: { zh: "发布文档", en: "Publishing docs" }, icon: "github" },
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
 * resources 的 category 对应 LINK_CATEGORIES，用于显示资源类型而不做主观排名。
 */
window.LINKS = {
  friends: [],
  resources: [
    {
      name: "MDN Web Docs",
      url: "https://developer.mozilla.org/",
      category: "reference",
      note: { zh: "HTML、CSS、JavaScript 与 Web API 的开放网页技术文档。", en: "Documentation for HTML, CSS, JavaScript, Web APIs, and the open web platform." },
    },
    {
      name: "Can I use",
      url: "https://caniuse.com/",
      category: "compatibility",
      note: { zh: "查询网页功能在不同浏览器和版本中的支持情况。", en: "Support tables for web features across browsers and versions." },
    },
    {
      name: "web.dev",
      url: "https://web.dev/",
      category: "practice",
      note: { zh: "围绕性能、可访问性与跨浏览器体验的网页实践指南。", en: "Practical guidance for performance, accessibility, and cross-browser experiences." },
    },
    {
      name: "GitHub Pages Docs",
      url: "https://docs.github.com/pages/",
      category: "hosting",
      note: { zh: "本站当前静态发布方式的官方配置与维护文档。", en: "Official setup and maintenance documentation for this site's publishing method." },
    },
  ],
};

// #endregion 友链与资源数据
