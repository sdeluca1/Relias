async function movieSearch(keyword) {
    let response = await fetch("https://api.themoviedb.org/3/search/movie?api_key=46ae1d2187fb631facdf70783362f90a&language=en-US&query="+ keyword)
    let json = await response.json()
    return json;
}



$(".searchButton").on('click', async function() { //Main function: Movie Title Search
    $(".titleResults").empty()
      let searchQuery = $(".searchBar").val()
        if (searchQuery == "") {
            alert("You have not searched any movies. Please enter keywords to search for movies!")
        } else {
      let searchResult = await movieSearch(searchQuery)
      if (searchResult.results.length == 0) {
        alert("I'm sorry, your search did not match any movies in our records. :( Try again to find more movies!")
        $(".titleResults").append("<p> No movies found containing " + searchQuery + "." + "</p>")
     }
      console.log(searchResult)
     searchResult.results.forEach(i => {
         $(".titleResults").append('<li class = "movieTitle>'+ i.original_title  + "</li>")
     });
  
    }
 
})


async function ratingSearch(rating) {
    let ratingResponse = await fetch("https://api.themoviedb.org/3/discover/movie?api_key=46ae1d2187fb631facdf70783362f90a&language=en-US&vote_average.gte=" + rating)
    let jsonRat = await ratingResponse.json()
    return jsonRat;
}

$(".ratingButton").on('click', async function() {//function to search for movies with an average of the searched rating or higher
    $(".titleResults").empty()
    let ratsq = $(".ratBar").val()
        if (ratsq == "") {
            alert("You have not searched any ratings. Please enter a rating to search for movies!")
        } else {
        let ratResult = await ratingSearch(ratsq)
        if (ratResult.results.length == 0) {
            alert("I'm sorry, there are no movies with that rating in our records :( Try again to find more movies!")
            $(".titleResults").append("<p> No movies found with a rating of " + ratsq + " or higher." + "</p>")
        }
        console.log(ratResult)
        ratResult.results.forEach(i => {
            $(".titleResults").append('<li class = "avgRat">' + i.original_title + " Average Rating: " + i.vote_average + "</li>")
        });
        }
})


async function yearSearch(year) {
    let yearResponse = await fetch("https://api.themoviedb.org/3/discover/movie?api_key=46ae1d2187fb631facdf70783362f90a&language=en-US&primary_release_year=" + year)
    let jsonYear = await yearResponse.json()
    return jsonYear;
}

$(".yearButton").on('click', async function() {
    $(".titleResults").empty()
    let yearsq = $(".yearBar").val()
        if (yearsq == "") {
            alert("You have not searched a release year. Please enter a year to search for movies!")
        } else {
            let yearResult = await yearSearch(yearsq)
            if (yearResult.results.length == 0) {
                alert("I'm sorry, there are no movies that were released that year in our records :( Try again to find more movies!")
                $(".titleResults").append("<p> No movies released in the year " + yearsq + "." + "</p>")
            }
            console.log(yearResult)
            yearResult.results.forEach(i => {
                $(".titleResults").append('<li class = "yearRes">' + i.original_title + " Release Date: " + i.release_date + "</li>")
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



