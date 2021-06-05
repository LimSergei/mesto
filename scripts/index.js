import Card from './Card.js';

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


// Открытие попапов
export default function openPopup(popup) {
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
  openPopup(profilePopup);
}

// Редактирование профиля
function editProfileData(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileActivity.textContent = jobInput.value;
  closePopup(profilePopup);
}

// Закрытие профиля
function closeProfilePopup() {
  closePopup(profilePopup);
  profileForm.reset();
}

// Закрытие попапа добавления новой карточки
function closeCardPopup() {
  const formButton = cardForm.querySelector('.popup__form-button');
  closePopup(cardPopup);
  cardForm.reset();
  formButton.disabled = true;
}

// Добавление карточки в DOM
initialCards.forEach((objItem) => {
  const newCard = new Card(objItem, '#card-template');
  const cardElement = newCard.generateCard();
  cardsContainer.append(cardElement);
});

//Создание новой карточки
function addNewCard(event) {
  event.preventDefault();
  const inputName = newCardName.value;
  const inputLink = newCardLink.value;
  const newCard = new Card({ name: inputName, link: inputLink}, '#card-template');
  const newCardItem = newCard.generateCard();
  cardsContainer.prepend(newCardItem);
  closeCardPopup();
}

  editButton.addEventListener('click', openProfilePopup);
  profileForm.addEventListener('submit', editProfileData);
  profileCloseButton.addEventListener('click', closeProfilePopup);
  cardButton.addEventListener('click', () => openPopup(cardPopup));
  cardForm.addEventListener('submit', addNewCard);
  cardCloseButton.addEventListener('click', closeCardPopup);
  imgCloseButton.addEventListener('click',()=> closePopup(imgPopup));
