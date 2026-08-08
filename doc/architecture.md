# 架构与目录结构

> 本文定义站点的**物理结构**与**构建顺序**。新增文件先对照目录树，别随手建目录。
> 顺序照「实施顺序」走，别跳步。

---

## 目录结构（目标态）

```
magicbude.github.io/
├── AGENTS.md               # 智能体/协作者规则（零构建、编码规范、提交规范）
├── index.html              # 开屏页（极简封面）：名字 + slogan + 进入按钮 → home.html
├── home.html               # 首页（总枢纽）：简介 + 板块入口 + 全站最新动态
├── blog.html               # 博客列表（读 js/posts.js 渲染）
├── about.html              # 关于（中英双语，内容来自 site.config）
├── projects.html           # 项目：GitHub/Gitee、自建子站
├── uses.html               # 装备：我在用啥（可挂推广）
├── now.html                # 近况：当前在玩/看/搞啥
├── links.html              # 导航 / 友链 / 资源收藏
├── search.html             # 站内搜索（客户端过滤）
├── 404.html                # 404
├── css/
│   └── main.css            # 全站样式：4 风格令牌 + 组件（按 data-style 切换）
├── js/
│   ├── site.config.js      # 全站身份/导航唯一真源（名字/slogan/社交/导航项）
│   ├── main.js             # 全局脚本：皮肤选择器、语言切换、移动端菜单
│   ├── i18n.js             # 多语言字典 { zh, en, ... } + 应用函数
│   ├── icons.js            # 内联 SVG 图标
│   └── posts.js            # 博客文章数组（列表数据源，构建脚本生成）
├── blog/                   # 文章详情页（构建脚本生成，每篇 <slug>.html）
│   └── example.html
├── posts/                  # 博客 Markdown 源文件（你写的）
│   └── 2026-svg-charts.md
├── tools/
│   └── build.mjs           # 写作时构建：md → blog/<slug>.html + 刷新 posts.js + feed.xml
├── feed.xml                # RSS（构建脚本生成）
├── sitemap.xml             # 站点地图（手写/构建）
├── doc/                    # 项目文档
│   ├── README.md
│   ├── spec.md
│   └── architecture.md
├── .internal/              # 本地草稿 / 笔记（gitignore，不提交）
├── .github/
│   └── workflows/
│       └── deploy.yml      # 纯静态部署到 GitHub Pages
└── .gitignore
```

> `.internal/` 与 `.workbuddy/` 被 `.gitignore` 忽略；不使用 Jekyll，不需要 `.nojekyll`。
> `index.html` 是开屏页，`home.html` 才是真正首页（GitHub Pages 根目录必须是 index.html）。

---

## 文件状态表

| 文件 | 状态 |
|------|------|
| `doc/README.md` / `doc/spec.md` / `doc/architecture.md` | ✅ 已建（本步更新） |
| `css/main.css` | ✅ 已重构（4 皮肤令牌 + 皮肤/语言切换/开屏页样式） |
| `js/site.config.js` | ✅ 已建（身份/导航真源） |
| `js/main.js` | ✅ 已重构（皮肤选择器 + 语言切换 + 移动端菜单 + 头部/页脚渲染） |
| `js/i18n.js` | ✅ 已建（zh/en 字典 + 应用/toggle） |
| `js/icons.js` | ✅ 已建（内联 SVG 图标集） |
| `js/posts.js` | ⬜ 待生成（构建脚本产出） |
| `index.html` | ✅ 已建（开屏页：防闪白 + 皮肤/语言切换 + 进入按钮） |
| `home.html` | ✅ 已建（首页枢纽：Hero + 板块入口卡片 + 最新动态，含 data→DOM 内联脚本） |
| `about.html` | ✅ 已建（中英双语：Hero 读 config + .prose 自我介绍 + 板块卡片 + 社交胶囊；`window.renderAbout` 钩子） |
| `404.html` | ✅ 已建（中英双语：notfound 居中布局 + 快捷导航；`window.render404` 钩子） |
| `projects.html` | ✅ 已建（数据驱动卡片：状态徽章/标签/外链，挂 window.PROJECTS） |
| `uses.html` | ✅ 已建（按分类渲染卡片：window.USES，含外链） |
| `now.html` | ✅ 已建（按「在玩/在看/在搞」分类：window.NOW） |
| `links.html` | ✅ 已建（朋友站点+资源两类：window.LINKS） |
| `search.html` | ✅ 已建（实时过滤 页面/博客/项目/链接，类型徽章） |
| `blog.html` | ⬜ 待建（博客列表页，接 js/posts.js） |
| `posts/2026-svg-charts.md` | ⬜ 待建（示例文章源） |
| `blog/example.html` | ⬜ 待生成 |
| `tools/build.mjs` | ⬜ 待建 |
| `feed.xml` / `sitemap.xml` | ⬜ 待生成 |
| `.github/workflows/deploy.yml` | ⬜ 待建 |

