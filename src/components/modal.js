//работa модальных окон
import {closePopup, closePopupOverlay} from './utils';
import { createCard } from './card';
import { container, profileName, profileJob } from '../index';

export const popupAbout = document.querySelector('#popup-edit');
export const popupAdd = document.querySelector('#popup-add');
       const nameInput = popupAbout.querySelector('#name').value;
       const professionInput = popupAbout.querySelector('#profession').value;
       const name = popupAdd.querySelector('#title').value;
       const src = popupAdd.querySelector('#picture').value;
       const newCard = createCard(name, src)
       



export function submitFormProfile(e) {
    e.preventDefault();
    profileName.innerHTML = nameInput;
    profileJob.innerHTML = professionInput;
    closePopup(popupAbout);
};

export function submitFormPlace(e) {
    e.preventDefault()
    container.insertAdjacentElement('afterbegin', newCard)
    closePopup(popupAdd)
};

export function initPopup(element) {
    const closeBtn = element.querySelector('.popup__close')
    element.addEventListener('click', closePopupOverlay);
    closeBtn.addEventListener('click', () => {
    closePopup(element)
    })
}