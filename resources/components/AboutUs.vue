<template lang="pug">
  section#about-us
    h2 О нас
    p
      | Труд сделал из счастливой обезьяны человека. Человек - это звучит гордо.<br>
      | Я горжусь своим трудом!<br>
    #figures
      figure
        img(src='@/assets/img/teamwork.png', alt='teamwork')
        figcaption Трудимся с 2009
      figure
        img(src='@/assets/img/truck.png', alt='truck')
        figcaption Отгружаем в районы Крайнего Севера
      figure
        img(src='@/assets/img/cargo.png', alt='cargo')
        figcaption Полный спектр складских услуг
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class AboutUs extends Vue {}
</script>

<style lang="stylus" scoped>
#about-us
  display flex
  flex-direction column
  align-items center
  background #f5f5f5

h2
  margin-top 60px
  padding-bottom 9px

p
  margin-top 24px
  font 18px / 35px PT Serif, serif
  text-align center

#figures
  margin 57px 0 54px
  max-width 800px
  width 100%
  display flex
  justify-content space-between

figure
  width 182px
  text-align center

figcaption
  font 18px / 35px PT Serif, serif
  text-align center
</style>
