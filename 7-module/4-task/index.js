import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  value;
  steps;
  #template;
  #slider;
  #valuePercents;
  #sliderValue;
  #thumb;
  #spans;
  constructor({ steps, value = 0 }) {
    this.value = value;
    this.steps = steps;

    this.#template = `
      <div class="slider">
        <div class="slider__thumb">
          <span class="slider__value">${this.value}</span>
        </div>
        <div class="slider__progress"></div>
        <div class="slider__steps">
          `;
    for (let i = 0; i < this.steps; i++) {
      this.#template += `<span></span>`;
    }
    this.#template += `
        </div>
      </div>
    `;

    this.#slider = createElement(this.#template);
    this.#thumb = this.elem.querySelector(".slider__thumb");
    this.#spans = this.elem.querySelectorAll(".slider__steps span");
    this.#sliderValue = this.elem.querySelector(".slider__value");

    this.#valuePercents = (this.value / (this.steps - 1)) * 100;
    this.#thumb.ondragstart = () => false;

    this.#slider.addEventListener("click", this.#onSliderClick);
    this.#sliderMove();

    this.#thumb.addEventListener("pointerdown", this.#pointerDown);
  }

  #onSliderClick = (event) => {
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    this.value = Math.round(leftRelative * (this.steps - 1));
    this.#valuePercents = (this.value / (this.steps - 1)) * 100;

    this.#sliderMove();
    this.#generateCustomEvent();
  };

  #sliderMove() {
    this.#spans.forEach((span) => {
      span.classList.remove("slider__step-active");
    });
    this.#spans[this.value].classList.add("slider__step-active");

    this.#sliderValue.innerHTML = this.value;

    this.#slider.querySelector(".slider__thumb").style.left =
      this.#valuePercents + "%";
    this.#slider.querySelector(".slider__progress").style.width =
      this.#valuePercents + "%";
  }

  #pointerDown = () => {
    this.#slider.classList.add("slider_dragging");
    document.addEventListener("pointermove", this.#pointerMove);
    document.addEventListener("pointerup", this.#pointerUp);
  };

  #pointerMove = (event) => {
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    if (leftRelative < 0) {
      leftRelative = 0;
    }
    if (leftRelative > 1) {
      leftRelative = 1;
    }
    let leftPercents = leftRelative * 100;

    this.#thumb.style.left = `${leftPercents}%`;
    this.elem.querySelector(
      ".slider__progress"
    ).style.width = `${leftPercents}%`;

    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    this.value = Math.round(approximateValue);
    this.#sliderValue.innerHTML = this.value;
  };

  #pointerUp = () => {
    this.#generateCustomEvent();
    document.removeEventListener("pointermove", this.#pointerMove);
    this.elem.classList.remove("slider_dragging");
  };

  #generateCustomEvent = () => {
    const sliderChange = new CustomEvent("slider-change", {
      // имя события должно быть именно 'slider-change'
      detail: this.value, // значение 0, 1, 2, 3, 4
      bubbles: true, // событие всплывает - это понадобится в дальнейшем
    });

    this.elem.dispatchEvent(sliderChange);
  };

  get elem() {
    return this.#slider;
  }
}
