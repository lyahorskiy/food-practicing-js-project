

        import tabs from './modules/tabs';
        import modal from './modules/modal';
        import timer from './modules/timer';
        import slider from './modules/slider';
        import form from './modules/form';
        import cards from './modules/cards';
        import calc from './modules/calc';
        import { openModal } from './modules/modal';


window.addEventListener('DOMContentLoaded', () => {
      const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 300000);
   
      tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
      modal('[data-modal]', '.modal', modalTimerId);
      timer('.timer', '2023-01-30');
      slider({
            container:'.offer__slider',
            slide:'.offer__slide',
            nextArrow:'.offer__slider-next',
            prevArrow:'.offer__slider-prev',
            totalCounter:'#total',
            currentCounter:'#current',
            wrapper:'.offer__slider-wrapper',
            field:'.offer__slider-inner'
      });
      form('form', modalTimerId);
      cards();
      calc();
});