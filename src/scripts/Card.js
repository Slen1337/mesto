import {
  popupImage,
  addPopupImage,
  togglePopup
} from "./tools.js";

export class Card {
  constructor(place, template) {
    this._name = place.name;
    this._link = place.link;
    this._template = template;
  }

  _getTemplate() {
    const placeElement = this._template.cloneNode(true);
    return placeElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    const placeImage = this._element.querySelector(".place__pic");
    const placeName = this._element.querySelector(".place__name");
    this._placeListeners();

    placeImage.src = this._link;
    placeImage.alt = this._name;
    placeName.textContent = this._name;

    return this._element;
  }

  _like(e) {
    e.target.classList.toggle("place__button-like_active");
  }

  _deleteCard(e) {
    e.target.closest(".place").remove();
  }

  _placeListeners() {
    this._element
      .querySelector(".place__button-delete")
      .addEventListener("click", (e) => {
        this._deleteCard(e);
      });
    this._element
      .querySelector(".place__button-like")
      .addEventListener("click", (e) => {
        this._like(e);
      });
    this._element
      .querySelector(".place__pic")
      .addEventListener("click", (e) => {
        addPopupImage(e);
        togglePopup(popupImage);
      });
  }
}
