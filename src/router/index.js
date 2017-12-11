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
const HardInfo = _import('hardinfo/index')
const Algo = _import('algo/index')
const VideoDebug = _import('sysconfig/index')
const SysConfig = _import('sysconfig/sysconfig')
const FaceDB = _import('sysconfig/facedb')
const FaceImg = _import('sysconfig/faceimg')
const Camera = _import('sysconfig/camera')
const NetConfig = _import('netconfig/index')
const CameraConfig = _import('cameraconfig/index');
const Monitor = _import('monitor/index');

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
    name: '参数配置',
    //noDropdown: true,
    children: [
      { path: 'index', component: VideoDebug, name: '抓拍诊断', meta: { role: ['admin'] }},
      { path: 'facedb', component: FaceDB, name: '底库管理', meta: { role: ['admin'] }},
      { path: 'faceimg', component: FaceImg, name: '底库照片管理', meta: { role: ['admin'] }},
      { path: 'camera', component: Camera, name: '摄像头管理', meta: { role: ['admin'] }},
      { path: 'system', component: SysConfig, name: '系统管理', meta: { role: ['admin'] }},
    ]
  },
  
  { path: '*', redirect: '/404', hidden: true }
]
