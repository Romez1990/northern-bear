<template lang="pug">
  section#tariffs
    h2 Тарифы
    Navigation(@indexChange='onIndexChange')
    Slider(ref='slider')
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Navigation from '@/components/tariffsSlider/Navigation.vue';
import Slider from '@/components/tariffsSlider/Slider.vue';

@Component({
  components: { Slider, Navigation },
})
export default class Tariffs extends Vue {
  onIndexChange(index: number): void {
    const slider = this.$refs.slider as Slider;
    slider.changeIndex(index);
  }
}
</script>

<style lang="stylus" scoped>
#tariffs
  display flex
  flex-direction column
  align-items center
</style>
