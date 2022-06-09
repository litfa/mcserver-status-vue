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
const name = '一个je服一个'
</script>

<template>
  <router-link :to="`/detail/${id}`" class="card">
    <div class="title">
      <h3>{{ name }}</h3>
      <el-tag>Java</el-tag>
      <el-tag>1.18</el-tag>
      <el-tag>互通</el-tag>
    </div>
    <div class="text">
      <div class="desc">我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介</div>
      <div class="data">
        <span class="data-title">近七天数据</span>
        <span>平均人数: {{ 120 }}</span>
        <span>最高人数: {{ 200 }}</span>
      </div>
    </div>
    <div class="info">
      <span>author</span>
      <span>{{ '2022-1-21' }}</span>
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
  padding: 5px 10px;
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
  .text {
    display: flex;
    justify-content: space-between;
    .desc {
      font-size: 15px;
      color: var(--text-color);
      max-width: 80%;
    }
    .data {
      flex-shrink: 0;
      width: 100px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      font-size: 12px;
      span {
        color: var(--text-color);
        opacity: 0.7;
      }
      .data-title {
        opacity: 0.85;
        color: var(--text-color);
      }
    }
  }
  .info {
    span {
      font-size: 12px;
      color: var(--text-color);
      opacity: 0.9;
      margin-right: 8px;
    }
  }
}
</style>