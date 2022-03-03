<template>
  <div id="app">
    <el-config-provider :locale="locale">
      <router-view />
    </el-config-provider>
  </div>
</template>

<!--设置成中文形式的element组件-->
<script lang="ts">
import { ElConfigProvider, } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { defineComponent, } from 'vue'

export default defineComponent({
  components: {
    [ElConfigProvider.name]: ElConfigProvider,
  },
  data () {
    return {
      locale: zhCn,
    }
  },
},)
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
