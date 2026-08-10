/*
 * tools/build.mjs
 * ============================================================================
 * 博客构建脚本（仅在「写作时」手动运行，例如：`node tools/build.mjs`）。
 *
 * 它做三件事：
 *   1. 读 posts/*.md（你写的 Markdown 源）→ 解析 frontmatter + 正文
 *   2. 用内置的 Markdown→HTML 转换器，生成 blog/<slug>.html（完整静态详情页）
 *   3. 重新生成 js/posts.js（window.POSTS，供 blog.html / home.html 列表渲染）
 *      和 feed.xml（RSS 订阅源）
 *
 * 设计原则（和整个站一致）：零外部依赖、零运行时库。
 *   - 不引任何 npm 包，只用 Node 内置模块（fs / path）。
 *   - Markdown 转换器是手写的、可读的，目的之一就是让你看懂「MD 怎么变 HTML」，
 *     它本身也是一份教材。
 *
 * 产物都提交进仓库（blog/*.html、js/posts.js、feed.xml），
 * 保证 GitHub Pages 直接可用，不用在 CI 里跑构建。
 *
 * 依赖顺序：本文件用 ESM（.mjs），通过 import.meta.url 定位仓库根目录。
 * ============================================================================
 */

import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// 仓库根目录：本文件在 tools/ 下，上一级就是根。
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const POSTS_DIR = path.join(ROOT, "posts");
const BLOG_DIR = path.join(ROOT, "blog");
const JS_POSTS = path.join(ROOT, "js", "posts.js");
const FEED = path.join(ROOT, "feed.xml");

// 站点基础信息（用于 RSS 的绝对链接）。换域名时只改这里。
// 注意：详情页在 blog/ 子目录，页面内资源用相对路径 "../"，而 RSS 用的是绝对链接。
const SITE_BASE = "https://magicbude.github.io/";
const SITE_TITLE = "magicbude";
const SITE_DESC = "magicbude 的个人数字基地：汇集项目、文章、近况、工具、收藏与其他网站入口。";

// #region 文本转义（防止用户内容破坏 HTML / XML）
// 把 & < > " 转成实体。文章正文、标题、摘要都可能含这些字符，不转义会破坏页面或注入脚本。
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// XML（RSS）比 HTML 更严格，单引号也要转。
function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
// #endregion

