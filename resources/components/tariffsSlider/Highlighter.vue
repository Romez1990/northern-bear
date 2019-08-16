<template lang="pug">
  #highlighter(:style='{ left: left }' ref='el')
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Highlighter extends Vue {
  left = '';

  alignTo(title: HTMLElement): void {
    const center = title.offsetLeft + title.offsetWidth / 2;
    this.left = `${center - (this.$refs.el as HTMLElement).offsetWidth / 2}px`;
  }
}
</script>

<style lang="stylus" scoped>
tariffs-anim-duration = 1s

#highlighter
  position absolute
  width 100px
  height 3px
  background #7b0712
  transition left tariffs-anim-duration
</style>
