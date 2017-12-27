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
const Preview = _import('preview/index')
const Algo = _import('algo/index')
const SysConfig = _import('sysconfig/index')
const ISPConfig = _import('isp/index')

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
    redirect: '/preview',
    name: 'Home',
    hidden: true,
    children: [{ path: 'preview', component: Preview }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
 {
    path: '/preview',
    component: Layout,
    redirect: '/preview/index',
    icon: 'service',
    noDropdown: true,
    children: [
      { path: 'index', component: Preview, name: '实时预览', meta: { role: ['admin'] }}
    ]
  },

  {
    path: '/algo',
    component: Layout,
    redirect: '/algo/index',
    icon: 'service',
    noDropdown: true,
    children: [
      { path: 'index', component: Algo, name: '算法参数', meta: { role: ['admin'] }},
    ]
  },
  {
    path: '/sysconfig',
    component: Layout,
    redirect: '/sysconfig/index',
    icon: 'config',
    noDropdown: true,
    children: [
      { path: 'index', component: SysConfig, name: '系统设置', meta: { role: ['admin'] }},
    ]
  },
  {
    path: '/isp',
    component: Layout,
    redirect: '/isp/index',
    icon: 'network36',
    noDropdown: true,
    children: [
      { path: 'index', component: ISPConfig, name: '图像设置', meta: { role: ['admin'] }},
    ]
  },
  // {
  //   path: '/cameraconfig',
  //   component: Layout,
  //   redirect: '/cameraconfig/index',
  //   icon: 'camera',
  //   noDropdown: true,
  //   children: [
  //     { path: 'index', component: CameraConfig, name: '相机设置', meta: { role: ['admin'] }},
  //   ]
  // },
  // {
  //   path: '/monitor',
  //   component: Layout,
  //   redirect: '/monitor/index',
  //   icon: 'camera',
  //   noDropdown: true,
  //   children: [
  //     { path: 'index', component: Monitor, name: '设备监控', meta: { role: ['admin'] }},
  //   ]
  // },
  // {
  //   path: '/hardinfo',
  //   component: Layout,
  //   redirect: '/hardinfo/index',
  //   icon: 'service',
  //   noDropdown: true,
  //   children: [{ path: 'index', component: HardInfo, name: '主机信息', meta: { role: ['admin'] }}]
  // },
  { path: '*', redirect: '/404', hidden: true }
]