---

## 数据流

```
posts/<slug>.md  ──tools/build.mjs──►  blog/<slug>.html  +  js/posts.js  +  feed.xml
                                        │                        │
                                        │                        ▼
                                        │                  blog.html（渲染列表）
                                        │                        │
                                        ▼                        ▼
                                  浏览器查看详情 ◄──── 点击卡片 ───┘

js/site.config.js ──► 头部 / 首页 Hero ──► 填名字/slogan/导航（改身份只动这一个文件）
js/i18n.js       ──► 带 data-i18n 的 UI ──► 按当前语言填字（localStorage 记忆）
```

要点：
- **列表数据驱动**（学 数据→DOM），**详情静态手写/生成**（学完整页面结构）。
- **UI 多语**靠字典 + `data-i18n`，**文章多语**靠 `lang` 字段 + 译文互链。
- **身份不写死**：名字 / slogan / 导航全在 `site.config.js`，页面运行时读取。

---

## 实施顺序（不要跳步）

1. **文档与骨架**（已完成）：`doc/` 三份 + `blog/`、`.github/workflows/`、`.internal/` 占位。
2. **锁定架构**（已完成）：spec / architecture 写入 4 风格、i18n、MD 博客、开屏页 + 8 页、site.config。
3. **基础重构**：`css/main.css` 加 4 风格令牌 + 皮肤/语言切换组件；`js/main.js` 重写；
   新建 `js/site.config.js`、`js/i18n.js`、`js/icons.js`。
4. **开屏页** `index.html`：极简封面，含防闪白内联脚本、皮肤/语言切换、「进入」按钮跳 `home.html`。
5. **首页枢纽** `home.html`（已完成）：读 `site.config.js` 填 Hero + 板块入口卡片 + 全站最新动态；
   语言切换钩子 `window.renderHome` 已接进 `js/main.js` 的 `bindLang`。
6. **关于 / 404** `about.html`、`404.html`（已完成）：中英双语；about 含 Hero + .prose 自我介绍 + 板块卡片 + 社交胶囊（`window.renderAbout`）；404 含 notfound 居中布局 + 快捷导航（`window.render404`）；两者均已接进 `js/main.js` 的 `bindLang` 语言切换钩子。
7. **其余静态页** `projects.html`、`uses.html`、`now.html`、`links.html`、`search.html`（已完成）：
   均为中英双语 + 数据驱动（window.PROJECTS / window.USES / window.NOW / window.LINKS）；
   search.html 实时过滤页面/博客/项目/链接；5 个页面的 `renderXxx` 均已接进 `js/main.js` 的 `bindLang` 语言切换钩子。
8. **博客体系**：`tools/build.mjs` + `posts/2026-svg-charts.md` → 跑脚本生成 `blog/example.html`
   + 刷新 `js/posts.js` + `feed.xml`；`blog.html` 接入。
9. **部署** `.github/workflows/deploy.yml`（纯静态 Pages）+ `sitemap.xml`。
10. **本地验证**：`python -m http.server` 预览，检查皮肤切换、语言切换、移动端导航、响应式、
    博客列表与详情渲染、开屏页跳转。

每完成一组相关文件，按 Conventional Commits 提交一次。
