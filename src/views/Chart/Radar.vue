<template>
  <div class="main">
    <div id="radar" />
  </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import DataSet from '@antv/data-set'
import { Chart } from '@antv/g2'
import radarData from '../../mock/radar'
export default defineComponent({
  name: 'Radar',
  setup() {
    /**
     * 普通绘图步骤:
     * 1、创建chart实例；
     * 2、载入数据源
     * 3、创建图形语法，绘制图形
     * 4、渲染图形
     */
    onMounted(() => {
      const { DataView } = DataSet
      const dv = new DataView().source(radarData)
      dv.transform({
        type: 'fold',
        fields: ['a', 'b'], // 展开字段集
        key: 'user', // key字段
        value: 'score' // value字段
      })
      const chart = new Chart({
        container: 'radar', // 指定图表容器 ID
        width: 800, // 指定图表宽度
        height: 500, // 指定图表高度
        padding: [50, 20, 50, 20] // 可自定义添加间距
        // autoFit: true, // 是否自动居中，可不需要width
      })
      chart.data(dv.rows)
      chart.scale('score', {
        min: 0,
        max: 80
      })
      chart.coordinate('polar', {
        radius: 0.8
      })
      chart.tooltip({
        shared: true,
        showCrosshairs: true,
        crosshairs: {
          line: {
            style: {
              lineDash: [4, 4],
              stroke: '#333'
            }
          }
        }
      })
      chart.axis('item', {
        line: null,
        tickLine: null,
        grid: {
          line: {
            style: {
              lineDash: null
            }
          }
        }
      })
      chart.axis('score', {
        line: null,
        tickLine: null,
        grid: {
          line: {
            type: 'line',
            style: {
              lineDash: null
            }
          }
        }
      })
      chart
        .line()
        .position('item*score')
        .color('user')
        .size(2)
      chart
        .point()
        .position('item*score')
        .color('user')
        .shape('circle')
        .size(4)
        .style({
          stroke: '#fff',
          lineWidth: 1,
          fillOpacity: 1
        })
      chart
        .area()
        .position('item*score')
        .color('user')
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
