import fetch from '@/utils/fetch'

export function getTree() {
    return fetch({
        url: '/preview/getTree',
        method: 'get'      
    })
}

export function getRtspUrl(cameraId) {
    return fetch({
        url: '/preview/getRtspUrl',
        method: 'get',
        async: 'false',
        param: cameraId
        }
    )
}

export function postCameraPreview(cameraId) {
    return fetch({
        url: '/preview/getRtspUrl',
        method: 'post',
        async: 'false',
        data: {
            "requestdata": {
                "token": '1',
                "bcode": '0x12006',
                channel: cameraId
            }
        }
    })
}