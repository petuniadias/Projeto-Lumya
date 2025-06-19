import { destination } from "../init.js";

let users;

/* esta função vai existir sempre no MODEL
  carrega os users com dados
*/

// CARREGAR UTILIZADORES DA LOCALSTORAGE
export function init() {
  const storedUsers = localStorage.users ? JSON.parse(localStorage.users) : [];
  // Reidratar cada utilizador como uma instância da classe User
  users = storedUsers.map(
    (userData) =>
      new User(
        userData.name,
        userData.username,
        userData.mail,
        userData.password,
        userData.points,
        userData.tripHistory,
        userData.pendingTrips,
        userData.favoriteFlights
      )
  );
}

//ADICIONAR UTILIZADOR
export function add(
  name,
  username,
  mail,
  password,
  confirmPassword,
  points,
  tripHistory,
  pendingTrips,
  favoriteFlights
) {

  // Verifica se a password e a confirmação de password são iguais
  if (password !== confirmPassword) {
    throw Error("The passwords don't match!");
  }

  if (users.some((user) => user.username === username)) {
    throw Error(`User with username "${username}" already exists!`);
  } else {
    users.push(
      new User(
        name,
        username,
        mail,
        password,
        points,
        tripHistory,
        pendingTrips,
        favoriteFlights
      )
    );
    localStorage.setItem("users", JSON.stringify(users.map((u) => ({ ...u }))));
  }
}

// LOGIN DO UTILIZADOR
export function login(username, password) {
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (user) {
    sessionStorage.setItem("loggedUser", JSON.stringify(user));
    return true;
  } else {
    throw Error("Invalid login!");
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
  name = "";
  username = "";
  mail = "";
  password = "";
  points = 0;
  tripHistory = [];
  pendingTrips = [];
  favoriteFlights = [];
  // tripHistory = []; // Array para guardar histórico de viagens do utilizador

  constructor(
    name,
    username,
    mail,
    password,
    points,
    tripHistory,
    pendingTrips,
    favoriteFlights
  ) {
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
      sessionStorage.setItem("loggedUser", JSON.stringify(this));
    }
    const userIndex = users.findIndex((u) => u.username === this.username);
    if (userIndex !== -1) {
      users[userIndex] = this;
      localStorage.setItem(
        "users",
        JSON.stringify(users.map((u) => ({ ...u })))
      );
    }
  }

  /* POINTS */

  getPoints() {
    return this.points;
  }

  addPoints(value) {
    this.points += value;
    this.updateUserStorage();
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

  addTripPackageToHistory(cartItems, travelersUsernames = []) {
    const newTripPackage = {
      id: `trip_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      bookedOn: new Date().toISOString(),
      travelers: travelersUsernames, // Nomes de utilizador
      flight: null,
      stay: null,
      festivals: [],
      mainDestinationString: "",
      mainDestinationImg: "",
      mainDestinationCountry: "",
    };

    let newCountryVisitedThisTrip = null;

    cartItems.forEach((item) => {
      if (item.name === "Flight" && item.details) {
        // Assumindo que item.details contém o objeto do voo
        newTripPackage.flight = item.details; // item.details já deve ter a estrutura correta do voo
        // Definir o destino principal do pacote com base no voo
        if (
          !newTripPackage.mainDestinationString &&
          item.details.destinationString
        ) {
          newTripPackage.mainDestinationString = item.details.destinationString;
          
          const destDetails = destination.get(item.details.destinationString);
          if (destDetails) {
            newTripPackage.mainDestinationImg = destDetails.img;
            const parts = item.details.destinationString.split(", ");
            newTripPackage.mainDestinationCountry =
              parts.length > 1 ? parts[1] : parts[0];
            if (newTripPackage.mainDestinationCountry) { // Atribuir após mainDestinationCountry estar definido
              newCountryVisitedThisTrip = newTripPackage.mainDestinationCountry;
            }
          }
        }
      }
    });

    // Verificar se é a primeira vez a visitar este país e atribuir pontos
    if (newCountryVisitedThisTrip) {
      const previouslyVisitedCountries = this.countriesVisited(); // Obtém países únicos do histórico *antes* de adicionar esta viagem
      if (!previouslyVisitedCountries.includes(newCountryVisitedThisTrip)) {
        console.log(`First visit to ${newCountryVisitedThisTrip}! Awarding 100 points.`);
        this.addPoints(100);
        // No futuro, aqui também se poderia adicionar o país a uma lista de "países desbloqueados"
        // se quiser manter essa informação separada para a UI do perfil.
      } else {
        console.log(`User has already visited ${newCountryVisitedThisTrip}. No points awarded for country visit.`);
      }
    }

    this.tripHistory.push(newTripPackage);
    this.updateUserStorage();
  }

  getVisitedCountriesWithDates() {
    const visitedCountryDates = {}; // Objeto para guardar a primeira data de visita para cada país

    this.tripHistory.forEach((tripPackage) => {
      const country = tripPackage.mainDestinationCountry;
      const bookedDate = tripPackage.bookedOn; // Data da reserva do pacote

      if (country) {
        if (!visitedCountryDates[country] || new Date(bookedDate) < new Date(visitedCountryDates[country])) {
          visitedCountryDates[country] = bookedDate;
        }
      }
    });

    // Converter para array de objetos e ordenar por data
    return Object.entries(visitedCountryDates)
      .map(([country, firstVisitedDate]) => ({ country, firstVisitedDate }))
      .sort((a, b) => new Date(a.firstVisitedDate) - new Date(b.firstVisitedDate));
  }

  countriesVisited() {
    const countries = [];
    this.tripHistory.forEach((trip) => {
      if (
        trip.mainDestinationCountry &&
        !countries.includes(trip.mainDestinationCountry)
      ) {
        countries.push(trip.mainDestinationCountry);
      }
    });
    return countries; // Retorna países únicos
  }

  /* FAVORITE FLIGHTS */

  addFavoriteFlight(flightId) {
    if (
      Array.isArray(this.favoriteFlights) &&
      !this.favoriteFlights.includes(flightId)
    ) {
      this.favoriteFlights.push(flightId);
      console.log(this.favoriteFlights);
      this.updateUserStorage();
    }
  }

  isFlightFavorite(flightId) {
    return (
      Array.isArray(this.favoriteFlights) &&
      this.favoriteFlights.includes(flightId)
    );
  }

  removeFavoriteFlight(flightId) {
    const index = Array.isArray(this.favoriteFlights)
      ? this.favoriteFlights.indexOf(flightId)
      : -1;
    if (index > -1) {
      this.favoriteFlights.splice(index, 1);
      this.updateUserStorage();
    }
  }
}