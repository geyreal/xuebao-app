<template>
  <view class="checkin-page">
    <view class="stats-card">
      <view class="stat-item"><text class="stat-value">{{ stats.consecutiveDays }}</text><text class="stat-label">连续打卡</text></view>
      <view class="stat-divider" />
      <view class="stat-item"><text class="stat-value">{{ stats.totalChecked }}</text><text class="stat-label">累计打卡</text></view>
      <view class="stat-divider" />
      <view class="stat-item"><text class="stat-value">{{ Math.round(stats.completionRate * 100) }}%</text><text class="stat-label">完成率</text></view>
    </view>
    <view class="section calendar-section">
      <view class="section-header flex-between">
        <text class="section-title">打卡日历</text>
        <view class="month-nav flex-row">
          <text class="nav-btn" @click="prevMonth">‹</text>
          <text class="month-text">{{ currentYear }}年{{ currentMonth }}月</text>
          <text class="nav-btn" @click="nextMonth">›</text>
        </view>
      </view>
      <view class="calendar-grid">
        <view class="weekday-row"><text v-for="day in weekDays" :key="day" class="weekday-cell">{{ day }}</text></view>
        <view class="date-grid">
          <view v-for="(day, idx) in calendarDays" :key="idx" class="date-cell" :class="{ empty: !day.date, checked: day.checked, today: day.isToday }">
            <text v-if="day.date" class="date-text">{{ day.date }}</text>
            <text v-if="day.checked" class="check-dot">✓</text>
          </view>
        </view>
      </view>
    </view>
    <view class="section">
      <text class="section-title">打卡任务</text>
      <view v-for="task in tasks" :key="task.id" class="task-card">
        <view class="task-header flex-between">
          <view class="task-info"><text class="task-title">{{ task.title }}</text><text class="task-subject" :style="{ color: getSubjectColor(task.subjectId) }">{{ task.subjectName }}</text></view>
          <view class="checkin-btn" :class="{ checked: task.isChecked }" @click="handleCheckin(task)"><text class="checkin-btn-text">{{ task.isChecked ? '已打卡' : '打卡' }}</text></view>
        </view>
        <text v-if="task.description" class="task-desc">{{ task.description }}</text>
        <view class="task-footer flex-between">
          <text class="task-deadline">{{ task.deadline ? '截止：' + task.deadline.slice(0, 10) : '无截止时间' }}</text>
          <text class="task-progress">{{ task.checkedCount }}/{{ task.totalCount }} 已打卡</text>
        </view>
      </view>
      <EmptyState v-if="!tasks.length" text="暂无打卡任务" />
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { getCheckinTasks, getCheckinStats, getCheckinCalendar } from '@/api/checkin.js'
import { SubjectType } from '@/utils/constants.js'
import EmptyState from '@/components/EmptyState.vue'

const weekDays = ['日', '一', '二', '三', '四', '五', '六']
const tasks = ref([])
const stats = ref({ consecutiveDays: 0, totalChecked: 0, completionRate: 0 })
const checkedDates = ref([])
const now = new Date()
const currentYear = ref(now.getFullYear())
const currentMonth = ref(now.getMonth() + 1)

const calendarDays = computed(() => {
  const year = currentYear.value, month = currentMonth.value
  const firstDay = new Date(year, month - 1, 1).getDay()
  const daysInMonth = new Date(year, month, 0).getDate()
  const today = new Date()
  const days = []
  for (let i = 0; i < firstDay; i++) days.push({ date: null, checked: false, isToday: false })
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    days.push({ date: d, checked: checkedDates.value.includes(dateStr), isToday: today.getFullYear() === year && today.getMonth() + 1 === month && today.getDate() === d })
  }
  return days
})

onShow(() => { loadData() })

