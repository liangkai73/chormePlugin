export const isChromeExtension = () => {
  return typeof chrome !== "undefined" && typeof chrome.storage !== "undefined" && typeof chrome.runtime !== "undefined";
};
const mockStorage = {
  get: (keys, callback) => {
    console.log("Mock storage.get called with keys:", keys);
    const mockData = {};
    if (Array.isArray(keys)) {
      keys.forEach((key) => {
        const value = localStorage.getItem(key);
        if (value !== null) {
          try {
            mockData[key] = JSON.parse(value);
          } catch {
            mockData[key] = value;
          }
        }
      });
    } else if (keys && typeof keys === "object") {
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
    } else if (typeof keys === "string") {
      const value = localStorage.getItem(keys);
      if (value !== null) {
        try {
          mockData[keys] = JSON.parse(value);
        } catch {
          mockData[keys] = value;
        }
      }
    } else {
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
    if (!mockData.apiKey) mockData.apiKey = "";
    if (!mockData.modelName) mockData.modelName = "gpt-3.5-turbo";
    if (mockData.enableAutoDisplay === void 0) mockData.enableAutoDisplay = true;
    callback(mockData);
    return true;
  },
  set: (items, callback) => {
    console.log("Mock storage.set called with items:", items);
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
    return true;
  },
  remove: (keys, callback) => {
    console.log("Mock storage.remove called with keys:", keys);
    if (Array.isArray(keys)) {
      keys.forEach((key) => localStorage.removeItem(key));
    } else {
      localStorage.removeItem(keys);
    }
    if (callback) {
      callback();
    }
    return true;
  },
  clear: (callback) => {
    console.log("Mock storage.clear called");
    localStorage.clear();
    if (callback) {
      callback();
    }
    return true;
  }
};
const mockRuntime = {
  sendMessage: (message, responseCallback) => {
    console.log("Mock runtime.sendMessage called with:", message);
    if (responseCallback) {
      setTimeout(() => {
        responseCallback({ success: true, mock: true });
      }, 100);
    }
  },
  onMessage: {
    addListener: (callback) => {
      console.log("Mock runtime.onMessage.addListener called");
    }
  }
};
const mockTabs = {
  sendMessage: (tabId, message, responseCallback) => {
    console.log("Mock tabs.sendMessage called with:", { tabId, message });
    if (responseCallback) {
      setTimeout(() => {
        responseCallback({ success: true, mock: true });
      }, 100);
    }
  },
  query: (queryInfo, callback) => {
    console.log("Mock tabs.query called with:", queryInfo);
    callback([{ id: 1, url: window.location.href, title: document.title }]);
  }
};
export const getChromeApi = () => {
  if (isChromeExtension()) {
    return chrome;
  }
  return {
    storage: {
      sync: mockStorage,
      local: mockStorage
    },
    runtime: mockRuntime,
    tabs: mockTabs
    // 可以根据需要添加更多模拟 API
  };
};
export const getStorageApi = () => {
  if (isChromeExtension()) {
    return chrome.storage;
  }
  return {
    sync: mockStorage,
    local: mockStorage
  };
};
