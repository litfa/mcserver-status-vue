<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { ElTabs, ElTabPane } from 'element-plus'
import Card from '@/components/Card/Card.vue'
import getServersApi from '@/apis/getServers'

const activeName = ref<'all' | 'je' | 'be'>('all')

interface dataRes {
  id: number
  name: string
  host: string
  port: number
  type: string
  user_id: number
  status: number
  date: string
  desc: string
  max_online: number
  online: number
}

const data: {
  all?: dataRes[]
  be?: dataRes[]
  je?: dataRes[]
} = reactive({})

const getServers = async () => {
  const { data: res } = await getServersApi(activeName.value)
  data[activeName.value] = res.data as dataRes[]
}

watch(() => activeName.value, () => {
  if (!data[activeName.value]) {
    getServers()
  }
  // 解决切换标签页时尺寸问题 手动触发窗口resize事件
  setTimeout(() => {
    let event = new Event('resize')
    window.dispatchEvent(event)
  }, 10)
}, {
  immediate: true
})

const bind = (item: dataRes) => {
  return {
    id: item.id,
    name: item.name,
    date: item.date,
    maxOnline: item.max_online,
    online: item.online,
    type: item.type,
    desc: item.desc
  }
}
</script>

<template>
  <el-tabs v-model="activeName" class="tabs">
    <el-tab-pane label="全部" name="all" lazy>
      <Card v-for="item in data.all" :key="item.id" v-bind="bind(item)"></Card>
    </el-tab-pane>
    <el-tab-pane label="Java版" name="je" lazy>
      <Card v-for="item in data.je" :key="item.id" v-bind="bind(item)"></Card>
    </el-tab-pane>
    <el-tab-pane label="基岩版" name="be" lazy>
      <Card v-for="item in data.be" :key="item.id" v-bind="bind(item)"></Card>
    </el-tab-pane>
  </el-tabs>
</template>

<style lang="less" scoped>
.tabs {
  padding: 5px 10px;
  background-color: var(--bg-color);
}
</style>