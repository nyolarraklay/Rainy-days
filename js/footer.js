const contact = document.querySelector(".SM-box1");
const cartProduct = document.querySelector(".SM-box2 p");

const shoppingBox = document.querySelector(".SM-box3");
const ourProduct = document.querySelector(".productBox");
const button = document.querySelector(".homeButton");

function redirectToCart() {
  location.href = "cart.html";
}

cartProduct.addEventListener("click", redirectToCart);

function redirectToContact() {
  location.href = "contact.html";
}

contact.addEventListener("click", redirectToContact);

function redirectToAbout() {
  location.href = "contact.html";
}

shoppingBox.addEventListener("click", redirectToAbout);

function redirectToProduct() {
  location.href = "products.html";
}

ourProduct.addEventListener("click", redirectToProduct);
button.addEventListener("click", redirectToProduct);
