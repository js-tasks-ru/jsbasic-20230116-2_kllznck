import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  value;
  steps;
  #template;
  #slider;
  #spans;
  #sliderValue;
  #valuePercents;
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
    this.#valuePercents = (this.value / (this.steps - 1)) * 100;
    this.#sliderValue = this.#slider.querySelector(".slider__value");
    this.#spans = this.#slider.querySelectorAll(".slider__steps span");
    this.#slider.addEventListener("click", this.#onSliderClick);
    this.#sliderMove(this.value);
  }

  #onSliderClick = (event) => {
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    this.value = Math.round(leftRelative * (this.steps - 1));
    this.#valuePercents = (this.value / (this.steps - 1)) * 100;

    this.#sliderMove(this.value);

    const sliderChange = new CustomEvent("slider-change", {
      // имя события должно быть именно 'slider-change'
      detail: this.value, // значение 0, 1, 2, 3, 4
      bubbles: true, // событие всплывает - это понадобится в дальнейшем
    });

    this.elem.dispatchEvent(sliderChange);
  };

  #sliderMove(value) {
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

  get elem() {
    return this.#slider;
  }
}
