<template lang="pug">
  mixin block(img, name)
    .block
      img(src=img)
      p= name

  section#partners
    h2 Партнеры
    #partners-slider-wrapper
      #arrow-left.arrow
      #partners-slider
        #partners-slider-content
          +block('@/assets/img/partner-1.png', 'ООО «СТЭС»')
          +block('@/assets/img/partner-2.png', 'АО «Колымавзрывпром')
          +block('@/assets/img/partner-3.png', 'ООО «ТД Полиметалл»')
      #arrow-right.arrow
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Partners extends Vue {
  mounted() {
    function fixNegativeIndex(index: number, arrayLength: number): number {
      if (index < 0) {
        const countOfOver = Math.floor(-index / arrayLength);
        return index + arrayLength * (countOfOver + 1);
      }
      return index;
    }

    function arrayOverAt<T>(array: T[], index: number): T {
      const fixedIndex = fixNegativeIndex(index, array.length);
      return array[fixedIndex % array.length];
    }

    class Block {
      private readonly img: string;

      private readonly name: string;

      public constructor(img: string, name: string) {
        this.img = img;
        this.name = name;
      }

      public createElement(): HTMLElement {
        const block = document.createElement('div');
        block.setAttribute('class', 'block');
        const img = document.createElement('img');
        img.setAttribute('src', this.img);
        block.appendChild(img);
        const name = document.createElement('p');
        name.textContent = this.name;
        block.appendChild(name);
        return block;
      }
    }

    function setupCarousel(): void {
      const animDuration = 0.4;
      const visible = 3;
      const blocks: Block[] = [];
      const slider = document.querySelector('#partners-slider') as HTMLElement;
      const content = document.querySelector(
        '#partners-slider-content',
      ) as HTMLElement;
      let index = 0;

      document
        .querySelectorAll<HTMLElement>('#partners-slider-content .block')
        .forEach((block: HTMLElement): void => {
          const imgElem = block.querySelector('img') as HTMLElement;
          const img = imgElem.getAttribute('src') || '';
          const nameElem = block.querySelector('p') as HTMLElement;
          const name = nameElem.textContent || '';
          blocks.push(new Block(img, name));
          if (blocks.length > visible) content.removeChild(block);
        });

      let blockWidth = 0;

      function alignBlocks(): void {
        slider.style.height = `${content.offsetHeight}px`;
        blockWidth = slider.offsetWidth / visible;
        document
          .querySelectorAll<HTMLElement>('#partners-slider-content .block')
          .forEach((block: HTMLElement): void => {
            block.style.width = `${blockWidth}px`;
          });
      }

      window.addEventListener('resize', alignBlocks);
      alignBlocks();

      let isAnimating = false;

      enum Direction {
        backward = -1,
        forward = 1,
      }

      function slide(direction: Direction): void {
        if (isAnimating) return;
        isAnimating = true;
        index += -direction;

        const coefficient = direction === Direction.forward ? 0 : -1;
        const indexOfNewBlock = visible + index + coefficient;
        const newBlock = arrayOverAt(blocks, indexOfNewBlock).createElement();
        newBlock.style.width = `${blockWidth}px`;

        const currentBlocks = document.querySelectorAll<HTMLElement>(
          '#partners-slider-content .block',
        );
        const firstBlock = currentBlocks[0];
        const lastBlock = currentBlocks[currentBlocks.length - 1];

        if (direction === Direction.backward) content.appendChild(newBlock);
        else content.insertBefore(newBlock, firstBlock);

        if (direction === Direction.backward)
          content.style.transitionDuration = `${animDuration}s`;
        else content.style.transitionDuration = '0s';
        content.style.left = `${-blockWidth}px`;
        if (direction === Direction.forward) {
          setTimeout((): void => {
            content.style.transitionDuration = `${animDuration}s`;
            content.style.left = '0';
          }, 0);
        }

        setTimeout((): void => {
          if (direction === Direction.backward) content.removeChild(firstBlock);
          else content.removeChild(lastBlock);

          if (direction === Direction.backward) {
            content.style.transitionDuration = '0s';
            content.style.left = '0';
          } else {
            content.style.transitionDuration = `${animDuration}s`;
          }

          isAnimating = false;
        }, animDuration * 1000);
      }

      const arrowLeft = document.querySelector('#arrow-left') as HTMLElement;
      arrowLeft.addEventListener('click', (): void =>
        slide(Direction.backward),
      );
      const arrowRight = document.querySelector('#arrow-right') as HTMLElement;
      arrowRight.addEventListener('click', (): void =>
        slide(Direction.forward),
      );
    }

    setTimeout(setupCarousel, 100);
  }
}
</script>

<style lang="stylus" scoped>
visible = 3

#partners
  display flex
  flex-direction column
  align-items center
  background #f5f5f5

#partners-slider-wrapper
  margin 30px 0 74px
  display flex
  align-items center
  max-width 900px
  width 100%

.arrow
  width 40px
  height 40px
  border solid #1a1a1a
  border-width 2px 2px 0 0
  cursor pointer
  transition border-color 0.2s

.arrow:hover {
  border-color #c0c0c0
}

#arrow-left
  transform rotate(-135deg)

#arrow-right
  transform rotate(45deg)

#partners-slider
  position relative
  width 100%
  overflow hidden

#partners-slider-content
  position absolute
  display flex
  left 0
  transition-property left

.block
  text-align center

p
  margin-top 20px
  font 18px / 35px PT Serif, serif
</style>
