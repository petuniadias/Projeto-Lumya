import * as User from '../models/UserModel.js';


/* FORMULÁRIO --------------------------------

PASSO 1 */

// PLACE OF DEPARTURE
const input = document.querySelector('.departure-input');
const sugestionsList = document.querySelector('.sugestions-list');

input.addEventListener('input', () => {
  const value = input.value.toLowerCase();
  const filtered = departures.filter(departure => departure.filter.includes(value));


  filtered.forEach(departure => {
    const div = document.createElement('li');
    div.classList.add('suggestion');
    div.textContent = departure;
    div.addEventListener('click', () => {
      input.value = departure;
      suggestionsBox.innerHTML = '';
    });
    suggestionsBox.appendChild(div);
  });
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


