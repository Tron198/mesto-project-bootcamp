//функции для работы с карточками проекта Mesto
import { openPopup } from './utils';

export const popupImg = document.querySelector('#popup-image');
export const tapeTemplate = document.querySelector('#cards').content;

export function createTape(name, src) {

    const tapeElement = tapeTemplate.querySelector('.cards__element')
    const element = tapeElement.cloneNode(true)
    const tapeImg = element.querySelector('.cards__image');
    const tapeTitle = element.querySelector('.cards__pic-name'); 

    tapeImg.src = src;
    tapeImg.alt = name;
    tapeTitle.textContent = name;

    tapeImg.addEventListener('click', function(evt) {
        popupImg.querySelector('.popup__image').src = evt.target.src;
        popupImg.querySelector('.popup__image-name').textContent = evt.target.alt;
        openPopup(popupImg)
    });

    return element;
};