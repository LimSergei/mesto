export default class Popup {
  #popupSelector;

  constructor(popupSelector) {
    this.#popupSelector = popupSelector;
  }

  #handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  #handleOverlayClose(evt) {
    if (
      evt.target.classList.contains('popup') ||
      evt.target.classList.contains('popup_opened')
      ) {
      this.close();
    }
  }

  open() {
    this.#popupSelector.classList.add('popup_opened');
    document.addEventListener('keyup', (evt) => this.#handleEscClose(evt));
  }

  close() {
    this.#popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keyup', this.#handleEscClose);
    this.#popupSelector.removeEventListener('click', this.#handleOverlayClose);
  }

  setEventListeners() {
    const closeButton = this.#popupSelector.querySelector('.popup__close-button');
    closeButton.addEventListener('click', () => this.close());
    this.#popupSelector.addEventListener('mousedown', (evt) => this.#handleOverlayClose(evt))
  }
}
