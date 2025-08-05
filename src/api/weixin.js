import request from '@/utils/request';
export const fetchWeixinStatus = async () => {
    return await request.get('/weixin/status');
};
export const startBrowser = async () => {
    return await request.get('/weixin/browser/start');
};
export const stopBrowser = async () => {
    return await request.get('/weixin/browser/stop');
};
export const refreshQrcode = async () => {
    return await request.get('/weixin/refresh/qrcode');
};
export const refreshLoginStatus = async () => {
    return await request.get('/weixin/refresh/login');
};
