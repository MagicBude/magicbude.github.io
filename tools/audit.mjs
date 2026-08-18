/**
 * tools/audit.mjs
 * ============================================================================
 * 静态站发布前的只读质量检查，不修改任何文件，也不依赖第三方包。
 *
 * 它和公开 HTML、assets/js/、tools/build.mjs 协同，检查：
 *   1. 每页共有的语言、标题、描述、主内容与跳转链接；
 *   2. 重复 ID、图片替代文本、表单与按钮的可访问名称；
 *   3. HTML 中引用的本地文件是否真实存在；
 *   4. 浏览器脚本、工具脚本与 HTML 内联脚本能否通过语法解析。
 *
 * 正则不是完整 HTML 解析器，但本站 HTML 由自己维护、结构稳定，适合用这套零依赖
 * 检查尽早发现常见回归。键盘、缩放、皮肤和窄屏体验仍需人工走查。
 * ============================================================================
 */

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, extname, join, relative, resolve, sep } from "node:path";
import { spawnSync } from "node:child_process";
import vm from "node:vm";

// #region 常量与文件发现
const ROOT = resolve(import.meta.dirname, "..");
const SKIP_DIRS = new Set([".git", ".internal", ".workbuddy", "node_modules"]);
const failures = [];

function walk(directory, wantedExtensions) {
  return readdirSync(directory).flatMap((name) => {
    if (SKIP_DIRS.has(name)) return [];
    const fullPath = join(directory, name);
    if (statSync(fullPath).isDirectory()) return walk(fullPath, wantedExtensions);
    return wantedExtensions.has(extname(name)) ? [fullPath] : [];
  });
}

function displayPath(file) {
  return relative(ROOT, file).split(sep).join("/");
}

function fail(file, message) {
  failures.push(`${displayPath(file)}：${message}`);
}
// #endregion

