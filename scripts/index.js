import Card from './Card.js';
import { FormValidator, config } from './FormValidator.js';

const profilePopup = document.querySelector('.popup_profile');
const editButton = document.querySelector('.profile__edit-button');
const profileCloseButton = profilePopup.querySelector('.popup__close-button');
const profileForm = profilePopup.querySelector('.popup__form');
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_activity');
const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity');
const cardPopup = document.querySelector('.popup_card');
const cardButton = document.querySelector('.profile__add-button');
const cardCloseButton = cardPopup.querySelector('.popup__close-button');
const cardForm = cardPopup.querySelector('.popup__form');
const cardsContainer = document.querySelector('.cards');
const imgPopup = document.querySelector('.popup_fullscreen');
const cardLink = document.querySelector('.fullscreen__image');
const cardName = document.querySelector('.fullscreen__name');
const img = document.querySelector('.fullscreen');
const imgCloseButton = img.querySelector('.popup__close-button');
const newCardName = cardForm.querySelector('.popup__input_type_name');
const newCardLink = cardForm.querySelector('.popup__input_type_activity');
const templateSelector = document.querySelector('#card-template').content;

const forms = [
    {
      name: 'profileForm',
      form: profileForm
  },
    {
      name: 'createCardForm',
      form: cardForm
  }
]

const formObject = {};

// Открытие попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

// Закрытие попапов по клавише Esc
function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

// Закрытие попапов по оверлею
window.addEventListener('mousedown', (evt) => {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup_opened')) {
    closePopup(popupOpened);
  }
})

// Закрытие попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

// Открытие попапа профиля
function openProfilePopup() {
  formObject['profileForm'].cleanFormError();
  nameInput.value = profileName.textContent;
  jobInput.value = profileActivity.textContent;
  openPopup(profilePopup);
}

//Открытие попапа добавления карточки
function openAddPopup() {
  formObject['createCardForm'].cleanFormError();
  openPopup(cardPopup)
}

// Открытие попапа картинки
const openImgPopup = ((name, link) => {
  cardName.textContent = name;
  cardLink.src = link;
  cardLink.alt = name;
  openPopup(imgPopup);
});

// Редактирование профиля
function editProfileData(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileActivity.textContent = jobInput.value;
  closePopup(profilePopup);
}

//Создание новой карточки
const createCard = (name, link) => {
  const newCard = new Card(name, link, templateSelector, openImgPopup);
  return newCard.generateCard();
}

// Добавление карточки в DOM
initialCards.forEach((card) => {
  cardsContainer.append(createCard(card.name, card.link));
})

//Добавление новой карточки
function addNewCard(event) {
  event.preventDefault();
  const inputName = newCardName.value;
  const inputLink = newCardLink.value;
  cardsContainer.prepend(createCard(inputName, inputLink));
  closePopup(cardPopup);
}

//Валидация форм
forms.forEach(element =>{
  formObject[element.name] = new FormValidator(element.form, config)
  formObject[element.name].enableValidation();
})


  editButton.addEventListener('click', openProfilePopup);
  profileForm.addEventListener('submit', editProfileData);
  profileCloseButton.addEventListener('click', () => closePopup(profilePopup));
  cardButton.addEventListener('click', () => openAddPopup());
  cardForm.addEventListener('submit', addNewCard);
  cardCloseButton.addEventListener('click', () => closePopup(cardPopup));
  imgCloseButton.addEventListener('click',()=> closePopup(imgPopup));

  export { cardLink, cardName, imgPopup }
