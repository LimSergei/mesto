import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  #submitHandler;
  #resetHandler;
  #inputList;
  #formValues;
  #form;

  constructor(popupSelector, { submitHandler, resetHandler }) {
    super(popupSelector);
    this.#submitHandler = submitHandler;
    this.#resetHandler = resetHandler;
    this.#form = popupSelector.querySelector('.popup__form');
  }

  #getInputValues() {
    this.#inputList = Array.from(this.#form.querySelectorAll('.popup__input'));

    this.#formValues = {};
    this.#inputList.forEach(input => this.#formValues[ input.name ] = input.value);
    return this.#formValues;
  }

  #submitForm(evt) {
    evt.preventDefault();
    this.#submitHandler(this.#getInputValues());
  }

  setEventListeners() {
    super.setEventListeners();
    this.#form.addEventListener('submit', (evt) => this.#submitForm(evt));
  }

  close() {
    super.close();
    this.#form.removeEventListener('submit', (evt) => this.#submitForm(evt));
  }

  resetHandler() {
    this.#resetHandler();
  }
}
