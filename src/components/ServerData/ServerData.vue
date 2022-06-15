<script lang="ts" setup>
import { ref, computed } from 'vue'
import { ElDescriptions, ElDescriptionsItem, ElButton, ElIcon, ElMessage, ElTooltip } from 'element-plus'
import { Server, Dashboard, Copy } from '@icon-park/vue-next'
import { getNow as getNowApi } from '@/apis/getStatus'
import dayjs from 'dayjs'
import { useClipboard } from '@vueuse/core'
import DescriptionsItem from './DescriptionsItem.vue'

const { copy } = useClipboard()

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

const ip = computed(() => {
  let port
  if (props.type == 'je' && props.port == 25565) {
    port = ''
  } else if (props.type == 'be' && props.port == 19132) {
    port = ''
  } else {
    port = ':' + props.port
  }
  return props.host?.toLowerCase() + port
})

const copytext = ref('复制')
const copyIp = async () => {
  await copy(ip.value)
  copytext.value = '已复制'
  // 5秒后改回来
  setTimeout(() => {
    copytext.value = '复制'
  }, 1000 * 5)
}

const filterText = (htmlText: string) => {
  // 基岩版 motd 文本默认白色 取消白色
  return htmlText.replaceAll('color: #FFFFFF', '')
}
</script>

<template>
  <div class="data">
    <div class="text">
      <Server />
      <span>{{ ip || '-' }}</span>
    </div>
    <div>
      <el-button type="primary" size="small" @click="copyIp" v-if="type == 'be'">
        <el-icon>
          <Copy />
        </el-icon>
        <span>{{ copytext }}</span>
      </el-button>
      <el-button type="primary" size="small" v-if="type == 'be'">添加服务器</el-button>
    </div>
  </div>

  <div class="descriptions">
    <div class="header">
      <h3>
        <dashboard />
        <span>当前状态</span>
      </h3>
      <div class="extra">
        <el-button type="primary" size="small" @click="resetStatus">刷新</el-button>
      </div>
    </div>
    <div class="body">
      <descriptions-item
        label="人数"
      >{{ `${status.online?.toString() || '-'}/${status.max?.toString() || '-'}` || '-' }}</descriptions-item>
      <descriptions-item label="模式" v-if="status.gameMode">{{ status.gameMode || '-' }}</descriptions-item>
      <descriptions-item
        label="延迟"
        v-if="status.roundTripLatency"
      >{{ status.roundTripLatency || '-' }}</descriptions-item>
      <descriptions-item label="版本">
        <el-tooltip :content="status.version">{{ status.version || '-' }}</el-tooltip>
      </descriptions-item>
      <descriptions-item label="协议版本">{{ status.agreement || '-' }}</descriptions-item>
      <descriptions-item label="motd">
        <el-tooltip :content="status.motdHtml || status.motd" raw-content>
          <span v-html="filterText(status.motdHtml || status.motd || '-')"></span>
          <!-- <span v-text="status.motd || '-'"></span> -->
        </el-tooltip>
      </descriptions-item>
      <descriptions-item
        label="刷新时间"
        min-width="160"
      >{{ dayjs(status.date || '-').format('HH:mm:ss') }}</descriptions-item>
    </div>
  </div>
</template>

<style lang="less" scoped>
.data {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px auto;
  flex-wrap: wrap;
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
.descriptions {
  display: flex;
  flex-direction: column;
  .header {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
  }
  .body {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .item {
      width: 50%;
    }
  }
  @media screen and (max-width: 500px) {
    .body {
      flex-direction: column;
      .item {
        width: 100%;
        :deep(.content) {
          overflow: unset;
          text-overflow: unset;
          white-space: unset;
        }
      }
    }
  }
}
</style>