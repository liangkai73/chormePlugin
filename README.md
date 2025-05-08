# AI 助手 Chrome 插件

一个基于 AI 的 Chrome 插件，可以在网页中嵌入问答窗口，回答用户问题。

## 功能特点

- 在任何网页上显示 AI 助手窗口
- 通过 OpenAI API 回答用户问题
- 支持窗口拖动、最小化和关闭
- 上下文菜单支持，可以直接分析选中的文本
- 可自定义 API Key 和模型选择
- 可设置是否自动显示助手窗口

## 技术栈

- **前端框架**：React + TypeScript
- **构建工具**：Vite
- **CSS 框架**：Tailwind CSS
- **HTTP 请求**：Axios
- **Chrome API**：用于扩展功能实现

## 项目结构

```
ai-assistant-chrome-extension/
├── public/                  # 静态资源目录
│   └── icons/               # 图标文件
├── src/                     # 源代码目录
│   ├── components/          # React 组件
│   ├── services/            # 服务层
│   ├── utils/               # 工具函数
│   ├── background.ts        # 后台脚本
│   ├── content.tsx          # 内容脚本
│   ├── popup.tsx            # 弹出窗口脚本
│   └── index.css            # 全局样式
├── index.html               # 主 HTML 文件
├── manifest.json            # Chrome 插件配置文件
├── vite.config.ts           # Vite 配置
├── tailwind.config.js       # Tailwind CSS 配置
├── postcss.config.js        # PostCSS 配置
├── tsconfig.json            # TypeScript 配置
└── package.json             # 项目依赖和脚本
```

## 开发指南

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

## 安装插件

1. 运行 `npm run build` 构建项目
2. 打开 Chrome 浏览器，进入 `chrome://extensions/`
3. 开启 "开发者模式"
4. 点击 "加载已解压的扩展程序"
5. 选择项目的 `dist` 目录

## 使用指南

1. 安装插件后，点击插件图标可以显示/隐藏 AI 助手窗口
2. 在设置中配置您的 OpenAI API Key
3. 在助手窗口中输入问题，获取 AI 回答
4. 可以通过右键菜单选择文本并使用 AI 进行分析

## 注意事项

- 您需要拥有自己的 OpenAI API Key 才能使用本插件
- API Key 仅存储在您的浏览器中，不会被发送到其他任何地方
- 根据使用量，使用 OpenAI API 可能会产生费用

## 许可证

MIT 