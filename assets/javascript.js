var url_global ="https://www.omdbapi.com/?i=tt3896198&apikey=2ad1c934";
var url_movie = "https://www.omdbapi.com/?apikey=2ad1c934&t=saw";
var movie_input=  document.getElementById("movie-name")
var search_button=  document.getElementById("search-btn")

var result = document.getElementById("result-container");
var result_image = document.getElementById("result-image");
var result_rapid = document.getElementById("result_rapid");
var history_button_el = document.querySelector("#history-buttons")
var search_history_array=[]


//Create local storage function
function history_button_load(){
    
    var local_storage_item = localStorage.getItem('movie-search');

    if (local_storage_item) {


        local_storage_item =JSON.parse(local_storage_item);

        for (i=0;i < local_storage_item.length ;i++  ) {

            search_history_array.push(local_storage_item[i]);

        }



    }



    
}





//Create local storage function

var history_button = function(){

   
    var movie_name= movie_input.value.trim();
    console.log(search_history_array);
    

    search_history_array.push(movie_name);
    localStorage.setItem("movie-search", JSON.stringify(search_history_array));
    localStorage.getItem('movie-search')
    console.log(localStorage.getItem('movie-search')  );
    console.log(search_history_array);







}






// Main function below
//will retrieve movie data from OMBD API
//Director data comes from Rapid API
async function load_movies(){

    var movie_name= movie_input.value.trim();


    //OMDB API fetch
    var url_omdb= `https://www.omdbapi.com/?apikey=2ad1c934&t=${movie_name}`
    var res_omdb= await fetch(`${url_omdb}`);
    var data_omdb = await res_omdb.json();


     //Conditional to check if user is entering a valid moviename
    if (movie_name.length <= 0||data_omdb.Response!=='True' ) {
        result.innerHTML = ` <h3>Please Enter A Valid Movie Name</h3> `;
        result_rapid.innerHTML = '';
        result_image.innerHTML ='';
      }

  //If movie name is valid, run the below
      else {

    
    if(res_omdb.ok)   {
        console.log(data_omdb);
        console.log(res_omdb);
        console.log(res_omdb.ok);
        result.innerHTML =''
        result_image.innerHTML= `
        <div class = "movie-poster">
            <img src = "${(data_omdb.Poster != "N/A") ? data_omdb.Poster : "https://www.fillmurray.com/640/360"}" alt = "movie poster">
        </div>`
        result.innerHTML = `
        <div class = "movie-info">
            <h2> <b>Movie Title:</b> ${data_omdb.Title}</h2>
            <p > <b>Rated:</b> ${data_omdb.Rated}</p>
            <p > <b>Writer:</b> ${data_omdb.Writer}</p>



          
            <p > <b>Genre:</b> ${data_omdb.Genre}</p>
            <p > <b>Writer:</b> ${data_omdb.Writer}</p>
            <p class = "actors"> <b>Actors: </b>${data_omdb.Actors}</p>

            <p > <b>Plot:</b>"${(data_omdb.Plot != "N/A") ? data_omdb.Plot : "Sorry, API did not find the plot"}" </p>
            <p ><b>Language:</b> ${data_omdb.Language}</p>
           
        </div>
        `;

        //Rapid AP uses imdbID as the main parameter to find movie
        var movie_id = data_omdb.imdbID;
        console.log(movie_id);
     




            let data_rapid =[]
            rapid_input = movie_id

            //Below Code blocks will help identify if there's an error on the API Call

            try {

                data_rapid = await rapid_api(rapid_input);
                console.log(data_rapid);
            } catch (e) {


                console.log('Error');
                console.log(e);
            }

          
            console.log(data_rapid.significants );
   
          
            //If Rapid API can't find the movie, then replace it with a message. Written as a P tag
            if (data_rapid.significants=== undefined) {
                console.log('yes')
                result_rapid.innerHTML =''
                result_rapid.innerHTML = `
                <p class = "plot"><b>Director:</b> API did not find results, sorry</p>

                `
            }
              //If Rapid API finds the data, retrieve movie director
            else {
                console.log('no')  
                result_rapid.innerHTML =''
                result_rapid.innerHTML = `
                <p class = "language"><b>Director:</b> ${data_rapid.significants}</p>

                `
            }
        
            };

     
            history_button();
            history_button_load(); 


    };




}


//Will retrieve movie data from RAPID API
//If found, will retrieve director name
async function rapid_api(input){

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '89e91af0f6msh9387950abc09738p19a886jsn1ded029fa197',
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        }
    };

    var url_rapid= `https://streaming-availability.p.rapidapi.com/get/basic?country=us&imdb_id=${input}&output_language=en`
    var res_rapid = null




    var res_rapid = await fetch(url_rapid, options)

    var data_rapid = await res_rapid.json();


    return data_rapid;

    




}




