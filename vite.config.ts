import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 7777, // 设置服务启动端口号
    open: true, // 设置服务启动时是否自动打开浏览器
    cors: true, // 允许跨域
    proxy: {
      '/v2': {
        target: 'http://api.douban.com',
        changeOrigin: true,
        ws: true
      },
      '/view': {
        target: 'http://img9.doubanio.com',
        changeOrigin: true,
        ws: true
      },
      '/v1': {
        target: 'https://api.wmdb.tv/api',
        changeOrigin: true,
        ws: true
      }
    }
  }
})
