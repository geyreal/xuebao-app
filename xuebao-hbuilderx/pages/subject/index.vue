<template>
  <view class="subject-page">
    <view class="subject-tabs">
      <view v-for="tab in tabs" :key="tab.id" class="tab-item" :class="{ active: currentTab === tab.id }" @click="switchTab(tab.id)">
        <text class="tab-text">{{ tab.name }}</text>
        <view v-if="currentTab === tab.id" class="tab-line" />
      </view>
    </view>
    <view class="search-bar">
      <view class="search-input-wrap">
        <text class="search-icon">🔍</text>
        <input v-model="keyword" class="search-input" placeholder="搜索资源..." placeholder-class="placeholder" @confirm="search" />
      </view>
    </view>
    <scroll-view scroll-y class="resource-list" @scrolltolower="loadMore">
      <view class="list-content">
        <ResourceCard v-for="item in resources" :key="item.id" :resource="item" @click="goDetail(item.id)" />
        <EmptyState v-if="!resources.length && !loading" text="暂无资源" sub-text="该学科还没有上传资源哦" />
        <view v-if="loading" class="loading-tip"><text>加载中...</text></view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, watch } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { getResources } from '@/api/resource.js'
import { SubjectType } from '@/utils/constants.js'
import ResourceCard from '@/components/ResourceCard.vue'
import EmptyState from '@/components/EmptyState.vue'

const tabs = [
  { id: 0, name: '全部' },
  { id: SubjectType.Chinese, name: '语文' },
  { id: SubjectType.Math, name: '数学' },
  { id: SubjectType.English, name: '英语' },
  { id: SubjectType.General, name: '综合' },
]
const currentTab = ref(0)
const keyword = ref('')
const resources = ref([])
const loading = ref(false)
const page = ref(1)

onShow(() => { page.value = 1; loadResources() })
watch(currentTab, () => { page.value = 1; loadResources() })

async function loadResources() {
  loading.value = true
  try {
    const params = { page: page.value, pageSize: 20 }
    if (currentTab.value > 0) params.subjectId = currentTab.value
    if (keyword.value) params.keyword = keyword.value
    const res = await getResources(params)
    resources.value = page.value === 1 ? res.list : [...resources.value, ...res.list]
  } catch (e) { console.error('加载资源失败', e) }
  finally { loading.value = false }
}
function switchTab(id) { currentTab.value = id }
function search() { page.value = 1; loadResources() }
function loadMore() { page.value++; loadResources() }
function goDetail(id) { uni.navigateTo({ url: `/pages/subject/detail?id=${id}` }) }
</script>

<style scoped>
.subject-page { min-height: 100vh; background: #F5F6FA; display: flex; flex-direction: column; }
.subject-tabs { display: flex; background: #FFFFFF; padding: 0 12rpx; box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.04); }
.tab-item { flex: 1; display: flex; flex-direction: column; align-items: center; padding: 24rpx 0 16rpx; position: relative; }
.tab-text { font-size: 28rpx; color: #909399; }
.tab-item.active .tab-text { color: #4A90D9; font-weight: 600; }
.tab-line { width: 40rpx; height: 6rpx; background: #4A90D9; border-radius: 3rpx; margin-top: 8rpx; }
.search-bar { padding: 20rpx 24rpx; }
.search-input-wrap { display: flex; align-items: center; background: #FFFFFF; border-radius: 999rpx; padding: 0 24rpx; height: 72rpx; box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.04); }
.search-icon { font-size: 28rpx; margin-right: 12rpx; }
.search-input { flex: 1; font-size: 26rpx; }
.placeholder { color: #C0C4CC; }
.resource-list { flex: 1; }
.list-content { padding: 0 24rpx 24rpx; }
.loading-tip { text-align: center; padding: 32rpx; color: #909399; font-size: 24rpx; }
</style>
