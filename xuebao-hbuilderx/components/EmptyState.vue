<template>
  <view class="empty-state">
    <text class="empty-icon">📭</text>
    <text class="empty-text">{{ text }}</text>
    <text v-if="subText" class="empty-sub">{{ subText }}</text>
  </view>
</template>

<script setup>
defineProps({ text: { type: String, default: '暂无数据' }, subText: { type: String, default: '' } })
</script>

<style scoped>
.empty-state { display: flex; flex-direction: column; align-items: center; padding: 80rpx 0; }
.empty-icon { font-size: 80rpx; margin-bottom: 20rpx; }
.empty-text { font-size: 28rpx; color: #909399; margin-bottom: 8rpx; }
.empty-sub { font-size: 24rpx; color: #C0C4CC; }
</style>
