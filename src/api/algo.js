import fetch from '@/utils/fetch'

export function GetAlgoParam() {
  return fetch({
    url: '/api/v1/algo',
    method: 'get'
  })
}

export function SetAlgoParam(code) {
  return fetch({
    url: '/api/v1/algo',
    method: 'post',
    data: code
  })
}