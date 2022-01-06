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
    return {
      colors: {
        online: '#00ff00',
        offline: 'red',
        error: 'yellow'
      }
    }
  },
  mounted() {
    this.formatData()
  },
  watch: {
    playerdata() {
      this.formatData()
    }
  },
  methods: {
    initEcharts(data, date) {
      const chartDom = this.$refs.echarts
      const myChart = echarts.init(chartDom)
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

      option && myChart.setOption(option)
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
  .title {
    padding-left: 50px;
    font-weight: bold;
  }
  .echarts {
    width: 100%;
    height: 100px;
    // height: 100%;
  }
}
</style>
