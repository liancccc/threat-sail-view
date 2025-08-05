// src/api/data.ts
import request from '@/utils/request'


export interface ThreatItem {
    _id: string
    desc: string
    link: string
    tags: string[]
    created_at: string
}

export interface PaginatedResponse<T> {
    total: number
    page: number
    page_size: number
    items: T[]
}

export interface TagResponse {
    tags: string[]
}

export const fetchDataList = async (
    params?: {
        search?: string
        tags?: string[]
        page?: number
        limit?: number
    }
): Promise<PaginatedResponse<ThreatItem>> => {
    return await request.get('/data/list', {
        params: {
            ...params,
            tags: params?.tags?.length ? params.tags : undefined
        }
    })
}


export const fetchDataTags = async (): Promise<TagResponse> => {
    return await request.get('/data/tags')
}