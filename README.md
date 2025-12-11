# magicbude.github.io

用 Hugo 构建的个人网站 - 包含工具库、博客和作品集等

## 快速开始

### 本地开发

```bash
# 启动本地服务器
hugo server -D

# 访问 http://localhost:1313
```

### 部署

网站自动部署到 GitHub Pages，通过 GitHub Actions 工作流。

## 技术栈

- **静态网站生成器**：Hugo
- **主题**：PaperMod
- **部署**：GitHub Pages + GitHub Actions

## 项目结构

```
magicbude.github.io/
├── content/          # 网站内容（Markdown 文件）
├── themes/           # Hugo 主题
│   └── PaperMod/
├── static/           # 静态资源
├── hugo.yaml         # Hugo 配置
└── README.md
```
