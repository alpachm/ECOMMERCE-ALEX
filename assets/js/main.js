import { products } from "./data.js";

let iconMenu = document.querySelector('.bx-menu-alt-right');
let menuMobile = document.querySelector('.menu__mobile');
let body = document.querySelector('.body');
let moonIcon = document.querySelector('.bx-moon');
let sunIcon = document.querySelector('.bx-sun');
let iconCart = document.querySelector('.bx-cart');
let iconX = document.querySelector('.bx-x');
let menuCart = document.querySelector('.menu__cart');
let productosContainer = document.querySelector('.productos__container');
let boxProducts = document.querySelector('.products');
let emptyCart = document.querySelector('.empty__cart');

let objCart = {};

// PINTAR PRODUCTOS

function printProducts() {
    let html = '';

    products.forEach(({ id, name, price, stock, image }) => {
        html += `
        <div class="box__product">
        <div class="img__product">
          <img src="${image}" alt="">
          <span id="${id}" class="btn_product"><i class='bx bx-plus btn__add'></i></span>
        </div>
        <div class="info__product">
          <span>$${price} <p>| Stock: ${stock}</p></span>
          <span>${name}</span>
        </div>
      </div>
        `

        productosContainer.innerHTML = html;
    })
}

// PINTAR PRODUCTOS EN CARRITO

function printSelectProductCart() {
    let html = '';

    let arrayCart = Object.values(objCart)

    arrayCart.forEach(({ amount, id, image, name, price, stock }) => {
        html += `
      <div id="${id}" class="select__product">
      <div class="image__product">
        <img src="${image}" alt="">
      </div>
      <div class="infoProduct">
        <span>${name}</span>
        <p>Stock: ${stock} | <span class="red">$${price}</span></p>
        <p class="red">Subtotal: $24.00</p>
        <div class="icons__selectProduct">
          <i class='bx bx-minus'></i>
          <p>${amount} units</p>
          <i class='bx bx-plus'></i>
          <i class='bx bx-trash-alt red'></i>
        </div>
      </div>
    </div>
      `
    })

    emptyCart.innerHTML = html;
}

// MENU MOBILE

iconMenu.addEventListener('click', function () {
    menuMobile.classList.toggle('show__menu')
})

// DARKMODE 

moonIcon.addEventListener('click', function () {
    body.className = 'dark__mode';
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
})

sunIcon.addEventListener('click', function () {
    body.className = 'body';
    moonIcon.style.display = 'block';
    sunIcon.style.display = 'none'
})

// MENU CART

iconCart.addEventListener('click', function () {
    menuCart.classList.add('show__menu__cart');
})

iconX.addEventListener('click', function () {
    menuCart.classList.remove('show__menu__cart');
})

// LOGICA CARRITO 

boxProducts.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn__add')) {

        const id = e.target.parentElement.id;

        let selectProduct = products.find((item) => {
            return item.id === id;
        })

        if (objCart[id]) {
            objCart[id].amount++
        } else {
            objCart[id] = {
                ...selectProduct,
                amount: 1
            }
        }
    }

    printSelectProductCart();
})




printProducts();
