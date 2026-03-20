/** 认证相关 API */
import { post, get, isMockMode } from './request.js'
import { mockLogin, mockProfile } from '@/mock/index.js'

export function login(data) {
  if (isMockMode()) return mockLogin(data)
  return post('/auth/login', data)
}

export function getProfile() {
  if (isMockMode()) return mockProfile()
  return get('/auth/profile')
}

export function changePassword(data) {
  return post('/auth/change-password', data)
}
