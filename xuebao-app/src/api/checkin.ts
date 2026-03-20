/** 打卡相关 API */
import { get, post } from './request'
import { isMockMode } from './request'
import { mockCheckinTasks, mockCheckinStats, mockCheckinCalendar } from '@/mock'
import type { CheckinTask, CheckinRecord, CheckinStats, PageResult, PageParams } from '@/types'

/** 获取打卡任务列表 */
export function getCheckinTasks(params?: PageParams): Promise<PageResult<CheckinTask>> {
  if (isMockMode()) return mockCheckinTasks(params)
  return get<PageResult<CheckinTask>>('/checkin/tasks', params)
}

/** 一键打卡 */
export function doCheckin(taskId: number): Promise<void> {
  return post(`/checkin/tasks/${taskId}/check`)
}

/** 发布打卡任务 */
export function createCheckinTask(data: Partial<CheckinTask>): Promise<CheckinTask> {
  return post<CheckinTask>('/checkin/tasks', data)
}

/** 获取打卡统计 */
export function getCheckinStats(): Promise<CheckinStats> {
  if (isMockMode()) return mockCheckinStats()
  return get<CheckinStats>('/checkin/stats')
}

/** 获取打卡日历数据 */
export function getCheckinCalendar(params: { year: number; month: number }): Promise<string[]> {
  if (isMockMode()) return mockCheckinCalendar(params)
  return get<string[]>('/checkin/calendar', params)
}

/** 获取某任务的打卡记录（教师用） */
export function getTaskRecords(taskId: number): Promise<CheckinRecord[]> {
  return get<CheckinRecord[]>(`/checkin/tasks/${taskId}/records`)
}
