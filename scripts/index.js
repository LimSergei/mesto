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
const img = document.querySelector('.fullscreen');
const imgCloseButton = img.querySelector('.popup__close-button');
const newCardName = cardForm.querySelector('.popup__input_type_name');
const newCardLink = cardForm.querySelector('.popup__input_type_activity');


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
  nameInput.value = profileName.textContent;
  jobInput.value = profileActivity.textContent;
  formObject['profileForm'].cleanFormError();
  openPopup(profilePopup);
}

//Открытие попапа добавления карточки
function openAddPopup() {
  formObject['createCardForm'].cleanFormError();
  openPopup(cardPopup)
}

// Редактирование профиля
function editProfileData(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileActivity.textContent = jobInput.value;
  closePopup(profilePopup);
}

// Добавление карточки в DOM
initialCards.forEach((objItem) => {
  const newCard = new Card(objItem, '#card-template', openPopup);
  const cardElement = newCard.generateCard();
  cardsContainer.append(cardElement);
})

//Создание новой карточки
function addNewCard(event) {
  event.preventDefault();
  const inputName = newCardName.value;
  const inputLink = newCardLink.value;
  const newCard = new Card({ name: inputName, link: inputLink}, '#card-template');
  const newCardItem = newCard.generateCard();
  cardsContainer.prepend(newCardItem);
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
