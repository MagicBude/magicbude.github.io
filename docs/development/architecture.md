# 架构与目录结构

## 架构原则

主站是零构建的原生静态网站。页面、样式和脚本均直接维护；只有 Markdown 文章需要按需运行 `tools/build.mjs`。内容页面采用语义化目录，使 `/about/`、`/projects/` 等网址简洁，并允许每个栏目以后继续容纳子页面。

## 完整目录树

```text
magicbude.github.io/
├─ index.html                         # 开屏入口；GitHub Pages 根网址首先打开此文件
├─ 404.html                           # 找不到页面时展示的静态错误页
├─ home/                              # 主站首页路由目录，对应网址 /home/
│  └─ index.html                      # 首页内容；汇总项目、文章、近况和栏目入口
├─ about/                             # 关于栏目目录，对应网址 /about/
│  └─ index.html                      # 个人介绍、站点定位和联系方式
├─ projects/                          # 项目栏目目录，对应网址 /projects/
│  └─ index.html                      # 已完成项目与规划项目列表
├─ now/                               # 近况栏目目录，对应网址 /now/
│  └─ index.html                      # 当前关注、学习和制作中的事项
├─ uses/                              # 装备栏目目录，对应网址 /uses/
│  └─ index.html                      # 常用硬件、软件与服务
├─ links/                             # 导航栏目目录，对应网址 /links/
│  └─ index.html                      # 友链与资源收藏
├─ search/                            # 搜索栏目目录，对应网址 /search/
│  └─ index.html                      # 在浏览器中搜索页面、文章、项目和链接
├─ blog/                              # 博客公开页面目录，同时包含列表页和文章子路由
│  ├─ index.html                      # 博客列表与筛选页面，对应网址 /blog/
│  └─ <slug>/                         # 单篇文章的语义化路由目录
│     └─ index.html                   # 由 Markdown 生成的文章详情页，需要提交
├─ assets/                            # 浏览器直接加载的公共静态资源
│  ├─ css/                            # 全站样式文件分类
│  │  └─ main.css                     # 设计令牌、四套皮肤、组件、页面样式与响应式规则
│  ├─ js/                             # 全站 JavaScript，按职责继续分类
│  │  ├─ core/                        # 每个页面都会使用的站点核心逻辑
│  │  │  ├─ site.config.js            # 身份、导航、社交链接和皮肤清单的唯一数据源
│  │  │  ├─ icons.js                  # 集中维护可复用的内联 SVG 图标
│  │  │  ├─ i18n.js                   # 多语言字典、语言状态和 data-i18n 翻译逻辑
│  │  │  └─ main.js                   # 公共头部、页脚、路由解析、皮肤和移动菜单
│  │  └─ data/                        # 可被多个页面共享的内容数据
│  │     ├─ posts.js                  # 构建器生成的文章索引数据，请勿手改
│  │     ├─ projects.js               # 项目页、首页与搜索共用的项目数据
│  │     ├─ now.js                    # 近况页与首页共用的近况数据
│  │     ├─ links.js                  # 友链页与搜索共用的链接数据
│  │     └─ uses.js                   # 装备页与搜索共用的装备、工具箱及分类数据
│  ├─ icons/                          # favicon 和未来独立图标文件
│  │  └─ favicon.svg                  # 浏览器标签页和收藏夹使用的网站图标
│  └─ images/                         # 图片资源总目录，按使用场景继续分类
│     ├─ home/                        # 首页封面等页面级原创图片
│     │  └─ editorial-desk.png        # 代码、手作与兴趣共同构成的暖色编辑摄影
│     ├─ profile/                     # 头像、个人照片和身份相关图片
│     ├─ projects/                    # 项目封面、截图和演示图片
│     └─ posts/                       # 博客正文与文章封面图片
├─ content/                           # 人工编写、尚未转换为网页的内容源
│  └─ posts/                          # Markdown 文章源文件；写文章时主要编辑这里
│     └─ <slug>.md                    # 单篇文章源，文件名通常与文章路由一致
├─ tools/                             # 仅供本地维护使用的辅助工具，不在浏览器中运行
│  └─ build.mjs                       # 将 Markdown 转成文章 HTML、文章索引和 RSS
├─ docs/                              # 提交到仓库的项目文档，按文档类型分类
│  ├─ README.md                       # 文档总入口和分类导航
│  ├─ product/                        # 网站定位、目标和功能需求
│  ├─ design/                         # 视觉系统与可访问性规范
│  └─ development/                    # 架构、注释规范和学习资料
├─ .github/                           # GitHub 平台配置与未来自动化工作流
├─ .internal/                         # 不提交的草稿、历史备份和本地参考资料
├─ feed.xml                           # RSS 订阅文件，由博客构建器更新
├─ sitemap.xml                        # 搜索引擎使用的公开网址清单，手工维护
├─ robots.txt                         # 告诉搜索引擎允许抓取的范围和站点地图位置
├─ .nojekyll                          # 关闭 Jekyll，让 Pages 原样发布所有静态文件
├─ README.md                          # 面向访客和协作者的仓库快速说明
└─ AGENTS.md                          # 智能体与协作者必须遵守的仓库工作规范
```

空目录不能被 Git 记录，因此图片分类目录通过各自的 `.gitkeep` 占位；放入真实图片后可以删除对应占位文件。

## 页面路由为什么不用 `pages/`

如果使用 `pages/about/index.html`，公开网址会自然变成 `/pages/about/`。“pages”是源码分类概念，不是访客理解的网站栏目。把语义目录直接放在根目录，可以得到 `/about/`、`/projects/`，同时根目录仍然只保留两个必须直接访问的 HTML 文件：开屏入口和 404 页面。

## 两种开发流程

普通页面开发：直接编辑各栏目中的 `index.html`、`assets/css/main.css` 或 `assets/js/`，保存后刷新浏览器，不运行构建器。

文章写作流程：

```text
content/posts/<slug>.md
          │
          └─ node tools/build.mjs
                    ├─ blog/<slug>/index.html
                    ├─ assets/js/data/posts.js
                    └─ feed.xml
```

这三个产物都提交到仓库，所以 GitHub Pages 只负责发布静态文件，不需要在线安装依赖或执行构建。

## 部署方式

站点使用 GitHub Pages 的 `Deploy from a branch` 直接发布仓库根目录，不使用 Actions 构建工作流。根目录的 `.nojekyll` 会关闭 Jekyll 处理，确保现有 HTML、资源目录和生成产物按原路径提供。

## 路径解析规则

`assets/js/core/site.config.js` 中保存相对于站点根目录的明确文件路径，例如 `about/index.html`。这里不能只写 `about/`：Web 服务器通常会自动查找目录中的 `index.html`，但直接双击时的 `file://` 协议不会执行这项服务器行为，只会显示文件夹索引。

`assets/js/core/main.js` 根据自己的脚本地址确定站点根目录，再用 `URL` API 生成真实链接。这样同一份导航可以同时服务根页面、栏目页面和更深的文章页面，并兼容 HTTPS 部署与本地双击预览。GitHub Pages 仍会把这些文件发布在对应的语义化栏目目录中。
