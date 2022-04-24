async function movieSearch(keyword) {
    let response = await fetch("https://api.themoviedb.org/3/search/movie?api_key=46ae1d2187fb631facdf70783362f90a&language=en-US&query="+ keyword)
    let json = await response.json()
    return json;
}

$(".searchButton").on('click', async function() {
    $(".results").empty()
      let searchQuery = $(".searchBar").val()
        if (searchQuery == "") {
            alert("I'm sorry, your search did not match any movies in our records. :( Try again to find more movies!")
        } else {
      let searchResult = await movieSearch(searchQuery)
      if (searchResult.results.length == 0) {
        alert("I'm sorry, your search did not match any movies in our records. :( Try again to find more movies!")
        $(".results").append("<p> No movies found containing " + searchQuery + "." + "</p>")
     }
      console.log(searchResult)
     searchResult.results.forEach(i => {
         $(".results").append("<li>"+ i.original_title + ' <button class = "overview">Overview </button>' + "</li>")
         $(".overview").on('click', async function() {
             //$(".results").append("<p>" + i.overview + "</p")
             alert("Overview of " + i.original_title + " :" + i.overview)
         });
     });
    }
})



