const popupAbout = document.querySelector(".popup_about");
const popupImage = document.querySelector(".popup_image");

const nameInput = document.querySelector(".popup__input_name");
const nameProfile = document.querySelector(".profile__name");

const descriptionInput = document.querySelector(".popup__input_description");
const descriptionProfile = document.querySelector(".profile__description");

const imageInPopup = document.querySelector(".popup__image");
const nameImageInPopup = document.querySelector(".popup__image-name");

const popupPlace = document.querySelector(".popup_place");

const formAbout = document.querySelector(".popup__form_about");
const formPlace = document.querySelector(".popup__form_place");

const addButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button");

const placeTemplate = document.querySelector(".place-template").content;
const placeCatalogue = document.querySelector(".places__catalogue");

const validationProps = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
  errorSelector: ".popup__input-error",
};

export {
popupAbout,
popupImage,
formAbout,
formPlace,
imageInPopup,
nameImageInPopup,
nameProfile,
nameInput,
descriptionProfile,
descriptionInput,
addButton,
editButton,
popupPlace,
placeTemplate,
placeCatalogue,
validationProps
}
