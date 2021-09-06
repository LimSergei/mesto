
export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__form-button',
  inactiveButtonClass: 'popup__form-submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
}

export const cardPopup = document.querySelector('.popup_card');
export const cardAddButton = document.querySelector('.profile__add-button');
export const cardsContainer = document.querySelector('.cards');
export const imgPopup = document.querySelector('.popup_fullscreen');
export const templateSelector = document.querySelector('#card-template').content;
export const profilePopup = document.querySelector('.popup_profile');
export const editButton = document.querySelector('.profile__edit-button');
export const profileNameInput = document.querySelector('#profile-name');
export const profileActivityInput = document.querySelector('#profile-activity');
export const escKey = 'Escape';

export const forms = document.querySelectorAll(config['formSelector']);

export const formObject = {};

export const profileConfig = {
  userNameSelector:'.profile__name',
  userActivitySelector: '.profile__activity',
  userAvatarSelector: '.profile__image'
}

export const confirmPopup = document.querySelector('.popup__confirm');
