import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  #name;
  #link;

  constructor(popupSelector) {
    super(popupSelector);

    this.#name = popupSelector.querySelector('.fullscreen__name')
    this.#link = popupSelector.querySelector('.fullscreen__image')
  }

  open(name, link) {
    super.open();
    this.#name.textContent = name;
    this.#link.src = link;
    this.#link.alt = name;
  }
}
