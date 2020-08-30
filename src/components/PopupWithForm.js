import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, submitHandler }) {
    super(popupSelector);
    this._submitHandler = submitHandler;
  }

  _getInputValues() {
    this._inputList = Array.from(
      this._element.querySelectorAll(".popup__item")
    );
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form = this._element.querySelector(".popup__form");
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._submitHandler(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
