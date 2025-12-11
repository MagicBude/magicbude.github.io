/**
 * 工具库交互脚本 - 多语言版本
 * 负责渲染分类按钮、工具卡片，以及处理分类筛选功能
 * 支持中文和英文
 */

class Toolbox {
    constructor() {
        // 记录当前选中的分类（默认显示全部）
        this.currentCategory = 'all';
        // 获取当前语言
        this.language = getCurrentLang();
        this.init();
    }

    /**
     * 初始化工具库
     * 按顺序执行：渲染按钮 → 渲染卡片 → 绑定事件
     */
    init() {
        this.renderCategoryButtons();
        this.renderTools();
        this.attachEventListeners();
    }

    /**
     * 渲染分类筛选按钮
     * 创建"全部"按钮和各分类按钮，添加到页面
     * 支持多语言显示
     */
    renderCategoryButtons() {
        const filterContainer = document.getElementById('category-filter');
        
        // 创建"全部"按钮（默认激活）
        const allBtn = document.createElement('button');
        allBtn.className = 'category-btn active';
        allBtn.textContent = this.language === 'en' ? 'All' : '全部';
        allBtn.dataset.category = 'all';
        filterContainer.appendChild(allBtn);

        // 根据 toolbox-data.js 中的 categoryOrder 创建分类按钮
        categoryOrder.forEach(category => {
            const btn = document.createElement('button');
            btn.className = 'category-btn';
            btn.textContent = getText(categoryMap[category], this.language);
            btn.dataset.category = category;
            filterContainer.appendChild(btn);
        });
    }

    /**
     * 渲染工具卡片
     * 遍历 tools 数组，为每个工具创建卡片 HTML
     * 支持多语言显示
     */
    renderTools() {
        const toolsGrid = document.getElementById('tools-grid');
        toolsGrid.innerHTML = '';  // 清空之前的内容

        tools.forEach(tool => {
            const card = document.createElement('div');
            card.className = 'tool-card';
            card.dataset.category = tool.category;  // 存储分类，用于筛选

            // 获取对应语言的工具名称
            const toolName = getText(tool.name, this.language);
            
            // 判断图标类型：如果以 / 开头则是 SVG 文件路径，否则是 Emoji
            let iconHTML = '';
            if (tool.icon.startsWith('/')) {
                iconHTML = `<img src="${tool.icon}" alt="${toolName}">`;
            } else {
                iconHTML = `<span class="tool-icon-emoji">${tool.icon}</span>`;
            }

            // 获取对应语言的工具描述和下载按钮文本
            const description = getText(tool.description, this.language);
            const downloadText = this.language === 'en' ? 'Download' : '下载';

            // 组装卡片 HTML
            card.innerHTML = `
                <div class="tool-icon">${iconHTML}</div>
                <div class="tool-name">${toolName}</div>
                <div class="tool-description">${description}</div>
                <a href="${tool.downloadUrl}" target="_blank" class="tool-download">${downloadText}</a>
            `;

            toolsGrid.appendChild(card);
        });
    }

    /**
     * 为所有分类按钮绑定点击事件
     * 点击按钮时触发 filterTools 方法
     */
    attachEventListeners() {
        const buttons = document.querySelectorAll('.category-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filterTools(e.target.dataset.category);
            });
        });
    }

    /**
     * 筛选工具卡片
     * @param {string} category - 选中的分类（'all' 表示显示全部）
     */
    filterTools(category) {
        this.currentCategory = category;

        // 更新按钮的激活状态：移除所有 active 类，只给选中的按钮添加
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.category === category) {
                btn.classList.add('active');
            }
        });

        // 更新卡片的显示/隐藏：根据分类显示或隐藏卡片
        document.querySelectorAll('.tool-card').forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.classList.remove('hidden');  // 显示
            } else {
                card.classList.add('hidden');  // 隐藏
            }
        });
    }
}

// 等待 DOM 加载完成后初始化工具库
// DOMContentLoaded 事件确保所有 HTML 元素都已加载
document.addEventListener('DOMContentLoaded', () => {
    new Toolbox();
});
