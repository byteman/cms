import axios from 'axios'
import {
  Message
} from 'element-ui'
import store from '../store'
import { getToken, removeToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: 'http://' + location.hostname + ':8000', // api的base_url
  // baseURL: process.env.BASE_API,
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => response,
  error => {
    console.log('err' + error) // for debug
    if (error.response.status === 401) {
      // 401 说明 token 验证失败
      // 可以直接跳转到登录页面，重新登录获取 token
      removeToken()
      location.href = '/login'
    } else {
      // do something
      // Message({
      //   message: error.message,
      //   type: 'error',
      //   duration: 1 * 1000
      // })
    }
    return Promise.reject(error)
  }
)

export default service
