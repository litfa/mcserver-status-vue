<script lang="ts" setup>
import { computed } from 'vue'
import { ElTag } from 'element-plus'
const props = defineProps({
  type: String
})

const typeText = computed(() => {
  if (props.type == 'je') {
    return 'Java版'
  } else if (props.type == 'be') {
    return '基岩版'
  }
  return ''
})
</script>

<template>
  <el-tag :type="type == 'je' ? 'warning' : 'success'">{{ typeText }}</el-tag>
</template>

<style lang="less" scoped>
</style>