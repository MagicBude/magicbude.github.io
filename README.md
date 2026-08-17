# magicbude.github.io

magicbude 的个人数字基地与原生前端学习项目，用于汇集项目、文章、近况、收藏和其他网站入口；数字花园是其中持续整理知识与想法的部分。

## 如何打开

直接双击根目录的 `index.html` 即可浏览完整首页。也可以在仓库根目录运行 `python -m http.server`，再访问浏览器显示的本地地址。

主站零构建：修改页面目录中的 `index.html`、`assets/css/main.css` 或 `assets/js/` 后，保存并刷新浏览器即可。

唯一按需运行的工具是 Markdown 博客转换器。只有新增或修改 `content/posts/*.md` 时才运行：

```powershell
node tools/build.mjs
```

它只更新 `blog/<slug>/index.html`、`assets/js/data/posts.js` 和 `feed.xml`，不会改写其他页面、公共样式、公共脚本或项目文档。

## 从哪里开始阅读

- `docs/README.md`：文档入口。
- `docs/development/architecture.md`：完整目录树，每个重要文件和文件夹均附有用途说明。
- `assets/js/core/`：站点配置、图标、国际化和公共交互。
- `assets/js/data/`：文章、项目、近况与友链的共享数据。
- `assets/css/main.css`：设计令牌、四套皮肤、组件和响应式规则。

## 项目原则

- 真实成果与规划构想明确区分，规划中的内容保留清晰状态。
- 浏览器端只使用原生 HTML、CSS、JavaScript 和本地资源。
- 页面源码保持教材级中文注释，重点解释原因、协作关系与失败边界。
- 支持中英文切换、键盘操作、移动端和减少动效偏好。
