import fetch from '@/utils/fetch'

export function login(username, password) {
  return fetch({
    url: '/login',
    method: 'post',
    data: {
      username,
      password
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
