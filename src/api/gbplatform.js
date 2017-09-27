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
    url: '/api/v1/gbplatforms/' + params.ID,
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
export function SyncGBPlatform(id) {
  return fetch({
    url: '/api/v1/gbplatforms/sync/' + id,
    method: 'get'
  })
}

export function GetGbDevices(page, page_size, params) {
  return fetch({
    url: '/api/v1/gbdevices?page=' + page + '&page_size=' + page_size,
    method: 'get',
    params
  })
}