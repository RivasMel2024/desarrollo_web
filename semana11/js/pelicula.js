const credenciales = {
		'x-rapidapi-key': '7ff1cd27damsh2e0966e868d2be1p1b7272jsn986b1fe52c60',
		'x-rapidapi-host': 'imdb-top-100-movies.p.rapidapi.com'
	}

async function fetchMovies() {
    const url = 'https://imdb-top-100-movies.p.rapidapi.com/';
    const options = {
        method: 'GET',
        headers: credenciales
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        showMovies(result)
    } catch (error) {
        console.error(error);
    }
}


function showMovies(movies){
    const moviesContainer = document.querySelector('#movies')
    let html = ""
    movies.forEach(movie => {
        html += `
        <div class="col-md-3">
            <div class="card"> 
                <img src="${movie.image}" class="card-img-top movie-poster" data-id="${movie.id}" data-bs-target="#movieModal" data-bs-toggle="modal">
                <div class="card-body">
                    <h5 class="card-title"> ${movie.title} </h5>
                    <p>${movie.description}</p>
                </div>                    
            </div>
        </div>
        `
    });

    moviesContainer.innerHTML = html;

    document.querySelectorAll(".movie-poster").forEach(img=>{
        img.addEventListener('click', (e)=>{
            const movieId =e.target.getAttribute('data-id')
            showMovieDetails(movieId)
        })
    })
}

async function showMovieDetails(mId) {
    const url = 'https://imdb-top-100-movies.p.rapidapi.com/'+mId;
    const options = {
        method: 'GET',
        headers: credenciales
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        
        document.getElementById("movieDirector").textContent = result.director
        document.getElementById("movieRating").textContent = result.rating
        document.getElementById("movieYear").textContent = result.year
        document.getElementById("moviePoster").src = result.image
        document.getElementById("movieModalLabel").textContent = result.title

    } catch (error) {
        console.error(error);
    }
}

fetchMovies()