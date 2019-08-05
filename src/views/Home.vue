<template lang="pug">
  #home
    Header
    MainScreen
    AboutUs
    Tariffs
    Partners
    SubmitApplication
    Footer
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Header from '@/components/Header.vue';
import MainScreen from '@/components/MainScreen.vue';
import AboutUs from '@/components/AboutUs.vue';
import Tariffs from '@/components/Tariffs.vue';
import Partners from '@/components/Partners.vue';
import SubmitApplication from '@/components/SubmitApplication.vue';
import Footer from '@/components/Footer.vue';

@Component({
  components: {
    Header,
    MainScreen,
    AboutUs,
    Tariffs,
    Partners,
    SubmitApplication,
    Footer,
  },
})
export default class Home extends Vue {}
</script>

<style lang="stylus">
@import '~@/assets/font/PTSans/PTSans'
@import '~@/assets/font/PTSerif/PTSerif'
@import '~@/assets/font/Roboto/Roboto'
@import '~@/assets/font/SitkaSmall/SitkaSmall'

*
  margin 0
  padding 0

html
  scroll-behavior smooth

li
  list-style none

a
  text-decoration none

img
  user-select none

body
  color #191919

h2
  margin 32px
  width 303px
  padding-bottom 12px
  border-bottom 3px solid #181f36
  font 36px Roboto, sans-serif
  text-align center
</style>
