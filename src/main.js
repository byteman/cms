import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import App from './App'
import router from './router'
import store from './store'
import '@/icons' // icon
import '@/permission' // 权限
import * as filters from './filters' // global filter
import echarts from 'echarts'
Vue.use(ElementUI, { locale })
//Vue.directive('tooltip', VTooltip)

Vue.prototype.$echarts = echarts	// 注册echarts



// Vue.use(Element, {
//   i18n: (key, value) => i18n.t(key, value)
// })

// register global utility filters.
// Object.keys(filters).forEach(key => {
//   Vue.filter(key, filters[key])
// })
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
