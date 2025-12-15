---
title: "前端性能优化完全指南"
date: 2025-12-15
weight: 8
description: "掌握前端性能优化的核心技能，提升网站加载速度和用户体验"
tags: ["前端", "性能优化", "Web开发"]
categories: ["技术教程"]
---

## 为什么性能很重要？

网站性能直接影响用户体验和搜索引擎排名。研究表明，页面加载时间每增加 1 秒，转化率就会下降 7%。

## 性能指标

### 核心 Web 指标（Core Web Vitals）

**LCP（Largest Contentful Paint）** - 最大内容绘制
- 衡量页面主要内容加载的速度
- 目标：< 2.5 秒

**FID（First Input Delay）** - 首次输入延迟
- 衡量用户交互的响应速度
- 目标：< 100 毫秒

**CLS（Cumulative Layout Shift）** - 累积布局偏移
- 衡量页面稳定性
- 目标：< 0.1

### 其他重要指标

- **TTFB（Time to First Byte）** - 首字节时间
- **FCP（First Contentful Paint）** - 首次内容绘制
- **TTI（Time to Interactive）** - 可交互时间

## 性能优化策略

### 1. 资源优化

#### 图片优化
```javascript
// 使用现代格式（WebP）
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="description">
</picture>

// 使用响应式图片
<img srcset="small.jpg 480w, medium.jpg 800w, large.jpg 1200w"
     sizes="(max-width: 600px) 480px, 800px"
     src="medium.jpg" alt="description">

// 使用 CDN 和图片压缩服务
// 例如：Cloudinary, ImageKit 等
```

#### CSS 优化
```css
/* 移除未使用的 CSS */
/* 使用 PurgeCSS 或 Tailwind CSS 的 purge 功能 */

/* 内联关键 CSS */
<style>
  /* 首屏必需的 CSS */
</style>
<link rel="stylesheet" href="non-critical.css" media="print" onload="this.media='all'">

/* 使用 CSS 变量减少重复 */
:root {
  --primary-color: #007bff;
  --spacing-unit: 8px;
}
```

#### JavaScript 优化
```javascript
// 代码分割
import { lazy, Suspense } from 'react';
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// 延迟加载非关键脚本
<script defer src="analytics.js"></script>
<script async src="ads.js"></script>

// 使用 Web Workers 处理耗时任务
const worker = new Worker('worker.js');
worker.postMessage({ data: largeData });
worker.onmessage = (e) => {
  console.log('Result:', e.data);
};
```

### 2. 缓存策略

#### 浏览器缓存
```javascript
// 设置缓存头
// HTTP 响应头
Cache-Control: max-age=31536000  // 1 年
Cache-Control: max-age=3600, must-revalidate  // 1 小时，需要验证

// 使用 ETag 进行条件请求
If-None-Match: "33a64df..."
```

#### Service Worker 缓存
```javascript
// service-worker.js
const CACHE_NAME = 'v1';
const urlsToCache = [
  '/',
  '/styles/main.css',
  '/script/main.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
```

### 3. 代码分割和懒加载

```javascript
// 路由级别的代码分割
const routes = [
  {
    path: '/',
    component: () => import('./pages/Home')
  },
  {
    path: '/about',
    component: () => import('./pages/About')
  }
];

// 组件级别的懒加载
const LazyImage = lazy(() => import('./LazyImage'));

// 使用 Intersection Observer 实现图片懒加载
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      imageObserver.unobserve(img);
    }
  });
});

document.querySelectorAll('img[data-src]').forEach((img) => {
  imageObserver.observe(img);
});
```

### 4. 网络优化

#### DNS 预解析
```html
<link rel="dns-prefetch" href="https://example.com">
<link rel="preconnect" href="https://fonts.googleapis.com">
```

#### 资源预加载
```html
<!-- 预加载关键资源 -->
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="critical.js" as="script">

<!-- 预连接 -->
<link rel="preconnect" href="https://api.example.com">

<!-- 预获取非关键资源 -->
<link rel="prefetch" href="next-page.js">
```

#### 使用 CDN
```javascript
// 使用 CDN 分发静态资源
// 例如：Cloudflare, AWS CloudFront, Akamai 等

// 在 HTML 中使用 CDN URL
<script src="https://cdn.example.com/script.js"></script>
<link rel="stylesheet" href="https://cdn.example.com/style.css">
```

### 5. 渲染优化

#### 避免重排和重绘
```javascript
// 不好的做法 - 多次重排
for (let i = 0; i < 100; i++) {
  element.style.width = element.offsetWidth + 1 + 'px';
}

// 好的做法 - 批量修改
const width = element.offsetWidth;
for (let i = 0; i < 100; i++) {
  element.style.width = (width + i) + 'px';
}

// 或使用 requestAnimationFrame
let width = element.offsetWidth;
function update() {
  element.style.width = width + 'px';
  width++;
}
requestAnimationFrame(update);
```

#### 虚拟滚动
```javascript
// 只渲染可见的列表项
import { FixedSizeList } from 'react-window';

const Row = ({ index, style }) => (
  <div style={style}>Item {index}</div>
);

<FixedSizeList
  height={600}
  itemCount={1000}
  itemSize={35}
  width="100%"
>
  {Row}
</FixedSizeList>
```

### 6. 监控和分析

#### 使用 Web Vitals 库
```javascript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

#### 性能监控 API
```javascript
// 使用 Performance API
const perfData = window.performance.timing;
const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
console.log('Page load time:', pageLoadTime);

// 使用 PerformanceObserver
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log('Entry:', entry);
  }
});

observer.observe({ entryTypes: ['navigation', 'resource', 'paint'] });
```

## 性能优化检查清单

- [ ] 图片已优化和压缩
- [ ] 使用了现代图片格式（WebP）
- [ ] CSS 已最小化和分割
- [ ] JavaScript 已分割和懒加载
- [ ] 关键资源已预加载
- [ ] 使用了 Service Worker 缓存
- [ ] 已配置 CDN
- [ ] 已移除未使用的代码
- [ ] 已启用 Gzip 压缩
- [ ] 已配置浏览器缓存
- [ ] 已优化字体加载
- [ ] 已测试核心 Web 指标

## 性能测试工具

- **Google PageSpeed Insights** - https://pagespeed.web.dev
- **WebPageTest** - https://www.webpagetest.org
- **Lighthouse** - Chrome DevTools 内置
- **GTmetrix** - https://gtmetrix.com

## 总结

前端性能优化是一个持续的过程。通过实施这些优化策略，你可以显著提升网站的加载速度和用户体验。记住，性能优化的关键是测量、优化、验证。
