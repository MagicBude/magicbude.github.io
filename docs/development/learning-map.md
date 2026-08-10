# 前端学习地图

本表把知识点映射到当前站点中的真实文件。它是学习路线，不要求一次实现所有能力。

| 领域 | 当前应用位置 |
|---|---|
| 语义化 HTML | 所有根目录页面、`blog/*.html` |
| CSS 级联与变量 | `assets/css/main.css` 四套皮肤令牌 |
| Flexbox / Grid | 导航、卡片、文章列表和响应式布局 |
| 响应式设计 | 移动菜单、流式字号、自动换列网格 |
| 可访问性 | 跳转链接、焦点、ARIA 状态、减少动效 |
| DOM 创建与更新 | `assets/js/core/main.js` 的头部和页脚渲染 |
| 事件监听 | 皮肤、语言、菜单、筛选和搜索 |
| 数据驱动界面 | `site.config.js`、`posts.js` 与页面数据数组 |
| 国际化 | `assets/js/core/i18n.js` 与 `data-i18n` |
| Web Storage | 皮肤和语言偏好 |
| SVG | `assets/js/core/icons.js` 的本地图标系统 |
| 客户端搜索 | `search/index.html` 的索引归一和过滤 |
| Markdown 解析 | `tools/build.mjs`，仅博客写作时使用 |
| RSS | `feed.xml` 与博客构建器 |
| Web 安全 | 文本转义、URL 与 `noopener` |

## 学习一个功能时至少回答

- 它解决什么真实问题？
- 浏览器从哪些文件按什么顺序加载它？
- 为什么选择当前 HTML、CSS 或 JavaScript 写法？
- JavaScript、存储或某项 API 不可用时怎样降级？
- 可以从哪个小改动开始练习？
