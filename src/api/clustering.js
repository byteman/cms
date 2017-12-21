import fetch from '@/utils/fetch'

export function Page(current, pagesize) {
  return fetch({
    url: '/snap/manage/page',
    method: 'post',
    data: {
      'requestdata': {
        'token': '1',
        'bcode': '0x12015',
        'index': current,
        'pagesize': pagesize
      }
    }
  })
}

export function Export() {
  return fetch({
    url: '/channel/list',
    method: 'post',
    data: {
      'requestdata': {
        'token': '1',
        'bcode': '0x1203A'
      }
    }
  })
}

export function HiddenOrCancel(num, list, flg) {
  return fetch({
    url: '/channel/list',
    method: 'post',
    data: {
      'requestdata': {
        'token': '1',
        'bcode': '0x12016',
        'num': num,
        're_screen': flg,
        'live_id': list
      }
    }
  })
}

