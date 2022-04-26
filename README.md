# Relias
Short project to build a simple webpage that is mainly used to search for a movie through an API, TMDB API.

Can also be used to get the current trending movies from the website, as well as search for movies by rating or year.

When searching movies by rating, the results will display any movie with a rating of the query or higher.

When searching movies by year, the results will display any movie with a primary release year of the query.

Will display a message if no movies are searched or no movies match the search query asking the user to try again.

Can also search by page number of results found from the query.

Languages/Technologies/Frameworks used: TMDB API, HTML, JavaScript, JSON, CSS, Bootstrap.

NOTE: It seemed that TMDB API only allowed to search for a page number at 500 or less, even if there were more than 500 pages in a search result. A message will appear if the user tries to search for a page number that is greater than 500.
