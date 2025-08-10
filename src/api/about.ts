import request from '@/utils/request'


export interface AboutResponse {
    content: string
    error: string
}


export const fetchAbout = async (): Promise<AboutResponse> => {
    return await request.get('/about/')
}
