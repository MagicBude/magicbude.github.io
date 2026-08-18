# 设计规范（spec）

本文是站点的**视觉与编码硬标准**。所有页面、样式、脚本必须遵守。
改视觉风格只需改 `assets/css/main.css` 里的令牌，组件样式不用动。

---

## 1. 视觉风格：4 种「皮肤」可运行时切换

不做"选一个定死"，而是做成**下拉切换器**，4 种风格随时换、存 `localStorage`。
机制：`<html data-style="...">` 切换 CSS 令牌；首屏内联脚本在 CSS 加载前就设好，避免闪白。

| `data-style` | 名称 | 底色 | 强调色 | 标题字体 | 明暗 |
|--------------|------|------|--------|----------|------|
| `instrument` | 工程仪器风 | 深灰 `#0d1117` | 蓝 `#4aa8ff` | 等宽 | 暗 |
| `minimal` | 浅色极简风 | 白 `#ffffff` | 蓝 `#0969da` | 无衬线 | 亮 |
| `terminal` | 终端黑客风 | 近黑 `#0a0e0a` | 绿 `#3fb950` | 等宽 | 暗 |
| `magazine` | 杂志编辑风（**默认**） | 暖白 `#faf8f5` | 琥珀 `#b45309` | 衬线 | 亮 |

**新增一种风格的成本**：复制 `assets/css/main.css` 里的一个 `[data-style="xxx"]` 块，改名字和值即可，
组件里用的全是 `var(--color-*)` 抽象变量，零改动。这就是把「颜色按用途命名」而非「按颜色命名」带来的好处。

> 4 种皮肤本身就覆盖明暗：instrument / terminal 偏暗，minimal / magazine 偏亮，
> 所以**不再单独做亮/暗开关**——换皮肤即换明暗。

代码高亮配色按明暗分两套，由 `data-scheme="dark|light"` 控制（内联脚本根据所选风格自动设）。

首页用杂志编辑风作为公开主视觉：暖白页面、琥珀强调、衬线大标题和原创编辑摄影共同建立稳定识别度。
其他三套皮肤仍可切换，用于展示同一组件系统在不同令牌下的表现。Hero 图片上的文字使用独立的
`--color-on-media` / `--color-on-media-muted` / `--color-media-overlay` 语义令牌，避免切换页面皮肤后失去对比度。

---

## 2. 设计令牌（CSS 变量，与 assets/css/main.css 严格一致）

颜色按**用途**命名（不是按颜色名），切换风格时含义不变、值变：

| 变量 | 含义 |
|------|------|
| `--color-bg` | 页面背景 |
| `--color-bg-subtle` | 次级背景：卡片、代码块 |
| `--color-bg-muted` | 三级背景：标签、悬停态 |
| `--color-text` | 正文 |
| `--color-text-muted` | 次要文字：日期、说明 |
| `--color-text-subtle` | 三级文字：占位符 |
| `--color-border` | 常规边框 |
| `--color-border-strong` | 强调边框：悬停、聚焦 |
| `--color-accent` | 主色：链接、按钮、强调 |
| `--color-accent-hover` | 主色悬停态 |
| `--color-accent-soft` | 主色极浅版，作背景（当前项高亮等） |
| `--font-heading` | 标题字体（随风格变：等宽 / 无衬线 / 衬线） |
| `--font-sans` / `--font-mono` | 正文 / 代码字体（系统字体栈，零下载） |
| `--shadow-sm` / `--shadow-md` | 阴影（暗色用更深黑色） |
| `--space-1..9` | 4px 基准间距阶梯 |
| `--radius-*` | 圆角 |
| `--width-content` / `--width-wide` / `--width-home` | 720px 正文 / 1100px 栏目 / 1320px 首页容器宽度 |
| `--text-*` | 流式字号（clamp） |

**规则**：组件里禁止硬编码颜色/字号，一律引用变量。想换主色只改一处。

---

## 3. 字体

- **正文 / UI**：`--font-sans` 系统字体栈（零加载、跨平台原生观感）。
- **代码**：`--font-mono` 系统等宽字体栈。
- **标题**：`--font-heading`，随风格切换（等宽 / 无衬线 / 衬线）。

---

## 4. 响应式断点

| 视口 | 布局 |
|------|------|
| `> 960px` | 宽屏：导航横排，卡片网格自动多列 |
| `≤ 960px` | 窄屏 / 平板：汉堡菜单、点击区 ≥44px、输入框字号 ≥16px |
| `≤ 480px` | 小屏：进一步压缩间距 |

断点按内容所需宽度确定，而不是绑定具体设备型号或导航项数量。视口宽度不超过 960px 时使用折叠导航，
避免文字挤压、控件重叠和横向滚动。卡片网格仍用 `repeat(auto-fill, minmax(280px,1fr))` 自动排布。

---

## 5. 编码与注释规范（教材级 · 最重要）

你对照代码学前端，注释质量决定这个站对你有没有用。**标准**：

- **文件头部**：说明「这个文件干什么 + 和哪些文件协同」。
- **CSS**：解释「为什么用 flex 而不是 grid」「这个 gap 取值依据」「换成别的值会怎样」。
- **JS**：函数要有「做什么 + 为什么这么写」，复杂逻辑分段注释。
- **HTML**：结构块用注释标边界，如 `<!-- 文章列表 start -->`。
- **禁止**无意义注释（`// 设置 x`、`/* 循环 */`）。
- 注释语言：**中文**。

