import { tourismType, flights, destination } from "../init.js";
//import { TourismType } from "../models/PlannerModel.js"; 


/* ADMIN */

/* ADMIN - TYPES OF TOURISM */

function createTourismType() {
  const nameInput = document.querySelector('.tourism-type-name-input');
  const imgInput = document.querySelector('.tourism-type-img-input');
  const createBtn = document.querySelector('.create-tourism-type-btn');

  createBtn.addEventListener('click', (event) => {
    event.preventDefault();
    tourismType.add(nameInput.value.toLowerCase(), nameInput.value, imgInput.value);
    renderTourismTypes();
    tourismType.saveToLocalStorage();
  });
}

createTourismType();

function renderTourismTypes() {
  const table = document.querySelector('.tourism-type-table tbody');

  table.innerHTML = '';
  
  const tourismTypeKeys = Object.keys(tourismType.getAll());
  if (tourismTypeKeys.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = '<td colspan="3">No tourism types available</td>';
    table.appendChild(row);
    return;
  }

  tourismTypeKeys.forEach((key) => {
    const type = tourismType.get(key);
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${type.name}</td>
      <td><img src="${type.img}" alt="${type.name}" style="width: 50px; height: 50px;"></td>
      <td>
        <button class="tourism-type-edit-btn btn btn-primary" data-key="${key}">
          <img src="/media/icons/edit.svg" alt="">
        </button>
        <button class="tourism-type-delete-btn btn btn-danger" data-key="${key}">
          <img src="/media/icons/delete.svg" alt="">
        </button>
      </td>
    `;
    table.appendChild(row);
    deleteTourismType();
  });
}

renderTourismTypes();

function deleteTourismType() {
  const deleteBtns = document.querySelectorAll('.tourism-type-delete-btn');
  deleteBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      const key = btn.getAttribute('data-key');
      tourismType.del(key);
      renderTourismTypes();
      tourismType.saveToLocalStorage();
    });
  });
}

/* ADMIN - DESTINATION */

function renderTourismTypesSelect(tourismTypeInput) {
  // gera as opções do select consoante os tipos de turismo guardados
  const options = Object.keys(tourismType.getAll()).map(key => {
    const type = tourismType.get(key);
    return `<option value="${key}">${type.name}</option>`;
  }).join('');
  tourismTypeInput.innerHTML = options;
}

function createDestination() {
  const destinationInput = document.querySelector('.destination-input');
  const tourismTypeInput = document.querySelector('.tourism-type-select');
  const imgInput = document.querySelector('.destination-img-input');
  const createBtn = document.querySelector('.add-destination-btn');
  
  console.log(tourismType.getAll());
  createBtn.addEventListener('click', (event) => {
    event.preventDefault();

    if(destination.checkDestination(destinationInput.value)) {
      alert('Destination already exists');
      return;
    }

    destination.add(destinationInput.value, destinationInput.value, tourismTypeInput.value, imgInput.value);

    renderDestination();
    destination.saveToLocalStorage();
    console.log(destinationInput.value);
  });

  renderTourismTypesSelect(tourismTypeInput);
}

createDestination();

function renderDestination() {
  const table = document.querySelector('.destination-table tbody');

  table.innerHTML = '';
  const destinations = Object.values(destination.getAll());
  
  if (destinations.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = '<td colspan="3">No destinations available</td>';
    table.appendChild(row);
    return;
  }

  destinations.forEach((des) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${des.destination}</td>
      <td>${des.tourismType}</td>
      <td>
        <button class="btn btn-primary" id="edit-btn" data-key="${des.destination}">
          <img src="/media/icons/edit.svg" alt="Edit">
        </button>
        <button class="delete-destination btn btn-danger" id="delete-btn" data-key="${des.destination}">
          <img src="/media/icons/delete.svg" alt="Delete">
        </button>
      </td>
    `;
    table.appendChild(row);

    deleteDestination();
  });
}

renderDestination();

function deleteDestination() {
  const deleteBtns = document.querySelectorAll('.delete-destination');
  deleteBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
    event.preventDefault();
    const key = btn.getAttribute('data-key');
    destination.del(key);
    renderDestination();
    destination.saveToLocalStorage();
    });
  });
}

/* ADMIN -FLIGHTS */

