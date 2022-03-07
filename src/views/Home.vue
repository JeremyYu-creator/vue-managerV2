<template>
  <div class="main">
    <el-header>
      <Header />
    </el-header>
    <el-container>
      <Aside />
      <el-main>
        <div style="margin-top: 30px">
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
<style scoped lang="scss">
.main{
  .text{
    margin-left: 20px;
  }
}
.el-container{
  border: 1px solid black;
  border-radius: 40px;
}
</style>
