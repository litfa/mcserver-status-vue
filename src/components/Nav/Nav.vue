<script lang="ts" setup>

</script>

<template>
  <nav>
    <div class="logo">
      <img src="https://static.litf.com.cn/public%2Flogo.png" alt="logo" />
      mcmotd
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

  .logo {
    display: flex;
    align-content: center;
    align-items: center;
    img {
      height: 50px;
    }
    font-size: 20px;
  }
}
</style>