/*

function renderFlights(flight) {

  const table = document.querySelector('.flight-table tbody');
  table.innerHTML = '';
  
  if (flightKeys.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = '<td colspan="3">No tourism types available</td>';
    table.appendChild(row);
    return;
  }

  //flightKeys.forEach((key) => {
    const f = flight;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${f.departure}</td>
      <td>${f.destination}</td>
      <td>${f.schedules[0]}</td>
      <td>${f.schedules[1]}</td>
      <td>${f.airport}</td>
      <td>${f.cabin}</td>
      <td>${f.airline}</td>
      <td>${f.price}</td>
      <td class="d-flex" style="gap: 5px;">
        <button class="btn btn-primary" id="edit-btn" data-key="${key}">
          <img src="/media/icons/edit.svg" alt="">
        </button>
        <button class="delete-flight-btn btn btn-danger" id="delete-btn" data-key="${key}">
          <img src="/media/icons/delete.svg" alt="">
        </button>
      </td>
    `;
    table.appendChild(row);
    deleteFlight(); 
  });

}

*/

function renderFlights() {
  const table = document.querySelector('.flight-table tbody');
  table.id = 'flight-table';
  table.innerHTML = '';
  const fs = flights.listAllFlights();
  for (const f of fs) {
   renderFlight(f);
  }
  deleteFlight();
}

renderFlights();

function renderFlight(f) {
  const table = document.getElementById('flight-table');

  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${f.departure}</td>
    <td>${f.destination}</td>
    <td>${f.schedules[0]}</td>
    <td>${f.schedules[1]}</td>
    <td>${f.airport}</td>
    <td>${f.cabin}</td>
    <td>${f.airline}</td>
    <td>${f.price}</td>
    <td class="d-flex" style="gap: 5px;">
      <button class="btn btn-primary" data-id="${f.id}">
        <img src="/media/icons/edit.svg" alt="">
      </button>
      <button class="delete-flight-btn btn btn-danger" data-id="${f.id}">
        <img src="/media/icons/delete.svg" alt="">
      </button>
    </td>
  `;

  table.appendChild(row);

}


function renderDestinationSelect(destinationInput) {
  // gera as opções do select consoante os tipos de turismo guardados
  const options = Object.keys(destination.getAll()).map(key => {
    const des = destination.get(key);
    return `<option value="${key}">${des.destination}</option>`;
  }).join('');
  destinationInput.innerHTML = options;
}

function createFlight() {
  const airlineInput = document.querySelector('.airline-input');
  const departureInput = document.querySelector('.departure-input');
  const destinationInput = document.querySelector('.destination-input-flight');
  const dateTimeDepartureInput = document.querySelector('.date-time-departure-input');
  const dateTimeArrivalInput = document.querySelector('.date-time-arrival-input');
  const airportInput = document.querySelector('.airport-input');
  const cabinInput = document.querySelector('.cabin-input');
  const priceInput = document.querySelector('.price-input');

  const createFlightBtn = document.querySelector('.create-flight-btn');
  renderDestinationSelect(destinationInput);
  
  createFlightBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const flight = flights.addFlight(
      airlineInput.value,
      departureInput.value,
      destinationInput.value, 
      ['cultural', 'film'],
      cabinInput.value, 
      [dateTimeDepartureInput.value, dateTimeArrivalInput.value], 
      airportInput.value, 
      priceInput.value
    );
    console.log(flight);
    flights.saveFlights();
    renderFlights();
  });

}

createFlight();

function deleteFlight() {
  const deleteButtons = document.querySelectorAll('.delete-flight-btn');
  deleteButtons.forEach((btn) => {
    btn.addEventListener('click', event => {
      event.preventDefault();
      const idString = btn.getAttribute('data-id');
      const id = parseInt(idString, 10); // Converter para número

      flights.deleteFlight(id);
      flights.saveFlights();  
      renderFlights();

      console.log(id);
      console.log('VOOS:', flights.listAllFlights());
    });
  });
}

/*

function deleteFlight() {
  const deleteBtns = document.querySelectorAll('.delete-flight-btn');
  deleteBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      const key = btn.getAttribute('data-key');
      flight.del(key);
      renderFlights();
      flight.saveToLocalStorage();
    });
  });
}

*/