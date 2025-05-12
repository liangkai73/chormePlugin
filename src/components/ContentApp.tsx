import React, { useState } from 'react';
import AIAssistant from './AIAssistant';
import { Layout, Button, Typography, Tooltip } from 'antd';
import { CloseOutlined, SettingOutlined } from '@ant-design/icons';

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

  return (
    <Layout className="app-container">
      <Header className="app-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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