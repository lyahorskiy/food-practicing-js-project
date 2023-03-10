

import { closeModal, openModal } from "./modal";
import { postData } from "../services/services";



function form(formSelector, modalTimerId) {


const forms = document.querySelectorAll(formSelector);

const message = {
    loading: 'img/form/spinner.svg', //12 добовляю картинку
    success: 'Thanks! We will conecting tou :)',
    failur: 'Error...'
};

forms.forEach(item =>{
    bindpostData(item);
});



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
                
              
                    postData('http://localhost:3001/requests', json)
                    
                   
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
                        openModal('.modal', modalTimerId); //2 Открыл модалку

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
        closeModal('.modal');//10 закрыл модальное окно
    }, 4000);
}
}

export default form;