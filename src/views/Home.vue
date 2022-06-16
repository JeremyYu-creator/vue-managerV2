<template>
  <div class="main">
    <el-header>
      <Header />
    </el-header>
    <el-container>
      <Aside />
      <el-main>
        <div style="height:550px">
          <router-view />
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Aside from '../components/layout/Aside.vue'
import Header from '../components/layout/HeaderComponent.vue'
export default defineComponent({
  name: 'show',
  components: {
    Header,
    Aside
  },
  setup() {
    return {

    }
  }

})

</script>
<style scoped lang="less">
.main{
  .text{
    margin-left: 20px;
  }
}
.el-container{
  // border: 1px solid black;
  // border-radius: 40px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}
.el-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 5px;
}
</style>
