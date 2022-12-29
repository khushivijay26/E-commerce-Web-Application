let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");

let cartShop = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = cartShop.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let generateCartItems = () => {
  if (cartShop.length !== 0) {
    return (ShoppingCart.innerHTML = cartShop
      .map((x) => {
        let { id, item } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        return `
      <div class="cart-item">
        <img class="cartImage" src=${search.img} alt="" />
        <div class="details">

          <div class="title-price-x">
              <h4 class="title-price">
                <p>${search.name}</p>
                <p class="cart-item-price">Rs. ${search.price}</p>
              </h4>
              <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
          </div>

          <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div id="cartQuantity_${id}" class="quantity">${item}</div>
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
          </div>

          <h3>Rs. ${search.price}</h3>
        </div>
      </div>
      `;
      })
      .join(""));
  } else {
    ShoppingCart.innerHTML = ``;
    label.innerHTML = `
    <h2>Cart is Empty</h2>
    <a href="index.html">
      <button class="HomeBtn">Back to home</button>
    </a>
    `;
  }
};

generateCartItems();

let increment = (id) => {
  // let selectedItem = id;
  let search = cartShop.find((x) => x.id === id);

  let product = shopItemsData.find((x) => x.id === id);

  if(getTotalAmount()+ product.price > 1000){
    alert("Total amount should not be more than 1000, remove some products.");
    return;
  }

  if (search.item === 5) {
    alert("Maximum quantity you can order is 5")
    return;
  } else {
    search.item ++;
  }

  generateCartItems();
  update(id);
  localStorage.setItem("data", JSON.stringify(cartShop));
};

let decrement = (id) => {
  // let selectedItem = id;
  let search = cartShop.find((x) => x.id === id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(id);
  cartShop = cartShop.filter((x) => x.item !== 0);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(cartShop));
};

let update = (id) => {
  let search = cartShop.find((x) => x.id === id);
  // console.log(search.item);
  document.getElementById('cartQuantity_' + id).innerHTML = search.item;
  calculation();
  TotalAmount();
};

let removeItem = (id) => {
  let selectedItem = id;
  // console.log(selectedItem.id);
  cartShop = cartShop.filter((x) => x.id !== selectedItem.id);
  generateCartItems();
  TotalAmount();
  localStorage.setItem("data", JSON.stringify(cartShop));
};

let clearCart = () => {
  cartShop = [];
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(cartShop));
};

let TotalAmount = () => {
  if (cartShop.length !== 0) {
    let amount = cartShop
      .map((x) => {
        let { item, id } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];

        return item * search.price;
      })
      .reduce((x, y) => x + y, 0); {
    
    }
    // console.log(amount);
    label.innerHTML = `
    <h2 id = "totalText">Total Bill : Rs. ${amount}</h2>
    <button class="checkout">Checkout</button>
    <button onclick="clearCart()" class="removeAll">Clear Cart</button>
    `;
    return amount;
  } else return 0;
};

TotalAmount();

function getTotalAmount() {
  let allCartItems = JSON.parse(localStorage.getItem("data"));
  let amount = allCartItems
      .map((x) => {
        let { item, id } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];

        return item * search.price;
      })
      .reduce((x, y) => x + y, 0); {
    
    }
  return amount;
}


// let totalAmount = 0;
// cartItems.forEach(product => {
//   totalAmount = totalAmount + (product.price * product.item)
// })