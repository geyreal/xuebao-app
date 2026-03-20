<template>
  <view class="favorites-page">
    <view class="list-content">
      <ResourceCard
        v-for="item in resources"
        :key="item.id"
        :resource="item"
        @click="goDetail(item.id)"
      />
      <EmptyState v-if="!resources.length && !loading" text="暂无收藏" sub-text="去学科中心收藏感兴趣的资源吧" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { getFavorites } from '@/api/resource'
import type { Resource } from '@/types'
import ResourceCard from '@/components/ResourceCard.vue'
import EmptyState from '@/components/EmptyState.vue'

const resources = ref<Resource[]>([])
const loading = ref(false)

onShow(() => { loadData() })

async function loadData() {
  loading.value = true
  try {
    const res = await getFavorites({ page: 1, pageSize: 50 })
    resources.value = res.list.filter(r => r.isFavorited)
  } catch (e) { console.error(e) }
  finally { loading.value = false }
}

function goDetail(id: number) {
  uni.navigateTo({ url: `/pages/subject/detail?id=${id}` })
}
</script>

<style scoped>
.favorites-page {
  min-height: 100vh;
  background: #F5F6FA;
}
.list-content {
  padding: 24rpx;
}
</style>
