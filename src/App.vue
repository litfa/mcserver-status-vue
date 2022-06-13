<script lang="ts" setup>
import Menu from './components/Menu/Menu.vue'
import Nav from '@/components/Nav/Nav.vue'

const path = window.location.pathname
</script>

<template>
  <!-- 由于路由为懒加载 这里使用 $route.path 会导致页面抖动 -->
  <div :class="path !== '/iframe' ? 'app' : null">
    <template v-if="path !== '/iframe'">
      <Nav></Nav>
      <Menu></Menu>
    </template>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="less" scoped>
.app {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 60px 1fr;
  height: 100vh;
  nav {
    grid-area: 1 / 1 / 2 / 3;
  }
  .menu {
    grid-area: 2 / 1 / 3 / 2;
  }
  .content {
    grid-area: 2 / 2 / 3 / 3;
    height: 100%;
    overflow: auto;
    background-color: var(--bg-color);
  }
}
</style>