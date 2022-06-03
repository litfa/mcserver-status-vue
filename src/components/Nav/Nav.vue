<script lang="ts" setup>
import SwichTheme from '../SwichTheme/SwichTheme.vue'
</script>

<template>
  <nav>
    <div class="logo">
      <img src="https://static.litf.com.cn/public%2Flogo.png" alt="logo" />
      mcmotd
    </div>
    <div class="right">
      <SwichTheme />
    </div>
  </nav>
</template>

<style lang="less" scoped>
nav {
  width: 100%;
  height: 60px;
  background-color: var(--bg-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
  box-sizing: border-box;

  .logo {
    display: flex;
    align-content: center;
    align-items: center;
    img {
      height: 50px;
    }
    font-size: 20px;
  }
  .right {
    margin-right: 10px;
  }
}
</style>