/*
 * assets/js/data/now.js
 * ============================================================================
 * 近况数据模块：集中保存近况页与首页摘要共同使用的内容。
 *
 * 协作关系：
 *   - now/index.html 按分类渲染完整近况；
 *   - home/index.html 从每个分类取一项，组成首页的“最近在做”摘要。
 *
 * 把共享内容从页面脚本中分离后，两处展示会始终读取同一份数据，避免重复维护。
 * ============================================================================
 */

// #region 近况数据

/*
 * 分类字段：title 为双语标题，icon 对应 js/icons.js，items 保存具体近况。
 * 条目字段：name 是名称，note 是双语说明；纯记录内容不设置链接。
 */
window.NOW = [
  {
    title: { zh: "在玩", en: "Playing" },
    icon: "gamepad",
    items: [
      {
        name: "羽毛球",
        note: { zh: "每周两场，胜负不重要，出汗最重要。", en: "Twice a week. Winning barely matters — sweating does." },
      },
      {
        name: "《塞尔达：王国之泪》",
        note: { zh: "通勤路上看别人玩，自己偶尔上手。", en: "Watch others play on commute, occasionally pick up the pad." },
      },
    ],
  },
  {
    title: { zh: "在看", en: "Watching" },
    icon: "film",
    items: [
      {
        name: "《葬送的芙莉莲》",
        note: { zh: "慢节奏但后劲很大，配乐封神。", en: "Slow pace but lingers; the soundtrack is divine." },
      },
      {
        name: "《奥本海默》",
        note: { zh: "二刷，IMAX 才是正解。", en: "Second watch — IMAX is the only right way." },
      },
    ],
  },
  {
    title: { zh: "在搞", en: "Building" },
    icon: "sparkles",
    items: [
      {
        name: "这个个人站",
        note: { zh: "你正在看的，纯手写、零构建。", en: "This very site — hand-written, zero-build." },
      },
      {
        name: "SensorLink 工具",
        note: { zh: "传感器串口可视化，做到一半。", en: "Sensor serial visualizer, halfway done." },
      },
    ],
  },
];

// #endregion 近况数据
