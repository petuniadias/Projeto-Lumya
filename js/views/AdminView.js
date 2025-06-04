import { tourismType } from "../init.js";
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
        <button class="delete-tourism-type-btn" data-key="${key}">Delete</button>
      </td>
    `;
    table.appendChild(row);
  });
}

/* ADMIN - DESTINATION */

function createDestination() {
  const nameInput = document.querySelector('.tourism-type-name-input');
  const imgInput = document.querySelector('.tourism-type-img-input');
  const createBtn = document.querySelector('.create-tourism-type-btn');

  createBtn.addEventListener('click', (event) => {
    event.preventDefault();
    tourismType.add(nameInput.value.toLowerCase(), nameInput.value, imgInput.value);
    renderTourismTypes();
  });
}

createDestination();

function renderDestination() {
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
    const type = destination.get(key);
    const row = document.createElement('tr');
    row.innerHTML = `
      
    `;
    table.appendChild(row);
  });
}