import fetch from '@/utils/fetch'

export function GetGbPlatform(params) {
  return fetch({
    url: '/api/v1/gbplatforms',
    method: 'get',
    params
  })
}
export function RemoveGbPlatform(params) {
  return fetch({
    url: '/api/v1/gbplatforms/' + params.id,
    method: 'delete'
  })
}
export function AddGBPlatform(params) {
  return fetch({
    url: '/api/v1/gbplatforms',
    method: 'post',
    params
  })
}
