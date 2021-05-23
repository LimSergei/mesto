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
const cardTemplate = document.querySelector('#card-template');
const cardsContainer = document.querySelector('.cards');
const imgPopup = document.querySelector('.popup_fullscreen');
const img = document.querySelector('.fullscreen');
const imgCloseButton = img.querySelector('.popup__close-button');
const newCardName = cardForm.querySelector('.popup__input_type_name');
const newCardLink = cardForm.querySelector('.popup__input_type_activity');
const cardLink = document.querySelector('.fullscreen__image');
const cardName = document.querySelector('.fullscreen__name');

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

// Открытие попапа добавления новой карточки + скрытие ошибок формы
function openAddPopup() {
  openPopup(cardPopup);
}

// Закрытие попапа добавления новой карточки
function closeCardPopup() {
  const formButton = cardForm.querySelector('.popup__form-button');
  closePopup(cardPopup);
  cardForm.reset();
  formButton.disabled = true;
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

// Формирование карточки + лайк + удаление
function createCard(element) {
  const cardElement = cardTemplate.content.cloneNode(true);
  const cardElementImg = cardElement.querySelector('.card__image');
  cardElementImg.src = element.link;
  cardElement.querySelector('.card__title').textContent = element.name;
  cardElementImg.alt = element.name;
  cardElement.querySelector('.card__like').addEventListener('click', likeCard);
  cardElement.querySelector('.card__trash').addEventListener('click', deleteCard);
  cardElementImg.addEventListener('click', ()=> openImgPopup({ name: element.name,link: element.link }));
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
  profileForm.addEventListener('submit', editProfileData);
  profileCloseButton.addEventListener('click', closeProfilePopup);
  cardButton.addEventListener('click', openAddPopup);
  cardForm.addEventListener('submit', addNewCard);
  cardCloseButton.addEventListener('click', closeCardPopup);
  imgCloseButton.addEventListener('click',()=> closePopup(imgPopup));

