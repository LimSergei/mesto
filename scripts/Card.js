export default class Card {
  constructor(name, link, templateSelector, openImgPopup) {
    this._name = name;
    this._link = link;
    this._templateElement = templateSelector.querySelector('.card').cloneNode(true);
    this._openImgPopup = openImgPopup;
  }

  //Генерация карточки + навешивание слушателей
  generateCard = () => {
    this._card = this._templateElement;
    const cardImg = this._card.querySelector('.card__image');
    const cardLike = this._card.querySelector('.card__like');
    const cardDeleteButton = this._card.querySelector('.card__trash');

    cardImg.addEventListener('click', () => this._openImgPopup(this._name, this._link));
    cardLike.addEventListener('click', () => this._likeCard());
    cardDeleteButton.addEventListener('click', () => this._deleteCard());

    cardImg.src = this._link;
    cardImg.alt = this._name;
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
}
