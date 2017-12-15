import fetch from '@/utils/fetch'

export function Page(current, pagesize, channel_id, identify_id, top1_scoreMin, starttime, endtime) {
  return fetch({
    url: '/snap/manage/page',
    method: 'post',
    data: {
      'requestdata': {
        'token': '1',
        'bcode': '0x12013',
        'index': current,
        'pagesize': pagesize,
        'channel_id': channel_id,
        'identify_id': identify_id,
        'top1_scoreMin': top1_scoreMin,
        'starttime': starttime,
        'endtime': endtime
      }
    }
  })
}

