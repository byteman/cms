import fetch from '@/utils/fetch'

export function login(username, password) {
  return fetch({
    url: '/smart/business',
    method: 'post',
    data: {
      "requestdata" : {
        "bcode":"0x10001",
        "token":"1",
        "account":username,
        "password":password
      }
    }
  })
}

export function getInfo(token) {
  return fetch({
    url: '/api/v1/user/info',
    method: 'get',
    data: token
  })
}

export function logout() {
  return fetch({
    url: '/api/v1/user/logout',
    method: 'post'
  })
}
