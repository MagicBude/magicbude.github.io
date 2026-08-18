/*
 * assets/js/data/now.js
 * ============================================================================
 * 近况数据模块：集中保存近况页与首页摘要共同使用的内容。
 *
 * 协作关系：
 *   - now/index.html 按分类渲染完整近况；
 *   - index.html 从每个分类取一项，组成首页的“最近在做”摘要。
 *
 * 把共享内容从页面脚本中分离后，两处展示会始终读取同一份数据，避免重复维护。
 * ============================================================================
 */

// #region 更新时间与近况数据

/*
 * NOW_UPDATED 是公开近况最后一次人工确认的日期，不代表页面构建时间。
 * 分类字段：key 用于样式语义，title 为双语标题，icon 对应 js/icons.js，items 保存具体近况。
 * 条目字段：name / meta / note 均支持双语；status 只表达当前状态，不伪造进度百分比。
 * 纯记录内容不设置外链，避免为了“看起来丰富”而引入未经确认的资料页或评分。
 */
window.NOW_UPDATED = "2026-08-18";

window.NOW = [
  {
    key: "building",
    title: { zh: "正在制作", en: "Building now" },
    icon: "code",
    items: [
      {
        name: { zh: "个人数字基地", en: "Personal digital base" },
        meta: { zh: "magicbude.github.io · 原生静态网站", en: "magicbude.github.io · Plain static site" },
        note: {
          zh: "正在继续整理首页、项目、关于和近况，让内容结构更真实，也更方便长期维护。",
          en: "Continuing to refine the home, projects, about, and now pages so the structure stays honest and maintainable.",
        },
        status: "active",
      },
    ],
  },
  {
    key: "watched",
    title: { zh: "最近看过", en: "Recently watched" },
    icon: "film",
    items: [
      {
        name: { zh: "《蜘蛛侠：崭新之日》", en: "Spider-Man: Brand New Day" },
        meta: { zh: "Spider-Man: Brand New Day · 2026", en: "2026 · Film" },
        note: { zh: "近期观看，观后感暂时留白。", en: "Watched recently; impressions are left blank for now." },
        status: "recent",
      },
      {
        name: { zh: "《欢迎来龙餐馆》", en: "Once Upon a Time in the Middle East" },
        meta: { zh: "Once Upon a Time in the Middle East · 2025", en: "2025 · Film" },
        note: { zh: "近期观看，观后感暂时留白。", en: "Watched recently; impressions are left blank for now." },
        status: "recent",
      },
    ],
  },
  {
    key: "offline",
    title: { zh: "屏幕之外", en: "Away from screens" },
    icon: "heart",
    items: [
      {
        name: { zh: "羽毛球", en: "Badminton" },
        meta: { zh: "日常兴趣", en: "Everyday interest" },
        note: { zh: "屏幕之外长期保留的日常活动之一。", en: "One of my long-running everyday activities away from screens." },
        status: "ongoing",
      },
    ],
  },
];

// #endregion 更新时间与近况数据
