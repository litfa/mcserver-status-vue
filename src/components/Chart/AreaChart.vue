<script lang="ts" setup>
import * as echarts from 'echarts/core'
import {
  GridComponent,
  GridComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  MarkAreaComponent,
  MarkAreaComponentOption
} from 'echarts/components'
import { LineChart, LineSeriesOption } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import getDataApi from '@/apis/getStatus'
import dayjs from 'dayjs'
import { ElMessage } from 'element-plus'
import { isDark } from '@/utils/theme'
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
  GridComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
  TooltipComponent,
  MarkAreaComponent
])

echarts.registerTheme('dark', echartsDark)
echarts.registerTheme('vintage', echartsVintage)

type EChartsOption = echarts.ComposeOption<
  | GridComponentOption
  | LineSeriesOption
  | TooltipComponentOption
  | MarkAreaComponentOption
>

let chartDom = ref<HTMLElement | null | any>(null)!
let myChart: echarts.ECharts
const data: {
  online: number[]
  date: string[],
  offlineData: [
    {
      xAxis: string
    },
    {
      xAxis: string | undefined
    }][]
} = {
  online: [],
  date: [],
  offlineData: []
}

let option: EChartsOption = {
  xAxis: {
    type: 'category',
    data: data.date
  },
  yAxis: {
    type: 'value',
    minInterval: 1
  },
  series: [
    {
      data: data.online,
      type: 'line',
      smooth: true,
      areaStyle: {},
      // 解决鼠标移入是报错
      zlevel: 9,
      z: 9,
      // 红色异常
      markArea: {
        itemStyle: {
          color: 'rgba(255, 173, 177, 0.4)'
        },
        data: data.offlineData
      }
    }
  ],
  tooltip: {
    trigger: 'axis',
    confine: true,
    valueFormatter: (value) => {
      return value.toString()

    }
  },
  grid: {
    top: '10%',
    bottom: '0',
    left: '0',
    right: '0',
    containLabel: true
  }
}

onMounted(() => {
  myChart = echarts.init(chartDom.value, isDark.value ? 'dark' : 'vintage')
  window.addEventListener('resize', resize)

  watch(() => props.length, () => {
    getData()
  }, {
    immediate: true
  })

  watch(() => isDark.value, (isDark) => {
    myChart.dispose()
    myChart = echarts.init(chartDom.value, isDark ? 'dark' : 'vintage')
    myChart.setOption(option)
  })
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
      offset: number
    }
  } = await getDataApi(props.id, props.length as '6h' | '24h')
  if (res?.code != 200) {
    ElMessage.error('数据获取失败')
  }
  // 清空数组 不改变指向
  data.online.length = 0
  data.date.length = 0
  res.data.forEach((element) => {
    data.online.push(element.online + (res.offset || 0))
    data.date.push(dayjs(element.date).format('HH:mm'))
  })
  // ./.test.ts
  // 异常数据
  for (const i in res.data) {
    // 异常数据
    if (!res.data[i].status) {
      if (data.offlineData[data.offlineData.length - 1] && data.offlineData[data.offlineData.length - 1][1].xAxis == dayjs(res.data[i].date).format('HH:mm')) {
        // 如果上一个异常数据的时间和当前异常数据的时间一样，则修改到下一个时间 不在添加
        // 若是最后一项 添加 undefined
        data.offlineData[data.offlineData.length - 1]![1].xAxis = res.data[Number(i) + 1] ?
          dayjs(res.data[Number(i) + 1].date).format('HH:mm') : undefined
      } else {
        data.offlineData.push([{
          xAxis: dayjs(res.data[i].date).format('HH:mm')
        }, {
          xAxis: res.data[Number(i) + 1] ? dayjs(res.data[Number(i) + 1].date).format('HH:mm') : undefined
        }
        ])
      }
    }
  }

  myChart.setOption(option)
}

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
  height: 100%;
  max-height: 240px;
  min-height: 70px;
}
</style>