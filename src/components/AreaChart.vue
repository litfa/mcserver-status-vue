<script lang="ts" setup>
import * as echarts from 'echarts/core'
import { GridComponent, GridComponentOption, TooltipComponent, TooltipComponentOption } from 'echarts/components'
import { LineChart, LineSeriesOption } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { onMounted, ref } from 'vue'

echarts.use([GridComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
  TooltipComponent
])

type EChartsOption = echarts.ComposeOption<
  GridComponentOption | LineSeriesOption | TooltipComponentOption
>;

let chartDom = ref<HTMLElement | null | any>(null)!
let myChart

onMounted(() => {
  myChart = echarts.init(chartDom.value)
  let option: EChartsOption = {
    xAxis: {
      type: 'category',

      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true,
        areaStyle: {}
      }
    ],
    tooltip: {
      trigger: 'axis'
    }
  }

  option && myChart.setOption(option)
})

</script>

<template>
  <div ref="chartDom" class="chart-dom"></div>
</template>

<style lang="less" scoped>
.chart-dom {
  width: 800px;
  height: 500px;
}
</style>