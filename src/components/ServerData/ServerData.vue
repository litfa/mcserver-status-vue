<script lang="ts" setup>
import { ElDescriptions, ElDescriptionsItem, ElButton, ElIcon } from 'element-plus'
import { Server, Dashboard } from '@icon-park/vue-next'

const prop = defineProps({
  host: String,
  port: [String, Number],
  type: [String]
})

const port = 12412
</script>

<template>
  <div class="data">
    <div class="text">
      <Server />
      <span>{{ host?.toLowerCase() }}:{{ port != 19132 ? port : null }}</span>
    </div>

    <el-button type="primary" size="small" v-if="type == 'be'">添加服务器</el-button>
  </div>

  <el-descriptions :column="2">
    <template #title>
      <el-icon>
        <dashboard />
      </el-icon>
      <span>当前状态</span>
    </template>
    <el-descriptions-item label="人数">{{ null || '-' }}</el-descriptions-item>
    <el-descriptions-item label="模式">{{ null || '-' }}</el-descriptions-item>
    <el-descriptions-item label="延迟">{{ null || '-' }}</el-descriptions-item>
    <el-descriptions-item label="motd">{{ null || '-' }}</el-descriptions-item>
    <el-descriptions-item label="版本">{{ null || '-' }}</el-descriptions-item>
    <el-descriptions-item label="协议版本">{{ null || '-' }}</el-descriptions-item>

    <template #extra>
      <el-button type="primary" size="small">刷新</el-button>
    </template>
  </el-descriptions>
</template>

<style lang="less" scoped>
.data {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px auto;
  .text {
    display: flex;
    align-items: center;
    :deep(.i-icon) {
      align-items: center;
      display: flex;
      margin-right: 8px;
    }
  }
}
:deep(.el-descriptions__header) {
  margin-bottom: 5px;
  margin-top: 10px;
}
:deep(.el-descriptions__title) {
  display: flex;
  align-items: center;
  span {
    margin-right: 8px;
  }
}
</style>