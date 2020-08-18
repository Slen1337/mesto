import '../pages/index.css';
import { initialCards } from "../scripts/initial-cards.js";
import { Card } from "../scripts/Card.js";
import { FormValidator } from "../scripts/FormValidator.js";
import {
  popupAbout,
  popupImage,
  nameProfile,
  descriptionProfile,
  nameInput,
  descriptionInput,
  togglePopup,
  resetForm,
  formSubmitHandler,
  hideError,
  resetButton,
} from "../scripts/tools.js";

const popupPlace = document.querySelector(".popup_place");

const formAbout = document.querySelector(".popup__form_about");
const formPlace = document.querySelector(".popup__form_place");

const addButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button");
const closeButtonAbout = document.querySelector(".popup__close_about");
const closeButtonPlace = document.querySelector(".popup__close_place");
const closeButtonImage = document.querySelector(".popup__close_image");

const newPlaceNameInput = document.querySelector(".popup__input_place-name");
const newPlaceLinkInput = document.querySelector(".popup__input_link");

const placeTemplate = document.querySelector(".place-template").content;
const placeCatalogue = document.querySelector(".places__catalogue");

export const validationProps = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

// слушатели
formAbout.addEventListener("submit", (e) => {
  const submitButton = formAbout.querySelector(".popup__button");
  if (submitButton.classList.contains("popup__button_inactive")) {
    return;
  } else {
    formSubmitHandler(e);
  }
});

formPlace.addEventListener("submit", (e) => {
  const submitButton = formPlace.querySelector(".popup__button");
  if (submitButton.classList.contains("popup__button_inactive"))
    return;
    placeSubmitHandler(e);
});

editButton.addEventListener("click", () => {
  nameInput.value = nameProfile.textContent;
  descriptionInput.value = descriptionProfile.textContent;
  togglePopup(popupAbout);
  hideError(formAbout);
  resetButton(popupAbout);
});

addButton.addEventListener("click", () => {
  togglePopup(popupPlace);
  resetForm(formPlace);
  hideError(formPlace);
  resetButton(popupPlace);
});
closeButtonAbout.addEventListener("click", () => {
  togglePopup(popupAbout);
});
closeButtonPlace.addEventListener("click", () => {
  togglePopup(popupPlace);
});
closeButtonImage.addEventListener("click", () => {
  togglePopup(popupImage);
});

function addCard(card) {
  placeCatalogue.append(card);
}

const renderPlace = (place) => {
  const card = new Card(place, placeTemplate);
  const placeElement = card.generateCard();
  placeCatalogue.prepend(placeElement)
};

const placeSubmitHandler = (e) => {
  e.preventDefault();

  const place = {
    name: newPlaceNameInput.value,
    link: newPlaceLinkInput.value,
  };
    renderPlace(place);

  togglePopup(popupPlace);

  resetForm(formPlace);
};

initialCards.forEach(renderPlace);


const placeFormValidator = new FormValidator(validationProps, formPlace);
const aboutFormValidator = new FormValidator(validationProps, formAbout);

placeFormValidator.enableValidation();
aboutFormValidator.enableValidation();
