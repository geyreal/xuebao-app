<template>
  <view class="detail-page">
    <view class="detail-card">
      <text class="detail-title">{{ resource.title }}</text>
      <view class="detail-meta flex-row">
        <text class="meta-subject" :style="{ color: subjectColor }">{{ resource.subjectName }}</text>
        <text class="meta-dot">·</text>
        <text class="meta-info">{{ resource.uploaderName }}</text>
        <text class="meta-dot">·</text>
        <text class="meta-info">{{ resource.createdAt?.slice(0, 10) }}</text>
      </view>
      <text class="detail-desc">{{ resource.description }}</text>
      <view class="detail-stats flex-row">
        <text class="stat-item">👁 {{ resource.viewCount }} 次查看</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getResourceDetail } from '@/api/resource.js'
import { SubjectType } from '@/utils/constants.js'

const resource = ref({})
const subjectColor = computed(() => {
  const map = { [SubjectType.Chinese]: '#E74C3C', [SubjectType.Math]: '#2196F3', [SubjectType.English]: '#FF9800', [SubjectType.General]: '#4CAF50' }
  return map[resource.value.subjectId] || '#909399'
})

onLoad((options) => {
  if (options.id) loadDetail(Number(options.id))
})

async function loadDetail(id) {
  try { resource.value = await getResourceDetail(id) } catch (e) { console.error(e) }
}
</script>

<style scoped>
.detail-page { min-height: 100vh; background: #F5F6FA; padding: 24rpx; }
.detail-card { background: #FFFFFF; border-radius: 16rpx; padding: 32rpx; box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.04); }
.detail-title { font-size: 36rpx; font-weight: 700; color: #303133; display: block; margin-bottom: 16rpx; }
.detail-meta { margin-bottom: 24rpx; flex-wrap: wrap; }
.meta-subject { font-size: 24rpx; font-weight: 500; }
.meta-dot { margin: 0 8rpx; color: #C0C4CC; }
.meta-info { font-size: 24rpx; color: #909399; }
.detail-desc { font-size: 28rpx; color: #606266; line-height: 1.8; display: block; margin-bottom: 24rpx; }
.detail-stats { font-size: 24rpx; color: #909399; }
.stat-item { margin-right: 24rpx; }
</style>
