//утилитарные функции, которые используются в работе сразу нескольких других функций
import { handleEscPressed } from "./modal";

export function openPopup(popup) {
    document.addEventListener('keydown', handleEscPressed)
    popup.classList.add('popup_opened');
};

export function closedPopup(popup) {
    popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', handleEscPressed)
};
