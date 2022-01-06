/*
 * @Author: litfa
 * @Date: 2022-01-05 20:27:52
 * @Last Modified by: litfa
 * @Last Modified time: 2022-01-06 00:56:45
 */
<template>
  <div class="container">
    <div class="echarts" v-for="(item, index) in statusLog" :key="index">
      <PlayerNumber :playerdata="item"></PlayerNumber>
      <ServerStatus :playerdata="item"></ServerStatus>
    </div>
  </div>
</template>

<script>
import PlayerNumber from '@/components/ServerStatus/PlayerNumber.vue'
import ServerStatus from '@/components/ServerStatus/ServerStatus.vue'
import getStatusLog from '@/apis/getStatusLog.js'
export default {
  components: { PlayerNumber, ServerStatus },
  data() {
    return {
      statusLog: {}
    }
  },
  created() {
    this._getStatus()
  },
  methods: {
    async _getStatus() {
      // 获取数据
      const { data: res } = await getStatusLog()
      // 数据对象
      const data = {}
      // 遍历外层时间对象
      for (const i in res.data) {
        // 遍历内层服务器对象
        for (const j in res.data[i].data) {
          // 创建空数组
          if (!data[res.data[i].data[j].id]) data[res.data[i].data[j].id] = []
          // 将数据复制给 key 为 id 的对象
          data[res.data[i].data[j].id].push(res.data[i].data[j])
        }
      }
      // 更新数据
      this.statusLog = data
    }
  }
}
</script>

<style lang="less" scoped>
// .container {
//   .echarts {
//     // height: 300px;
//   }
// }
</style>
