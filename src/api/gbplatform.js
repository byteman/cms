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
    data: params
  })
}
export function UpdateGBPlatform(params) {
  return fetch({
    url: '/api/v1/gbplatforms',
    method: 'put',
    data: params
  })
}
export function SyncGBPlatform(id) {
  return fetch({
    url: '/api/v1/gbplatforms/sync/' + id,
    method: 'get'
  })
}

export function GetGbDevices(params) {
  return fetch({
    // url: '/api/v1/gbdevices?page=' + page + '&page_size=' + page_size,
    url: '/api/v1/gbdevices',
    method: 'get',
    params
  })
}
export function SyncGBDevice(plat_id, dev_id) {
  return fetch({
    url: '/api/v1/gbdevices/sync/' + plat_id + '/' + dev_id,
    method: 'get'
  })
}
