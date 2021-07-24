export default class Section {
  #items;
  #renderer;
  #containerSelector;

  constructor({ items, renderer }, containerSelector) {
    this.#items = items;
    this.#renderer = renderer;
    this.#containerSelector = containerSelector;
  }

  renderItems() {
    this.#items.forEach(item => {
      this.#renderer(item);
    });
  }

  addItem(element) {
    this.#containerSelector.prepend(element);
  }
}
