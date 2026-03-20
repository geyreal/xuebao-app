/** Mock 数据 */
import type {
  LoginRequest, LoginResponse, User, Resource, CheckinTask,
  CheckinStats, Announcement, PageResult, PageParams,
} from '@/types'
import { UserRole, SubjectType } from '@/types'

// ===== Mock 用户 =====
const mockStudentUser: User = {
  id: 1001,
  account: '2024001',
  name: '张小明',
  role: UserRole.Student,
  status: 1,
  classIds: [1],
  className: '三年级1班',
  createdAt: '2024-09-01',
}

const mockTeacherUser: User = {
  id: 2001,
  account: 'T001',
  name: '李老师',
  role: UserRole.Teacher,
  status: 1,
  classIds: [1, 2],
  className: '三年级1班, 三年级2班',
  createdAt: '2024-09-01',
}

// ===== Mock 资源 =====
const mockResourceList: Resource[] = [
  {
    id: 1, title: '三年级语文第一单元课件', description: '涵盖课文朗读、生字词讲解、课后练习指导',
    subjectId: SubjectType.Chinese, subjectName: '语文', classId: 1, uploaderId: 2001, uploaderName: '李老师',
    fileType: 'pdf', fileUrl: '', fileSize: 2048000, isTop: true, status: 1, viewCount: 56,
    isFavorited: false, isStudied: false, createdAt: '2024-10-15 09:00:00', updatedAt: '2024-10-15 09:00:00',
  },
  {
    id: 2, title: '数学口算练习100题', description: '加减乘除混合口算训练，适合课后巩固',
    subjectId: SubjectType.Math, subjectName: '数学', classId: 1, uploaderId: 2001, uploaderName: '李老师',
    fileType: 'pdf', fileUrl: '', fileSize: 1024000, isTop: false, status: 1, viewCount: 38,
    isFavorited: true, isStudied: true, createdAt: '2024-10-14 14:30:00', updatedAt: '2024-10-14 14:30:00',
  },
  {
    id: 3, title: '英语Unit3听力音频', description: 'Let\'s talk 及 Let\'s learn 部分配套听力',
    subjectId: SubjectType.English, subjectName: '英语', classId: 1, uploaderId: 2001, uploaderName: '李老师',
    fileType: 'audio', fileUrl: '', fileSize: 5120000, isTop: false, status: 1, viewCount: 22,
    isFavorited: false, isStudied: false, createdAt: '2024-10-13 16:00:00', updatedAt: '2024-10-13 16:00:00',
  },
  {
    id: 4, title: '科学实验：植物的光合作用', description: '图文并茂展示光合作用实验步骤和观察记录',
    subjectId: SubjectType.General, subjectName: '综合', classId: 1, uploaderId: 2001, uploaderName: '李老师',
    fileType: 'image', fileUrl: '', fileSize: 3072000, isTop: false, status: 1, viewCount: 15,
    isFavorited: false, isStudied: false, createdAt: '2024-10-12 10:00:00', updatedAt: '2024-10-12 10:00:00',
  },
  {
    id: 5, title: '古诗词背诵合集', description: '三年级上册必背古诗词合集，含注释和译文',
    subjectId: SubjectType.Chinese, subjectName: '语文', classId: 1, uploaderId: 2001, uploaderName: '李老师',
    fileType: 'pdf', fileUrl: '', fileSize: 1536000, isTop: false, status: 1, viewCount: 42,
    isFavorited: true, isStudied: false, createdAt: '2024-10-11 08:30:00', updatedAt: '2024-10-11 08:30:00',
  },
  {
    id: 6, title: '数学思维导图：图形与几何', description: '用思维导图梳理三年级图形与几何知识点',
    subjectId: SubjectType.Math, subjectName: '数学', classId: 1, uploaderId: 2001, uploaderName: '李老师',
    fileType: 'image', fileUrl: '', fileSize: 2560000, isTop: false, status: 1, viewCount: 29,
    isFavorited: false, isStudied: true, createdAt: '2024-10-10 11:00:00', updatedAt: '2024-10-10 11:00:00',
  },
]

