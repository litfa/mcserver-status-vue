import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/style/index.less'

import 'element-ui/lib/theme-chalk/index.css'

import {
  Row,
  Col,
  Card,
  Table,
  TableColumn,
  Popover
} from 'element-ui'

Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Popover)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
