<template>
  <div class="container">
    <div ref="echarts" class="echarts"></div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

import * as echarts from 'echarts/core'
import { GridComponent, ToolboxComponent, TooltipComponent } from 'echarts/components'
import { BarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
echarts.use([GridComponent, BarChart, CanvasRenderer, ToolboxComponent, TooltipComponent])

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
      colors: {
        online: '#00ff00',
        offline: 'red',
        error: 'yellow'
      },
      echartsData: {
        data: {},
        date: {}
      },
      myChart: ''
    }
  },
  mounted() {
    this.formatData()
  },
  watch: {
    playerdata() {
      this.formatData()
    },
    reSetEcharts() {
      this.reSeteEharts()
    }
  },

  methods: {
    initEcharts(data, date) {
      const chartDom = this.$refs.echarts
      this.myChart = echarts.init(chartDom)

      const option = {
        xAxis: {
          type: 'category',
          data: date
        },
        yAxis: {
          type: 'value',
          show: false
        },
        series: [
          {
            data: data,
            name: 'name',
            type: 'bar'
          }
        ],
        tooltip: {
          trigger: 'axis',
          formatter: function (data) {
            return `${data[0].axisValueLabel}<br>${data[0].data.name}`
          }
        }
      }

      option && this.myChart.setOption(option, true)
    },
    formatData() {
      const data = []
      const date = []

      for (const i in this.playerdata) {
        let color = ''
        let name = ''
        if (this.playerdata[i].code === 200) {
          if (this.playerdata[i].status === 'online' || this.playerdata[i].status === true) {
            color = this.colors.online
            name = '正常'
          } else {
            color = this.colors.offline
            name = '离线'
          }
        } else {
          color = this.colors.error
          name = '异常'
        }
        data.push({
          value: 1,
          name: name,

          itemStyle: {
            color: color
          }
        })
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
    height: 100px;
    // height: 100%;
  }
}
</style>
