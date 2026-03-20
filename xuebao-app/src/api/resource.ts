/** 资源相关 API */
import { get, post, put, del } from './request'
import { isMockMode } from './request'
import { mockResources, mockResourceDetail } from '@/mock'
import type { Resource, PageResult, PageParams } from '@/types'

/** 获取资源列表 */
export function getResources(params: PageParams & { subjectId?: number; keyword?: string }): Promise<PageResult<Resource>> {
  if (isMockMode()) return mockResources(params)
  return get<PageResult<Resource>>('/resources', params)
}

/** 获取资源详情 */
export function getResourceDetail(id: number): Promise<Resource> {
  if (isMockMode()) return mockResourceDetail(id)
  return get<Resource>(`/resources/${id}`)
}

/** 上传资源（提交元数据） */
export function createResource(data: Partial<Resource>): Promise<Resource> {
  return post<Resource>('/resources', data)
}

/** 编辑资源 */
export function updateResource(id: number, data: Partial<Resource>): Promise<Resource> {
  return put<Resource>(`/resources/${id}`, data)
}

/** 删除资源 */
export function deleteResource(id: number): Promise<void> {
  return del(`/resources/${id}`)
}

/** 收藏资源 */
export function favoriteResource(resourceId: number): Promise<void> {
  return post(`/favorites/${resourceId}`)
}

/** 取消收藏 */
export function unfavoriteResource(resourceId: number): Promise<void> {
  return del(`/favorites/${resourceId}`)
}

/** 获取收藏列表 */
export function getFavorites(params: PageParams): Promise<PageResult<Resource>> {
  if (isMockMode()) return mockResources(params)
  return get<PageResult<Resource>>('/favorites', params)
}

/** 标记学习 */
export function markStudied(resourceId: number): Promise<void> {
  return post(`/study-records/${resourceId}`)
}

/** 获取学习记录 */
export function getStudyRecords(params: PageParams): Promise<PageResult<Resource>> {
  if (isMockMode()) return mockResources(params)
  return get<PageResult<Resource>>('/study-records', params)
}
