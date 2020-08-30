const profileAbout = (".profile__about");
const imageInPopup = (".popup__image");
const deleteCard = (".popup_delete-card");

const popupAvatar = (".popup__avatar");
const profileAvatar = (".profile__image");
const formAvatar = document.querySelector(".popup__input_container-avatar");
const editAvatarButton = document.querySelector(".profile__button-avatar");

const nameInput = document.querySelector(".popup__item_input-name");
const nameProfile = (".profile__name");

const descriptionInput = document.querySelector(".popup__item_input-about");

const addButton = document.querySelector(".profile__button-add");
const editButton = document.querySelector(".profile__button-edit");

const addPopup = (".popup__add");
const editPopup = (".popup__edit");

const formPlace = document.querySelector(".popup__input_container-add");
const formAbout = document.querySelector(".popup__input_container-edit");

const placeTemplate = (".place-template");
const placeCatalogue = (".places__catalogue");

const submitButtonPlace = document.querySelector(".popup__button_type_place");
const submitButtonAbout = document.querySelector(".popup__button-submit-edit");
const submitButtonAvatar = document.querySelector(".popup__button-submit-avatar");

const validationProps = {
  formSelector: ".popup__form",
  inputSelector: ".popup__item",
  submitButtonSelector: ".popup__button-submit",
  inactiveButtonClass: "popup__button-submit_disabled",
  inputErrorClass: "popup__item_error",
  errorClass: "popup__item-error_active",
};

export {
    profileAbout,
    profileAvatar,
    nameProfile, 
    formAbout,
    formPlace,
    imageInPopup,
    nameInput,
    descriptionInput,
    addButton,
    editButton,
    editPopup,
    addPopup,
    placeTemplate,
    placeCatalogue,
    deleteCard,
    popupAvatar,
    formAvatar,
    editAvatarButton,
    submitButtonAbout,
    submitButtonAvatar,
    submitButtonPlace,
    validationProps,
};
