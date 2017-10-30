import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import router from './router'
import store from './store'
import '@/icons' // icon
import '@/permission' // 权限
import { VTooltip } from 'v-tooltip'
import echarts from 'echarts'

Vue.directive('tooltip', VTooltip)
Vue.use(ElementUI)
Vue.prototype.$echarts = echarts	// 注册echarts

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
