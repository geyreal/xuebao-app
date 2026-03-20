<template>
  <view class="home-page">
    <!-- 顶部欢迎区 -->
    <view class="welcome-section">
      <view class="welcome-bg" />
      <view class="welcome-content">
        <view class="welcome-info">
          <text class="welcome-text">{{ greeting }}，{{ userStore.userName }}</text>
          <text class="welcome-class">📍 {{ userStore.className || '未绑定班级' }}</text>
        </view>
      </view>
    </view>

    <view class="home-content">
      <!-- 公告区域 -->
      <view v-if="announcements.length" class="section announcement-section">
        <scroll-view scroll-x class="announcement-scroll">
          <view class="announcement-list">
            <view
              v-for="item in announcements"
              :key="item.id"
              class="announcement-card"
            >
              <text class="announcement-tag">📢 公告</text>
              <text class="announcement-title">{{ item.title }}</text>
              <text class="announcement-time">{{ item.createdAt.slice(0, 10) }}</text>
            </view>
          </view>
        </scroll-view>
      </view>

      <!-- 四大学科入口 -->
      <view class="section">
        <text class="section-title">学科中心</text>
        <view class="subject-grid">
          <view
            v-for="subject in subjects"
            :key="subject.id"
            class="subject-item"
            @click="goSubject(subject.id)"
          >
            <view class="subject-icon" :style="{ background: subject.bgColor }">
              <text class="subject-emoji">{{ subject.icon }}</text>
            </view>
            <text class="subject-name">{{ subject.name }}</text>
          </view>
        </view>
      </view>

      <!-- 今日打卡提醒 -->
      <view class="section">
        <text class="section-title">打卡提醒</text>
        <view v-if="todayTasks.length" class="checkin-reminder">
          <view
            v-for="task in todayTasks"
            :key="task.id"
            class="reminder-card"
            @click="goCheckin"
          >
            <view class="reminder-left">
              <text class="reminder-icon">{{ task.isChecked ? '✅' : '⏰' }}</text>
            </view>
            <view class="reminder-info">
              <text class="reminder-title">{{ task.title }}</text>
              <text class="reminder-status" :class="{ done: task.isChecked }">
                {{ task.isChecked ? '已完成' : '待完成' }}
              </text>
            </view>
            <text class="reminder-arrow">›</text>
          </view>
        </view>
        <view v-else class="no-task-card">
          <text class="no-task-icon">🎉</text>
          <text class="no-task-text">今日打卡任务已全部完成！</text>
        </view>
      </view>

      <!-- 教师工作台入口 -->
      <view v-if="userStore.isTeacher" class="section">
        <view class="teacher-entry" @click="goWorkbench">
          <text class="entry-icon">🎓</text>
          <view class="entry-info">
            <text class="entry-title">教师工作台</text>
            <text class="entry-desc">管理资源 · 发布任务 · 查看数据</text>
          </view>
          <text class="entry-arrow">›</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { useUserStore } from '@/store/user'
import { getCheckinTasks } from '@/api/checkin'
import { getAnnouncements } from '@/api/user'
import { SubjectType } from '@/types'
import type { CheckinTask, Announcement } from '@/types'

const userStore = useUserStore()
const todayTasks = ref<CheckinTask[]>([])
const announcements = ref<Announcement[]>([])

const subjects = [
  { id: SubjectType.Chinese, name: '语文', icon: '📖', bgColor: 'linear-gradient(135deg, #FFE4E4, #FFB4B4)' },
  { id: SubjectType.Math, name: '数学', icon: '🔢', bgColor: 'linear-gradient(135deg, #E4F0FF, #B4D4FF)' },
  { id: SubjectType.English, name: '英语', icon: '🔤', bgColor: 'linear-gradient(135deg, #FFF4E4, #FFD4A4)' },
  { id: SubjectType.General, name: '综合', icon: '🌈', bgColor: 'linear-gradient(135deg, #E4FFE4, #B4FFB4)' },
]

const greeting = computed(() => {
  const h = new Date().getHours()
  if (h < 12) return '上午好'
  if (h < 18) return '下午好'
  return '晚上好'
})

onShow(() => {
  if (!userStore.isLoggedIn) {
    uni.reLaunch({ url: '/pages/login/index' })
    return
  }
  loadData()
})

