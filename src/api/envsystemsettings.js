import fetch from '@/utils/fetch'

export function ClearRecogRecod() {
  return fetch({
    url: '/basic/save',
    method: 'post',
    data: {
      'requestdata': {
        'token': '1',
        'bcode': '0x1203B'
      }
    }
  })
}

export function Reload() {
  return fetch({
    url: '/basic/save',
    method: 'post',
    data: {
      'requestdata': {
        'token': '1',
        'bcode': '0x12018'
      }
    }
  })
}

export function FeatureOptimization() {
  return fetch({
    url: '/basic/save',
    method: 'post',
    data: {
      'requestdata': {
        'token': '1',
        'bcode': '0x12019'
      }
    }
  })
}

export function UpliftModeling() {
  return fetch({
    url: '/basic/save',
    method: 'post',
    data: {
      'requestdata': {
        'token': '1',
        'bcode': '0x12023'
      }
    }
  })
}

export function LocalSerialization() {
  return fetch({
    url: '/basic/save',
    method: 'post',
    data: {
      'requestdata': {
        'token': '1',
        'bcode': '0x12024'
      }
    }
  })
}

export function RestPositiveNegativeValues() {
  return fetch({
    url: '/basic/save',
    method: 'post',
    data: {
      'requestdata': {
        'token': '1',
        'bcode': '0x12025'
      }
    }
  })
}

export function NewFeatureModeling() {
  return fetch({
    url: '/basic/save',
    method: 'post',
    data: {
      'requestdata': {
        'token': '1',
        'bcode': '0x12026'
      }
    }
  })
}

export function Restart() {
  return fetch({
    url: '/basic/save',
    method: 'post',
    data: {
      'requestdata': {
        'token': '1',
        'bcode': '0x12029'
      }
    }
  })
}

