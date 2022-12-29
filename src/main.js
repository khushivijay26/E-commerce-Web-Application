let shop = document.getElementById("shop");

let cartShop = JSON.parse(localStorage.getItem("data")) || [];

let search;

let generateProducts = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      let { id, name, price, img } = x;
      search = cartShop.find((x) => x.id === id) || [];
      return `
    <div id=product-id-${id} class="item">
        <img class="productImage" src=${img} alt="">
        <div class="details">
          <h4>${name}</h4>
          <div class="price-quantity">
            <h4>Rs. ${price} </h4>
            <div class="buttons">
            
              <div id="itemQuantity_${id}" class="quantity" >
              <input type="number" id="quantity_${id}" name="quantity_${id}" min="1" max="5" onkeydown="return false;">
              </input>
              </div>
             
            </div>
          </div>
          <button class="addToCart" onclick="addToCart(${id})" id="addToCartBtn_${id}">Add to cart</button>
        </div>
      </div>
    `;
    })
    .join(""));
};

generateProducts();

let addToCart = (id) => {
  // let selectedItem = id;
  let search = cartShop.find((x) => x.id === id);

  let quantity = document.getElementById("quantity_" + id).value;

  let product = shopItemsData.find((x) => x.id === id);

  if (getTotalAmount() + product.price > 1000) {
    alert("Total amount should not be more than 1000, remove some products.");
    return;
  }

  if (search === undefined && quantity>0) {
    cartShop.push({
      id: id,
      item: parseInt(quantity),
    });
    document.getElementById('addToCartBtn_' + id).textContent = "Added To Cart";
  } else {
    return;
  }

  // console.log(cartShop);
  update(id);
  localStorage.setItem("data", JSON.stringify(cartShop));
};

let update = (id) => {
  let search = cartShop.find((x) => x.id === id);
// console.log(search.item);

document.getElementById('itemQuantity_' + id).innerHTML = search.item;
calculation();
};

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = cartShop.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

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



// let increment = (id) => {
//   let selectedItem = id;
//   let search = cartShop.find((x) => x.id === selectedItem.id);
//   let searchItem = 0;

//   if (search === undefined) {
//     cartShop.push({
//       id: selectedItem.id,
//       item: searchItem,
//     });
//   } else {
//     searchItem += 1;
//   }

//   update(selectedItem.id);
//   localStorage.setItem("data", JSON.stringify(cartShop));
// };

// let decrement = (id) => {
//   let selectedItem = id;
//   let search = cartShop.find((x) => x.id === selectedItem.id);

//   if (search === undefined) return;
//   else if (search.item === 0) return;
//   else {
//     search.item -= 1;
//   }
//   update(selectedItem.id);
//   cartShop = cartShop.filter((x) => x.item !== 0);
//   localStorage.setItem("data", JSON.stringify(cartShop));
// };