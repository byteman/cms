import fetch from '@/utils/fetch'

export function GetDeviceTrees(params) {
  return fetch({
    url: '/api/v1/devices/tree',
    method: 'get',
    params
  })
}

export function getDevices(page_num, page_size, org) {
  return fetch({
    url: '/api/v1/devices?' + 'page_num=' + page_num + '&page_size=' + page_size + '&org=' + org,
    method: 'get'
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