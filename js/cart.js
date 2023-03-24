let products = [
  {
    name: "Vintage Grey",
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
    name: "Old Brown ",
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

function cartNumbers(product, action) {
  let productNumbers = localStorage.getItem("cartNumbers");
  productNumbers = parseInt(productNumbers);
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (action == "decrease") {
    localStorage.setItem("cartNumbers", productNumbers - 1);
    document.querySelector(".cartOrder").textContent = productNumbers - 1;
  } else if (productNumbers) {
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

function totalCost(productCost, action) {
  let cartCost = localStorage.getItem("totalCost");
  if (action == "decrease") {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost - productCost.price);
  } else if (cartCost != null) {
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
      <span>${item.name} </span> 
      </div>
      <div class="price">${item.price}.00nok</div>
      <div class="quantity"><ion-icon class="decrease" name="arrow-back-circle-outline"></ion-icon><span>${
        item.inCart
      }</span><ion-icon class="increase" name="arrow-forward-circle-outline"></ion-icon></div>
      <div class="total">${item.inCart * item.price}.00nok</div>
      `;
    });

    productContainer.innerHTML += `<div class="basketTotalContainer"> <h4 class ="basketTotalTitle"> Basket Total </h4>
                <h4 class="basketTotal">${cartCost}.00nok</h4>
      </div>`;
    productContainer.innerHTML += `<div class="checkOut"> <button class="pay">CheckOut</button> <a href="products.html">continue shopping</a></div>`;
  }

  deleteButtons();
  manageQuantity();
}

function deleteButtons() {
  let deleteButtons = document.querySelectorAll(".product ion-icon");
  let productName;
  let productNumbers = localStorage.getItem("cartNumbers");
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let cartCost = localStorage.getItem("totalCost");

  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", () => {
      productName = deleteButtons[i].parentElement.textContent
        .trim()
        .toLowerCase()
        .replace(/ /g, "");
      console.log(productName);
      localStorage.setItem(
        "cartNumbers",
        productNumbers - cartItems[productName].inCart
      );
      localStorage.setItem(
        "totalCost",
        cartCost - cartItems[productName].price * cartItems[productName].inCart
      );

      delete cartItems[productName];
      localStorage.setItem("productsInCart", JSON.stringify(cartItems));

      displayCart();
      onLoadCartNumbers();
    });
  }
}

function manageQuantity() {
  let decreaseButtons = document.querySelectorAll(".decrease");
  let increaseButtons = document.querySelectorAll(".increase");
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let currentQuantity = 0;
  let currentProduct = "";

  for (let i = 0; i < decreaseButtons.length; i++) {
    decreaseButtons[i].addEventListener("click", () => {
      currentQuantity =
        decreaseButtons[i].parentElement.querySelector("span").textContent;
      console.log(currentQuantity);
      currentProduct = decreaseButtons[
        i
      ].parentElement.previousElementSibling.previousElementSibling
        .querySelector("span")
        .textContent.toLowerCase()
        .replace(/ /g, "")
        .trim();
      console.log(currentProduct);

      if (cartItems[currentProduct].inCart > 1) {
        cartItems[currentProduct].inCart -= 1;
        cartNumbers(cartItems[currentProduct], "decrease");
        totalCost(cartItems[currentProduct], "decrease");
        localStorage.setItem("productsInCart", JSON.stringify(cartItems));
        displayCart();
      }
    });
  }

  for (let i = 0; i < increaseButtons.length; i++) {
    increaseButtons[i].addEventListener("click", () => {
      currentQuantity =
        increaseButtons[i].parentElement.querySelector("span").textContent;
      console.log(currentQuantity);

      currentProduct = decreaseButtons[
        i
      ].parentElement.previousElementSibling.previousElementSibling
        .querySelector("span")
        .textContent.toLowerCase()
        .replace(/ /g, "")
        .trim();
      console.log(currentProduct);

      cartItems[currentProduct].inCart += 1;
      cartNumbers(cartItems[currentProduct]);
      totalCost(cartItems[currentProduct]);
      localStorage.setItem("productsInCart", JSON.stringify(cartItems));
      displayCart();
    });
  }
}
