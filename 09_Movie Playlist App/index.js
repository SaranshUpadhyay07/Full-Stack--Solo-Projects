const searchBtn = document.getElementById('search');
const movieList = document.getElementById('movies-list')

let movieArray = []
let myMap = {}
let i =0

renderList()

document.body.addEventListener('click',function(e){
    for(let j =0;j<=i;j++){
        if(Number(e.target.dataset.btn)===j){
            localStorage.setItem(e.target.id, movieArray[Number(e.target.dataset.btn)])
            renderList()
        }else if(Number(e.target.dataset.delete)===j){
            localStorage.removeItem(e.target.id);
            renderList()
        }

    }
})

searchBtn.addEventListener('click', async () => {
    const searchInput = document.getElementById('search-input').value
    const response = await fetch(`https://www.omdbapi.com/?s=${searchInput}&apikey=edac0cf2`)
    const data = await response.json()
    let html = ''
    i=0
    movieArray = []
    for(let movie of data.Search){

        const newData = await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=edac0cf2&plot=full`)
        const movieData = await newData.json()
        let inner = `<div class="movieItem">
                        <img src="${movieData.Poster !== 'N/A' ? movieData.Poster : 'default.png'}" alt="${movieData.Title}">
                        <div>
                            <div class="movie-item-head"><h3>${movieData.Title}</h3><h4>⭐ ${movieData.imdbRating}</h4></div
                            <div>
                                <div class="movie-item-head adding">
                                    <h4>${movieData.Runtime}</h4>
                                    <h4>${movieData.Genre}</h4>
                                    <button id="${searchInput}-${i}" data-btn="${i}">+</button>
                                </div>
                                <p>${movieData.Plot}</p>
                            </div>
                        </div>
                    </div>`
        html +=inner
        movieArray.push(`<div class="movieItem">
                        <img src="${movieData.Poster !== 'N/A' ? movieData.Poster : 'default.png'}" alt="${movieData.Title}">
                        <div>
                            <div class="movie-item-head"><h3>${movieData.Title}</h3><h4>⭐ ${movieData.imdbRating}</h4></div
                            <div>
                                <div class="movie-item-head adding">
                                    <h4>${movieData.Runtime}</h4>
                                    <h4>${movieData.Genre}</h4>
                                    <button id="${searchInput}-${i}" data-delete="${i}">-</button>
                                </div>
                                <p>${movieData.Plot}</p>
                            </div>
                        </div>
                    </div>`)
        i++
    }
    movieList.innerHTML=html
})

function renderList(){
    let list = ""
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);              // Get the key at index i
        let value = localStorage.getItem(key);      // Get the value for that key
        list+=value
    }
    console.log(list)
    document.getElementById('my-movies-list').innerHTML = list
}
