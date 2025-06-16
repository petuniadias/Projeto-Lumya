import { destination } from "../init.js";

let users;

/* esta função vai existir sempre no MODEL
  carrega os users com dados
*/

// CARREGAR UTILIZADORES DA LOCALSTORAGE
export function init() {
  const storedUsers = localStorage.users ? JSON.parse(localStorage.users) : [];
  // Reidratar cada utilizador como uma instância da classe User
  users = storedUsers.map(userData => new User(
    userData.name,
    userData.username,
    userData.mail,
    userData.password,
    userData.points,
    userData.tripHistory,
    userData.pendingTrips,
    userData.favoriteFlights
  ));
}

/* Funções para gerir utilizador */
/* quando tratar de erros usar throw */

//ADICIONAR UTILIZADOR
export function add(name, username, mail, password, points, tripHistory, pendingTrips, favoriteFlights) {
  if (users.some((user) => user.username === username)) {
    throw Error(`User with username "${username}" already exists!`);
  } else {
    users.push(new User(name, username, mail, password, points, tripHistory, pendingTrips, favoriteFlights));
    localStorage.setItem("users", JSON.stringify(users.map(u => ({ ...u }))));
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
  const loggedUserData = JSON.parse(sessionStorage.getItem("loggedUser"));
  if (loggedUserData) {
    // Reidratar como uma instância de User para que tenha métodos
    return new User(
      loggedUserData.name,
      loggedUserData.username,
      loggedUserData.mail,
      loggedUserData.password,
      loggedUserData.points,
      loggedUserData.tripHistory,
      loggedUserData.pendingTrips,
      loggedUserData.favoriteFlights
    );
  }
  return null;
}

/**
 * CLASSE QUE MODELA UM UTILIZADOR NA APLICAÇÃO
*/

export class User {
  name = '';
  username = '';
  mail = '';
  password = '';
  points = 0;
  tripHistory = [];
  pendingTrips = [];
  favoriteFlights = [];
  // tripHistory = []; // Array para guardar histórico de viagens do utilizador

  constructor(name, username, mail, password, points, tripHistory, pendingTrips, favoriteFlights) {
    this.name = name;
    this.username = username;
    this.mail = mail;
    this.password = password;
    if (points !== undefined) {
      this.points = points;
    }
    if (tripHistory !== undefined) {
      this.tripHistory = tripHistory;
    }
    if (pendingTrips !== undefined) {
      this.pendingTrips = pendingTrips;
    }
    this.favoriteFlights = favoriteFlights || [];
  }

  updateUserStorage() {
    const currentUserData = JSON.parse(sessionStorage.getItem("loggedUser"));
     if (currentUserData && currentUserData.username === this.username) {
      sessionStorage.setItem('loggedUser', JSON.stringify(this));
    }
    const userIndex = users.findIndex(u => u.username === this.username);
    if (userIndex !== -1) {
      users[userIndex] = this;
      localStorage.setItem("users", JSON.stringify(users.map(u => ({ ...u }))));
    }
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


  /* FAVORITE FLIGHTS */

  addFavoriteFlight(flightId) {
    if (!this.favoriteFlights.includes(flightId)) {
      this.favoriteFlights.push(flightId);
      this.updateUserStorage();
    }
  }

  isFlightFavorite(flightId) {
    return Array.isArray(this.favoriteFlights) && this.favoriteFlights.includes(flightId);
  }

  removeFavoriteFlight(flightId) {
    const index = this.favoriteFlights.indexOf(flightId);
    if (index > -1) {
      this.favoriteFlights.splice(index, 1);
      this.updateUserStorage();
    }
  }
 
}

