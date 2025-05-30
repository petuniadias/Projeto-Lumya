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

