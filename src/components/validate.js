


export const showInputError = (inputElement, errorMessage, selectors) => {
   
    const errorElement = document.getElementById(`${inputElement.id}-error`);
    inputElement.classList.add(selectors.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(selectors.errorClass);
};

export const hideInputError = (inputElement, selectors) => {
   
    const errorElement = document.getElementById(`${inputElement.id}-error`);
    inputElement.classList.remove(selectors.inputErrorClass);
    errorElement.classList.remove(selectors.errorClass);
    errorElement.textContent='';
};

export const checkInputValidity = (inputElement, selectors) => {
    if (!inputElement.validity.valid) {
        showInputError(inputElement, inputElement.validationMessage, selectors);
    } else {
        hideInputError(inputElement, selectors);
    }
};

export const hasInvalidInput = (inputList) => inputList.some((inputElement) => !inputElement.validity.valid);

export const revalidationForm = (formElement, selectors) => {
   const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
    const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
  inputList.forEach((inputElement) => {
      hideError(inputElement, selectors);
     });
    disableSubmitButtot(buttonElement, selectors);
    };
  


    export function inactiveSubmitButton(buttonSubmit, { inactiveButtonClass }) {
        buttonSubmit.classList.add(inactiveButtonClass);
        buttonSubmit.disabled = true;
      }
      
      export function activeSubmitButton(buttonSubmit, { inactiveButtonClass }) {
        buttonSubmit.classList.remove(inactiveButtonClass);
        buttonSubmit.disabled = false;
      }


export function toggleButtonState(inputList, buttonElement, selectors) {
   if (hasInvalidInput(inputList)) {
    inactiveSubmitButton(buttonElement, selectors);
     } else {
        activeSubmitButton(buttonElement, selectors);
     }
   };


export const setEventListeners = (formElement, selectors) => {
const buttonElement = formElement.querySelector(selectors.submitButtonSelector)
const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
toggleButtonState(inputList, buttonElement, selectors);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function() {
            checkInputValidity(inputElement, selectors);
            toggleButtonState(inputList, buttonElement, selectors);
        });
    });
};


export const enableValidation = (selectors) => {
    const formList = Array.from(document.querySelectorAll(selectors.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, selectors);
    });
};







