/** Token 管理工具 */
import { getToken } from './storage'

/** 判断是否已登录 */
export function isLoggedIn(): boolean {
  return !!getToken()
}

/** 跳转登录页 */
export function redirectToLogin(): void {
  uni.reLaunch({ url: '/pages/login/index' })
}

/** 根据角色跳转首页 */
export function redirectToHome(): void {
  uni.switchTab({ url: '/pages/home/index' })
}
