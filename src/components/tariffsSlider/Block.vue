<template lang="pug">
  .block(:class='{ reverse: data.imageFirst }')
    .description
      .title(v-html='data.title')
      .prices(v-for='price in data.prices')
        p {{ price.name }}
        span {{ price.cost }}
    .image
      img(:src='data.image' @load='imageLoaded')
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  props: {
    data: Object,
  },
})
export default class Block extends Vue {
  imageLoaded(): void {
    this.$emit('loaded');
  }
}
</script>

<style lang="stylus" scoped>
.block
  padding 42px 0
  display flex

.reverse
  flex-direction row-reverse

.description
.image
  width 50%
  display flex
  flex-direction column
  justify-content center
  align-items center

.title
.prices
  align-self stretch

.title
  margin-bottom 40px
  font 24px / 35px PT Serif, serif
  color #7b0712

.prices
  display grid
  grid-template-columns 1fr auto
  font 18px / 35px PT Serif, serif

span
  white-space nowrap

.image
  padding 0 40px
  box-sizing border-box

img
  width 100%
</style>
