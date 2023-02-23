import createElement from "../../assets/lib/create-element.js";
import ProductCard from "../../6-module/2-task/index.js";

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.#render();
    this.updateFilter();
  }

  #render() {
    this.elem = createElement(`
    <div class="products-grid">
      <div class="products-grid__inner">
        <!--ВОТ ТУТ БУДУТ КАРТОЧКИ ТОВАРОВ-->
      </div>
    </div>
    `);
  }

  updateFilter(filters) {
    this.filters = Object.assign(this.filters, filters);
    let filtered = this.products;
    let card;

    if (this.filters) {
      for (const [key, value] of Object.entries(this.filters)) {
        if (key === "noNuts" && value === true) {
          filtered = filtered.filter((item) => item["nuts"] !== value);
        }
        if (key === "vegeterianOnly" && value === true) {
          filtered = filtered.filter((item) => item["vegeterian"] === value);
        }
        if (key === "maxSpiciness") {
          filtered = filtered.filter((item) => item["spiciness"] <= value);
        }
        if (key === "category" && value) {
          filtered = filtered.filter((item) => item["category"] === value);
        }
      }
    }

    this.elem.querySelector(".products-grid__inner").innerHTML = "";
    filtered.forEach((product) => {
      card = new ProductCard(product);
      this.elem.querySelector(".products-grid__inner").append(card.elem);
    });
  }
}
