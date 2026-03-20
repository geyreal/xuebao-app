<template>
  <view class="page">
    <view class="form-card">
      <text class="form-title">发布打卡任务</text>
      <view class="input-group"><text class="label">任务名称</text><input v-model="form.title" class="input" placeholder="请输入任务名称" /></view>
      <view class="input-group"><text class="label">任务说明</text><textarea v-model="form.description" class="textarea" placeholder="请输入任务说明" /></view>
      <view class="input-group"><text class="label">所属学科</text>
        <view class="tag-row">
          <text v-for="s in subjects" :key="s.id" class="tag" :class="{ active: form.subjectId === s.id }" @click="form.subjectId = s.id">{{ s.name }}</text>
        </view>
      </view>
      <button class="submit-btn" @click="handleSubmit">发布任务</button>
    </view>
  </view>
</template>
<script setup>
import { reactive } from 'vue'
import { SubjectType } from '@/utils/constants.js'
const subjects = [{ id: SubjectType.Chinese, name: '语文' }, { id: SubjectType.Math, name: '数学' }, { id: SubjectType.English, name: '英语' }, { id: SubjectType.General, name: '综合' }]
const form = reactive({ title: '', description: '', subjectId: SubjectType.Chinese })
function handleSubmit() {
  if (!form.title.trim()) { uni.showToast({ title: '请输入任务名称', icon: 'none' }); return }
  uni.showToast({ title: '发布成功（Mock）', icon: 'success' })
  setTimeout(() => uni.navigateBack(), 1000)
}
</script>
<style scoped>
.page { min-height: 100vh; background: #F5F6FA; padding: 24rpx; }
.form-card { background: #FFFFFF; border-radius: 16rpx; padding: 32rpx; box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.04); }
.form-title { font-size: 32rpx; font-weight: 600; color: #303133; display: block; margin-bottom: 28rpx; }
.input-group { margin-bottom: 28rpx; }
.label { font-size: 28rpx; color: #303133; font-weight: 500; margin-bottom: 12rpx; display: block; }
.input { height: 80rpx; border: 2rpx solid #E4E7ED; border-radius: 12rpx; padding: 0 24rpx; font-size: 28rpx; background: #FAFBFC; }
.textarea { width: 100%; height: 160rpx; border: 2rpx solid #E4E7ED; border-radius: 12rpx; padding: 16rpx 24rpx; font-size: 28rpx; background: #FAFBFC; box-sizing: border-box; }
.tag-row { display: flex; gap: 16rpx; flex-wrap: wrap; }
.tag { font-size: 24rpx; padding: 10rpx 28rpx; border-radius: 999rpx; background: #F0F2F5; color: #606266; }
.tag.active { background: #4A90D9; color: #FFFFFF; }
.submit-btn { width: 100%; height: 88rpx; background: linear-gradient(135deg, #4A90D9, #6BA3E3); color: #FFFFFF; font-size: 30rpx; font-weight: 600; border-radius: 12rpx; border: none; line-height: 88rpx; margin-top: 12rpx; }
</style>
