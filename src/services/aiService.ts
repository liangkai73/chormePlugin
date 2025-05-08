import axios from 'axios';
import { getStorageApi } from '../utils/chromeApiMock';

interface AIConfig {
  apiKey: string;
  modelName: string;
}

// 从 Chrome Storage 获取 AI 配置
const getAIConfig = async (): Promise<AIConfig> => {
  const storage = getStorageApi();
  
  return new Promise((resolve) => {
    storage.sync.get(['apiKey', 'modelName'], (result) => {
      resolve({
        apiKey: result.apiKey || '',
        modelName: result.modelName || 'gpt-3.5-turbo',
      });
    });
  });
};

// 调用 AI 服务
export const callAIService = async (prompt: string): Promise<string> => {
  try {
    const config = await getAIConfig();
    
    if (!config.apiKey) {
      return '请先在设置中配置您的 API Key';
    }
    
    // 调用 OpenAI API
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: config.modelName,
        messages: [
          { role: 'system', content: '你是一个有用的助手，回答用户的问题简洁明了。' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.apiKey}`
        }
      }
    );
    
    return response.data.choices[0].message.content;
  } catch (error: any) {
    console.error('AI Service Error:', error);
    
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 401) {
        return 'API Key 无效，请检查您的设置';
      }
      return `请求错误: ${error.response.status} - ${error.response.data.error?.message || '未知错误'}`;
    }
    
    return '发生错误，请稍后再试';
  }
}; 