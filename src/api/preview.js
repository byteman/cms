import fetch from '@/utils/fetch'

export function getTree() {
    return fetch({
        url: '/preview/getTree',
        method: 'post',
        data: {
            "requestdata": {
                "bcode": "0x12003",
                "token": "1"
            }
        }
    })
}

export function getRtspUrl(cameraId) {
    return fetch({
        url: '/preview/getRtspUrl',
        method: 'post',
        async: 'false',
        data: {
            "requestdata": {
                "bcode": "0x12000",
                "token": "1",
                channel: cameraId
            }
        }
    })
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