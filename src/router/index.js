import Vue from 'vue'
import Router from 'vue-router'
/* layout */
import Layout from '../views/layout/Layout'

const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

/* login */
const Login = _import('login/index');

/* dashboard */
const dashboard = _import('dashboard/index');

/* error page */
const Err404 = _import('404');

/* demo page */
const Preview = _import('preview/index');

const VideoDebug = _import('sysconfig/index');
const SysConfig = _import('sysconfig/sysconfig');
const FaceDB = _import('sysconfig/facedb');
const FaceImg = _import('sysconfig/faceimg');
const Camera = _import('sysconfig/camera');
const SnapConfig = _import('snap/config');
const SnapRecord = _import('snap/record');
const RecogRecod = _import('recog/recogrecod');
const Clustering = _import('recog/clustering');
const Engine_Settings = _import('recog/envsettings');
const Engine_System_Settings = _import('recog/envsystemsettings');
Vue.use(Router)

/**
 * icon : the icon show in the sidebar
 * hidden : if `hidden:true` will not show in the sidebar
 * redirect : if `redirect:noredirect` will not redirct in the levelbar
 * noDropdown : if `noDropdown:true` will not has submenu in the sidebar
 * meta : `{ role: ['admin'] }`  will control the page role
 **/
export const constantRouterMap = [
  {path: '/login', component: Login, hidden: true},
  {path: '/404', component: Err404, hidden: true},
  {
    path: '/',
    component: Layout,
    redirect: '/preview',
    name: 'Home',
    hidden: true,
    children: [{path: 'dashboard', component: dashboard}]
  }
];

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/preview',
    component: Layout,
    redirect: '/preview/index',
    icon: 'service',
    noDropdown: true,
    // name: '实时预览',
    children: [
      {path: 'index', component: Preview, name: '实时预览', meta: {role: ['admin']}}
    ]
  },
  {
    path: '/sysconfig',
    component: Layout,
    redirect: '/sysconfig/index',
    icon: 'config',
    name: '参数配置',
    children: [
      {path: 'index', component: VideoDebug, name: '抓拍诊断', meta: {role: ['admin']}},
      {path: 'facedb', component: FaceDB, name: '底库管理', meta: {role: ['admin']}},
      {path: 'faceimg', component: FaceImg, name: '底库照片管理', meta: {role: ['admin']}},
      {path: 'camera', component: Camera, name: '摄像头管理', meta: {role: ['admin']}},
      {path: 'system', component: SysConfig, name: '系统管理', meta: {role: ['admin']}}
    ]
  },
  {
    path: '/snap',
    component: Layout,
    redirect: '/snap/record',
    icon: 'camera',
    name: '抓拍配置',
    children: [
      {path: 'record', component: SnapRecord, name: '抓拍记录', meta: {role: ['admin']}},
      // {path: 'config', component: SnapConfig, name: '抓拍设置', meta: {role: ['admin']}}
    ]
  },
  {
    path: '/recognize',
    component: Layout,
    redirect: '/recognize/index',
    icon: 'config',
    name: '识别配置',
    children: [
      {path: 'recog_recod', component: RecogRecod, name: '识别记录', meta: {role: ['admin']}},
      // {path: 'clustering', component: Clustering, name: '频次分析', meta: {role: ['admin']}},
      // {path: 'engine_settings', component: Engine_Settings, name: '引擎设置', meta: {role: ['admin']}},
      // {path: 'engine_system_settings', component: Engine_System_Settings, name: '引擎系统操作', meta: {role: ['admin']}}
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
]
