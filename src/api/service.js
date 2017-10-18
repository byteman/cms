import fetch from '@/utils/fetch'

export function getServices(params) {
  return fetch({
    url: '/api/v1/services',
    method: 'get',
    params
  })
}
export function AddService(params) {
  return fetch({
    url: '/api/v1/services',
    method: 'post',
    params
  })
}
export function RemoveService(id) {
  return fetch({
    url: '/api/v1/services/'+id,
    method: 'delete'
  })
}
export function StopService(url) {
  return fetch({
    baseurl: '',
    url: url,
    method: 'delete'
  })
}