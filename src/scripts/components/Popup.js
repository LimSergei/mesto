import { escKey } from "../utils/constants";

export default class Popup {
  _popupSelector;

  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === escKey) {
      this.close();
    }
  }

  _handleOverlayClose(evt) {
    if (
      evt.target.classList.contains('popup') ||
      evt.target.classList.contains('popup_opened')
      ) {
      this.close();
    }
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscClose);
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose);
  }

  setEventListeners() {
    const closeButton = this._popupSelector.querySelector('.popup__close-button');
    closeButton.addEventListener('click', () => this.close());
    this._popupSelector.addEventListener('mousedown', (evt) => this._handleOverlayClose(evt))
  }
}
