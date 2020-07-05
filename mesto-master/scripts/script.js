const editButton = document.querySelector('.profile__edit-button')
const popup = document.querySelector('.popup')
const closeButton = popup.querySelector('.popup__close')
const form = popup.querySelector('.popup__form')

let nameInput = document.querySelector('.popup__input_name')
let descriptionInput = document.querySelector('.popup__input_description')
let nameProfile = document.querySelector('.profile__name')
let descriptionProfile = document.querySelector('.profile__description')

const popupToggle = function(event) {
    popup.classList.toggle('popup__opened')

    nameInput.value = nameProfile.textContent;
    descriptionInput.value = descriptionProfile.textContent;
}

const closePopup = function(event) {
  if (event.target !== event.currentTarget)
  { return }
      popupToggle()
}

const formSubmitHandler = function(event) {
    event.preventDefault();

    nameProfile.textContent = nameInput.value;
    descriptionProfile.textContent = descriptionInput.value;

    popupToggle()
}

editButton.addEventListener('click', popupToggle)
closeButton.addEventListener('click', popupToggle)
popup.addEventListener('click', closePopup)

form.addEventListener('submit', formSubmitHandler)
