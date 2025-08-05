import CryptoJS from 'crypto-js';
export function md5(text) {
    return CryptoJS.MD5(text).toString();
}
