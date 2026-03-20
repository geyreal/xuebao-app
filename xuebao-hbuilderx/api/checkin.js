/** 打卡相关 API */
import { get, post, isMockMode } from './request.js'
import { mockCheckinTasks, mockCheckinStats, mockCheckinCalendar } from '@/mock/index.js'

export function getCheckinTasks(params) {
  if (isMockMode()) return mockCheckinTasks(params)
  return get('/checkin/tasks', params)
}

export function doCheckin(taskId) { return post(`/checkin/tasks/${taskId}/check`) }
export function createCheckinTask(data) { return post('/checkin/tasks', data) }

export function getCheckinStats() {
  if (isMockMode()) return mockCheckinStats()
  return get('/checkin/stats')
}

export function getCheckinCalendar(params) {
  if (isMockMode()) return mockCheckinCalendar(params)
  return get('/checkin/calendar', params)
}

export function getTaskRecords(taskId) { return get(`/checkin/tasks/${taskId}/records`) }
