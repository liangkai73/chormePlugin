import React, { useState, useRef, useEffect } from 'react';
import { Input, Button, List, Avatar, Typography, Spin, message } from 'antd';
import { SendOutlined, UserOutlined, RobotOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Text } = Typography;

interface Message {
  id: number;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 初始欢迎消息
  useEffect(() => {
    setMessages([
      {
        id: 1,
        content: '你好！我是AI助手，有什么可以帮助你的吗？',
        isUser: false,
        timestamp: new Date(),
      },
    ]);
  }, []);

  // 自动滚动到最新消息
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // 添加用户消息
    const userMessage: Message = {
      id: messages.length + 1,
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // 这里可以添加实际的API调用
      // 模拟API延迟
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 添加AI回复
      const aiResponse: Message = {
        id: messages.length + 2,
        content: `我收到了你的消息: "${inputValue}"。这是一个示例回复。`,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prevMessages => [...prevMessages, aiResponse]);
    } catch (error) {
      message.error('发送消息失败，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <List
        className="overflow-auto"
        style={{ flex: 1 }}
        itemLayout="horizontal"
        dataSource={messages}
        renderItem={message => (
          <List.Item style={{ padding: '8px 0' }}>
            <List.Item.Meta
              avatar={
                <Avatar 
                  icon={message.isUser ? <UserOutlined /> : <RobotOutlined />}
                  style={{ backgroundColor: message.isUser ? '#1890ff' : '#52c41a' }}
                />
              }
              title={message.isUser ? '你' : 'AI助手'}
              description={
                <div>
                  <Text>{message.content}</Text>
                  <div>
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      {message.timestamp.toLocaleTimeString()}
                    </Text>
                  </div>
                </div>
              }
            />
          </List.Item>
        )}
      />
      <div ref={messagesEndRef} />
      
      {isLoading && (
        <div style={{ textAlign: 'center', padding: '8px 0' }}>
          <Spin size="small" />
          <Text type="secondary" style={{ marginLeft: 8 }}>AI正在思考...</Text>
        </div>
      )}
      
      <div style={{ marginTop: 16, display: 'flex' }}>
        <TextArea
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="输入您的问题..."
          autoSize={{ minRows: 1, maxRows: 4 }}
          style={{ flex: 1 }}
        />
        <Button 
          type="primary" 
          icon={<SendOutlined />} 
          onClick={handleSendMessage}
          style={{ marginLeft: 8 }}
        />
      </div>
    </div>
  );
};

export default AIAssistant; 