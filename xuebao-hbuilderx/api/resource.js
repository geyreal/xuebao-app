/** 资源相关 API */
import { get, post, put, del, isMockMode } from './request.js'
import { mockResources, mockResourceDetail } from '@/mock/index.js'

export function getResources(params) {
  if (isMockMode()) return mockResources(params)
  return get('/resources', params)
}

export function getResourceDetail(id) {
  if (isMockMode()) return mockResourceDetail(id)
  return get(`/resources/${id}`)
}

export function createResource(data) { return post('/resources', data) }
export function updateResource(id, data) { return put(`/resources/${id}`, data) }
export function deleteResource(id) { return del(`/resources/${id}`) }
export function favoriteResource(resourceId) { return post(`/favorites/${resourceId}`) }
export function unfavoriteResource(resourceId) { return del(`/favorites/${resourceId}`) }

export function getFavorites(params) {
  if (isMockMode()) return mockResources(params)
  return get('/favorites', params)
}

export function markStudied(resourceId) { return post(`/study-records/${resourceId}`) }

export function getStudyRecords(params) {
  if (isMockMode()) return mockResources(params)
  return get('/study-records', params)
}
