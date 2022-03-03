<template>
  <div class="main">
    <span class="title">{{name}}</span>
    <div id="line"></div>
  </div>
</template>

<script>
import {defineComponent, ref, onMounted} from "vue";
import barData from '../../mock/bar'
import { Chart } from '@antv/g2'
export default defineComponent({
  name: "Bar",
  setup() {
      const name = ref('折线图')
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
          height: 300, // 指定图表高度
          padding: [50, 20, 50, 20], // 可自定义添加间距
          // autoFit: true, // 是否自动居中，可不需要width
        });
        chart.data(barData);
        chart.scale('value', { // 绘制文字
          alias: '销售额(万)',
        });
        chart.axis('type', { // 定义xy轴
          tickLine: {
            alignTick: false,
          },
        });
        chart.axis('value', false);

        chart.tooltip({
          showMarkers: false,
        });
        chart.interval().position('type*value');
        chart.interaction('element-active');
        /**
         * 此处是在柱状图的位置处进行添加文本
        */
        barData.forEach((item) => {
          chart
              .annotation()
              .text({
                position: [item.type, item.value],
                content: item.value,
                style: {
                  textAlign: 'center',
                },
                offsetY: -30,
              })
              .text({
                position: [item.type, item.value],
                content: (item.percent * 100).toFixed(0) + '%',
                style: {
                  textAlign: 'center',
                },
                offsetY: -12,
              });
        });
        chart.render();
      })
      return {
          name,
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
