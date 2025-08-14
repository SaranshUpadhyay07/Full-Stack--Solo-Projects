/*
1 meter = 3.281 feet
1 liter = 0.264 gallon
1 kilogram = 2.204 pound
*/ 

let inputValue = document.getElementById("input-value")
let displayDiv = document.getElementById("display-div")
let convertBtn = document.getElementById("convert-btn")
let number =0

convertBtn.addEventListener('click', function(){
    number = Number(inputValue.value)
    render(number)
})

function render(num){
    displayDiv.innerHTML = `
        <ul>
            <li>
               <h4>Length (Meter/Feet) </h4>
               <p> ${num} meters = ${(num*3.281).toFixed(3)} feet| ${num} feet = ${(num/3.281).toFixed(3)} meters</p> 
            </li>
            <li>
                <h4>Volume (Liters/Gallons) </h4>
                <p> ${num} liters = ${(num*0.264).toFixed(3)} gallon| ${num} gallon = ${(num/0.264).toFixed(3)} liters</p> 
            </li>
            <li>
                <h4>Mass (Kilograms/Pound) </h4>
                <p> ${num} kilograms = ${(num*2.204).toFixed(3)} pound| ${num} pound = ${(num/2.204).toFixed(3)} kilograms</p> 
            </li>
        </ul>
    `
}