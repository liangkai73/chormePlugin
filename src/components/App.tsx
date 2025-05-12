import React, { useState } from 'react';
import AIAssistant from './AIAssistant';
import SettingsPanel from './SettingsPanel';
import { Layout, Menu, Typography } from 'antd';
import { MessageOutlined, SettingOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'assistant' | 'settings'>('assistant');

  const handleMenuClick = (key: string) => {
    setActiveTab(key as 'assistant' | 'settings');
  };

  return (
    <Layout className="app-container">
      <Header className="app-header">
        <Title level={4} style={{ margin: 0 }}>AI Assistant</Title>
      </Header>
      
      <Menu
        mode="horizontal"
        selectedKeys={[activeTab]}
        onClick={({ key }) => handleMenuClick(key)}
        items={[
          {
            key: 'assistant',
            icon: <MessageOutlined />,
            label: 'AI助手',
          },
          {
            key: 'settings',
            icon: <SettingOutlined />,
            label: '设置',
          },
        ]}
      />
      
      <Content className="app-content">
        {activeTab === 'assistant' ? (
          <AIAssistant />
        ) : (
          <SettingsPanel />
        )}
      </Content>
      
      <Footer className="app-footer">
        <Typography.Text type="secondary">AI Assistant v1.0.0</Typography.Text>
      </Footer>
    </Layout>
  );
};

export default App; 