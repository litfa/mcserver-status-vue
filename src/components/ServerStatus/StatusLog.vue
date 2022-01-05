/*
 * @Author: litfa
 * @Date: 2022-01-05 20:27:47
 * @Last Modified by: litfa
 * @Last Modified time: 2022-01-06 00:35:24
 */
<template>
  <div class="container">
    {{motd}}
    <div ref="echarts" class="echarts"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import dayjs from 'dayjs'

export default {
  props: {
    playerdata: {
      type: Array
    }
  },
  data() {
    return {
      motd: ''
    }
  },
  watch: {
    playerdata() {
      this.formatData()
    }
  },
  mounted() {
    this.formatData()
  },
  methods: {
    initEcharts(data, date) {
      // console.log(this.playerData)
      const chartDom = this.$refs.echarts

      const myChart = echarts.init(chartDom)

      const option = {
        xAxis: {
          type: 'category',
          boundaryGap: false,

          data: date
        },
        yAxis: {
          type: 'value',
          minInterval: 1
        },
        series: [
          {
            data: data,
            type: 'line',
            areaStyle: {}
          }
        ],
        tooltip: {
          trigger: 'axis'
        }
      }

      option && myChart.setOption(option)
    },
    formatData() {
      const data = []
      const date = []

      for (const i in this.playerdata) {
        // 复制motd
        if (this.playerdata[i].motd) this.motd = this.playerdata[i].motd

        data.push(this.playerdata[i].online)
        date.push(dayjs(this.playerdata[i].date).format('HH:mm:ss'))
      }
      console.log(data, date)

      this.initEcharts(data, date)
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  .echarts {
    width: 100%;
    height: 500px;
  }
}
</style>
