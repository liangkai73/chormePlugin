import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { crx } from '@crxjs/vite-plugin';
import path from 'path';
import fs from 'fs';

// 读取 manifest.json 文件
const manifest = JSON.parse(
  fs.readFileSync('./manifest.json', 'utf-8')
);

// 替代 __dirname 的方法
const __dirname = path.resolve();

export default defineConfig({
  plugins: [
    react(),
    crx({ manifest }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 移除additionalData，避免重复导入
      },
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        popup: path.resolve(__dirname, 'index.html'),
      },
    },
    assetsInlineLimit: 0, // 不要内联任何资源，保持所有文件的分离
  },
  esbuild: {
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
  },
}); 