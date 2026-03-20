<template>
  <view class="page"><text class="title">学习记录</text><EmptyState text="暂无记录" sub-text="开始学习资源后会自动记录哦" /></view>
</template>
<script setup>
import EmptyState from '@/components/EmptyState.vue'
</script>
<style scoped>
.page { min-height: 100vh; background: #F5F6FA; padding: 24rpx; }
.title { font-size: 32rpx; font-weight: 600; color: #303133; display: block; margin-bottom: 20rpx; }
</style>
