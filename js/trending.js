// Get trending movies / series
const getTrending = async (type) => {
  // Loader
  $("#output").html('<div class="loading"></div>');
  // Fetch first page
  const response1 = await fetch(
    `${baseURL}${type}/top_rated?api_key=${apiKey}&page=1`
  );
  // Fetch second page
  const response2 = await fetch(
    `${baseURL}${type}/top_rated?api_key=${apiKey}&page=2`
  );
  const data1 = await response1.json();
  const data2 = await response2.json();
  // Returned data combined
  const data = [...data1.results, ...data2.results];
  // Return 30 results
  data.splice(30);
  return data;
};

// Display Trending movies / series
const displayTrending = () => {
  getTrending(option)
    .then((data) => {
      let output = "";

      if (option === "movie") {
        output = data.map((movie) =>
          cardLayout(movie.poster_path, movie.title, movie.id)
        );
      } else {
        output = data.map((movie) =>
          cardLayout(movie.poster_path, movie.name, movie.id)
        );
      }
      // Set Title
      setTitle(option, "");
      $("#output").html(output);
    })
    .catch((err) => console.log(err.message));
};
