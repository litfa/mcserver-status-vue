<script lang="ts" setup>
import { useRoute } from 'vue-router'
import getServerDetailApi from '@/apis/getServerDetail'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import Share from '@/components/Share/Share.vue'

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
  <Share :id="id" />
</template>

<style lang="less" scoped>
</style>