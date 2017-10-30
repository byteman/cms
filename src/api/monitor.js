import fetch from '@/utils/fetch'

export function getDiscData(code) {
  return fetch({
    url: '/api/v1/getDiscData',
    method: 'post',
    data: code
  })
}

export function getMemorySize(code) {
  return fetch({
    url: '/api/v1/getMemorySize',
    method: 'post',
    data: code
  })
}

export function getLineData(code) {
  return fetch({
    url: '/api/v1/getLineData',
    method: 'post',
    data: code
  })
}
