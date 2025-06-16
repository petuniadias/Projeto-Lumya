import * as User from '../models/UserModel.js';
import { tourismType, destination, flights, cart } from "../init.js";

let selectedStartDate = null;
let selectedEndDate = null;

/* FORMULÁRIO --------------------------------

PASSO 2 */

/* BUSCAR DEPARTURES DA CLASSE DOS VOOS E COLOCAR NUM OBJETO */



// PLACE OF DEPARTURE

function autocompleteFirstMatch(departureInput, flights) {
  const val = departureInput.value.toLowerCase().trim();
  if (!val) return;

  const departures = flights.listAllFlights().map(f => f.departure); // array só com os nomes de partida

  const firstMatch = departures.find(dep => dep.toLowerCase().startsWith(val));
  if (firstMatch) {
    departureInput.value = firstMatch;
  }
}

function listDepartures() {
  const departureInput = document.querySelector('.departure-input');
  const suggestionsList = document.querySelector('.sugestions-list');

  const fs = flights.listAllFlights();
  const uniqueDepartures = new Set();

  fs.forEach((f) => {
    if (f.departure) {
      uniqueDepartures.add(f.departure);
    }
  });
  
  suggestionsList.innerHTML = '';
  uniqueDepartures.forEach((dep) => {
    const option = document.createElement('option');
    option.value = dep;
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



  //const cardsContainer = document.querySelector('.suggestions-flights-grid');
  let currentSuggestedFlights = [];

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

      const currentSuggestedFlights = flights.getFlightByInput(selectedStartDate, departure.value, selectedDestination, selectedTourismTypeNames);
      if(currentSuggestedFlights.length === 0) {
        alert('o voo nao existe');
        const favoritesContainer = document.querySelector('.favorite-flights');
        if (suggestionsContainer) suggestionsContainer.innerHTML = '';
        if (favoritesContainer) favoritesContainer.innerHTML = '';
        return;
      }
      getSelectedCabinFilters();
      renderFlightCardsView(currentSuggestedFlights);
    });
    
  }

  renderFlights();


  /* CREATE CARDS */

function formatCurrency(priceCents) {
  return (Math.round(priceCents) / 100).toFixed(2);
}


