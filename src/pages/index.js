import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithDelete from "../components/PopupWithDelete.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
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
} from "../utils/constants";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-14",
  headers: {
    authorization: "a9cd71df-1353-4b74-9ab2-39a2a388b667",
    "Content-Type": "application/json",
  },
});

function renderLoading(isLoading, button) {
  if (isLoading) {
    button.textContent = "Сохранение..";
  } else {
    button.textContent = "Сохранить";
  }
}

const initialCards = [];

const userProfile = new UserInfo({
  name: nameProfile,
  about: profileAbout,
  avatar: profileAvatar,
});

const popupImage = new PopupWithImage(imageInPopup);
popupImage.setEventListeners();

const popupWithDeleteCard = new PopupWithDelete({ popupSelector: deleteCard });
popupWithDeleteCard.setEventListeners();

let userId = "";

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then((result) => {
    const [items, userInfo] = result;
    userId = userInfo._id;
    cardsCatalogue.rendererItems(items.reverse());
    userProfile.setUserInfo(userInfo);
  })
  .catch((err) => {
    console.log(err);
  });

const placeCardPopup = new PopupWithForm({
  popupSelector: addPopup,
  submitHandler: (item) => {
    renderLoading(true, submitButtonPlace);
    api
      .postNewCard(item)
      .then((item) => {
        renderer(item);
        placeCardPopup.close();
        console.log("uploaded image");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(false, submitButtonPlace);
      });
  },
});
placeCardPopup.setEventListeners();

const aboutPopup = new PopupWithForm({
  popupSelector: editPopup,
  submitHandler: (item) => {
    renderLoading(true, submitButtonAbout);
    api
      .patchUserInfo(item)
      .then((item) => {
        userProfile.setUserInfo(item);
        aboutPopup.close();
        console.log("profile updated");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(false, submitButtonAbout);
      });
  },
});
aboutPopup.setEventListeners();

const avatarPopup = new PopupWithForm({
  popupSelector: popupAvatar,
  submitHandler: (item) => {
    renderLoading(true, submitButtonAvatar);
    api
      .patchAvatar(item)
      .then((item) => {
        userProfile.setUserInfo(item);
        avatarPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(false, submitButtonAvatar);
      });
  },
});
avatarPopup.setEventListeners();

const renderer = (item) => {
  const card = new Card(
    item,
    userId,
    placeTemplate,
    putlike,
    deleteLike,
    handleDelete,
    handleCardClick
  );
  const cardElement = card.genetareCard();
  cardsCatalogue.addItem(cardElement);
  function handleCardClick(data) {
    popupImage.open(data);
  }
  function handleDelete(item) {
    popupWithDeleteCard.setFormSubmitHandler(() => {
      api
        .deleteCard(item._id)
        .then(() => { 
          card.deleteImageCard();
          popupWithDeleteCard.close();
          console.log("card deleted");
        })
        .catch((err) => {
          console.log(`${err}`);
        });
    });
    popupWithDeleteCard.open();
  }
  function putlike(cardId) {
    api
      .putlike(cardId)
      .then(() => {
        console.log("liked");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function deleteLike(cardId) {
    api
      .deleteLike(cardId)
      .then(() => {
        console.log("disliked");
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const cardsCatalogue = new Section(
  {
    items: initialCards,
    renderer,
  },
  placeCatalogue
);

const removeFormErrors = (formElement) => {
  placeFormValidator.resetFormError(formElement, validationProps);
  avatarFormValidator.resetFormError(formElement, validationProps);
};

// Слушатели

addButton.addEventListener("click", () => {
  formPlace.reset();
  removeFormErrors(addPopup);
  placeCardPopup.open();
});

editButton.addEventListener("click", () => {
  const user = userProfile.getUserInfo();
  nameInput.value = user.name;
  descriptionInput.value = user.about;
  aboutFormValidator.resetFormError();
  aboutPopup.open();
});

editAvatarButton.addEventListener("click", () => {
  avatarPopup.open();
  formAvatar.reset();
  removeFormErrors(popupAvatar);
});

const placeFormValidator = new FormValidator(validationProps, formPlace);
const aboutFormValidator = new FormValidator(validationProps, formAbout);
const avatarFormValidator = new FormValidator(validationProps, formAvatar);

aboutFormValidator.enableValidation();
placeFormValidator.enableValidation();
avatarFormValidator.enableValidation();
