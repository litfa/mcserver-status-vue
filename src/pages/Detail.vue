<script lang="ts" setup>
import { useRoute } from 'vue-router'
import getServerDetailApi from '@/apis/getServerDetail'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import Share from '@/components/Share/Share.vue'
import ServerData from '@/components/ServerData/ServerData.vue'

const route = useRoute()

const id = route.params.id as string
const detail = ref<any>({})

const getServerDetail = async () => {
  const { data: res } = await getServerDetailApi(Number(id))
  if (res.code == 200) {
    detail.value = res.data
  } else {
    ElMessage.error('数据获取失败')
  }
}
getServerDetail()
</script>

<template>
  <h1>{{ detail.name }}</h1>
  <ServerData :host="detail.host" :port="detail.port" :type="detail.type" :id="id" />
  <iframe :src="`/iframe?id=${id}`" frameborder="0"></iframe>
  <Share :id="id" />
</template>

<style lang="less" scoped>
iframe {
  width: 100%;
  height: 160px;
}
</style>