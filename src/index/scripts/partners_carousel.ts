import arrayOverAt from './at';

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
            if (direction === Direction.backward)
                content.removeChild(firstBlock);
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
    arrowLeft.addEventListener('click', (): void => slide(Direction.backward));
    const arrowRight = document.querySelector('#arrow-right') as HTMLElement;
    arrowRight.addEventListener('click', (): void => slide(Direction.forward));
}

export default setupCarousel;
