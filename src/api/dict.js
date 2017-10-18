import fetch from '@/utils/fetch'

export function GetDictsByCode(code) {
  return fetch({
    url: '/api/v1/dict/getDictsByCode/' + code,
    method: 'get'
  })
}

export function GetOrgById(code) {
  return fetch({
    url: '/api/v1/org/' + code,
    method: 'get'
  })
}