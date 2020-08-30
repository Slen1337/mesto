export default class Card {
    constructor(
      data,
      userId,
      cardSelector,
      addLike,
      deleteLike,
      handleDeleteCard,
      handleCardClick
    ) {
      this._data = data;
      this._name = data.name;
      this._link = data.link;
      this._cardId = data._id;
      this._ownerId = data.owner._id;
      this._likes = data.likes;
      this._userId = userId;
      this._cardSelector = cardSelector;
      this._deleteLike = deleteLike;
      this._addLike = addLike;
      this._handleDeleteCard = handleDeleteCard;
      this._handleCardClick = handleCardClick;
    }
  
    _getTemplate() {
      const cardElement = document
        .querySelector(this._cardSelector)
        .content.querySelector(".card")
        .cloneNode(true);
      return cardElement;
    }
  
    genetareCard() {
      this._element = this._getTemplate();
      this._setEventListeners();
      const deleteButton = this._element.querySelector(".button__delete");
      if (this._ownerId === this._userId) {
        deleteButton.classList.add("button_visible");
      }
      this.isLiked();
      this._counter = this._element.querySelector(".card__like-counter");
      this._counter.textContent = this._likes.length;
      const cardImage = this._element.querySelector(".card__image");
      cardImage.src = this._link;
      cardImage.alt = this._name;
      this._element.querySelector(".card__title").textContent = this._name;
      return this._element;
    }
  
    isLiked() {
      if (this._likes.some((like) => like._id === this._userId)) {
        this._element
          .querySelector(".button__like")
          .classList.add("button__like_active");
      }
    }
  
    _handleLike() {
      if (event.target.classList.contains("button__like_active")) {
        event.target.classList.remove("button__like_active");
        this._counter.textContent = this._likes.length -= 1;
        this._deleteLike(this._cardId);
      } else {
        event.target.classList.add("button__like_active");
        this._counter.textContent = this._likes.length += 1;
        this._addLike(this._cardId);
      }
    }
  
    deleteImageCard() {
      this._element.remove();
      this._element = null;
    }
  
    _setEventListeners() {
      this._element
        .querySelector(".button__like")
        .addEventListener("click", () => {
          this._handleLike();
        });
      if (this._ownerId === this._userId) {
        this._element
          .querySelector(".button__delete")
          .addEventListener("click", () => {
            this._handleDeleteCard(this._data);
          });
      }
      this._element
        .querySelector(".card__image")
        .addEventListener("click", () => {
          this._handleCardClick(this._data);
        });
    }
  }