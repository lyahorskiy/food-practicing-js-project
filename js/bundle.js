/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
    

       const result = document.querySelector(".calculating__result span");
       let sex, height, weight, age, ratio;
       
       if (localStorage.getItem('sex')){
           sex = localStorage.getItem('sex');
       } else {
           sex = 'female';
           localStorage.setItem('sex', 'female');
       }
   
       if (localStorage.getItem('ratio')){
           ratio = localStorage.getItem('ratio');
       } else {
           ratio = 1.375;
           localStorage.setItem('ratio', 1.375);
       }
   
       function initLocalSetings(selector, activeClass){
           const elements = document.querySelectorAll(selector);
           elements.forEach(elem => {
               elem.classList.remove(activeClass);
               if (elem.getAttribute('id') === localStorage.getItem('sex')){
                   elem.classList.add(activeClass);
               }
               if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')){
                   elem.classList.add(activeClass);
               }
           });
       }
   
       initLocalSetings('#gender div', 'calculating__choose-item_active');
       initLocalSetings('.calculating__choose_big div', 'calculating__choose-item_active');
   
       function calcTotal(){
           if(!sex || !height || !weight || !age || !ratio){
               result.textContent = '_____';
               return;
           }
   
           if(sex === 'female'){
               result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
           } else {
               result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
           }
       }
       calcTotal();
   
       function getStaticInformation(selector, activeClass) {
            const elements = document.querySelectorAll(selector);
                  elements.forEach(elem =>{
                   elem.addEventListener('click', (e) =>{
                       if(e.target.getAttribute('data-ratio')){
                           ratio = +e.target.getAttribute('data-ratio');
                           localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                       } else {
                           sex = e.target.getAttribute('id');
                           localStorage.setItem('sex', e.target.getAttribute('id'));
                       }
                       
           
                       elements.forEach(elem =>{
                           elem.classList.remove(activeClass);
                       });
                           e.target.classList.add(activeClass);
           
        calcTotal();
           
                });
   
           });
       }
               getStaticInformation('#gender div', 'calculating__choose-item_active');
               getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
   
       function getDinamicInformation(selector){
           const input = document.querySelector(selector);
   
           input.addEventListener('input', () => {
   
               if(input.value.match(/\D/g)){
                   input.style.border = '1px solid red';
               } else {
                   input.style.border = 'none';
               }
   
               switch(input.getAttribute('id')){
                   case 'height':
                       height = +input.value;
                       break;
                   case 'weight':
                       weight = +input.value;
                       break;
                   case 'age':
                       age = +input.value;
                       break;
               }
               
                calcTotal();
           });
   
   
       }
       getDinamicInformation('#height');
       getDinamicInformation('#weight');
       getDinamicInformation('#age');
   
   
   
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function cards() {

    const getResourse = async (url) =>{
        const res =  await fetch(url);
        if(!res.ok){
            throw new Error(`not fetch ${url}, status:${res.status}`);
        }
        return await res.json();
        
    };

    // getResourse('http://localhost:3000/menu')
    // .then(data =>{
    //     data.forEach(({img, altamg, title, descr, price}) =>{
    //         new MenuCard(img, altamg, title, descr, price, '.menu.container').render();
    //     });
    // });


     getResourse('http://localhost:3000/menu')
     .then(data => createCard(data));
    function createCard(data){
        data.forEach(({img, altimg, title, descr, price}) =>{
            const element = document.createElement('div');
            element.classList.add('menu__item');
            element.innerHTML =`
                <img src=${img} alt=${altimg}>
                <h3 class="menu__item-subtitle">${title}</h3>
                <div class="menu__item-descr">${descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${price}</span> грн/день</div>
            `;
            document.querySelector('.menu .container').append(element);
        });
    }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modal__WEBPACK_IMPORTED_MODULE_0__);






