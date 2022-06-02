<script lang="ts" setup>
import Menu from './components/Menu/Menu.vue'
</script>

<template>
  <router-view></router-view>
  <Menu v-if="$route.path !== '/iframe'"></Menu>
</template>

<style lang="less" scoped>
</style>