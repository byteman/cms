import fetch from '@/utils/fetch'

export function GetISP() {
  return fetch({
    url: '/isp/control',
    method: 'get'
  })
}

export function SetISP(config) {
  return fetch({
    url: '/isp/control',
    method: 'post',
    data: config
  })
}
