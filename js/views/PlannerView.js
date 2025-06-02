import * as User from '../models/UserModel.js';
import * as Plan from '../models/PlannerModel.js';


/* FORMULÁRIO --------------------------------

PASSO 1 */

// PLACE OF DEPARTURE
const input = document.querySelector('.departure-input');
const sugestionsList = document.querySelector('.sugestions-list');

function autocompleteFirstMatch() {
  const val = input.value.toLowerCase().trim();
  if (!val) return;

  const firstMatch = Plan.departures.find(dep => dep.toLowerCase().startsWith(val));
  if (firstMatch) {
    input.value = firstMatch;
  }
}

Plan.departures.forEach(departure => {
  const option = document.createElement('option');
  option.value = departure;
  sugestionsList.appendChild(option);
});

input.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    event.preventDefault();
    autocompleteFirstMatch();
    input.blur();
  }
});

input.addEventListener('blur', () => {
  autocompleteFirstMatch();
});

// TYPE OF TOURISM
const tourismCardContainer = document.querySelector('.tourism-type-selection');

Plan.tourismTypes.forEach(type => {
  const card = document.createElement('div');
  card.className = 'tourism-type-card d-flex flex-column align-items-center';
  card.innerHTML = `
    <img src="${type.img}" alt="${type.name}">
    <div class="beach">${type.name}</div>
  `;

  card.addEventListener('click', () => {
    card.classList.toggle('selected');
  });

  tourismCardContainer.appendChild(card);
});

// BUTTONS
const tourismTypeSelection = document.querySelector('.tourism-type-selection');
const rightButton = document.querySelector('.scroll-btn-right');
const leftButton = document.querySelector('.scroll-btn-left');


  // SCROLL ANIMATION

function buttons() {
  rightButton.addEventListener('click', () => {
    tourismTypeSelection.scrollBy ({
      left: 320,
      behavior: 'smooth'
    });
  });

  leftButton.addEventListener('click', () => {
    tourismTypeSelection.scrollBy ({
      left: -320,
      behavior: 'smooth'
    });
  });
}

buttons();

// ATIVAÇÃO DO POP-UP DOS DESTINOS
const destinationBtn = document.querySelector('.destination-selection');
const destinationPopUp = document.querySelector('.destination-selection-box');
const closeBtn = document.querySelector('.close-btn');

destinationBtn.addEventListener('click', () => {
  destinationPopUp.style.display = 'flex';
});

closeBtn.addEventListener('click', () => {
  destinationPopUp.style.display = 'none';
});

// SELEÇÃO DOS DESTINOS

const destinationCardContainer = document.querySelector('.destination-card-section');

Plan.destinations.forEach(des => {
  const card = document.createElement('div');
  card.className = 'destination-card d-flex flex-column align-items-center justify-content-center';
  card.innerHTML = `
    <img class="destination-img" src="${des.img}" alt="${des.destination}">
    <div class="destination-name">${des.destination}</div>
  `;



  card.addEventListener('click', () => {
    document.querySelectorAll('.destination-card').forEach(card => {
      card.classList.remove('selected');
    });

    card.classList.add('selected');

    destinationBtn.innerHTML = `
      <img src="${des.img}" alt="${des.destination}" class="selected-destination-img">
    `;

    destinationPopUp.style.display = 'none';
  });

  destinationCardContainer.appendChild(card);
  
});

// BOTÕES DO CONTAINER DOS DESTINOS

  // SCROLL ANIMATION

function buttonsDestination() {
    // BUTTONS
  const destinationSection = document.querySelector('.destination-card-section');
  const rightButton = document.querySelector('#destination-scroll-right');
  const leftButton = document.querySelector('#destination-scroll-left');

  rightButton.addEventListener('click', () => {
    destinationSection.scrollBy ({
      left: 320,
      behavior: 'smooth'
    });
  });

  leftButton.addEventListener('click', () => {
    destinationSection.scrollBy ({
      left: -320,
      behavior: 'smooth'
    });
  });
}

buttonsDestination();

/* 
        STEP THREE
*/

