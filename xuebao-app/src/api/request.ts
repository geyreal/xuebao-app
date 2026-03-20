/** 统一请求封装 */
import { getToken } from '@/utils/storage'
import { redirectToLogin } from '@/utils/auth'
import type { ApiResponse } from '@/types'

/** 是否使用 Mock 模式 */
const USE_MOCK = true

/** API 基础地址 */
const BASE_URL = 'http://localhost:8080/api/v1'

/** 发起请求 */
export function request<T = any>(options: {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  data?: any
  header?: Record<string, string>
}): Promise<T> {
  return new Promise((resolve, reject) => {
    const token = getToken()
    const header: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options.header,
    }
    if (token) {
      header['Authorization'] = `Bearer ${token}`
    }

    uni.request({
      url: `${BASE_URL}${options.url}`,
      method: options.method || 'GET',
      data: options.data,
      header,
      success: (res) => {
        const data = res.data as ApiResponse<T>
        if (data.code === 0) {
          resolve(data.data)
        } else if (data.code === 401) {
          // Token 过期，跳转登录
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

/** GET 请求 */
export function get<T = any>(url: string, data?: any): Promise<T> {
  return request<T>({ url, method: 'GET', data })
}

/** POST 请求 */
export function post<T = any>(url: string, data?: any): Promise<T> {
  return request<T>({ url, method: 'POST', data })
}

/** PUT 请求 */
export function put<T = any>(url: string, data?: any): Promise<T> {
  return request<T>({ url, method: 'PUT', data })
}

/** DELETE 请求 */
export function del<T = any>(url: string, data?: any): Promise<T> {
  return request<T>({ url, method: 'DELETE', data })
}

/** 是否处于 Mock 模式 */
export function isMockMode(): boolean {
  return USE_MOCK
}
