const popupAbout = document.querySelector(".popup_about");
const popupPlace = document.querySelector(".popup_place");
const popupImage = document.querySelector(".popup_image");


const formAbout = document.querySelector(".popup__form_about");
const formPlace = document.querySelector(".popup__form_place");

const nameInput = document.querySelector(".popup__input_name");
const nameProfile = document.querySelector(".profile__name");

const descriptionInput = document.querySelector(".popup__input_description");
const descriptionProfile = document.querySelector(".profile__description");

const addButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button");
const closeButtonAbout = document.querySelector(".popup__close_about");
const closeButtonPlace = document.querySelector(".popup__close_place");
const closeButtonImage = document.querySelector('.popup__close_image')

const newPlaceNameInput = document.querySelector('.popup__input_place-name')
const newPlaceLinkInput = document.querySelector('.popup__input_link')

const imageInPopup = document.querySelector('.popup__image')
const nameImageInPopup = document.querySelector('.popup__image-name')

const placeTemplate = document.querySelector('.place-template').content
const placeCatalogue = document.querySelector('.places__catalogue')

const validationProps = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: 'popup__input_type_error',
  errorClass: "popup__input-error_active",
};

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
    document.addEventListener("keyup", closePopupEsc)
    popup.addEventListener("click", closePopupBackground)
  }
  else {
    document.removeEventListener("keyup", closePopupEsc)
    popup.removeEventListener("click", closePopupBackground)
  }
};

// очистка формы

const resetForm = function(form) {
  form.reset();
}

// добавляю в popup image

const addPopupImage = function (e) {
    imageInPopup.src = ''
    imageInPopup.alt = ''
    nameImageInPopup.textContent = ''

    imageInPopup.src = e.target.src
    imageInPopup.alt = e.target.alt
    nameImageInPopup.textContent = e.target.alt
};


// меняются данные профиля через popup about
const formSubmitHandler = function (e) {
  e.preventDefault();

  nameProfile.textContent = nameInput.value;
  descriptionProfile.textContent = descriptionInput.value;

  togglePopup(popupAbout);
};

// загрузка карточек из массива
const renderCard = function (place) {
  // клон содержимого тэга темплейт
  const placeElement = placeTemplate.cloneNode(true)
  const placeImage= placeElement.querySelector('.place__pic')


  // из массива наполняем
  placeImage.src = place.link
  placeImage.alt = place.name
  placeElement.querySelector('.place__name').textContent = place.name
// слушатели на эл карточки
  placeListener(placeElement);

  placeCatalogue.prepend(placeElement);
};
// добавление новой карточки
const placeSubmitHandler = function (e) {
  e.preventDefault();
// грузим данные из формы в массив
  const placeName = {
    name: newPlaceNameInput.value,
    link: newPlaceLinkInput.value,
  };

  renderCard(placeName);
  togglePopup(popupPlace);
// обнуление
  newPlaceLinkInput.value = "";
  newPlaceNameInput.value = "";
  resetForm(formPlace)
};

const toggleLike = function (e) {
  e.target.classList.toggle("place__button-like_active");
};

const deleteCard = function (e) {
  e.target.closest(".place").remove();
};

const closePopupBackground = function (e) {
  if (e.target !== e.currentTarget) {
    return
  }
  togglePopup(e.target);
};

const closePopupEsc = function(e) {
  if (e.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened")
    togglePopup(openedPopup)
  }
}

// слушатели
formAbout.addEventListener('submit', (e) => {
  const submitButton = formAbout.querySelector('.popup__button')
  if (submitButton.classList.contains('popup__button_inactive')) {
    return
  } else { formSubmitHandler(e) }
})



formPlace.addEventListener('submit', (e) => {
  const submitButton = formPlace.querySelector('.popup__button')
  if (submitButton.classList.contains('popup__button_inactive')) {
    return
  } else { placeSubmitHandler(e) }
})

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
closeButtonImage.addEventListener('click', () =>  {
  togglePopup(popupImage);
});

const placeListener = function (placeElement) {
  placeElement
    .querySelector(".place__button-delete")
    .addEventListener("click", deleteCard);
  placeElement
    .querySelector(".place__button-like")
    .addEventListener("click", toggleLike);
  placeElement.querySelector(".place__pic").addEventListener("click", (e) => {
    addPopupImage(e);

    togglePopup(popupImage);
  });
};

initialCards.forEach(place => {
  renderCard(place);
});

enableValidation(validationProps);
