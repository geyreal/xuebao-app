/** 本地存储封装 */

const TOKEN_KEY = 'xuebao_token'
const USER_KEY = 'xuebao_user'
const AUTO_LOGIN_KEY = 'xuebao_auto_login'

export function getToken(): string {
  return uni.getStorageSync(TOKEN_KEY) || ''
}

export function setToken(token: string): void {
  uni.setStorageSync(TOKEN_KEY, token)
}

export function removeToken(): void {
  uni.removeStorageSync(TOKEN_KEY)
}

export function getUser<T>(): T | null {
  const data = uni.getStorageSync(USER_KEY)
  return data ? (data as T) : null
}

export function setUser(user: any): void {
  uni.setStorageSync(USER_KEY, user)
}

export function removeUser(): void {
  uni.removeStorageSync(USER_KEY)
}

export function getAutoLogin(): boolean {
  return uni.getStorageSync(AUTO_LOGIN_KEY) === true
}

export function setAutoLogin(val: boolean): void {
  uni.setStorageSync(AUTO_LOGIN_KEY, val)
}

export function clearAll(): void {
  removeToken()
  removeUser()
  uni.removeStorageSync(AUTO_LOGIN_KEY)
}
