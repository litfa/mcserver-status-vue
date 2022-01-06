/*
 * @Author: litfa
 * @Date: 2022-01-05 20:27:47
 * @Last Modified by: litfa
 * @Last Modified time: 2022-01-06 21:30:48
 */
<template>
  <div class="container">
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
    },
    reSetEcharts: {
      type: Number
    }
  },
  data() {
    return {
      motd: '',
      echartsData: {
        data: {},
        date: {}
      },
      myChart: ''
    }
  },
  watch: {
    playerdata() {
      this.formatData()
    },
    reSetEcharts() {
      this.reSeteEharts()
    }
  },
  mounted() {
    this.formatData()
  },
  methods: {
    initEcharts(data, date) {
      // console.log(this.playerData)
      const chartDom = this.$refs.echarts

      this.myChart = echarts.init(chartDom)

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

      option && this.myChart.setOption(option)
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

      this.echartsData.data = data
      this.echartsData.date = date
      this.initEcharts(this.echartsData.data, this.echartsData.date)
    },
    reSeteEharts() {
      this.myChart.dispose()
      this.initEcharts(this.echartsData.data, this.echartsData.date)
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  .title {
    // padding-left: 50px;
    // box-sizing: border-box;
    font-weight: bold;
  }
  .echarts {
    width: 100%;
    height: 200px;
    // height: 100%;
  }
}
</style>
