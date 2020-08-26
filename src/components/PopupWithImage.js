import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popup, imageInPopup, nameImageInPopup) {
    super(popup);
    this._imageInPopup = imageInPopup;
    this._nameImageInPopup = nameImageInPopup;
  }

  open(placeImage, placeName) {
    super.open();
    this._imageInPopup.src = placeImage.src;
    this._imageInPopup.alt = placeImage.alt;
    this._nameImageInPopup.textContent = placeName.textContent;
  }
}

