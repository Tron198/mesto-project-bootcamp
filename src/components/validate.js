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
  errorElement.textContent = "";
};



export const checkInputValidity = (inputElement, selectors) => {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, inputElement.validationMessage, selectors);
  } else {
    hideInputError(inputElement, selectors);
  }
};


export function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
  });
}

export function revalidationForm(formElement, selectors) {
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
  const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
  inputList.forEach((inputElement) => {
    hideInputError(inputElement, selectors);
  });
  disableSubmitButtot(buttonElement, selectors);
}


export function disableSubmitButtot(buttonElement, { inactiveButtonClass }) {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.disabled = true;
}
export function enableSubmitButton(buttonElement, { inactiveButtonClass }) {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.disabled = false;
}



export function toggleButtonState(inputList, buttonElement, selectors) {
  if (hasInvalidInput(inputList)) {
    disableSubmitButtot(buttonElement, selectors);
  } else {
    enableSubmitButton(buttonElement, selectors);
  }
}

export const setEventListeners = (formElement, selectors) => {
  const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
  toggleButtonState(inputList, buttonElement, selectors);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
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
