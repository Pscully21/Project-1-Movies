var url_global ="https://www.omdbapi.com/?i=tt3896198&apikey=2ad1c934";
var url_movie = "https://www.omdbapi.com/?apikey=2ad1c934&t=saw";
var movie_input=  document.getElementById("movie-name")
var search_button=  document.getElementById("search-btn")
var result = document.getElementById("result");
var get_movies = function () {
    var movie_name= movie_input.value;
    var omdb_url= `https://www.omdbapi.com/?apikey=2ad1c934&t=${movie_name}`
    if (movie_name.length <= 0) {
        result.innerHTML = ` <h3>Please Enter A Movie Name</h3> `;
      }
    else {
    fetch(omdb_url)
    .then(function(omdb_response){
        return omdb_response.json();
    }    )
    .then(function(omdb_data){
        if (omdb_data.Response=='True')
        {
        result.innerHTML =
        ` <h3>Movie Title:     ${omdb_data.Title}</h3>
        <h3>imdbID: ${omdb_data.imdbID}</h3>
        <h3>Imdb Rating: ${omdb_data.imdbRating}</h3>
        // <img src=${omdb_data.Poster} class="poster">
        `
    var movie_id= omdb_data.imdbID;
    console.log(movie_id);
    rapid_api_function(movie_id)
        }
        else {
            result.innerHTML = `<h3 class='msg'>${data.Error}</h3>`;
          }
    }
    )
}
    //     result.innerHTML =
    //     ` <h3>Movie Title:     ${omdb_data.Title}</h3>
    //     <h3>imdbID: ${omdb_data.imdbID}</h3>
    //     <h3>Imdb Rating: ${omdb_data.imdbRating}</h3>
    //     // <img src=${omdb_data.Poster} class="poster">
    //     `
    // var movie_id= omdb_data.imdbID;
    // console.log(movie_id);
    // rapid_api_function(movie_id)
}
var rapid_api_function = function (id) {
    movie_id= id;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '89e91af0f6msh9387950abc09738p19a886jsn1ded029fa197',
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        }
    };
    fetch(`https://streaming-availability.p.rapidapi.com/get/basic?country=us&imdb_id=${movie_id}&output_language=en`, options)
    .then(function(rapid_api_response){
        return rapid_api_response.json();
    }    )
    //PLAY WITH THIS
    .then(function(rapid_api_data) {
        console.log(rapid_api_data)
        console.log(rapid_api_data.overview)
        result2.innerHTML =
        ` <h3>rapid api:     ${rapid_api_data.overview}</h3>
        `
    }    )
    // .then(response => response.json())
    // .then(response => console.log(response))
    // .catch(err => console.error(err));
}
search_button.addEventListener("click", get_movies);
window.addEventListener("load", get_movies);