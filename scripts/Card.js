import openPopup from './index.js'

class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  // Создание html сущности
  _getTemplate = () => {
    const cardItem = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);

    return cardItem
  }

  //Генерация карточки
  generateCard = () => {
    this._card = this._getTemplate();
    this._addListeners();
    this._card.querySelector('.card__image').src = this._link;
    this._card.querySelector('.card__image').alt = this._name;
    this._card.querySelector('.card__title').textContent = this._name;

    return this._card
  }

    // Поставить лайк
  _likeCard() {
    const likeElement = this._card.querySelector('.card__like');
    likeElement.classList.toggle('card__like_active');
  }

  // Удалить карточку
  _deleteCard() {
    this._card.remove();
  }

  //Открытие попапа картинки
  _openImgPopup() {
    const imgItem = document.querySelector('.popup_fullscreen');
    const cardLink = document.querySelector('.fullscreen__image');
    const cardName = document.querySelector('.fullscreen__name');
    cardName.textContent = this._name;
    cardLink.src = this._link;
    cardLink.alt = this._name;
    openPopup(imgItem);
  }

  //Навешивание слушателей
  _addListeners() {
    this._card.querySelector('.card__image').addEventListener('click', () => this._openImgPopup());
    this._card.querySelector('.card__like').addEventListener('click', () => this._likeCard());
    this._card.querySelector('.card__trash').addEventListener('click', () => this._deleteCard());
  }
}

export default Card
