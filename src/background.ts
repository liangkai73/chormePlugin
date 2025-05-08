import { isChromeExtension, getChromeApi } from './utils/chromeApiMock';

// 只在 Chrome 扩展环境中运行
if (isChromeExtension()) {
  const chrome = getChromeApi();
  
  // 监听扩展图标点击事件
  chrome.action.onClicked.addListener((tab) => {
    if (tab.id) {
      chrome.tabs.sendMessage(tab.id, { action: 'toggleAssistant' });
    }
  });

  // 监听扩展安装或更新事件
  chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
      // 首次安装，设置默认值
      chrome.storage.sync.set({
        apiKey: '',
        modelName: 'gpt-3.5-turbo',
        enableAutoDisplay: true,
      });
    }
  });

  // 注册上下文菜单
  chrome.runtime.onInstalled.addListener(() => {
    if (chrome.contextMenus) {
      chrome.contextMenus.create({
        id: 'askAi',
        title: '使用 AI 助手分析选中内容',
        contexts: ['selection']
      });
    }
  });

  // 处理上下文菜单点击
  if (chrome.contextMenus) {
    chrome.contextMenus.onClicked.addListener((info, tab) => {
      if (info.menuItemId === 'askAi' && tab?.id) {
        // 向当前标签页发送消息，包含选中的文本
        chrome.tabs.sendMessage(tab.id, {
          action: 'analyzeText',
          text: info.selectionText
        });
      }
    });
  }
} else {
  console.log('Chrome Extension API 不可用，这是开发环境');
} 