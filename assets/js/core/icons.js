/*
 * assets/js/core/icons.js
 * ============================================================================
 * 内联 SVG 图标集中管理。
 *
 * 为什么集中管理？
 *   每个图标都是一段 SVG。如果散落在各个 HTML / JS 里，想统一改尺寸、加 class、
 *   换风格会很痛苦。集中到一个 map，用 icon('name') 取出，谁要用谁调。
 *
 * 用法：
 *   icon('github')  → 返回一段 <svg ...>...</svg> 字符串
 *   图标默认带 class="icon"，尺寸由 css/main.css 里的 .icon 控制（18×18）。
 *
 * 约定：
 *   - 描边类图标（arrowRight / search / sun …）统一用 stroke="currentColor"，
 *     这样颜色随 CSS 变量 --color-* 走，换皮肤自动跟着变。
 *   - 品牌标（github / x）用 fill="currentColor"。
 *   - 禁止 emoji 当图标、禁止外链图标库。
 *
 * 加一个新图标：在 ICONS 里加一项即可，key 就是调用名（site.config.js 的 social.type 也用它）。
 * ============================================================================
 */

window.icon = (function () {
  "use strict";

  // #region 图标外壳（stroke / fill 辅助）
  // 描边类图标外壳：统一 viewBox / stroke / 圆角端点，只换内部路径。
  // stroke-linecap/linejoin=round 让线条末端和拐角变圆，更精致、不刺眼。
  function stroke(inner) {
    return (
      '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      inner +
      "</svg>"
    );
  }

  // 填充类图标外壳（品牌标用）。
  function fill(inner) {
    return (
      '<svg class="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
      inner +
      "</svg>"
    );
  }

  // #endregion 图标外壳
  // #region 图标集（ICONS）
  var ICONS = {
    // ---- 品牌标（fill）----
    // GitHub 猫标
    github: fill(
      '<path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17 4.7 18 5 18 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z"/>'
    ),
    // X（原 Twitter）标
    x: fill(
      '<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>'
    ),
    // Gitee：用「git 分支」图形近似（避免错误还原品牌标，又和 github 区分开）
    gitee: stroke(
      '<circle cx="6" cy="6" r="2.2"/><circle cx="6" cy="18" r="2.2"/><circle cx="18" cy="9" r="2.2"/>' +
      '<path d="M6 8.2v7.6M8.2 6h4a3.8 3.8 0 0 1 3.8 3.8v.4"/>'
    ),

    // ---- 通用 UI 图标（stroke）----
    mail: stroke('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'),
    rss: stroke('<path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/>'),
    arrowRight: stroke('<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>'),
    external: stroke('<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>'),
    search: stroke('<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>'),
    sun: stroke('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),
    moon: stroke('<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>'),
    home: stroke('<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9 21v-6h6v6"/>'),
    layout: stroke('<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>'),
    code: stroke('<path d="m8 6-6 6 6 6"/><path d="m16 6 6 6-6 6"/>'),
    gamepad: stroke('<rect x="2" y="6" width="20" height="12" rx="6"/><path d="M6 12h4M8 10v4"/><circle cx="15" cy="11" r="1"/><circle cx="18" cy="13" r="1"/>'),
    film: stroke('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4"/>'),
    book: stroke('<path d="M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2z"/><path d="M4 19a2 2 0 0 1 2-2h12"/>'),
    link: stroke('<path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/>'),
    globe: stroke('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/>'),
    heart: stroke('<path d="M12 20s-7-4.5-9.5-9C1 8 2.5 4.5 6 4.5c2 0 3.2 1.2 4 2.3.8-1.1 2-2.3 4-2.3 3.5 0 5 3.5 3.5 6.5C19 15.5 12 20 12 20z"/>'),
    map: stroke('<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/>'),
    tool: stroke('<path d="M14.5 6a3.5 3.5 0 0 0-4.9 4.3L4 16a2 2 0 0 0 3 3l5.7-5.6A3.5 3.5 0 0 0 18 9.5a3 3 0 0 1-3.5-3.5z"/>'),
    pen: stroke('<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>'),
    sparkles: stroke('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2 2M16 16l2 2M18 6l-2 2M8 16l-2 2"/>'),
    user: stroke('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),
  };

  // #endregion 图标集
  // #region 取用函数（icon）
  // 返回取图标函数：icon('name')。找不到返回空字符串，调用处不会报错。
  return function (name) {
    return ICONS[name] || "";
  };
  // #endregion 取用函数
})();
