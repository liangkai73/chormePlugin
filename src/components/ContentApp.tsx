import React, { useState } from 'react';
import AIAssistant from './AIAssistant';
import { Layout, Button, Typography, Tooltip } from 'antd';
import { CloseOutlined, SettingOutlined, ShrinkOutlined } from '@ant-design/icons';
import { getChromeApi, isChromeExtension } from '../utils/chromeApiMock';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const ContentApp: React.FC = () => {
  const [showSettings, setShowSettings] = useState(false);

  const handleClose = () => {
    const container = document.getElementById('ai-assistant-container');
    if (container) {
      container.style.display = 'none';
    }
  };

  const handleShrink = () => {
    // 隐藏助手容器
    const container = document.getElementById('ai-assistant-container');
    if (container) {
      container.style.display = 'none';
    }

    // 确保悬浮图标可见
    const floatingIcon = document.getElementById('ai-assistant-floating-icon');
    if (floatingIcon) {
      floatingIcon.style.display = 'block';
    } else {
      // 如果图标不存在，重新创建图标
      if (isChromeExtension()) {
        // 通过发送消息给内容脚本来创建图标
        const chromeApi = getChromeApi();
        chromeApi.runtime.sendMessage({ action: 'recreateFloatingIcon' });
      } else {
        // 开发环境下直接调用全局函数
        if (typeof window !== 'undefined' && window.createFloatingIcon) {
          window.createFloatingIcon();
        }
      }
    }
  };

  return (
    <Layout className="app-container">
      <Header className="app-header" style={{ display: 'flex', justifyContent: 'space-between',
         alignItems: 'center', color: 'white' }}>
        <Title level={4} style={{ margin: 0 }}>AI 助手</Title>
        <div>
          <Tooltip title="设置">
            <Button
              type="text"
              icon={<SettingOutlined />}
              onClick={() => setShowSettings(!showSettings)}
              style={{ marginRight: 8 }}
            />
          </Tooltip>
          <Tooltip title="收缩">
            <Button
              type="text"
              icon={<ShrinkOutlined />}
              onClick={handleShrink}
              style={{ marginRight: 8 }}
            />
          </Tooltip>
          <Tooltip title="关闭">
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={handleClose}
            />
          </Tooltip>
        </div>
      </Header>

      <Content className="app-content">
        <AIAssistant />
      </Content>

      <Footer className="app-footer">
        <Typography.Text type="secondary">AI Assistant v1.0.0</Typography.Text>
      </Footer>
    </Layout>
  );
};

export default ContentApp; 