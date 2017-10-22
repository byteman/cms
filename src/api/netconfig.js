import fetch from '@/utils/fetch'

export function GetNetConfigParam() {
  return fetch({
    url: '/api/v1/netConfig',
    method: 'get'
  })
}

export function SetNetConfigParam(code) {
  return fetch({
    url: '/api/v1/netConfig',
    method: 'post',
    data: code
  })
}