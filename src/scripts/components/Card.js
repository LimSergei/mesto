
export default class Card {

  constructor(data, templateSelector, handleImgClick, handleLikeClick, handleDeleteCard) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._owner = data.owner;
    this._id = data._id;
    this._userID = data['userID'];

    this._card = templateSelector.querySelector('.card').cloneNode(true);

    this._handleImgClick = handleImgClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteCard = handleDeleteCard;
  }

  // Удаление карточки из DOM
  deleteCard() {
    this._card.remove();
    this._card = null;
  }

  //Удаление корзины с чужих созданных карточек
  _showRecycleBin(cardDeleteButton) {
    if (this._owner._id !== this._userID) {
      cardDeleteButton.remove();
    }
  }

  //
  _isLike() {
    const likeButton = this._card.querySelector('.card__like');
    const isLike = likeButton.classList.contains('card__like_active');
    this._handleLikeClick(isLike);
  }

  _countLikes() {
    this._likeButton = this._card.querySelector('.card__like');

    this._count = this._card.querySelector('.card__like-counter');
    this._count.textContent = this._likes.length;

    this._likeButton.classList.remove('card__like_active');
    this._likes.forEach(likeItem => {
      if(likeItem._id === this._userID) {
        this._likeButton.classList.add('card__like_active');
      }
    });
  }

  likeHandler(likeArr) {
    this._likes = likeArr
    this._countLikes();
  }

  // Callback удаления карточки
  _deleteCardHandler() {
    this._handleDeleteCard(this);
  }

  // Навешивание слушателей
  _setEventListeners(cardImg, cardDeleteButton) {
    const cardLike = this._card.querySelector('.card__like');

    cardImg.addEventListener('click', () => this._handleImgClick(this._name, this._link));
    cardLike.addEventListener('click', () => this._isLike());
    cardDeleteButton.addEventListener('click', () => this._deleteCardHandler());
  }

  //Генерация карточки + навешивание слушателей
  generateCard() {
    const cardImg = this._card.querySelector('.card__image');
    const cardDeleteButton = this._card.querySelector('.card__trash');
    this._likeButton = this._card.querySelector('.card__like');

    this._setEventListeners(cardImg, cardDeleteButton);
    this._showRecycleBin(cardDeleteButton);
    this._countLikes();

    cardImg.src = this._link;
    cardImg.alt = this._name;
    this._card.querySelector('.card__title').textContent = this._name;

    return this._card
  }
}
