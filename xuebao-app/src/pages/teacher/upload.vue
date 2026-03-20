<template>
  <view class="upload-page">
    <view class="form-card">
      <!-- 资源标题 -->
      <view class="form-group">
        <text class="form-label">资源标题 <text class="required">*</text></text>
        <input v-model="form.title" class="form-input" placeholder="请输入资源标题" />
      </view>

      <!-- 学科选择 -->
      <view class="form-group">
        <text class="form-label">所属学科 <text class="required">*</text></text>
        <view class="subject-options">
          <view
            v-for="s in subjects"
            :key="s.id"
            class="subject-option"
            :class="{ active: form.subjectId === s.id }"
            @click="form.subjectId = s.id"
          >
            <text class="option-text">{{ s.name }}</text>
          </view>
        </view>
      </view>

      <!-- 班级选择 -->
      <view class="form-group">
        <text class="form-label">所属班级 <text class="required">*</text></text>
        <view class="class-options">
          <view class="class-option active">
            <text class="option-text">三年级1班</text>
          </view>
          <view class="class-option">
            <text class="option-text">三年级2班</text>
          </view>
        </view>
      </view>

      <!-- 文件选择 -->
      <view class="form-group">
        <text class="form-label">选择文件 <text class="required">*</text></text>
        <view class="file-picker" @click="chooseFile">
          <view v-if="!form.fileName" class="picker-empty">
            <text class="picker-icon">📎</text>
            <text class="picker-text">点击选择文件</text>
            <text class="picker-hint">支持 PDF、Word、图片、音频</text>
          </view>
          <view v-else class="picker-filled">
            <text class="file-name">{{ form.fileName }}</text>
            <text class="file-change">更换</text>
          </view>
        </view>
      </view>

      <!-- 简介 -->
      <view class="form-group">
        <text class="form-label">资源简介</text>
        <textarea
          v-model="form.description"
          class="form-textarea"
          placeholder="简要说明资源内容，方便学生了解"
          :maxlength="200"
        />
        <text class="char-count">{{ (form.description || '').length }}/200</text>
      </view>

      <!-- 提交按钮 -->
      <button class="submit-btn" @click="handleSubmit">上传资源</button>
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
  classId: 1,
  fileName: '',
  description: '',
})

function chooseFile() {
  // Mock 文件选择
  form.fileName = '三年级语文课件.pdf'
  uni.showToast({ title: '已选择文件（Mock）', icon: 'none' })
}

function handleSubmit() {
  if (!form.title.trim()) {
    uni.showToast({ title: '请输入资源标题', icon: 'none' }); return
  }
  if (!form.subjectId) {
    uni.showToast({ title: '请选择学科', icon: 'none' }); return
  }
  if (!form.fileName) {
    uni.showToast({ title: '请选择文件', icon: 'none' }); return
  }

  uni.showToast({ title: '上传成功（Mock）', icon: 'success' })
  setTimeout(() => { uni.navigateBack() }, 1000)
}
</script>

<style scoped>
.upload-page {
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
.form-group {
  margin-bottom: 32rpx;
}
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
.subject-options, .class-options {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}
.subject-option, .class-option {
  padding: 16rpx 32rpx;
  border: 2rpx solid #E4E7ED;
  border-radius: 12rpx;
  background: #FAFBFC;
}
.subject-option.active, .class-option.active {
  border-color: #4A90D9;
  background: #F0F7FF;
  color: #4A90D9;
}
.option-text {
  font-size: 26rpx;
}
.subject-option.active .option-text,
.class-option.active .option-text {
  color: #4A90D9;
  font-weight: 500;
}
.file-picker {
  border: 2rpx dashed #E4E7ED;
  border-radius: 12rpx;
  overflow: hidden;
}
.picker-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48rpx;
}
.picker-icon { font-size: 48rpx; margin-bottom: 12rpx; }
.picker-text { font-size: 28rpx; color: #606266; margin-bottom: 8rpx; }
.picker-hint { font-size: 22rpx; color: #C0C4CC; }
.picker-filled {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24rpx;
}
.file-name { font-size: 28rpx; color: #303133; flex: 1; }
.file-change { font-size: 24rpx; color: #4A90D9; }
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
  background: linear-gradient(135deg, #4A90D9, #6BA3E3);
  color: #FFFFFF;
  font-size: 32rpx;
  font-weight: 600;
  border-radius: 12rpx;
  border: none;
  line-height: 88rpx;
  margin-top: 16rpx;
}
</style>
