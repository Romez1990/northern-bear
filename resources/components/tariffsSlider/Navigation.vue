<template lang="pug">
  nav
    ul
      li(v-for='title in titles' ref='titles' @click='changeIndex') {{ title }}
    Highlighter(ref='highlighter')
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Highlighter from '@/components/tariffsSlider/Highlighter.vue';

@Component({
  components: { Highlighter },
})
export default class Navigation extends Vue {
  index = 0;
  titles = ['Складские работы', 'Складские услуги', 'Транспортные услуги'];
  $titles: HTMLElement[] = [];

  alignToTitle(): void {
    const highlighter = this.$refs.highlighter as Highlighter;
    highlighter.alignTo(this.$titles[this.index]);
  }

  changeIndex(e: Event): void {
    const newIndex = this.$titles.indexOf(e.target as HTMLElement);
    if (this.index === newIndex) return;
    this.index = newIndex;
    this.alignToTitle();
    this.$emit('indexChange', this.index);
  }
  setupNavigation(): void {
    this.$titles = this.$refs.titles as HTMLElement[];
    this.alignToTitle();
    window.addEventListener('resize', this.alignToTitle);
  }

  mounted(): void {
    this.setupNavigation();
  }
}
</script>

<style lang="stylus" scoped>
nav
  position relative
  max-width 900px
  width 100%
  font 24px PT Serif

ul
  display flex
  justify-content space-around
  text-align center
  white-space nowrap

li
  cursor pointer
  user-select none
</style>
