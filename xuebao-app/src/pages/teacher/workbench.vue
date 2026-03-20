<template>
  <view class="workbench-page">
    <!-- 数据概览 -->
    <view class="overview-card">
      <view class="overview-item">
        <text class="overview-value">12</text>
        <text class="overview-label">已上传资源</text>
      </view>
      <view class="overview-divider" />
      <view class="overview-item">
        <text class="overview-value">5</text>
        <text class="overview-label">进行中任务</text>
      </view>
      <view class="overview-divider" />
      <view class="overview-item">
        <text class="overview-value">85%</text>
        <text class="overview-label">平均打卡率</text>
      </view>
    </view>

    <!-- 功能入口 -->
    <view class="section">
      <text class="section-title">教学管理</text>
      <view class="func-grid">
        <view class="func-item" @click="goPage('/pages/teacher/upload')">
          <view class="func-icon" style="background: linear-gradient(135deg, #4A90D9, #6BA3E3);">
            <text class="func-emoji">📤</text>
          </view>
          <text class="func-name">上传资源</text>
        </view>
        <view class="func-item" @click="goPage('/pages/teacher/task-publish')">
          <view class="func-icon" style="background: linear-gradient(135deg, #67C23A, #85D35E);">
            <text class="func-emoji">📋</text>
          </view>
          <text class="func-name">发布任务</text>
        </view>
        <view class="func-item" @click="goSubject">
          <view class="func-icon" style="background: linear-gradient(135deg, #FF9500, #FFB347);">
            <text class="func-emoji">📁</text>
          </view>
          <text class="func-name">资源管理</text>
        </view>
        <view class="func-item" @click="goCheckin">
          <view class="func-icon" style="background: linear-gradient(135deg, #E74C3C, #FF6B6B);">
            <text class="func-emoji">📊</text>
          </view>
          <text class="func-name">打卡数据</text>
        </view>
      </view>
    </view>

    <!-- 最近任务 -->
    <view class="section">
      <text class="section-title">最近打卡任务</text>
      <view v-for="task in recentTasks" :key="task.id" class="task-item">
        <view class="task-info">
          <text class="task-name">{{ task.title }}</text>
          <text class="task-rate">打卡率 {{ Math.round((task.checkedCount || 0) / (task.totalCount || 1) * 100) }}%</text>
        </view>
        <view class="task-bar">
          <view class="bar-fill" :style="{ width: Math.round((task.checkedCount || 0) / (task.totalCount || 1) * 100) + '%' }" />
        </view>
      </view>
      <EmptyState v-if="!recentTasks.length" text="暂无任务" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { getCheckinTasks } from '@/api/checkin'
import type { CheckinTask } from '@/types'
import EmptyState from '@/components/EmptyState.vue'

const recentTasks = ref<CheckinTask[]>([])

onShow(() => { loadData() })

async function loadData() {
  try {
    const res = await getCheckinTasks({ page: 1, pageSize: 5 })
    recentTasks.value = res.list
  } catch (e) { console.error(e) }
}

function goPage(url: string) {
  uni.navigateTo({ url })
}
function goSubject() {
  uni.switchTab({ url: '/pages/subject/index' })
}
function goCheckin() {
  uni.switchTab({ url: '/pages/checkin/index' })
}
</script>

<style scoped>
.workbench-page {
  min-height: 100vh;
  background: #F5F6FA;
  padding: 24rpx;
}
.overview-card {
  display: flex;
  background: linear-gradient(135deg, #4A90D9, #6BA3E3);
  border-radius: 20rpx;
  padding: 36rpx 0;
  margin-bottom: 28rpx;
  box-shadow: 0 4rpx 20rpx rgba(74, 144, 217, 0.3);
}
.overview-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.overview-value {
  font-size: 44rpx;
  font-weight: 700;
  color: #FFFFFF;
}
.overview-label {
  font-size: 22rpx;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 8rpx;
}
.overview-divider {
  width: 2rpx;
  background: rgba(255, 255, 255, 0.2);
}

.section { margin-bottom: 28rpx; }
.section-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #303133;
  margin-bottom: 20rpx;
  display: block;
}

.func-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}
.func-item {
  width: calc(50% - 10rpx);
  background: #FFFFFF;
  border-radius: 16rpx;
  padding: 28rpx;
  display: flex;
  align-items: center;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.04);
}
.func-item:active { background: #F9FAFC; }
.func-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20rpx;
}
.func-emoji { font-size: 36rpx; }
.func-name {
  font-size: 28rpx;
  font-weight: 500;
  color: #303133;
}

.task-item {
  background: #FFFFFF;
  border-radius: 12rpx;
  padding: 20rpx 24rpx;
  margin-bottom: 12rpx;
}
.task-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12rpx;
}
.task-name {
  font-size: 28rpx;
  color: #303133;
  font-weight: 500;
}
.task-rate {
  font-size: 24rpx;
  color: #4A90D9;
}
.task-bar {
  height: 12rpx;
  background: #E4E7ED;
  border-radius: 6rpx;
  overflow: hidden;
}
.bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #4A90D9, #6BA3E3);
  border-radius: 6rpx;
  transition: width 0.3s;
}
</style>
