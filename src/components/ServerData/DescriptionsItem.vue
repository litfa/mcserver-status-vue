<script lang="ts" setup>
defineProps({
  label: String
})
</script>

<template>
  <div class="item">
    <div class="label">{{ label }}</div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<style lang="less" scoped>
.item {
  line-height: 35px;
  margin-bottom: 12px;
  text-align: left;
  font-weight: 400;
  line-height: 23px;
  font-size: 14px;
  display: flex;
  .label {
    // width: 4em;
    margin-right: 16px;
    flex-shrink: 0;
  }
  .content {
    opacity: 0.8;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>