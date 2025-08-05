// src/api/data.ts
import request from '@/utils/request';
export const fetchDataList = async (params) => {
    return await request.get('/data/list', {
        params: {
            ...params,
            tags: params?.tags?.length ? params.tags : undefined
        }
    });
};
export const fetchDataTags = async () => {
    return await request.get('/data/tags');
};
