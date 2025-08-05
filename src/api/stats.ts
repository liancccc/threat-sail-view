import request from '@/utils/request'

interface StatItem {
    tag: string
    today: number
    month: number
    total: number
}

interface StatsResponse {
    stats: StatItem[]
}

export const fetchStats = async (): Promise<StatsResponse> => {
    return await request.get('/data/stats')
}