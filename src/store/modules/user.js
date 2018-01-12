import {login, logout, getInfo} from '@/api/login'
import {getToken, setToken, removeToken} from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    // avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    // SET_AVATAR: (state, avatar) => {
    //   state.avatar = avatar
    // },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({commit}, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          console.log("我接收到返回值了哦！");
          const resData = response.data;
          console.log(resData.data.token);
          if (resData.status === 0) {
            commit('SET_TOKEN', resData.data.token);
            setToken(resData.data.token);
          }
          if (resData.status === 1) {
            this.$message('用户名或密码错误！请重新输入')
            // return;
          }
          resolve()
        }).catch(error => {
          // console.log("捕获到", error)
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({commit, state}) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          debugger;
          if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('error')
          }
          const resData = response.data
          console.log(resData);
          commit('SET_ROLES', resData.userType)
          commit('SET_NAME', resData.name)
          // commit('SET_AVATAR', resData.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({commit, state}) {
      console.log('到这里面');
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken();
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // // 前端 登出
    // FedLogOut({commit}) {
    //   return new Promise(resolve => {
    //     commit('SET_TOKEN', '')
    //     removeToken()
    //     resolve()
    //   })
    // }
  }
}

export default user
