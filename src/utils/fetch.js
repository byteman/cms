import axios from 'axios'
import {Message} from 'element-ui'
import store from '../store'
import { getToken, removeToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  // 打包之前修改
  baseURL: 'http://' + location.hostname + ':8887', // api的base_url
  //baseURL: process.env.BASE_API,
  timeout: 15000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['Authorization'] = getToken() // 让每个请求携带自定义token
  }
  return config
}, error => {
  Promise.reject(error)
});

// respone拦截器
service.interceptors.response.use(
  response => response,
    // {
    // console.log(response)
    // const res = response.data;
    // if (res.code !== 20000) {
    //   Message({
    //     message: res.message,
    //     type: 'error',
    //     duration: 5 * 1000
    //   });
    //   // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //     MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
    //       confirmButtonText: '重新登录',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('FedLogOut').then(() => {
    //         location.reload();// 为了重新实例化vue-router对象 避免bug
    //       });
    //     })
    //   }
    //   return Promise.reject('error');
    // } else {
    //   return response;
    // }
    // },
  error => {
    if (error.response.status === 401) {
      // 401 说明 token 验证失败
      // 可以直接跳转到登录页面，重新登录获取 token
      removeToken();
      location.href = '/login'
    }
    return Promise.reject(error)
  }
);

export default service
