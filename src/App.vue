<script lang="ts" setup>
import Menu from './components/Menu/Menu.vue'
import Nav from '@/components/Nav/Nav.vue'
</script>

<template>
  <div :class="$route.path !== '/iframe' ? 'app' : null">
    <template v-if="$route.path !== '/iframe'">
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
  nav {
    grid-area: 1 / 1 / 2 / 3;
  }
  .menu {
    grid-area: 2 / 1 / 3 / 2;
  }
  .content {
    grid-area: 2 / 2 / 3 / 3;
  }
}
</style>