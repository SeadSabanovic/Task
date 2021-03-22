const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");
const type = urlParams.get("type");
const imgPath = "https://image.tmdb.org/t/p/original/";
const fallbackImg = "./assets/back.jpg";

// Get Movie / Series Details
const getDetails = async (type, id) => {
  const response = await fetch(`${baseURL}${type}/${id}?api_key=${apiKey}`);
  const data = await response.json();
  return data;
};

// Display Details
const displayDetails = () => {
  getDetails(type, id)
    .then((data) => {
      console.log(data);
      let inputTitle;
      if (type === "movie") {
        inputTitle = data.original_title;
        $(".details-header-title").html(inputTitle);
      } else {
        inputTitle = data.original_name;
        $(".details-header-title").html(inputTitle);
      }

      console.log(data.poster_path);
      // Check if Image Path exists
      if (data.poster_path == null || data.poster_path == undefined) {
        $(".img-wrap").html(`<img src="${fallbackImg}">`);
      } else {
        $(".img-wrap").html(`<img src="${imgPath}${data.poster_path}">`);
      }

      $(".rating").html(data.vote_average);

      // Declare Input Genres
      let inputGenres;
      if (data.genres !== null || data.genres !== undefined) {
        inputGenres = data.genres.map((genre) => `<span>${genre.name}</span>`);
      }
      // Declare Budget
      if (
        data.budget == undefined ||
        data.budget == null ||
        data.budget == 0
      ) {
        $("#budget").html(`* Unknown`);
      } else {
        $("#budget").html(`$ ${data.budget}`);
      }
      // Declare Release
      if (data.release_date !== undefined) {
        $("#release").html(data.release_date);
      } else {
        $("#release").html(`* Unknown`);
      }
      $(".genre").html(inputGenres);
      $("#overview").html(data.overview);
    })
    .catch((err) => console.log(err.message));
};

displayDetails();

$(window).on("load", () => {
  updateLoco();
});
