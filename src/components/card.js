import { openPopup, closePopup, checkIfLiked } from './utils';
import { popupImg } from './constans';

import { popupCardDelete } from "./modal";
import { deleteCardOnServer, switchLike } from "./api";



export const popupImage =  popupImg.querySelector('.popup__image');
export const popupImageName = popupImg.querySelector('.popup__image-name')
export let currentDeleteCard = null;


export function createCard(card, userId) {

    const tapeTemplate = document.querySelector('#cards').content;

    const tapeElement = tapeTemplate.querySelector('.cards__element')
    const element = tapeElement.cloneNode(true)
    const tapeImg = element.querySelector('.cards__image');
    const tapeTitle = element.querySelector('.cards__pic-name');


    const likeButton = element.querySelector('.cards__like-button');
    const likeCounter = element.querySelector('.tapes__like-count');
    const deleteCard = element.querySelector('.cards__delete-button');



    tapeImg.src = card.link;
    tapeImg.alt = card.name;
    tapeTitle.textContent = card.name;
    element.id = card._id;
    likeCounter.textContent = card.likes.length;

    if (card.owner._id !== userId) {
        deleteCard.remove()
    } else {
        deleteCard.addEventListener('click', function (evt) {
            currentDeleteCard = element;
            openPopup(popupCardDelete);
        });
    }

    if (checkIfLiked(card.likes, userId)) {
        likeButton.classList.add('cards__like-button_active');
    } else {
        likeButton.classList.remove('cards__like-button_active');
    };

    const handleImageClick = (evt) => {

        popupPicture.src = evt.target.src;
        popupPicture.alt = evt.target.alt;
        popupPictureName.textContent = evt.target.alt;

        openPopup(popupImg)
    }

    tapeImg.addEventListener('click', handleImageClick);

    const handleLikeOnClick = (evt) => {
        handleToggleLike(card._id, userId, likeButton, likeCounter);
    }

    likeButton.addEventListener('click', handleLikeOnClick);

    return element;
};

export function handleToggleLike(id, userId, likeButton, likeCounter) {
    console.log(userId)
    // узнаём лайкнута ли карточка изначально
    const isLiked = likeButton.classList.contains('cards__like-button_active');

    switchLike(id, isLiked)
        .then(({ likes }) => {
            likeCounter.textContent = likes.length;
            console.log(`Liked? ${checkIfLiked(likes, userId)}!`);

            if (checkIfLiked(likes, userId)) {
                likeButton.classList.add('cards__like-button_active');
            } else {
                likeButton.classList.remove('cards__like-button_active');
            };
        })
        .catch(console.dir); // Выведем ошибку
};

export function handleDeleteCard(evt) {
    evt.preventDefault();
    return deleteCardOnServer(currentDeleteCard.id)
        .then(() => {
            currentDeleteCard.remove();
            closePopup(popupCardDelete);
            currentDeleteCard = null;
        })
        .catch(console.log);
}


