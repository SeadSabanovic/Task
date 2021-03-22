// Init Page, Total Results, Total Pages
let page = 1,
  total_results,
  total_pages;

// Get Next Page
nextPage = () => {
  page += 1;
  value = search.val();
  scroller.scrollTo("top");
  fetchSearch(value);
};
// Get Prev Page
prevPage = () => {
  page -= 1;
  value = search.val();
  scroller.scrollTo("top");
  fetchSearch(value);
};

// Init Search Fetch
const fetchSearch = (value) => {
  if (value.length > 2) {
    searchToggle = true;
    displaySearch(value, page);
  } else {
    searchToggle = false;
    displayTrending();
    return false;
  }
};

// Get Search
const getSearch = async (type, input, page) => {
  // Loader
  $("#output").html('<div class="loading"></div>');
  // Fetch Search Results
  const response = await fetch(
    `${baseURL}search/${type}?api_key=${apiKey}&query=${input}&page=${page}`
  );
  const data = await response.json();
  // Update Page, Total Pages, Total Results
  page = data.page;
  total_pages = data.total_pages;
  total_results = data.total_results;
  return data.results;
};

const displaySearch = (value, page) => {
  getSearch(option, value, page)
    .then((data) => {
      let output = "";

      if (data.length === 0) {
        output = '<h1 class="noResults">No results...</h1>';
        setTitle(option, `${value}`);
        $("#output").html(output);
        return;
      }

      if (option === "movie") {
        output = data.map((movie) => {
          return cardLayout(movie.poster_path, movie.title, movie.id);
        });
      } else {
        output = data.map((movie) => {
          return cardLayout(movie.poster_path, movie.name, movie.id);
        });
      }

      let addPagination;
      if (page == 1 && total_pages !== 1) {
        addPagination = [...output, FPP()];
      } else if (total_pages == 1) {
        addPagination = [...output, OPP()];
      } else if (page == total_pages) {
        addPagination = [...output, LPP()];
      } else {
        addPagination = [...output, NPP()];
      }
      // Set Title
      setTitle(option, `${value}`);
      $("#output").html(addPagination);
    })
    .catch((err) => console.log(err.message));
};
