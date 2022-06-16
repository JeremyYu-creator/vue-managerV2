<template>
 <div class="post-style">
    <span>{{num}}</span>
 </div>
</template>

<script lang="ts">
import {ref, defineComponent, inject,} from "vue";
import mitter from "../../utils/mitt";
// import { textSymbol } from "../../symbol/text";

export default defineComponent({
  name: "brother",
  setup(props) {
    mitter.emit('mittEvent',{name: 'hello'})
    const num = ref('')
    // postData.value = props.notice
    return {
      num
    };
  },
});
</script>
<style lang="stylus" scoped>
.post-style
  height 50px
  width 100%
</style>
