import { openPopup } from './utils';
import { popupImg, tapeTemplate, popupImage, popupImageName} from './constans';

export function createCard(name, src) {
    const tapeElement = tapeTemplate.querySelector('.cards__element')
    const element = tapeElement.cloneNode(true)
    const tapeImg = element.querySelector('.cards__image');
    const tapeTitle = element.querySelector('.cards__pic-name');
    tapeImg.src = src;
    tapeImg.alt = name;
    tapeTitle.textContent = name;
    tapeImg.addEventListener('click', function(evt) {
        popupImage.alt = evt.target.alt;
        popupImage.src = evt.target.src;
        popupImageName.textContent = evt.target.alt;
        openPopup(popupImg)
    });
    return element;
};