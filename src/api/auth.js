import request from '@/utils/request';
export const login = async (data) => {
    return await request.post('/auth/login', data);
};
