import menuArray from '/data.js'

const itemsDiv = document.getElementById('items-div')
const pricesDiv = document.getElementById('prices-div')
let amountArray = new Array(menuArray.length).fill(0)
const payBtn = document.getElementById('payment')
const completeBtn = document.getElementById('Complete')
let discountArray = [0,0]

document.addEventListener('click',function(e){
    if(e.target.dataset.add){
        handleAdding(e.target.dataset.add)
    }
    else if(e.target.dataset.remove){
        handleRemove(e.target.dataset.remove)
    }
   else if(e.target.dataset.meal){
        makeMeal(e.target.dataset.meal)
    }else if(e.target.dataset.star){
        rating(e.target.dataset.star)
    }
})

completeBtn.addEventListener("click",function(){
        renderModal()  
})
payBtn.addEventListener('submit', function(e){
    e.preventDefault()
    finalPage()
})

function renderMenuItems(){
    let menuString = menuArray.map(menuItem =>
        `<div class="single-item">
            <div class="item-details">
                <div class="item-emoji">${menuItem.emoji}</div>
                <div>
                    <h3 class="details-para">${menuItem.name}</h3>
                    <p class="details-para ingredients">${menuItem.ingredients}</p>
                    <p class="details-para">$${menuItem.price}</p>
                </div>
            </div>
            <button class="add-btn" data-add="${menuItem.id}">+</button>
        </div>`
    )
    return menuString.join('')
    
}

function updatePricingAndRender(discount=discountArray.reduce((total,current)=>total+current,0)) {
    let pricing = '';
    let total = 0;

    for (let i = 0; i < amountArray.length; i++) {
        let currentItem = menuArray[i];
        if (amountArray[i] !== 0 && (i==0||i==1)) {
            pricing += `
            <div class="billing-item">
                <div class="billing-removal">
                    <h4>${currentItem.name} x ${amountArray[i]}</h4>
                    <button data-remove="${i}">remove</button>
                    <button data-meal="${i}">Make a Meal</button>
                </div>
                <p>$${currentItem.price * amountArray[i]}</p>
            </div>`;
        }
        else if(amountArray[i] !== 0 && i>1) {
             pricing += `
            <div class="billing-item">
                <div class="billing-removal">
                    <h4>${currentItem.name} x ${amountArray[i]}</h4>
                    <button data-remove="${i}">remove</button>
                </div>
                <p>$${currentItem.price * amountArray[i]}</p>
            </div>`;
        }
        total += currentItem.price * amountArray[i];
    }

    if (amountArray.reduce((acc, val) => acc + val, 0) === 0) {
        document.getElementById('prices').classList.add('prices');
    } else {
        document.getElementById('prices').classList.remove('prices');
    }
    total -= discount
    renderBill(pricing, total,discount);
}

function handleAdding(id) {
    amountArray[id]++;
    updatePricingAndRender();
}

function handleRemove(id) {
    amountArray[id]--;
    if(discountArray[id]!=0&&amountArray[id]!=0){
        if(id==0){
           discountArray[id] -=6 
           amountArray[2]--
           alert("Removing your Pizza Meal")
        }
        else{
            discountArray[id] -=5
            amountArray[2]--
            alert("Removing your Hamburger Meal")
        }
    }
    else if(amountArray[0]===0){
        discountArray[0]=0
    }
    else if(amountArray[1]===0){
        discountArray[1]=0
    }
    updatePricingAndRender();
}
function makeMeal(id){
    amountArray[id]++
    amountArray[2]++
    let discount = 0
    if(id==0){
        discountArray[0] += 6
        alert("You have added a meal of Pizza and Beer")
    }else{
        alert("You have added a meal of Hamburger and Beer")
        discountArray[1] += 5
    }
    updatePricingAndRender();
}

function renderBill(pricing, total, discount) {
    document.getElementById('total').innerHTML = `
    <div class="billing-section">
        <div class="total"><h4>Total Bill :</h4> <p>$${total+discount}</p></div>
        <div class="total"><h4>Discount :</h4> <p>$${discount}</p></div>
        <div class="total"><h4>Discounted Bill :</h4> <p>$${total}</p></div>
    </div>`;
    pricesDiv.innerHTML = pricing;
}


function renderModal(){
    document.getElementById('final-payment').style.display = 'block'
}

function finalPage(){
    document.getElementById('final-payment').style.display='none'
    document.getElementById('prices').innerHTML = `
        <div class="final-message">
            Thanks for your Order 🥳
        </div>
        <div class="rating">
            <h4>Rate your Experience</h4>
            <div class="star">
                <i class="fa-regular fa-star" data-star="1" id="star1"></i>
                <i class="fa-regular fa-star" data-star="2" id="star2"></i>
                <i class="fa-regular fa-star" data-star="3" id="star3"></i>
                <i class="fa-regular fa-star" data-star="4" id="star4"></i>
                <i class="fa-regular fa-star" data-star="5" id="star5"></i>
            </div>
        </div>
    `
    
}
function rating(id){
    for(let i = 1;i<=id;i++){
        document.getElementById(`star${i}`).classList.remove('fa-regular')
        document.getElementById(`star${i}`).classList.add('fa-solid')
        document.getElementById(`star${i}`).classList.add('yellow')
    }
}
itemsDiv.innerHTML = renderMenuItems()