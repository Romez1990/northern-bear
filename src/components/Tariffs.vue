<template lang="pug">
  section#tariffs
    h2 Тарифы
    nav
      ul
        li Складские работы
        li Складские услуги
        li Транспортные услуги
      #highlighter
    #tariffs-slider
      #tariffs-slider-content
        .column
          .row
            .description
              .title
                | Погрузо-разгрузочные работы<br>
                | за куб.м. (1 операция)<br>
              .prices
                p Погрузка/выгрузка
                span 130 руб.
                p С формированием
                span 170 руб.
                p Взвешивание груза
                span 130 руб.
                p Доупаковка/паллетирование
                span 600 руб.
                p Обрешетка груза
                span 800 руб.
            .image
              img(src='@/assets/img/tariffs-1.jpg')
          .row
            .image
              img(src='@/assets/img/tariffs-2.jpg')
            .description
              .title
                | Погрузо-разгрузочные работы<br>
                | за тонну (1 операция)<br>
              .prices
                p Погрузка/выгрузка
                span 660 руб.
                p С формированием
                span 880 руб.
                p Взвешивание
                span 550 руб.
        .column
          .row
            .description
              .title Хранение
              .prices
                p Хранение груза в крытом помещении
                span 45 руб./м^3/сут.
                p Хранение груза на открытой площадке
                span 30 руб./м^3/сут.
            .image
              img(src='@/assets/img/tariffs-3.jpg')
          .row
            .image
              img(src='@/assets/img/tariffs-4.jpg')
            .description
              .title Дополнительные услуги
              .prices
                p Пломбирование
                span 420 руб.
                p Маркировка
                span 5 руб./место
                p Фотоотчет погрузки
                span 6 руб./место
        .column
          .row
            .description
              .title Мирный - Якутск - Усть-Нера
              .prices
                p Якутск - Мирный
                span до 15000 руб./м^3
                p Якутск - Мирный
                span до 60 руб./кг
                p Якутск - Усть-Нера
                span до 15000 руб./м^3
                p Якутск - Усть-Нера
                span до 60 руб./кг
            .image
              img(src='@/assets/img/tariffs-5.jpg')
          .row
            .image
              img(src='@/assets/img/tariffs-6.jpg')
            .description
              .title Тикси - Чокурдах - Черский (автозимник)
              .prices
                p Якутск - Тикси, Чокурдах, Черский
                span до 25000 руб./м^3
                p Якутск - Тикси, Чокурдах, Черский
                span до 60 руб./кг
          .row
            .description
              .title Тикси - Чокурдах - Черский (корабль)
              .prices
                p Якутск - Тикси, Чокурдах, Черский
                span до 25000 руб./м^3
                p Якутск - Тикси, Чокурдах, Черский
                span до 60 руб./кг
            .image
              img(src='@/assets/img/tariffs-7.jpg')
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Tariffs extends Vue {
  mounted() {
    class Highlighter {
      private elem: HTMLElement;

      public constructor() {
        this.elem = document.querySelector(
          '#tariffs #highlighter',
        ) as HTMLElement;
      }

      public alignPositionTo(title: HTMLElement): void {
        const center = title.offsetLeft + title.offsetWidth / 2;
        this.elem.style.left = `${center - this.elem.offsetWidth / 2}px`;
      }
    }

    class Slider {
      private slider: HTMLElement;

      private content: HTMLElement;

      private columns: NodeListOf<HTMLElement>;

      public constructor() {
        this.slider = document.querySelector('#tariffs-slider') as HTMLElement;
        this.content = document.querySelector(
          '#tariffs-slider-content',
        ) as HTMLElement;
        this.columns = document.querySelectorAll<HTMLElement>(
          '#tariffs-slider .column',
        );
      }

      public setIndex(index: number): void {
        this.slider.style.height = `${this.columns[index].offsetHeight}px`;
        this.content.style.top = `-${this.columns[index].offsetTop}px`;
      }
    }

    function setupSlider(): void {
      const titles = document.querySelectorAll<HTMLElement>('#tariffs li');
      const highlighter = new Highlighter();
      const slider = new Slider();
      let index = 0;

      titles.forEach((title: HTMLElement): void => {
        title.addEventListener('click', (): void => {
          index = Array.prototype.indexOf.call(titles, title);
          highlighter.alignPositionTo(title);
          slider.setIndex(index);
        });
      });

      function align(): void {
        highlighter.alignPositionTo(titles[index]);
        slider.setIndex(index);
      }

      window.addEventListener('resize', align);
      align();
    }

    setTimeout(setupSlider, 100);
  }
}
</script>

<style lang="stylus" scoped>
tariffs-anim-duration = 1s

#tariffs
  display flex
  flex-direction column
  align-items center

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

#highlighter
  position absolute
  width 100px
  height 3px
  background #7b0712
  transition left tariffs-anim-duration

#tariffs-slider
  position relative
  margin 11px 0 20px
  max-width 1200px
  width 100%
  overflow hidden
  transition height tariffs-anim-duration

#tariffs-slider-content
  position absolute
  top 0
  width 100%
  transition top tariffs-anim-duration

.row
  padding 42px 0
  display flex

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
