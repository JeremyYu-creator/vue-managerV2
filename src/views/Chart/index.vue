<template>
  <div class="home">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane v-for="item in labelList" :key="item.value" :label="item.label" :name="item.name">
        {{ item.title }}
      </el-tab-pane>
    </el-tabs>
    <Bar v-if="activeName === 'first'" />
    <Line v-if="activeName === 'second'" />
    <Pie v-if="activeName === 'third'" />
    <Radar v-if="activeName === 'fourth'" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import Bar from './Bar.vue'
import Line from './Line.vue'
import Pie from './Pie.vue'
import Radar from './Radar.vue'
export default defineComponent({
  name: 'index',
  components: {
    Bar,
    Line,
    Pie,
    Radar
  },
  data() {
    return {
      labelList: [ // 可以考虑剥离出一个文件
        {
          label: '柱状图',
          name: 'first',
          title: '柱状图'
        },
        {
          label: '折线图',
          name: 'second',
          title: '折线图'
        },
        {
          label: '饼图',
          name: 'third',
          title: '饼图'
        },
        {
          label: '雷达图',
          name: 'fourth',
          title: '雷达图'
        }
      ]
    }
  },
  setup() {
    const activeName = ref('first')
    const handleClick = (tab) => {
      // el-tab组件的tab属性可以获取到渲染的值
      activeName.value = tab.props.name
    }
    return {
      activeName,
      handleClick
    }
  }
})
</script>

<style scoped lang="sass">
.home
  padding: 10px
  border: 1px solid #909399
  border-radius: 5px
</style>
