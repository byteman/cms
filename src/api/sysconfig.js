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

export function GetVideoDebug() {
  return fetch({
    url: '/channel/query',
    method: 'post',
    data: {
      'requestdata': {
        token: 1,
        bcode: '0x12008'
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

export function Modify(para) {
  return fetch({
    url: '/channel/modify',
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

export function GetGroup(code) {
  return fetch({
    url: '/test/abc',
    method: 'post',
    data: {
      'requestdata': {
        token: 1,
        bcode: '' + code
      }
    }
  })
}

export function NewDB(para) {
  return fetch({
    url: '/test/abc',
    method: 'post',
    data: para
  })
}

export function RemoveGroup(id) {
  return fetch({
    url: '/test/abc',
    method: 'post',
    data: {
      'requestdata': {
        token: 1,
        bcode: '80002',
        group_id: id
      }
    }
  })
}

export function QueryFaceList(index, pagesize, starttime, endtime, staticDBId, userId) {
  return fetch({
    url: '/snap/manage/page',
    method: 'post',
    data: {
      'requestdata': {
        token: '1',
        bcode: '80006',
        index: index,
        pagesize: pagesize,
        starttime: starttime,
        endtime: endtime,
        staticDBId: staticDBId,
        userId: userId
      }
    }
  })
}

export function DeleteFace(staticDBId, id) {
  return fetch({
    url: '/v1/platform/staticdb/ext/removeFace',
    method: 'post',
    data: {
      staticDBId: staticDBId,
      id: id
    }
  })
}

export function AddFace(staticDBId ,img, birthday, gender, name) {
  return fetch({
    url: '/v1/platform/staticdb/ext/addFace',
    method: 'post',
    data: {
      staticDBId: staticDBId,
      img: img,
      birthday: birthday,
      gender: gender,
      name: name,
      userId: '.jpg'
    }
  })
}
