//работa модальных окон
import {closePopup, closePopupOverlay} from './utils';
import { createCard } from './card';
import { container, profileName, profileJob } from '../index';
import { popupAbout, popupAdd, nameInput, professionInput, name, src } from './constans';

export const newCard = createCard(name, src)

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