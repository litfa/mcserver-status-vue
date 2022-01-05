/*
 * @Author: litfa
 * @Date: 2022-01-05 20:27:52
 * @Last Modified by: litfa
 * @Last Modified time: 2022-01-06 00:38:59
 */
<template>
  <div class="container">
    <div v-for="(item, index) in statusLog" :key="index">
      <StatusLog :playerdata="item"></StatusLog>
    </div>
  </div>
</template>

<script>
import StatusLog from '@/components/ServerStatus/StatusLog.vue'
import getStatusLog from '@/apis/getStatusLog.js'
export default {
  components: { StatusLog },
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
</style>