// #region HTML 结构与静态引用
function attributesOf(tag) {
  const attributes = {};
  for (const match of tag.matchAll(/([:\w-]+)\s*=\s*("[^"]*"|'[^']*')/g)) {
    attributes[match[1].toLowerCase()] = match[2].slice(1, -1);
  }
  return attributes;
}

function stripMarkup(value) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function countMatches(source, pattern) {
  return [...source.matchAll(pattern)].length;
}

function resolveLocalReference(file, reference) {
  const clean = reference.split("#")[0].split("?")[0];
  if (!clean) return null;
  let target = clean.startsWith("/")
    ? resolve(ROOT, `.${decodeURIComponent(clean)}`)
    : resolve(dirname(file), decodeURIComponent(clean));
  if (existsSync(target) && statSync(target).isDirectory()) target = join(target, "index.html");
  return target;
}

function checkHtml(file) {
  const source = readFileSync(file, "utf8");
  // 内联脚本里常有用于拼接 DOM 的 HTML 字符串；结构检查必须排除这些字符串，
  // 否则会把尚未渲染的模板误当成页面标签，同时仍保留 script 标签本身供引用检查。
  const markup = source
    .replace(/<script\b([^>]*)>[\s\S]*?<\/script>/gi, "<script$1></script>")
    .replace(/<!--[\s\S]*?-->/g, "");
  const ids = [...markup.matchAll(/\bid\s*=\s*["']([^"']+)["']/gi)].map((match) => match[1]);
  const duplicates = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];

  if (!/<html\b[^>]*\blang=["'][^"']+["']/i.test(markup)) fail(file, "缺少 html lang");
  if (!/<meta\b[^>]*\bname=["']viewport["']/i.test(markup)) fail(file, "缺少 viewport meta");
  if (!/<title>[^<]+<\/title>/i.test(markup)) fail(file, "缺少非空 title");
  if (!/<meta\b[^>]*\bname=["']description["'][^>]*\bcontent=["'][^"']+["']/i.test(markup)) fail(file, "缺少非空 description");
  if (countMatches(markup, /<h1\b/gi) !== 1) fail(file, "必须且只能有一个 h1");
  if (countMatches(markup, /<main\b[^>]*\bid=["']main["']/gi) !== 1) fail(file, "必须且只能有一个 main#main");
  if (!/<a\b[^>]*\bclass=["'][^"']*skip-link[^"']*["'][^>]*\bhref=["']#main["']/i.test(markup)) fail(file, "缺少指向 #main 的跳转链接");
  if (duplicates.length) fail(file, `存在重复 ID：${duplicates.join(", ")}`);

  for (const match of markup.matchAll(/<img\b[^>]*>/gi)) {
    if (!("alt" in attributesOf(match[0]))) fail(file, `图片缺少 alt：${match[0].slice(0, 90)}`);
  }

  for (const match of markup.matchAll(/<button\b[^>]*>([\s\S]*?)<\/button>/gi)) {
    const attrs = attributesOf(match[0].split(">")[0] + ">");
    const hasName = attrs["aria-label"] || attrs.title || attrs["data-i18n"] || stripMarkup(match[1]);
    if (!hasName) fail(file, "按钮缺少可访问名称");
    if (!attrs.type) fail(file, "按钮缺少显式 type");
  }

  for (const match of markup.matchAll(/<(?:input|select|textarea)\b[^>]*>/gi)) {
    const attrs = attributesOf(match[0]);
    if (attrs.type === "hidden") continue;
    const id = attrs.id;
    const labelled = attrs["aria-label"] || attrs["aria-labelledby"] ||
      (attrs["data-i18n-attr"] || "").includes("aria-label") ||
      (id && new RegExp(`<label\\b[^>]*\\bfor=["']${id}["']`, "i").test(markup));
    if (!labelled) fail(file, `表单控件缺少标签：${id || match[0].slice(0, 60)}`);
  }

  for (const match of markup.matchAll(/<(?:a|link|script|img|source)\b[^>]*>/gi)) {
    const attrs = attributesOf(match[0]);
    const reference = attrs.href || attrs.src;
    if (!reference || reference.startsWith("#") || /^(?:https?:|mailto:|tel:|data:|\/\/)/i.test(reference)) continue;
    if (/^javascript:/i.test(reference)) {
      fail(file, `禁止 javascript: 链接：${reference}`);
      continue;
    }
    const target = resolveLocalReference(file, reference);
    if (target && !existsSync(target)) fail(file, `静态引用不存在：${reference}`);
  }

  for (const match of markup.matchAll(/<a\b[^>]*\btarget=["']_blank["'][^>]*>/gi)) {
    const rel = attributesOf(match[0]).rel || "";
    if (!/\bnoopener\b/i.test(rel)) fail(file, "target=_blank 链接缺少 rel=noopener");
  }

  let inlineIndex = 0;
  for (const match of source.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    const attrs = attributesOf(`<script${match[1]}>`);
    if (attrs.src || attrs.type === "application/ld+json") continue;
    inlineIndex += 1;
    try {
      new vm.Script(match[2], { filename: `${displayPath(file)}#inline-${inlineIndex}` });
    } catch (error) {
      fail(file, `第 ${inlineIndex} 个内联脚本语法错误：${error.message}`);
    }
  }
}
// #endregion

// #region 独立 JavaScript 语法
function checkJavaScript(file) {
  const result = spawnSync(process.execPath, ["--check", file], { encoding: "utf8" });
  if (result.status !== 0) fail(file, `JavaScript 语法错误：${(result.stderr || result.stdout).trim()}`);
}
// #endregion

// #region 执行与汇总
const htmlFiles = walk(ROOT, new Set([".html"]));
const scriptFiles = walk(ROOT, new Set([".js", ".mjs"]));

htmlFiles.forEach(checkHtml);
scriptFiles.forEach(checkJavaScript);

if (failures.length) {
  console.error(`静态站审计失败，共 ${failures.length} 项：`);
  failures.forEach((message) => console.error(`- ${message}`));
  process.exitCode = 1;
} else {
  console.log(`静态站审计通过：${htmlFiles.length} 个 HTML 页面，${scriptFiles.length} 个 JavaScript 文件。`);
}
// #endregion
