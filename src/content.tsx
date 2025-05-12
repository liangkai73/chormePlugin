import React from 'react';
import ReactDOM from 'react-dom/client';
import ContentApp from './components/ContentApp';
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
    document.body.appendChild(container);

    // 使用SCSS类应用样式
    container.className = 'assistant-popup';
    
    // 默认隐藏
    container.style.display = 'none';
    
    // 渲染 React 组件
    const root = ReactDOM.createRoot(container);
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
          <ContentApp />
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
    document.body.appendChild(iconContainer);
    
    // 渲染悬浮图标
    const root = ReactDOM.createRoot(iconContainer);
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
      if (container.style.display === 'none') {
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