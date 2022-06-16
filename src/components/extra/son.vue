<template>
 <div class="post-style">
    <span>{{postData}}hhahah</span>
 </div>
</template>

<script lang="ts">
import {ref, defineComponent, inject,} from "vue";
import { textSymbol } from "../../symbol/text";

export default defineComponent({
  name: "son",
  setup() {
    const postData = inject(textSymbol)
    return {
       postData
    };
  },
});
</script>
<style lang="stylus" scoped>
.post-style
  height 50px
  width 100%
</style>
