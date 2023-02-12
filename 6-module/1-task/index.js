/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  elem = null;
  #rows = [];

  constructor(rows) {
    this.#rows = rows;
    this.#render();
    this.#onTableClick();
  }

  #onTableClick = () => {
    const button = this.elem.querySelectorAll("button");
    button.forEach((element) => {
      element.addEventListener("click", () => {
        element.closest("tr").remove();
      });
    });
  };

  #template() {
    return `
    <div>
      <table>
        <thead>
            <tr>
                <th>Имя</th>
                <th>Возраст</th>
                <th>Зарплата</th>
                <th>Город</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
          ${this.#rows
            .map((el) => {
              return `
            <tr>
              <td>${el.name}</td>
              <td>${el.age}</td>
              <td>${el.salary}</td>
              <td>${el.city}</td>
              <td><button class="del">X</button></td>
            </tr>
            `;
            })
            .join("")}
        </tbody>
     </table>
    </div>
    
    `;
  }

  #render() {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = this.#template();
    this.elem = wrapper.firstElementChild;
  }
}
