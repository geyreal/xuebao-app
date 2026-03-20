<template>
  <view class="page">
    <view class="entry-card" @click="goUpload">
      <text class="entry-icon">📤</text>
      <view class="entry-info"><text class="entry-title">上传资源</text><text class="entry-desc">上传课件、练习题、音频等学习资源</text></view>
      <text class="entry-arrow">›</text>
    </view>
    <view class="entry-card" @click="goTaskPublish">
      <text class="entry-icon">📋</text>
      <view class="entry-info"><text class="entry-title">发布打卡任务</text><text class="entry-desc">创建打卡任务，督促学生每日学习</text></view>
      <text class="entry-arrow">›</text>
    </view>
  </view>
</template>
<script setup>
function goUpload() { uni.navigateTo({ url: '/pages/teacher/upload' }) }
function goTaskPublish() { uni.navigateTo({ url: '/pages/teacher/task-publish' }) }
</script>
<style scoped>
.page { min-height: 100vh; background: #F5F6FA; padding: 24rpx; }
.entry-card { background: #FFFFFF; border-radius: 16rpx; padding: 28rpx 24rpx; margin-bottom: 16rpx; display: flex; align-items: center; box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.04); }
.entry-icon { font-size: 48rpx; margin-right: 20rpx; }
.entry-info { flex: 1; }
.entry-title { font-size: 30rpx; font-weight: 600; color: #303133; display: block; margin-bottom: 4rpx; }
.entry-desc { font-size: 24rpx; color: #909399; }
.entry-arrow { font-size: 36rpx; color: #C0C4CC; }
</style>
