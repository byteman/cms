import fetch from '@/utils/fetch'

export function GetEngineSettings() {
  return fetch({
    url: '/basic/query',
    method: 'post',
    data: {
      'requestdata': {
        'token': '1',
        'bcode': '0x12021'
      }
    }
  })
}

export function SetEngineSettings(six_flag, nationality_flag, ageMin, ageMax, skin_threshold, reg_score_threshold, live_score_threshold, score_for_add, score_for_minus) {
  return fetch({
    url: '/basic/save',
    method: 'post',
    data: {
      'requestdata': {
        'bcode': '0x12022',
        'token': '1',
        'six_flag': six_flag,
        'nationality_flag': nationality_flag,
        'ageMin': ageMin,
        'ageMax': ageMax,
        'skin_threshold': skin_threshold,
        'reg_score_threshold': reg_score_threshold,
        'live_score_threshold': live_score_threshold,
        'score_for_add': score_for_add,
        'score_for_minus': score_for_minus
      }
    }
  })
}