async function loadData() {
  try {
    const [taskRes, statsRes, calendarRes] = await Promise.all([getCheckinTasks({ page: 1, pageSize: 20 }), getCheckinStats(), getCheckinCalendar({ year: currentYear.value, month: currentMonth.value })])
    tasks.value = taskRes.list; stats.value = statsRes; checkedDates.value = calendarRes
  } catch (e) { console.error(e) }
}
function prevMonth() { if (currentMonth.value === 1) { currentYear.value--; currentMonth.value = 12 } else { currentMonth.value-- } loadCalendar() }
function nextMonth() { if (currentMonth.value === 12) { currentYear.value++; currentMonth.value = 1 } else { currentMonth.value++ } loadCalendar() }
async function loadCalendar() { try { checkedDates.value = await getCheckinCalendar({ year: currentYear.value, month: currentMonth.value }) } catch (e) {} }
function handleCheckin(task) { if (task.isChecked) return; task.isChecked = true; if (task.checkedCount !== undefined) task.checkedCount++; uni.showToast({ title: '打卡成功！', icon: 'success' }) }
function getSubjectColor(subjectId) { const map = { [SubjectType.Chinese]: '#E74C3C', [SubjectType.Math]: '#2196F3', [SubjectType.English]: '#FF9800', [SubjectType.General]: '#4CAF50' }; return map[subjectId || 0] || '#909399' }
</script>

<style scoped>
.checkin-page { min-height: 100vh; background: #F5F6FA; padding: 24rpx; }
.stats-card { display: flex; background: linear-gradient(135deg, #4A90D9, #6BA3E3); border-radius: 20rpx; padding: 36rpx 0; margin-bottom: 24rpx; box-shadow: 0 4rpx 20rpx rgba(74,144,217,0.3); }
.stat-item { flex: 1; display: flex; flex-direction: column; align-items: center; }
.stat-value { font-size: 48rpx; font-weight: 700; color: #FFFFFF; margin-bottom: 8rpx; }
.stat-label { font-size: 24rpx; color: rgba(255,255,255,0.8); }
.stat-divider { width: 2rpx; background: rgba(255,255,255,0.2); margin: 8rpx 0; }
.calendar-section { background: #FFFFFF; border-radius: 16rpx; padding: 24rpx; margin-bottom: 24rpx; }
.section { margin-bottom: 24rpx; }
.section-header { margin-bottom: 20rpx; }
.section-title { font-size: 32rpx; font-weight: 600; color: #303133; margin-bottom: 20rpx; display: block; }
.month-nav { gap: 24rpx; }
.nav-btn { font-size: 36rpx; color: #4A90D9; font-weight: bold; padding: 0 8rpx; }
.month-text { font-size: 28rpx; color: #606266; font-weight: 500; }
.weekday-row { display: flex; margin-bottom: 12rpx; }
.weekday-cell { flex: 1; text-align: center; font-size: 24rpx; color: #909399; padding: 8rpx 0; }
.date-grid { display: flex; flex-wrap: wrap; }
.date-cell { width: calc(100% / 7); height: 80rpx; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; }
.date-text { font-size: 26rpx; color: #303133; }
.date-cell.checked .date-text { color: #4A90D9; font-weight: 600; }
.date-cell.today .date-text { background: #4A90D9; color: #FFFFFF; width: 48rpx; height: 48rpx; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
.check-dot { font-size: 16rpx; color: #67C23A; position: absolute; bottom: 4rpx; }
.task-card { background: #FFFFFF; border-radius: 16rpx; padding: 24rpx; margin-bottom: 16rpx; box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.04); }
.task-header { margin-bottom: 12rpx; }
.task-info { flex: 1; }
.task-title { font-size: 30rpx; font-weight: 600; color: #303133; display: block; margin-bottom: 4rpx; }
.task-subject { font-size: 22rpx; font-weight: 500; }
.checkin-btn { background: linear-gradient(135deg, #4A90D9, #6BA3E3); padding: 12rpx 32rpx; border-radius: 999rpx; box-shadow: 0 2rpx 8rpx rgba(74,144,217,0.3); }
.checkin-btn.checked { background: #E4E7ED; box-shadow: none; }
.checkin-btn-text { font-size: 24rpx; font-weight: 500; color: #FFFFFF; }
.checkin-btn.checked .checkin-btn-text { color: #909399; }
.task-desc { font-size: 24rpx; color: #909399; margin-bottom: 12rpx; display: block; }
.task-footer { font-size: 22rpx; color: #C0C4CC; }
.task-progress { color: #4A90D9; }
</style>
