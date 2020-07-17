const isValid = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      inputErrorClass,
      errorClass
    );
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  inputErrorClass,
  errorClass
) => {
   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
     inputElement.classList.add(inputErrorClass);
     errorElement.textContent = errorMessage;
     errorElement.classList.add(errorClass);
};

const hideInputError = (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) => {
   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
     inputElement.classList.remove(inputErrorClass);
     errorElement.classList.remove(errorClass);
     errorElement.textContent = "";
};

const setEventListeners = (
  formElement,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
   const buttonElement = formElement.querySelector(submitButtonSelector);

  toggleButtonState(inputList, buttonElement, inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, inputErrorClass, errorClass);

      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

const enableValidation = ({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) => {
   const formList = Array.from(document.querySelectorAll(formSelector));

   formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(
      formElement,
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass
    );
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

const hideError = (form) => {
  const inputList = Array.from(form.querySelectorAll(".popup__input"));
   const errorElement = Array.from(form.querySelectorAll(".popup__input-error"));

  inputList.forEach((input) => {
    input.classList.remove("popup__input_type_error");
  });

  errorElement.forEach((error) => {
    error.classList.remove("popup__input-error_active");
    error.textContent = "";
  });
};

const resetButton = (popup) => {
  if (popup === popupAbout) {
    const submitButton = document.querySelector(".popup__button_type_about");
    submitButton.classList.remove("popup__button_inactive");
  } else {
    const submitButton = document.querySelector(".popup__button_type_place");
    submitButton.classList.add("popup__button_inactive");
  }
};

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
});
