import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  elem = null;
  #closeBtn;

  constructor() {
    this.#render();
    this.#closeBtn = this.elem.querySelector(".modal__close");
    this.#closeBtn.addEventListener("click", this.close);
    document.addEventListener("keydown", this.#keyClose);
  }

  #template() {
    return `<div class="modal">
    <div class="modal__overlay"></div>

    <div class="modal__inner">
      <div class="modal__header">
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>

        <h3 class="modal__title">
          Вот сюда нужно добавлять заголовок
        </h3>
      </div>

      <div class="modal__body">
        A сюда нужно добавлять содержимое тела модального окна
      </div>
    </div>

  </div>`;
  }

  #render() {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = this.#template();
    this.elem = wrapper.firstElementChild;
  }

  open() {
    document.body.append(this.elem);
    document.body.classList.add("is-modal-open");
  }

  setTitle = (modalTitle) => {
    this.elem.querySelector(".modal__title").innerHTML = modalTitle;
  };

  setBody = (modalBody) => {
    let body = this.elem.querySelector(".modal__body");
    body.innerHTML = "";
    body.append(modalBody);
  };

  close = () => {
    document.body.classList.remove("is-modal-open");
    this.elem.remove();
    document.removeEventListener("keydown", this.#keyClose);
  };

  #keyClose = (event) => {
    if (event.key === "Escape") {
      this.close();
    }
  };
}
