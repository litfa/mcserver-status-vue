<script lang="ts" setup>
import { ref } from 'vue'
import { ElTabs, ElTabPane } from 'element-plus'

const activeName = ref('all')
</script>

<template>
  <el-tabs v-model="activeName" class="tabs">
    <el-tab-pane label="全部" name="all" lazy>all</el-tab-pane>
    <el-tab-pane label="Java版" name="je" lazy>je</el-tab-pane>
    <el-tab-pane label="基岩版" name="be" lazy>be</el-tab-pane>
  </el-tabs>
</template>

<style lang="less" scoped>
.tabs {
  padding: 5px 10px;
  background-color: var(--bg-color);
}
</style>