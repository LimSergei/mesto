export default class Card {
  #name;
  #link;
  #templateElement;
  #handleCardClick;
  #card;

  constructor(name, link, templateSelector, {handleCardClick}) {
    this.#name = name;
    this.#link = link;
    this.#templateElement = templateSelector.querySelector('.card').cloneNode(true);
    this.#handleCardClick = handleCardClick;
  }

  // Поставить лайк
  #likeCard() {
    const likeElement = this.#card.querySelector('.card__like');
    likeElement.classList.toggle('card__like_active');
  }

  // Удалить карточку
  #deleteCard() {
    this.#card.remove();
    this.#card = null;
  }

  #setEventListeners() {
    const cardImg = this.#card.querySelector('.card__image');
    const cardLike = this.#card.querySelector('.card__like');
    const cardDeleteButton = this.#card.querySelector('.card__trash');

    cardImg.addEventListener('click', () => this.#handleCardClick(this.#name, this.#link));
    cardLike.addEventListener('click', () => this.#likeCard());
    cardDeleteButton.addEventListener('click', () => this.#deleteCard());
  }

  //Генерация карточки + навешивание слушателей
  generateCard() {
    this.#card = this.#templateElement;
    const cardImg = this.#card.querySelector('.card__image');

    this.#setEventListeners();

    cardImg.src = this.#link;
    cardImg.alt = this.#name;
    this.#card.querySelector('.card__title').textContent = this.#name;

    return this.#card
  }
}
