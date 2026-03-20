<template>
  <view class="page"><text class="title">我的收藏</text><EmptyState text="暂无收藏" sub-text="浏览学科中心收藏喜欢的资源吧" /></view>
</template>
<script setup>
import EmptyState from '@/components/EmptyState.vue'
</script>
<style scoped>
.page { min-height: 100vh; background: #F5F6FA; padding: 24rpx; }
.title { font-size: 32rpx; font-weight: 600; color: #303133; display: block; margin-bottom: 20rpx; }
</style>
