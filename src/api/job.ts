import request from '@/utils/request'

export interface SchedulerJobItem {
    id: string
    next_run_time: string
    interval: string
}

export interface SchedulerJobsResponse {
    total: number
    items: SchedulerJobItem[]
}

export const listJobs = async (): Promise<SchedulerJobsResponse> => {
    return await request.get('/job/list')
}

export const reloadJob = async (id: string): Promise<{ status: string }> => {
    return await request.get('/job/reload', { params: { id } })
}