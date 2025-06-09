import { destination } from "../init.js";

let users;

/* esta função vai existir sempre no MODEL
  carrega os users com dados
*/

// CARREGAR UTILIZADORES DA LOCALSTORAGE
export function init() {
  users = localStorage.users ? JSON.parse(localStorage.users) : [];
}

/* Funções para gerir utilizador */
/* quando tratar de erros usar throw */

//ADICIONAR UTILIZADOR
export function add(name, username, mail, password) {
  if (users.some((user) => user.username === username)) {
    throw Error(`User with username "${username}" already exists!`);
  } else {
    users.push(new User(name, username, mail, password));
    localStorage.setItem("users", JSON.stringify(users));
  }
}

// LOGIN DO UTILIZADOR
export function login(username, password) {
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (user) {
    sessionStorage.setItem('loggedUser', JSON.stringify(user));
    return true;
  } else {
    throw Error('Invalid login!');
  }
}

// LOGOUT DO UTILIZADOR
export function logout() {
  sessionStorage.removeItem("loggedUser");
}

// VERIFICA EXISTÊNCIA DE ALGUÉM AUTENTICADO
export function isLogged() {
  return sessionStorage.getItem("loggedUser") ? true : false;
}

// DEVOLVE UTILIZADOR AUTENTICADO
export function getUserLogged() {
  return JSON.parse(sessionStorage.getItem("loggedUser"));
}

/**
 * CLASSE QUE MODELA UM UTILIZADOR NA APLICAÇÃO
 */

class User {
  name = '';
  username = '';
  mail = '';
  password = '';
  points = 0;
  tripHistory = [];
  pendingTrips = [];
  // tripHistory = []; // Array para guardar histórico de viagens do utilizador

  constructor(name, username, mail, password, points, tripHistory, pendingTrips) {
    this.name = name;
    this.username = username;
    this.mail = mail;
    this.password = password;
    this.points = points;
    this.tripHistory = tripHistory;
    this.pendingTrips = pendingTrips;
  }


  /* POINTS */
	
  getPoints() {
    return this.points;
  }

  addPoints(value) {
    this.points += value;
  }


  /* TRIPS */

  getDestinationFromTripHistory() {
    const destinations = [];
    this.tripHistory.forEach((trip) => {
      destinations.push(trip.destination);
    });
    return destinations;
  }

  getPendingTrips() {
    return this.pendingTrips;
  }

  addPendingTrip(trip) {
    this.pendingTrips.push(trip);
  }

  addTripToHistory(trip) {

    this.tripHistory.push({
      schedules: trip.schedules,
      destination: {
        country: trip.destination.country,
        img: trip.destination.img
      }
    });
  }

  countriesVisited() {
    const countries = [];
    this.tripHistory.forEach((trip) => {
      countries.push(trip.destination.country);
  });
    return countries;
  }

}

