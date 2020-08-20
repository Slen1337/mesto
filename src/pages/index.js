import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards } from "../utils/initial-cards.js";
import {
  popupPlace,
  formAbout,
  formPlace,
  nameProfile,
  descriptionProfile,
  addButton,
  editButton,
  placeTemplate,
  placeCatalogue,
  popupImage,
  imageInPopup,
  nameImageInPopup,
  nameInput,
  descriptionInput,
  validationProps,
} from "../utils/constants.js";

const popupAbout = document.querySelector(".popup_about");

const popupWithImage = new PopupWithImage(
  popupImage,
  imageInPopup,
  nameImageInPopup
);
popupWithImage.setEventListeners();


const handleCardClick = (placeImage, placeName) => {
  popupWithImage.open(placeImage, placeName);
};

const renderCard = (place) => {
  const newPlaceCard = new Card(place, placeTemplate, handleCardClick);

  return newPlaceCard.generateCard();
}

const cardsCatalogue = new Section({
  items: initialCards.reverse(),
  renderer: (place) => {
    cardsCatalogue.addItem(renderCard(place))
  }
}, placeCatalogue)
cardsCatalogue.renderItems();


const placePopup = new PopupWithForm(popupPlace, (place) => {
  cardsCatalogue.addItem(renderCard(place));
  placePopup.close()
  }
);

const user = new UserInfo({
  name: nameProfile,
  description: descriptionProfile,
});


const aboutPopup = new PopupWithForm(popupAbout, () => {
  user.setUserInfo(nameInput, descriptionInput);
});


placePopup.setEventListeners();
aboutPopup.setEventListeners();

// cлушатели

addButton.addEventListener("click", () => {
  placePopup.open();
  placeFormValidator.hideError();
  placeFormValidator.resetButton();
});

editButton.addEventListener("click", () => {
  const userInfo = user.getUserInfo();
  nameInput.value = userInfo.name;
  descriptionInput.value = userInfo.description;
  aboutPopup.open();
  aboutFormValidator.hideError();
  aboutFormValidator.resetButton();
});

const placeFormValidator = new FormValidator(validationProps, formPlace);
const aboutFormValidator = new FormValidator(validationProps, formAbout);

placeFormValidator.enableValidation();
aboutFormValidator.enableValidation();
