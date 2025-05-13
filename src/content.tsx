import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import FloatingIcon from './components/FloatingIcon';
import { isChromeExtension, getChromeApi } from './utils/chromeApiMock';
// 在开发环境中导入模拟上下文菜单
import './utils/mockContextMenu';

// 引入全局样式
import './styles/global.scss';
import './styles/index.css'; // 确保 index.css 也被导入

// 引入Ant Design ConfigProvider
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';

// 为TypeScript声明全局函数类型
declare global {
  interface Window {
    createFloatingIcon: () => void;
  }
}

// 允许显示悬浮图标的域名列表
const ALLOWED_DOMAINS = [
  'example.com',
  'google.com',
  'baidu.com',
  // 可根据需要添加更多域名
];

// 创建助手容器函数
const createAssistantContainer = () => {
  // 检查是否已经存在助手容器
  const existingContainer = document.getElementById('ai-assistant-container');
  if (!existingContainer) {
    // 创建助手容器
    const container = document.createElement('div');
    container.id = 'ai-assistant-container';
    
    // 使用 Shadow DOM 隔离样式
    const shadowRoot = container.attachShadow({ mode: 'open' });
    
    // 创建样式元素并添加到 Shadow DOM
    const styleElement = document.createElement('style');
    
    // 添加必要的样式重置和基础样式
    styleElement.textContent = `
      /* Ant Design 基础样式重置 */
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      
      :host {
        all: initial;
        display: block;
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 350px;
        height: 500px;
        z-index: 9999;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        border-radius: 8px;
        overflow: hidden;
        background-color: white;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
          'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
      }
      
      .app-container {
        height: 100%;
        display: flex;
        flex-direction: column;
      }
      
      .app-header {
        padding: 12px 16px;
        background-color: #1890ff;
        color: white;
        border-bottom: 1px solid #d9d9d9;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .app-content {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
        background-color: white;
      }
      
      .app-footer {
        padding: 10px 16px;
        text-align: center;
        border-top: 1px solid #d9d9d9;
        background-color: white;
      }
      
      /* Ant Design 组件样式覆盖 */
      .ant-btn {
        line-height: 1.5715;
        position: relative;
        display: inline-block;
        font-weight: 400;
        white-space: nowrap;
        text-align: center;
        background-image: none;
        border: 1px solid transparent;
        box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        user-select: none;
        touch-action: manipulation;
        height: 32px;
        padding: 4px 15px;
        font-size: 14px;
        border-radius: 2px;
        color: rgba(0, 0, 0, 0.85);
        background: #fff;
        border-color: #d9d9d9;
      }
      
      .ant-btn-text {
        border-color: transparent;
        background: transparent;
        box-shadow: none;
        color: inherit;
      }
      
      .ant-typography {
        color: inherit;
        font-size: 14px;
      }
      
      h4.ant-typography {
        font-size: 20px;
        margin: 0;
      }
      
      /* 滚动条样式 */
      ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }
      
      ::-webkit-scrollbar-thumb {
        background-color: #d9d9d9;
        border-radius: 3px;
      }
      
      ::-webkit-scrollbar-track {
        background-color: #f5f5f5;
      }
    `;
    
    shadowRoot.appendChild(styleElement);
    
    // 创建内容容器
    const contentContainer = document.createElement('div');
    contentContainer.className = 'assistant-popup';
    shadowRoot.appendChild(contentContainer);
    
    document.body.appendChild(container);
    
    // 默认隐藏
    container.style.display = 'none';
    
    // 渲染 React 组件
    const root = ReactDOM.createRoot(contentContainer);
    root.render(
      <React.StrictMode>
        <ConfigProvider
          locale={zhCN}
          theme={{
            token: {
              colorPrimary: '#1890ff',
              borderRadius: 4,
            },
          }}
        >
          <App />
        </ConfigProvider>
      </React.StrictMode>
    );
    
    return container;
  }
  
  return existingContainer;
};

