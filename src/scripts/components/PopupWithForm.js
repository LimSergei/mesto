import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {

  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = popupSelector.querySelector('.popup__form');
  }

  _getInputValues() {
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[ input.name ] = input.value);
    return this._formValues;
  }

  _submitForm(evt) {
    evt.preventDefault();
    this._submitHandler(this._getInputValues());
  }

  submitFormHandler(handler) {
    this._submitHandler = handler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => this._submitForm(evt));
  }
}
