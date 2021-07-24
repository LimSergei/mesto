import './pages/index.css';
import Card from './scripts/components/Card.js';
import FormValidator from './scripts/components/FormValidator.js';
import { initialCards,
  config,
  cardPopup,
  cardButton,
  cardsContainer,
  imgPopup,
  templateSelector,
  forms,
  formObject,
  profilePopup,
  profileName,
  profileActivity,
  editButton,
  profileNameInput,
  profileActivityInput,
  } from './scripts/utils/constants.js';
import Section from './scripts/components/Section.js';
import PopupWithImage from './scripts/components/PopupWithImage.js';
import PopupWithForm from './scripts/components/PopupWithForm.js';
import UserInfo from './scripts/components/UserInfo.js';

//Экземпляр открытия попапа картинки
const popupWithImage = new PopupWithImage (imgPopup);

//Функция создания новой карточки + добавления в контейнер
const createCard = (data) => {
  const card = new Card (data.name, data.link, templateSelector,
    {handleCardClick: () => {
      popupWithImage.open(data.name, data.link);
      }
    }
  )
  cardList.addItem(card.generateCard());
}

//Отрисовка дефолтных карточек
const cardList = new Section( {
  items: initialCards,
  renderer: (data) => {
    createCard(data);
  }
}, cardsContainer)

cardList.renderItems();

//Экземпляр попапа формы новой карточки
const popupAddForm = new PopupWithForm (cardPopup, {
  submitHandler: (data) => {
  createCard({name:data.placename, link: data.placelink});
  popupAddForm.close();
  },
  resetHandler: () => {
    formObject['createCardForm'].cleanFormError();
  }
});

//Функция сброса и открытия попапа новой карточки
const openAddPopup = () => {
  popupAddForm.resetHandler();
  popupAddForm.open();
}

//Эксземпляр редактирования профиля
const userInfo = new UserInfo ({profileName, profileActivity});

//Экземпляр попапа формы редактирования профиля
const popupEditProfile = new PopupWithForm (profilePopup, {
  submitHandler: (input) => {
    userInfo.setUserInfo(input);
    popupEditProfile.resetHandler();
    popupEditProfile.close();
  },
  resetHandler: () => {
    formObject['profileForm'].cleanFormError();
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
