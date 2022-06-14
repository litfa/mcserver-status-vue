<script lang="ts" setup>
import { ref, onUnmounted } from 'vue'
import { Home } from '@icon-park/vue-next'
import { ElMenu, ElMenuItem, ElIcon } from 'element-plus'

const isCollapse = ref(false)
const resize = () => {
  isCollapse.value = window.innerWidth < 660
}
resize()
window.addEventListener('resize', resize)
onUnmounted(() => {
  window.removeEventListener('reset', resize)
})
</script>

<template>
  <el-menu class="menu" :collapse="isCollapse" router :default-active="$route.path">
    <el-menu-item index="/">
      <el-icon>
        <Home />
      </el-icon>
      <span>首页</span>
    </el-menu-item>
  </el-menu>
</template>

<style scoped>
.menu {
  background-color: var(--bg-color);
}
.menu:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>