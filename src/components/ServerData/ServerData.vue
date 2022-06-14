<script lang="ts" setup>
import { ref } from 'vue'
import { ElDescriptions, ElDescriptionsItem, ElButton, ElIcon, ElMessage } from 'element-plus'
import { Server, Dashboard } from '@icon-park/vue-next'
import { getNow as getNowApi } from '@/apis/getStatus'
import dayjs from 'dayjs'

const props = defineProps({
  host: String,
  port: [String, Number],
  type: [String],
  id: String
})

const status = ref<{
  code?: number
  status?: boolean
  motd?: string
  max?: number
  online?: number
  version?: string
  agreement?: number
  date?: string
  motdHtml?: string
  // only be
  gameMode?: string
  // only je
  roundTripLatency?: number
}>({})

const getStatus = async (successMsg = false) => {
  const { data: res } = await getNowApi(Number(props.id))
  if (res.status == 200) {
    status.value = res.data
    if (successMsg) {
      ElMessage.success('获取成功')
    }
  } else {
    ElMessage.error('数据获取失败')
  }
}
getStatus()

let date = Date.now()
const resetStatus = () => {
  // 10s
  if (date + 1000 * 10 > Date.now()) {
    return ElMessage.warning('手速太快啦！')
  }
  date = Date.now()
  return getStatus(true)
}
</script>

<template>
  <div class="data">
    <div class="text">
      <Server />
      <span>{{ host?.toLowerCase() }}{{ port != 19132 ? ':' + port : null }}</span>
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
    <el-descriptions-item
      label="人数"
    >{{ `${status.online?.toString() || '-'}/${status.max?.toString() || '-'}` || '-' }}</el-descriptions-item>
    <el-descriptions-item label="模式" v-if="status.gameMode">{{ status.gameMode || '-' }}</el-descriptions-item>
    <el-descriptions-item
      label="延迟"
      v-if="status.roundTripLatency"
    >{{ status.roundTripLatency || '-' }}</el-descriptions-item>
    <el-descriptions-item label="版本">{{ status.version || '-' }}</el-descriptions-item>
    <el-descriptions-item label="协议版本">{{ status.agreement || '-' }}</el-descriptions-item>
    <el-descriptions-item label="motd">
      <span v-html="status.motd || status.motd || '-'"></span>
    </el-descriptions-item>
    <el-descriptions-item label="刷新时间">{{ dayjs(status.date || '-').format('HH:mm:ss') }}</el-descriptions-item>

    <template #extra>
      <el-button type="primary" size="small" @click="resetStatus">刷新</el-button>
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