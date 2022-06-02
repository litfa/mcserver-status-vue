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
import { onMounted, onUnmounted, ref, watch } from 'vue'
import getDataApi from '@/apis/getStatus'
import { ElMessage } from 'element-plus'
import { isDark } from '@/utils/theme'
import { dispose } from 'echarts/core'
import echartsDark from '@/assets/theme/echartsDark'
import echartsVintage from '@/assets/theme/echartsVintage'

const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  length: {
    type: String,
    values: ['6h', '24h'] as ('6h' | '24h')[],
    required: true
  }
})

echarts.use([
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition
])

echarts.registerTheme('dark', echartsDark)
echarts.registerTheme('vintage', echartsVintage)

type EChartsOption = echarts.ComposeOption<
  | TooltipComponentOption
  | GridComponentOption
  | LegendComponentOption
  | LineSeriesOption
>

let chartDom = ref<HTMLElement | null | any>(null)!
let myChart: echarts.ECharts
const data: {
  day: string[],
  maxOnline: number[],
  online: number[],
  status: number[]
} = {
  day: [],
  maxOnline: [],
  online: [],
  status: []
}
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
    data: data.day
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
      data: data.status,
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
      data: data.online
    },
    {
      name: '最高人数',
      type: 'line',
      stack: 'Total',
      data: data.maxOnline
    }
  ]
}

interface Data {
  code: number;
  data: Datum[];
}

interface Datum {
  day: string;
  status: number;
  max_online: number;
  online: number;
}

const getData = async () => {
  const { data: res }: {
    data: Data
  } = await getDataApi(props.id, props.length as '7d' | '30d')
  if (res.code != 200) ElMessage.error('数据获取失败')
  // 清空数组 不改变指向
  data.day.length = 0
  data.maxOnline.length = 0
  data.online.length = 0
  data.status.length = 0
  res.data.forEach(e => {
    data.day.push(e.day)
    data.maxOnline.push(e.max_online)
    data.online.push(e.online)
    data.status.push(e.status)
  })
  myChart.setOption(option)
}
getData()

onMounted(() => {
  myChart = echarts.init(chartDom.value, isDark.value ? 'dark' : 'vintage')
  window.addEventListener('resize', resize)

  // 这里 immediate: true 会有问题
  watch(() => isDark.value, (isDark) => {
    myChart.dispose()
    myChart = echarts.init(chartDom.value, isDark ? 'dark' : 'vintage')
    myChart.setOption(option)
  })
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