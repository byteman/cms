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

export function List(channel_id, live_id, timeStamp) {
  return fetch({
    url: '/channel/list',
    method: 'post',
    data: {
      'requestdata': {
        'token': '1',
        'bcode': '0x12027',
        'channel_id': channel_id + "",
        'live_id': live_id + "",
        'timeStamp': timeStamp
      }
    }
  })
}


export function Special(iflag, bcode, channel_id, live_id, reg_id) {
  return fetch({
    url: '/channel/list',
    method: 'post',
    data: {
      'requestdata': {
        'token': '1',
        'bcode': bcode + "",
        'iflag': iflag + "",
        'live_id': live_id + "",
        'reg_id': reg_id + "",
        'channel_id': channel_id + "",
        'registered_id': reg_id + "",
      }
    }
  })
}
