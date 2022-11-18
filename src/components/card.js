import { openPopup, closePopup, checkIfLiked } from "./utils";
import { popupCardDelete } from "./modal";
import { popupImg, cardTemplate } from "./constans";
import { deleteCardOnServer, switchLike } from "./api";

export const popupImage = popupImg.querySelector(".popup__image");
export const popupImageName = popupImg.querySelector(".popup__image-name");
export let currentDeleteCard = null;

export function createCard(card, userId) {
  const cardElement = cardTemplate.querySelector(".cards__element");
  const element = cardElement.cloneNode(true);
  const cardImage = element.querySelector(".cards__image");
  const cardName = element.querySelector(".cards__pic-name");
  const likeButton = element.querySelector(".cards__like-button");
  const likeCounter = element.querySelector(".cards__like-count");
  const deleteCard = element.querySelector(".cards__delete-button");

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardName.textContent = card.name;
  element.id = card._id;
  likeCounter.textContent = card.likes.length;

  if (card.owner._id !== userId) {
    deleteCard.remove();
  } else {
    deleteCard.addEventListener("click", function (evt) {
      currentDeleteCard = element;
      openPopup(popupCardDelete);
    });
  }
  if (checkIfLiked(card.likes, userId)) {
    likeButton.classList.add("cards__like-button_active");
  } else {
    likeButton.classList.remove("cards__like-button_active");
  }

  const handleImageClick = (evt) => {
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupImageName.textContent = evt.target.alt;
    openPopup(popupImg);
  };
  cardImage.addEventListener("click", handleImageClick);

  const handleLikeOnClick = (evt) => {
    handleToggleLike(card._id, userId, likeButton, likeCounter);
  };
  likeButton.addEventListener("click", handleLikeOnClick);
  return element;
}

export function handleToggleLike(id, userId, likeButton, likeCounter) {
  console.log(userId);
  const isLiked = likeButton.classList.contains("cards__like-button_active");
  switchLike(id, isLiked)
    .then(({ likes }) => {
      likeCounter.textContent = likes.length;
      console.log(`Liked? ${checkIfLiked(likes, userId)}!`);
      if (checkIfLiked(likes, userId)) {
        likeButton.classList.add("cards__like-button_active");
      } else {
        likeButton.classList.remove("cards__like-button_active");
      }
    })
    .catch(console.dir);
}

export async function handleDeleteCard(evt) {
  evt.preventDefault();
  try {
    await deleteCardOnServer(currentDeleteCard.id);
    currentDeleteCard.remove();
    closePopup(popupCardDelete);
    currentDeleteCard = null;
  } catch (message) {
    return console.log(message);
  }
}
