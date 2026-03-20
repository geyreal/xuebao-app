<template>
  <view class="settings-page">
    <view class="menu-group">
      <view class="menu-item" @click="showChangePassword">
        <text class="menu-icon">🔒</text>
        <text class="menu-text">修改密码</text>
        <text class="menu-arrow">›</text>
      </view>
      <view class="menu-item" @click="clearCache">
        <text class="menu-icon">🗑</text>
        <text class="menu-text">清除缓存</text>
        <text class="menu-value">{{ cacheSize }}</text>
        <text class="menu-arrow">›</text>
      </view>
    </view>

    <view class="menu-group">
      <view class="menu-item">
        <text class="menu-icon">ℹ️</text>
        <text class="menu-text">版本号</text>
        <text class="menu-value">v1.0.0</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const cacheSize = ref('2.3 MB')

function showChangePassword() {
  uni.showToast({ title: '功能开发中', icon: 'none' })
}

function clearCache() {
  uni.showModal({
    title: '提示',
    content: '确定要清除缓存吗？',
    success: (res) => {
      if (res.confirm) {
        uni.showToast({ title: '缓存已清除', icon: 'success' })
        cacheSize.value = '0 B'
      }
    },
  })
}
</script>

<style scoped>
.settings-page {
  min-height: 100vh;
  background: #F5F6FA;
  padding: 24rpx;
}
.menu-group {
  background: #FFFFFF;
  border-radius: 16rpx;
  overflow: hidden;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.04);
}
.menu-item {
  display: flex;
  align-items: center;
  padding: 28rpx 24rpx;
  border-bottom: 1rpx solid #F0F2F5;
}
.menu-item:last-child { border-bottom: none; }
.menu-item:active { background: #F9FAFC; }
.menu-icon { font-size: 36rpx; margin-right: 20rpx; }
.menu-text { flex: 1; font-size: 30rpx; color: #303133; }
.menu-value { font-size: 26rpx; color: #909399; margin-right: 8rpx; }
.menu-arrow { font-size: 32rpx; color: #C0C4CC; }
</style>