// #region 行内格式（粗体 / 斜体 / 链接 / 图片 / 行内代码）
// 处理一段纯文本里的 Markdown 行内语法。顺序很关键：先抽出行内代码占位，
// 否则后面的粗体/斜体正则会误伤代码里的内容。
function inline(s) {
  // 1) 先整体转义，杜绝用户文本里的 <script> 之类。
  s = escapeHtml(s);

  // 2) 把行内代码 `code` 抽出来用占位符保护，最后再还原。
  const codes = [];
  s = s.replace(/`([^`]+)`/g, function (_m, c) {
    codes.push(c);
    return "{{CODE" + (codes.length - 1) + "}}";
  });

  // 3) 图片 ![alt](url) —— 必须在链接之前，否则会被当成链接处理。
  s = s.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, function (_m, alt, url) {
    return '<img src="' + url + '" alt="' + alt + '">';
  });

  // 4) 链接 [text](url)
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, function (_m, t, url) {
    return '<a href="' + url + '">' + t + "</a>";
  });

  // 5) 粗体 **x** 先于斜体，避免把 ** 里的 * 当成斜体。
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  // 6) 斜体 *x*
  s = s.replace(/\*([^*]+)\*/g, "<em>$1</em>");

  // 7) 还原行内代码（内容已经是转义后的，直接包 <code>）。
  s = s.replace(/{{CODE(\d+)}}/g, function (_m, i) {
    return "<code>" + codes[Number(i)] + "</code>";
  });

  return s;
}
// #endregion

// #region 块级转换（标题 / 段落 / 列表 / 引用 / 代码块 / 表格 / 分隔线）
// 把整篇 Markdown 正文转成 HTML 字符串，同时收集标题用于生成目录（TOC）。
// 返回值：{ html, toc }，toc 是 [{ level, text, id }]，id 用于锚点跳转。
function mdToHtml(src) {
  const lines = src.replace(/\r\n/g, "\n").split("\n");
  let html = "";
  let toc = [];
  let headingId = 0;
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // ---- 围栏代码块 ``` ----
    const fence = line.match(/^```(\w*)\s*$/);
    if (fence) {
      const buf = [];
      i++; // 跳过开头的 ```
      while (i < lines.length && !/^```\s*$/.test(lines[i])) {
        buf.push(lines[i]);
        i++;
      }
      i++; // 跳过结尾的 ```
      // 代码块整体转义，保留换行；用 <pre><code> 包裹。
      html += "<pre><code>" + escapeHtml(buf.join("\n")) + "</code></pre>";
      continue;
    }

    // ---- 空行 ----
    if (/^\s*$/.test(line)) { i++; continue; }

    // ---- 标题 # ~ ###### ----
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      const level = h[1].length;
      const text = h[2].trim();
      // 文章标题已由详情页的 post-header 从 frontmatter 渲染，
      // 正文里的 # 一级标题是重复的，直接跳过（既不输出也不进目录）。
      if (level === 1) { i++; continue; }
      headingId++;
      const id = "h-" + headingId;
      // 只收录 h2 / h3 进目录。
      if (level >= 2 && level <= 3) {
        toc.push({ level: level, text: text, id: id });
      }
      html += "<h" + level + ' id="' + id + '">' + inline(text) + "</h" + level + ">";
      i++;
      continue;
    }

    // ---- 分隔线 ----
    if (/^\s*([-*_])(\s*\1){2,}\s*$/.test(line)) {
      html += "<hr>";
      i++;
      continue;
    }

    // ---- 引用块 > ----
    if (/^\s*>\s?/.test(line)) {
      const buf = [];
      while (i < lines.length && /^\s*>\s?/.test(lines[i])) {
        buf.push(lines[i].replace(/^\s*>\s?/, ""));
        i++;
      }
      // 引用内部可能还有标题/段落，递归处理。
      html += "<blockquote>" + mdToHtml(buf.join("\n")).html + "</blockquote>";
      continue;
    }

    // ---- 表格（当前行含 |，且下一行是分隔行 ---|---）----
    if (
      line.includes("|") &&
      i + 1 < lines.length &&
      /^\s*\|?[\s:|-]+\|?\s*$/.test(lines[i + 1]) &&
      lines[i + 1].includes("-")
    ) {
      const splitRow = (r) =>
        r.replace(/^\s*\|/, "").replace(/\|\s*$/, "").split("|").map((c) => c.trim());
      const header = splitRow(line);
      i += 2; // 跳过表头与分隔行
      const rows = [];
      while (i < lines.length && lines[i].includes("|") && !/^\s*$/.test(lines[i])) {
        rows.push(splitRow(lines[i]));
        i++;
      }
      let t = "<table><thead><tr>" +
        header.map((c) => "<th>" + inline(c) + "</th>").join("") +
        "</tr></thead><tbody>";
      rows.forEach((r) => {
        t += "<tr>" + r.map((c) => "<td>" + inline(c) + "</td>").join("") + "</tr>";
      });
      t += "</tbody></table>";
      html += t;
      continue;
    }

    // ---- 列表（无序 - * + / 有序 1.）----
    if (/^\s*([-*+]|\d+\.)\s+/.test(line)) {
      const res = parseList(lines, i, getIndent(line));
      html += res.html;
      i = res.next;
      continue;
    }

    // ---- 段落：聚合到下一个空行或块级起点 ----
    const buf = [line];
    i++;
    while (
      i < lines.length &&
      !/^\s*$/.test(lines[i]) &&
      !/^(#{1,6})\s+/.test(lines[i]) &&
      !/^```/.test(lines[i]) &&
      !/^\s*>\s?/.test(lines[i]) &&
      !/^\s*([-*+]|\d+\.)\s+/.test(lines[i]) &&
      !/^\s*([-*_])(\s*\1){2,}\s*$/.test(lines[i])
    ) {
      buf.push(lines[i]);
      i++;
    }
    // 多行合并成一段，行内换行用空格连起来（标准 Markdown 行为）。
    html += "<p>" + inline(buf.join(" ")) + "</p>";
  }

  return { html: html, toc: toc };
}

// 取一行前面的缩进空格数，用于判断列表嵌套层级。
function getIndent(s) {
  const m = s.match(/^(\s*)/);
  return m ? m[1].length : 0;
}

// 判断一行是不是列表项（无序或有序）。
function isListItem(s) {
  return /^\s*([-*+]|\d+\.)\s+/.test(s);
}

// 递归解析列表，支持按缩进嵌套。返回 { html, next }。
function parseList(lines, start, indent) {
  const ordered = /^\s*\d+\.\s+/.test(lines[start]);
  let i = start;
  let out = ordered ? "<ol>" : "<ul>";

  while (i < lines.length) {
    const line = lines[i];

    // 空行：看后面还有没有同级的列表项，没有就结束整个列表。
    if (/^\s*$/.test(line)) {
      let j = i + 1;
      while (j < lines.length && /^\s*$/.test(lines[j])) j++;
      if (j >= lines.length || getIndent(lines[j]) < indent || !isListItem(lines[j])) break;
      i = j;
      continue;
    }

    // 缩进不对或非列表项 → 列表结束。
    if (getIndent(line) !== indent || !isListItem(line)) break;

    const content = line.replace(/^\s*([-*+]|\d+\.)\s+/, "");
    let li = "<li>" + inline(content);
    i++;

    // 下一项缩进更深且也是列表项 → 作为当前项的嵌套子列表。
    if (
      i < lines.length &&
      !/^\s*$/.test(lines[i]) &&
      getIndent(lines[i]) > indent &&
      isListItem(lines[i])
    ) {
      const sub = parseList(lines, i, getIndent(lines[i]));
      li += sub.html;
      i = sub.next;
    }
    li += "</li>";
    out += li;
  }

  out += ordered ? "</ol>" : "</ul>";
  return { html: out, next: i };
}
// #endregion

// #region frontmatter 解析
// 解析文件开头的 --- 包裹的 YAML 风格字段。支持普通键值与 [a, b] 数组（tags）。
function parseFrontmatter(raw) {
  const m = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
  if (!m) return { data: {}, body: raw };

  const fm = m[1];
  const body = raw.slice(m[0].length);
  const data = {};

  fm.split("\n").forEach(function (line) {
    const mm = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!mm) return;
    const key = mm[1].trim();
    let val = mm[2].trim().replace(/^["']|["']$/g, ""); // 去首尾引号
    if (/^\[.*\]$/.test(val)) {
      // 数组：拆逗号，再去每项首尾引号。
      data[key] = val
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    } else {
      data[key] = val;
    }
  });

  return { data: data, body: body };
}
// #endregion

// #region 详情页模板
// 详情页是「完整静态 HTML」：正文已经转好嵌进去了，不需要运行时再 fetch。
// 头部/页脚容器 + 四个脚本，和站内其他页面完全一致，保证导航/皮肤/语言同步。
// 注意相对路径前缀 REL = "../"（详情页在 blog/ 子目录）。

// 两个小图标的内联 SVG（与 js/icons.js 的 book / globe 同款路径，避免额外请求）。
function iconSvg(name) {
  const paths = {
    book: '<path d="M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2z"/><path d="M4 19a2 2 0 0 1 2-2h12"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/>',
  };
  return (
    '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    (paths[name] || "") +
    "</svg>"
  );
}

// 渲染目录（TOC）：h2 / h3 两级，用嵌套 <ul> 表达层级。
function renderToc(toc) {
  if (!toc.length) return "";
  let out = '<nav class="toc" aria-label="文章目录">' +
    '<p class="toc__title" data-i18n="blog.toc">目录</p><ul>';
  let cur = 2;
  toc.forEach(function (it) {
    while (cur < it.level) { out += "<ul>"; cur++; }
    while (cur > it.level) { out += "</ul>"; cur--; }
    out += '<li><a href="#' + it.id + '">' + escapeHtml(it.text) + "</a></li>";
  });
  while (cur > 2) { out += "</ul>"; cur--; }
  return out + "</ul></nav>";
}

// 渲染上一篇 / 下一篇 链接。older=更早（上一篇），newer=更新（下一篇）。
function navLink(post, dir, labelKey, fallback) {
  if (!post) return "";
  const cls = dir === "next" ? "post-nav__link post-nav__link--next" : "post-nav__link";
  return (
    '<a class="' + cls + '" href="../blog/' + post.slug + '.html">' +
    '<span class="post-nav__label" data-i18n="' + labelKey + '">' + fallback + "</span>" +
    '<span class="post-nav__title">' + escapeHtml(post.title) + "</span>" +
    "</a>"
  );
}

function renderDetail(post, bodyHtml, toc, older, newer) {
  const REL = "../";
  const langLabel = post.lang === "en" ? "English" : "中文";
  const tags = (post.tags || [])
    .map((t) => '<span class="tag">' + escapeHtml(t) + "</span>")
    .join(" ");

  const tocHtml = renderToc(toc);
  const navHtml =
    older || newer
      ? '<nav class="post-nav">' +
        navLink(older, "prev", "blog.prev", "上一篇") +
        navLink(newer, "next", "blog.next", "下一篇") +
        "</nav>"
      : "";

  return `<!DOCTYPE html>
<!--
  blog/${post.slug}.html - 文章详情页（由 tools/build.mjs 自动生成，请勿手改）
  作用：展示单篇博客文章（正文 / 目录 / 上一篇下一篇）。
  协同：js/site.config.js（头部 / 页脚）、js/i18n.js（界面多语）。
  数据驱动：文章正文是构建时由 Markdown 转换嵌入的静态 HTML，
            页面 chrome（导航 / 返回 / 目录 / 上下篇）走和站内其他页一致的脚本。
-->
<html lang="${post.lang}" data-style="instrument" data-scheme="dark">
<!-- #region 头部 head（meta / 防闪白脚本 / 样式） -->
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(post.title)} · ${SITE_TITLE}</title>
  <meta name="description" content="${escapeHtml(post.summary || post.title)}">

  <!-- 防闪白内联脚本：CSS 加载前先按 localStorage 设皮肤/语言（键名与 main.js / i18n.js 一致） -->
  <script>
    (function () {
      try {
        var s = localStorage.getItem("site-style") || "instrument";
        var l = localStorage.getItem("site-lang") || "zh";
        var scheme = (s === "instrument" || s === "terminal") ? "dark" : "light";
        var d = document.documentElement;
        d.setAttribute("data-style", s);
        d.setAttribute("data-scheme", scheme);
        d.setAttribute("lang", l);
      } catch (e) {}
    })();
  </script>

  <link rel="stylesheet" href="${REL}css/main.css">
  <link rel="icon" href="../favicon.svg" type="image/svg+xml">
</head>
<!-- #endregion -->
<body>
<!-- #region 页面骨架（导航 / 页脚容器 + 文章主体） -->
  <a class="skip-link" href="#main" data-i18n="common.skip">跳到主内容</a>

  <!-- 头部容器：js/main.js 根据 site.config.js 注入导航（数据驱动，不写死） -->
  <header id="site-header" class="site-header"></header>

  <main class="site-main" id="main">
    <article class="container container--narrow">
      <!-- 返回博客列表 -->
      <a class="post-back" href="${REL}blog.html" data-i18n="blog.back">返回博客</a>

      <!-- ============ 文章头部 ============ -->
      <header class="post-header">
        <h1 class="post-header__title">${escapeHtml(post.title)}</h1>
        <div class="post-meta">
          <span class="post-meta__item">${iconSvg("book")} <span data-i18n="blog.published">发布于</span> ${escapeHtml(post.date)}</span>
          <span class="post-meta__item">${iconSvg("globe")} ${langLabel}</span>
          ${(post.tags || []).length ? '<span class="post-meta__item">' + tags + "</span>" : ""}
        </div>
      </header>

      <!-- ============ 目录 ============ -->
      ${tocHtml}

      <!-- ============ 正文（Markdown 转换结果）============ -->
      <div class="prose">
${bodyHtml}
      </div>

      <!-- ============ 上一篇 / 下一篇 ============ -->
      ${navHtml}
    </article>
  </main>

  <!-- 页脚容器：js/main.js 注入（版权 + 社交链接） -->
  <footer id="site-footer" class="site-footer"></footer>

<!-- #endregion -->
<!-- #region 脚本（依赖加载） -->
  <!-- 脚本顺序：配置 → 图标 → 多语 → 主逻辑。详情页是静态内容，无需额外渲染脚本。 -->
  <script src="${REL}js/site.config.js"></script>
  <script src="${REL}js/icons.js"></script>
  <script src="${REL}js/i18n.js"></script>
  <script src="${REL}js/main.js"></script>
<!-- #endregion -->
</body>
</html>
`;
}
// #endregion

// #region 列表数据（js/posts.js）与 RSS（feed.xml）生成
// 生成 js/posts.js：window.POSTS 数组。home.html 与 blog.html 都读它渲染列表。
// 字段保持兼容：date(YYYY-MM-DD) / url / title / excerpt 是 home.html 已用的；
// 额外加 slug / lang / tags / summary / translation 供 blog.html 筛选与详情互链。
function renderPostsJs(list) {
  const items = list
    .map(function (p) {
      return (
        "  {\n" +
        '    slug: "' + p.slug + '",\n' +
        '    title: "' + escapeHtml(p.title).replace(/"/g, '\\"') + '",\n' +
        '    date: "' + p.date + '",\n' +
        '    lang: "' + p.lang + '",\n' +
        "    tags: " + JSON.stringify(p.tags) + ",\n" +
        '    summary: "' + escapeHtml(p.summary).replace(/"/g, '\\"') + '",\n' +
        '    excerpt: "' + escapeHtml(p.summary).replace(/"/g, '\\"') + '",\n' +
        '    url: "' + p.url + '",\n' +
        '    translation: ' + (p.translation ? '"' + p.translation + '"' : "null") + "\n" +
        "  }"
      );
    })
    .join(",\n");

  return (
    "// js/posts.js\n" +
    "// 由 tools/build.mjs 自动生成，请勿手改。\n" +
    "// 改文章请编辑 posts/*.md 后重跑 `node tools/build.mjs`。\n" +
    "// 字段供 home.html（最新动态）与 blog.html（列表 / 筛选）渲染使用。\n" +
    "window.POSTS = [\n" +
    items +
    "\n];\n"
  );
}

// 生成 feed.xml（RSS 2.0）。链接用绝对地址，方便订阅器直接抓取。
function renderFeed(posts) {
  const items = posts
    .map(function (p) {
      const link = SITE_BASE + "blog/" + p.slug + ".html";
      const pub = p.date
        ? new Date(p.date + "T00:00:00Z").toUTCString()
        : new Date().toUTCString();
      return (
        "    <item>\n" +
        "      <title>" + escapeXml(p.title) + "</title>\n" +
        "      <link>" + link + "</link>\n" +
        '      <guid isPermaLink="true">' + link + "</guid>\n" +
        "      <pubDate>" + pub + "</pubDate>\n" +
        "      <description>" + escapeXml(p.summary) + "</description>\n" +
        "    </item>"
      );
    })
    .join("\n");

  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<rss version="2.0">\n' +
    "  <channel>\n" +
    "    <title>" + SITE_TITLE + "</title>\n" +
    "    <link>" + SITE_BASE + "</link>\n" +
    "    <description>" + SITE_DESC + "</description>\n" +
    "    <language>zh-CN</language>\n" +
    "    <lastBuildDate>" + new Date().toUTCString() + "</lastBuildDate>\n" +
    "    <generator>magicbude static blog builder</generator>\n" +
    items + "\n" +
    "  </channel>\n" +
    "</rss>\n"
  );
}
// #endregion

// #region 主流程
function main() {
  if (!existsSync(POSTS_DIR)) {
    console.error("找不到 posts/ 目录，先去写一篇 Markdown 吧。");
    process.exit(1);
  }
  if (!existsSync(BLOG_DIR)) mkdirSync(BLOG_DIR, { recursive: true });

  // 1) 读取并解析所有 .md 源文件
  const files = readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
  if (!files.length) {
    console.error("posts/ 里没有任何 .md 文件。");
    process.exit(1);
  }

  const posts = files.map(function (f) {
    const raw = readFileSync(path.join(POSTS_DIR, f), "utf8");
    const parsed = parseFrontmatter(raw);
    const slug = parsed.data.slug || f.replace(/\.md$/, "");
    const converted = mdToHtml(parsed.body);
    return {
      slug: slug,
      title: parsed.data.title || slug,
      date: parsed.data.date || "",
      lang: parsed.data.lang || "zh",
      tags: parsed.data.tags || [],
      summary: parsed.data.summary || "",
      translation: parsed.data.translation || null,
      _html: converted.html,
      _toc: converted.toc,
    };
  });

  // 2) 按日期倒序排（ISO 字符串可直接比较）。排序后确定上一篇/下一篇。
  posts.sort(function (a, b) {
    if (a.date < b.date) return 1;
    if (a.date > b.date) return -1;
    return 0;
  });
  posts.forEach(function (p, i) {
    p.older = posts[i + 1] || null; // 更早发布 = 上一篇
    p.newer = posts[i - 1] || null; // 更新发布 = 下一篇
  });

  // 3) 生成每篇详情页
  posts.forEach(function (p) {
    const html = renderDetail(p, p._html, p._toc, p.older, p.newer);
    writeFileSync(path.join(BLOG_DIR, p.slug + ".html"), html, "utf8");
    console.log("  ✓ blog/" + p.slug + ".html");
  });

  // 4) 生成列表数据源 js/posts.js
  const list = posts.map(function (p) {
    return {
      slug: p.slug,
      title: p.title,
      date: p.date,
      lang: p.lang,
      tags: p.tags,
      summary: p.summary,
      url: "blog/" + p.slug + ".html",
      translation: p.translation,
    };
  });
  writeFileSync(JS_POSTS, renderPostsJs(list), "utf8");
  console.log("  ✓ js/posts.js (" + list.length + " 篇)");

  // 5) 生成 RSS
  writeFileSync(FEED, renderFeed(posts), "utf8");
  console.log("  ✓ feed.xml");

  console.log("\n完成。改文章后重新运行 `node tools/build.mjs` 即可。");
}

main();
// #endregion
