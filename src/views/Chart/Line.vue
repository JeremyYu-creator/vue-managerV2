<template>
  <div class="main">
    <div id="line" />
  </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import lineData from '../../mock/line'
import { Chart } from '@antv/g2'
export default defineComponent({
  name: 'Line',
  setup() {
    /**
     * 普通绘图步骤:
     * 1、创建chart实例；
     * 2、载入数据源
     * 3、创建图形语法，绘制图形
     * 4、渲染图形
     */
    onMounted(() => {
      const chart = new Chart({
        container: 'line', // 指定图表容器 ID
        width: 800, // 指定图表宽度
        height: 500, // 指定图表高度
        padding: [50, 20, 50, 20] // 可自定义添加间距
        // autoFit: true, // 是否自动居中，可不需要width
      })
      chart.data(lineData)
      chart.scale({
        year: {
          range: [0, 1]
        },
        value: {
          min: 0,
          nice: true
        }
      })

      chart.tooltip({
        showCrosshairs: true, // 展示 Tooltip 辅助线
        shared: true
      })

      chart.line().position('year*value').label('value')
      chart.point().position('year*value')

      chart.render()
    })
    return {
    }
  }
})

</script>

<style scoped lang="scss">
.main{
  .title{
    margin-bottom: 30px;
  }
}
</style>
