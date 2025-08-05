import request from '@/utils/request'

export interface LoginRequest {
    token: string
}

export interface LoginResponse {
    success: boolean
    message: string
}

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
    return await request.post('/auth/login', data)
}