async function movieSearch(keyword) {
    let response = await fetch("https://api.themoviedb.org/3/search/movie?api_key=46ae1d2187fb631facdf70783362f90a&language=en-US&query="+ keyword)
    let json = await response.json()
    return json;
}








$(".searchButton").on('click', async function() { //Main function: Movie Title Search
    $(".titleResults").empty()
      let searchQuery = $(".searchBar").val()
        if (searchQuery == "") {
            alert("I'm sorry, your search did not match any movies in our records. :( Try again to find more movies!")
        } else {
      let searchResult = await movieSearch(searchQuery)
      if (searchResult.results.length == 0) {
        alert("I'm sorry, your search did not match any movies in our records. :( Try again to find more movies!")
        $(".titleResults").append("<p> No movies found containing " + searchQuery + "." + "</p>")
     }
      console.log(searchResult)
     searchResult.results.forEach(i => {
         $(".titleResults").append("<li>"+ i.original_title  + "</li>")
     
     });
  
    }
 
})

/*$(".overview").on('click', async function() {
    searchResult.results.forEach(j=> {
 $(".results").append("<p>" + j.overview + "</p")
})

    alert("Overview of " + i.original_title + ": " + i.overview)
});
*/

async function getTrending(){ //Gets the top trending movies in the database.
    let tmovies = await fetch("https://api.themoviedb.org/3/trending/movie/day?api_key=46ae1d2187fb631facdf70783362f90a")
    let jsont = await tmovies.json()
    return jsont;
}

$(".trendingButton").on('click', async function() {
    $(".trendingResults").empty()
    $(".trendingResults").append("<p>" + "Trending Movies:" + "</p>")
      let trendingResult = await getTrending()
      console.log(trendingResult)
      trendingResult.results.forEach(i => {
          $(".trendingResults").append("<li>" + i.title + "</li>")
      })  
})



