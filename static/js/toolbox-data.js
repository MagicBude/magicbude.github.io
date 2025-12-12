/**
 * 工具库数据文件 - 多语言版本
 * 包含所有工具的信息、分类和显示配置
 * 支持中文和英文
 */

/**
 * 获取当前语言
 * 从 URL 路径中提取语言代码
 */
function getCurrentLang() {
    const path = window.location.pathname;
    return path.startsWith('/en/') ? 'en' : 'zh';
}

/**
 * 工具列表数组 - 多语言版本
 * 每个工具对象包含：id、name、category、icon、description、downloadUrl
 * name 和 description 都支持中英文
 */
const tools = [
    // ===== 开发工具 =====
    {
        id: 1,
        name: { zh: 'VSCode', en: 'VSCode' },
        category: 'dev',
        icon: '/icons/vscode.svg',
        description: { zh: '轻量级代码编辑器，功能强大，扩展丰富', en: 'Lightweight code editor with powerful features and rich extensions' },
        downloadUrl: 'https://code.visualstudio.com/'
    },
    {
        id: 2,
        name: { zh: 'Git', en: 'Git' },
        category: 'dev',
        icon: '/icons/git.svg',
        description: { zh: '分布式版本控制系统，开发必备', en: 'Distributed version control system, essential for development' },
        downloadUrl: 'https://git-scm.com/'
    },
    {
        id: 3,
        name: { zh: 'Hugo', en: 'Hugo' },
        category: 'dev',
        icon: '/icons/hugo.svg',
        description: { zh: '静态网站生成器，快速高效', en: 'Fast and efficient static site generator' },
        downloadUrl: 'https://gohugo.io/'
    },

    // ===== 浏览器 =====
    {
        id: 4,
        name: { zh: 'Chrome', en: 'Chrome' },
        category: 'browser',
        icon: '/icons/chrome.svg',
        description: { zh: '谷歌浏览器，性能优秀，扩展丰富', en: 'Google browser with excellent performance and rich extensions' },
        downloadUrl: 'https://www.google.com/chrome/'
    },
    {
        id: 5,
        name: { zh: 'Firefox', en: 'Firefox' },
        category: 'browser',
        icon: '/icons/firefox.svg',
        description: { zh: '开源浏览器，隐私保护能力强', en: 'Open-source browser with strong privacy protection' },
        downloadUrl: 'https://www.mozilla.org/firefox/'
    },
    {
        id: 6,
        name: { zh: 'Microsoft Edge', en: 'Microsoft Edge' },
        category: 'browser',
        icon: '/icons/Edge.svg',
        description: { zh: '微软浏览器，与Windows深度集成', en: 'Microsoft browser deeply integrated with Windows' },
        downloadUrl: 'https://www.microsoft.com/edge'
    },
    {
        id: 7,
        name: { zh: 'Yandex', en: 'Yandex' },
        category: 'browser',
        icon: '/icons/yandex.svg',
        description: { zh: '俄罗斯搜索引擎公司的浏览器', en: 'Browser by Russian search engine company' },
        downloadUrl: 'https://browser.yandex.com/'
    },
    {
        id: 8,
        name: { zh: 'DuckDuckGo', en: 'DuckDuckGo' },
        category: 'browser',
        icon: '/icons/duckduckgo.svg',
        description: { zh: '注重隐私保护的搜索引擎和浏览器', en: 'Privacy-focused search engine and browser' },
        downloadUrl: 'https://duckduckgo.com/'
    },

    // ===== 生产力工具 =====
    {
        id: 9,
        name: { zh: 'Obsidian', en: 'Obsidian' },
        category: 'productivity',
        icon: '/icons/obsidian.svg',
        description: { zh: '强大的笔记管理和知识库工具', en: 'Powerful note-taking and knowledge base tool' },
        downloadUrl: 'https://obsidian.md/'
    },
    {
        id: 10,
        name: { zh: 'Typora', en: 'Typora' },
        category: 'productivity',
        icon: '/icons/Typora.svg',
        description: { zh: '简洁优雅的 Markdown 编辑器', en: 'Elegant and simple Markdown editor' },
        downloadUrl: 'https://typora.io/'
    },
    {
        id: 11,
        name: { zh: 'Notion', en: 'Notion' },
        category: 'productivity',
        icon: '/icons/notion.svg',
        description: { zh: '一体化工作空间，笔记、数据库、看板', en: 'All-in-one workspace for notes, databases, and kanban' },
        downloadUrl: 'https://www.notion.so/'
    },

    // ===== 系统工具 =====
    {
        id: 12,
        name: { zh: 'Everything', en: 'Everything' },
        category: 'system',
        icon: '/icons/Everything.svg',
        description: { zh: '极速文件搜索工具', en: 'Ultra-fast file search tool' },
        downloadUrl: 'https://www.voidtools.com/'
    },
    {
        id: 13,
        name: { zh: 'Listary', en: 'Listary' },
        category: 'system',
        icon: '/icons/Listary.svg',
        description: { zh: '快速启动和文件搜索工具', en: 'Quick launcher and file search tool' },
        downloadUrl: 'https://www.listary.com/'
    },
    {
        id: 14,
        name: { zh: 'DISM++', en: 'DISM++' },
        category: 'system',
        icon: '/icons/DISM++logo.png',
        description: { zh: '系统清理和优化工具', en: 'System cleanup and optimization tool' },
        downloadUrl: 'https://www.chuyu.me/zh-Hans/'
    },
    {
        id: 15,
        name: { zh: 'Quicker', en: 'Quicker' },
        category: 'system',
        icon: '/icons/Quicker.svg',
        description: { zh: '效率提升工具，快捷操作', en: 'Productivity tool with quick actions' },
        downloadUrl: 'https://getquicker.net/'
    },

    // ===== 其他工具 =====
    {
        id: 16,
        name: { zh: 'IDM', en: 'IDM' },
        category: 'other',
        icon: '/icons/idman.svg',
        description: { zh: '强大的下载管理器', en: 'Powerful download manager' },
        downloadUrl: 'https://www.internetdownloadmanager.com/'
    },
    {
        id: 17,
        name: { zh: 'Clash', en: 'Clash' },
        category: 'other',
        icon: '/icons/clash.svg',
        description: { zh: '网络代理工具', en: 'Network proxy tool' },
        downloadUrl: 'https://github.com/Dreamacro/clash'
    },
    {
        id: 18,
        name: { zh: 'Proxifier', en: 'Proxifier' },
        category: 'other',
        icon: '/icons/proxifier.svg',
        description: { zh: '全局代理工具', en: 'Global proxy tool' },
        downloadUrl: 'https://www.proxifier.com/'
    },
    {
        id: 19,
        name: { zh: 'Telegram', en: 'Telegram' },
        category: 'other',
        icon: '/icons/telegram.svg',
        description: { zh: '安全的即时通讯应用', en: 'Secure instant messaging app' },
        downloadUrl: 'https://telegram.org/'
    },
    {
        id: 20,
        name: { zh: 'Snipaste', en: 'Snipaste' },
        category: 'other',
        icon: '/icons/Snipaste.svg',
        description: { zh: '强大的截图工具，支持标注和分享', en: 'Powerful screenshot tool with annotation and sharing' },
        downloadUrl: 'https://www.snipaste.com/'
    },
    {
        id: 21,
        name: { zh: 'PixPin', en: 'PixPin' },
        category: 'other',
        icon: '/icons/PixPin.png',
        description: { zh: '现代化的截图和标注工具', en: 'Modern screenshot and annotation tool' },
        downloadUrl: 'https://pixpinapp.com/'
    }
];

/**
 * 分类名称映射表 - 多语言版本
 * 将分类代码（如 'dev'）映射到中英文名称
 * 用于在页面上显示分类按钮的文字
 */
const categoryMap = {
    'dev': { zh: '开发工具', en: 'Development Tools' },
    'browser': { zh: '浏览器', en: 'Browsers' },
    'productivity': { zh: '生产力工具', en: 'Productivity' },
    'system': { zh: '系统工具', en: 'System Tools' },
    'other': { zh: '其他工具', en: 'Others' }
};

/**
 * 分类顺序数组
 * 定义分类按钮在页面上的显示顺序
 * toolbox.js 会根据这个顺序创建分类按钮
 */
const categoryOrder = ['dev', 'browser', 'productivity', 'system', 'other'];

/**
 * 获取指定语言的文本
 * @param {Object|String} text - 文本对象 { zh: '中文', en: 'English' } 或直接的字符串
 * @param {String} lang - 语言代码 ('zh' 或 'en')
 * @returns {String} - 对应语言的文本
 */
function getText(text, lang) {
    if (typeof text === 'string') return text;
    return text[lang] || text.zh || text.en || '';
}
