import * as User from '../models/UserModel.js';
import { tourismType, destination, flight } from "../init.js";

let selectedStartDate = null;
let selectedEndDate = null;

/* FORMULÁRIO --------------------------------

PASSO 2 */

/* BUSCAR DEPARTURES DA CLASSE DOS VOOS E COLOCAR NUM OBJETO */



// PLACE OF DEPARTURE

function autocompleteFirstMatch(departureInput, flights) {
  const val = departureInput.value.toLowerCase().trim();
  if (!val) return;

  const departures = flights.map(f => f.departure); // array só com os nomes de partida

  const firstMatch = departures.find(dep => dep.toLowerCase().startsWith(val));
  if (firstMatch) {
    departureInput.value = firstMatch;
  }
}

function listDepartures() {
  const departureInput = document.querySelector('.departure-input');
  const suggestionsList = document.querySelector('.sugestions-list');

  const flights = Object.values(flight.getAll());

  flights.forEach((flight) => {
    const option = document.createElement('option');
    option.value = flight.departure;
    suggestionsList.appendChild(option);
  });

  departureInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      autocompleteFirstMatch(departureInput, flights);
      departureInput.blur();
    }
  });

  departureInput.addEventListener('blur', () => {
    autocompleteFirstMatch(departureInput, flights);
  });
}

listDepartures();


// TYPE OF TOURISM

function renderTourismTypes() {
  const tourismCardContainer = document.querySelector('.tourism-type-selection');

  const tourismTypeKeys = Object.keys(tourismType.getAll());
  tourismTypeKeys.forEach((key) => {
    const type = tourismType.get(key);
    const card = document.createElement('div');
    card.className = 'tourism-type-card d-flex flex-column align-items-center';
    card.innerHTML = `
      <img src="${type.img}" alt="${type.name}">
      <div class="tourism-type-name">${type.name}</div>
    `;

    card.addEventListener('click', () => {
      card.classList.toggle('selected');
    });

    tourismCardContainer.appendChild(card);
  });
}

renderTourismTypes();

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

function renderDestinations() {
  const destinationCardContainer = document.querySelector('.destination-card-section');
  const destinationKeys = Object.keys(destination.getAll());
  destinationKeys.forEach((key) => {
    const des = destination.get(key);
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
}

renderDestinations();

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

      const options = { year: "numeric", month: "long", day: "numeric"};
      const startText = startDate.toLocaleDateString("en-GB", options);
      const endText = endDate.toLocaleDateString("en-GB", options);

      document.querySelector(".date-count").textContent = `${days} Days`;
      document.querySelector(".date-range").textContent = `${startText} - ${endText}`;

    }

    selectedStartDate = selectedDates[0];
    selectedEndDate = selectedDates[1];
  }
});

/* STEP FOUR */
  const cardsContainer = document.querySelector('.sugestions-grid');

  /* RENDER FLIGHTS BASED ON USER INPUT */

  function renderFlights() {

    //INPUT DO UTILIZADOR
    const departure = document.querySelector('.departure-input');
    const stepFourBtn = document.querySelector('.step-four-btn');



    stepFourBtn.addEventListener('click', () => {

      // INPUT DO UTILIZADOR
      const selectedDestination = document.querySelector('.destination-card.selected .destination-name').textContent; 
      const selectedTourismTypes = document.querySelectorAll('.tourism-type-card.selected .tourism-type-name');
      const selectedTourismTypeNames  = Array.from(selectedTourismTypes).map(tt => tt.textContent);

      console.log('SELECTED TOURISM TYPES SELECTED:', selectedTourismTypeNames);

      const selectedFlights = flight.getFlightByInput(selectedStartDate, selectedDestination, departure.value, selectedTourismTypeNames);
      if(selectedFlights.length === 0) {
        alert('o voo nao existe');
        return;
      }
      renderCards(selectedFlights);
    });

  }

  renderFlights();


  /* CREATE CARDS */

function formatCurrency(priceCents) {
  return (Math.round(priceCents) / 100).toFixed(2);
}


  function renderCards(selectedFlight) {
    cardsContainer.innerHTML = ''; // Limpa o container antes de adicionar novos cards

    selectedFlight.forEach((f) => {
      const flightCard = document.createElement('div');
      flightCard.className = 'flight-card d-flex flex-column';
      flightCard.innerHTML = `
        <h3 class="flight-destination">
          ${f.destination.destination}
        </h3>
        <div class="flight-info d-flex">
          <img src="${f.airline}" alt="" class="flight-airline-img">
          <div class="flight-take-off">
            <div class="time">
              ${f.schedules[0]} - ${f.schedules[1]}
            </div>
            <div class="airport">
              ${f.airport}
            </div>
          </div>
        </div>
        <div class="flight-bottom d-flex align-items-center">
          <div class="price-cabin">
            <div class="price">
              ${formatCurrency(f.price)} €
            </div>
            <div class="cabin-sugestion">
              ${f.cabin}
            </div>
          </div>
          <div class="favorite-select d-flex align-items-center">
            <div class="favorite">
              <img src="../media/icons/favorite.svg" alt="">
            </div>
            <div class="select-btn">
              <div>Select</div>
            </div>
          </div>
        </div>
      `;

      cardsContainer.appendChild(flightCard);

      
    /* SELECT FLIGHT */

    const selectBtn = flightCard.querySelector('.select-btn');
    const selectTextForCard = flightCard.querySelector('.select-btn div'); // O div que contém o texto
    
    if (selectBtn && selectTextForCard) {
      selectBtn.addEventListener('click', () => {
        const checked = selectBtn.querySelector('img.checked');
        
        if (checked) {
          checked.remove();
          selectTextForCard.textContent = 'Select';
        } else {
          const newCheckMark = document.createElement('img');
          newCheckMark.src = '../media/icons/selected.svg';
          newCheckMark.classList.add('checked');
          selectBtn.prepend(newCheckMark);
          selectTextForCard.textContent = 'Selected';
          addToCart();
        }
      });
    }

  });
}



  /* PAGINATION

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
  */

/* STEP FIVE */