flatpickr("#calendar", {
  mode: "range",
  inline: true,
  minDate: "today",
  showMonths: 2,
  onChange: function(selectedDates, dateStr, instance) {
    if (selectedDates.length === 2) {
      const [startDate, endDate] = selectedDates;

      const oneDay = 24 * 60 * 60 * 1000;
      const days = Math.round((endDate - startDate) / oneDay) + 1;

      const options = { year: "numeric", month: "long", day: "numeric" };
      const startText = startDate.toLocaleDateString("en-GB", options);
      const endText = endDate.toLocaleDateString("en-GB", options);

      document.querySelector(".date-count").textContent = `${days} Days`;
      document.querySelector(".date-range").textContent = `${startText} - ${endText}`;

    }
    console.log("Selected:", selectedDates); 
  }
});

/* STEP FOUR */

  /*CREATE CARDS */
  const cardsContainer = document.querySelector('.sugestions-grid');
  Plan.flights.forEach(flight => {
    const flightCard = document.createElement('div');
    flightCard.className = 'flight-card d-flex flex-column';
    flightCard.innerHTML = `
      <h3 class="flight-destination">
        ${flight.destination}
      </h3>
      <div class="flight-info d-flex">
        <img src="${flight.airline}" alt="" class="flight-airline-img">
        <div class="flight-take-off">
          <div class="time">
            ${flight.takeOff} - ${flight.landing}
          </div>
          <div class="airport">
            ${flight.airport}
          </div>
        </div>
      </div>
      <div class="flight-bottom d-flex align-items-center">
        <div class="price-cabin">
          <div class="price">
            ${flight.price}
          </div>
          <div class="cabin-sugestion">
            ${flight.cabin}
          </div>
        </div>
        <div class="favorite-select d-flex align-items-center">
          <div class="favorite">
            <img src="../media/icons/favorite.svg" alt="">
          </div>
          <div class="select-btn">Select</div>
        </div>

      </div>
    `;
    cardsContainer.appendChild(flightCard);
  });

  /* PAGINATION */

  const paginationContainer = document.querySelector('.pagination');
  const cards = document.querySelectorAll('.flight-card');
  const cardsPerPage = 9;
  let totalPages = Math.ceil(Plan.flights.length / cardsPerPage);


  function renderItems(page) {
    const start = (page - 1) * cardsPerPage;
    const end = start + cardsPerPage;
    cardsContainer.innerHTML = '';

    const currentCards = Array.from(cards).slice(start, end);

    currentCards.forEach(card => {
      cardsContainer.appendChild(card);
    });
  }
  
  function element (totalPages, page) {

    //criar tag li
    let liTag = '';
    let activeLi;
    let beforePages = page - 1;
    let afterPages = page + 1;

    if (page > 1) {
      liTag += `                
        <li class="page-item">
          <span class="page-link page-arrow-left">&lt;</span>
        </li>
      `;
    }

    for (let pageLength = beforePages; pageLength <= afterPages; pageLength++) {

      if(pageLength == 0) {
        pageLength = pageLength + 1;
      }

      if (page == pageLength) {
        activeLi = 'active'; //adiciona a classe active
      } else {
        activeLi = '';
      }
      liTag += `
        <li class="page-item ${activeLi}">
          <span class="page-link page-number ${activeLi}" data-page="${pageLength}">${pageLength}</span>
        </li>
      `;
    }

    liTag += `
    <li class="page-item disabled">
        <span class="page-link">...</span>
    </li>
    <li class="page-item">
        <span class="page-link">${totalPages}</span>
    </li>
    `;

    if (page < totalPages) {
      liTag += `                
        <li class="page-item">
          <span class="page-link page-arrow-right">&gt;</span>
        </li>
      `;
    }

    paginationContainer.innerHTML = liTag;

    const arrowLeft = document.querySelector('.page-arrow-left');
    const arrowRight = document.querySelector('.page-arrow-right');

    if(arrowLeft) {
      arrowLeft.addEventListener('click', () => element(totalPages, page - 1));
      renderItems(page);
    }

    if (arrowRight) {
      arrowRight.addEventListener('click', () => element(totalPages, page + 1));
      renderItems(page);
    }

    const numberButtons = document.querySelectorAll('.page-number');
    numberButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const selectedPage = Number(btn.getAttribute('data-page'));
        element(totalPages, selectedPage);
        renderItems(page);
      });
    });
    
  }

  element(totalPages, 1);




