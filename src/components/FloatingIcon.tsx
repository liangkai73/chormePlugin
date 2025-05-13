import React from 'react';
import { getChromeApi } from '../utils/chromeApiMock';

interface FloatingIconProps {
  onIconClick: () => void;
}

const FloatingIcon: React.FC<FloatingIconProps> = ({ onIconClick }) => {
  const chromeApi = getChromeApi();

  const handleClick = () => {
    // 隐藏悬浮图标
    const iconElement = document.getElementById('ai-assistant-floating-icon');
    if (iconElement) {
      iconElement.style.display = 'none';
    }
    
    // 调用传入的点击处理函数
    onIconClick();
  };

  // 获取图标URL
  const getIconUrl = () => {
    try {
      return chromeApi.runtime.getURL('icons/icon-48.png');
    } catch (error) {
      console.error('获取图标URL失败:', error);
      // 返回一个默认图标或内嵌SVG
      return 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm0-4h-2V7h2v8z"/></svg>';
    }
  };

  return (
    <div className="floating-icon" onClick={handleClick}>
      <img src={getIconUrl()} alt="AI 助手" />
    </div>
  );
};

export default FloatingIcon; 