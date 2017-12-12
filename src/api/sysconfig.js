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
//{"requestdata":{"token":"1","bcode":"0x12008"}}:
export function GetVideoDebug() {
  return fetch({
    url: '/channel/query',
    method: 'post',
    data:{
      "requestdata":{
        token:1,
        bcode:"0x12008"
      }
    }
  })
}

export function CommQuery(bcode) {
  return fetch({
    url: '/channel/query',
    method: 'post',
    data: {
      'requestdata': {
        token: 1,
        bcode: '' + bcode
      }
    }
  })
}
export function QueryChannel(chan) {
  return fetch({
    url: '/channel/query',
    method: 'post',
    data: {
      'requestdata': {
        token: 1,
        bcode: '0x12000',
        channel: chan
      }
    }
  })
}
export function OperChannel(code, chan) {
  return fetch({
    url: '/channel/query',
    method: 'post',
    data: {
      'requestdata': {
        token: 1,
        bcode: '' + code,
        channel: chan
      }
    }
  })
}
export function CommPost(para) {
  return fetch({
    url: '/channel/query',
    method: 'post',
    data: para
  })
}

export function PortSave(bcode, code) {
  return fetch({
    url: '/port/save',
    method: 'post',
    data: {
      'requestdata': {
        token: 1,
        bcode: '' + bcode,
        code: '' + code
      }
    }
  })
}

export function BasicSave(bcode, code) {
  return fetch({
    url: '/port/save',
    method: 'post',
    data: {
      'requestdata': {
        token: 1,
        bcode: '' + bcode,
        code: '' + code
      }
    }
  })
}

