<template>
  <div class="header-style">
    <div class="info-style">
      <el-button @click="logout">登出</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'headerComponent',
  setup() {
    const title = ref('12312312')
    const router = useRouter()
    const logout = () => {
      router.push('/login')
    }
    return {
      title,
      logout
    }
  }

})

</script>
<style scoped lang="less">
// .header-style {
//   .info-style{
//     height: 100%;
//     display: flex;
//     align-items: center;
//     justify-content: flex-end;
//   }
// }
</style>
