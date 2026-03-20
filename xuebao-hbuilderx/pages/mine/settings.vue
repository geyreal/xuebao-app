<template>
  <view class="page">
    <view class="menu-group">
      <view class="menu-item"><text class="menu-text">关于学伴小书包</text><text class="menu-value">v1.0.0</text></view>
      <view class="menu-item" @click="clearCache"><text class="menu-text">清除缓存</text><text class="menu-arrow">›</text></view>
    </view>
  </view>
</template>
<script setup>
function clearCache() {
  uni.showModal({
    title: '提示', content: '确定清除缓存吗？',
    success: (res) => { if (res.confirm) { uni.clearStorageSync(); uni.showToast({ title: '已清除', icon: 'success' }) } }
  })
}
</script>
<style scoped>
.page { min-height: 100vh; background: #F5F6FA; padding: 24rpx; }
.menu-group { background: #FFFFFF; border-radius: 16rpx; overflow: hidden; box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.04); }
.menu-item { display: flex; align-items: center; padding: 28rpx 24rpx; border-bottom: 1rpx solid #F0F2F5; }
.menu-item:last-child { border-bottom: none; }
.menu-text { flex: 1; font-size: 30rpx; color: #303133; }
.menu-value { font-size: 26rpx; color: #909399; }
.menu-arrow { font-size: 32rpx; color: #C0C4CC; }
</style>
