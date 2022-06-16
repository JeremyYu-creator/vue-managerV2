<template>
 <div class="post-style">
    {{notice}}
    <span>{{postData}}</span>
    <el-button @click="touch">传值</el-button>
    <Son></Son>
 </div>
</template>

<script lang="ts">
import {ref, defineComponent, inject,} from "vue";
import { textSymbol } from "../../symbol/text";
import Son from '../../components/extra/son.vue'

export default defineComponent({
  name: "notice",
  components: {
    Son
  },  
  props: {
    notice: {
      type: String,
      default: () => '默认'
    }
  },
  emits:['showData'],
  setup(props, context) {
    const postData = inject(textSymbol)
    console.log(postData)
    // postData.value = props.notice
    const touch = () => {
      context.emit('showData', 567)
    }
    return {
       postData,
       touch
    };
  },
});
</script>
<style lang="stylus" scoped>
.post-style
  height 50px
  width 100%
</style>
