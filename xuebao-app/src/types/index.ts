/** 用户角色枚举 */
export enum UserRole {
  Student = 1,
  Teacher = 2,
  Admin = 3,
}

/** 学科枚举 */
export enum SubjectType {
  Chinese = 1,   // 语文
  Math = 2,      // 数学
  English = 3,   // 英语
  General = 4,   // 综合
}

/** 学科名称映射 */
export const SubjectNames: Record<SubjectType, string> = {
  [SubjectType.Chinese]: '语文',
  [SubjectType.Math]: '数学',
  [SubjectType.English]: '英语',
  [SubjectType.General]: '综合',
}

/** 文件类型 */
export type FileType = 'pdf' | 'word' | 'image' | 'audio'

/** 用户 */
export interface User {
  id: number
  account: string
  name: string
  role: UserRole
  status: number
  classIds: number[]
  className?: string
  createdAt: string
}

/** 班级 */
export interface Class {
  id: number
  grade: string
  name: string
}

/** 学科 */
export interface Subject {
  id: number
  name: string
  sortOrder: number
}

/** 资源 */
export interface Resource {
  id: number
  title: string
  description: string
  subjectId: number
  subjectName?: string
  classId: number
  uploaderId: number
  uploaderName?: string
  fileType: FileType
  fileUrl: string
  fileSize: number
  isTop: boolean
  status: number
  viewCount: number
  isFavorited?: boolean
  isStudied?: boolean
  createdAt: string
  updatedAt: string
}

/** 打卡任务 */
export interface CheckinTask {
  id: number
  title: string
  description: string
  subjectId?: number
  subjectName?: string
  classId: number
  publisherId: number
  publisherName?: string
  deadline?: string
  status: number
  isChecked?: boolean
  checkedCount?: number
  totalCount?: number
  createdAt: string
}

/** 打卡记录 */
export interface CheckinRecord {
  id: number
  taskId: number
  taskTitle?: string
  userId: number
  userName?: string
  classId: number
  checkedAt: string
}

/** 收藏 */
export interface Favorite {
  id: number
  userId: number
  resourceId: number
  resource?: Resource
  createdAt: string
}

/** 学习记录 */
export interface StudyRecord {
  id: number
  userId: number
  resourceId: number
  resource?: Resource
  status: number
  createdAt: string
}

/** 通知 */
export interface Notification {
  id: number
  userId: number
  type: number
  title: string
  content: string
  isRead: boolean
  createdAt: string
}

/** 公告 */
export interface Announcement {
  id: number
  title: string
  content: string
  publisherId: number
  status: number
  createdAt: string
}

/** API 统一返回格式 */
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

/** 分页参数 */
export interface PageParams {
  page: number
  pageSize: number
}

/** 分页返回 */
export interface PageResult<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

/** 登录请求 */
export interface LoginRequest {
  account: string
  password: string
}

/** 登录响应 */
export interface LoginResponse {
  token: string
  user: User
}

/** 打卡统计 */
export interface CheckinStats {
  consecutiveDays: number
  totalChecked: number
  completionRate: number
}
