export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const cardPopup = document.querySelector('.popup_card');
const cardForm = cardPopup.querySelector('.popup__form');
export const cardButton = document.querySelector('.profile__add-button');
export const cardsContainer = document.querySelector('.cards');
export const imgPopup = document.querySelector('.popup_fullscreen');
export const templateSelector = document.querySelector('#card-template').content;
export const profilePopup = document.querySelector('.popup_profile');
const profileForm = profilePopup.querySelector('.popup__form');
export const profileName = document.querySelector('.profile__name');
export const profileActivity = document.querySelector('.profile__activity');
export const editButton = document.querySelector('.profile__edit-button');

export const forms = [
    {
      name: 'profileForm',
      form: profileForm
  },
    {
      name: 'createCardForm',
      form: cardForm
  }
]

export const formObject = {};
