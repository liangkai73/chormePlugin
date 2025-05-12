import { isChromeExtension, getChromeApi } from './utils/chromeApiMock';

// 默认允许显示悬浮图标的域名列表
const DEFAULT_ALLOWED_DOMAINS = [
  'example.com',
  'google.com',
  'baidu.com',
];

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
        allowedDomains: DEFAULT_ALLOWED_DOMAINS,
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
  
  // 监听扩展内部消息
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'recreateFloatingIcon' && sender.tab?.id) {
      // 向当前标签页发送创建悬浮图标的消息
      chrome.tabs.sendMessage(sender.tab.id, { action: 'createFloatingIcon' });
      sendResponse({ success: true });
    }
    return true;
  });
  
  // 监听标签页更新事件
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // 当页面加载完成时
    if (changeInfo.status === 'complete' && tab.url) {
      try {
        // 获取当前页面的域名
        const url = new URL(tab.url);
        const hostname = url.hostname;
        
        // 获取允许的域名列表
        chrome.storage.sync.get(['allowedDomains', 'enableAutoDisplay'], (result) => {
          const allowedDomains = result.allowedDomains || DEFAULT_ALLOWED_DOMAINS;
          const enableAutoDisplay = result.enableAutoDisplay !== undefined ? result.enableAutoDisplay : true;
          
          // 检查当前域名是否在允许列表中
          const isDomainAllowed = allowedDomains.some((domain: string) => 
            hostname === domain || hostname.endsWith(`.${domain}`)
          );
          
          // 如果域名在允许列表中且启用了自动显示，发送消息通知内容脚本创建图标
          if (isDomainAllowed && enableAutoDisplay) {
            chrome.tabs.sendMessage(tabId, { action: 'createFloatingIcon' });
          }
        });
      } catch (error) {
        console.error('解析URL时出错:', error);
      }
    }
  });
} else {
  console.log('Chrome Extension API 不可用，这是开发环境');
} 