async function loadData() {
  try {
    const [taskRes, annoRes] = await Promise.all([
      getCheckinTasks({ page: 1, pageSize: 5 }),
      getAnnouncements(),
    ])
    todayTasks.value = taskRes.list.filter(t => !t.isChecked).slice(0, 3)
    announcements.value = annoRes.slice(0, 5)
  } catch (e) {
    console.error('加载首页数据失败', e)
  }
}

function goSubject(subjectId: number) {
  uni.switchTab({ url: '/pages/subject/index' })
}

function goCheckin() {
  uni.switchTab({ url: '/pages/checkin/index' })
}

function goWorkbench() {
  uni.navigateTo({ url: '/pages/teacher/workbench' })
}
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  background: #F5F6FA;
}
.welcome-section {
  position: relative;
  height: 280rpx;
}
.welcome-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 280rpx;
  background: linear-gradient(135deg, #4A90D9, #6BA3E3);
  border-radius: 0 0 40rpx 40rpx;
}
.welcome-content {
  position: relative;
  z-index: 1;
  padding: 60rpx 32rpx 0;
}
.welcome-info {
  display: flex;
  flex-direction: column;
}
.welcome-text {
  font-size: 40rpx;
  font-weight: bold;
  color: #FFFFFF;
  margin-bottom: 12rpx;
}
.welcome-class {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.8);
}

.home-content {
  padding: 0 24rpx;
  margin-top: -20rpx;
  position: relative;
  z-index: 2;
}

.section {
  margin-bottom: 28rpx;
}
.section-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #303133;
  margin-bottom: 20rpx;
  display: block;
}

/* 公告 */
.announcement-scroll {
  white-space: nowrap;
}
.announcement-list {
  display: flex;
  padding-bottom: 8rpx;
}
.announcement-card {
  display: inline-flex;
  flex-direction: column;
  background: #FFFFFF;
  border-radius: 16rpx;
  padding: 24rpx;
  margin-right: 16rpx;
  min-width: 400rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
}
.announcement-tag {
  font-size: 22rpx;
  color: #FF9500;
  margin-bottom: 8rpx;
}
.announcement-title {
  font-size: 28rpx;
  font-weight: 500;
  color: #303133;
  margin-bottom: 8rpx;
  white-space: normal;
}
.announcement-time {
  font-size: 22rpx;
  color: #C0C4CC;
}

/* 学科入口 */
.subject-grid {
  display: flex;
  justify-content: space-between;
}
.subject-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 22%;
}
.subject-icon {
  width: 120rpx;
  height: 120rpx;
  border-radius: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.06);
}
.subject-emoji {
  font-size: 48rpx;
}
.subject-name {
  font-size: 26rpx;
  color: #303133;
  font-weight: 500;
}

/* 打卡提醒 */
.reminder-card {
  background: #FFFFFF;
  border-radius: 16rpx;
  padding: 24rpx;
  margin-bottom: 12rpx;
  display: flex;
  align-items: center;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.04);
}
.reminder-left {
  margin-right: 20rpx;
}
.reminder-icon {
  font-size: 40rpx;
}
.reminder-info {
  flex: 1;
}
.reminder-title {
  font-size: 28rpx;
  font-weight: 500;
  color: #303133;
  display: block;
  margin-bottom: 4rpx;
}
.reminder-status {
  font-size: 24rpx;
  color: #FF9500;
}
.reminder-status.done {
  color: #67C23A;
}
.reminder-arrow {
  font-size: 36rpx;
  color: #C0C4CC;
}

.no-task-card {
  background: #FFFFFF;
  border-radius: 16rpx;
  padding: 40rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.04);
}
.no-task-icon {
  font-size: 48rpx;
  margin-bottom: 12rpx;
}
.no-task-text {
  font-size: 28rpx;
  color: #67C23A;
}

/* 教师入口 */
.teacher-entry {
  background: linear-gradient(135deg, #FF9500, #FFB347);
  border-radius: 16rpx;
  padding: 28rpx 24rpx;
  display: flex;
  align-items: center;
  box-shadow: 0 4rpx 16rpx rgba(255, 149, 0, 0.2);
}
.entry-icon {
  font-size: 48rpx;
  margin-right: 20rpx;
}
.entry-info {
  flex: 1;
}
.entry-title {
  font-size: 30rpx;
  font-weight: 600;
  color: #FFFFFF;
  display: block;
  margin-bottom: 4rpx;
}
.entry-desc {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.8);
}
.entry-arrow {
  font-size: 40rpx;
  color: rgba(255, 255, 255, 0.6);
}
</style>
