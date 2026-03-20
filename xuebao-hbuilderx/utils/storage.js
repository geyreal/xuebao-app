/** 本地存储封装 */

const TOKEN_KEY = 'xuebao_token'
const USER_KEY = 'xuebao_user'
const AUTO_LOGIN_KEY = 'xuebao_auto_login'

export function getToken() {
  return uni.getStorageSync(TOKEN_KEY) || ''
}

export function setToken(token) {
  uni.setStorageSync(TOKEN_KEY, token)
}

export function removeToken() {
  uni.removeStorageSync(TOKEN_KEY)
}

export function getUser() {
  return uni.getStorageSync(USER_KEY) || null
}

export function setUser(user) {
  uni.setStorageSync(USER_KEY, user)
}

export function removeUser() {
  uni.removeStorageSync(USER_KEY)
}

export function getAutoLogin() {
  return uni.getStorageSync(AUTO_LOGIN_KEY) === true
}

export function setAutoLogin(val) {
  uni.setStorageSync(AUTO_LOGIN_KEY, val)
}

export function clearAll() {
  removeToken()
  removeUser()
  uni.removeStorageSync(AUTO_LOGIN_KEY)
}
