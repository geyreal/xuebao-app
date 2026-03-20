/** 用户/公告相关 API */
import { get, isMockMode } from './request.js'
import { mockAnnouncements } from '@/mock/index.js'

export function getAnnouncements() {
  if (isMockMode()) return mockAnnouncements()
  return get('/announcements')
}
