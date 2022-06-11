

const API_KEY = 'api_key=02692ab0d73df99344e794e3dac0f3ee';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
const SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY;

const movie_grid = document.getElementById('movie-grid');
const form = document.getElementById('form');
const search = document.getElementById('search');
const button = document.getElementById('button');

getMovies(API_URL);

// This function parses json data from API_URL
function getMovies(url) {

    fetch(url).then(res => res.json()).then(data => {
        //console.log(data.results);
        showMovies(data.results);
    })
}

function showMovies(data) {
    movie_grid.innerHTML = '';

    // loop through the results array to show the data
    //MAY NEED TO CHANGE card TO movie
    data.forEach(movie => {
        //create a div for each movie element
        const {title, poster_path, vote_average} = movie;
        const movieElement = document.createElement('div');  
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
            <img src="${IMAGE_URL+poster_path}" alt="${title}">
                
                <div class="movie_info">
                    <h3>${title}</h3>
                    <span class="${getColor(vote_average)}">${vote_average}</span>
                </div> 

       ` 
       movie_grid.appendChild(movieElement);
    })

}

// Assigns color to votes/rating
function getColor(vote) {
    if(vote>=8){
        return 'green'
    }
    else if(vote >=5){
        return "orange"
    }
    else{
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm) {
        getMovies(SEARCH_URL + '&query=' + searchTerm)
    }
    else{
        getMovies(API_URL);
    }
})