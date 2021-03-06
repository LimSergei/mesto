export default class Api {

  constructor (options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkRes(res) {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
      .then(res => this._checkRes(res))
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then(res => this._checkRes(res))
  }

  setProfileInfo(name, activity) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: activity
      })
    })
    .then(res => this._checkRes(res))
  }

  addNewCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(res => this._checkRes(res))
  }

  deleteCard(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(res => this._checkRes(res))
  }

  addLike(cardID) {
    return fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(res => this._checkRes(res))
  }

  deleteLike(cardID) {
    return fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(res => this._checkRes(res))
  }

  editAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    })
    .then(res => this._checkRes(res))
  }
}
