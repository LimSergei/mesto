import './pages/index.css';
import Card from './scripts/components/Card.js';
import FormValidator from './scripts/components/FormValidator.js';
import {
  config,
  cardPopup,
  cardAddButton,
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
  confirmPopup,
  avatarPopup,
  imgAvatar,
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

//Экземпляр открытия попапа Confirm
const popupConfirm = new PopupWithForm(confirmPopup);

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-27',
  headers: {
    authorization: 'd5adb4d7-c0ba-41c4-b99b-0eab8d669745',
    'Content-Type': 'application/json'
  }
})

//Функция создания новой карточки
const createCard = (data) => {
  data['userID'] = userInfo.getUserInfo()['id'];
  const card = new Card (data, templateSelector,
    () => popupWithImage.open(data),
    (isLike) => {
      const likeStatus = isLike ? api.deleteLike(data._id) : api.addLike(data._id);
      likeStatus.then((res) => {
        card.likeHandler(res.likes)
      })
      .catch(err => console.log(err));
    },
    () => {
      popupConfirm.submitFormHandler(() => {
        api.deleteCard(data._id)
          .then(() => {
              card.deleteCard();
              popupConfirm.close();
        })
        .catch(err => console.log(err));
      }),
      popupConfirm.open();
    })
  return card.generateCard();
}

Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([user, cards]) => {
    userInfo.setUserInfo(user);
    cardList = new Section( {
      items: cards.reverse(),
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
const popupAddForm = new PopupWithForm (cardPopup,
  (input) => {
    popupAddForm.loading(true);
    api.addNewCard(input['placename'], input['placelink'])
      .then(data => {
        cardList.addItem(createCard(data))
        popupAddForm.loading(false);
        popupAddForm.close();
      })
      .catch(err => console.log(err));
      }
);

// Экземпляр попапа формы редактирования профиля
const popupEditProfile = new PopupWithForm (profilePopup,
  (input) => {
    popupEditProfile.loading(true);
    api.setProfileInfo(input['fullname'], input['activity'])
      .then(data => {
        userInfo.setUserInfo(data)
        popupEditProfile.loading(false);
        popupEditProfile.close();
      })
      .catch(err => console.log(err));
  }
);

//Экземпляр открытия попапа Avatar
const popupAvatar = new PopupWithForm(avatarPopup,
  (input) => {
    popupAvatar.loading(true);
    api.editAvatar(input['avatar'])
      .then(data => {
        userInfo.setUserInfo(data);
        popupAvatar.loading(false);
        popupAvatar.close();
      })
      .catch(err => console.log(err));
  }
  );

popupEditProfile.setEventListeners();
popupAddForm.setEventListeners();
popupWithImage.setEventListeners();
popupConfirm.setEventListeners();
popupAvatar.setEventListeners();

// Валидация форм
forms.forEach(element =>{
  formObject[element.name] = new FormValidator(element, config)
  formObject[element.name].enableValidation();
})

//Слушатель открытия попапа редактирования профиля + очистка формы
editButton.addEventListener('click', () => {
  const profileInfo = userInfo.getUserInfo();
  formObject['profile-information'].cleanFormError();
  profileNameInput.value = profileInfo.name;
  profileActivityInput.value = profileInfo.activity;
  popupEditProfile.open();
});

//Слушатель открытия добавления карточки + очистка формы
cardAddButton.addEventListener('click', () => {
  popupAddForm.open();
  formObject['place-information'].cleanFormError();
});

//Слушатель открытия попапа "Аватар"
imgAvatar.addEventListener('click', () => {
  const avatarLink = userInfo.getUserInfo()['avatar'];
  imgAvatar.src = avatarLink.src;

  popupAvatar.open();
  formObject['avatar-link'].cleanFormError();
})
