/** 用户状态管理 - 使用 Vue 3 原生 reactive */
import { reactive, computed, toRefs } from 'vue'
import type { User } from '@/types'
import { UserRole } from '@/types'
import { setToken, removeToken, setUser, getUser, removeUser, getToken } from '@/utils/storage'
import { login as loginApi, getProfile } from '@/api/auth'

const state = reactive({
  token: getToken(),
  userInfo: getUser<User>() as User | null,
})

const isLoggedIn = computed(() => !!state.token)
const isStudent = computed(() => state.userInfo?.role === UserRole.Student)
const isTeacher = computed(() => state.userInfo?.role === UserRole.Teacher)
const isAdmin = computed(() => state.userInfo?.role === UserRole.Admin)
const userName = computed(() => state.userInfo?.name || '')
const userRole = computed(() => state.userInfo?.role)
const classIds = computed(() => state.userInfo?.classIds || [])
const className = computed(() => state.userInfo?.className || '')

/** 登录 */
async function login(account: string, password: string) {
  const res = await loginApi({ account, password })
  state.token = res.token
  state.userInfo = res.user
  setToken(res.token)
  setUser(res.user)
  return res.user
}

/** 登出 */
function logout() {
  state.token = ''
  state.userInfo = null
  removeToken()
  removeUser()
}

/** 刷新用户信息 */
async function refreshProfile() {
  const user = await getProfile()
  state.userInfo = user
  setUser(user)
}

export function useUserStore() {
  return {
    token: computed(() => state.token),
    userInfo: computed(() => state.userInfo),
    isLoggedIn, isStudent, isTeacher, isAdmin,
    userName, userRole, classIds, className,
    login, logout, refreshProfile,
  }
}
