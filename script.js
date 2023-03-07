"use strict";

// Selecting elements
const cards = document.querySelector(".cards");
const cartBtn = document.querySelector(".cart__btn");
const cartList = document.querySelector(".cart__list");
const badge = document.querySelector(".cart_badge");
const modal = document.querySelector(".modal");

let badgeNum = 0;
badge.textContent = badgeNum;

// data
let products = [
  {
    product_name: "fancy red lighter",
    product_price: 35.0,
    product_image: "image-1.jpg",
    added_to_cart: false,
  },
  {
    product_name: "canon camera",
    product_price: 80.0,
    product_image: "image-2.jpg",
    added_to_cart: false,
  },
  {
    product_name: "ice cream",
    product_price: 10.0,
    product_image: "image-3.jpg",
    added_to_cart: false,
  },
  {
    product_name: "queen perfume",
    product_price: 90.0,
    product_image: "image-4.jpg",
    added_to_cart: false,
  },
  {
    product_name: "men perfume",
    product_price: 70.0,
    product_image: "image-5.jpg",
    added_to_cart: false,
  },
  {
    product_name: "blue marker",
    product_price: 5.0,
    product_image: "image-6.jpg",
    added_to_cart: false,
  },
];

// check localStorage data
if (localStorage.getItem("products")) {
  products = JSON.parse(localStorage.getItem("products"));
} else {
  localStorage.setItem("products", JSON.stringify(products));
}

// read products in the cart
const readCartData = () => {
  cartList.innerHTML = "";

  // if the cart is empty, show empty cart message
  if (!badgeNum) {
    cartList.innerHTML = `<p class="cart_empty">no cart items</p>`;
  }

  products.forEach((product, i) => {
    if (product.added_to_cart) {
      cartList.innerHTML += `<li class="cart__item">
      <img
        src="img/${product.product_image}"
        alt="product image"
        class="cart__item-img"
      />
      <div class="cart__item-text">
        <h5 class="cart__item-head">${product.product_name}</h5>
        <div class="cart__item-price">$${product.product_price.toFixed(2)}</div>
      </div>
      <button onclick="updateProduct(${i})" class="cart__btn-delete">&times;</button>
    </li>`;
    }
  });
};

// read products data
const readData = () => {
  cards.innerHTML = "";
  products.forEach((product, i) => {
    cards.innerHTML += `<div class="card">
    <img src="img/${
      product.product_image
    }" alt="card image" class="card__img" />
    <div class="card__about-box">
    <h5 class="card__heading">${product.product_name}</h5>
    <div class="card__price">$${product.product_price.toFixed(2)}</div>
    <div class="actions-box">
    <button onclick="updateProduct(${i})" class="btn">${
      product.added_to_cart ? "Remove from cart" : "Add to cart"
    }</button>
      <button onclick="viewProduct(${i})" class="btn">View product</button>
      </div>
      </div>
</div>`;
  });

  // number of products in cart
  badgeNum = products.filter(
    (product) => product.added_to_cart === true
  ).length;
  badge.textContent = badgeNum;

  // read cart data after products data is added
  readCartData();

  localStorage.setItem("products", JSON.stringify(products));
};
readData();

// read modal data
const readModalData = (index) => {
  modal.innerHTML = `<div class="modal__box">
  <button onclick="closeModal()" class="close-modal">&times;</button>
  <img src="img/${
    products[index].product_image
  }" alt="product image" class="modal__img" />
  <div class="modal__about-box">
    <h5 class="modal__heading">${products[index].product_name}</h5>
    <div class="modal__price">$${products[index].product_price.toFixed(2)}</div>
    <div class="actions-box">
      <button onclick="updateProduct(${index})" class="btn w-100">${
    products[index].added_to_cart ? "Remove from cart" : "Add to cart"
  }</button>
    </div>
  </div>
</div>
<div onclick="closeModal()" class="overlay"></div>`;
};

// helper func to view product data
const viewProduct = (index) => {
  readModalData(index);
  modal.classList.remove("hidden");
};

// helper func to update the products
const updateProduct = (index) => {
  products[index].added_to_cart = !products[index].added_to_cart;
  readData();

  // if modal is open, update the modal data
  if (!modal.classList.contains("hidden")) {
    readModalData(index);
  }
};

// action that happens when cart button is clicked
cartBtn.addEventListener("click", () => {
  cartList.classList.toggle("hidden");
});

// helper func to close the modal
const closeModal = () => {
  modal.classList.add("hidden");
};

// close model when press esc key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