function form() {


const forms = document.querySelectorAll('form');

const message = {
    loading: 'img/form/spinner.svg', //12 добовляю картинку
    success: 'Thanks! We will conecting tou :)',
    failur: 'Error...'
};

forms.forEach(item =>{
    bindpostData(item);
});

const postData = async (url, data) =>{
const res =  await fetch(url,{
method: "POST",
headers: {
        'Content-type': 'application/json'
    },
    body: data     
});

return await res.json();

};

function bindpostData(form){
    form.addEventListener('submit', (e)=>{
        e.preventDefault();

        const statusMessage = document.createElement('img'); //13 создаю картинку
        statusMessage.src = message.loading; //14 Подставил картинке src 
        statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            
                `; //15 прописал инлайн стили
            
            form.insertAdjacentElement('afterend', statusMessage);//16 вставляю елемент после формы


            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));
                
              
                    postData('http://localhost:3000/requests', json)
                    
                   
                    .then(data => {
                        console.log(data);
                        showThanksModal(message.success);
                        statusMessage.remove(); 
                    }).catch(() => {
                        showThanksModal(message.failur);
                    }).finally(() =>{
                        form.reset();
                        
                    });
                    
                });
            }
                    
                    function showThanksModal(message){  //(messege)сообщение о статусе отправки
                        const prevModalDialog = document.querySelector('.modal__dialog');
                        
                        prevModalDialog.classList.add('hide'); //1скрыли
                        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)(); //2 Открыл модалку

    const thanksModal = document.createElement('div');//3 Создал контент
    thanksModal.classList.add('modal__dialog'); //4 Параметры модалки
    thanksModal.innerHTML = ` 
    <div class = 'modal__content'>
        <div class = 'modal__close' data-close >&times;</div>
        <div class = 'modal__title'>${message}</div> 
    </div>
    `; 

    document.querySelector('.modal').append(thanksModal);//6 получил модальное окно и заапендил блок 
    setTimeout(()=>{
        thanksModal.remove();//7 удаляю модалку через 4сек
        prevModalDialog.classList.add('show'); //8 показываю пред идущий контент
        prevModalDialog.classList.remove('hide'); //9 удаляю класс скрытия
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)();//10 закрыл модальное окно
    }, 4000);
}
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ (() => {

throw new Error("Module parse failed: Export 'closeModal' is not defined (80:9)\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\n| \n| export default modal;\n> export { closeModal };\n| export { openModal };");

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider() {
        
    fetch('http://localhost:3001/menu')
        .then(data => data.json())
        .then(res => console.log(res));
    


// const slides = document.querySelectorAll('.offer__slide'),
//       prev = document.querySelector('.offer__slider-prev'),
//       next = document.querySelector('.offer__slider-next'),
//       total = document.querySelector('#total'),
//       current = document.querySelector('#current');
// let slideIndex = 1;

// showSlides(slideIndex);

// if(slides.length < 10){
//     total.textContent = `0${slides.length}`;
// } else {
//     total.textContent = slides.length;
// }

// function showSlides(n){
//     if(n > slides.length){
//         slideIndex = 1;
//     }
//     if(n < 1){
//         slideIndex = slides.length;
//     }
    
//     slides.forEach(item => item.style.display = 'none');
//     slides[slideIndex -1].style.display = 'block';

//     if(slides.length < 10){
//         current.textContent = `0${slideIndex}`;
//     } else {
//         current.textContent = slideIndex;
//     }
// }

// function plusSlides(n){  
//     showSlides(slideIndex += n);
// }
//         prev.addEventListener('click', () => {
//             plusSlides(-1);
//         });    


//         next.addEventListener('click', () => {
//             plusSlides(1);
//         });



// Slider dificult

const slides = document.querySelectorAll('.offer__slide'),
      slider = document.querySelector('.offer__slider'),
      prev = document.querySelector('.offer__slider-prev'),
      next = document.querySelector('.offer__slider-next'),
      total = document.querySelector('#total'),
      current = document.querySelector('#current'),
      slidesWrapper = document.querySelector('.offer__slider-wrapper');
      slidesField = document.querySelector('.offer__slider-inner'),
      width = window.getComputedStyle(slidesWrapper).width;

let slideIndex = 1;
let offset = 0;

if(slides.length < 10){
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }



slidesField.style.width = 100 * slides.length + '%';
slidesField.style.display = 'flex';
slidesField.style.transition = '0.5s all';

slidesWrapper.style.overflow = 'hidden';

// slidesWrapper.style.width = 100 + '%';
slides.forEach(slide =>{
    slide.style.width = width;
});


slider.style.position ='relative';


const indicators = document.createElement('ol'),
      dots = [];

      indicators.classList.add('carousel-indicators');
      indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
      `;
slider.append(indicators);

for(let i = 0; i < slides.length; i++){
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.style.cssText = `
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;
    `;
    if(i == 0){
        dot.style.opacity = 1;
    }

    indicators.append(dot);    
    dots.push(dot);
}

function deleteNotDigits(string){
    return +string.replace(/\D/g, '');
}


next.addEventListener('click', () =>{
    if(offset == deleteNotDigits(width) * (slides.length -1)){
       offset = 0;
    } else {
        offset += deleteNotDigits(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if(slideIndex == slides.length){
        slideIndex = 1;
        
    } else {
        slideIndex ++;
    }
    
    if(slides.length < 10){
        current.textContent = `0${slideIndex}`;
    } else {
        current.textContent = slideIndex;
    }
    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex -1].style.opacity = 1;
});

prev.addEventListener('click', () =>{
    if(offset == 0){
    offset = deleteNotDigits(width) * (slides.length -1);

    } else {
        offset -= deleteNotDigits(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    
    if(slideIndex == 1){
        slideIndex = slides.length;
        
    } else {
        slideIndex --;
    }
    
    if(slides.length < 10){
        current.textContent = `0${slideIndex}`;
    } else {
        current.textContent = slideIndex;
    }
    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex -1].style.opacity = 1;
});
    dots.forEach(dot => {
        dot.addEventListener('click', (e) =>{
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = offset = deleteNotDigits(width) * (slideTo -1);
            
            slidesField.style.transform = `translateX(-${offset}px)`;
            
            
            if(slides.length < 10){
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }
            
            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex - 1].style.opacity = 1;

            
        });
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs() {

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector(".tabheader__items");

    function hideTabContent(){
        tabsContent.forEach(item =>{
            item.style.display = "none";
        });
        
            tabs.forEach(tab =>{
                tab.classList.remove("tabheader__item_active");
            });
    }

    function showTabContent(i){
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    }

hideTabContent();
showTabContent(0);
    tabsParent.addEventListener('click', (event)=>{
        const target = event.target;
            if(target && target.classList.contains('tabheader__item'))
                tabs.forEach((item, i)=>{
                    if(target==item){
                        hideTabContent();
                        showTabContent(i);
                    }
                });
            
    });

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer() {
    

const deadline = '2023-01-30';

function getTimeRemaining(endtime){
    let days, hours, minutes, seconds;
    const t = Date.parse (endtime) - Date.parse (new Date());

    if (t<=0){
        days = 0; 
        hours = 0;
        minutes = 0;
        seconds = 0;
    } else {

            days = Math.floor(t/(1000*60*60*24)),
            hours = Math.floor((t/(1000*60*60)%24)),
            minutes = Math.floor((t/1000/60)%60),
            seconds = Math.floor((t/1000)%60);

            return {
                'total': t,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };
    }


    
}

function getZero(num){
    if (num >= 0 && num < 10){
     return `0${num}`;
    } else {
    return num;
  }  
}


function setClock(selector,endtime){
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds');   

timeInterval = setInterval(updateClock, 1000);

function updateClock(){
    const t = getTimeRemaining(endtime);
    days.innerHTML = getZero(t.days);
    hours.innerHTML = getZero(t.hours);
    minutes.innerHTML = getZero(t.minutes);
    seconds.innerHTML = getZero(t.seconds);
    
    if (t.total <= 0){
        clearInterval(timeInterval);
     }
    }
  }

    setClock('.timer',deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_modules_modal__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");


        
        
        
        
        
        
        


document.addEventListener('DOMContentLoaded', () => {
   
      (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])();
      _modules_modal__WEBPACK_IMPORTED_MODULE_1___default()();
      (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])();
      (0,_modules_slider__WEBPACK_IMPORTED_MODULE_3__["default"])();
      (0,_modules_form__WEBPACK_IMPORTED_MODULE_4__["default"])();
      (0,_modules_cards__WEBPACK_IMPORTED_MODULE_5__["default"])();
      (0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__["default"])();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map