<template lang="pug">
  #partners-carousel-wrapper
    #arrow-left.arrow(@click='shiftLeft')
    #partners-carousel(:style='{ height: carouserHeight}' ref='slider')
      #partners-carousel-content(
        :style=`{ transitionDuration: contentTransitionDuration, left: carouserOffset }`
        ref='content')
        Block(
          v-for='(block, blockNumber) in visibleBlocks'
          :key='blockNumber'
          :name='block.name'
          :img='block.image'
          :style='{ width: blockWidth }'
          @loaded='blockLoaded')
    #arrow-right.arrow(@click='shiftRight')
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Block from '@/components/partnersCarousel/Block.vue';
import './arrayHelpers';

@Component({
  components: { Block },
})
export default class Carousel extends Vue {
  blocks = [
    {
      name: 'ООО «СТЭС»',
      image: require('@/assets/img/partner-1.png'),
    },
    {
      name: 'АО «Колымавзрывпром',
      image: require('@/assets/img/partner-2.png'),
    },
    {
      name: 'ООО «ТД Полиметалл»',
      image: require('@/assets/img/partner-3.png'),
    },
  ];

  blocksLoaded = 0;

  blockLoaded(): void {
    this.blocksLoaded += 1;
    if (this.blocksLoaded !== this.blocks.length) return;
    this.alignCarousel();
  }

  blocksAtOnce = 3;
  carouserHeight = '';
  blockWidth = '';

  alignCarousel(): void {
    const content = this.$refs.content as HTMLElement;
    this.carouserHeight = `${content.offsetHeight}px`;

    const slider = this.$refs.slider as HTMLElement;
    const width = slider.offsetWidth / this.blocksAtOnce;
    this.blockWidth = `${width}px`;
  }

  setupCarousel(): void {
    window.addEventListener('resize', this.alignCarousel);
  }

  mounted(): void {
    this.setupCarousel();
  }

  index = 0;
  visibleBlocks = this.blocks.slice(0, this.blocksAtOnce);
  readonly animDuration = 0.4;
  contentTransitionDuration = '';
  carouserOffset = '';
  isAnimating = false;

  shiftContentOver({ silently = false } = {}): void {
    this.contentTransitionDuration = `${silently ? '0' : this.animDuration}s`;
    this.carouserOffset = `-${this.blockWidth}`;
  }

  shiftContentBack({ silently = false } = {}): void {
    this.contentTransitionDuration = `${silently ? '0' : this.animDuration}s`;
    this.carouserOffset = '0';
  }

  shift(forward: boolean): void {
    if (this.isAnimating) return;
    this.isAnimating = true;
    const coefficient = forward ? this.blocksAtOnce : -1;
    const newBlock = this.blocks.atBeyond(this.index + coefficient);
    this.visibleBlocks.insert(newBlock, forward);
    this.shiftContentOver({ silently: !forward });
    if (!forward) setTimeout(this.shiftContentBack, 0);
    this.index += forward ? 1 : -1;
    setTimeout((): void => {
      this.visibleBlocks.remove(!forward);
      if (forward) this.shiftContentBack({ silently: true });
      this.isAnimating = false;
    }, this.animDuration * 1000);
  }

  shiftLeft(): void {
    this.shift(true);
  }

  shiftRight(): void {
    this.shift(false);
  }
}
</script>

<style lang="stylus" scoped>
#partners-carousel-wrapper
  margin 30px 0 74px
  padding 0 20px
  box-sizing border-box
  display flex
  align-items center
  max-width 900px
  width 100%

.arrow
  width 40px
  height 40px
  border solid #1a1a1a
  border-width 2px 2px 0 0
  border-radius 0 0 0 50%
  cursor pointer
  transition border-color 0.2s

.arrow:hover {
  border-color #c0c0c0
}

#arrow-left
  transform rotate(-135deg)

#arrow-right
  transform rotate(45deg)

#partners-carousel
  position relative
  width 100%
  overflow hidden

#partners-carousel-content
  position absolute
  display flex
  left 0
  transition-property left
</style>
