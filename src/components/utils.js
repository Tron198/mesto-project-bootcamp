export function openPopup(popup) {
    document.addEventListener('keydown', handleEscPressed)
    popup.classList.add('popup_opened');
};

export function closePopup(popup) {
    popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', handleEscPressed)
   
}

export const handleEscPressed = (evt) => { 
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_opened');
        closePopup(popup)
 }
}

export function closePopupOverlay(evt) {
    if (evt.target === evt.currentTarget) 
        closePopup(evt.target)
    
}
