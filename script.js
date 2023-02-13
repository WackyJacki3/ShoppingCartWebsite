document.addEventListener('DOMContentLoaded', function() {
    let products = document.querySelector(".products-gallery");
    let shoppingCartMenu = document.querySelector(".shoppingCartToggle");
    let removeCartItemButtons;
    let clearCartButton = document.querySelector(".navbar-right-cart-buttons-clear");

    let shopItemsArray = [];

    // Grab items from API and display on cards
    async function fetchProducts(url) {
        let data = await fetch(url);
        let response = await data.json();
        console.log(response);

        for (let i = 0; i < response.length; i++) {
            products.innerHTML += `
            <div class="products-card">
                <img src="${response[i].image}" alt="${response[i].title}" class="products-picture">
                <div class="products-overlay">
                    <h3 class="products-overlay-title">${response[i].title}</h3>
                    <p class="products-overlay-price">$${response[i].price}</p>
                    <button type="button" class="products-overlay-button">ORDER NOW</button>
                </div>
                <div class="itemID">${response[i].id}</div>
            </div>
            `;
        }

        shoppingCartMenu.addEventListener("click", toggleCartMenu);
        getDataForCart();
        clearCartButton.addEventListener("click", clearCart);
    }

    // Function to show cart amount
    function showCartAmount() {
        let cartAmount = document.querySelector(".amountCart");
        let shoppingCartItems = document.querySelectorAll(".navbar-right-display-cart-items");
        let count = 0;
        for (let i = 0; i < shoppingCartItems.length; i++) {
            count++;
        }
        cartAmount.innerHTML = `(${count})`;
    }

    // Function to clear cart
    function clearCart() {
        let shoppingCartItems = document.querySelector(".navbar-items");
        shoppingCartItems.innerHTML = ``;
        shopItemsArray = [];
        getTotalAmount();
        showCartAmount();
    }


    // Function to get Total Amount
    function getTotalAmount() {
        let amountButton = document.querySelector(".totalAmount");
        let amount = 0;
        let getAllAmount= document.querySelectorAll(".itemPrice");
        for (let i = 0; i < getAllAmount.length; i++) {
            amount += parseFloat(getAllAmount[i].innerText.replace('$', ''));
        }
        amountButton.innerHTML = `
            Total: $${amount}
        `;
    }

    // Function for deleting item from cart
    function deleteCartItem(event) {
        let buttonClicked = event.target;
        console.log(buttonClicked);
        let number = buttonClicked.getElementsByClassName("itemDeleteID")[0];
        console.log(number.innerText);
        let itemToDelete = shopItemsArray.indexOf(number.innerText);
        if (itemToDelete !== -1) {
            shopItemsArray.splice(itemToDelete, Infinity);
        }
        buttonClicked.parentElement.parentElement.parentElement.remove();
        getTotalAmount();
        showCartAmount();
    }

    // Function Toggling the shopping cart menu
    function toggleCartMenu() {
        let shoppingCart = document.getElementById("navbar-menu");
        if (shoppingCart.classList.contains("navbar-right-display-cart")) {
            shoppingCart.classList.remove("navbar-right-display-cart");
            shoppingCart.style.visibility="hidden";
            console.log("removed");
        } else {
            shoppingCart.classList.add("navbar-right-display-cart");
            shoppingCart.style.visibility="visible";
        }
        getTotalAmount();
        showCartAmount();
    };

    // Get data for shopping cart
    function getDataForCart() {
        let itemsToAdd = document.querySelectorAll(".products-overlay-button");
        for (let i = 0; i < itemsToAdd.length; i++) {
            let button = itemsToAdd[i];
            button.addEventListener("click", addItemToCart);
        }
    }

    // Count quantity of item in Shopping Cart
    function getQuantity(itemID) {
        let itemQuantity = document.querySelector(".itemQty");
        let qty = 0;
        for (let i = 0; i < shopItemsArray.length; i++) {
            if (shopItemsArray[i] === itemID) {
                qty++;
            }
        }
        return qty;
    }

    // function 

    // Add items to shopping cart
    function addItemToCart(event) {
        let shoppingCartItems = document.querySelector(".navbar-items");
        let button = event.target;
        let cartItem = button.parentElement.parentElement;
        let cartItemID = cartItem.querySelector(".itemID").innerHTML;
        let cartItemTitle = cartItem.querySelector(".products-overlay-title").innerHTML;
        let cartItemPrice = parseFloat(cartItem.querySelector(".products-overlay-price").innerText.replace('$', ''));
        let cartItemImg = cartItem.querySelector(".products-picture").src;
        shopItemsArray.push(cartItemID);
        let itemQty = getQuantity(cartItemID);
        cartItemPrice = cartItemPrice * itemQty;
        if (itemQty <= 1) {
            shoppingCartItems.innerHTML += `
            <div class="navbar-right-display-cart-items">
                <div class="navbar-right-display-cart-items-picture">
                    <img src="${cartItemImg}" alt="${cartItemTitle}">
                </div>
                <div class="navbar-right-display-cart-items-text">
                    <h6>${cartItemTitle}</h6>
                    <p><span class="itemPrice itemPrice${cartItemID}">$${cartItemPrice}</span><span class="${cartItemID}"> x${itemQty}</span></p>
                </div>
                <div class="navbar-right-display-cart-items-delete">
                    <a href="#" class="navbar-right-display-cart-items-delete-button deleteItem${cartItemID}"><i class="fa-solid fa-trash fa-xl"><span class="itemDeleteID">${cartItemID}</span></i></a>
                </div>  
            </div>
            `;
        } else {
            console.log(cartItemID);    
            let x = document.getElementsByClassName(cartItemID)[0];
            let y = document.getElementsByClassName(`itemPrice${cartItemID}`)[0];
            console.log(y);
            x.innerText = ` x${itemQty}`; 
            y.innerText = `$${cartItemPrice}`;
        }
        getTotalAmount();
        showCartAmount();
        removeCartItemButtons = document.querySelectorAll(".navbar-right-display-cart-items-delete-button"); 
        for (let i = 0; i < removeCartItemButtons.length; i++) {
            let button = removeCartItemButtons[i];
            button.addEventListener("click", deleteCartItem);
            console.log(shopItemsArray);
        }
    }


    

        // Add items to shopping cart
    //     let shoppingCartItems = document.querySelector(".navbar-items");
    //     let itemsToAdd = document.querySelectorAll(".products-overlay-button");
    //     console.log(itemsToAdd);
    //     for (let i = 0; i < itemsToAdd.length; i++) {
    //         let button = itemsToAdd[i];
    //         button.addEventListener("click", function(event){
    //             let button = event.target;
    //             let shopItem = button.parentElement.parentElement;
    //             let title = shopItem.querySelector(".products-overlay-title").innerHTML;
    //             let price = shopItem.querySelector(".products-overlay-price").innerHTML;
    //             let imageSrc = shopItem.querySelector(".products-picture").src;
                // shoppingCartItems.innerHTML += `
                // <div class="navbar-right-display-cart-items">
                //     <div class="navbar-right-display-cart-items-picture">
                //         <img src="${imageSrc}" alt="${title}">
                //     </div>
                //     <div class="navbar-right-display-cart-items-text">
                //         <h6>${title}</h6>
                //         <p><span>price: ${price}</span><span> x1</span></p>
                //     </div>
                //     <div class="navbar-right-display-cart-items-delete">
                //         <a href="#" class="navbar-right-display-cart-items-delete-button"><i class="fa-solid fa-trash fa-xl"></i></a>
                //     </div>  
                // </div>
                // `;

    //             // Get delete buttons
                // let removeCartItemButtons = document.querySelectorAll(".navbar-right-display-cart-items-delete-button");
                // console.log(removeCartItemButtons);
                // for (let i = 0; i < removeCartItemButtons.length; i++) {
                //     let button = removeCartItemButtons[i];
                //     button.addEventListener("click", function(event) {
                //         let buttonClicked = event.target;
                //         buttonClicked.parentElement.parentElement.parentElement.remove();
                //     })
                // }
    //         });
    //     }
    // }


    // Toggle shopping cart on and off
    // shoppingCartMenu.addEventListener("click", function() {
    //     let shoppingCart = document.getElementById("navbar-menu");
    //     if (shoppingCart.classList.contains("navbar-right-display-cart")) {
    //         shoppingCart.classList.remove("navbar-right-display-cart");
    //         shoppingCart.style.visibility="hidden";
    //         console.log("removed");
    //     } else {
    //         shoppingCart.classList.add("navbar-right-display-cart");
    //         shoppingCart.style.visibility="visible";
    //         console.log("added");
    //     }
    // });

    // Function to update cart Total
    // function updateCartTotal() {
    //     let shopItemContainer = document.querySelector(".navbar-items");
    //     let shopItems = shopItemContainer.querySelectorAll(".navbar-right-display-cart-items");
    //     for (let i = 0; i < shopItems.length; i++) {
    //         let shopItem = shopItems[i]
    //     }
    // }

    fetchProducts('https://fakestoreapi.com/products?limit=6');
});








