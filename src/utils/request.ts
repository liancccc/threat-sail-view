import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

const request: AxiosInstance = axios.create({
    baseURL: '/api',
    timeout: 100000,
})

request.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

request.interceptors.response.use(
    (response: AxiosResponse) => response.data,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token')
            window.location.href = '/cai'
        }
        const message = error.response?.data?.detail ||
            error.response?.data?.message ||
            error.message ||
            '请求失败'
        ElMessage.error(message)
        return Promise.reject(error)
    }
)

export default request
