# 架构与目录结构

本文记录当前真实结构，不描述尚不存在的“目标态”。新增文件前先确认它属于哪一层。

## 目录结构

```text
magicbude.github.io/
├─ index.html              开屏入口，进入 home.html
├─ home.html               主站首页
├─ blog.html               博客列表
├─ projects.html           项目与规划
├─ now.html                近况
├─ uses.html               装备与软件
├─ links.html              友链与资源
├─ search.html             页面、文章、项目与链接搜索
├─ about.html              关于
├─ 404.html                静态错误页
├─ css/main.css            四套皮肤、组件与响应式样式
├─ js/
│  ├─ site.config.js       身份、导航、社交链接与皮肤注册
│  ├─ icons.js             本地 SVG 图标
│  ├─ i18n.js              中英文字典与语言切换
│  ├─ posts.js             构建器生成的文章列表数据
│  ├─ projects.js          项目页与搜索页共享的数据
│  ├─ links.js             导航页与搜索页共享的数据
│  └─ main.js              公共头部、页脚和全站交互
├─ posts/                  Markdown 文章源
├─ blog/                   生成后的静态文章详情
├─ tools/build.mjs         仅用于 Markdown 博客转换
├─ feed.xml                博客构建器生成的 RSS
├─ sitemap.xml             手工维护的公开页面清单
├─ robots.txt              搜索引擎访问规则
├─ doc/                    架构和设计硬标准
└─ docs/                   愿景、需求、可访问性与学习规范
```

## 两条互不混淆的维护路径

### 普通主站开发

直接编辑根目录 HTML、`css/main.css` 或 `js/*.js`，保存并刷新浏览器。不运行构建器。

### Markdown 文章写作

```text
posts/<slug>.md
       │
       └─ node tools/build.mjs
              ├─ blog/<slug>.html
              ├─ js/posts.js
              └─ feed.xml
```

构建器的写入范围只能是上面三个目标。它不得生成或覆盖首页、项目页、关于页、
公共 CSS、公共 JavaScript 和文档。

## 浏览器脚本顺序

普通页面按照以下顺序加载：

```text
site.config.js → icons.js → i18n.js → 页面数据（若有）→ main.js → 页面内联逻辑
```

这些脚本使用 `window.*` 明确共享少量数据，以保证 `file://` 双击浏览仍然可用。
顺序不能随意交换：`main.js` 在启动时会读取前三个文件提供的配置、图标和翻译函数。

## 当前状态

- 根目录全部静态页面已经存在并可直接打开。
- 四套皮肤、中英文、移动菜单、博客列表和客户端搜索已经实现。
- `posts/2026-svg-charts.md` 已生成对应文章详情、列表数据与 RSS。
- `sitemap.xml` 与 `robots.txt` 已建立，新增公开页面时需要同步维护站点地图。
- `.github/workflows/` 当前只有占位文件；是否改用 Actions 部署应另行确认。

## 内容数据位置

- 身份、简介、导航和社交链接：`js/site.config.js`。
- 文章列表：`js/posts.js`，不要手改，修改 Markdown 后重新生成。
- 项目与友链：分别位于 `js/projects.js`、`js/links.js`，供内容页和搜索页共享。
- 近况与装备：暂时位于各自 HTML 的内联数据数组。
- UI 翻译：`js/i18n.js`。

只有相同数据确实需要被多个页面共同读取时，才把它提取成独立 JS 文件；
项目与友链正是这种情况，其他页面仍保持简单的内联数据结构。
