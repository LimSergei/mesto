export default class UserInfo {

  constructor({userNameSelector, userActivitySelector, userAvatarSelector}) {
    this._userName = document.querySelector(userNameSelector);
    this._userActivity = document.querySelector(userActivitySelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
    this._userId = null;
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      activity: this._userActivity.textContent,
      avatar: this._userAvatar,
      id: this._userId,
    }
  }

  setUserInfo(data) {
    if(data.name) {
      this._userName.textContent = data['name'];
      this._userActivity.textContent = data['about'];
      this._userAvatar.src = data['avatar'];
      this._userId = data['_id']
    }
    else {
      console.log('Ошибка, данные были переданны не через аргументы')
    }
  }
}
