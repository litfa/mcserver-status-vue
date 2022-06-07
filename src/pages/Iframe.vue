<script lang="ts" setup>
import AreaChart from '@/components/Chart/AreaChart.vue'
import StackedLineChart from '@/components/Chart/StackedLineChart.vue'
import { ref } from 'vue'
import { ElSelect, ElOption } from 'element-plus'
import { toggleDark } from '@/utils/theme'
import { useRoute } from 'vue-router'

const route = useRoute()

const { dark } = route.query
// 切换暗色
toggleDark(Boolean(dark == 'true'))

const value = ref('6h')

const showHour = ref(true)
const showStacked = ref(false)

// 淡入淡出动画 手动控制显示隐藏
const change = (e: string) => {
  if (e == '6h' || e == '24h') {
    showStacked.value = false
    setTimeout(() => {
      showHour.value = true
    }, 300)
  } else {
    showHour.value = false
    setTimeout(() => {
      showStacked.value = true
    }, 300)
  }
}
</script>

<template>
  <div class="title">
    <h3>一个je服</h3>
    <el-select v-model="value" size="small" @change="change">
      <el-option label="6小时" value="6h" />
      <el-option label="24小时" value="24h" />
      <el-option label="7天" value="7d" />
      <el-option label="30天" value="30d" />
    </el-select>
  </div>

  <transition name="el-fade-in-linear">
    <AreaChart v-if="showHour" :id="Number($route.query.id)" :length="value"></AreaChart>
  </transition>
  <transition name="el-fade-in-linear">
    <StackedLineChart v-if="showStacked" :id="Number($route.query.id)" :length="value"></StackedLineChart>
  </transition>
</template>

<style lang="less" scoped>
.el-select {
  width: 100px;
}
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 10px;
  box-sizing: border-box;
}
</style>