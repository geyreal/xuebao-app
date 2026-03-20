/** 全局应用状态 - 使用 Vue 3 原生 reactive */
import { reactive, computed } from 'vue'

const state = reactive({
  /** 当前选中的 TabBar 索引 */
  currentTabIndex: 0,
  /** 系统信息 */
  systemInfo: null as UniApp.GetSystemInfoResult | null,
})

/** 初始化系统信息 */
function initSystemInfo() {
  state.systemInfo = uni.getSystemInfoSync()
}

/** 设置当前 Tab */
function setCurrentTab(index: number) {
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
