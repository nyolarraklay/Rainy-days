const mainElement = document.querySelector(".home-page");


const div = document.createElement("div");
div.classList.add("blur");
div.classList.add("saleContainer");
const divText = document.createElement("div");
divText.classList.add("divText");
const h2 = document.createElement("h2");
h2.innerText = "Search what suits you";
const p = document.createElement("p");
p.innerText = "Find branded jacket for sale or new arrivals";
const divInput = document.createElement("div");
divInput.classList.add("divInput");
const input = document.createElement("input");
input.className = "search";
input.placeholder ="Search"
const button1 = document.createElement("button");
button1.innerText = "New Arrivals";
const button2 = document.createElement("button");
button2.innerText = "For Sale";
divText.append(h2, p);
divInput.append(input, button1, button2);
div.append(divText, divInput);

document.querySelector(".mainSection").appendChild(div);

button1.addEventListener("click", redirectPage);
button2.addEventListener("click", redirectPage);
input.addEventListener("submit", redirectPage);


function redirectPage(){
  location.href=("products.html");
}

// validation


