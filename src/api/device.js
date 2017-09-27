import fetch from '@/utils/fetch'

export function GetDeviceTrees(params) {
  return fetch({
    url: '/api/v1/devices/tree',
    method: 'get',
    params
  })
}

export function getDevices(params) {
  return fetch({
    url: '/api/v1/devices',
    method: 'get',
    params
  })
}
export function RemoveDevice(params) {
  return fetch({
    url: '/api/v1/devices/' + params.id,
    method: 'delete'
  })
}
export function AddDevice(params) {
  return fetch({
    url: '/api/v1/devices',
    method: 'post',
    params
  })
}