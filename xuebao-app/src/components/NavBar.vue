<template>
  <view class="nav-bar" :style="{ paddingTop: statusBarHeight + 'px' }">
    <view class="nav-bar-content">
      <view v-if="showBack" class="nav-back" @click="goBack">
        <text class="back-icon">‹</text>
      </view>
      <view class="nav-title">
        <text class="title-text">{{ title }}</text>
      </view>
      <view class="nav-right">
        <slot name="right" />
      </view>
    </view>
  </view>
  <!-- 占位 -->
  <view :style="{ height: (statusBarHeight + 44) + 'px' }" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  title: string
  showBack?: boolean
}>()

const statusBarHeight = ref(0)

try {
  const info = uni.getSystemInfoSync()
  statusBarHeight.value = info.statusBarHeight || 0
} catch (e) {}

function goBack() {
  uni.navigateBack({ delta: 1 })
}
</script>

<style scoped>
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background: linear-gradient(135deg, #4A90D9, #6BA3E3);
}
.nav-bar-content {
  height: 44px;
  display: flex;
  align-items: center;
  padding: 0 16rpx;
  position: relative;
}
.nav-back {
  width: 80rpx;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.back-icon {
  font-size: 48rpx;
  color: #FFFFFF;
  font-weight: bold;
}
.nav-title {
  flex: 1;
  text-align: center;
}
.title-text {
  font-size: 34rpx;
  font-weight: 600;
  color: #FFFFFF;
}
.nav-right {
  width: 80rpx;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
