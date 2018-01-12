import fetch from '@/utils/fetch'

// 登录
export function login(username, password) {
  return fetch({
    url: '/user/signin',
    method: 'post',
    data: {
      "requestdata": {
        "bcode": "0x10001",
        "account": username,
        "password": password
      }
    }
  })
}

// 获取角色信息
export function getInfo(token) {
  return fetch({
    url: '/api/v1/user/info',
    method: 'get',
    data: token
  })
}

// 退出
export function logout() {
  return fetch({
    url: '/api/v1/user/logout',
    method: 'post',
    // data: {}
  })
}
