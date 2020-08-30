export default class FormValidator {
    constructor(validationProps, formElement) {
      this._formElement = formElement;
      this._formSelector = validationProps.formSelector;
      this._inputSelector = validationProps.inputSelector;
      this._submitButtonSelector = validationProps.submitButtonSelector;
      this._inactiveButtonClass = validationProps.inactiveButtonClass;
      this._inputErrorClass = validationProps.inputErrorClass;
      this._errorClass = validationProps.errorClass;
    }
  
    _showInputError(inputElement, errorMessage) {
      const errorElement = this._formElement.querySelector(
        `#${inputElement.id}-error`
      );
      inputElement.classList.add(this._inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._errorClass);
    }
  
    _hideInputError(inputElement) {
      const errorElement = this._formElement.querySelector(
        `#${inputElement.id}-error`
      );
      inputElement.classList.remove(this._inputErrorClass);
      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = "";
    }
  
    _isValid(inputElement) {
      if (!inputElement.validity.valid) {
        this._showInputError(inputElement, inputElement.validationMessage);
      } else {
        this._hideInputError(inputElement);
      }
    }
  
    _setEventListeners() {
      const inputList = Array.from(
        this._formElement.querySelectorAll(this._inputSelector)
      );
      const buttonElement = this._formElement.querySelector(
        this._submitButtonSelector
      );
      this._toggleButtonState(inputList, buttonElement);
      inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
          this._isValid(inputElement);
          this._toggleButtonState(inputList, buttonElement);
        });
      });
    }
  
    enableValidation() {
      this._formElement.addEventListener("submit", (e) => {
        e.preventDefault();
      });
      this._setEventListeners();
    }
  
    _hasInvalidInput(inputList) {
      return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      });
    }
  
    _toggleButtonState(inputList, buttonElement) {
      if (this._hasInvalidInput(inputList)) {
        buttonElement.classList.add(this._inactiveButtonClass);
        buttonElement.setAttribute("disabled", true);
      } else {
        buttonElement.classList.remove(this._inactiveButtonClass);
        buttonElement.removeAttribute("disabled");
      }
    }
  
    resetFormError() {
      const inputList = Array.from(
        this._formElement.querySelectorAll(this._inputSelector)
      );
      inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
        const buttonElement = this._formElement.querySelector(
          this._submitButtonSelector
        );
        this._toggleButtonState(inputList, buttonElement);
      });
    }
  }