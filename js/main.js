// All functions are in config.js

// Init Locomotive Scroll
const scroller = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true,
  tablet: {
    smooth: false,
  },
  smartphone: {
    smooth: false,
  },
  reloadOnContextChange: true,
});

displayTrending();

$(document).ready(() => {
  // Options for the observer (which mutations to observe)
  const config = { attributes: true, childList: true, subtree: true };

  // Callback function to execute when mutations are observed
  const callback = function (mutationsList, observer) {
    // Use traditional 'for loops' for IE 11
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        updateLoco();
      } else if (mutation.type === "attributes") {
        console.log(
          "The " + mutation.attributeName + " attribute was modified."
        );
      }
    }
  };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(targetNode, config);

  // Intro Fade
  $(".intro").fadeOut(1500);
  
  // Nav & Up Button Toggle
  scroller.on("scroll", (position) => {
    if (position.scroll.y > 0) {
      nav.addClass("active");
    } else {
      nav.removeClass("active");
    }
    if (position.scroll.y > 200) {
      up.fadeIn(800);
    } else {
      up.fadeOut();
    }
  });

  // Back to top
  up.click(() => {
    scroller.scrollTo("top");
  });

  // Init Search Timer
  let timer;

  search.on("keyup paste", function () {
    // Declare Value
    const value = $(this).val();
    // Reset Page, Total Results, Total Pages
    page = 1;
    total_results = 0;
    total_pages = 0;
    // Clear Timeout
    clearTimeout(timer);

    // After a second of no typing run the function
    timer = setTimeout(function () {
      fetchSearch(value);
    }, 1000);
  });

  // Select Movies / Series
  movies.click(() => {
    if (option === "movie") {
      return false;
    } else if (searchToggle) {
      option = "movie";
      value = search.val();
      fetchSearch(value);
    } else {
      option = "movie";
      displayTrending();
    }
  });
  series.click(() => {
    if (option === "tv") {
      return false;
    } else if (searchToggle) {
      option = "tv";
      value = search.val();
      fetchSearch(value);
    } else {
      option = "tv";
      displayTrending();
    }
  });
});

// Fallback Up button functionality on mobile 
$(window).scroll(function () {
  var scrollbarLocation = $(this).scrollTop();

  if (scrollbarLocation > 0) {
    nav.addClass("active");
  } else {
    nav.removeClass("active");
  }
});
