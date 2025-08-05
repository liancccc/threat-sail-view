import request from '@/utils/request';
export const listJobs = async () => {
    return await request.get('/job/list');
};
export const reloadJob = async (id) => {
    return await request.get('/job/reload', { params: { id } });
};
