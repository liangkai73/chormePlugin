import React, { useState } from 'react';
import AIAssistant from './AIAssistant';
import SettingsPanel from './SettingsPanel';
import { Layout, Menu, Typography, Button, Tooltip } from 'antd';
import { MessageOutlined, SettingOutlined, CloseOutlined, ShrinkOutlined } from '@ant-design/icons';
import { getChromeApi, isChromeExtension } from '../utils/chromeApiMock';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'assistant' | 'settings'>('assistant');
  
  // 判断当前环境是否为内容脚本环境
  const isContentScript = typeof document !== 'undefined' && 
                         document.getElementById('ai-assistant-container') !== null;

  const handleMenuClick = (key: string) => {
    setActiveTab(key as 'assistant' | 'settings');
  };

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

  // 内容脚本环境使用的布局
  if (isContentScript) {
    return (
      <Layout className="app-container">
        <Header className="app-header" style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          <Title level={4} style={{ margin: 0 }}>AI 助手</Title>
          <div>
            <Tooltip title="设置">
              <Button
                type="text"
                icon={<SettingOutlined />}
                onClick={() => setActiveTab(activeTab === 'assistant' ? 'settings' : 'assistant')}
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
          {activeTab === 'assistant' ? (
            <AIAssistant />
          ) : (
            <SettingsPanel />
          )}
        </Content>

        <Footer className="app-footer">
          <Typography.Text type="secondary">AI Assistant v1.0.1</Typography.Text>
        </Footer>
      </Layout>
    );
  }
  
  // 弹出窗口环境使用的布局
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
        <Typography.Text type="secondary">AI Assistant v1.0.1</Typography.Text>
      </Footer>
    </Layout>
  );
};

export default App; 