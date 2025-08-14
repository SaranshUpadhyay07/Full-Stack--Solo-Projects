const characters = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
  "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
  "~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=",
  "{", "[", "}", "]", ",", "|", ":", ";", "<", ">", ".", "?", "/"
];

console.log(characters.length)
function generatePassword(){
    document.getElementById("password1").textContent="";
    document.getElementById("password2").textContent="";
     
     let passLen = document.getElementById("length-selector").value;
    
    if(document.getElementById("Symbol-selector").checked&&document.getElementById("Number-selector").checked){
        for(let i = 0;i<passLen;i++){
            let char1 = characters[Math.floor(Math.random()*characters.length)]
            let char2 = characters[Math.floor(Math.random()*characters.length)]
            document.getElementById("password1").textContent+=char1;
            document.getElementById("password2").textContent+=char2;
        }
    }else if(document.getElementById("Symbol-selector").checked&&!(document.getElementById("Number-selector").checked)){
        const filteredCharacters = characters.filter(char => isNaN(parseInt(char)));
        //got to know from stack overflow
        for(let i = 0;i<passLen;i++){
            let char1 = filteredCharacters[Math.floor(Math.random()*filteredCharacters.length)]
            let char2 = filteredCharacters[Math.floor(Math.random()*filteredCharacters.length)]
            document.getElementById("password1").textContent+=char1;
            document.getElementById("password2").textContent+=char2;
        }
    }else if(!(document.getElementById("Symbol-selector").checked)&&(document.getElementById("Number-selector").checked)){
        for(let i = 0;i<passLen;i++){
            let char1 = characters[Math.floor(Math.random()*62)]
            let char2 = characters[Math.floor(Math.random()*62)]
            document.getElementById("password1").textContent+=char1;
            document.getElementById("password2").textContent+=char2;
        }
    }else{
        for(let i = 0;i<passLen;i++){
            let char1 = characters[Math.floor(Math.random()*52)]
            let char2 = characters[Math.floor(Math.random()*52)]
            document.getElementById("password1").textContent+=char1;
            document.getElementById("password2").textContent+=char2;
        }
    }
}

document.getElementById("generate").addEventListener('click',function(e){
    e.preventDefault();
    generatePassword();
});


