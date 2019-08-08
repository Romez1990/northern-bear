<template lang="pug">
  section#submit-application
    h2 Оставить заявку
    form(action='/application' method='post' @submit.prevent='submit')
      input(type='text' name='name' placeholder='Ваше имя')
      input(type='phone' name='phone' placeholder='Телефон')
      input(type='email' name='email' placeholder='E-mail')
      input(type='text' name='message' placeholder='Сообщение')
      input(type='submit' value='Отправить')
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class SubmitApplication extends Vue {
  async submit(e: Event): Promise<void> {
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const params = new URLSearchParams(formData);
    const res = await fetch(form.action, {
      method: form.method,
      body: params,
    });
    const json = await res.json();
    console.log(json);
  }
}
</script>

<style lang="stylus" scoped>
#submit-application
  display flex
  flex-direction column
  align-items center

form
  display flex
  flex-direction column
  align-items center

input
  outline none

input:not([type='submit'])
  margin 18px 0
  padding 18px 29px
  width 419px
  box-sizing border-box
  border-radius 20px
  border 1px solid #202438
  font 18px PT Serif, serif
  color #a8a8a8

input[type='submit']
  margin 30px 0 94px
  width 284px
  height 47px
  border none
  border-radius 15px
  background #7b0712
  font 18px PT Serif, serif
  color #fff
  text-transform uppercase
  cursor pointer
</style>
