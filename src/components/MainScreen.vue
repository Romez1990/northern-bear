<template lang="pug">
  section#main-screen
    h1 Складские услуги
    #separator
    p
      | Ответ-хранение<br>
      | Переработка грузов<br>
      | Транспортно-экспедиторские услуги по г.Якутск и РС(Я)<br>
      | Доставка в районы Крайнего Севера<br>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class MainScreen extends Vue {}
</script>

<style lang="stylus" scoped>
#main-screen
  padding-top 209px
  background url('~@/assets/img/main-screen.jpg') center
  height 606px
  box-sizing border-box
  color #fff
  text-align center

h1
  font 48px Sitka Small, sans-serif
  text-transform uppercase

#separator
  margin 5px auto 14px
  width 83px
  height 2px
  background #fff

p
  margin-top 31px
  font 18px / 36px PT Serif, serif
</style>
