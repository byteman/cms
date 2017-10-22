import fetch from '@/utils/fetch'

export function GetCameraConfigParam() {
  return fetch({
    url: '/api/v1/cameraConfig',
    method: 'get'
  })
}

export function SetCameraConfigParam(code) {
  return fetch({
    url: '/api/v1/cameraConfig',
    method: 'post',
    data: code
  })
}