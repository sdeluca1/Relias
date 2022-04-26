//Everything for searching by movie below.
async function movieSearch(keyword, page) {
    let response = await fetch("https://api.themoviedb.org/3/search/movie?api_key=46ae1d2187fb631facdf70783362f90a&language=en-US&query="+ keyword + "&page=" + page) 
    let json = await response.json()
    return json;
}
//Main function: Movie Title Search.
$(".searchButton").on('click', async function() { 
    $(".titleResults").empty()
    let searchQuery = $(".searchBar").val()
    let pageNumber = $(".searchPage").val()
        if (pageNumber == "") {
            pageNumber = "1"
        }if (pageNumber > 500) {
            alert("Page number must be less than or equal to 500, per TMDB.")
            return;
        }
        if (searchQuery == "") {
            alert("You have not searched any movies. Please enter keywords to search for movies!")
        } else {
        let searchResult = await movieSearch(searchQuery, pageNumber)
        if (searchResult.results.length == 0) {
            if (pageNumber > searchResult.total_pages) { //Check for page number > total pages.
                pageNumber = searchResult.total_pages
                searchResult = await movieSearch(searchQuery, pageNumber)
            } else {
            alert("I'm sorry, your search did not match any movies in our records. :( Try again to find more movies!")
            $(".titleResults").append("<p> No movies found containing " + searchQuery + "." + "</p>")
            }
        }
            $(".titleResults").append("<p> There are " + searchResult.total_results + " results from your search. Currently displaying page " + pageNumber + " of " + searchResult.total_pages + ".</p>")
            searchResult.results.forEach(i => {
                $(".titleResults").append('<ul class = "movieTitle">'+ i.original_title + "</ul>")  
        });
    }
})

//Everything for searching by rating below.
async function ratingSearch(rating, page) {
    let ratingResponse = await fetch("https://api.themoviedb.org/3/discover/movie?api_key=46ae1d2187fb631facdf70783362f90a&language=en-US&page=" + page  + "&vote_average.gte=" + rating)
    let jsonRat = await ratingResponse.json()
    return jsonRat;
}

//Function to search for movies with an average of the searched rating or higher.
$(".ratingButton").on('click', async function() {
    $(".titleResults").empty()
    let ratsq = $(".ratBar").val()
    let pageNumber = $(".ratPage").val()
        if (pageNumber == "") {
            pageNumber = "1"
        } if (pageNumber > 500) {
            alert("Page number must be less than or equal to 500, per TMDB.")
            return;
        }
        if (ratsq == "") {
            alert("You have not searched any ratings. Please enter a rating to search for movies!")
        } else {
            let ratResult = await ratingSearch(ratsq, pageNumber)
            if (ratResult.results.length == 0) {
                if (pageNumber > ratResult.total_pages) { //Check for page number > total pages.
                    pageNumber = ratResult.total_pages
                    ratResult = await ratingSearch(ratsq, pageNumber)
            } else {
            alert("I'm sorry, there are no movies with that rating in our records :( Try again to find more movies!")
            $(".titleResults").append("<p> No movies found with a rating of " + ratsq + " or higher." + "</p>")
            }
        }
            $(".titleResults").append("<p> There are " + ratResult.total_results + " results from your search. Currently displaying page " + pageNumber + " of " + ratResult.total_pages + ".</p>")
            ratResult.results.forEach(i => {
                $(".titleResults").append('<ul class = "avgRat">' + i.original_title + '<ol class = "average">' + "Average Rating: " + i.vote_average + "</ol>" + "</ul>")
        });
    }
})
//Everything for searching by year below.
async function yearSearch(year, page) {
    let yearResponse = await fetch("https://api.themoviedb.org/3/discover/movie?api_key=46ae1d2187fb631facdf70783362f90a&language=en-US&page=" + page + "&primary_release_year=" + year)
    let jsonYear = await yearResponse.json()
    return jsonYear;
}

//Function to search by primary release year.
$(".yearButton").on('click', async function() { 
    $(".titleResults").empty()
    let yearsq = $(".yearBar").val()
    let pageNumber = $(".yearPage").val()
        if (pageNumber == "") {
            pageNumber = "1"
        }if (pageNumber > 500) {
            alert("Page number must be less than or equal to 500, per TMDB.")
            return;
        }
        if (yearsq == "") {
            alert("You have not searched a release year. Please enter a year to search for movies!")
        } else {
            let yearResult = await yearSearch(yearsq, pageNumber)
            if (yearResult.results.length == 0) {
                if (pageNumber > yearResult.total_pages) { //Check for page number > total pages.
                    pageNumber = yearResult.total_pages
                    yearResult = await yearSearch(yearsq, pageNumber)
                } else {
                alert("I'm sorry, there are no movies that were released that year in our records :( Try again to find more movies!")
                $(".titleResults").append("<p> No movies released in the year " + yearsq + "." + "</p>")
                }
            }
            $(".titleResults").append("<p> There are " + yearResult.total_results + " results from your search. Currently displaying page " + pageNumber + " of " + yearResult.total_pages + ".</p>")
            yearResult.results.forEach(i => {
                $(".titleResults").append('<ul class = "yearRes">' + i.original_title + '<ol class = "year">' + " Release Date: " + i.release_date + "</ol>" + "</ul>")
            });
        }
})

//Gets the top trending movies in the database.
async function getTrending(page){
    let tmovies = await fetch("https://api.themoviedb.org/3/trending/movie/day?api_key=46ae1d2187fb631facdf70783362f90a&page=" + page)
    let jsont = await tmovies.json()
    return jsont;
}

//Displays trending movies.
$(".trendingButton").on('click', async function() {
    $(".titleResults").empty()
    let pageNumber =$(".trendingPage").val()
        if (pageNumber == "") {
            pageNumber = "1"
        }
    let trendingResult = await getTrending(pageNumber)
    $(".titleResults").append("<p class='pTrend'>" + "Current trending movies. Displaying page " + pageNumber + " of " + trendingResult.total_pages + ".</p>")    
      trendingResult.results.forEach(i => {
          $(".titleResults").append('<ul class = "trendingMovies">' + i.title + "</ul>")
      })  
})