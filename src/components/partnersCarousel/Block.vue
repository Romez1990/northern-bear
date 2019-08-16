<template lang="pug">
  .block
    img(:src='img' @load='imageLoaded')
    p {{ name }}
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  props: {
    img: String,
    name: String,
  },
})
export default class Block extends Vue {
  imageLoaded() {
    this.$emit('loaded');
  }
}
</script>

<style lang="stylus" scoped>
.block
  text-align center

p
  margin-top 20px
  font 18px / 35px PT Serif, serif
</style>
