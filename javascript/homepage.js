async function movieSearch(keyword) {
    let response = await fetch("https://api.themoviedb.org/3/search/movie?api_key=46ae1d2187fb631facdf70783362f90a&language=en-US&query="+ keyword)
    let json = await response.json()
    return json;
}

$(".searchButton").on('click', async function() {
    $(".results").empty()
      let searchQuery = $(".searchBar").val()
      if (searchQuery != "") {
      let searchResult = await movieSearch(searchQuery)
     console.log(searchResult)
     searchResult.results.forEach(i => {
         $(".results").append("<p>"+ i.original_title +"</p>")
     });
      } 
})



