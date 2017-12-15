import fetch from '@/utils/fetch'

export function Query(bcode) {
  return fetch({
    url: '/port/query',
    method: 'post',
    data: {
      'requestdata': {
        token: 1,
        bcode: bcode
      }
    }
  })
}

export function RecordSave(favesave, fullsave) {
  return fetch({
    url: '/port/save',
    method: 'post',
    data: {
      'requestdata': {
        token: 1,
        bcode: '0x12012',
        fullsave: fullsave,
        facesave: favesave
      }
    }
  })
}

export function ConfigSave(encodetasksize) {
  return fetch({
    url: '/port/save',
    method: 'post',
    data: {
      'requestdata': {
        token: 1,
        bcode: '0x12012',
        encodetasksize: encodetasksize
      }
    }
  })
}

export function QuerySnapRecord(index, pagesize, starttime, endtime, camid, camname) {
  return fetch({
    url: '/snap/manage/page',
    method: 'post',
    data: {
      'requestdata': {
        token: 1,
        bcode: '0x12009',
        index: index,
        pagesize: pagesize,
        starttime: starttime,
        endtime: endtime,
        camid: camid,
        camname: camname
      }
    }
  })
}

export function Base64ToImage(base64) {
  return 'data:image/jpeg;base64,' + base64
}
