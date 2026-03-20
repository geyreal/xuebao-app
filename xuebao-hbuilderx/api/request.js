/** 统一请求封装 */
import { getToken } from '@/utils/storage.js'
import { redirectToLogin } from '@/utils/auth.js'

const USE_MOCK = true
const BASE_URL = 'http://localhost:8080/api/v1'

export function request(options) {
  return new Promise((resolve, reject) => {
    const token = getToken()
    const header = { 'Content-Type': 'application/json', ...options.header }
    if (token) header['Authorization'] = `Bearer ${token}`

    uni.request({
      url: `${BASE_URL}${options.url}`,
      method: options.method || 'GET',
      data: options.data,
      header,
      success: (res) => {
        const data = res.data
        if (data.code === 0) {
          resolve(data.data)
        } else if (data.code === 401) {
          redirectToLogin()
          reject(new Error('未登录或登录已过期'))
        } else {
          uni.showToast({ title: data.message || '请求失败', icon: 'none' })
          reject(new Error(data.message))
        }
      },
      fail: (err) => {
        uni.showToast({ title: '网络异常', icon: 'none' })
        reject(err)
      },
    })
  })
}

export const get = (url, data) => request({ url, method: 'GET', data })
export const post = (url, data) => request({ url, method: 'POST', data })
export const put = (url, data) => request({ url, method: 'PUT', data })
export const del = (url, data) => request({ url, method: 'DELETE', data })
export const isMockMode = () => USE_MOCK
