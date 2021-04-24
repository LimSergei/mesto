const openPopupButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closePopupButton = document.querySelector('.popup__close-button');

let profileName = document.querySelector('.profile__name');
let profileActivity = document.querySelector('.profile__activity');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_activity');

function toggleOpenPopup() {
  popup.classList.toggle('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileActivity.textContent;
}

function toggleClosePopup() {
  popup.classList.toggle('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileActivity.textContent = jobInput.value;
  toggleClosePopup();
}

openPopupButton.addEventListener('click', toggleOpenPopup);
closePopupButton.addEventListener('click', toggleClosePopup);
formElement.addEventListener('submit', formSubmitHandler);


