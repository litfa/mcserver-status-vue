/*
 * @Author: litfa
 * @Date: 2022-01-05 20:27:52
 * @Last Modified by: litfa
 * @Last Modified time: 2022-01-Sa 02:09:31
 */
<template>
  <div class="container">
    <el-row :gutter="10" class="echarts"
      v-for="(item, index) in statusLog" :key="index">
      <el-col class="col">
        <el-card class="players">
          <template #header>
            <h3> {{ item[item.length-1].name }}</h3>
          </template>
          <div class="clearfix">
            <div>
              <span>版本:</span>
              <span>{{ item[item.length-1].version }}</span>
            </div>
            <div>
              <span>协议版本:</span>
              <span>{{ item[item.length-1].agreement }}</span>
            </div>
            <div>
              <span>motd:</span>
              <span>{{ item[item.length-1].motd }}</span>
            </div>

            <div v-if="item[item.length-1].type == 'je'">
              <span>人数:</span>
              <el-popover placement="right" width="200"
                trigger="hover">
                <template #reference>
                  <span>{{ item[item.length-1].online }} /
                    {{ item[item.length-1].max }}</span>
                </template>
                <div v-for="j in item[item.length-1].sample"
                  :key="j.id">
                  {{ j.name }}
                </div>
              </el-popover>
            </div>

            <div v-else>
              <span>人数:</span>
              <span>{{ item[item.length-1].online }} /
                {{ item[item.length-1].max }}</span>
            </div>
            <div>
              <span>更新时间:</span>
              <span>{{ formatDate(item[item.length-1].date) }}
              </span>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col class="col">
        <el-card class="serverStatus">
          <div class="title">服务器状态</div>
          <ServerStatus :playerdata="item"
            :reSetEcharts="reSetEcharts"></ServerStatus>
          <div class="title">历史在线人数</div>
          <PlayerNumber :playerdata="item"
            :reSetEcharts="reSetEcharts"></PlayerNumber>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PlayerNumber from '@/components/ServerStatus/PlayerNumber.vue'
import ServerStatus from '@/components/ServerStatus/ServerStatus.vue'
import getStatusLog from '@/apis/getStatusLog.js'
import getStatus from '@/apis/getStatus.js'
import dayjs from 'dayjs'
export default {
  components: { PlayerNumber, ServerStatus },
  data() {
    return {
      // 所有遍历后的状态 用id为索引的对象(有点像伪数组)
      statusLog: {},
      reSetEcharts: 0,
      timeOut: ''
    }
  },
  created() {
    this._getStatus()
  },
  mounted() {
    window.onresize = () => this.reSet()
  },
  computed: {},
  methods: {
    formatDate(date) {
      return dayjs(date).format('HH:mm:ss')
    },
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
      // 展示最新数据
      if (res.viewNewData) this.getNewData()
    },
    reSet() {
      clearTimeout(this.timeOut)
      this.timeOut = setTimeout(() => {
        this.reSetEcharts++
      }, 1000)
    },
    async getNewData() {
      const { data: res } = await getStatus()
      // 数据对象
      const data = this.statusLog
      for (const i in res.data) {
        // 创建空数组
        if (!data[res.data[i].id]) data[res.data[i].id] = []
        // 将数据复制给 key 为 id 的对象
        data[res.data[i].id].push(res.data[i])
      }
      // 更新数据
      this.statusLog = data
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  // 解决手机端不居中
  /deep/ .el-row {
    margin-left: 0px !important;
    margin-right: 0px !important;
  }
  .echarts {
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    width: 100%;
    margin: 20px 0;
    // background-color: #fff;
    .col {
      flex: 1;
      box-sizing: border-box;
      .players,
      .serverStatus {
        min-width: 300px;
      }
      .players {
        height: 100%;
        /deep/ .el-card__body {
          // min-height: 200px;
          height: 250px;
          // margin-top: 70px;
        }
      }
      .clearfix {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 100%;
        div {
          display: flex;
          // flex-wrap: wrap;
          span:nth-child(1) {
            width: 4.5em;
            margin-right: 15px;
            text-align: right;
            flex-shrink: 0;
          }
          span:nth-child(2) {
            max-width: 300px;
          }
        }
      }
    }
  }
}
</style>
