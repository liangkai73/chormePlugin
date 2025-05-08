import React, { useState, useEffect } from 'react';
import AIAssistant from './AIAssistant';
import { getStorageApi } from '../utils/chromeApiMock';

const ContentApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  
  // 使用我们的工具函数获取存储 API
  const storage = getStorageApi();
  
  // 初始化时检查设置
  useEffect(() => {
    storage.sync.get(['enableAutoDisplay'], (result) => {
      setIsOpen(result.enableAutoDisplay !== false);
    });
  }, []);

  if (!isOpen) return null;

  return (
    <div className="bg-white w-full h-full flex flex-col rounded-lg overflow-hidden shadow-lg">
      <div 
        className="bg-blue-600 text-white p-2 flex justify-between items-center cursor-move"
        onMouseDown={(e) => {
          // 拖动逻辑可以在这里实现
        }}
      >
        <span className="font-medium">AI 助手</span>
        <div className="flex space-x-2">
          <button 
            onClick={() => setIsMinimized(!isMinimized)} 
            className="p-1 hover:bg-blue-500 rounded"
          >
            {isMinimized ? '□' : '_'}
          </button>
          <button 
            onClick={() => setIsOpen(false)} 
            className="p-1 hover:bg-blue-500 rounded"
          >
            ✕
          </button>
        </div>
      </div>
      
      {!isMinimized && (
        <div className="flex-1 overflow-hidden p-4">
          <AIAssistant />
        </div>
      )}
    </div>
  );
};

export default ContentApp; 