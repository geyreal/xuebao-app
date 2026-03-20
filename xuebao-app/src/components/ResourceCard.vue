<template>
  <view class="resource-card" @click="$emit('click')">
    <!-- 置顶标签 -->
    <view v-if="resource.isTop" class="card-top-tag">📌 置顶</view>

    <view class="card-body">
      <!-- 文件类型图标 -->
      <view class="card-icon" :class="'icon-' + resource.fileType">
        <text class="icon-text">{{ fileTypeIcon }}</text>
      </view>

      <!-- 信息区 -->
      <view class="card-info">
        <text class="card-title text-ellipsis">{{ resource.title }}</text>
        <text class="card-desc text-ellipsis">{{ resource.description }}</text>
        <view class="card-meta flex-between">
          <view class="meta-left flex-row">
            <text class="meta-subject" :style="{ color: subjectColor }">{{ resource.subjectName }}</text>
            <text class="meta-divider">·</text>
            <text class="meta-time">{{ formatTime(resource.createdAt) }}</text>
          </view>
          <view class="meta-right flex-row">
            <text class="meta-views">👁 {{ resource.viewCount }}</text>
            <text v-if="resource.isFavorited" class="meta-fav">❤️</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Resource } from '@/types'
import { SubjectType } from '@/types'

const props = defineProps<{
  resource: Resource
}>()

defineEmits(['click'])

const fileTypeIcon = computed(() => {
  const map: Record<string, string> = { pdf: '📄', word: '📝', image: '🖼', audio: '🎵' }
  return map[props.resource.fileType] || '📁'
})

const subjectColor = computed(() => {
  const map: Record<number, string> = {
    [SubjectType.Chinese]: '#E74C3C',
    [SubjectType.Math]: '#2196F3',
    [SubjectType.English]: '#FF9800',
    [SubjectType.General]: '#4CAF50',
  }
  return map[props.resource.subjectId] || '#909399'
})

function formatTime(time: string): string {
  if (!time) return ''
  return time.slice(0, 10)
}
</script>

<style scoped>
.resource-card {
  background: #FFFFFF;
  border-radius: 16rpx;
  margin-bottom: 20rpx;
  padding: 28rpx 24rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
}
.resource-card:active {
  background: #F9FAFC;
}
.card-top-tag {
  position: absolute;
  top: 0;
  right: 0;
  background: linear-gradient(135deg, #FF9500, #FFB347);
  color: #fff;
  font-size: 20rpx;
  padding: 4rpx 16rpx 4rpx 12rpx;
  border-radius: 0 16rpx 0 12rpx;
}
.card-body {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}
.card-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: 16rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20rpx;
  flex-shrink: 0;
}
.icon-pdf { background: #FFF0F0; }
.icon-word { background: #F0F4FF; }
.icon-image { background: #F0FFF4; }
.icon-audio { background: #FFF8F0; }
.icon-text { font-size: 36rpx; }
.card-info {
  flex: 1;
  min-width: 0;
}
.card-title {
  font-size: 30rpx;
  font-weight: 600;
  color: #303133;
  margin-bottom: 8rpx;
  display: block;
}
.card-desc {
  font-size: 24rpx;
  color: #909399;
  margin-bottom: 12rpx;
  display: block;
}
.card-meta {
  font-size: 22rpx;
}
.meta-left {
  display: flex;
  align-items: center;
}
.meta-subject {
  font-weight: 500;
}
.meta-divider {
  margin: 0 8rpx;
  color: #C0C4CC;
}
.meta-time {
  color: #C0C4CC;
}
.meta-right {
  display: flex;
  align-items: center;
}
.meta-views {
  color: #C0C4CC;
  margin-right: 12rpx;
}
.meta-fav {
  font-size: 24rpx;
}
</style>
