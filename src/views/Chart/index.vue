<template>
  <div class="main">
    <Bar />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Bar from './Bar.vue'
export default defineComponent({
  name: 'index',
  components: {
    Bar
  },
  setup() {

  }
})
</script>

<style scoped lang="sass">

</style>
