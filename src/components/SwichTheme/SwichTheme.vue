<script lang="ts" setup>
import { ElSwitch } from 'element-plus'
import { Moon, Sun } from '@icon-park/vue-next'
import { ref } from 'vue'
import { toggleDark, isDark } from '@/utils/theme'

const value = ref(isDark.value)

const change = (val: number | string | boolean) => {
  toggleDark(Boolean(val))
}
</script>

<template>
  <el-switch
    v-model="value"
    inline-prompt
    active-color="#333"
    inactive-color="#ccc"
    :active-icon="Moon"
    :inactive-icon="Sun"
    @change="change"
  />
</template>

<style lang="less" scoped>
</style>