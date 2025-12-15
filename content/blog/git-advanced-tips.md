---
title: "Git 进阶技巧和工作流"
date: 2025-12-15
weight: 7
description: "掌握 Git 的高级用法，包括分支管理、变基、樱桃选择等进阶技能"
tags: ["Git", "版本控制", "开发工作流"]
categories: ["技术教程"]
---

## 介绍

Git 基础知识很重要，但掌握进阶技巧能让你的开发工作流更高效。本文介绍一些实用的 Git 进阶技巧。

## 分支管理

### 创建和切换分支
```bash
# 创建新分支
git branch feature/new-feature

# 切换分支
git checkout feature/new-feature

# 创建并切换分支（简写）
git checkout -b feature/new-feature

# 或使用新语法
git switch -c feature/new-feature
```

### 删除分支
```bash
# 删除本地分支
git branch -d feature/new-feature

# 强制删除分支
git branch -D feature/new-feature

# 删除远程分支
git push origin --delete feature/new-feature
```

### 分支重命名
```bash
# 重命名当前分支
git branch -m new-name

# 重命名其他分支
git branch -m old-name new-name

# 推送重命名后的分支
git push origin new-name
git push origin --delete old-name
```

## 变基（Rebase）

变基是一种整理提交历史的强大工具。

### 基本变基
```bash
# 将当前分支变基到 main
git rebase main

# 交互式变基（最后 3 个提交）
git rebase -i HEAD~3
```

### 交互式变基的操作

在交互式变基中，你可以：
- `pick` - 使用提交
- `reword` - 使用提交，但修改提交信息
- `squash` - 使用提交，但将其合并到前一个提交
- `fixup` - 类似 squash，但丢弃提交信息
- `drop` - 删除提交

### 变基示例
```bash
# 合并最后 3 个提交
git rebase -i HEAD~3

# 在编辑器中将后两个 pick 改为 squash
# pick abc1234 First commit
# squash def5678 Second commit
# squash ghi9012 Third commit

# 保存并退出，编辑合并后的提交信息
```

## 樱桃选择（Cherry-pick）

从其他分支选择特定的提交应用到当前分支。

```bash
# 应用单个提交
git cherry-pick abc1234

# 应用多个提交
git cherry-pick abc1234 def5678 ghi9012

# 应用一个范围的提交
git cherry-pick abc1234..ghi9012

# 应用范围（包括起始提交）
git cherry-pick abc1234^..ghi9012
```

## 撤销更改

### 撤销工作区的更改
```bash
# 撤销单个文件的更改
git checkout -- file.txt

# 撤销所有更改
git checkout -- .

# 或使用新语法
git restore file.txt
```

### 撤销暂存区的更改
```bash
# 取消暂存单个文件
git reset HEAD file.txt

# 取消暂存所有文件
git reset HEAD

# 或使用新语法
git restore --staged file.txt
```

### 撤销已提交的更改
```bash
# 创建一个新提交来撤销之前的提交
git revert abc1234

# 修改最后一个提交（不改变历史）
git commit --amend

# 修改最后一个提交并修改提交信息
git commit --amend -m "New message"
```

## 查看历史

### 查看提交日志
```bash
# 查看简洁的日志
git log --oneline

# 查看图形化的分支历史
git log --graph --oneline --all

# 查看特定文件的历史
git log -- file.txt

# 查看某个作者的提交
git log --author="John Doe"

# 查看最近 N 个提交
git log -n 5
```

### 查看提交的详细信息
```bash
# 查看某个提交的详细信息
git show abc1234

# 查看某个提交的更改
git show abc1234 --stat
```

## 搜索和查找

### 搜索提交信息
```bash
# 搜索包含特定文本的提交
git log --grep="bug fix"

# 搜索包含特定代码的提交
git log -S "function_name"

# 搜索修改特定文件的提交
git log -- path/to/file.txt
```

### 查找引入 bug 的提交
```bash
# 使用 bisect 二分查找
git bisect start

# 标记当前提交为坏的
git bisect bad

# 标记某个提交为好的
git bisect good abc1234

# Git 会自动检出中间的提交，你可以测试
# 然后继续标记为好或坏
git bisect good  # 或 git bisect bad

# 完成后
git bisect reset
```

## 标签（Tags）

标签用于标记重要的版本。

```bash
# 创建轻量级标签
git tag v1.0.0

# 创建带注释的标签
git tag -a v1.0.0 -m "Version 1.0.0"

# 列出标签
git tag

# 查看标签信息
git show v1.0.0

# 推送标签到远程
git push origin v1.0.0

# 推送所有标签
git push origin --tags

# 删除本地标签
git tag -d v1.0.0

# 删除远程标签
git push origin --delete v1.0.0
```

## 存储（Stash）

临时保存未提交的更改。

```bash
# 保存当前更改
git stash

# 保存并添加描述
git stash save "description"

# 列出所有存储
git stash list

# 应用最新的存储
git stash apply

# 应用特定的存储
git stash apply stash@{0}

# 应用并删除存储
git stash pop

# 删除存储
git stash drop stash@{0}

# 删除所有存储
git stash clear
```

## 常见工作流

### 功能分支工作流
```bash
# 从 main 创建功能分支
git checkout -b feature/user-auth main

# 在功能分支上工作
git add .
git commit -m "Add user authentication"

# 推送到远程
git push origin feature/user-auth

# 创建 Pull Request，审查后合并
# 删除功能分支
git branch -d feature/user-auth
```

### 修复紧急 bug
```bash
# 从 main 创建修复分支
git checkout -b hotfix/critical-bug main

# 修复 bug
git add .
git commit -m "Fix critical bug"

# 推送并创建 Pull Request
git push origin hotfix/critical-bug

# 合并后，同步到开发分支
git checkout develop
git pull origin develop
git merge main
```

## 总结

掌握这些 Git 进阶技巧能让你的版本控制工作更高效。关键是要理解每个命令的含义，并在实际项目中多加练习。
