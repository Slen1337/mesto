export default class Popup {
  constructor(popup) {
    this._popup = popup;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keyup", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keyup", this._handleEscClose);
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._closeButton = this._popup.querySelector(".popup__close");
    this._closeButton.addEventListener("mousedown", () => {
      this.close();
    });

    this._popup.addEventListener("mousedown", (e) => {
      if (e.target !== e.currentTarget) {
        return;
      }
      this.close();
    });
  }
}
