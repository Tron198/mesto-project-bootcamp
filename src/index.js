
import './pages/index.css';

import { mestoSelectors, initialCards } from './components/data';
import {revalidationForm,enableValidation } from './components/validate';
import {createCard } from './components/card';
import { popupImg, popupAbout, popupAdd } from './components/constans';
import { submitFormProfile, submitFormPlace, initPopup } from './components/modal';

import { openPopup } from './components/utils';

export const container = document.querySelector('.cards');
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__occupation');

       const openEditButton = document.querySelector('.profile__edit-button');
       const buttonAdd = document.querySelector('.profile__add-button');
       const formEdit = document.querySelector('#profile-edit');
       const formAdd = document.querySelector('#profile-add');
       const nameInput = popupAbout.querySelector(".popup__input-name");
       const professionInput = popupAbout.querySelector(".popup__input-profession");
       const titleInput = document.querySelector('#title');
       const pictureInput = document.querySelector('#picture');

initPopup(popupAbout)
initPopup(popupAdd)
initPopup(popupImg)


openEditButton.addEventListener("click", function () {  
    nameInput.value = profileName.textContent;
    professionInput.value = profileJob.textContent;
    revalidationForm(formEdit, mestoSelectors);
    openPopup(popupAbout);
});

buttonAdd.addEventListener('click', function () {
    titleInput.value = '';
    pictureInput.value = '';
    revalidationForm(formAdd, mestoSelectors);
    openPopup(popupAdd);
});

formEdit.addEventListener('submit', submitFormProfile);
formAdd.addEventListener('submit', submitFormPlace);


container.addEventListener('click', function (e) {
    if (e.target.className === 'cards__delete-button') {
        const listItem = e.target.closest('.cards__element')
        listItem.remove()
    }

    if (e.target.classList.contains('cards__like-button')) {
        e.target.classList.toggle('cards__like-button_active')
    }
})


initialCards.forEach((card) => {
    const tape = createCard(card.name, card.link)
    container.insertAdjacentElement('beforeend', tape)
})


enableValidation(mestoSelectors);