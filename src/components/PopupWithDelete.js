import Popup from "./Popup.js";

export default class PopupWithDelete extends Popup {
  constructor({ popupSelector }) {
    super(popupSelector);
  }

  setFormSubmitHandler(handle) {
    this._handleSubmit = handle;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form = this._element.querySelector(".popup__form");
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleSubmit();
    });
  }
}
