/** 常量定义 */

/** 用户角色 */
export const UserRole = {
  Student: 1,
  Teacher: 2,
  Admin: 3,
}

/** 学科类型 */
export const SubjectType = {
  Chinese: 1,
  Math: 2,
  English: 3,
  General: 4,
}

/** 学科名称映射 */
export const SubjectNames = {
  [SubjectType.Chinese]: '语文',
  [SubjectType.Math]: '数学',
  [SubjectType.English]: '英语',
  [SubjectType.General]: '综合',
}
