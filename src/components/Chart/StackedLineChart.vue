<script lang="ts" setup>
import * as echarts from 'echarts/core'
import {
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  LegendComponent,
  LegendComponentOption
} from 'echarts/components'
import { LineChart, LineSeriesOption } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { onMounted, onUnmounted, ref } from 'vue'

echarts.use([
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition
])

type EChartsOption = echarts.ComposeOption<
  | TooltipComponentOption
  | GridComponentOption
  | LegendComponentOption
  | LineSeriesOption
>

let chartDom = ref<HTMLElement | null | any>(null)!
let myChart: echarts.ECharts
let option: EChartsOption = {

  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['可用率', '平均人数', '最高人数']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },

  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['5-21', '5-22', '5-23', '5-24', '5-25', '5-26', '5-27']
  },
  yAxis: [{
    type: 'value',
    name: '人数'
  }, {
    type: 'value',
    name: '可用率',
    max: 1,
    axisLabel: {
      formatter: (e: number) => {
        return `${e * 100}%`
      }
    }

  }],
  series: [
    {
      name: '可用率',
      type: 'line',
      yAxisIndex: 1,
      stack: 'Total',
      data: [0.8, 0.9, 0.9, 1, 1, 0.7, 1],
      // min: 0,
      // max: 250
      tooltip: {
        valueFormatter: (e) => {
          e = Number(e)
          return `${(e) * 100}%`
        }

      }
    },
    {
      name: '平均人数',
      type: 'line',
      stack: 'Total',
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: '最高人数',
      type: 'line',
      stack: 'Total',
      data: [150, 232, 201, 154, 190, 330, 410]
    }
  ]
}

onMounted(() => {
  myChart = echarts.init(chartDom.value)
  myChart.setOption(option)
  window.addEventListener('resize', resize)
})

const resize = () => {
  myChart.resize()
}

onUnmounted(() => {
  window.removeEventListener('resize', resize)
})
</script>

<template>
  <div ref="chartDom" class="chart-dom"></div>
</template>

<style lang="less" scoped>
.chart-dom {
  width: 100%;
  height: 230px;
}
</style>