import { tourismType, flight, destination } from "../init.js";
import { Flight } from "../models/PlannerModel.js";
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
  console.log(tourismType.getAll());
  
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
        <button class="tourism-type-edit-btn btn btn-primary" id="edit-btn" data-key="${key}">
          <img src="/media/icons/edit.svg" alt="">
        </button>
        <button class="tourism-type-delete-btn btn btn-danger" id="delete-btn" data-key="${key}">
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

console.log(tourismType.getAll());

/* ADMIN - DESTINATION */

function createDestination() {
  const nameInput = document.querySelector('.tourism-type-name-input');
  const imgInput = document.querySelector('.tourism-type-img-input');
  const createBtn = document.querySelector('.create-tourism-type-btn');

  createBtn.addEventListener('click', (event) => {
    event.preventDefault();

    flight.getDestination('paris');

    destination.add(nameInput.value.toLowerCase(), nameInput.value, imgInput.value);
    renderDestination();
  });
}

createDestination();

function renderDestination() {
  const table = document.querySelector('.destination-table tbody');

  table.innerHTML = '';

  const destinations = flight.getAllDestinations();
  console.log(destinations);
  
  if (destinations.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = '<td colspan="3">No destinations available</td>';
    table.appendChild(row);
    return;
  }

  destinations.forEach((des) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${des}</td>
      <td>film</td>
      <td>
        <button class="btn btn-primary" id="edit-btn">
          <img src="/media/icons/edit.svg" alt="Edit">
        </button>
        <button class="btn btn-danger" id="delete-btn">
          <img src="/media/icons/delete.svg" alt="Delete">
        </button>
      </td>
    `;
    table.appendChild(row);
  });
}

renderDestination();

/* ADMIN -FLIGHTS */

function renderFlights() {
  const table = document.querySelector('.flight-table tbody');
  table.innerHTML = '';
  console.log(flight.getAll());
  
  const flightKeys = Object.keys(flight.getAll());
  if (flightKeys.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = '<td colspan="3">No tourism types available</td>';
    table.appendChild(row);
    return;
  }

  flightKeys.forEach((key) => {
    const f = flight.get(key);

    console.log('Schedules:', f);
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
        <button class="btn btn-danger" id="delete-btn" data-key="${key}">
          <img src="/media/icons/delete.svg" alt="">
        </button>
      </td>
    `;
    table.appendChild(row);
  });

}

renderFlights();

function createFlight() {
  const airlineInput = document.querySelector('.airline-input');
  const departureInput = document.querySelector('.departure-input');
  const destinationInput = document.querySelector('.destination-input');
  const dateTimeDepartureInput = document.querySelector('.date-time-departure-input');
  const dateTimeArrivalInput = document.querySelector('.date-time-arrival-input');
  const airportInput = document.querySelector('.airport-input');
  const cabinInput = document.querySelector('.cabin-input');
  const priceInput = document.querySelector('.price-input');

  const createFlightBtn = document.querySelector('.create-flight-btn');

  createFlightBtn.addEventListener('click', (event) => {
    event.preventDefault();

    flight.add(
      airlineInput.value, 
      airlineInput.value, 
      departureInput.value, 
      destinationInput.value, 
      cabinInput.value, 
      [dateTimeDepartureInput.value, dateTimeArrivalInput.value], 
      airportInput.value, 
      priceInput.value
    );

    renderFlights();
  });

}

createFlight();

