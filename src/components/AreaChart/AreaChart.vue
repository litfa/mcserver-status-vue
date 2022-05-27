<script lang="ts" setup>
import * as echarts from 'echarts/core'
import {
  GridComponent,
  GridComponentOption,
  TooltipComponent,
  TooltipComponentOption
} from 'echarts/components'
import { LineChart, LineSeriesOption } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { onMounted, ref } from 'vue'
import { get6h } from '@/apis/getStatus'
import dayjs from 'dayjs'

echarts.use([GridComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
  TooltipComponent
])

type EChartsOption = echarts.ComposeOption<
  | GridComponentOption
  | LineSeriesOption
  | TooltipComponentOption
>

let chartDom = ref<HTMLElement | null | any>(null)!
let myChart: echarts.ECharts
const data: {
  online: number[]
  date: string[]
} = {
  online: [],
  date: []
}

let option: EChartsOption = {
  xAxis: {
    type: 'category',
    data: data.date
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: data.online,
      type: 'line',
      smooth: true,
      areaStyle: {},
      // 解决鼠标移入是报错
      zlevel: 9,
      z: 9
    }
  ],
  tooltip: {
    trigger: 'axis'
  }
}

onMounted(() => {
  myChart = echarts.init(chartDom.value)
})

const getData = async () => {
  const { data: res }: {
    data: {
      code: number,
      data: {
        date: Date
        max: number
        online: number
        status: number | boolean
      }[]
    }
  } = await get6h()
  res.data.forEach((element) => {
    data.online.push(element.online || 0)
    data.date.push(dayjs(element.date).format('HH:mm'))
  })
  myChart.setOption(option)
}
getData()
</script>

<template>
  <div ref="chartDom" class="chart-dom"></div>
</template>

<style lang="less" scoped>
.chart-dom {
  width: 100%;
  height: 300px;
}
</style>