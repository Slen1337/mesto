const initialCards = [
  {
      name: 'Мост "Золотые Ворота"',
      link: 'https://cdn.pixabay.com/photo/2016/11/29/07/59/architecture-1868265_960_720.jpg'
  },
  {
      name: 'Останкинская башня',
      link: 'https://cdn.pixabay.com/photo/2016/07/14/15/20/television-1516914_960_720.jpg'
  },
  {
      name: 'Пагода Senso-дзи',
      link: 'https://cdn.pixabay.com/photo/2017/06/15/14/04/pagoda-2405537_960_720.jpg'
  },
  {
      name: 'Кейптаун',
      link: 'https://cdn.pixabay.com/photo/2018/07/16/10/11/table-bay-harbour-3541607_960_720.jpg'
  },
  {
      name: 'Непал, храм Джанаки',
      link: 'https://cdn.pixabay.com/photo/2014/07/10/07/57/janaki-temple-388863_960_720.jpg'
  },
  {
      name: 'Флоренция',
      link: 'https://cdn.pixabay.com/photo/2016/09/08/23/08/florence-1655830_960_720.jpg'
  }
]




const popupAbout = document.querySelector('.popup_about')
const popupPlace = document.querySelector('.popup_place')
const popupImage = document.querySelector('.popup_image')

const formAbout = document.querySelector('.popup__form_about')
const formPlace = document.querySelector('.popup__form_place')

const nameInput = document.querySelector('.popup__input_name')
const nameProfile = document.querySelector('.profile__name')

const descriptionInput = document.querySelector('.popup__input_description')
const descriptionProfile = document.querySelector('.profile__description')


const addButton = document.querySelector('.profile__add-button')
const editButton = document.querySelector('.profile__edit-button')
const closeButtonAbout = document.querySelector('.popup__close_about')
const closeButtonPlace = document.querySelector('.popup__close_place')



  const togglePopup = function(popup) {

    if (popup.classList.contains('popup_opened') === false) {
      nameInput.value = nameProfile.textContent;
      descriptionInput.value = descriptionProfile.textContent;
  }
      popup.classList.toggle('popup_opened')
}


  const AddPopupImage = function(e) {
    const imageTemplate = document.querySelector('.popup-image-template').content
    const imageElement = imageTemplate.cloneNode(true)
    const imageContainer = document.querySelector('.popup__image-container')

      imageElement.querySelector('.popup__image').src = e.target.src
      imageElement.querySelector('.popup__image').alt = e.target.alt
      imageElement.querySelector('.popup__image-name').textContent = e.target.alt

    imageContainer.append(imageElement);
}



  const formSubmitHandler = function(e) {
    e.preventDefault();

    nameProfile.textContent = nameInput.value;
    descriptionProfile.textContent = descriptionInput.value;

    togglePopup(popupAbout);
}


  const renderCards = function(place) {

    const placeTemplate = document.querySelector('.place-template').content
     const placeElement = placeTemplate.cloneNode(true)
    const placeCatalogue = document.querySelector('.places__catalogue')

    placeElement.querySelector('.place__pic').src = place.link
    placeElement.querySelector('.place__pic').alt = place.name
     placeElement.querySelector('.place__name').textContent = place.name

      placeListener(placeElement);

      placeCatalogue.prepend(placeElement);
}



  const placeSubmitHandler = function(e) {
    e.preventDefault();

     let newPlaceNameInput = document.querySelector('.popup__input_place-name')
     let newPlaceLinkInput = document.querySelector('.popup__input_link')

    const placeName = {

      name: newPlaceNameInput.value,
      link: newPlaceLinkInput.value,
  }

     renderCards(placeName)
     togglePopup(popupPlace)


      newPlaceLinkInput.value = ''
      newPlaceNameInput.value = ''
}



  const like = function (e) {
    e.target.classList.toggle('place__button-like_active')
}



  const deleteCard = function (e) {
    e.target.closest('.place').remove()
}


  const closePopupBackground = function(e) {
    if (e.target !== e.currentTarget) { return }
    togglePopup(e.target)
}


  popupAbout.addEventListener('click', closePopupBackground)
  popupPlace.addEventListener('click', closePopupBackground)
  popupImage.addEventListener('click', (e) => {
    if (e.target === popupImage.querySelector('.popup__image')) { return }
    else {
       document.querySelector('.popup__image-container').innerHTML = ''
       togglePopup(popupImage)
  }
})

  formAbout.addEventListener('submit', formSubmitHandler)
  formPlace.addEventListener('submit', placeSubmitHandler)

   editButton.addEventListener('click', () => {

    nameInput.value = nameProfile.textContent;
    descriptionInput.value = descriptionProfile.textContent;

    togglePopup(popupAbout)
})

  addButton.addEventListener('click', () => {togglePopup(popupPlace)})
  closeButtonAbout.addEventListener('click', () => {togglePopup(popupAbout)})
  closeButtonPlace.addEventListener('click', () => {togglePopup(popupPlace)})



  const placeListener = function (placeElement) {
    placeElement.querySelector('.place__button-delete').addEventListener('click', deleteCard)
    placeElement.querySelector('.place__button-like').addEventListener('click', like)
    placeElement.querySelector('.place__pic').addEventListener('click', (e) => {
      AddPopupImage(e);

    togglePopup(popupImage)
  })
}


  initialCards.forEach(place => {
    renderCards(place)
})
