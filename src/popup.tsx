import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';

// 引入 Ant Design 样式 - 仅在弹出窗口中需要
import 'antd/dist/reset.css';

// 引入全局样式
import './styles/global.scss';

// 引入Ant Design ConfigProvider
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 4,
        },
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>
); 