// ===== Mock 打卡任务 =====
const mockTaskList: CheckinTask[] = [
  {
    id: 1, title: '语文课文朗读打卡', description: '每天朗读一篇课文，大声、流利、有感情',
    subjectId: SubjectType.Chinese, subjectName: '语文', classId: 1, publisherId: 2001, publisherName: '李老师',
    deadline: '2024-10-20 23:59:59', status: 1, isChecked: false,
    checkedCount: 28, totalCount: 35, createdAt: '2024-10-10 08:00:00',
  },
  {
    id: 2, title: '数学口算每日练', description: '完成20道口算题并拍照上传',
    subjectId: SubjectType.Math, subjectName: '数学', classId: 1, publisherId: 2001, publisherName: '李老师',
    deadline: '2024-10-25 23:59:59', status: 1, isChecked: true,
    checkedCount: 32, totalCount: 35, createdAt: '2024-10-12 09:00:00',
  },
  {
    id: 3, title: '英语单词听写', description: 'Unit3 单词听写，家长监督完成',
    subjectId: SubjectType.English, subjectName: '英语', classId: 1, publisherId: 2001, publisherName: '李老师',
    deadline: '2024-10-18 23:59:59', status: 1, isChecked: false,
    checkedCount: 20, totalCount: 35, createdAt: '2024-10-14 10:00:00',
  },
]

// ===== Mock 公告 =====
const mockAnnouncementList: Announcement[] = [
  { id: 1, title: '学伴小书包 APP 正式上线', content: '欢迎使用学伴小书包，祝大家学习愉快！', publisherId: 1, status: 1, createdAt: '2024-10-01 08:00:00' },
  { id: 2, title: '国庆假期学习安排', content: '国庆假期期间，请同学们按时完成打卡任务，保持学习习惯。', publisherId: 1, status: 1, createdAt: '2024-09-28 16:00:00' },
  { id: 3, title: '新功能：打卡日历上线', content: '打卡中心新增日历功能，可直观查看每月打卡情况。', publisherId: 1, status: 1, createdAt: '2024-09-25 12:00:00' },
]

// ===== Export Mock Functions =====

let currentUser: User = mockStudentUser

export function mockLogin(data: LoginRequest): Promise<LoginResponse> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.account.startsWith('T') || data.account.startsWith('t')) {
        currentUser = mockTeacherUser
      } else {
        currentUser = mockStudentUser
      }
      resolve({ token: 'mock-jwt-token-' + Date.now(), user: currentUser })
    }, 500)
  })
}

export function mockProfile(): Promise<User> {
  return Promise.resolve(currentUser)
}

export function mockResources(params: any): Promise<PageResult<Resource>> {
  let filtered = [...mockResourceList]
  if (params.subjectId) {
    filtered = filtered.filter(r => r.subjectId === params.subjectId)
  }
  if (params.keyword) {
    const kw = params.keyword.toLowerCase()
    filtered = filtered.filter(r => r.title.toLowerCase().includes(kw) || r.description.toLowerCase().includes(kw))
  }
  return Promise.resolve({
    list: filtered,
    total: filtered.length,
    page: params.page || 1,
    pageSize: params.pageSize || 20,
  })
}

export function mockResourceDetail(id: number): Promise<Resource> {
  const resource = mockResourceList.find(r => r.id === id) || mockResourceList[0]
  return Promise.resolve(resource)
}

export function mockCheckinTasks(params?: any): Promise<PageResult<CheckinTask>> {
  return Promise.resolve({
    list: mockTaskList,
    total: mockTaskList.length,
    page: 1,
    pageSize: 20,
  })
}

export function mockCheckinStats(): Promise<CheckinStats> {
  return Promise.resolve({
    consecutiveDays: 7,
    totalChecked: 23,
    completionRate: 0.85,
  })
}

export function mockCheckinCalendar(params: { year: number; month: number }): Promise<string[]> {
  // 模拟当月已打卡日期
  const dates: string[] = []
  const y = params.year
  const m = String(params.month).padStart(2, '0')
  for (let d = 1; d <= 15; d++) {
    if (d % 2 === 1 || d <= 7) {
      dates.push(`${y}-${m}-${String(d).padStart(2, '0')}`)
    }
  }
  return Promise.resolve(dates)
}

export function mockAnnouncements(): Promise<Announcement[]> {
  return Promise.resolve(mockAnnouncementList)
}

export { currentUser, mockStudentUser, mockTeacherUser }
