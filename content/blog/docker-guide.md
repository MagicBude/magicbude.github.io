---
title: "Docker 容器化完全指南"
date: 2025-12-15
weight: 6
description: "从零开始学习 Docker，掌握容器化部署的核心技能"
tags: ["Docker", "容器化", "DevOps"]
categories: ["技术教程"]
---

## 什么是 Docker？

Docker 是一个开源的容器化平台，用于打包、分发和运行应用程序。它通过将应用程序及其依赖项打包到一个轻量级的容器中，确保应用在任何环境中都能一致地运行。

## Docker 的核心概念

### 镜像（Image）
镜像是一个轻量级的、独立的、可执行的软件包，包含运行应用所需的所有内容（代码、运行时、系统工具、库等）。

### 容器（Container）
容器是镜像的运行实例。可以把镜像看作是类，容器就是对象。

### 仓库（Repository）
存储镜像的地方。Docker Hub 是最大的公共镜像仓库。

### Dockerfile
用于定义如何构建镜像的文本文件。

## Docker 安装

### Windows 和 Mac
下载 Docker Desktop：https://www.docker.com/products/docker-desktop

### Linux（Ubuntu）
```bash
# 更新包管理器
sudo apt-get update

# 安装 Docker
sudo apt-get install docker.io

# 启动 Docker 服务
sudo systemctl start docker

# 验证安装
docker --version
```

## 基础命令

### 镜像操作
```bash
# 拉取镜像
docker pull ubuntu:latest

# 列出本地镜像
docker images

# 删除镜像
docker rmi image_id

# 搜索镜像
docker search nginx
```

### 容器操作
```bash
# 运行容器
docker run -d --name my-container ubuntu:latest

# 列出运行中的容器
docker ps

# 列出所有容器（包括已停止的）
docker ps -a

# 停止容器
docker stop container_id

# 启动容器
docker start container_id

# 删除容器
docker rm container_id

# 查看容器日志
docker logs container_id

# 进入容器
docker exec -it container_id /bin/bash
```

## 编写 Dockerfile

```dockerfile
# 使用基础镜像
FROM python:3.9-slim

# 设置工作目录
WORKDIR /app

# 复制文件
COPY . .

# 安装依赖
RUN pip install -r requirements.txt

# 暴露端口
EXPOSE 5000

# 运行应用
CMD ["python", "app.py"]
```

## 构建和运行镜像

```bash
# 构建镜像
docker build -t my-app:1.0 .

# 运行容器
docker run -d -p 5000:5000 --name my-app-container my-app:1.0

# 查看容器状态
docker ps

# 查看日志
docker logs my-app-container
```

## Docker Compose

Docker Compose 用于定义和运行多容器应用。

### docker-compose.yml 示例
```yaml
version: '3'
services:
  web:
    build: .
    ports:
      - "5000:5000"
    environment:
      - DATABASE_URL=postgres://db:5432/mydb
  db:
    image: postgres:13
    environment:
      - POSTGRES_DB=mydb
      - POSTGRES_PASSWORD=password
    volumes:
      - db_data:/var/lib/postgresql/data

volumes:
  db_data:
```

### 运行 Docker Compose
```bash
# 启动所有服务
docker-compose up -d

# 停止所有服务
docker-compose down

# 查看日志
docker-compose logs -f
```

## 最佳实践

1. **使用官方镜像** - 优先使用官方维护的镜像
2. **最小化镜像大小** - 使用 alpine 基础镜像
3. **使用 .dockerignore** - 排除不必要的文件
4. **分层构建** - 充分利用 Docker 的缓存机制
5. **不要以 root 运行** - 创建非 root 用户
6. **使用健康检查** - 定期检查容器健康状态

## 常见问题

**Q: 如何查看容器内的文件？**
```bash
docker exec -it container_id ls -la /app
```

**Q: 如何复制文件到容器？**
```bash
docker cp file.txt container_id:/app/
```

**Q: 如何保存容器的更改为新镜像？**
```bash
docker commit container_id my-new-image:1.0
```

## 总结

Docker 是现代应用开发和部署的必备工具。通过容器化，你可以确保应用在开发、测试和生产环境中的一致性，大大简化了部署流程。
