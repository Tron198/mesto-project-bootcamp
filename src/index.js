import "./pages/index.css";

import { mestoSelectors } from "./components/data";
import { revalidationForm, enableValidation } from "./components/validate";
import { createCard, handleDeleteCard } from "./components/card";
import {
  popupImg,
  popupAbout,
  popupAdd,
  popupAvatar,
  profileAvatar,
  openEditButton,
  buttonAdd,
  avatarInput,
  avatarEditButton,
  formEdit,
  formAdd,
  formAvatar,
  formDelete,
  container,
  profileName,
  profileJob,
} from "./components/constans";
import {
  submitFormProfile,
  submitFormPlace,
  submitFormAvatar,
  initPopup,
  popupCardDelete,
} from "./components/modal";
import { openPopup } from "./components/utils";
import { getBasicData, getInitialCards } from "./components/api";

export const nameInput = popupAbout.querySelector(".popup__input-name");
export const professionInput = popupAbout.querySelector(".popup__input-profession");
export const titleInput = document.querySelector("#title");
export const pictureInput = document.querySelector("#picture");

export let currentUserId = "";

initPopup(popupAbout);
initPopup(popupAdd);
initPopup(popupImg);
initPopup(popupAvatar);
initPopup(popupCardDelete);

Promise.all([getBasicData(), getInitialCards()])
  .then(([data, cards]) => {
    profileName.textContent = data.name; 
    profileJob.textContent = data.about;
    profileAvatar.style.backgroundImage = `url(${data.avatar})`;
    currentUserId = data._id;
    cards.reverse().forEach((card) => {
      const tape = createCard(card, currentUserId);
      container.prepend(tape);
    });
  })
  .catch((err) => {
    console.log(err);
  });

openEditButton.addEventListener("click", function () {
  nameInput.value = profileName.textContent;
  professionInput.value = profileJob.textContent;
  revalidationForm(formEdit, mestoSelectors);
  openPopup(popupAbout);
});

buttonAdd.addEventListener("click", function () {
  titleInput.value = "";
  pictureInput.value = "";
  revalidationForm(formAdd, mestoSelectors);
  openPopup(popupAdd);
});

avatarEditButton.addEventListener("click", function () {
  avatarInput.value = "";
  revalidationForm(formAvatar, mestoSelectors);
  openPopup(popupAvatar);
});

formEdit.addEventListener("submit", submitFormProfile);
formAdd.addEventListener("submit", submitFormPlace);
formAvatar.addEventListener("submit", submitFormAvatar);
formDelete.addEventListener("submit", handleDeleteCard);

enableValidation(mestoSelectors);
