# AGENTS.md

本文件给在本仓库工作的智能体（以及人类协作者）看的规则。动代码前先读 `docs/`。

## 项目是什么

个人网站（不是纯博客），公开定位为「个人数字基地」；数字花园是其中整理知识与想法的内容部分，同时承担多站 portal。
**主站零构建、纯静态**：原生 HTML / CSS / JS，无框架、无打包器、无外部 UI 运行时依赖、无 CDN。
可直接双击打开；本地预览用 `python -m http.server`（在仓库根目录启动）。
`tools/build.mjs` 是唯一例外，而且只在写 Markdown 文章时按需运行，不参与主站页面开发。

## 技术栈与约束

- 无框架、无打包器。CSS、JS、字体、图片与图标必须本地托管；允许经过评估的外部**数据 API**，禁止用 CDN 引入页面运行时代码。
- 外部数据能力必须渐进增强：失败时不影响核心内容；主动发送位置等隐私数据前必须由访客触发；前端禁止存 API 密钥；遵守来源署名、许可和调用限制。
- 视觉是「4 种可切换皮肤」：`<html data-style>` 切 `instrument / minimal / terminal / magazine`，
  配色全用 `var(--color-*)` 抽象变量（见 `assets/css/main.css`）。换皮肤 = 换变量，组件零改动。
  明暗嵌在皮肤里（instrument / terminal 暗，minimal / magazine 亮），不再单独做亮暗开关。
- 多语：`assets/js/core/i18n.js` 字典 + 元素上的 `data-i18n` 标记；语言存 `localStorage["site-lang"]`，
  首屏防闪白脚本在 CSS 加载前应用。加新语言只在 `i18n.js` 加一个语言包。
- 身份 / 导航不写死在 HTML：统一放 `assets/js/core/site.config.js`，页面运行时读取（改身份只动这一个文件）。
- 图标：内联 SVG，集中在 `assets/js/core/icons.js`；**禁止用 emoji 当功能图标、禁止外链图标库**。
- 博客：本地写 `content/posts/*.md`，跑 `node tools/build.mjs` 生成 `blog/<slug>/index.html` +
  刷新 `assets/js/data/posts.js` + 生成 `feed.xml`（产物也提交进仓库，保证 Pages 直接可用）。
- 构建器禁止扩展到首页、关于、项目、样式、公共脚本或整站模板；这些文件必须直接维护。

## 目录约定

- `docs/`：分类后的产品、设计与开发文档（必读 `development/architecture.md`）。**提交**。
- `assets/css/` `assets/js/`：样式、核心脚本与共享数据。**提交**。
- `blog/`：列表页与文章详情页（详情为构建产物，提交）。`content/posts/`：Markdown 源（提交）。
- `.internal/`：本地草稿 / 笔记 / 对话记录，**gitignore 不提交**，需要时取出即用。
- `index.html` = 网站首页；不再保留 `home/` 兼容目录。
- `.github/workflows/`：当前仅保留占位；部署方式确认后再添加真实工作流。

## 编码规范（教材级，最重要）

owner 会对照代码学前端，注释质量决定这个站对他的价值。

**通用**：
- 文件头说明「这个文件做什么 + 和哪些文件协同」。
- IDE 折叠注释：用 `#region XXX` / `#endregion` 标注大节，VS Code 等主流 IDE 原生支持，
  区段标题会出现在右侧「大纲 / 导航」面板（点击跳转、箭头折叠/展开）。区段标题用中文短语，简洁可定位。
  - JS：`// #region XXX` ... `// #endregion`
  - CSS：`/* #region XXX */` ... `/* #endregion */`
  - HTML：`<!-- #region XXX -->` ... `<!-- #endregion -->`
- 注释用**中文**；禁止无意义注释（如 `// 设置 x`、`/* 循环 */`、`<!-- 内容 -->`）。
- 命名：文件 / 目录小写连字符（`main.css`、`posts.js`）；CSS 语义 / BEM（`site-header`、`post-card__title`）；JS `camelCase`。

**HTML**：
- 文件头说明页面用途 + 协同文件 + 数据驱动机制
  （页面如何被 JS 注入头部/页脚、读哪些 `window.*` 变量、`data-i18n` 来自 `assets/js/core/i18n.js` 等）。
- 用 `#region` 标注主要区块（防闪白脚本 / 静态 Hero / 内容卡片网格 / 页脚占位 / 内联数据脚本）。
- 内联 `<script>` 与关键 `data-*` 属性解释「为什么」
  （如防闪白脚本为何要放 head、为何要先于 CSS、`data-style` 与 `localStorage["site-style"]` 的对应关系）。

**CSS**：
- 解释「为什么」（为何用 flex 而不是 grid、间距取值依据、换成别的值会怎样）。
- 用 `#region` 标注大节（设计令牌 / 字体 / 4 套皮肤令牌 / 响应式断点 / 通用组件 / 页面级样式）。

**JS**：
- 函数说明「做什么 + 为什么这么写」，复杂逻辑分段注释。
- 用 `#region` 标注大节（按文件职责切：常量与状态、初始化、工具函数、DOM 渲染、事件绑定）。

## 提交规范

- Conventional Commits：`type(scope): 中文简述`，必要时加 body。
  `type` ∈ `docs / feat / chore / refactor / fix / style …`；`scope` 小括号标模块（如 `chore(css)`）。
- 每完成一组相关文件提交一次，不要攒一大堆再交。
- **多行 commit（标题 + 多段 body）的正确写法**（重要，踩过坑）：
  - 用 `git commit -m '标题' -m 'body 第一段' -m 'body 第二段'`（多个 `-m` 自动用空行分隔成段落）；
    或把完整 message 写到文件后用 `git commit -F <文件路径>`。
  - **禁止在 `git commit -m "..."` 的双引号里写 `\n`**：bash 双引号不会把 `\n` 解释成换行，
    会原样写进 message 变成字面量反斜杠-n，导致标题和正文挤成一行、GitHub 上显示为 `标题\n正文`。
  - 提交后用 `git log -1 --format=%B | cat -A` 自检：行尾是 `$`（真实换行）而非 `^@`/字面 `\n` 即正常。

## 智能体行为规范

- 一次性大改动前先和用户确认方向（参考 `docs/` 已定的架构，不要擅自跑偏）。
- 优先用原生工具读写文件；删除 / 移动文件前必须确认。
- 改动后本地预览验证（皮肤切换、语言切换、移动端菜单、响应式、博客列表/详情）。
- 关键决策写入 `.workbuddy/memory/YYYY-MM-DD.md`。
