export default class UserInfo {
  #profileName;
  #profileActivity;
  #formEditProfile;
  #nameInput;
  #activityInput;

  constructor({profileName, profileActivity}) {
    this.#profileName = profileName;
    this.#profileActivity = profileActivity;
  }

  getUserInfo() {
    this.#formEditProfile = document.querySelector('.popup__form');
    this.#nameInput = this.#formEditProfile.querySelector('#profile-name')
    this.#activityInput = this.#formEditProfile.querySelector('#profile-activity')

    this.#nameInput.value = this.#profileName.textContent;
    this.#activityInput.value = this.#profileActivity.textContent;
  }

  setUserInfo(element) {
    this.#profileName.textContent = element['fullname'];
    this.#profileActivity.textContent = element['activity'];
  }
}
