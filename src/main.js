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

// 百度统计
var _hmt = ''
_hmt = _hmt || []
window._hmt = _hmt;
(function () {
  var hm = document.createElement('script')
  hm.src = 'https://hm.baidu.com/hm.js?5eb898827632a38c10ec645df290989a'
  var s = document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(hm, s)
})()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
