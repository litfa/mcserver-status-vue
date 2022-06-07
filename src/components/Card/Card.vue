<script lang="ts" setup>
import AreaChart from '@/components/Chart/AreaChart.vue'
import { ElButton, ElTag } from 'element-plus'

const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  name: String,
  date: [String, Number]
})
</script>

<template>
  <router-link to="/" class="card">
    <div class="title">
      <h3>{{ name }}</h3>
      <!-- <el-tag>Java</el-tag>
      <el-tag>1.18</el-tag>
      <el-tag>互通</el-tag>-->
    </div>
    <div class="data">
      <AreaChart :id="id" :length="'24h'"></AreaChart>
      <div>
        <el-button type="primary" plain>详情</el-button>
      </div>
    </div>
    <div class="info">
      <span>{{ date }}</span>
    </div>
  </router-link>
</template>

<style lang="less" scoped>
a.card {
  text-decoration: none;
  // color: #000;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .title {
    margin: 10px 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    h3 {
      font-size: 20px;
      color: var(--text-color);
    }
    .el-tag {
      margin: 2px;
    }
  }
  .data {
    display: flex;
    justify-content: space-around;
  }
  .info {
    span {
      font-size: 12px;
      color: var(--text-color);
      opacity: 0.9;
    }
  }
}
</style>