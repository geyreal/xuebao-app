<template>
  <view class="login-page">
    <!-- 顶部装饰 -->
    <view class="login-header">
      <view class="header-bg" />
      <view class="logo-area">
        <text class="logo-icon">📚</text>
        <text class="app-name">学伴小书包</text>
        <text class="app-slogan">智慧学习，快乐成长</text>
      </view>
    </view>

    <!-- 登录表单 -->
    <view class="login-form">
      <view class="form-card">
        <view class="input-group">
          <text class="input-label">账号</text>
          <input
            v-model="form.account"
            class="input-field"
            placeholder="请输入学号/工号"
            placeholder-class="placeholder"
          />
        </view>
        <view class="input-group">
          <text class="input-label">密码</text>
          <input
            v-model="form.password"
            class="input-field"
            type="password"
            placeholder="请输入密码"
            placeholder-class="placeholder"
          />
        </view>

        <view class="form-options flex-between">
          <view class="auto-login flex-row" @click="form.autoLogin = !form.autoLogin">
            <view class="checkbox" :class="{ checked: form.autoLogin }">
              <text v-if="form.autoLogin" class="check-mark">✓</text>
            </view>
            <text class="checkbox-label">自动登录</text>
          </view>
        </view>

        <button class="login-btn" :loading="loading" @click="handleLogin">
          登 录
        </button>

        <view class="login-tips">
          <text class="tips-text">提示：输入 T 开头账号登录教师端，其他登录学生端</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useUserStore } from '@/store/user'
import { UserRole } from '@/types'
import { setAutoLogin } from '@/utils/storage'

const userStore = useUserStore()
const loading = ref(false)

const form = reactive({
  account: '',
  password: '',
  autoLogin: false,
})

async function handleLogin() {
  if (!form.account.trim()) {
    uni.showToast({ title: '请输入账号', icon: 'none' })
    return
  }
  if (!form.password.trim()) {
    uni.showToast({ title: '请输入密码', icon: 'none' })
    return
  }

  loading.value = true
  try {
    const user = await userStore.login(form.account, form.password)
    setAutoLogin(form.autoLogin)
    uni.showToast({ title: '登录成功', icon: 'success' })
    setTimeout(() => {
      uni.switchTab({ url: '/pages/home/index' })
    }, 500)
  } catch (e: any) {
    uni.showToast({ title: e.message || '登录失败', icon: 'none' })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: #F5F6FA;
}
.login-header {
  position: relative;
  height: 480rpx;
  overflow: hidden;
}
.header-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 480rpx;
  background: linear-gradient(135deg, #4A90D9 0%, #6BA3E3 50%, #89B9ED 100%);
  border-radius: 0 0 60rpx 60rpx;
}
.logo-area {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 140rpx;
}
.logo-icon {
  font-size: 100rpx;
  margin-bottom: 20rpx;
}
.app-name {
  font-size: 48rpx;
  font-weight: bold;
  color: #FFFFFF;
  letter-spacing: 4rpx;
}
.app-slogan {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 12rpx;
}
.login-form {
  padding: 0 48rpx;
  margin-top: -60rpx;
  position: relative;
  z-index: 2;
}
.form-card {
  background: #FFFFFF;
  border-radius: 24rpx;
  padding: 48rpx 36rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.08);
}
.input-group {
  margin-bottom: 32rpx;
}
.input-label {
  font-size: 28rpx;
  color: #303133;
  font-weight: 500;
  margin-bottom: 12rpx;
  display: block;
}
.input-field {
  height: 88rpx;
  border: 2rpx solid #E4E7ED;
  border-radius: 12rpx;
  padding: 0 24rpx;
  font-size: 28rpx;
  color: #303133;
  background: #FAFBFC;
  transition: border-color 0.2s;
}
.input-field:focus {
  border-color: #4A90D9;
  background: #FFFFFF;
}
.placeholder {
  color: #C0C4CC;
}
.form-options {
  margin-bottom: 40rpx;
}
.auto-login {
  display: flex;
  align-items: center;
}
.checkbox {
  width: 36rpx;
  height: 36rpx;
  border: 2rpx solid #DCDFE6;
  border-radius: 6rpx;
  margin-right: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}
.checkbox.checked {
  background: #4A90D9;
  border-color: #4A90D9;
}
.check-mark {
  color: #FFFFFF;
  font-size: 24rpx;
  font-weight: bold;
}
.checkbox-label {
  font-size: 26rpx;
  color: #606266;
}
.login-btn {
  width: 100%;
  height: 88rpx;
  background: linear-gradient(135deg, #4A90D9, #6BA3E3);
  color: #FFFFFF;
  font-size: 32rpx;
  font-weight: 600;
  border-radius: 12rpx;
  border: none;
  letter-spacing: 8rpx;
  line-height: 88rpx;
}
.login-btn:active {
  opacity: 0.9;
}
.login-tips {
  margin-top: 32rpx;
  text-align: center;
}
.tips-text {
  font-size: 22rpx;
  color: #C0C4CC;
}
</style>
