import React, { useState, useEffect } from 'react';
import { getStorageApi } from '../utils/chromeApiMock';

interface Settings {
  apiKey: string;
  modelName: string;
  enableAutoDisplay: boolean;
}

const SettingsPanel: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    apiKey: '',
    modelName: 'gpt-3.5-turbo',
    enableAutoDisplay: true,
  });
  
  const [status, setStatus] = useState<string>('');
  // 使用我们的工具函数获取存储 API
  const storage = getStorageApi();

  useEffect(() => {
    // 从 Chrome 存储中加载设置
    storage.sync.get(['apiKey', 'modelName', 'enableAutoDisplay'], (result) => {
      setSettings({
        apiKey: result.apiKey || '',
        modelName: result.modelName || 'gpt-3.5-turbo',
        enableAutoDisplay: result.enableAutoDisplay === undefined ? true : result.enableAutoDisplay,
      });
    });
  }, []);

  const handleSave = () => {
    // 保存到 Chrome 存储
    storage.sync.set(settings, () => {
      setStatus('设置已保存！');
      setTimeout(() => setStatus(''), 3000);
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    
    setSettings((prev) => ({
      ...prev,
      [name]: isCheckbox 
        ? (e.target as HTMLInputElement).checked 
        : value,
    }));
  };

  return (
    <div className="p-4 bg-white rounded border">
      <h2 className="text-xl font-semibold mb-4">设置</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          API Key
        </label>
        <input
          type="password"
          name="apiKey"
          value={settings.apiKey}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="输入您的 API Key"
        />
        <p className="text-xs text-gray-500 mt-1">
          API Key 将安全地存储在您的浏览器中
        </p>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          模型
        </label>
        <select
          name="modelName"
          value={settings.modelName}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="gpt-3.5-turbo">GPT-3.5-Turbo</option>
          <option value="gpt-4">GPT-4</option>
        </select>
      </div>
      
      <div className="mb-4">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            name="enableAutoDisplay"
            checked={settings.enableAutoDisplay}
            onChange={handleChange}
            className="rounded text-blue-500 focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">
            自动显示问答窗口
          </span>
        </label>
        <p className="text-xs text-gray-500 mt-1 ml-6">
          启用后，当用户访问网页时自动显示问答窗口
        </p>
      </div>
      
      <button
        onClick={handleSave}
        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        保存设置
      </button>
      
      {status && (
        <div className="mt-4 p-2 bg-green-100 text-green-700 rounded text-center">
          {status}
        </div>
      )}
    </div>
  );
};

export default SettingsPanel; 