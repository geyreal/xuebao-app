<template>
  <view class="resource-card" @click="$emit('click')">
    <view class="card-header flex-between">
      <view class="card-info">
        <text class="card-title">{{ resource.title }}</text>
        <text class="card-subject" :style="{ color: subjectColor }">{{ resource.subjectName }}</text>
      </view>
      <view v-if="resource.isTop" class="top-tag">
        <text class="top-text">置顶</text>
      </view>
    </view>
    <text v-if="resource.description" class="card-desc">{{ resource.description }}</text>
    <view class="card-footer flex-between">
      <text class="card-meta">
        {{ resource.uploaderName }} · {{ fileTypeText }} · {{ fileSizeText }}
      </text>
      <text class="card-views">👁 {{ resource.viewCount }}</text>
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue'
import { SubjectType } from '@/utils/constants.js'

const props = defineProps({ resource: { type: Object, required: true } })
defineEmits(['click'])

const subjectColor = computed(() => {
  const map = { [SubjectType.Chinese]: '#E74C3C', [SubjectType.Math]: '#2196F3', [SubjectType.English]: '#FF9800', [SubjectType.General]: '#4CAF50' }
  return map[props.resource.subjectId] || '#909399'
})

const fileTypeText = computed(() => {
  const map = { pdf: 'PDF', word: 'Word', image: '图片', audio: '音频' }
  return map[props.resource.fileType] || props.resource.fileType
})

const fileSizeText = computed(() => {
  const size = props.resource.fileSize
  if (size < 1024) return size + 'B'
  if (size < 1024 * 1024) return (size / 1024).toFixed(1) + 'KB'
  return (size / 1024 / 1024).toFixed(1) + 'MB'
})
</script>

<style scoped>
.resource-card { background: #FFFFFF; border-radius: 16rpx; padding: 24rpx; margin-bottom: 16rpx; box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.04); }
.card-header { margin-bottom: 12rpx; }
.card-info { flex: 1; }
.card-title { font-size: 30rpx; font-weight: 600; color: #303133; display: block; margin-bottom: 4rpx; }
.card-subject { font-size: 22rpx; font-weight: 500; }
.top-tag { background: #FFF3E0; padding: 4rpx 12rpx; border-radius: 6rpx; }
.top-text { font-size: 20rpx; color: #FF9500; }
.card-desc { font-size: 24rpx; color: #909399; margin-bottom: 12rpx; display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.card-footer { font-size: 22rpx; color: #C0C4CC; }
.card-views { color: #909399; }
</style>
