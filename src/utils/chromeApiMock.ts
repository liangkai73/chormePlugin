/**
 * Chrome API 模拟工具
 * 用于在开发环境中模拟 Chrome 扩展 API
 */

// 检查是否在 Chrome 扩展环境中
export const isChromeExtension = (): boolean => {
  return typeof chrome !== 'undefined' && 
         typeof chrome.storage !== 'undefined' && 
         typeof chrome.runtime !== 'undefined';
};

// 创建模拟的存储对象和方法
const mockStorage = {
  get: (keys: string[] | object | string | null, callback: (items: Record<string, any>) => void) => {
    console.log('Mock storage.get called with keys:', keys);
    
    // 从 localStorage 获取数据
    const mockData: Record<string, any> = {};
    
    if (Array.isArray(keys)) {
      keys.forEach(key => {
        const value = localStorage.getItem(key);
        if (value !== null) {
          try {
            mockData[key] = JSON.parse(value);
          } catch {
            mockData[key] = value;
          }
        }
      });
    } else if (keys && typeof keys === 'object') {
      // 对象形式的默认值
      Object.entries(keys).forEach(([key, defaultValue]) => {
        const value = localStorage.getItem(key);
        if (value !== null) {
          try {
            mockData[key] = JSON.parse(value);
          } catch {
            mockData[key] = value;
          }
        } else {
          mockData[key] = defaultValue;
        }
      });
    } else if (typeof keys === 'string') {
      const value = localStorage.getItem(keys);
      if (value !== null) {
        try {
          mockData[keys] = JSON.parse(value);
        } catch {
          mockData[keys] = value;
        }
      }
    } else {
      // 获取所有数据
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          const value = localStorage.getItem(key);
          if (value !== null) {
            try {
              mockData[key] = JSON.parse(value);
            } catch {
              mockData[key] = value;
            }
          }
        }
      }
    }
    
    // 提供特定键的默认值
    if (!mockData.apiKey) mockData.apiKey = '';
    if (!mockData.modelName) mockData.modelName = 'gpt-3.5-turbo';
    if (mockData.enableAutoDisplay === undefined) mockData.enableAutoDisplay = true;
    
    callback(mockData);
    return true; // 模拟异步操作的返回值
  },
  
  set: (items: Record<string, any>, callback?: () => void) => {
    console.log('Mock storage.set called with items:', items);
    
    // 将数据保存到 localStorage
    Object.entries(items).forEach(([key, value]) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch {
        localStorage.setItem(key, String(value));
      }
    });
    
    if (callback) {
      callback();
    }
    return true; // 模拟异步操作的返回值
  },
  
  remove: (keys: string | string[], callback?: () => void) => {
    console.log('Mock storage.remove called with keys:', keys);
    
    if (Array.isArray(keys)) {
      keys.forEach(key => localStorage.removeItem(key));
    } else {
      localStorage.removeItem(keys);
    }
    
    if (callback) {
      callback();
    }
    return true;
  },
  
  clear: (callback?: () => void) => {
    console.log('Mock storage.clear called');
    localStorage.clear();
    
    if (callback) {
      callback();
    }
    return true;
  }
};

// 模拟 chrome.runtime
const mockRuntime = {
  sendMessage: (message: any, responseCallback?: (response: any) => void) => {
    console.log('Mock runtime.sendMessage called with:', message);
    if (responseCallback) {
      // 模拟异步回调
      setTimeout(() => {
        responseCallback({ success: true, mock: true });
      }, 100);
    }
  },
  
  onMessage: {
    addListener: (callback: (message: any, sender: any, sendResponse: any) => void) => {
      console.log('Mock runtime.onMessage.addListener called');
      // 可以在这里设置一个全局事件监听器，如果需要在开发环境中模拟消息通信
    }
  }
};

// 模拟 chrome.tabs
const mockTabs = {
  sendMessage: (tabId: number, message: any, responseCallback?: (response: any) => void) => {
    console.log('Mock tabs.sendMessage called with:', { tabId, message });
    if (responseCallback) {
      setTimeout(() => {
        responseCallback({ success: true, mock: true });
      }, 100);
    }
  },
  query: (queryInfo: { active: boolean, currentWindow: boolean }, callback: (tabs: any[]) => void) => {
    console.log('Mock tabs.query called with:', queryInfo);
    callback([{ id: 1, url: window.location.href, title: document.title }]);
  }
};

// 导出 Chrome API 访问工具
export const getChromeApi = () => {
  if (isChromeExtension()) {
    return chrome;
  }
  
  // 如果不在扩展环境中，返回模拟对象
  return {
    storage: {
      sync: mockStorage,
      local: mockStorage
    },
    runtime: mockRuntime,
    tabs: mockTabs,
    // 可以根据需要添加更多模拟 API
  } as unknown as typeof chrome;
};

// 导出单独的存储 API 工具函数（更简单的用法）
export const getStorageApi = () => {
  if (isChromeExtension()) {
    return chrome.storage;
  }
  
  return {
    sync: mockStorage,
    local: mockStorage
  };
}; 