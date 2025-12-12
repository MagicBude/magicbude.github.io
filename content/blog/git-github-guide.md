---
title: "Git 和 GitHub 完全使用指南"
date: 2025-12-12
weight: 2
description: "从入门到精通，掌握版本控制和协作开发的核心技能"
tags: ["Git", "GitHub", "版本控制"]
categories: ["技术教程"]
---

## 什么是 Git？

Git 是一个分布式版本控制系统，用于跟踪文件的变化历史。它允许多个开发者协作开发项目，同时保持代码的完整性和可追溯性。

## 什么是 GitHub？

GitHub 是一个基于 Git 的代码托管平台，提供了在线仓库、协作工具、CI/CD 等功能。它是全球最大的开源项目托管平台。

## Git 基础概念

### 仓库（Repository）
存储项目代码和历史记录的地方。分为本地仓库和远程仓库。

### 分支（Branch）
独立的开发线。主分支通常是 `main` 或 `master`，可以创建其他分支进行特性开发。

### 提交（Commit）
保存一次代码变化的快照，包含作者、时间和变化说明。

### 推送（Push）
将本地提交上传到远程仓库。

### 拉取（Pull）
从远程仓库下载最新代码到本地。

## Git 安装和配置

### 安装 Git

**Windows：**
```bash
# 使用 Chocolatey
choco install git

# 或从官网下载安装
# https://git-scm.com/
```

**macOS：**
```bash
# 使用 Homebrew
brew install git
```

**Linux：**
```bash
# Ubuntu/Debian
sudo apt-get install git

# CentOS/RHEL
sudo yum install git
```

### 配置用户信息

```bash
# 设置用户名
git config --global user.name "Your Name"

# 设置邮箱
git config --global user.email "your.email@example.com"

# 查看配置
git config --list
```

## 常用 Git 命令

### 初始化和克隆

```bash
# 初始化本地仓库
git init

# 克隆远程仓库
git clone https://github.com/username/repository.git
```

### 查看状态和历史

```bash
# 查看工作区状态
git status

# 查看提交历史
git log

# 查看简洁的提交历史
git log --oneline

# 查看具体改动
git diff
```

### 添加和提交

```bash
# 添加文件到暂存区
git add filename

# 添加所有改动
git add .

# 提交改动
git commit -m "commit message"

# 一步提交（仅限已跟踪的文件）
git commit -am "commit message"
```

### 分支操作

```bash
# 查看本地分支
git branch

# 查看所有分支
git branch -a

# 创建新分支
git branch branch-name

# 切换分支
git checkout branch-name

# 创建并切换分支
git checkout -b branch-name

# 删除分支
git branch -d branch-name

# 合并分支
git merge branch-name
```

### 推送和拉取

```bash
# 推送到远程仓库
git push origin branch-name

# 拉取远程更新
git pull origin branch-name

# 获取远程更新（不合并）
git fetch origin
```

### 撤销操作

```bash
# 撤销工作区改动
git checkout -- filename

# 撤销暂存区改动
git reset HEAD filename

# 撤销最后一次提交
git reset --soft HEAD~1

# 强制撤销（谨慎使用）
git reset --hard HEAD~1
```

## GitHub 工作流程

### 1. 创建仓库

- 登录 GitHub
- 点击 "New repository"
- 填写仓库名称和描述
- 选择公开或私有
- 初始化 README 文件（可选）

### 2. 克隆到本地

```bash
git clone https://github.com/username/repository.git
cd repository
```

### 3. 创建特性分支

```bash
git checkout -b feature/new-feature
```

### 4. 进行开发

编辑文件，进行开发工作。

### 5. 提交改动

```bash
git add .
git commit -m "feat: 添加新功能"
```

### 6. 推送到 GitHub

```bash
git push origin feature/new-feature
```

### 7. 创建 Pull Request

- 在 GitHub 上打开仓库
- 点击 "Pull requests" 标签
- 点击 "New pull request"
- 选择要合并的分支
- 填写 PR 描述
- 点击 "Create pull request"

### 8. 代码审查和合并

- 团队成员审查代码
- 讨论和改进
- 合并到主分支

## 最佳实践

### 1. 提交信息规范

```bash
# 格式：<type>(<scope>): <subject>
# 例如：
git commit -m "feat(auth): 添加登录功能"
git commit -m "fix(bug): 修复用户列表显示错误"
git commit -m "docs(readme): 更新安装说明"
```

**常见类型：**
- `feat` - 新功能
- `fix` - 修复 bug
- `docs` - 文档
- `style` - 代码风格
- `refactor` - 重构
- `perf` - 性能优化
- `test` - 测试

### 2. 分支命名规范

```bash
# 特性分支
feature/user-authentication

# 修复分支
fix/login-bug

# 文档分支
docs/api-documentation
```

### 3. 定期同步主分支

```bash
# 切换到主分支
git checkout main

# 拉取最新更新
git pull origin main

# 切换回特性分支
git checkout feature/my-feature

# 合并主分支
git merge main
```

### 4. 避免直接在 main 分支上工作

- 始终在特性分支上开发
- 通过 Pull Request 合并代码
- 这样可以进行代码审查和测试

### 5. 定期清理分支

```bash
# 删除已合并的本地分支
git branch -d branch-name

# 删除远程分支
git push origin --delete branch-name
```

## 常见问题

### Q: 如何撤销已推送的提交？

A: 使用 `git revert` 创建一个新提交来撤销改动：

```bash
git revert commit-hash
git push origin branch-name
```

### Q: 如何修改最后一次提交信息？

A: 使用 `git commit --amend`：

```bash
git commit --amend -m "new message"
git push origin branch-name --force-with-lease
```

### Q: 如何解决合并冲突？

A: 
1. 打开冲突文件
2. 查找 `<<<<<<<`、`=======`、`>>>>>>>` 标记
3. 手动编辑，保留需要的代码
4. 删除冲突标记
5. 提交合并

```bash
git add .
git commit -m "Resolve merge conflict"
```

### Q: 如何查看某个文件的修改历史？

A:
```bash
# 查看文件的提交历史
git log -- filename

# 查看文件的具体改动
git log -p -- filename

# 查看某行代码的修改者
git blame filename
```

## 总结

Git 和 GitHub 是现代开发的必备技能。通过掌握基本命令和工作流程，你可以：

- 有效地管理代码版本
- 与团队协作开发
- 追踪代码变化历史
- 进行代码审查和质量控制

记住这些要点：
- 经常提交，提交信息要清晰
- 使用分支进行特性开发
- 通过 Pull Request 进行代码审查
- 定期同步主分支
- 保持仓库的整洁

---

**相关资源：**
- [Git 官方文档](https://git-scm.com/doc)
- [GitHub 官方文档](https://docs.github.com/)
- [Git 交互式学习](https://learngitbranching.js.org/)
- [GitHub 技能](https://skills.github.com/)
