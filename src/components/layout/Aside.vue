<template>
  <div class="main">
    <el-row class="tac">
      <el-col>
        <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            :unique-opened="true"
        >
          <template v-for="item in setArr" :key="item.value">
            <el-sub-menu :index="item.index">
            <template #title>
              <el-icon><location/></el-icon>
              <span>{{item.title}}</span>
            </template>
            <el-sub-menu :index="item.subIndex" v-if="item.subArr.length > 0">
              <template #title>
                <div class="horizontal">
                  {{item.subName}}
                </div>
              </template>
              <el-menu-item :index="iitem.thirdIndex"  v-for="iitem in item.subArr" :key="iitem.value">
                <div class="horizontal" @click="jumpTo(iitem.thirdIndex)">
                  {{iitem.thirdName}}
                </div>
              </el-menu-item>
            </el-sub-menu>
            <el-menu-item :index="item.subIndex" v-else>
              <div class="horizontal" @click="jumpTo(item.subIndex)">
                {{item.subName}}
              </div>
            </el-menu-item>
          </el-sub-menu>
          </template>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent } from 'vue'
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting,
} from '@element-plus/icons-vue'
import routePath from "../../utils/routePath";
import RouteType from '../../type/routePath'
import {useRouter} from "vue-router";
export default defineComponent({
  name: 'show',
  components:{
    Location,
    Document,
    IconMenu,
    Setting,
  },
  data() {
    return {// 尝试性封装左侧tab标题
      setArr: [ // 设计结构时会考虑有几层，这种数据结构比较符合树形的结构；不同的是，树形的会使用递归；这里的考虑写成固定的
        {
          title: '第一级',
          index: '1',
          subName: '第二级',
          subIndex: '1-1',
          subArr: [
            {
              thirdIndex: '1-1-1',
              thirdName: '第三级一',
            },
          ],
        },
        {
          title: '第二级',
          index: '2',
          subIndex: '2-1',
          subName: '第二级',
          subArr: [
            {
              thirdIndex: '2-1-1',
              thirdName: '第三级一',
            },
            {
              thirdIndex: '2-1-2',
              thirdName: '第三极二',
            },
          ],
        },
        {
          title: '第三极',
          index: '3',
          subIndex: '3-1',
          subName: '第二级',
          subArr: [],
        },
      ]
    }
  },
  setup() {
    const count = ref(0)
    const router = useRouter()
    const jumpTo = (path: string) => {
        routePath.forEach((item: RouteType) => {
          if(item.index === path || item.subIndex === path || item.thirdIndex === path) {
            // 基于实际场景的话很可能不是固定有三级菜单，因此可能到二级就结束了，所以要充足判断一级到三级的点击路径
            router.push({name: item.name})
          }
        })
    }
    return {
      count,
      jumpTo,
    }
  }

})

</script>
<style scoped lang="scss">
.main{
  width: 250px;
  margin: 20px;
  .text{
    margin-left: 20px;
  }
  .horizontal{
    padding-left: 25px;
  }
}
</style>

