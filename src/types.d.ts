// 扩展全局 Window 接口
interface Window {
  chrome: typeof chrome;
}

// 声明 Chrome API 的命名空间
declare namespace chrome {
  export namespace storage {
    export interface StorageArea {
      get(keys: string | string[] | object | null, callback: (items: { [key: string]: any }) => void): void;
      set(items: object, callback?: () => void): void;
      remove(keys: string | string[], callback?: () => void): void;
      clear(callback?: () => void): void;
    }
    
    export const sync: StorageArea;
    export const local: StorageArea;
  }
  
  export namespace runtime {
    export function getURL(path: string): string;
    export function openOptionsPage(): void;
    export function sendMessage(message: any, responseCallback?: (response: any) => void): void;
    export function sendMessage(extensionId: string, message: any, responseCallback?: (response: any) => void): void;
    
    export interface OnInstalledEvent {
      addListener(callback: (details: {
        reason: 'install' | 'update' | 'chrome_update' | 'shared_module_update';
        previousVersion?: string;
        id?: string;
      }) => void): void;
    }
    
    export interface OnMessageEvent {
      addListener(callback: (message: any, sender: MessageSender, sendResponse: (response?: any) => void) => boolean | void): void;
    }
    
    export const onInstalled: OnInstalledEvent;
    export const onMessage: OnMessageEvent;
  }
  
  export interface MessageSender {
    tab?: chrome.tabs.Tab;
    frameId?: number;
    id?: string;
    url?: string;
    tlsChannelId?: string;
  }
  
  export namespace tabs {
    export interface Tab {
      id?: number;
      index: number;
      pinned: boolean;
      highlighted: boolean;
      windowId: number;
      active: boolean;
      url?: string;
      title?: string;
      favIconUrl?: string;
      status?: string;
      incognito: boolean;
      audible?: boolean;
      width?: number;
      height?: number;
    }
    
    export function sendMessage(tabId: number, message: any, responseCallback?: (response: any) => void): void;
  }
  
  export namespace action {
    export interface OnClickedEvent {
      addListener(callback: (tab: chrome.tabs.Tab) => void): void;
    }
    
    export const onClicked: OnClickedEvent;
  }
  
  export namespace contextMenus {
    export function create(properties: {
      id?: string;
      title: string;
      contexts: string[];
      type?: 'normal' | 'checkbox' | 'radio' | 'separator';
      checked?: boolean;
    }, callback?: () => void): void;
    
    export interface OnClickedEvent {
      addListener(callback: (info: {
        menuItemId: string;
        selectionText?: string;
        checked?: boolean;
        frameUrl?: string;
        linkUrl?: string;
        pageUrl?: string;
      }, tab?: chrome.tabs.Tab) => void): void;
    }
    
    export const onClicked: OnClickedEvent;
  }
} 