<script lang="ts" setup>
import { ref, computed } from 'vue'
import { ElInput, ElButton, ElMessage, ElSwitch, ElInputNumber, ElCollapse, ElCollapseItem } from 'element-plus'
import type { CollapseModelValue } from 'element-plus'
import { Copy } from '@icon-park/vue-next'
import { useClipboard } from '@vueuse/core'

const props = defineProps({
  id: [Number, String]
})

const { copy } = useClipboard()
const dark = ref(false)
const width = ref(500)
// iframe 里的连接
const link = computed(() => {
  return `http://localhost:8080/iframe?id=${props.id}&dark=${dark.value}`
})
// 用来复制的代码
const code = computed(() =>
  `<iframe src="${link.value}" width="${width.value}" height="200px" frameborder="0"></iframe>`
)

const copyLink = async () => {
  await copy(code.value)
  ElMessage.success('复制成功')
}

const showIframe = ref(false)

const onChange = (value: CollapseModelValue): any => {
  const isOpen = value == '1'
  // 第一次打开时渲染
  if (isOpen) {
    showIframe.value = true
  }
}

</script>

<template>
  <div class="share">
    <el-input v-model="code" readonly>
      <template #append>
        <el-button :icon="Copy" @click="copyLink" />
      </template>
    </el-input>
    <el-collapse @change="onChange" accordion>
      <el-collapse-item title="预览" name="1">
        <div class="options">
          <span class="item">
            暗色模式
            <el-switch v-model="dark" />
          </span>
          <span class="item">
            宽度
            <el-input-number v-model="width" :step="20" size="small" :min="180" :max="1000" />
          </span>
        </div>
        <iframe v-if="showIframe" :src="link" :width="width" height="200px" frameborder="0"></iframe>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<style lang="less" scoped>
.share {
  width: 100%;
}
.el-collapse {
  --el-collapse-header-height: 30px !important;
  .options {
    display: flex;
    margin-left: 10px;
    .item {
      margin-right: 10px;
      display: flex;
      align-items: center;
    }
  }
  iframe {
    margin-left: 10px;
    max-width: 100%;
  }
}
</style>