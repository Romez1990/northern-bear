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

export default setupSlider;