---

## 6. 命名约定

- 文件 / 目录：全小写、连字符（`main.css`、`posts.js`、`index.html`）。
- CSS 类名：语义化 / BEM（`site-header`、`post-card`、`post-card__title`）。
- JS 变量 / 函数：`camelCase`。
- 图标：**内联 SVG**，集中在 `assets/js/core/icons.js` 或 HTML 内联；不用外链图标库、不用 emoji 当功能图标。

---

## 7. 国际化（i18n）：UI 字典切换，预留扩展

- 字典文件 `assets/js/core/i18n.js`：`{ zh: {...}, en: {...} }`，键为字符串 id。
- UI 元素加 `data-i18n="key"`，脚本读取当前语言填 `textContent`；`<html lang>` 同步更新。
- 语言切换按钮（头部），选择存 `localStorage`，内联脚本首屏应用，避免刷新闪变。
- **扩展新语言**：只在 `i18n.js` 加一个语言包（如 `ja: {...}`），UI 不动。
- 文章正文多语见第 9 节（每篇 md 带 `lang` 字段，可互链译文）。

---

## 8. 站点身份配置（不写死在 HTML 里）

定位是**个人数字基地**而不是单一博客；数字花园用于描述其中持续整理的知识与想法。身份随兴趣演进（编程 / 游戏 / 动漫 / 电影 / 羽毛球……），
未来还可能挂多个子站、做盈利。所以**名字、slogan、简介、社交链接、导航项**不硬编码进 HTML，
统一抽到 `assets/js/core/site.config.js`：

```js
// assets/js/core/site.config.js —— 全站身份与导航的唯一真源，改身份只动这一个文件
window.SITE_CONFIG = {
  name: "magicbude",
  tagline: { zh: "写代码，也打球", en: "Code, and play." },
  bio: { zh: "...", en: "..." },
  social: [ { type: "github", url: "https://github.com/..." }, /* ... */ ],
  nav: [ { key: "home", href: "index.html", i18n: "nav.home" }, /* blog/projects/links/about */ ],
};
```

页面头部 / 首页 Hero 在运行时读这个对象来填内容。加子站、改名字、加社交链接，
**只改 `site.config.js`**，所有页面自动同步。

---

## 9. 博客：本地写 .md，网页能看到

**写作时转换（零运行时依赖）**：你写 Markdown，跑一个仓库内的小脚本转成静态页。

- **源文件**：`content/posts/<slug>.md`，frontmatter 字段：
  - `title` 标题 · `date` 日期 · `lang` 语言(`zh`/`en`) · `tags` 标签数组
  - `summary` 摘要 · `slug` 网址段（默认取文件名）· `translation` 可选，互链的另一语言 slug
- **构建脚本** `tools/build.mjs`（Node，仅写作时运行）：
  1. 读 `content/posts/*.md` → 解析 frontmatter + 正文
  2. 用共享模板生成 `blog/<slug>/index.html`（含 header/footer + i18n 钩子 + 上一篇/下一篇 + TOC）
  3. 重新生成 `assets/js/data/posts.js`（文章数组，供 `blog/` 列表渲染）
  4. 重新生成 `feed.xml`（RSS）与 `sitemap.xml`（静态栏目和文章网址）
- **网页呈现**：`blog/index.html` 读 `assets/js/data/posts.js` 渲染列表（数据→DOM，可学）；点卡片进 `blog/<slug>/index.html` 详情（纯静态 HTML，可对照源码）。
- 脚本本身短小可读，也能当教材看「MD 怎么变 HTML」。

---

## 10. 页面清单（首页 + 6 内容页 + 功能）

| 页面 | 文件 | 说明 |
|------|------|------|
| 首页 | `index.html` | 总枢纽：原创封面 + 可编辑简介 + 各板块快捷入口 + 全站最新动态 |
| 博客列表 | `blog/index.html` | 读文章数据渲染，支持按语言/标签筛选 |
| 文章详情 | `blog/<slug>/index.html` | 构建脚本生成 |
| 项目 | `projects/index.html` | GitHub / Gitee 项目、自建子站链接 |
| 收藏 / 友链 | `links/index.html` | 跨设备保存网站、软件工具、参考资料与朋友站点 |
| 关于 | `about/index.html` | 通用自我介绍（中英双语，内容来自 site.config） |
| 404 | `404.html` | 找不到页面 |
| 搜索 | `search/index.html` | 客户端统一过滤页面、文章、项目、友链与资源 |
| RSS | `feed.xml` | 构建脚本生成（功能） |
| 站点地图 | `sitemap.xml` | 构建器生成静态栏目与文章网址（功能） |

> GitHub Pages 用户站根目录必须是 `index.html`，本站让根文件直接承载正式首页，减少一次无意义的“进入”操作。

---

## 11. 部署

- GitHub Pages 直接托管仓库中的静态文件，不运行整站构建。
- `.github/workflows/` 当前只有占位文件；若以后采用 Actions，必须先补充并审阅真实工作流。
- **注意**：`blog/<slug>/index.html`、`assets/js/data/posts.js`、`feed.xml` 是构建产物，提交进仓库（保证 Pages 直接可用），
  源 `.md` 也在仓库（`content/posts/`）。改文章 = 改 md → 跑脚本 → 提交生成的 HTML。
