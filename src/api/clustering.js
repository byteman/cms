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

