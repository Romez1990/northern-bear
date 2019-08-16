<template lang="pug">
  section#footer
    #info
      .column
        p Телефон
        p +7 (914) 277 66 77
      .column
        p Адрес
        p г.Якутск,<br>ул.Новопортовская, 1, к7
      .column
        p E-mail
        p avtoprofigruz@mail.ru
      .column
        p Социальные сети
        #social-networks
          img(src='@/assets/img/instagram.png')
          img(src='@/assets/img/vk.png')
          img(src='@/assets/img/skype.png')
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Footer extends Vue {}
</script>

<style lang="stylus" scoped>
#footer
  background #181f36
  padding: 41px 80px 15px
  font 18px PT Serif, serif
  color #ffffff

#info
  display grid
  grid-template-columns repeat(4, 1fr)

p
  margin-bottom: 15px

img
  margin-right: 25px
  cursor pointer
</style>
