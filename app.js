let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'PRODUCT NAME 1',
        image: '1.PNG',
        price: 120000
    },
    {
        id: 2,
        name: 'PRODUCT NAME 2',
        image: '2.PNG',
        price: 120000
    },
    {
        id: 3,
        name: 'PRODUCT NAME 3',
        image: '3.PNG',
        price: 220000
    },
    {
        id: 4,
        name: 'PRODUCT NAME 4',
        image: '4.PNG',
        price: 123000
    },
    {
        id: 5,
        name: 'PRODUCT NAME 5',
        image: '5.PNG',
        price: 320000
    },
    {
        id: 6,
        name: 'PRODUCT NAME 6',
        image: '6.PNG',
        price: 120000
    }
];
let listCards  = [];



function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
                <div class="quantity-controls">
                    <button onclick="changeQuantity(${key}, getQuantity(${key})-1)">-</button>
                    <div id="quantity-display-${key}" class="count">${getQuantity(key)}</div>
                    <button onclick="changeQuantity(${key}, getQuantity(${key}) + 1)">+</button>
                </div>
            <div class="btn"> 
            <button id="add-to-cart" onclick="addToCard(${key})">Add To Card</button>
            <button id="remove-from-cart" onclick="removeFromCart(${key})">Remove From Cart</button>
            </div>`;
           
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    else{
        listCards[key].quantity +=1;
    }
    reloadCard();
}

function getQuantity(key){
    return listCards[key]?.quantity || 0;
}

function removeFromCart(key) {
    if (listCards[key] != null) {
        delete listCards[key];
       
        updateProductListQuantity(key);

        // const quantityDisplay = document.querySelector(`#quantity-display-${key}`);
        // if(quantityDisplay){
        //     quantityDisplay.innerText = '0';
        // }
        reloadCard();
    } else {
        alert("This product is not in the cart.");
    }
}

function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
                updateProductListQuantity(key);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}


// function changeQuantity(key, quantity) {
//     if (quantity < 0) {
//         alert("Quantity cannot be negative."); // Optional guard against invalid inputs
//         return;
//     }

//     if (quantity === 0) {
//         delete listCards[key];
//     } else {
//         if (!listCards[key]) {
//             // This scenario shouldn't occur since items are added to the cart before changing quantities
//             listCards[key] = JSON.parse(JSON.stringify(products[key]));
//         }
//         listCards[key].quantity = quantity;
//         listCards[key].price = quantity * products[key].price;
//     }
//     reloadCard();
//     updateProductListQuantity(key); // Update quantity on the main product list
// }




function changeQuantity(key, quantity) {
if(quantity < 0){
    alert("Quantity cannot be negative.");
    return;
}

    if (quantity === 0) {
        delete listCards[key];
    } else {
        if (!listCards[key]) {
            listCards[key] = JSON.parse(JSON.stringify(products[key]));
        }
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
    updateProductListQuantity(key); // Update quantity on the main product list
}

function updateProductListQuantity(key){
    const quantityDisplay = document.querySelector(`#quantity-display-${key}`);
    if(quantityDisplay){
        quantityDisplay.innerText = getQuantity(key);
    }
}

// function changeQuantity(key, quantity){
//     if(quantity == 0){
//         delete listCards[key];
//     }else{
//         listCards[key].quantity = quantity;
//         listCards[key].price = quantity * products[key].price;
//     }
//     reloadCard();
// }