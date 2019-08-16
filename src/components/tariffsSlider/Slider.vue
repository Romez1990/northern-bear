<template lang="pug">
  #tariffs-slider(:style='{ height: sliderHeight }')
    #tariffs-slider-content(:style='{ top: sliderOffset }')
      .page(
        v-for='(page, pageNumber) in pages'
        :key='pageNumber'
        ref='pages'
      )
        Block(
          v-for='(block, blockNumber) in page.blocks'
          :key='blockNumber'
          :data='block'
          @loaded='blockLoaded(pageNumber)')
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Block from '@/components/tariffsSlider/Block.vue';

@Component({
  components: { Block },
})
export default class Slider extends Vue {
  index = 0;
  pages = [
    {
      blocks: [
        {
          title: 'Погрузо-разгрузочные работы<br>за куб.м. (1 операция)',
          image: require('@/assets/img/tariffs-1.jpg'),
          prices: [
            {
              name: 'Погрузка/выгрузка',
              cost: '130 руб.',
            },
            {
              name: 'С формированием',
              cost: '170 руб.',
            },
            {
              name: 'Взвешивание груза',
              cost: '130 руб.',
            },
            {
              name: 'Доупаковка/паллетирование',
              cost: '600 руб.',
            },
            {
              name: 'Обрешетка груза',
              cost: '800 руб.',
            },
          ],
        },
        {
          title: 'Погрузо-разгрузочные работы<br>за тонну (1 операция)',
          image: require('@/assets/img/tariffs-2.jpg'),
          imageFirst: true,
          prices: [
            {
              name: 'Погрузка/выгрузка',
              cost: '660 руб.',
            },
            {
              name: 'С формированием',
              cost: '880 руб.',
            },
            {
              name: 'Взвешивание',
              cost: '550 руб.',
            },
          ],
        },
      ],
    },
    {
      blocks: [
        {
          title: 'Хранение',
          image: require('@/assets/img/tariffs-3.jpg'),
          prices: [
            {
              name: 'Хранение груза в крытом помещении',
              cost: '45 руб./м^3/сут.',
            },
            {
              name: 'Хранение груза на открытой площадке',
              cost: '30 руб./м^3/сут.',
            },
          ],
        },
        {
          title: 'Дополнительные услуги',
          image: require('@/assets/img/tariffs-4.jpg'),
          imageFirst: true,
          prices: [
            {
              name: 'Пломбирование',
              cost: '420 руб.',
            },
            {
              name: 'Маркировка',
              cost: '5 руб./место',
            },
            {
              name: 'Фотоотчет погрузки',
              cost: '6 руб./место',
            },
          ],
        },
      ],
    },
    {
      blocks: [
        {
          title: 'Мирный - Якутск - Усть-Нера',
          image: require('@/assets/img/tariffs-5.jpg'),
          prices: [
            {
              name: 'Якутск - Мирный',
              cost: 'до 15000 руб./м^3',
            },
            {
              name: 'Якутск - Мирный',
              cost: 'до 60 руб./кг',
            },
            {
              name: 'Якутск - Усть-Нера',
              cost: 'до 15000 руб./м^3',
            },
            {
              name: 'Якутск - Усть-Нера',
              cost: 'до 60 руб./кг',
            },
          ],
        },
        {
          title: 'Тикси - Чокурдах - Черский (автозимник)',
          image: require('@/assets/img/tariffs-6.jpg'),
          imageFirst: true,
          prices: [
            {
              name: 'Якутск - Тикси, Чокурдах, Черский',
              cost: 'до 25000 руб./м^3',
            },
            {
              name: 'Якутск - Тикси, Чокурдах, Черский',
              cost: 'до 60 руб./кг',
            },
          ],
        },
        {
          title: 'Тикси - Чокурдах - Черский (корабль)',
          image: require('@/assets/img/tariffs-7.jpg'),
          prices: [
            {
              name: 'Якутск - Тикси, Чокурдах, Черский',
              cost: 'до 25000 руб./м^3',
            },
            {
              name: 'Якутск - Тикси, Чокурдах, Черский',
              cost: 'до 60 руб./кг',
            },
          ],
        },
      ],
    },
  ];

  imagesOnPagesLoaded = new Array(this.pages.length).fill(0);

  blockLoaded(pageNumber: number): void {
    this.imagesOnPagesLoaded[pageNumber] += 1;
    this.alignSlider();
  }

  sliderHeight = '';
  sliderOffset = '';

  alignSlider(): void {
    if (
      this.imagesOnPagesLoaded[this.index] !==
      this.pages[this.index].blocks.length
    )
      return;

    const $pages = this.$refs.pages as HTMLElement[];
    const currentBlock = $pages[this.index];
    this.sliderHeight = `${currentBlock.offsetHeight}px`;
    this.sliderOffset = `-${currentBlock.offsetTop}px`;
  }

  setupSlider(): void {
    window.addEventListener('resize', this.alignSlider);
  }

  mounted(): void {
    this.setupSlider();
  }

  changeIndex(index: number): void {
    this.index = index;
    this.alignSlider();
  }
}
</script>

<style lang="stylus" scoped>
tariffs-anim-duration = 1s

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
</style>
