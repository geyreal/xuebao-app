/** 用户状态管理 */
import { reactive, computed } from 'vue'
import { setToken, removeToken, setUser, getUser, removeUser, getToken } from '@/utils/storage.js'
import { login as loginApi, getProfile } from '@/api/auth.js'
import { UserRole } from '@/utils/constants.js'

const state = reactive({
  token: getToken(),
  userInfo: getUser(),
})

const isLoggedIn = computed(() => !!state.token)
const isStudent = computed(() => state.userInfo?.role === UserRole.Student)
const isTeacher = computed(() => state.userInfo?.role === UserRole.Teacher)
const isAdmin = computed(() => state.userInfo?.role === UserRole.Admin)
const userName = computed(() => state.userInfo?.name || '')
const userRole = computed(() => state.userInfo?.role)
const classIds = computed(() => state.userInfo?.classIds || [])
const className = computed(() => state.userInfo?.className || '')

async function login(account, password) {
  const res = await loginApi({ account, password })
  state.token = res.token
  state.userInfo = res.user
  setToken(res.token)
  setUser(res.user)
  return res.user
}

function logout() {
  state.token = ''
  state.userInfo = null
  removeToken()
  removeUser()
}

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
