# magicbude.github.io

用 Hugo 构建的个人网站 - 包含工具库、博客和作品集等

## 快速开始

### 本地开发

```bash
# 启动本地服务器（包括草稿文章）
hugo server -D

# 访问 http://localhost:1313
```

### Hugo 常用命令

```bash
# 启动本地服务器
hugo server                    # 启动服务器（默认端口 1313）
hugo server -D                 # 启动服务器，包括草稿文章
hugo server --disableFastRender # 禁用快速渲染模式（完整重建）

# 构建网站
hugo                           # 构建网站到 public/ 目录
hugo -D                        # 构建网站，包括草稿文章
hugo --minify                  # 构建并压缩输出文件

# 创建新文章
hugo new blog/article-name.md  # 在 content/blog/ 下创建新文章

# 停止服务器
# 在 PowerShell 中按 Ctrl+C
# 或执行：Get-Process hugo -ErrorAction SilentlyContinue | Stop-Process -Force
```

### 部署

网站自动部署到 GitHub Pages，通过 GitHub Actions 工作流。

手动部署：
```bash
# 构建网站
hugo

# 提交并推送到 GitHub
git add .
git commit -m "your commit message"
git push origin main
```

## 技术栈

- **静态网站生成器**：Hugo
- **主题**：PaperMod
- **部署**：GitHub Pages + GitHub Actions

## 项目结构

```
magicbude.github.io/
├── archetypes/       # Hugo 文章模板
├── assets/           # 需要处理的资源（CSS、JS、图片等）
├── content/          # 网站内容（Markdown 文件）
├── data/             # 数据文件（YAML、JSON、TOML）
├── i18n/             # 多语言翻译文件
├── layouts/          # 自定义页面模板
├── public/           # 构建输出目录（自动生成）
├── resources/        # Hugo 缓存目录（自动生成）
├── static/           # 静态资源（直接复制到网站根目录）
├── themes/           # Hugo 主题
│   └── PaperMod/     # 使用的 PaperMod 主题
├── hugo.yaml         # Hugo 配置文件
└── README.md         # 项目说明文档
```

## 文件夹详解

### 核心文件夹

| 文件夹 | 用途 | 说明 |
|--------|------|------|
| **content/** | 网站内容 | 存放所有 Markdown 文件，包括博客文章、页面等。子目录结构对应网站的 URL 结构 |
| **themes/** | 主题 | 存放 Hugo 主题。当前使用 PaperMod 主题，提供网站的样式和功能 |
| **static/** | 静态资源 | 存放图片、图标、favicon 等静态文件，构建时直接复制到网站根目录 |
| **hugo.yaml** | 配置文件 | Hugo 的主配置文件，包含网站基本设置、菜单、参数等 |

### 可选文件夹

| 文件夹 | 用途 | 当前状态 |
|--------|------|--------|
| **assets/** | 需要处理的资源 | 空 - PaperMod 主题已包含所有必需资源，无需自定义 |
| **data/** | 数据文件 | 空 - 可用于存放 YAML/JSON 数据，在模板中引用（目前不需要） |
| **i18n/** | 多语言翻译 | 空 - PaperMod 主题已内置多语言支持，无需自定义翻译 |
| **layouts/** | 自定义模板 | 空 - 使用主题默认模板，可在此覆盖主题模板 |
| **archetypes/** | 文章模板 | 空 - 可用于定义新文章的默认 front matter 结构 |

### 自动生成文件夹

| 文件夹 | 用途 | 说明 |
|--------|------|------|
| **public/** | 构建输出 | 运行 `hugo` 命令时自动生成，包含最终的静态网站文件 |
| **resources/** | 缓存目录 | Hugo 自动生成，存放处理过的资源缓存 |

## 常见操作

### 添加新文章
在 `content/blog/` 目录下创建新的 Markdown 文件，按照现有文章的 front matter 格式编写。

### 添加静态资源
将图片、图标等文件放在 `static/` 目录下对应的子目录（如 `static/images/`、`static/icons/`）。

### 自定义样式
在 `assets/css/` 目录下创建自定义 CSS 文件（需要创建该目录），或在 `layouts/` 中覆盖主题模板。
