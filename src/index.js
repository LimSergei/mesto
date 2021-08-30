import './pages/index.css';
import Card from './scripts/components/Card.js';
import FormValidator from './scripts/components/FormValidator.js';
import {
  config,
  cardPopup,
  cardButton,
  cardsContainer,
  imgPopup,
  templateSelector,
  forms,
  formObject,
  profilePopup,
  editButton,
  profileNameInput,
  profileActivityInput,
  profileConfig,
  } from './scripts/utils/constants.js';
import Section from './scripts/components/Section.js';
import PopupWithImage from './scripts/components/PopupWithImage.js';
import PopupWithForm from './scripts/components/PopupWithForm.js';
import UserInfo from './scripts/components/UserInfo.js';
import Api from './scripts/components/Api';

let cardList

//Экземпляр редактирования профиля
const userInfo = new UserInfo (profileConfig);

//Экземпляр открытия попапа картинки
const popupWithImage = new PopupWithImage (imgPopup);

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-27',
  headers: {
    authorization: 'd5adb4d7-c0ba-41c4-b99b-0eab8d669745',
    'Content-Type': 'application/json'
  }
})

//Функция создания новой карточки
const createCard = (data) => {
  const card = new Card (data.name, data.link, templateSelector,
    {handleCardClick: () => {
      popupWithImage.open(data.name, data.link);
      }
    }
  )
  return card.generateCard();
}

Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([user, cards]) => {
    userInfo.setUserInfo(user);
    cardList = new Section( {
      items: cards,
      renderer: (item) => {
        const newCard = createCard(item);
        cardList.addItem(newCard);
      }
    }
      , cardsContainer);
    cardList.renderItems();
  })
  .catch(err => console.log(err));

//Экземпляр попапа формы новой карточки
const popupAddForm = new PopupWithForm (cardPopup, {
  submitHandler: (input) => {
  api.addNewCard(input['placename'], input['placelink'])
  .then(data => {
    cardList.addItem(createCard(data))
    popupAddForm.close();
  })
  .catch(err => console.log(err));
  }
});

//Функция сброса и открытия попапа новой карточки
const openAddPopup = () => {
  popupAddForm.open();
}

// Экземпляр попапа формы редактирования профиля
const popupEditProfile = new PopupWithForm (profilePopup, {
  submitHandler: (input) => {
    api.setProfileInfo(input['fullname'], input['activity'])
      .then(data => {
        userInfo.setUserInfo(data)
        popupEditProfile.close();
      })
      .catch(err => console.log(err));
  }
});

//Функция открытия попапа редактирования профиля
const openEditProfilePopup = () => {
  const profileInfo = userInfo.getUserInfo();
  profileNameInput.value = profileInfo.name;
  profileActivityInput.value = profileInfo.activity;
  popupEditProfile.open();
}

popupEditProfile.setEventListeners();
popupAddForm.setEventListeners();
popupWithImage.setEventListeners();

editButton.addEventListener('click', openEditProfilePopup);
cardButton.addEventListener('click', openAddPopup);

//Валидация форм
forms.forEach(element =>{
  formObject[element.name] = new FormValidator(element.form, config)
  formObject[element.name].enableValidation();
})
