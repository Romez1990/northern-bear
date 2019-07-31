import './style';
import './scripts/scroll';
import setupSlider from './scripts/tariffs_slider';
import setupCarousel from './scripts/partners_carousel';

setTimeout((): void => {
    setupSlider();
    setupCarousel();
}, 1000);
