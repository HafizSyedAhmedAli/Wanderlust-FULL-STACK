let taxSwitch = document.getElementById("switchCheckDefault");
let cardTexts = document.querySelectorAll(".card-text");

// Tax Switch

taxSwitch.addEventListener("click", () => {
  for (let card of cardTexts) {
    let originalPrice = Number.parseFloat(card.dataset.price);
    let priceElement = card.querySelector(".price");
    let taxInfo = card.querySelector(".tax-info");

    if (taxInfo.style.display !== "inline") {
      taxInfo.style.display = "inline";
      let withTax = Math.round(originalPrice * 1.18);
      priceElement.innerText = withTax
        .toLocaleString("en-PK")
        .concat(" / night");
    } else {
      taxInfo.style.display = "none";
      priceElement.innerText = originalPrice
        .toLocaleString("en-PK")
        .concat(" / night");
    }
  }
});

// Filters

let filters = document.querySelectorAll(".filter");
let links = document.querySelectorAll(".listing-link");
let noResult = document.getElementById("no-result");
let flag;

filters.forEach((filter) => {
  filter.addEventListener("click", (e) => {
    flag = false;
    let category =
      e.currentTarget.dataset.category ||
      e.currentTarget.querySelector("p").textContent.trim();

    links.forEach((link) => {
      let match = category === "all" || link.dataset.category === category;
      link.style.display = match ? "inline" : "none";
      if (match) flag = true;
    });
    noResult.style.display = flag ? "none" : "inline";
  });
});

// Search Bar

document.addEventListener("DOMContentLoaded", () => {
  const searchBox = document.getElementById("searchBox");
  const searchBtn = document.getElementById("searchBtn");
  const cards = document.querySelectorAll(".listing-link"); 

  const filterListings = () => {
    const query = searchBox.value.trim().toLowerCase();
    let found = false;
    cards.forEach(card => {
      const title = card.querySelector(".listing-title").textContent.toLowerCase();
      if (title.includes(query)) {
        card.style.display = "inline";
        found = true;
      } else {
        card.style.display = "none";
      }
    });
    document.getElementById("no-result").style.display = found ? "none" : "block";
  };

  searchBtn.addEventListener("click", filterListings);
  searchBox.addEventListener("input", filterListings);
});


document.addEventListener('DOMContentLoaded', () => {
  const navCollapse = document.getElementById('mainNav');
  const navbar = document.querySelector('.navbar');
  const filters = document.getElementById('filters');
  if (!navCollapse || !navbar || !filters) return;

  // optional smooth transition
  navbar.style.transition = 'height 180ms ease, background-color 180ms ease';
  filters.style.transition = 'margin-top 180ms ease';

  navCollapse.addEventListener('shown.bs.collapse', () => {
    // measure the *expanded* height and lock it as an inline style
    const expanded = Math.ceil(navbar.getBoundingClientRect().height);
    navbar.style.height = (expanded + 170) + 'px';
  });

  navCollapse.addEventListener('hidden.bs.collapse', () => {
    // remove inline styles to return to CSS default
    navbar.style.height = '';
  });

  // keep things correct on resize while opened
  window.addEventListener('resize', () => {
    if (navCollapse.classList.contains('show')) {
      const expanded = Math.ceil(navbar.getBoundingClientRect().height);
      navbar.style.height = expanded + 'px';
    }
  });
});