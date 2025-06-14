import * as User from '../models/UserModel.js';
import { tourismType, destination, flights, countriesVisited } from "../init.js";

// COUNTRIES VISITED

function renderCountryVisitedCards() {
  
  countriesVisited.forEach((country) => {
    // Transforma o nome do continente num ID válido (ex: "South America" -> "south-america")
    const continentId = country.continent.toLowerCase().replace(/\s+/g, '-');
    const containerSelector = `.${continentId}-category`;
    const countryVisitedCardContainer = document.querySelector(containerSelector);

    if (countryVisitedCardContainer) {
    const card = document.createElement('div');
    card.className = 'achievement-card country disabled';
    card.innerHTML = `
      <div class="img-container">
        <img src="${country.img}" alt="">
      </div>
      <h3>${country.country}</h3>
    `;
    countryVisitedCardContainer.appendChild(card);
    } else {
      // Opcional: Adicionar um aviso se o container não for encontrado, pode ajudar na depuração.
      // console.warn(`Container com o seletor "${containerSelector}" não encontrado para o continente "${country.continent}". O card para "${country.country}" não será renderizado.`);
    }
  });
}

renderCountryVisitedCards();


// BUTTONS
const achievementsSection = document.querySelector('.achievement-cards-section');
const rightButton = document.querySelector('.scroll-btn-right');
const leftButton = document.querySelector('.scroll-btn-left');


  // SCROLL ANIMATION

function buttons() {
  rightButton.addEventListener('click', () => {
    achievementsSection.scrollBy ({
      left: 320,
      behavior: 'smooth'
    });
  });

  leftButton.addEventListener('click', () => {
    achievementsSection.scrollBy ({
      left: -320,
      behavior: 'smooth'
    });
  });
}

buttons();