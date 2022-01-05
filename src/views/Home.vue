/*
 * @Author: litfa
 * @Date: 2022-01-05 20:27:52
 * @Last Modified by: litfa
 * @Last Modified time: 2022-01-05 22:07:44
 */
<template>
  <div class="container">
    <div>
      <StatusLog v-for="(item, index) in statusLog" :key="index" :playerdata="item"></StatusLog>
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
      statusLog: [
        // 第一个服状态
        [],
        // 第二个服日志
        []
      ]
    }
  },
  async created() {
    await this._getStatus()
  },
  methods: {
    async _getStatus() {
      const { data: res } = await getStatusLog()
      console.log(res)
      // this.statusLog = res
      for (let i = 0; i < res.data[0].data.length; i++) {
        for (const j in res.data) {
          const data = res.data[j].data[i]
          data.date = res.data[j].date
          this.statusLog[i].push(data)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
