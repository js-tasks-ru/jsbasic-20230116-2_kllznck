export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (!product) return;

    const cartItem = this.cartItems.find(
      (item) => item.product.id === product.id
    );
    if (cartItem) {
      cartItem.count++;
      this.onProductUpdate(cartItem);
    } else {
      let newCartItem = { product, count: 1 };
      this.cartItems.push(newCartItem);
      this.onProductUpdate(newCartItem);
    }

    // console.log(this.cartItems);
  }

  updateProductCount(productId, amount) {
    this.cartItems.forEach((item, index) => {
      if (productId === item.product.id) {
        item.count += amount;
        if (item.count <= 0) {
          this.cartItems.splice(index, 1);
        }
        this.onProductUpdate(item);
      }
    });
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    let totalCount = 0;
    for (let element of this.cartItems) {
      // console.log(element.count);
      totalCount += element.count;
    }
    return totalCount;
  }

  getTotalPrice() {
    let totalPrice = 0;
    for (let element of this.cartItems) {
      totalPrice += element.product.price * element.count;
    }
    return totalPrice;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}
