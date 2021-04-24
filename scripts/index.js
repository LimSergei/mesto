const openPopupButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closePopupButton = document.querySelector('.popup__close-button');

let profileName = document.querySelector('.profile__name');
let profileActivity = document.querySelector('.profile__activity');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_activity');

function togglePopup() {
  popup.classList.toggle('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileActivity.textContent;
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileActivity.textContent = jobInput.value;
  togglePopup();
}

openPopupButton.addEventListener('click', togglePopup);
closePopupButton.addEventListener('click', togglePopup);
formElement.addEventListener('submit', formSubmitHandler);


