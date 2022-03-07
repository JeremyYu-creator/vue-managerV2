<template>
  <div class="main">
    <div id="pie" />
  </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import pieData from '../../mock/pie'
import { Chart, Util } from '@antv/g2'
export default defineComponent({
  name: 'Pie',
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
        container: 'pie', // 指定图表容器 ID
        autoFit: true,
        height: 500
      })
      chart.data(pieData)
      chart.coordinate('theta', {
        radius: 0.75
      })
      chart.tooltip({
        showMarkers: false
      })
      const interval = chart
        .interval()
        .adjust('stack')
        .position('value')
        .color('type', ['#1890ff', '#13c2c2', '#ffc53d', '#73d13d'])
        .style({ opacity: 0.4 })
        .state({
          active: {
            style: (element) => {
              const shape = element.shape
              return {
                matrix: Util.zoom(shape, 1.1)
              }
            }
          }
        })
        .label('type', (val) => {
          const opacity = val === '四线及以下' ? 1 : 0.5
          return {
            offset: -30,
            style: {
              opacity,
              fill: 'white',
              fontSize: 12,
              shadowBlur: 2,
              shadowColor: 'rgba(0, 0, 0, .45)'
            },
            content: (obj) => {
              return obj.type + '\n' + (Number(obj.value) * 100) + '%'
            }
          }
        })
      chart.interaction('element-single-selected')
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
