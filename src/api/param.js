import fetch from '@/utils/fetch'

export function GetParams(subj) {
  return fetch({
    url: '/api/v1/params/' + subj,
    method: 'get'
  })
}
export function SaveParams(subj, params) {
  return fetch({
    url: '/api/v1/devices/' + subj,
    method: 'post',
    params
  })
}