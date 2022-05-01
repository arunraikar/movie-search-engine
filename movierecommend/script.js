let BASE_URL = 'https://api.themoviedb.org/3';
let API_KEY = 'api_key=7394b2b553a724131ba100e386a164dc';
let discover_key = '/discover/movie?';
let IMG_URL = 'https://image.tmdb.org/t/p/w500/';
let main = document.getElementById('main')
let search = document.getElementById('search');
let discover_api = BASE_URL + discover_key + API_KEY;
let SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY;
let form = document.getElementById('form');

function geturl(url) {
fetch(url).then(resp => resp.json()).then(data => 
    getdata(data.results)
    )
}

function getdata(data) {
    main.innerHTML = '';
data.forEach(movie => {
    
    const {original_title,overview,poster_path,vote_average} = movie;
    let outer = document.createElement('div');
    outer.classList.add('movietitle');
    outer.innerHTML = `
    <div  class="image"><img src="${IMG_URL+poster_path}" alt="${original_title}"></div>
        
    
        <div class="info">
            <h3 class="title">${original_title}</h3> <span>
                <h5>${vote_average}</h5>
            </span>
            <p>${overview}</p>
            </div>
    
    
    `
    main.append(outer);
})


}
form.addEventListener('submit', e => {
e.preventDefault();
let searchterm = search.value;
if(searchterm){
    geturl(SEARCH_URL + '&query=' + searchterm);
} else{
    geturl(discover_api);
}
})

geturl(discover_api);
