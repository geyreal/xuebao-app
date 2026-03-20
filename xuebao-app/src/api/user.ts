/** 用户相关 API */
import { get } from './request'
import { isMockMode } from './request'
import { mockAnnouncements } from '@/mock'
import type { Announcement, PageResult } from '@/types'

/** 获取公告列表 */
export function getAnnouncements(): Promise<Announcement[]> {
  if (isMockMode()) return mockAnnouncements()
  return get<Announcement[]>('/announcements')
}
