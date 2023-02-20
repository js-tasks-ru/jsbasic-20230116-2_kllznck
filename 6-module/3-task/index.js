export default class Carousel {
  elem = null;
  #slides = [];
  #rightArrow;
  #leftArrow;
  #carouselInner;
  #x = 0;
  #btns;
  #slideindex = 0;

  constructor(slides) {
    this.#slides = slides;
    this.#render();
    this.#rightArrow = this.elem.querySelector(".carousel__arrow_right");
    this.#leftArrow = this.elem.querySelector(".carousel__arrow_left");
    this.#carouselInner = this.elem.querySelector(".carousel__inner");
    this.#leftArrow.style.display = "none";
    this.#rightArrow.addEventListener("click", this.#offsetRight);
    this.#leftArrow.addEventListener("click", this.#offsetLeft);
    this.#btns = this.elem.querySelectorAll(".carousel__button");

    this.#btns.forEach((element) => {
      element.addEventListener("click", this.#onPlusClick);
    });
  }

  #onPlusClick = () => {
    console.log(this.#slides[this.#slideindex].id);
    const productAdd = new CustomEvent("product-add", {
      bubbles: true,
      detail: this.#slides[this.#slideindex].id,
    });
    this.elem.dispatchEvent(productAdd);
  };

  #template() {
    return `
    <div class="carousel">
      
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>

      <div class="carousel__inner">
        ${this.#slides
          .map(
            (el) => `
        <div class="carousel__slide" data-id="penang-shrimp">
          <img src="/assets/images/carousel/${el.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${el.price}</span>
            <div class="carousel__title">${el.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
        `
          )
          .join("")}
      </div>
    </div


    `;
  }

  #render() {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = this.#template();
    this.elem = wrapper.firstElementChild;
  }

  #offsetRight = () => {
    this.#carouselInner.style.transform = `translateX(${(this.#x -=
      this.#carouselInner.offsetWidth)}px)`;
    this.#leftArrow.style.display = "";
    if (
      this.#x <
      -this.#carouselInner.offsetWidth * (this.#slides.length - 2)
    ) {
      this.#rightArrow.style.display = "none";
    }
    ++this.#slideindex;
  };

  #offsetLeft = () => {
    this.#carouselInner.style.transform = `translateX(${(this.#x +=
      this.#carouselInner.offsetWidth)}px)`;
    this.#rightArrow.style.display = "";
    if (this.#x == 0) {
      this.#leftArrow.style.display = "none";
    }
    --this.#slideindex;
  };
}
