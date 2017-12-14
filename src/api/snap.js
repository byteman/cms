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
