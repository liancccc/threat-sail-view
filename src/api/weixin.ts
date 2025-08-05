import request from '@/utils/request'

interface WeixinStatus {
    last_login: string
    cookies: any[]
    qr_code: string
    browser: boolean
}

interface WeixinResponse {
    data: WeixinStatus
}

export const fetchWeixinStatus = async (): Promise<WeixinResponse> => {
    return await request.get('/weixin/status')
}

export const startBrowser = async (): Promise<WeixinResponse> => {
    return await request.get('/weixin/browser/start')
}

export const stopBrowser = async (): Promise<WeixinResponse> => {
    return await request.get('/weixin/browser/stop')
}

export const refreshQrcode = async (): Promise<WeixinResponse> => {
    return await request.get('/weixin/refresh/qrcode')
}

export const refreshLoginStatus = async (): Promise<WeixinResponse> => {
    return await request.get('/weixin/refresh/login')
}
