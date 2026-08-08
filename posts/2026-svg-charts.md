---
title: 徒手画 SVG 图表：不靠任何图表库
date: 2026-08-08
lang: zh
tags: [前端, SVG, 数据可视化]
summary: 不用 ECharts、不引 CDN，纯手写内联 SVG 把数据画成柱状图、折线图和饼图。本文拆解坐标换算、比例尺和标签处理，并给出可直接复用的函数。
slug: 2026-svg-charts
---

# 徒手画 SVG 图表：不靠任何图表库

做个人站时我常遇到一个矛盾：只想画一张小小的图表，却要为一个图表库引入几十 KB 的脚本。对「零构建、零外链」的站点来说，这尤其别扭。其实**大部分图表，徒手写 SVG 比想象中简单**，而且生成的还是内联矢量，任意缩放都不糊。

> 本文所有示例都是纯函数：喂数据进去，吐出一段 SVG 字符串。你可以直接粘进自己的页面，也可以当作理解图表库底层逻辑的练习。

## 为什么不用图表库

图表库解决的其实是「通用性」问题——它要应对无数种图表、无数种配置。但你的页面往往只需要一两种固定图表。这时候库带来的好处有限，代价却很明确：

- **体积**：哪怕按需引入，核心也常在上百 KB。
- **外链**：很多库默认从 CDN 拉，离线就废，和「零外链」原则冲突。
- **可控性**：想改一个像素的间距，往往要翻半天文档找对应的配置项。

手写 SVG 没有这些负担。它的代价是「要自己算坐标」，而这正是下面要拆解的核心。

## 核心思路：把数据映射到坐标

图表本质是**把「数据值」翻译成「屏幕上的像素位置」**。这个翻译靠一个叫*比例尺（scale）*的东西完成。先用一个线性比例尺函数打底：

```js
// 线性比例尺：把 [domainMin, domainMax] 区间的值，映射到 [rangeMin, rangeMax] 像素。
// 比如把销量 0~100 映射到画布高度 0~240 像素。
function linearScale(value, domainMin, domainMax, rangeMin, rangeMax) {
  if (domainMax === domainMin) return (rangeMin + rangeMax) / 2;
  const t = (value - domainMin) / (domainMax - domainMin);
  return rangeMin + t * (rangeMax - rangeMin);
}
```

注意返回值里 `rangeMin` 通常在**下方**（像素大），`rangeMax` 在**上方**（像素小）。SVG 的坐标原点在左上角，y 轴向下为正，所以「值越大、y 越小」这个反转要留心。

### 留出边距（margin）

真实图表不会让柱子贴着画布边缘，所以要先把画布切成「绘图区」和「边距区」：

```js
const margin = { top: 20, right: 20, bottom: 30, left: 40 };
const width = 320, height = 240;
const plotW = width - margin.left - margin.right;
const plotH = height - margin.top - margin.bottom;
```

所有比例尺的 `range` 都该落在 `plotW` / `plotH` 上，而不是整个 `width` / `height`。

## 柱状图

柱状图是把每个分类的值，映射成一个矩形。横坐标用**序数**排布（第 i 根柱子占第 i 个格子），纵坐标用上面的线性比例尺。

### 完整代码

```js
function barChart(data, w = 320, h = 240) {
  const m = { top: 20, right: 20, bottom: 30, left: 40 };
  const pw = w - m.left - m.right;
  const ph = h - m.top - m.bottom;
  const max = Math.max(...data.map(d => d.value));
  const y = v => m.top + linearScale(v, 0, max, ph, 0);
  const bw = pw / data.length * 0.6;            // 柱子宽度：格子的 60%，留缝隙
  const bars = data.map((d, i) => {
    const x = m.left + (pw / data.length) * i + (pw / data.length - bw) / 2;
    const top = y(d.value);
    const barH = m.top + ph - top;
    return `<rect x="${x}" y="${top}" width="${bw}" height="${barH}" fill="#4aa8ff"/>`;
  }).join("");
  return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">${bars}</svg>`;
}
```

调用 `barChart([{value: 30}, {value: 70}, {value: 45}])` 就能得到一张能直接塞进页面的图表。`viewBox` 让它在任何尺寸下都按比例缩放，这正是内联 SVG 比 `<canvas>` 舒服的地方。

## 折线图与面积

折线图的横坐标和柱状图一样按序数排，但点与点之间用 `<polyline>` 连起来。想再叠一层「面积感」，把折线下方封口填色即可：

```js
const points = data.map((d, i) => {
  const x = m.left + (pw / (data.length - 1)) * i;
  const yy = y(d.value);
  return `${x},${yy}`;
}).join(" ");
const line = `<polyline points="${points}" fill="none" stroke="#4aa8ff" stroke-width="2"/>`;
```

## 饼图：角度即占比

饼图不用笛卡尔坐标，而是把「占比」换算成「圆心角」。`360° × 占比` 就是这一块的角度，再用 SVG 的 `path` 画圆弧：

| 环节 | 要算什么 | 用到的量 |
| --- | --- | --- |
| 归一 | 每块占总和的几分之几 | `value / sum` |
| 角度 | 这块占多少度 | `360 × 占比` |
| 弧长 | 弧的终点坐标 | `sin/cos(角度)` |

```js
const sum = data.reduce((s, d) => s + d.value, 0);
let angle = 0;
const slices = data.map(d => {
  const a0 = angle;
  const a1 = angle + (d.value / sum) * Math.PI * 2;
  angle = a1;
  // 用大弧标志 + 终点坐标画扇形（略去圆心坐标计算，按需要替换 cx/cy）
  return { a0, a1, color: d.color };
});
```

## 一些踩坑

- **y 轴反转**：忘记「值大 y 小」，柱子会倒着长。
- **文本标签溢出**：长标签要截断或换行，否则会戳出画布。
- **小数像素**：浏览器能渲染亚像素，但多个小数累积会让边框发虚，必要时 `Math.round`。
- **无障碍**：纯装饰图表可以 `aria-hidden`，但带数据的图表最好配一段 `<title>` 或表格兜底。

掌握了比例尺这一个核心，柱状、折线、饼图之间只是「把坐标换成不同图形元素」的差别。下次再想加图表，不妨先问自己：真的需要那个库吗？
