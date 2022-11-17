//работa модальных окон
import {closePopup, closePopupOverlay, loadigSaveText} from './utils';
import { createCard } from './card';
import { container, profileName, profileJob,nameInput, professionInput,} from '../index';
//import { nameInput, professionInput, } from './constans';
import { changeProfileData, changeProfileAvatar, createCardTape } from './api';

export const popupAbout = document.querySelector('#popup-edit');
export const popupAdd = document.querySelector('#popup-add');
export const popupAvatar = document.querySelector('#popup-avatar');
export const popupCardDelete = document.querySelector('#popup-delete-card')

const nameInputImg = popupAdd.querySelector('#title');
const linkInputImg = popupAdd.querySelector('#picture');

export const profileAvatar = document.querySelector('#profile-avatar');
const avatarInput = popupAvatar.querySelector('#avatar');


export function submitFormAvatar(e) {
    e.preventDefault();
    loadigSaveText(true, popupAvatar);
    changeProfileAvatar(avatarInput.value)
        .then((data) => {
            profileAvatar.style.backgroundImage = `url(${avatarInput.value})`;
            closePopup(popupAvatar)
        })
        .catch(console.log)
        .finally(() => {
            console.log('Аватар загрузился');
            loadigSaveText(false, popupAvatar)
        });
}

export function submitFormProfile(e) {
    e.preventDefault();
    loadigSaveText(true, popupAbout);

    changeProfileData(nameInput.value, professionInput.value)
        .then((data) => {
            profileName.textContent = data.name;
            profileJob.textContent = data.about;
            closePopup(popupAbout)
        })
        .catch(console.log)
        .finally(() => {
            console.log('Вызов состоялся.');
            loadigSaveText(false, popupAbout);
        });
};


export function submitFormPlace(e) {
    e.preventDefault()
    loadigSaveText(true, popupAdd);

    const  name = nameInputImg.value
    const link = linkInputImg.value

    createCardTape({ link, name })
        .then((data) => {
            container.prepend(createCard(data, currentUserId));
            closePopup(popupAdd)
        })
        .catch(console.log)
        .finally(() => {
            console.log('Карточки отправлены');
            loadigSaveText(false, popupAdd);
        });
};


export function initPopup(element) {
    const closeBtn = element.querySelector('.popup__close')
    element.addEventListener('click', closePopupOverlay);
    closeBtn.addEventListener('click', () => {
    closePopup(element)
    })
}