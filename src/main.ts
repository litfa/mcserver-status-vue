import { createApp } from 'vue'
import App from './App.vue'
import router from './config/router'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'

createApp(App)
  .use(router)
  .use(createPinia())
  .mount('#app')