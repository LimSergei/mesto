export default class UserInfo {
  #profileName;
  #profileActivity;

  constructor({profileName, profileActivity}) {
    this.#profileName = profileName;
    this.#profileActivity = profileActivity;
  }

  getUserInfo() {
    return {
      name: this.#profileName.textContent,
      activity: this.#profileActivity.textContent,
    }
  }

  setUserInfo(element) {
    this.#profileName.textContent = element['fullname'];
    this.#profileActivity.textContent = element['activity'];
  }
}
