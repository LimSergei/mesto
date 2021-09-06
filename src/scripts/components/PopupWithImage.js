import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {

  constructor(popupSelector) {
    super(popupSelector);

    this._name = popupSelector.querySelector('.fullscreen__name')
    this._link = popupSelector.querySelector('.fullscreen__image')
  }

  open(data) {
    super.open();
    this._name.textContent = data.name;
    this._link.src = data.link;
    this._link.alt = data.name;
  }
}
