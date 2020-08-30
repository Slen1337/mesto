import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(data) {
    super.open();
    const placeImage = this._element.querySelector(".popup__pic");
    const placeName = this._element.querySelector(".popup__title");
    placeImage.src = data.link;
    placeName.textContent = data.name;
    placeImage.alt = data.name;
  }
}