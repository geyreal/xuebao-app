/** 全局应用状态 */
import { reactive, computed } from 'vue'

const state = reactive({
  currentTabIndex: 0,
  systemInfo: null,
})

function initSystemInfo() {
  state.systemInfo = uni.getSystemInfoSync()
}

function setCurrentTab(index) {
  state.currentTabIndex = index
}

export function useAppStore() {
  return {
    currentTabIndex: computed(() => state.currentTabIndex),
    systemInfo: computed(() => state.systemInfo),
    initSystemInfo,
    setCurrentTab,
  }
}
