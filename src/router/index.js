import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

/* layout */
import Layout from '../views/layout/Layout'

/* login */
const Login = _import('login/index')

/* dashboard */
const dashboard = _import('dashboard/index')

/* error page */
const Err404 = _import('404')

/* demo page */
const Form = _import('page/form')
const Service = _import('service/index')
const Device = _import('device/index')
const Param = _import('param/index')
const GBPlatform = _import('gbplatform/index')
const GBDevice = _import('gbdevice/index')
Vue.use(Router)

 /**
  * icon : the icon show in the sidebar
  * hidden : if `hidden:true` will not show in the sidebar
  * redirect : if `redirect:noredirect` will not redirct in the levelbar
  * noDropdown : if `noDropdown:true` will not has submenu in the sidebar
  * meta : `{ role: ['admin'] }`  will control the page role
  **/
export const constantRouterMap = [
  { path: '/login', component: Login, hidden: true },
  { path: '/404', component: Err404, hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Home',
    hidden: true,
    children: [{ path: 'dashboard', component: dashboard }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'Example',
  //   icon: 'zujian',
  //   children: [
  //     { path: 'index', component: Form, name: 'Form', icon: 'zonghe' }
  //   ]
  // },

  {
    path: '/service',
    component: Layout,
    redirect: '/service/index',
    icon: 'service',
    noDropdown: true,
    children: [
      { path: 'index', component: Service, name: '服务管理', meta: { role: ['admin'] }},
      { path: 'param/:id', component: Param, name: '参数配置', meta: { role: ['admin'] }}
    ]
  },
  {
    path: '/device',
    component: Layout,
    redirect: '/device/index',
    icon: 'camera',
    noDropdown: true,
    children: [{ path: 'index', component: Device, name: '设备管理', meta: { role: ['admin'] }}]
  },
  {
    path: '/gbplatform',
    component: Layout,
    redirect: '/gbplatform/index',
    icon: 'platform',
    noDropdown: true,
    children: [{ path: 'index', component: GBPlatform, name: '国标平台', meta: { role: ['admin'] }}]
  },
  {
    path: '/gbdevice',
    component: Layout,
    redirect: '/gbdevice/index',
    icon: 'camera',
    noDropdown: true,
    children: [{ path: 'index', component: GBDevice, name: '国标设备', meta: { role: ['admin'] }}]
  },
  { path: '*', redirect: '/404', hidden: true }
]
