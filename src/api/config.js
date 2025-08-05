import request from '@/utils/request';
export const fetchConfig = async () => {
    return await request.get('/config/');
};
export const saveConfig = async (content) => {
    return await request.post('/config/', { content });
};
