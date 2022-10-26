var url_global ="https://www.omdbapi.com/?i=tt3896198&apikey=2ad1c934";
var url_movie = "https://www.omdbapi.com/?apikey=2ad1c934&t=saw";
var movie_input=  document.getElementById("movie-name")
var search_button=  document.getElementById("search-btn")
var result = document.getElementById("result");
var get_movies = () => {
    var movie_name= movie_input.value;
    //api link below
    var url= `https://www.omdbapi.com/?apikey=2ad1c934&t=${movie_name}`
    if (movie_name.length <= 0) {
        result.innerHTML = ` <h3>Please Enter A Movie Name</h3> `;
      }
    else {
        fetch(url)
        .then((resp) => resp.json()   )
        .then((data) =>  {
            if (data.Response=='True') {
                result.innerHTML =
                ` <h3>Movie Title:     ${data.Title}</h3>
                <h3>imdbID: ${data.imdbID}</h3>
                <h3>Imdb Rating: ${data.imdbRating}</h3>
                <img src=${data.Poster} class="poster">
                `
            var movie_id= data.imdbID;
            console.log(movie_id);
            }
            else {
                result.innerHTML = `<h3 class='msg'>${data.Error}</h3>`;
              }
        }  );
    }
};
search_button.addEventListener("click", get_movies);
window.addEventListener("load", get_movies);