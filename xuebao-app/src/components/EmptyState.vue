<template>
  <view class="empty-state">
    <view class="empty-icon">📭</view>
    <text class="empty-text">{{ text || '暂无数据' }}</text>
    <text v-if="subText" class="empty-sub-text">{{ subText }}</text>
  </view>
</template>

<script setup lang="ts">
defineProps<{
  text?: string
  subText?: string
}>()
</script>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120rpx 0;
}
.empty-icon {
  font-size: 100rpx;
  margin-bottom: 24rpx;
}
.empty-text {
  font-size: 30rpx;
  color: #909399;
}
.empty-sub-text {
  font-size: 24rpx;
  color: #C0C4CC;
  margin-top: 12rpx;
}
</style>
