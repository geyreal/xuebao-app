<template>
  <view class="detail-page">
    <!-- 资源信息头 -->
    <view class="detail-header">
      <view class="header-top flex-between">
        <text class="subject-tag" :style="{ background: subjectBg, color: subjectColor }">
          {{ resource.subjectName }}
        </text>
        <text class="file-type-tag">{{ fileTypeLabel }}</text>
      </view>
      <text class="detail-title">{{ resource.title }}</text>
      <text class="detail-desc">{{ resource.description }}</text>
      <view class="detail-meta flex-row">
        <text class="meta-item">👤 {{ resource.uploaderName }}</text>
        <text class="meta-item">📅 {{ resource.createdAt?.slice(0, 10) }}</text>
        <text class="meta-item">👁 {{ resource.viewCount }}</text>
      </view>
    </view>

    <!-- 内容预览区 -->
    <view class="preview-area">
      <view v-if="resource.fileType === 'pdf' || resource.fileType === 'word'" class="preview-doc">
        <view class="preview-placeholder">
          <text class="preview-icon">📄</text>
          <text class="preview-text">文档预览区域</text>
          <text class="preview-sub">（集成后端后支持在线预览）</text>
        </view>
      </view>
      <view v-else-if="resource.fileType === 'image'" class="preview-image">
        <view class="preview-placeholder">
          <text class="preview-icon">🖼</text>
          <text class="preview-text">图片预览区域</text>
          <text class="preview-sub">（集成后端后显示图片）</text>
        </view>
      </view>
      <view v-else-if="resource.fileType === 'audio'" class="preview-audio">
        <view class="audio-player">
          <text class="audio-icon">🎵</text>
          <view class="audio-info">
            <text class="audio-title">{{ resource.title }}</text>
            <view class="audio-progress">
              <view class="progress-bar">
                <view class="progress-fill" :style="{ width: '35%' }" />
              </view>
              <view class="audio-time flex-between">
                <text class="time-text">01:23</text>
                <text class="time-text">03:45</text>
              </view>
            </view>
          </view>
        </view>
        <view class="audio-controls flex-center">
          <text class="control-btn">⏪</text>
          <text class="control-btn play-btn">▶</text>
          <text class="control-btn">⏩</text>
          <text class="control-btn speed-btn">1.0x</text>
        </view>
      </view>
    </view>

    <!-- 底部操作栏 -->
    <view class="action-bar safe-bottom">
      <view class="action-btn" @click="toggleFavorite">
        <text class="action-icon">{{ isFavorited ? '❤️' : '🤍' }}</text>
        <text class="action-text">{{ isFavorited ? '已收藏' : '收藏' }}</text>
      </view>
      <view class="action-btn" @click="toggleStudied">
        <text class="action-icon">{{ isStudied ? '✅' : '📝' }}</text>
        <text class="action-text">{{ isStudied ? '已学习' : '标记学习' }}</text>
      </view>
      <view class="action-btn primary-action" @click="goCheckin">
        <text class="action-text-primary">去打卡</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getResourceDetail } from '@/api/resource'
import { SubjectType } from '@/types'
import type { Resource } from '@/types'

const resource = ref<Resource>({} as Resource)
const isFavorited = ref(false)
const isStudied = ref(false)

const subjectColor = computed(() => {
  const map: Record<number, string> = {
    [SubjectType.Chinese]: '#E74C3C',
    [SubjectType.Math]: '#2196F3',
    [SubjectType.English]: '#FF9800',
    [SubjectType.General]: '#4CAF50',
  }
  return map[resource.value.subjectId] || '#909399'
})

const subjectBg = computed(() => {
  const map: Record<number, string> = {
    [SubjectType.Chinese]: '#FFF0F0',
    [SubjectType.Math]: '#F0F4FF',
    [SubjectType.English]: '#FFF8F0',
    [SubjectType.General]: '#F0FFF4',
  }
  return map[resource.value.subjectId] || '#F5F5F5'
})

const fileTypeLabel = computed(() => {
  const map: Record<string, string> = { pdf: 'PDF', word: 'Word', image: '图片', audio: '音频' }
  return map[resource.value.fileType] || ''
})

onLoad((query) => {
  const id = Number(query?.id || 1)
  loadDetail(id)
})

