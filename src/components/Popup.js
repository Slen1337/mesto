export default class Popup {
    constructor(popupSelector) {
      this._element = document.querySelector(popupSelector);
    }
  
    open() {
      this._element.classList.add("popup_open");
      document.addEventListener("keydown", (e) => this._handleEscClose(e));
    }
  
    close() {
      this._element.classList.remove("popup_open");
      document.removeEventListener("keydown", (e) => this._handleEscClose(e));
    }
  
    _handleEscClose(e) {
      if (e.key === "Escape") {
        this.close();
      }
    }
  
    setEventListeners() {
      this._element
        .querySelector(".popup__close")
        .addEventListener("click", () => {
          this.close();
        });
      this._element.addEventListener("mousedown", (e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        this.close();
      });
    }
  }