function renderFlightCardsView(flightsToRender) {
  const suggestionsContainer = document.querySelector('.suggestions-flights-grid');
  const favoritesContainer = document.querySelector('.favorite-flights');
  const user = User.getUserLogged();

  suggestionsContainer.innerHTML = ''; // Limpa o container de sugestões
  favoritesContainer.innerHTML = '';   // Limpa o container de favoritos

  const time = { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false
  };

  flightsToRender.forEach((f) => {
     const createFlightCardElement = (flightData, currentUser) => {
      const cardElement = document.createElement('div');
      cardElement.className = 'flight-card d-flex flex-column';
      cardElement.setAttribute('data-id', flightData.id);
      cardElement.innerHTML = `
        <h3 class="flight-destination">
          ${flightData.destination}
        </h3>
        <div class="flight-info d-flex">
          <img src="${flightData.airline}" alt="" class="flight-airline-img">
          <div class="flight-take-off">
            <div class="time">
              ${flightData.schedules[0].toLocaleTimeString('en-GB', time)} - ${flightData.schedules[1].toLocaleTimeString('en-GB', time)}
            </div>
            <div class="airport">
              ${flightData.airport}
            </div>
          </div>
        </div>
        <div class="flight-bottom d-flex align-items-center">
          <div class="price-cabin">
            <div class="price">
              ${formatCurrency(flightData.price)} €
            </div>
            <div class="cabin-sugestion">
              ${flightData.cabin}
            </div>
          </div>
          <div class="favorite-select d-flex align-items-center">
            <div class="favorite">
              <img src="../media/icons/favorite.svg" alt="Add to favorites">
            </div>
            <div class="select-btn">
              <div>Select</div>
            </div>
          </div>
        </div>
      `;

      /* FAVORITE FLIGHT LISTENER */
      const favoriteBtn = cardElement.querySelector('.favorite');

      function updateFavoriteIconDisplay(button, isFavorite) {
        button.innerHTML = isFavorite ?
          `<img src="../media/icons/favorited.svg" alt="Favorited">` :
          `<img src="../media/icons/favorite.svg" alt="Add to favorites">`;
      }

      if (currentUser && currentUser.favoriteFlights && favoriteBtn) {
        updateFavoriteIconDisplay(favoriteBtn, currentUser.isFlightFavorite(flightData.id));
      } else if (favoriteBtn) {
        updateFavoriteIconDisplay(favoriteBtn, false);
      }

      if (favoriteBtn && currentUser) {
        favoriteBtn.addEventListener('click', () => {
          const flightId = flightData.id;
          if (currentUser.isFlightFavorite(flightId)) {
            currentUser.removeFavoriteFlight(flightId);
          } else {
            currentUser.addFavoriteFlight(flightId);
          }
          renderFlightCardsView(flightsToRender); // Re-renderizar com a lista original
        });
      }

      /* SELECT FLIGHT LISTENER */
      const selectBtn = cardElement.querySelector('.select-btn');
      const selectTextForCard = cardElement.querySelector('.select-btn div');

      // Função para verificar se o voo está no carrinho
      const isFlightInCart = (flightId) => {
        return cart.listAllItems().some(item => item.flightId === flightId && item.name === 'Flight');
      };

      // Definir estado inicial do botão "Select" com base no carrinho
      if (isFlightInCart(flightData.id)) {
        const newCheckMark = document.createElement('img');
        newCheckMark.src = '../media/icons/selected.svg';
        newCheckMark.classList.add('checked');
        selectBtn.prepend(newCheckMark);
        selectTextForCard.textContent = 'Selected';
      } else {
        selectTextForCard.textContent = 'Select';
      }

      if (selectBtn && selectTextForCard) {
        selectBtn.addEventListener('click', () => {
          const isCurrentlySelected = selectBtn.querySelector('img.checked') !== null;
          const currentFlightId = flightData.id; 
          const flightForCart = flights.searchFlightById(currentFlightId);
        
        if (isCurrentlySelected) {
            selectBtn.querySelector('img.checked').remove();
            selectTextForCard.textContent = 'Select';
            const removedItem = cart.removeItemByFlightId(currentFlightId);
            console.log("[SelectBtn] Item removed from cart by flightId:", removedItem);
          } else {
            const allSuggestionCards = suggestionsContainer.querySelectorAll('.flight-card');
            allSuggestionCards.forEach(otherCardElement => {
              const otherFlightId = parseInt(otherCardElement.getAttribute('data-id'));
              if (otherFlightId !== currentFlightId) {
                const otherSelectBtn = otherCardElement.querySelector('.select-btn');
                const otherSelectText = otherSelectBtn.querySelector('div');
                const otherCheckedImg = otherSelectBtn.querySelector('img.checked');

                if (otherCheckedImg) { // Se este outro card estiver selecionado
                  console.log(`[SelectBtn] Deselecting previously selected suggestion flight ID: ${otherFlightId}`);
                  otherCheckedImg.remove();
                  otherSelectText.textContent = 'Select';
                  cart.removeItemByFlightId(otherFlightId);
                }
              }
            });

            const newCheckMark = document.createElement('img');
            newCheckMark.src = '../media/icons/selected.svg';
            newCheckMark.classList.add('checked');
            selectBtn.prepend(newCheckMark);
            selectTextForCard.textContent = 'Selected';
            if (flightData) { 
              handleAddToCart(flightData); 
            }
          }
        renderItemsFromCart(); 
          total.innerHTML = `${formatCurrency(cart.getTotalCost())} €`;
        });
      }
      return cardElement;
    };

    // Criar e adicionar card à secção de sugestões
    const suggestionCard = createFlightCardElement(f, user);
    suggestionsContainer.appendChild(suggestionCard);

    // Se for favorito e o container de favoritos existir, criar e adicionar um NOVO card à secção de favoritos
    if (favoritesContainer && user && user.isFlightFavorite(f.id)) {
      const favoriteCard = createFlightCardElement(f, user); // Criar um novo elemento de card
      favoritesContainer.appendChild(favoriteCard);
    }
  });

}

function handleAddToCart(flightData) {
  cart.addItem(
    flightData.id,
    'Flight',
    flightData.price,
    1
  );

  console.log(`Voo adicionado ao carrinho:`, flightData);
  renderItemsFromCart();
}

const cabinFiltersContainer = document.querySelector('.cabin-filters-container');

function updateSuggestionsList() {
  const checkboxes = cabinFiltersContainer.querySelectorAll('input[type="checkbox"]:checked');
  const selectedCabinTypes = Array.from(checkboxes).map(checkbox => checkbox.value);
  console.log('SelectedCabinTypes:', selectedCabinTypes);

  const flightCards = document.querySelectorAll('.suggestions-flights-grid .flight-card');
  console.log('FlightCards:', flightCards);

  if (flightCards.length > 0) {
    flightCards.forEach(card => {
      // get the value of data-id
      const flightId = parseInt(card.getAttribute('data-id'));
      const flight = flights.searchFlightById(flightId);
      // console.log('Flight:', flightId, flight);
      // check if flight has the checked cabin type
      if (flight && flight.cabin && selectedCabinTypes.includes(flight.cabin) || selectedCabinTypes.length === 0) {
        card.style.display = 'flex';
      } else {
        card.classList.remove('d-flex');
        card.style.display = 'none';
      }
    });
  }
}

