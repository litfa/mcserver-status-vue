<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { ElTabs, ElTabPane } from 'element-plus'
import Card from '@/components/Card/Card.vue'
import getServersApi from '@/apis/getServers'

const activeName = ref<'all' | 'je' | 'be'>('all')

const data: {
  all?: any[]
  be?: any[]
  je?: any[]
} = reactive({})

const getServers = async () => {
  const { data: res } = await getServersApi(activeName.value)
  data[activeName.value] = res.data as any[]
}

watch(() => activeName.value, () => {
  if (!data[activeName.value]) {
    getServers()
  }
}, {
  immediate: true
})
</script>

<template>
  <el-tabs v-model="activeName" class="tabs">
    <el-tab-pane label="全部" name="all" lazy>
      <Card v-for="item in data.all" :key="item.id" :id="item.id" :name="item.name"></Card>
    </el-tab-pane>
    <el-tab-pane label="Java版" name="je" lazy>
      <Card v-for="item in data.je" :key="item.id" :id="item.id" :name="item.name"></Card>
    </el-tab-pane>
    <el-tab-pane label="基岩版" name="be" lazy>
      <Card v-for="item in data.be" :key="item.id" :id="item.id" :name="item.name"></Card>
    </el-tab-pane>
  </el-tabs>
</template>

<style lang="less" scoped>
.tabs {
  padding: 5px 10px;
  background-color: var(--bg-color);
}
</style>