import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithDelete from "../components/PopupWithDelete.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import { setLoading } from "../utils/utils.js";
import {
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
  popupDeleteCard,
  popupAvatar,
  formAvatar,
  editAvatarButton,
  submitButtonAbout,
  submitButtonAvatar,
  submitButtonPlace,
  validationProps,
} from "../utils/constants.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-14",
  headers: {
    authorization: "a9cd71df-1353-4b74-9ab2-39a2a388b667",
    "Content-Type": "application/json",
  },
});

api
  .getUserInfo()
  .then((data) => {
    api.userInfo = data;
    user.setUserInfo({ name: data.name, about: data.about });
    user.setAvatar(data.avatar);
    api
      .getInitialCards()
      .then((cards) => {
        renderCards(cards).renderItems();
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);
  });

const handleUserInfo = function (itemUser) {
  setLoading(true, submitButtonAbout);
  api
    .patchUserInfo(itemUser.name, itemUser.about)
    .then((item) => {
      user.setUserInfo(item);
      aboutPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setLoading(false, submitButtonAbout);
    });
};

const handleAvatar = function (itemAvatar) {
  setLoading(true, submitButtonAvatar);
  api
    .patchAvatar(itemAvatar.avatar)
    .then((res) => {
      user.setAvatar(res.avatar);
      avatarPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setLoading(false, submitButtonAvatar);
    });
};

const addNewCard = function (card) {
  setLoading(true, submitButtonPlace);
  api
    .postNewCard(card.name, card.link)
    .then((card) => {
      renderCards().addNewCard(renderCard(card));
      placePopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setLoading(false, submitButtonPlace);
    });
};

const popupWithImage = new PopupWithImage(
  popupImage,
  imageInPopup,
  nameImageInPopup
);

const handleCardClick = function (placeImage, placeName) {
  popupWithImage.open(placeImage, placeName);
  popupWithImage.setEventListeners();
};

const popupWithDeleteCard = new PopupWithDelete(popupDeleteCard, api);

const handleDeleteClick = function (cardId) {
  popupWithDeleteCard.open();
  popupWithDeleteCard.setEventListeners(cardId);
};

const renderCard = function (place) {
  const newCard = new Card(
    place,
    placeTemplate,
    handleCardClick,
    api.userInfo._id,
    handleDeleteClick,
    api
  );
  return newCard.generateCard();
};

const renderCards = function (cards) {
  const cardsCatalogue = new Section(
    {
      items: cards,
      renderer: (place) => {
        cardsCatalogue.addItem(renderCard(place));
      },
    },
    placeCatalogue
  );
  return cardsCatalogue;
};

const user = new UserInfo({
  name: nameProfile,
  description: descriptionProfile,
});

const placePopup = new PopupWithForm(popupPlace, (place) => {
  addNewCard(place);
});

const aboutPopup = new PopupWithForm(popupAbout, handleUserInfo);
const avatarPopup = new PopupWithForm(popupAvatar, handleAvatar);

placePopup.setEventListeners();
aboutPopup.setEventListeners();
avatarPopup.setEventListeners();

// Слушатели

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

editAvatarButton.addEventListener("click", () => {
  avatarPopup.open();
  avatarFormValidator.hideError();
  avatarFormValidator.resetButton();
});

const placeFormValidator = new FormValidator(validationProps, formPlace);
const aboutFormValidator = new FormValidator(validationProps, formAbout);
const avatarFormValidator = new FormValidator(validationProps, formAvatar);

placeFormValidator.enableValidation();
aboutFormValidator.enableValidation();
avatarFormValidator.enableValidation();