async function loadDetail(id: number) {
  try {
    const res = await getResourceDetail(id)
    resource.value = res
    isFavorited.value = res.isFavorited || false
    isStudied.value = res.isStudied || false
  } catch (e) {
    console.error('加载资源详情失败', e)
  }
}

function toggleFavorite() {
  isFavorited.value = !isFavorited.value
  uni.showToast({ title: isFavorited.value ? '已收藏' : '已取消收藏', icon: 'none' })
}

function toggleStudied() {
  isStudied.value = !isStudied.value
  uni.showToast({ title: isStudied.value ? '已标记学习' : '已取消标记', icon: 'none' })
}

function goCheckin() {
  uni.switchTab({ url: '/pages/checkin/index' })
}
</script>

<style scoped>
.detail-page {
  min-height: 100vh;
  background: #F5F6FA;
  padding-bottom: 120rpx;
}
.detail-header {
  background: #FFFFFF;
  padding: 24rpx 32rpx;
  margin-bottom: 20rpx;
}
.header-top {
  margin-bottom: 16rpx;
}
.subject-tag {
  font-size: 22rpx;
  padding: 4rpx 16rpx;
  border-radius: 6rpx;
  font-weight: 500;
}
.file-type-tag {
  font-size: 22rpx;
  color: #909399;
  background: #F0F2F5;
  padding: 4rpx 16rpx;
  border-radius: 6rpx;
}
.detail-title {
  font-size: 36rpx;
  font-weight: 700;
  color: #303133;
  margin-bottom: 12rpx;
  display: block;
  line-height: 1.4;
}
.detail-desc {
  font-size: 28rpx;
  color: #606266;
  margin-bottom: 20rpx;
  display: block;
  line-height: 1.6;
}
.detail-meta {
  flex-wrap: wrap;
}
.meta-item {
  font-size: 22rpx;
  color: #C0C4CC;
  margin-right: 24rpx;
}

/* 预览区 */
.preview-area {
  background: #FFFFFF;
  margin: 0 24rpx;
  border-radius: 16rpx;
  overflow: hidden;
}
.preview-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120rpx 0;
}
.preview-icon {
  font-size: 80rpx;
  margin-bottom: 20rpx;
}
.preview-text {
  font-size: 30rpx;
  color: #606266;
  margin-bottom: 8rpx;
}
.preview-sub {
  font-size: 24rpx;
  color: #C0C4CC;
}

/* 音频播放器 */
.audio-player {
  display: flex;
  padding: 32rpx;
  align-items: center;
}
.audio-icon {
  font-size: 60rpx;
  margin-right: 24rpx;
}
.audio-info {
  flex: 1;
}
.audio-title {
  font-size: 28rpx;
  font-weight: 500;
  color: #303133;
  margin-bottom: 12rpx;
  display: block;
}
.progress-bar {
  height: 8rpx;
  background: #E4E7ED;
  border-radius: 4rpx;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: #4A90D9;
  border-radius: 4rpx;
}
.audio-time {
  margin-top: 8rpx;
}
.time-text {
  font-size: 20rpx;
  color: #C0C4CC;
}
.audio-controls {
  padding: 16rpx 32rpx 32rpx;
  gap: 48rpx;
}
.control-btn {
  font-size: 40rpx;
  color: #606266;
}
.play-btn {
  font-size: 56rpx;
  color: #4A90D9;
}
.speed-btn {
  font-size: 24rpx;
  background: #F0F2F5;
  padding: 6rpx 16rpx;
  border-radius: 8rpx;
}

/* 底部操作栏 */
.action-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #FFFFFF;
  display: flex;
  align-items: center;
  padding: 16rpx 32rpx;
  box-shadow: 0 -2rpx 12rpx rgba(0, 0, 0, 0.06);
}
.action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8rpx 24rpx;
}
.action-icon {
  font-size: 36rpx;
  margin-bottom: 4rpx;
}
.action-text {
  font-size: 20rpx;
  color: #909399;
}
.primary-action {
  flex: 1;
  margin-left: 24rpx;
  background: linear-gradient(135deg, #4A90D9, #6BA3E3);
  border-radius: 999rpx;
  padding: 20rpx;
  flex-direction: row;
  justify-content: center;
}
.action-text-primary {
  font-size: 28rpx;
  font-weight: 600;
  color: #FFFFFF;
}
</style>
