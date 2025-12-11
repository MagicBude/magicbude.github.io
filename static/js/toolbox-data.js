/**
 * 工具库数据文件
 * 包含所有工具的信息、分类和显示配置
 */

/**
 * 工具列表数组
 * 每个工具对象包含：id、name、category、icon、description、downloadUrl
 * - id: 唯一标识符
 * - name: 工具名称
 * - category: 分类（dev/browser/productivity/system/other）
 * - icon: 图标（SVG 路径或 Emoji）
 * - description: 工具描述
 * - downloadUrl: 下载链接
 */
const tools = [
    // ===== 开发工具 =====
    {
        id: 1,
        name: 'VSCode',
        category: 'dev',
        icon: '/icons/vscode.svg',
        description: '轻量级代码编辑器，功能强大，扩展丰富',
        downloadUrl: 'https://code.visualstudio.com/'
    },
    {
        id: 2,
        name: 'Git',
        category: 'dev',
        icon: '/icons/git.svg',
        description: '分布式版本控制系统，开发必备',
        downloadUrl: 'https://git-scm.com/'
    },
    {
        id: 3,
        name: 'Hugo',
        category: 'dev',
        icon: '/icons/hugo.svg',
        description: '静态网站生成器，快速高效',
        downloadUrl: 'https://gohugo.io/'
    },

    // ===== 浏览器 =====
    {
        id: 4,
        name: 'Chrome',
        category: 'browser',
        icon: '/icons/chrome.svg',
        description: '谷歌浏览器，性能优秀，扩展丰富',
        downloadUrl: 'https://www.google.com/chrome/'
    },
    {
        id: 5,
        name: 'Firefox',
        category: 'browser',
        icon: '/icons/firefox.svg',
        description: '开源浏览器，隐私保护能力强',
        downloadUrl: 'https://www.mozilla.org/firefox/'
    },
    {
        id: 6,
        name: 'Microsoft Edge',
        category: 'browser',
        icon: '/icons/Edge.svg',
        description: '微软浏览器，与Windows深度集成',
        downloadUrl: 'https://www.microsoft.com/edge'
    },
    {
        id: 7,
        name: 'Yandex',
        category: 'browser',
        icon: '/icons/yandex.svg',
        description: '俄罗斯搜索引擎公司的浏览器',
        downloadUrl: 'https://browser.yandex.com/'
    },
    {
        id: 8,
        name: 'DuckDuckGo',
        category: 'browser',
        icon: '/icons/duckduckgo.svg',
        description: '注重隐私保护的搜索引擎和浏览器',
        downloadUrl: 'https://duckduckgo.com/'
    },

    // ===== 生产力工具 =====
    {
        id: 9,
        name: 'Obsidian',
        category: 'productivity',
        icon: '/icons/obsidian.svg',
        description: '强大的笔记管理和知识库工具',
        downloadUrl: 'https://obsidian.md/'
    },
    {
        id: 10,
        name: 'Typora',
        category: 'productivity',
        icon: '/icons/Typora.svg',
        description: '简洁优雅的 Markdown 编辑器',
        downloadUrl: 'https://typora.io/'
    },
    {
        id: 11,
        name: 'Notion',
        category: 'productivity',
        icon: '/icons/notion.svg',
        description: '一体化工作空间，笔记、数据库、看板',
        downloadUrl: 'https://www.notion.so/'
    },

    // ===== 系统工具 =====
    {
        id: 12,
        name: 'Everything',
        category: 'system',
        icon: '/icons/Everything.svg',
        description: '极速文件搜索工具',
        downloadUrl: 'https://www.voidtools.com/'
    },
    {
        id: 13,
        name: 'Listary',
        category: 'system',
        icon: '/icons/Listary.svg',
        description: '快速启动和文件搜索工具',
        downloadUrl: 'https://www.listary.com/'
    },
    {
        id: 14,
        name: 'DISM++',
        category: 'system',
        icon: '/icons/DISM++logo.png',
        description: '系统清理和优化工具',
        downloadUrl: 'https://www.chuyu.me/zh-Hans/'
    },
    {
        id: 15,
        name: 'Quicker',
        category: 'system',
        icon: '/icons/Quicker.svg',
        description: '效率提升工具，快捷操作',
        downloadUrl: 'https://getquicker.net/'
    },

    // ===== 其他工具 =====
    {
        id: 16,
        name: 'IDM',
        category: 'other',
        icon: '/icons/idman.svg',
        description: '强大的下载管理器',
        downloadUrl: 'https://www.internetdownloadmanager.com/'
    },
    {
        id: 17,
        name: 'Clash',
        category: 'other',
        icon: '/icons/clash.svg',
        description: '网络代理工具',
        downloadUrl: 'https://github.com/Dreamacro/clash'
    },
    {
        id: 18,
        name: 'Proxifier',
        category: 'other',
        icon: '/icons/proxifier.svg',
        description: '全局代理工具',
        downloadUrl: 'https://www.proxifier.com/'
    },
    {
        id: 19,
        name: 'Telegram',
        category: 'other',
        icon: '/icons/telegram.svg',
        description: '安全的即时通讯应用',
        downloadUrl: 'https://telegram.org/'
    }
];

/**
 * 分类名称映射表
 * 将分类代码（如 'dev'）映射到中文名称（如 '开发工具'）
 * 用于在页面上显示分类按钮的文字
 */
const categoryMap = {
    'dev': '开发工具',
    'browser': '浏览器',
    'productivity': '生产力工具',
    'system': '系统工具',
    'other': '其他工具'
};

/**
 * 分类顺序数组
 * 定义分类按钮在页面上的显示顺序
 * toolbox.js 会根据这个顺序创建分类按钮
 */
const categoryOrder = ['dev', 'browser', 'productivity', 'system', 'other'];
