const initialCards = [
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

const profilePopup = document.querySelector('.popup_profile');
const editButton = document.querySelector('.profile__edit-button');
const profileSubmit = profilePopup.querySelector('.popup__save-button');
const profileCloseButton = profilePopup.querySelector('.popup__close-button');
const profileForm = profilePopup.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_activity');
const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity');
const cardPopup = document.querySelector('.popup_card');
const cardButton = document.querySelector('.profile__add-button');
const cardCloseButton = cardPopup.querySelector('.popup__close-button');
const cardForm = cardPopup.querySelector('.popup__form');
const cardTemplate = document.querySelector('#card-template');
const cardsContainer = document.querySelector('.cards');
const imgPopup = document.querySelector('.popup_fullscreen');
const imgCloseButton = document.querySelector('.fullscreen__close-button');
const newCardName = cardForm.querySelector('.popup__input_type_name');
const newCardLink = cardForm.querySelector('.popup__input_type_activity');
const cardLink = document.querySelector('.fullscreen__image');
const cardName = document.querySelector('.fullscreen__name');

// Открытие попапов
function openPopup(popup) {
  popup.classList.remove('popup_closed');
}

// Закрытие попапов
function closePopup(popup) {
  popup.classList.add('popup_closed');
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

// Открытие попапа добавления новой карточки
function openCardPopup() {
  openPopup(cardPopup);
}

// Закрытие попапа добавления новой карточки
function closeCardPopup() {
  closePopup(cardPopup);
  cardForm.reset();
}

// Поставить лайк
function likeCard(event) {
  event.target.classList.toggle('card__like_active');
}

// Удалить карточку
function deleteCard(event) {
  event.target.closest('.card').remove();
}

// Открытие попапа картинки
function openImgPopup({ name, link }) {
  cardName.textContent = name;
  cardLink.src = link;
  cardLink.alt = name;
  openPopup(imgPopup);
}

// Закрытие попапа картинки
imgCloseButton.addEventListener('click', function(event) {
  const targetImg = event.target.closest('.popup');
  closePopup(targetImg);
});

// Формирование карточки + лайк + удаление
function createCard(element) {
  const cardElement = cardTemplate.content.cloneNode(true);
  cardElement.querySelector('.card__image').src = element.link;
  cardElement.querySelector('.card__title').textContent = element.name;
  cardElement.querySelector('.card__image').alt = element.name;
  cardElement.querySelector('.card__like').addEventListener('click', likeCard);
  cardElement.querySelector('.card__trash').addEventListener('click', deleteCard);
  cardElement.querySelector('.card__image').addEventListener('click',function (event) {
    const targetCard = event.target.closest('.card');
    const imgName = targetCard.querySelector('.card__title').textContent;
    const imgLink = targetCard.querySelector('.card__image').src;
    openImgPopup({ name: imgName,link: imgLink });
  });
  return cardElement;
}

// Создание дефолтных карточек
initialCards.forEach(function(cardItem) {
  const newCard = createCard(cardItem);
  cardsContainer.append(newCard);
});

//Создание новой карточки
function addNewCard(event) {
  event.preventDefault();
  const inputName = newCardName.value;
  const inputLink = newCardLink.value;
  const newCard = createCard({ name: inputName, link: inputLink});
  cardsContainer.prepend(newCard);
  closeCardPopup();
}

  editButton.addEventListener('click', openProfilePopup);
  profileSubmit.addEventListener('click', editProfileData);
  profileCloseButton.addEventListener('click', closeProfilePopup);
  cardButton.addEventListener('click', openCardPopup);
  cardForm.addEventListener('submit', addNewCard);
  cardCloseButton.addEventListener('click', closeCardPopup);
