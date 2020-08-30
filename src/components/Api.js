export default class Api {
    constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
    }
  
    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers,
      }).then(this._getResponseData);
    }
  
    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers,
      }).then(this._getResponseData);
    }
  
    patchUserInfo(data) {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers,
        method: "PATCH",
        body: JSON.stringify({
          name: data.name,
          about: data.about,
        }),
      }).then(this._getResponseData);
    }
  
    patchAvatar(data) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        headers: this._headers,
        method: "PATCH",
        body: JSON.stringify({
          avatar: data.link,
        }),
      }).then(this._getResponseData);
    }
  
    postNewCard(data) {
      return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers,
        method: "POST",
        body: JSON.stringify({
          name: data.name,
          link: data.link,
        }),
      }).then(this._getResponseData);
    }
  
    deleteCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
        headers: this._headers,
        method: "DELETE",
      }).then(this._getResponseData);
    }
  
    putlike(cardId) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: this._headers,
      }).then(this._getResponseData);
    }
  
    deleteLike(cardId) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
      }).then(this._getResponseData);
    }
  
    _getResponseData(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }
