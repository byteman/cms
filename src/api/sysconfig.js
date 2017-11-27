import fetch from '@/utils/fetch'

export function GetSysConfigParam() {
  return fetch({
    url: '/api/v1/systemConfig',
    method: 'get'
  })
}

export function SetSysConfigParam(code) {
  return fetch({
    url: '/api/v1/systemConfig',
    method: 'post',
    data: code
  })
}

export function Restore(code) {
  return fetch({
    url: '/api/v1/restore',
    method: 'post',
    data: code
  })
}

export function GetStatus() {
  return fetch({
    url: '/api/v1/status',
    method: 'get'
  })
}