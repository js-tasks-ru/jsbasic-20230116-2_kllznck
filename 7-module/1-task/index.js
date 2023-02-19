import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  #categories = [];
  elem = null;
  #ribbonInner;
  #leftArrow;
  #rightArrow;
  #items;

  constructor(categories) {
    this.#categories = categories;
    this.#render();

    this.#ribbonInner = this.elem.querySelector(".ribbon__inner");
    this.#leftArrow = this.elem.querySelector(".ribbon__arrow_left");
    this.#rightArrow = this.elem.querySelector(".ribbon__arrow_right");
    this.#items = this.elem.querySelectorAll(".ribbon__item");

    this.#ribbonInner.addEventListener("scroll", this.#scroll);
    this.#leftArrow.addEventListener("click", this.#offsetLeft);
    this.#rightArrow.addEventListener("click", this.#offsetRight);
    this.#items.forEach((item) => {
      item.addEventListener("click", this.#onItemClick);
    });
  }

  #onItemClick = (event) => {
    event.preventDefault();

    this.#items.forEach((item) => {
      item.classList.remove("ribbon__item_active");
    });
    event.target.closest(".ribbon__item").classList.add("ribbon__item_active");

    const ribbonSelect = new CustomEvent("ribbon-select", {
      detail: event.target.closest(".ribbon__item").dataset.id,
      bubbles: true,
    });

    this.elem.dispatchEvent(ribbonSelect);
  };

  #template() {
    return `
    <div class="ribbon">
      <button class="ribbon__arrow ribbon__arrow_left">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>

      <nav class="ribbon__inner">
        ${this.#categories
          .map(
            (elem) =>
              `
            <a href="#" class="ribbon__item" data-id="${elem.id}">${elem.name}</a>
            `
          )
          .join("")}
      </nav>

      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    </div>
    

    `;
  }

  #render() {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = this.#template();
    this.elem = wrapper.firstElementChild;
  }

  #offsetRight = () => {
    this.#ribbonInner.scrollBy(350, 0);
  };

  #scroll = () => {
    let scrollLeft = this.#ribbonInner.scrollLeft;
    let scrollWidth = this.#ribbonInner.scrollWidth;
    let clientWidth = this.#ribbonInner.clientWidth;
    let scrollRight = scrollWidth - scrollLeft - clientWidth;
    if (scrollLeft !== 0) {
      this.#leftArrow.classList.add("ribbon__arrow_visible");
    } else {
      this.#leftArrow.classList.remove("ribbon__arrow_visible");
    }

    if (scrollRight < 1) {
      this.#rightArrow.classList.remove("ribbon__arrow_visible");
    } else {
      this.#rightArrow.classList.add("ribbon__arrow_visible");
    }
  };

  #offsetLeft = () => {
    this.#ribbonInner.scrollBy(-350, 0);
  };
}
