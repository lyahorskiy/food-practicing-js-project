

import { getResourse } from "../services/services";





function cards() {

   

    // getResourse('http://localhost:3000/menu')
    // .then(data =>{
    //     data.forEach(({img, altamg, title, descr, price}) =>{
    //         new MenuCard(img, altamg, title, descr, price, '.menu.container').render();
    //     });
    // });


     getResourse('http://localhost:3001/menu')
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

export default cards;