function getSelectedCabinFilters() {
  if (cabinFiltersContainer) {
    const checkboxes = cabinFiltersContainer.querySelectorAll('input[type="checkbox"]');
    console.log(checkboxes);
    for (const checkbox of checkboxes) {
      checkbox.addEventListener('change', () => {
        updateSuggestionsList();
      });
    }
  }
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

const total = document.querySelector('.total-quantity');
total.innerHTML = `${formatCurrency(cart.getTotalCost())} €`;

  /* CART */
const cartContainer = document.querySelector('.cart-items');

function renderItemsFromCart() {
  cartContainer.innerHTML = '';

  const items = cart.listAllItems();

  if (items.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    //atualizar total
    return;
  }

  items.forEach(item => {
    const itemContainer = document.createElement('div');
    itemContainer.setAttribute('data-id', item.flightId);
    itemContainer.className = 'cart-item-container';
    itemContainer.innerHTML = `
      <div class="remove-item" data-item-id="${item.id}">
        <img src="../media/icons/close-btn.svg" alt="">
      </div>
      <div class="cart-item d-flex align-items-center justify-content-center">
        <div class="item-title">Setagaya, Japan to Oporto, Portugal</div>
        <div class="item-category">${item.name}</div>
        <div class="item-date">3 May - 5 May 2025</div>
        <div class="item-location">Setagaya, Japan</div>
        <div class="item-price">${formatCurrency(item.price)}</div>
        <button class="see-details-btn d-flex">
          <img src="../media/icons/inspect.svg" alt="">
          <div>See details</div>
        </button>
      </div>
      `;
    cartContainer.appendChild(itemContainer);

    const removeBtn = itemContainer.querySelectorAll('.remove-item');
    if (removeBtn) {
      removeBtn.forEach(btn => {
        btn.addEventListener('click', () => {
          const itemIdString = btn.getAttribute('data-item-id');
          const itemId = parseInt(itemIdString, 10);
          cart.removeItem(itemId);
          renderItemsFromCart();
        });
      });
    }
  });
}

renderItemsFromCart();

const checkoutBtn = document.querySelector('.checkout-btn');

checkoutBtn.addEventListener('click', () => { 
  const cartItems = cart.listAllItems();
  if (cartItems.length === 0) {
    alert('Your cart is empty.');
    return;
  }

  const processedCartItemsForHistory = cartItems.map(item => {
   console.log("Processing cart item:", item); // 3. Verificar cada item do carrinho
    let itemDetails = null;
    if (item.name === 'Flight') {
      const flightDetails = flights.searchFlightById(item.flightId);
      console.log(`Flight details for flightId ${item.flightId}:`, flightDetails); // 4. Verificar os detalhes do voo encontrados

      if (flightDetails) {
        itemDetails = {
          id: flightDetails.id,
          airline: flightDetails.airline,
          departure: flightDetails.departure,
          destinationString: flightDetails.destination,
          cabin: flightDetails.cabin,
          schedules: flightDetails.schedules.map(s => s.toISOString()),
          airport: flightDetails.airport,
          price: flightDetails.price
          };
        console.log("Created itemDetails for history:", itemDetails); // 5. Verificar o objeto de detalhes criado
      } else {
        console.error(`Flight details not found for cart item with flightId: ${item.flightId}`);
      }
    }
    // Futuramente, adicione logs semelhantes para 'Stay' e 'Festival' aqui
    return { ...item, details: itemDetails };
  }).filter(item => item.details !== null); // Filter out items for which details couldn't be found

  console.log("Processed cart items for history (after map and filter):", processedCartItemsForHistory); // 6. Verificar a lista final de itens processados

  const loggedUser = User.getUserLogged();
  console.log("Logged user:", loggedUser); // 7. Verificar o utilizador logado

if (processedCartItemsForHistory.length > 0) {
    loggedUser.addTripPackageToHistory(processedCartItemsForHistory, []);
    loggedUser.addPoints(300);
  cart.clearCart();
    renderItemsFromCart(); // Re-renderiza a lista de itens do carrinho (que agora estará vazia)
    total.innerHTML = `${formatCurrency(cart.getTotalCost())} €`; // Atualiza o total para 0.00 €
    alert('Checkout successful! Your items have been added to your trip history.');
   }
  });

