let products = [
  {
    id: crypto.randomUUID(),
    name: 'Hoodies',
    price: '14.00',
    stock: 10,
    image: './assets/images/featured1.png'
  },
  {
    id: crypto.randomUUID(),
    name: 'Shirt',
    price: '24.00',
    stock: 15,
    image: './assets/images/featured2.png'
  },
  {
    id: crypto.randomUUID(),
    name: 'Sweatshirts',
    price: '24.00',
    stock: 20,
    image: './assets/images/featured3.png'
  },

]

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
let emptyCart = document.querySelector('.text__empty__cart');
let productCartContainer = document.querySelector('.select_product_container');
let totalCart = document.querySelector('.total__cart');
let numCart = document.querySelector('.num__cart');
let header = document.querySelector('header');
let floatBtn = document.querySelector('.float__btn');

let objCart = {};

// PINTAR PRODUCTOS

function printProducts() {
  let html = '';

  if (!products.length) {
    productosContainer.innerHTML = `
    <div class="empty__products">
    <div class="img__empty__products">
      <img src="./assets/images/empty-cart.png" alt="">
    </div>

    <div class="text__empty__products">
      <h3>¡Sorry!, we don't have products in stock now</h3>
    </div>
  </div>
    `
  } else {
    products.forEach(({ id, name, price, stock, image }) => {
      html += `
          <div class="box__product ${name}">
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


}

// PINTAR PRODUCTOS EN CARRITO

function printSelectProductCart() {
  let html = '';

  let arrayCart = Object.values(objCart)
  let subTotal = 0;

  if (!arrayCart.length) {
    emptyCart.style.display = 'flex'
    productCartContainer.style.display = 'none'


  } else {
    emptyCart.style.display = 'none'
    productCartContainer.style.display = 'grid'

    arrayCart.forEach(({ amount, id, image, name, price, stock }) => {

      subTotal = price * amount

      html += `
        
          <div class="select__product">
          <div class="image__product">
            <img src="${image}" alt="">
          </div>
          <div class="infoProduct">
            <span>${name}</span>
            <p>Stock: ${stock} | <span class="red">$${price}</span></p>
            <p class="red">Subtotal: $${subTotal}.00</p>
            <div id="${id}" class="icons__selectProduct">
              <i class='bx bx-minus'></i>
              <p>${amount} units</p>
              <i class='bx bx-plus'></i>
              <i class='bx bx-trash-alt red'></i>
            </div>
          </div>
        </div>
          `
    })

  }

  productCartContainer.innerHTML = html;
}

function printTotalCart() {
  let arrayCart = Object.values(objCart);

  if (!arrayCart.length) {
    totalCart.innerHTML = `
  <div class="price__total">
        <span>0 items</span>
        <span>$0.00</span>
      </div>
      <button class="btn__of">Comprar</button>
  `
  } else {

    let totalPrice = 0;
    let totalAmount = 0;

    arrayCart.forEach(({ amount, price }) => {
      totalPrice += (price * amount)
      totalAmount += amount
    })

    totalCart.innerHTML = `
    <div class="price__total">
          <span>${totalAmount} items</span>
          <span>$${totalPrice}.00</span>
        </div>
        <button class="btn__of btn__buy">Comprar</button>
    `
  }
}

// NUMERO CARRITO 

function printNumCart() {
  let arrayCart = Object.values(objCart);
  let totalAmount = 0;

  arrayCart.forEach(({ amount }) => {
    totalAmount += amount;
  })

  if (!arrayCart.length) {
    numCart.style.display = 'none'
  } else {
    numCart.style.display = 'flex'
    numCart.innerHTML = `${totalAmount}`
  }
}

// MENU MOBILE

const menuMobileA = document.querySelectorAll('.menu__mobile a')

function clickear() {
  menuMobile.classList.toggle('show__menu')
}

iconMenu.addEventListener('click', clickear)
menuMobileA.forEach((item) => {
  item.addEventListener('click', clickear)
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
      if (selectProduct.stock <= objCart[id].amount) {
        Swal.fire({
          icon: 'error',
          title: 'No hay más disponibles',
          text: '¡Lo sentimos! No hay tenemos mas en stock',
        })
        return
      } else {
        objCart[id].amount++
      }
    } else {
      objCart[id] = {
        ...selectProduct,
        amount: 1
      }
    }

  }

  printSelectProductCart();
  printTotalCart();
  printNumCart();
})

menuCart.addEventListener('click', function (e) {

  const id = e.target.parentElement.id

  let selectProduct = products.find((item) => {
    return item.id === id
  })

  if (e.target.classList.contains('bx-minus')) {
    if (objCart[id].amount <= 1) {

      Swal.fire({
        title: '¿Esta seguro de eliminar este producto?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Eliminado',
            'El producto ha sido eliminado',
            'success',
          ),
            delete objCart[id]
          printSelectProductCart();
          printTotalCart();
          printNumCart();
        }
      })

    } else {
      objCart[id].amount--
    }

  }

  if (e.target.classList.contains('bx-plus')) {
    if (objCart[id].amount >= selectProduct.stock) {
      Swal.fire({
        icon: 'error',
        title: 'No hay más disponibles',
        text: '¡Lo sentimos! No hay tenemos mas en stock',
      })
      return
    } else {
      objCart[id].amount++
    }

  }

  if (e.target.classList.contains('bx-trash-alt')) {
    Swal.fire({
      title: '¿Esta seguro de eliminar este producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Eliminado',
          'El producto ha sido eliminado',
          'success',
        ),
          delete objCart[id]
        printSelectProductCart();
        printTotalCart();
        printNumCart();
      }
    })
  }

  if (e.target.classList.contains('btn__buy')) {
    let newArray = [];

    Swal.fire({
      title: '¿Estás seguro de realizar la compra?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          '¡Muchas gracias!',
          'Su compra se ha realizado con exito',
          'success'
        ),
          products.forEach((item) => {

            if (item.id === objCart[item.id]?.id) {
              newArray.push({
                ...item,
                stock: item.stock - objCart[item.id].amount
              })
            } else {
              newArray.push(item)
            }
          })

        products = newArray.filter((item) => {
          if (!item.stock < 1) {
            return item
          }
        })

        objCart = {};

        printProducts();
        printSelectProductCart();
        printTotalCart();
        printNumCart();

      }
    })
  }

  printSelectProductCart();
  printTotalCart();
  printNumCart();
})

// HEADER 

window.addEventListener('scroll', function () {
  if (window.scrollY > 70) {
    header.classList.add('header__scroll')
  } else {
    header.classList.remove('header__scroll')
  }

  if (window.scrollY > 400) {
    floatBtn.classList.add('float__btn__active')
  } else {
    floatBtn.classList.remove('float__btn__active')
  }

})


printProducts();
printTotalCart();
printNumCart();

mixitup('.productos__container', {
  selectors: {
    target: '.box__product'
  },
  animation: {
    duration: 300
  }
});

