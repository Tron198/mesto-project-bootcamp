//работa модальных окон
import {closePopup, closePopupOverlay} from './utils';
import { createCard } from './card';
import { container, profileName, profileJob } from '../index';
import { popupAbout, popupAdd, nameInput, professionInput, } from './constans';


export function submitFormProfile(e) {
    e.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = professionInput.value;
    closePopup(popupAbout);
};

export function submitFormPlace(e) {
    e.preventDefault()
    const src = popupAdd.querySelector('#picture').value;
    const name = popupAdd.querySelector('#title').value;
    const newCard = createCard(name, src)
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