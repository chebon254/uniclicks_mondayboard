// Past Events carousel
new Swiper('.past-events-swiper', {
  spaceBetween: 20,
  navigation: {
    nextEl: '.past-events-arrows__right',
    prevEl: '.past-events-arrows__left'
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 20
    }
  }
});

// Upcoming Events carousel
new Swiper('.upcoming-events-swiper', {
  spaceBetween: 20,
  navigation: {
    nextEl: '.upcoming-events-arrows__right',
    prevEl: '.upcoming-events-arrows__left'
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 20
    }
  }
});

document.addEventListener("DOMContentLoaded", function() {
  const toggleButton = document.getElementById("togglePastEvents");
  const eventsSection = document.getElementById("past-events");

  toggleButton.addEventListener("click", function() {
    if (eventsSection.classList.contains("show")) {
      eventsSection.classList.remove("show");
      // Change arrow icon
      toggleButton.innerHTML = `<span>Show Past Events</span><i class="fa-solid fa-chevron-down"></i>`;
    } else {
      eventsSection.classList.add("show");
      // Change arrow icon
      toggleButton.innerHTML = `<span>Hide Past Events</span><i class="fa-solid fa-chevron-up"></i>`;
    }
  });
});
