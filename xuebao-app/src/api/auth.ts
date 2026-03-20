/** 认证相关 API */
import { post, get } from './request'
import { isMockMode } from './request'
import { mockLogin, mockProfile } from '@/mock'
import type { LoginRequest, LoginResponse, User } from '@/types'

/** 登录 */
export function login(data: LoginRequest): Promise<LoginResponse> {
  if (isMockMode()) return mockLogin(data)
  return post<LoginResponse>('/auth/login', data)
}

/** 获取当前用户信息 */
export function getProfile(): Promise<User> {
  if (isMockMode()) return mockProfile()
  return get<User>('/auth/profile')
}

/** 修改密码 */
export function changePassword(data: { oldPassword: string; newPassword: string }): Promise<void> {
  return post('/auth/change-password', data)
}
