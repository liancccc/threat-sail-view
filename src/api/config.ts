import request from '@/utils/request'


export interface ConfigResponse {
    content: string
    error: string
}


export const fetchConfig = async (): Promise<ConfigResponse> => {
    return await request.get('/config/')
}


export const saveConfig = async (content: string): Promise<ConfigResponse> => {
    return await request.post('/config/', { content })
}
