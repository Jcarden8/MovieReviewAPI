const api_base = "https://api.themoviedb.org/3"
const api_key = "api_key=477f5f5debaf48768ed55d725362b931"
const nowPlaying = "/movie/now_playing?"
const bestRated = "/movie/top_rated?"
const popular = "/movie/popular?"
const upcoming = "/movie/upcoming?"

const searchURL ="https://api.themoviedb.org/3/search/movie?api_key=477f5f5debaf48768ed55d725362b931";

const title = document.querySelector(".title");
const container = document.querySelector(".container");
const form = document.querySelector("#form");
const search = document.querySelector("#search");


const popularBtn = document.querySelector('#popular')
const topRatedBtn = document.querySelector('#topRated')
const upComingBtn = document.querySelector('#upcoming')
const sortAtoZ = document.querySelector('#sortAtoZ')

function getMovies(api){
  fetch(api)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        
        const movie = data.results;
        cardSyntax(movie)
      })
      .catch((err) => console.log(err));
  }
    getMovies(api_base + nowPlaying + api_key)
  
const sort = document.querySelector("#sort-filter");
const dropdown = document.querySelector(".no-content");
sort.addEventListener("click", filter);

function filter() {
  const arrow = document.getElementById("arrow");
  arrow.classList.toggle("rotate-arrow");
  dropdown.classList.toggle("dropdown-content");
  dropdown.classList.toggle("no-content");
}

function cardSyntax(movies) {
  let details = movies.map((item) => {
    return` 
    <a class="card" href="../details/details.html?id=${item.id}">
      <img src="https://image.tmdb.org/t/p/original/${item.poster_path}" alt="">
      <div class="rating">${item.vote_average.toFixed(1)}</div>
    </a>`
  }).join('');
  title.innerHTML = "Now Playing"
  container.innerHTML = details;
}

function mostPopular(popular){
  fetch(popular)
     .then((response) => response.json())
     .then((data) => {
       const movie = data.results;
       cardSyntax(movie)
       title.innerHTML = 'Most Popular'
     })
     .catch((err) => console.log(err));
   }   
popularBtn.addEventListener('click', ()=> {
  mostPopular(api_base + popular + api_key)
})

function topRated(bestRate){
  fetch(bestRate)
     .then((response) => response.json())
     .then((data) => {
       const movie = data.results;
       cardSyntax(movie)
       title.innerHTML = 'Best Rated'
     })
     .catch((err) => console.log(err));
   }   
topRatedBtn.addEventListener('click', ()=> {
  topRated(api_base + bestRated + api_key)
})

function upComing(upcomig){
  fetch(upcomig)
     .then((response) => response.json())
     .then((data) => {
       const movie = data.results;
       cardSyntax(movie)
       title.innerHTML = 'Upcoming'
     })
     .catch((err) => console.log(err));
   }  
upComingBtn.addEventListener('click', ()=> {
  upComing(api_base + upcoming + api_key)
})

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchValue = search.value;
  if (searchValue) {
    getMovies(searchURL +"&query="+ searchValue);

  } else {
    getMovies(api_base + nowPlaying + api_key);
  }

  document.querySelector("#search").value = "";
});
