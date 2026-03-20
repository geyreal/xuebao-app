/** Token 管理工具 */
import { getToken } from './storage.js'

export function isLoggedIn() {
  return !!getToken()
}

export function redirectToLogin() {
  uni.reLaunch({ url: '/pages/login/index' })
}

export function redirectToHome() {
  uni.switchTab({ url: '/pages/home/index' })
}
