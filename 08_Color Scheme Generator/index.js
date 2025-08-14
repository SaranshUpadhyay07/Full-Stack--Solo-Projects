const colorPicker = document.getElementById("colorPicker");
const colorSchemeContainer = document.getElementById("color-scheme");

colorPicker.addEventListener('input', function(){
    let color = colorPicker.value
    document.getElementById("container").style.border = `5px solid ${color}`;
    document.getElementById("generate").style.backgroundColor =  color;
})

document.querySelector("#color-form").addEventListener('submit', function(event) {
    event.preventDefault();

    let color = colorPicker.value.replace("#", "");
    let mode = document.getElementById("mode").value

    fetch(`https://www.thecolorapi.com/scheme?hex=${color}&format=json&mode=${mode}&count=6`,{method:'GET'})
            .then(response => response.json())
            .then(data => {
                let colorArray = data.colors;
                let html =""
                let index =1
                for(let color of colorArray){
                    html += `
                        <div class="color color-${index}">
                            <div class="color-generated"style="background-color:${color.hex.value};">
                            </div>
                            <p>${color.hex.value}</p>
                        </div>
                    `
                    index++
                }
                console.log(html);
                colorSchemeContainer.innerHTML = html;
            })
})