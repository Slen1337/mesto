import { validationProps } from "../pages/index.js";

const popupAbout = document.querySelector(".popup_about");
const popupImage = document.querySelector(".popup_image");

const nameInput = document.querySelector(".popup__input_name");
const nameProfile = document.querySelector(".profile__name");

const descriptionInput = document.querySelector(".popup__input_description");
const descriptionProfile = document.querySelector(".profile__description");

const imageInPopup = document.querySelector(".popup__image");
const nameImageInPopup = document.querySelector(".popup__image-name");

const inputSelectorError = ".popup__input-error";
const buttonTypeAboutClass = ".popup__button_type_about";
const buttonTypeAboutPlace = ".popup__button_type_place";

// Открыть и закрыть попапы
const togglePopup = function (popup) {
  if (popup.classList.contains("popup_opened") === false) {
    nameInput.value = nameProfile.textContent;
    descriptionInput.value = descriptionProfile.textContent;
  }
  popup.classList.toggle("popup_opened");

  if (popup.classList.contains("popup_opened")) {
    document.addEventListener("keyup", closePopupEsc);
    popup.addEventListener("click", closePopupBackground);
  } else {
    document.removeEventListener("keyup", closePopupEsc);
    popup.removeEventListener("click", closePopupBackground);
  }
};

// очистка формы

const resetForm = function (form) {
  form.reset();
};

// добавляю в popup image

const addPopupImage = function (e) {
  imageInPopup.src = "";
  imageInPopup.alt = "";
  nameImageInPopup.textContent = "";

  imageInPopup.src = e.target.src;
  imageInPopup.alt = e.target.alt;
  nameImageInPopup.textContent = e.target.alt;
};

// меняются данные профиля через popup about
const formSubmitHandler = function (e) {
  e.preventDefault();

  nameProfile.textContent = nameInput.value;
  descriptionProfile.textContent = descriptionInput.value;

  togglePopup(popupAbout);
};

const closePopupBackground = function (e) {
  if (e.target !== e.currentTarget) {
    return;
  }
  togglePopup(e.target);
};

const closePopupEsc = function (e) {
  if (e.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    togglePopup(openedPopup);
  }
};

const hideError = (form) => {
  const inputList = Array.from(
    form.querySelectorAll(validationProps.inputSelector)
  );
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

export {
  popupAbout,
  popupImage,
  togglePopup,
  addPopupImage,
  nameProfile,
  descriptionProfile,
  nameInput,
  descriptionInput,
  resetForm,
  formSubmitHandler,
  hideError,
  resetButton,
};