// 创建悬浮图标函数
const createFloatingIcon = () => {
  // 检查当前域名是否在允许列表中
  const currentHostname = window.location.hostname;
  
  // 从存储中获取允许的域名列表
  const chromeApi = getChromeApi();
  let allowedDomains = [...ALLOWED_DOMAINS];
  
  if (isChromeExtension()) {
    chromeApi.storage.sync.get(['allowedDomains'], (result) => {
      if (result.allowedDomains && Array.isArray(result.allowedDomains)) {
        allowedDomains = result.allowedDomains;
      }
      
      continueCreatingIcon(allowedDomains);
    });
  } else {
    // 开发环境直接使用默认列表
    continueCreatingIcon(allowedDomains);
  }
  
  // 继续创建图标的内部函数
  function continueCreatingIcon(domains: string[]) {
    const isDomainAllowed = domains.some(domain => 
      currentHostname === domain || currentHostname.endsWith(`.${domain}`)
    );
    
    // 如果域名不在允许列表中，不显示图标
    if (!isDomainAllowed) {
      return;
    }
    
    // 检查是否已存在图标
    const existingIcon = document.getElementById('ai-assistant-floating-icon');
    if (existingIcon) {
      // 确保图标是可见的
      existingIcon.style.display = 'block';
      return;
    }
    
    // 创建图标容器
    const iconContainer = document.createElement('div');
    iconContainer.id = 'ai-assistant-floating-icon';
    
    // 使用 Shadow DOM 隔离样式
    const shadowRoot = iconContainer.attachShadow({ mode: 'open' });
    
    // 添加样式
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      :host {
        all: initial;
        display: block;
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
      }
      
      .floating-icon {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #1890ff;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        transition: box-shadow 0.3s ease, transform 0.3s ease;
        border: 2px solid white;
      }
      
      .floating-icon:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
        transform: scale(1.05);
      }
      
      .floating-icon img {
        width: 24px;
        height: 24px;
        object-fit: contain;
      }
    `;
    
    shadowRoot.appendChild(styleElement);
    
    // 创建内容容器
    const iconContent = document.createElement('div');
    iconContent.className = 'icon-container';
    shadowRoot.appendChild(iconContent);
    
    document.body.appendChild(iconContainer);
    
    // 渲染悬浮图标
    const root = ReactDOM.createRoot(iconContent);
    root.render(
      <React.StrictMode>
        <FloatingIcon onIconClick={toggleAssistant} />
      </React.StrictMode>
    );
  }
};

// 将函数暴露到全局作用域，使其他组件可以直接调用
if (typeof window !== 'undefined') {
  window.createFloatingIcon = createFloatingIcon;
}

// 切换助手显示状态
const toggleAssistant = () => {
  const container = document.getElementById('ai-assistant-container');
  if (container) {
    if (container.style.display === 'none') {
      container.style.display = 'block';
      
      // 当显示助手窗口时，隐藏悬浮图标
      const floatingIcon = document.getElementById('ai-assistant-floating-icon');
      if (floatingIcon) {
        floatingIcon.style.display = 'none';
      }
    } else {
      container.style.display = 'none';
      
      // 当隐藏助手窗口时，显示悬浮图标
      createFloatingIcon();
    }
  }
};

// 初始化容器
const container = createAssistantContainer();

// 初始化悬浮图标
if (typeof document !== 'undefined') {
  // 页面加载后创建悬浮图标
  window.addEventListener('load', createFloatingIcon);
}

// 设置消息监听
const setupMessageListener = () => {
  const chromeApi = getChromeApi();
  
  chromeApi.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'toggleAssistant') {
      toggleAssistant();
      sendResponse({ success: true });
    } else if (message.action === 'analyzeText' && message.text) {
      // 处理分析选中文本的功能
      console.log('分析文本:', message.text);
      // 显示助手并添加处理逻辑
      if (container && container.style.display === 'none') {
        container.style.display = 'block';
        
        // 当显示助手窗口时，隐藏悬浮图标
        const floatingIcon = document.getElementById('ai-assistant-floating-icon');
        if (floatingIcon) {
          floatingIcon.style.display = 'none';
        }
      }
      sendResponse({ success: true });
    } else if (message.action === 'createFloatingIcon') {
      // 接收创建悬浮图标的消息
      createFloatingIcon();
      sendResponse({ success: true });
    } else if (message.action === 'recreateFloatingIcon') {
      // 处理重新创建悬浮图标的消息
      createFloatingIcon();
      sendResponse({ success: true });
    }
    return true;
  });
};

// 只有在实际运行环境中才设置消息监听
if (typeof document !== 'undefined') {
  setupMessageListener();
  
  // 从存储中获取允许的域名列表并判断是否需要创建悬浮图标
  const chromeApi = getChromeApi();
  if (isChromeExtension()) {
    chromeApi.storage.sync.get(['allowedDomains', 'enableAutoDisplay'], (result) => {
      if (result.enableAutoDisplay !== false) {
        createFloatingIcon();
      }
    });
  } else {
    // 开发环境下自动创建悬浮图标以便测试
    window.addEventListener('load', createFloatingIcon);
  }
} 