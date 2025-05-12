import React, { useState, useEffect } from 'react';
import { Form, Switch, Input, Button, Select, Divider, Card, Typography, message, Space, Tag } from 'antd';
import { SaveOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import { getChromeApi } from '../utils/chromeApiMock';

const { Option } = Select;
const { Title, Text } = Typography;

const SettingsPanel: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [domainInput, setDomainInput] = useState('');
  const [allowedDomains, setAllowedDomains] = useState<string[]>([]);
  const chromeApi = getChromeApi();

  // 加载设置
  useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoading(true);
        chromeApi.storage.sync.get(
          [
            'apiKey',
            'language',
            'enableAutoDisplay',
            'theme',
            'maxTokens',
            'allowedDomains'
          ],
          (result) => {
            form.setFieldsValue({
              apiKey: result.apiKey || '',
              language: result.language || 'zh-CN',
              enableAutoDisplay: result.enableAutoDisplay !== false,
              theme: result.theme || 'auto',
              maxTokens: result.maxTokens || 2000
            });
            setAllowedDomains(result.allowedDomains || [
              'example.com',
              'google.com',
              'baidu.com'
            ]);
            setLoading(false);
          }
        );
      } catch (error) {
        console.error('加载设置失败:', error);
        setLoading(false);
      }
    };

    loadSettings();
  }, [form, chromeApi.storage.sync]);

  // 保存设置
  const handleSaveSettings = async (values: any) => {
    try {
      setLoading(true);
      // 将域名列表与表单值合并
      const allSettings = {
        ...values,
        allowedDomains
      };
      chromeApi.storage.sync.set(allSettings, () => {
        message.success('设置已保存');
        setLoading(false);
      });
    } catch (error) {
      console.error('保存设置失败:', error);
      message.error('保存设置失败');
      setLoading(false);
    }
  };

  // 重置设置
  const handleResetSettings = () => {
    form.resetFields();
    setAllowedDomains([
      'example.com',
      'google.com',
      'baidu.com'
    ]);
    message.info('设置已重置');
  };

  // 添加域名
  const handleAddDomain = () => {
    if (domainInput && !allowedDomains.includes(domainInput)) {
      setAllowedDomains([...allowedDomains, domainInput]);
      setDomainInput('');
    }
  };

  // 删除域名
  const handleRemoveDomain = (domain: string) => {
    setAllowedDomains(allowedDomains.filter(d => d !== domain));
  };

  return (
    <div>
      <Card bordered={false}>
        <Title level={5}>设置</Title>
        <Text type="secondary">自定义AI助手的行为和外观</Text>
        
        <Divider />
        
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSaveSettings}
          initialValues={{
            language: 'zh-CN',
            enableAutoDisplay: true,
            theme: 'auto',
            maxTokens: 2000
          }}
        >
          <Form.Item
            name="apiKey"
            label="API 密钥"
            rules={[{ required: true, message: '请输入API密钥' }]}
          >
            <Input.Password placeholder="输入您的API密钥" />
          </Form.Item>

          <Form.Item name="language" label="语言">
            <Select>
              <Option value="zh-CN">中文 (简体)</Option>
              <Option value="en-US">English</Option>
              <Option value="ja-JP">日本語</Option>
            </Select>
          </Form.Item>

          <Form.Item name="theme" label="主题">
            <Select>
              <Option value="light">浅色</Option>
              <Option value="dark">深色</Option>
              <Option value="auto">跟随系统</Option>
            </Select>
          </Form.Item>

          <Form.Item name="maxTokens" label="最大令牌数">
            <Select>
              <Option value={1000}>1000</Option>
              <Option value={2000}>2000</Option>
              <Option value={4000}>4000</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="enableAutoDisplay"
            label="自动显示"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          
          <Form.Item label="允许显示悬浮图标的域名">
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>
                <Input
                  placeholder="输入域名 (example.com)"
                  value={domainInput}
                  onChange={e => setDomainInput(e.target.value)}
                  onPressEnter={handleAddDomain}
                  style={{ width: 'calc(100% - 60px)' }}
                />
                <Button type="primary" icon={<PlusOutlined />} onClick={handleAddDomain} style={{ marginLeft: 8 }}>
                  添加
                </Button>
              </div>
              <div style={{ marginTop: 8 }}>
                {allowedDomains.map(domain => (
                  <Tag
                    key={domain}
                    closable
                    onClose={() => handleRemoveDomain(domain)}
                    style={{ margin: '4px 4px 4px 0' }}
                  >
                    {domain}
                  </Tag>
                ))}
              </div>
            </Space>
          </Form.Item>

          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button 
                type="default" 
                icon={<ReloadOutlined />} 
                onClick={handleResetSettings}
              >
                重置
              </Button>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                icon={<SaveOutlined />}
              >
                保存
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default SettingsPanel; 