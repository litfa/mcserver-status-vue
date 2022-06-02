<script lang="ts" setup>
import { ref } from 'vue'
import { Home } from '@icon-park/vue-next'
import { ElMenu, ElMenuItem, ElIcon } from 'element-plus'

const isCollapse = ref(false)
</script>

<template>
  <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
    <el-radio-button :label="false">expand</el-radio-button>
    <el-radio-button :label="true">collapse</el-radio-button>
  </el-radio-group>-->
  <el-menu class="menu" :collapse="isCollapse">
    <el-menu-item index="1-2">
      <el-icon>
        <Home />
      </el-icon>
      <span>首页</span>
    </el-menu-item>
  </el-menu>
</template>

<style>
.menu:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>