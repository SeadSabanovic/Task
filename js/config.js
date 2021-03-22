// Variables from the DOM
const search = $("#search");
const clear = $("#clear");
const movies = $("#movies");
const series = $("#series");
const mainTitle = $(".main-title");
const nav = $("nav");
const up = $(".up");
// Vanilla selector for MutationObserver
const targetNode = document.getElementById("output");
// hide Up Button
up.fadeOut(0);
// Trending Types
let option = "movie";
// Search On/Off
let searchToggle = false;
// Search Pages
let searchPages = 0;

// API Shortcuts
let baseURL = "https://api.themoviedb.org/3/";
let apiKey = "3e7f0113addc6d3a64d64ecf5925e4bc";
let baseImage = "https://image.tmdb.org/t/p/w500/";

// Clear search field
clear.click(() => {
  if (search.val() == "") {
    return false;
  } else {
    search.val("");
    searchToggle = false;
    displayTrending();
    setTitle(option, "");
  }
});

// Set Title & Active Option
const setTitle = (option, para) => {
  let title = "";

  switch (option) {
    case "movie":
      title = "30 Top Rated Movies";
      movies.addClass("active");
      series.removeClass("active");
      break;
    case "tv":
      title = "30 Top Rated Series";
      series.addClass("active");
      movies.removeClass("active");
      break;
  }

  if (searchToggle) {
    title = "Results for: ";
    mainTitle.html(`${title}<span class="searchText">'${para}'</span>`);
  } else {
    mainTitle.html(`${title}${para}`);
  }
};

// Update Locomotive Scroll
const updateLoco = () => {
  setTimeout(function () {
    scroller.update();
  }, 500);
  setTimeout(function () {
    scroller.update();
  }, 1000);
  setTimeout(function () {
    scroller.update();
  }, 1500);
  setTimeout(function () {
    scroller.update();
  }, 2000);
};

// Card Layout
const cardLayout = (poster_path, title, id) => {
  let path = "";
  let height = "";
  if (poster_path !== null) {
    path = baseImage + poster_path;
    height = "h-100";
  } else {
    path = "./assets/404.png";
  }
  return `
    <div class="col mb-4">
      <div class="card ${height}">
        <a href="./details.html?type=${option}&id=${id}" class="img-wrap" target="_blank">
          <img src="${path}" 
            class="card-img-top" alt="${title} poster" draggable="false">
        </a>
        <div class="card-body">
          <h5 class="card-title"><a href="./details.html?type=${option}&id=${id}" target="_blank">${title}</a></h5>
        </div>
      </div>
    </div>
  `;
};

// This part is messy sorry
// Return First Page Pagination
const FPP = () => {
  return `<div class="col mb-4">
          <div class="card last">
            <h1> Page<br> ${page}  <sub>/ ${total_pages}</sub> </h1>
            <button class="pagination" id="nextPage" onClick="nextPage()">
              Next 
              <span class="material-icons">
                arrow_forward_ios
              </span>
            </button>
          </div>
        </div>`;
}

// Return One Page Pagination
const OPP = () => {
  return `<div class="col mb-4">
    <div class="card last">
      <h1 style="margin:0px"> Page ${page} <sub>/ ${total_pages}</sub> </h1>
    </div></div>`;
}

// Return Last Page Pagination
const LPP = () => {
  return `<div class="col mb-4">
    <div class="card last">
      <h1> Page ${page} <sub>/ ${total_pages}</sub> </h1>
      <button class="pagination" id="prevPage" onClick="prevPage()">Prev <span class="material-icons">
arrow_back_ios
</span></button>
    </div></div>`;
}

// Return Normal Page Pagination
const NPP = () => {
  return `<div class="col mb-4">
    <div class="card last">
    <h1> Page ${page}  <sub>/ ${total_pages}</sub> </h1>
      <button class="pagination" id="nextPage" onClick="nextPage()">Next <span class="material-icons">
arrow_forward_ios
</span></button>
      <button class="pagination" id="prevPage" onClick="prevPage()">Prev <span class="material-icons">
arrow_back_ios
</span></button>
    </div></div>`;
}