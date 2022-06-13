import { createApp } from 'vue'
import App from './App.vue'
import router from './config/router'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'
import '@/assets/style/main.less'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/assets/theme/dark.less'
import '@/assets/theme/light.less'
import 'default-passive-events'

createApp(App)
  .use(router)
  .use(createPinia())
  .mount('#app')