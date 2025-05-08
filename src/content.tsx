import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ContentApp from './components/ContentApp';
import { isChromeExtension, getChromeApi } from './utils/chromeApiMock';
// 在开发环境中导入模拟上下文菜单
import './utils/mockContextMenu';

// 创建容器函数
const createAssistantContainer = () => {
  // 检查是否已经存在助手容器
  const existingContainer = document.getElementById('ai-assistant-container');
  if (!existingContainer) {
    // 创建助手容器
    const container = document.createElement('div');
    container.id = 'ai-assistant-container';
    document.body.appendChild(container);

    // 应用样式
    container.style.position = 'fixed';
    container.style.bottom = '20px';
    container.style.right = '20px';
    container.style.width = '350px';
    container.style.height = '500px';
    container.style.zIndex = '9999';
    container.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)';
    container.style.borderRadius = '8px';
    container.style.overflow = 'hidden';
    
    // 渲染 React 组件
    const root = ReactDOM.createRoot(container);
    root.render(
      <React.StrictMode>
        <ContentApp />
      </React.StrictMode>
    );
    
    return container;
  }
  
  return existingContainer;
};

// 初始化容器
const container = createAssistantContainer();

// 设置消息监听
const setupMessageListener = () => {
  const chromeApi = getChromeApi();
  
  chromeApi.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'toggleAssistant') {
      if (container.style.display === 'none') {
        container.style.display = 'block';
      } else {
        container.style.display = 'none';
      }
      sendResponse({ success: true });
    } else if (message.action === 'analyzeText' && message.text) {
      // 处理分析选中文本的功能
      console.log('分析文本:', message.text);
      // 这里可以添加处理逻辑
      sendResponse({ success: true });
    }
    return true;
  });
};

// 只有在实际运行环境中才设置消息监听
if (typeof document !== 'undefined') {
  setupMessageListener();
} 