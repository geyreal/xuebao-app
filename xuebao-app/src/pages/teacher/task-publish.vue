<template>
  <view class="publish-page">
    <view class="form-card">
      <!-- 任务名称 -->
      <view class="form-group">
        <text class="form-label">任务名称 <text class="required">*</text></text>
        <input v-model="form.title" class="form-input" placeholder="请输入打卡任务名称" />
      </view>

      <!-- 学科选择 -->
      <view class="form-group">
        <text class="form-label">所属学科</text>
        <view class="subject-options">
          <view
            v-for="s in subjects"
            :key="s.id"
            class="subject-option"
            :class="{ active: form.subjectId === s.id }"
            @click="form.subjectId = form.subjectId === s.id ? 0 : s.id"
          >
            <text class="option-text">{{ s.name }}</text>
          </view>
        </view>
      </view>

      <!-- 截止时间 -->
      <view class="form-group">
        <text class="form-label">截止时间</text>
        <picker mode="date" :value="form.deadline" @change="onDateChange">
          <view class="date-picker">
            <text :class="{ placeholder: !form.deadline }">
              {{ form.deadline || '请选择截止日期（可选）' }}
            </text>
            <text class="picker-arrow">📅</text>
          </view>
        </picker>
      </view>

      <!-- 任务说明 -->
      <view class="form-group">
        <text class="form-label">任务说明</text>
        <textarea
          v-model="form.description"
          class="form-textarea"
          placeholder="请输入打卡要求说明（可选）"
          :maxlength="200"
        />
        <text class="char-count">{{ (form.description || '').length }}/200</text>
      </view>

      <!-- 提交按钮 -->
      <button class="submit-btn" @click="handleSubmit">发布任务</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { SubjectType } from '@/types'

const subjects = [
  { id: SubjectType.Chinese, name: '语文' },
  { id: SubjectType.Math, name: '数学' },
  { id: SubjectType.English, name: '英语' },
  { id: SubjectType.General, name: '综合' },
]

const form = reactive({
  title: '',
  subjectId: 0,
  deadline: '',
  description: '',
})

function onDateChange(e: any) {
  form.deadline = e.detail.value
}

function handleSubmit() {
  if (!form.title.trim()) {
    uni.showToast({ title: '请输入任务名称', icon: 'none' }); return
  }

  uni.showToast({ title: '发布成功（Mock）', icon: 'success' })
  setTimeout(() => { uni.navigateBack() }, 1000)
}
</script>

<style scoped>
.publish-page {
  min-height: 100vh;
  background: #F5F6FA;
  padding: 24rpx;
}
.form-card {
  background: #FFFFFF;
  border-radius: 16rpx;
  padding: 32rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
}
.form-group { margin-bottom: 32rpx; }
.form-label {
  font-size: 28rpx;
  font-weight: 500;
  color: #303133;
  margin-bottom: 16rpx;
  display: block;
}
.required { color: #F56C6C; }
.form-input {
  height: 80rpx;
  border: 2rpx solid #E4E7ED;
  border-radius: 12rpx;
  padding: 0 24rpx;
  font-size: 28rpx;
  background: #FAFBFC;
}
.subject-options {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}
.subject-option {
  padding: 16rpx 32rpx;
  border: 2rpx solid #E4E7ED;
  border-radius: 12rpx;
  background: #FAFBFC;
}
.subject-option.active {
  border-color: #4A90D9;
  background: #F0F7FF;
}
.option-text { font-size: 26rpx; }
.subject-option.active .option-text {
  color: #4A90D9;
  font-weight: 500;
}
.date-picker {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80rpx;
  border: 2rpx solid #E4E7ED;
  border-radius: 12rpx;
  padding: 0 24rpx;
  background: #FAFBFC;
  font-size: 28rpx;
  color: #303133;
}
.date-picker .placeholder { color: #C0C4CC; }
.picker-arrow { font-size: 28rpx; }
.form-textarea {
  width: 100%;
  height: 200rpx;
  border: 2rpx solid #E4E7ED;
  border-radius: 12rpx;
  padding: 20rpx 24rpx;
  font-size: 28rpx;
  background: #FAFBFC;
  box-sizing: border-box;
}
.char-count {
  text-align: right;
  font-size: 22rpx;
  color: #C0C4CC;
  margin-top: 8rpx;
  display: block;
}
.submit-btn {
  width: 100%;
  height: 88rpx;
  background: linear-gradient(135deg, #67C23A, #85D35E);
  color: #FFFFFF;
  font-size: 32rpx;
  font-weight: 600;
  border-radius: 12rpx;
  border: none;
  line-height: 88rpx;
  margin-top: 16rpx;
}
</style>
