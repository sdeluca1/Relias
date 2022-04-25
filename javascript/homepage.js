async function movieSearch(keyword, page) {
    let response = await fetch("https://api.themoviedb.org/3/search/movie?api_key=46ae1d2187fb631facdf70783362f90a&language=en-US&query="+ keyword + "&page=" + page) 
    let json = await response.json()
    return json;
}



$(".searchButton").on('click', async function() { //Main function: Movie Title Search
    $(".titleResults").empty()
    let searchQuery = $(".searchBar").val()
    let pageNumber = $(".searchPage").val()
        if (pageNumber == "") {
            pageNumber = "1"
        }
        if (searchQuery == "") {
            alert("You have not searched any movies. Please enter keywords to search for movies!")
        } else {
        let searchResult = await movieSearch(searchQuery, pageNumber)
        if (searchResult.results.length == 0) {
            alert("I'm sorry, your search did not match any movies in our records. :( Try again to find more movies!")
            $(".titleResults").append("<p> No movies found containing " + searchQuery + "." + "</p>")
        }
        console.log(searchResult)
            $(".titleResults").append("<p> There are " + searchResult.total_results + " results from your search. Currently displaying page " + pageNumber + " of " + searchResult.total_pages + ".")
        searchResult.results.forEach(i => {
            $(".titleResults").append('<li class = "movieTitle">'+ i.original_title + "</li>")  
        });
        }
})


async function ratingSearch(rating, page) {
    let ratingResponse = await fetch("https://api.themoviedb.org/3/discover/movie?api_key=46ae1d2187fb631facdf70783362f90a&language=en-US&page=" + page  + "&vote_average.gte=" + rating)
    let jsonRat = await ratingResponse.json()
    return jsonRat;
}

$(".ratingButton").on('click', async function() {//function to search for movies with an average of the searched rating or higher
    $(".titleResults").empty()
    let ratsq = $(".ratBar").val()
    let pageNumber = $(".ratPage").val()
        if (pageNumber == "") {
            pageNumber = "1"
        }
        if (ratsq == "") {
            alert("You have not searched any ratings. Please enter a rating to search for movies!")
        } else {
        let ratResult = await ratingSearch(ratsq, pageNumber)
        if (ratResult.results.length == 0) {
            alert("I'm sorry, there are no movies with that rating in our records :( Try again to find more movies!")
            $(".titleResults").append("<p> No movies found with a rating of " + ratsq + " or higher." + "</p>")
        }
        console.log(ratResult)
        $(".titleResults").append("<p> There are " + ratResult.total_results + " results from your search. Currently displaying page " + pageNumber + " of " + ratResult.total_pages + ".")
        ratResult.results.forEach(i => {
            $(".titleResults").append('<li class = "avgRat">' + i.original_title + " Average Rating: " + i.vote_average + "</li>")
        });
        }
})


async function yearSearch(year, page) {
    let yearResponse = await fetch("https://api.themoviedb.org/3/discover/movie?api_key=46ae1d2187fb631facdf70783362f90a&language=en-US&page=" + page + "&year=" + year)
    let jsonYear = await yearResponse.json()
    return jsonYear;
}

$(".yearButton").on('click', async function() {
    $(".titleResults").empty()
    let yearsq = $(".yearBar").val()
    let pageNumber = $(".yearPage").val()
        if (pageNumber == "") {
            pageNumber = "1"
        }
        if (yearsq == "") {
            alert("You have not searched a release year. Please enter a year to search for movies!")
        } else {
            let yearResult = await yearSearch(yearsq, pageNumber)
            if (yearResult.results.length == 0) {
                alert("I'm sorry, there are no movies that were released that year in our records :( Try again to find more movies!")
                $(".titleResults").append("<p> No movies released in the year " + yearsq + "." + "</p>")
            }
            console.log(yearResult)
            $(".titleResults").append("<p> There are " + yearResult.total_results + " results from your search. Currently displaying page " + pageNumber + " of " + yearResult.total_pages + ".")
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
          $(".trendingResults").append('<li class = "trendingMovies">' + i.title + "</li>")
      })  
})



