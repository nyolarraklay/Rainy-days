let products = [
  {
    name: "Vintage Grey Jacket",
    tag: "vintagegrey",
    price: 500,
    inCart: 0,
  },
  {
    name: "Red Jacket",
    tag: "redjacket",
    price: 460,
    inCart: 0,
  },
  {
    name: "Black Jacket",
    tag: "blackjacket",
    price: 500,
    inCart: 0,
  },
  {
    name: "Grey Jacket",
    tag: "greyjacket",
    price: 660,
    inCart: 0,
  },
  {
    name: "Scott Black Jacket",
    tag: "scottblackjacket",
    price: 600,
    inCart: 0,
  },
  {
    name: "Old Brown Jacket",
    tag: "oldbrown",
    price: 360,
    inCart: 0,
  },
  {
    name: "Orange Grey Jacket",
    tag: "orangegreyjacket",
    price: 680,
    inCart: 0,
  },
];

let cart = document.querySelectorAll(".addCart");

for (let i = 0; i < cart.length; i++) {
  cart[i].addEventListener("click", () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  });
}

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");

  if (productNumbers) {
    document.querySelector(".cartOrder").textContent = productNumbers;
  }
}

function cartNumbers(product) {
  let productNumbers = localStorage.getItem("cartNumbers");

  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".cartOrder").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".cartOrder").textContent = 1;
  }

  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product,
      };
    }
    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;

    cartItems = {
      [product.tag]: product,
    };
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(productCost) {
  // console.log("price is", productCost.price);
  let cartCost = localStorage.getItem("totalCost");
  console.log("My cart", cartCost);

  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + productCost.price);
  } else {
    localStorage.setItem("totalCost", productCost.price);
  }
}

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".products");
  let cartCost = localStorage.getItem("totalCost");

  console.log(cartItems);

  if (cartItems && productContainer) {
    productContainer.innerHTML = " ";
    Object.values(cartItems).map((item) => {
      productContainer.innerHTML += ` <div class="product">
      <ion-icon name="close-circle-outline"></ion-icon>
      <img src="images/add_to_cart_jackets/${item.tag}.png">
      <span>${item.name}</span>
      </div>
      <div class="price">${item.price}.00nok</div>
      <div class="quantity"><ion-icon class="decrease" name="arrow-back-circle-outline"></ion-icon><span>${
        item.inCart
      }</span><ion-icon class=increase" name="arrow-forward-circle-outline"></ion-icon></div>
      <div class="total">${item.inCart * item.price}.00nok</div>
      `;
    });

    productContainer.innerHTML += `<div class="basketTotalContainer"> <h4 class ="basketTotalTitle"> Basket Total </h4>
                <h4 class="basketTotal">${cartCost}.00nok</h4>
      </div>`;
  }
}

onLoadCartNumbers();

displayCart();
