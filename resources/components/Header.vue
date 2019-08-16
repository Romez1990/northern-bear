<template lang="pug">
  header(:style='{ background: `rgba(24, 31, 54, ${opacity})` }' ref='header')
    #logo
    nav
      ul
        router-link(v-for='link in links' tag='li' :to='link.section') {{ link.text }}
    #phone-number 8 914 277-66-77
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Header extends Vue {
  initialOpacity = 0.8;
  opacity = this.initialOpacity;

  setupChangeOpacity(): void {
    const mainScreen = document.querySelector('#main-screen') as HTMLElement;
    document.addEventListener('scroll', () => this.changeOpacity(mainScreen));
  }

  changeOpacity(mainScreen: HTMLElement): void {
    const mainScreenHeight = mainScreen.offsetHeight;
    const headerHeight = (this.$refs.header as HTMLElement).offsetHeight;
    const ratio = window.pageYOffset / (mainScreenHeight - headerHeight);
    const opacityCoefficient = ratio > 1 ? 1 : ratio;
    this.opacity = 1 - (1 - opacityCoefficient) * (1 - this.initialOpacity);
  }

  links = [
    { text: 'Главная', section: '#main-screen' },
    { text: 'О нас', section: '#about-us' },
    { text: 'Тарифы', section: '#tariffs' },
    { text: 'Партнеры', section: '#partners' },
    { text: 'Оставить заявку', section: '#submit-application' },
  ];

  mounted() {
    this.setupChangeOpacity();
  }
}
</script>

<style lang="stylus" scoped>
header
  position fixed
  display flex
  justify-content space-around
  align-items center
  height 73px
  width 100%
  background rgb(24, 31, 54)
  font 15px PT Sans, serif
  z-index 1

#logo
  height 53px
  width 85px
  background url('~@/assets/img/logo.png') no-repeat
  margin 8px 0 12px

ul
  display flex
  height 100%

li
  margin 0 7px
  padding 9px 7px
  color #fffefe
  text-transform uppercase
  transition ease-in-out 0.2s
  transition-property color, box-shadow
  user-select none
  cursor pointer

  &:hover
    color #cedbea
    box-shadow 0 2px #cedbea

#phone-number
  color #fffefe
  font-weight bold
</style>
