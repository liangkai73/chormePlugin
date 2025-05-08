import { getChromeApi } from './chromeApiMock';

/**
 * 在开发环境中添加模拟右键菜单功能
 * 这个工具只在开发环境中有效，用于测试右键菜单功能
 */
export const setupMockContextMenu = () => {
  // 检查是否在开发环境中
  if (typeof chrome === 'undefined' || !chrome.contextMenus) {
    console.log('Setting up mock context menu for development');
    
    // 添加事件监听器用于选中文本
    document.addEventListener('mouseup', () => {
      const selection = window.getSelection()?.toString();
      if (selection && selection.length > 0) {
        showContextMenu(selection);
      }
    });
  }
};

// 显示模拟上下文菜单
const showContextMenu = (selectedText: string) => {
  // 移除已有的上下文菜单
  const existingMenu = document.getElementById('mock-context-menu');
  if (existingMenu) {
    existingMenu.remove();
  }
  
  // 创建新菜单
  const menu = document.createElement('div');
  menu.id = 'mock-context-menu';
  menu.style.position = 'fixed';
  menu.style.zIndex = '10000';
  menu.style.backgroundColor = 'white';
  menu.style.border = '1px solid #ccc';
  menu.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
  menu.style.borderRadius = '4px';
  menu.style.padding = '5px 0';
  
  // 添加菜单项
  const menuItem = document.createElement('div');
  menuItem.innerText = '使用 AI 助手分析选中内容';
  menuItem.style.padding = '8px 12px';
  menuItem.style.cursor = 'pointer';
  
  // 添加 hover 效果
  menuItem.addEventListener('mouseover', () => {
    menuItem.style.backgroundColor = '#f5f5f5';
  });
  
  menuItem.addEventListener('mouseout', () => {
    menuItem.style.backgroundColor = 'transparent';
  });
  
  menuItem.addEventListener('click', () => {
    // 模拟发送消息
    const chrome = getChromeApi();
    chrome.runtime.sendMessage({
      action: 'analyzeText',
      text: selectedText
    });
    
    // 隐藏菜单
    menu.remove();
  });
  
  menu.appendChild(menuItem);
  
  // 定位菜单
  const mouseEvent = window.event as MouseEvent;
  if (mouseEvent) {
    menu.style.left = `${mouseEvent.clientX}px`;
    menu.style.top = `${mouseEvent.clientY}px`;
  }
  
  // 添加到文档
  document.body.appendChild(menu);
  
  // 点击其他地方关闭菜单
  const closeMenu = (e: MouseEvent) => {
    if (!menu.contains(e.target as Node)) {
      menu.remove();
      document.removeEventListener('click', closeMenu);
    }
  };
  
  // 延迟添加事件监听器，避免立即触发
  setTimeout(() => {
    document.addEventListener('click', closeMenu);
  }, 100);
};

// 自动设置模拟上下文菜单
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  setupMockContextMenu();
} 