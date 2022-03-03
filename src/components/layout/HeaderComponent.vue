<template>
  <div class="main">
    <span>{{title}}</span>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent } from 'vue'
export default defineComponent({
  name: 'headerComponent',
  setup() {
    const title = ref('12312312')
    return {
      title
    }
  }

})

</script>
<style scoped lang="scss">

</style>
