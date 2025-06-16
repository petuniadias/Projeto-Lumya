import * as User from '../models/UserModel.js';
import { tourismType, destination, flights, countriesVisited } from "../init.js";

// COUNTRIES VISITED
User.init();

function renderCountryVisitedCards() {
  const loggedUser = User.getUserLogged(); // Obter o utilizador logado
  const userVisitedCountries = loggedUser ? loggedUser.countriesVisited() : []; // Obter a lista de países visitados pelo utilizador logado
  console.log("User visited countries:", userVisitedCountries); // Log para depuração

  countriesVisited.forEach((country) => {
    // Transforma o nome do continente num ID válido (ex: "South America" -> "south-america")
    const continentId = country.continent.toLowerCase().replace(/\s+/g, '-');
    const containerSelector = `.${continentId}-category`;
    const countryVisitedCardContainer = document.querySelector(containerSelector);

    if (countryVisitedCardContainer) {
      const card = document.createElement('div');
      card.className = 'achievement-card country'; 

      const isVisited = loggedUser ? loggedUser.countriesVisited().includes(country.country) : false;
      if (!isVisited) {
          card.classList.add('disabled');
      }

      card.innerHTML = `
        <div class="img-container">
          <img src="${country.img}" alt="${country.country}">
        </div>
        <h3>${country.country}</h3>
      `;

      countryVisitedCardContainer.appendChild(card);
    } else {
      // Opcional: Adicionar um aviso se o container não for encontrado, pode ajudar na depuração.
      console.warn(`Container com o seletor "${containerSelector}" não encontrado para o continente "${country.continent}". O card para "${country.country}" não será renderizado.`);
    }
  });
}

renderCountryVisitedCards();


// Função genérica para configurar botões de scroll
function setupScrollFunctionality(containerSelector) {
  const mainContainer = document.querySelector(containerSelector);
  if (!mainContainer) {
    // console.warn(`Main container for scroll not found: ${containerSelector}`);
    return;
  }

  const scrollableContentParent = mainContainer.querySelector('.achievements-cards-category-content'); // Este é o tab-content
  const rightButton = mainContainer.querySelector('.scroll-btns .scroll-btn-right');
  const leftButton = mainContainer.querySelector('.scroll-btns .scroll-btn-left');

  if (!scrollableContentParent || !rightButton || !leftButton) {
    // console.warn(`Missing elements for scroll in ${containerSelector}`);
    return;
  }
  
  const scrollAmount = 320; // Pode ajustar este valor

  rightButton.addEventListener('click', () => {
    const activeTabPane = scrollableContentParent.querySelector('.tab-pane.show.active');
    if (activeTabPane) {
        const scrollTarget = activeTabPane.querySelector('.achievement-cards-section');
        if (scrollTarget) {
            scrollTarget.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }
  });

  leftButton.addEventListener('click', () => {
    const activeTabPane = scrollableContentParent.querySelector('.tab-pane.show.active');
    if (activeTabPane) {
        const scrollTarget = activeTabPane.querySelector('.achievement-cards-section');
        if (scrollTarget) {
            scrollTarget.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
      }
  });
}

// Configurar botões de scroll para a secção principal de achievements
setupScrollFunctionality('.achievement-content');

// Configurar botões de scroll para a secção de países visitados
setupScrollFunctionality('.countries-visited-content');