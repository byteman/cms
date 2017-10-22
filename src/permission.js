import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { getToken } from '@/utils/auth' // 验权

const whiteList = ['/login','/api/v1/algo']
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) { 
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (store.getters.roles.length === 0) {
        console.log("has token 444")
        store.dispatch('GetInfo').then(res => {
         
          const roles = res.data.role
          console.log("has token 77")
          store.dispatch('GenerateRoutes', { roles }).then(() => {
            router.addRoutes(store.getters.addRouters)
            next({ ...to })
          })
        })
      } else {
        console.log("has token 55")
        next()
      }
    }
  } else {
    console.log("no token to->",to.path)
    if (whiteList.indexOf(to.path) !== -1) {
      console.log(to.path, "in whiteList allow !!")
      next()
    } else {
      console.log("not allow",to.path,"goto /login")
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
