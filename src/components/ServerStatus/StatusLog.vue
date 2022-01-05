/*
 * @Author: litfa
 * @Date: 2022-01-05 20:27:47
 * @Last Modified by: litfa
 * @Last Modified time: 2022-01-05 22:19:19
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
    }
  },
  data() {
    return {}
  },
  async mounted() {
    const data = []
    const date = []
    for (const i in this.playerdata) {
      data.push(this.playerdata[i].online)
      date.push(dayjs(this.playerdata[i].date).format('HH:MM:ss'))
    }

    this.initEcharts(data, date)
  },

  watch: {
    playerdata(e) {
      console.log('aaa', e)
    }
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
          type: 'value'
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
          // axisPointer: {
          //   type: 'cross',
          //   label: {
          //     backgroundColor: '#6a7985'
          //   }
          // }
        }
      }

      option && myChart.setOption(option)
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  .echarts {
    // width: 10000px;
    width: 100%;
    height: 500px;
  }
}
</style>
