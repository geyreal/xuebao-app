<template>
  <view class="mine-page">
    <!-- 用户信息卡片 -->
    <view class="user-card">
      <view class="user-card-bg" />
      <view class="user-info">
        <view class="avatar">
          <text class="avatar-text">{{ userStore.userName?.charAt(0) || '?' }}</text>
        </view>
        <view class="user-detail">
          <text class="user-name">{{ userStore.userName }}</text>
          <view class="user-tags flex-row">
            <text class="role-tag">{{ roleText }}</text>
            <text class="class-tag">{{ userStore.className || '未绑定班级' }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 功能列表 -->
    <view class="menu-group">
      <view class="menu-item" @click="goPage('/pages/mine/favorites')">
        <text class="menu-icon">❤️</text>
        <text class="menu-text">我的收藏</text>
        <text class="menu-arrow">›</text>
      </view>
      <view class="menu-item" @click="goPage('/pages/mine/records')">
        <text class="menu-icon">📖</text>
        <text class="menu-text">学习记录</text>
        <text class="menu-arrow">›</text>
      </view>
      <view class="menu-item" @click="goCheckin">
        <text class="menu-icon">📊</text>
        <text class="menu-text">打卡数据</text>
        <text class="menu-arrow">›</text>
      </view>
    </view>

    <view v-if="userStore.isTeacher" class="menu-group">
      <view class="menu-item" @click="goPage('/pages/teacher/workbench')">
        <text class="menu-icon">🎓</text>
        <text class="menu-text">教师工作台</text>
        <text class="menu-arrow">›</text>
      </view>
    </view>

    <view class="menu-group">
      <view class="menu-item" @click="goPage('/pages/mine/settings')">
        <text class="menu-icon">⚙️</text>
        <text class="menu-text">系统设置</text>
        <text class="menu-arrow">›</text>
      </view>
    </view>

    <!-- 退出登录 -->
    <view class="logout-section">
      <button class="logout-btn" @click="handleLogout">退出登录</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '@/store/user'
import { UserRole } from '@/types'

const userStore = useUserStore()

const roleText = computed(() => {
  const map: Record<number, string> = {
    [UserRole.Student]: '学生',
    [UserRole.Teacher]: '教师',
    [UserRole.Admin]: '管理员',
  }
  return map[userStore.userRole || 0] || ''
})

function goPage(url: string) {
  uni.navigateTo({ url })
}

function goCheckin() {
  uni.switchTab({ url: '/pages/checkin/index' })
}

function handleLogout() {
  uni.showModal({
    title: '提示',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        userStore.logout()
        uni.reLaunch({ url: '/pages/login/index' })
      }
    },
  })
}
</script>

<style scoped>
.mine-page {
  min-height: 100vh;
  background: #F5F6FA;
}
.user-card {
  position: relative;
  padding: 80rpx 32rpx 40rpx;
  overflow: hidden;
}
.user-card-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 260rpx;
  background: linear-gradient(135deg, #4A90D9, #6BA3E3);
  border-radius: 0 0 40rpx 40rpx;
}
.user-info {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
}
.avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 24rpx;
  border: 4rpx solid rgba(255, 255, 255, 0.5);
}
.avatar-text {
  font-size: 48rpx;
  color: #FFFFFF;
  font-weight: bold;
}
.user-detail {
  flex: 1;
}
.user-name {
  font-size: 36rpx;
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 8rpx;
  display: block;
}
.user-tags {
  gap: 12rpx;
}
.role-tag {
  font-size: 22rpx;
  background: rgba(255, 255, 255, 0.25);
  color: #FFFFFF;
  padding: 4rpx 16rpx;
  border-radius: 999rpx;
}
.class-tag {
  font-size: 22rpx;
  color: rgba(255, 255, 255, 0.8);
}

/* 菜单列表 */
.menu-group {
  background: #FFFFFF;
  margin: 0 24rpx 20rpx;
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.04);
}
.menu-item {
  display: flex;
  align-items: center;
  padding: 28rpx 24rpx;
  border-bottom: 1rpx solid #F0F2F5;
}
.menu-item:last-child {
  border-bottom: none;
}
.menu-item:active {
  background: #F9FAFC;
}
.menu-icon {
  font-size: 36rpx;
  margin-right: 20rpx;
}
.menu-text {
  flex: 1;
  font-size: 30rpx;
  color: #303133;
}
.menu-arrow {
  font-size: 32rpx;
  color: #C0C4CC;
}

/* 退出登录 */
.logout-section {
  padding: 40rpx 24rpx;
}
.logout-btn {
  width: 100%;
  height: 88rpx;
  background: #FFFFFF;
  color: #F56C6C;
  font-size: 30rpx;
  border-radius: 16rpx;
  border: none;
  line-height: 88rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.04);
}
</style>
