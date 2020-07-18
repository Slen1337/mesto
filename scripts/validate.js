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

const setEventListeners = (formElement, validationProps) => {
  const inputList = Array.from(formElement.querySelectorAll(validationProps.inputSelector));
   const buttonElement = formElement.querySelector(validationProps.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, validationProps.inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, validationProps.inputErrorClass, validationProps.errorClass);

      toggleButtonState(inputList, buttonElement, validationProps.inactiveButtonClass);
    });
  });
};

const enableValidation = validationProps => {
   const formList = Array.from(document.querySelectorAll(validationProps.formSelector));
   formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationProps);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement ) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationProps.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(validationProps.inactiveButtonClass);
  }
};

const hideError = (form) => {
  const inputList = Array.from(form.querySelectorAll(validationProps.inputSelector));
   const errorElement = Array.from(form.querySelectorAll(inputSelectorError));

  inputList.forEach((input) => {
    input.classList.remove(validationProps.inputErrorClass);
  });

  errorElement.forEach((error) => {
    error.classList.remove(validationProps.errorClass);
    error.textContent = "";
  });
};

const resetButton = (popup) => {
  if (popup === popupAbout) {
    const submitButton = document.querySelector(buttonTypeAboutClass);
    submitButton.classList.remove(validationProps.inactiveButtonClass);
  } else {
    const submitButton = document.querySelector(buttonTypeAboutPlace);
    submitButton.classList.add(validationProps.inactiveButtonClass);
  }
};
