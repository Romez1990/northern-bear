<template lang="pug">
  section#partners
    h2 Партнеры
    Carousel
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Carousel from '@/components/partnersCarousel/Carousel.vue';

@Component({
  components: { Carousel },
})
export default class Partners extends Vue {}
</script>

<style lang="stylus" scoped>
#partners
  display flex
  flex-direction column
  align-items center
  background #f5f5f5
</style>
