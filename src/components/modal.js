//работa модальных окон
import {closedPopup} from './utils';
import { createTape } from './card';
import { container, profileName, profileJob } from '../index';

export const popupAbout = document.querySelector('#popup-edit');
export const popupAdd = document.querySelector('#popup-add');

export function submitFormProfile(e) {
    e.preventDefault();
    const nameInput = popupAbout.querySelector('#name').value;
    const professionInput = popupAbout.querySelector('#profession').value;
    profileName.innerHTML = nameInput;
    profileJob.innerHTML = professionInput;
    closedPopup(popupAbout);
};

export function submitFormPlace(e) {
    e.preventDefault()
    const name = popupAdd.querySelector('#title').value;
    const src = popupAdd.querySelector('#picture').value;
    const newCard = createTape(name, src)
    container.insertAdjacentElement('afterbegin', newCard)
    closedPopup(popupAdd)
};

export const handleEscPressed = (evt) => { 
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_opened');
        closedPopup(popup)
 }
}

export function closePopupOverlay(evt) {
    if (evt.target === evt.currentTarget) {
        const popup = document.querySelector('.popup_opened');
        closedPopup(popup)
    }
}

export function initPopup(element) {
    const closeBtn = element.querySelector('.popup__close')

    element.addEventListener('click', closePopupOverlay);

    closeBtn.addEventListener('click', () => {
        closedPopup(element)
    })
}