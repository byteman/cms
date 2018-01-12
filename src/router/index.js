import Vue from 'vue'
import Router from 'vue-router'

/* layout */
import Layout from '../views/layout/Layout'

const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

/* login */
const Login = _import('login/index');

/* dashboard */
// const dashboard = _import('dashboard/index');
const dashboard = resolve => require(['../views/dashboard/index'], resolve);

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
// 所有权限通用路由表
// 共用页面不需要权限控制
export const constantRouterMap = [
  {path: '/login', component: Login, hidden: true},
  {
    path: '/',
    component: Layout,
    redirect: '/preview/index',
    name: '',
    hidden: true,
    children: [{path: 'dashboard', component: dashboard}]
  }
];

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

//  异步挂载的路由
//  动态需要根据权限加载的路由表
export const asyncRouterMap = [
  {
    path: '/preview',
    component: Layout,
    redirect: '/preview/index',
    icon: 'preview',
    noDropdown: true,
    // name: '实时预览',
    children: [
      {path: 'index', component: Preview, name: '实时预览', meta: {role: ['normal','superuser']}}
    ]
  },
  {
    path: '/sysconfig',
    component: Layout,
    redirect: '/sysconfig/index',
    icon: 'takeSet',
    name: '参数配置',
    children: [
      {path: 'index', component: VideoDebug, name: '抓拍诊断', meta: {role: ['normal','superuser']}},
      {path: 'facedb', component: FaceDB, name: '底库管理', meta: {role: ['normal','superuser']}},
      {path: 'faceimg', component: FaceImg, name: '底库照片管理', meta: {role: ['normal','superuser']}},
      {path: 'camera', component: Camera, name: '摄像头管理', meta: {role: ['normal','superuser']}},
      {path: 'system', component: SysConfig, name: '系统管理', meta: {role: ['normal','superuser']}}
    ]
  },
  {
    path: '/snap',
    component: Layout,
    redirect: '/snap/record',
    icon: 'photoSet',
    name: '抓拍配置',
    children: [
      {path: 'record', component: SnapRecord, name: '抓拍记录', meta: {role: ['normal','superuser']}},
      // {path: 'config', component: SnapConfig, name: '抓拍设置', meta: {role: ['superuser']}}
    ]
  },
  {
    path: '/recognize',
    component: Layout,
    redirect: '/recognize/index',
    icon: 'recognition',
    name: '识别配置',
    children: [
      {path: 'recog_recod', component: RecogRecod, name: '识别记录', meta: {role: ['normal','superuser']}},
      // {path: 'clustering', component: Clustering, name: '频次分析', meta: {role: ['superuser']}},
      // {path: 'engine_settings', component: Engine_Settings, name: '引擎设置', meta: {role: ['superuser']}},
      // {path: 'engine_system_settings', component: Engine_System_Settings, name: '引擎系统操作', meta: {role: ['superuser']}}
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
]
