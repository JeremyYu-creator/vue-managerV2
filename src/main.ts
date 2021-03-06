import { createApp } from 'vue'
import App from './App.vue'
import { store, key } from './store/index'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import '../permission'

const app = createApp(App)
app
  .use(router)
  .use(store, key)
  .use(ElementPlus, { locale })
  .mount('#app')
