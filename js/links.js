/*
 * js/links.js
 * ============================================================================
 * 友链与资源数据模块：为导航页和搜索页提供唯一的数据来源。
 *
 * 协作关系：
 *   - links.html 按 friends / resources 两组渲染链接卡片；
 *   - search.html 遍历这两组数据，将它们加入站内搜索索引。
 *
 * 数据与渲染分离后，新增链接只需要修改本文件，两个页面都会自动读取新内容。
 * ============================================================================
 */

// #region 友链与资源数据

/*
 * 每一项包含：
 *   name  显示名称；
 *   url   目标地址；
 *   note  按语言代码保存的简短说明。
 *
 * friends 中前两项是为未来交换友链保留的内容占位，获得真实资料后直接替换即可。
 */
window.LINKS = {
  friends: [
    {
      name: "好友 A 的博客",
      url: "https://example.com",
      note: { zh: "前端与生活的碎碎念。", en: "Front-end and life, in bits." },
    },
    {
      name: "好友 B 的工具箱",
      url: "https://example.com",
      note: { zh: "一堆实用小工具。", en: "A bunch of handy little tools." },
    },
  ],
  resources: [
    {
      name: "MDN Web Docs",
      url: "https://developer.mozilla.org",
      note: { zh: "前端查文档第一站。", en: "First stop for web docs." },
    },
    {
      name: "Can I use",
      url: "https://caniuse.com",
      note: { zh: "查浏览器兼容性。", en: "Browser compatibility at a glance." },
    },
    {
      name: "Hugo",
      url: "https://gohugo.io",
      note: { zh: "本站早期用的静态生成器（已弃）。", en: "The SSG this site started with (retired)." },
    },
  ],
};

// #endregion 友链与资源数据
