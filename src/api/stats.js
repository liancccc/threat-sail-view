import request from '@/utils/request';
export const fetchStats = async () => {
    return await request.get('/data/stats');
};
