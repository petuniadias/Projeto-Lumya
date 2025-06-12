/* TYPES OF TOURISM */

export class TourismType {
  tourismType = {};
  localStorageTourismTypeKey = 'tourismTypeKeys'; // CHAVE PARA GUARDAR NO LOCAL STORAGE

  constructor(tourismType = {}) {  // INICIALIZA COM UM OBJETO VAZIO SE NAO TIVER DÁ NULL
    this.tourismType = tourismType;

    //VERIFICA SE JÁ EXISTE NO LOCAL STORAGE
    if (localStorage.getItem(this.localStorageTourismTypeKey)) {
      this.tourismType = JSON.parse(localStorage.getItem(this.localStorageTourismTypeKey));
    } else {
      localStorage.setItem(this.localStorageTourismTypeKey, JSON.stringify(this.tourismType));
    }
  }

  // SALVA NO LOCAL STORAGE
  saveToLocalStorage() {
    localStorage.setItem(this.localStorageTourismTypeKey, JSON.stringify(this.tourismType));
  }

  add(key, name, img, status = true) {
    if (this.tourismType[key]) {
      throw Error(`Tourism Type with name "${key}" already exists!`);
    }
    this.tourismType[key] = {
      name,
      img,
      status
    };

    this.saveToLocalStorage(); // SALVA NO LOCAL STORAGE APÓS ADICIONAR
  }

  del(key) {
    if (!this.tourismType[key]) {
      throw Error(`Tourism Type with name "${key}" does not exist!`);
    }
    delete this.tourismType[key];
    
    this.saveToLocalStorage(); // SALVA NO LOCAL STORAGE APÓS ADICIONAR
  }

  update(key, name, img, status = true) {
    if (!this.tourismType[key]) {
      throw Error(`Tourism Type with name "${key}" does not exist!`);
    }
    this.tourismType[key] = {
      name,
      img,
      status
    };

    this.saveToLocalStorage(); // SALVA NO LOCAL STORAGE APÓS ADICIONAR
  }

  get(key) { // RETORNA UM TIPO DE TURISMO
    if (!this.tourismType[key]) {
      throw Error(`Tourism Type with name "${key}" does not exist!`); 
    }
    return this.tourismType[key];
  }

  getAll(status = null) { // RETORNA TODOS OS TIPOS DE TURISMO /* status = null PARA PODER FILTRAR */
    if (status === null) {
      return this.tourismType;
    }

    if (status === true || status === false) { 
      const filteredTourismType = {};
      for (const key in this.tourismType) {
        if (this.tourismType[key].status === status) {
          filteredTourismType[key] = this.tourismType[key]; // TEM DE TER A MESMA CHAVE
        }
      }
      return filteredTourismType;
    }
  }

  cleanAll() { // LIMPA TODOS OS TIPOS DE TURISMO
    this.tourismType = {};
    this.saveToLocalStorage(); // SALVA NO LOCAL STORAGE APÓS LIMPAR
  }
}

/* EXEMPLO DE USO

tt.getAll(); // RETORNA TODOS OS TIPOS DE TURISMO
tt.getAll(true);
tt.getAll(false);

tt.add('cultural', 'cultural', '/media/img/cultural.png', false); 

tt.del('cultural'); // ELIMINA O TIPO DE TURISMO CULTURAL

tt.update('cultural', 'cultural', '/media/img/cultural.png', true); // ATUALIZA O TIPO DE TURISMO CULTURAL

*/

/*
const tourismType = new TourismType({
  cultural: {
    name: 'Cultural',
    img: '/media/img/cultural.png',
    status: true 
  },
  music: {
    name: 'Music',
    img: '/media/img/music.png',
    status: true 
  }, 
  film: {
    name: 'Film',
    img: '/media/img/film.png',
    status: true
  }
});

*/

/* DESTINATION */

export class Destination {
  destination = {};
  tourismType = new TourismType(); // INSTANCIA O TURISMO PARA PODER USAR OS TIPOS DE TURISMO
  tourismTypeKeys = this.tourismType.getAll(); // PEGA TODOS OS TIPOS DE TURISMO

  localStorageDestinationKey = 'destinationKeys'; // CHAVE PARA GUARDAR NO LOCAL STORAGE

  constructor(destination = {}) { // INICIALIZA COM UM OBJETO VAZIO SE NAO TIVER DÁ NULL
    this.destination = destination;

    //VERIFICA SE JÁ EXISTE NO LOCAL STORAGE
    if (localStorage.getItem(this.localStorageDestinationKey)) {
      this.destination = JSON.parse(localStorage.getItem(this.localStorageDestinationKey));
    } else {
      localStorage.setItem(this.localStorageDestinationKey, JSON.stringify(this.destination));
    }
  }

  saveToLocalStorage() { // SALVA NO LOCAL STORAGE
    localStorage.setItem(this.localStorageDestinationKey, JSON.stringify(this.destination));
  }

  add(key, destination, tourismType, img, status = true) {
    if(this.destination[key]) {
      throw Error(`Destination with key "${key}" already exists!`);
    }

    this.destination[key] = {
      destination: destination,
      tourismType,
      img,
      status
    };

    this.saveToLocalStorage(); // SALVA NO LOCAL STORAGE APÓS ADICIONAR
  }

  del(key) {
    if (!this.destination[key]) {
      throw Error(`Destination with key "${key}" does not exist!`);
    }
    delete this.destination[key];
    
    this.saveToLocalStorage(); // SALVA NO LOCAL STORAGE APÓS REMOVER
  }

  update(key, destination, tourismType, img, status = true) {
    if (!this.destination[key]) {
      throw Error(`Destination with key "${key}" does not exist!`);
    }
    this.destination[key] = {
      destination: destinationName,
      tourismType,
      img,
      status
    };

    this.saveToLocalStorage(); // SALVA NO LOCAL STORAGE APÓS ATUALIZAR
  }

  get(key) { // RETORNA UM DESTINO
    if (!this.destination[key]) {
      throw Error(`Destination with key "${key}" does not exist!`);
    }
    return this.destination[key];
  }

  getAll(status = null) { // RETORNA TODOS OS DESTINOS /* status = null PARA PODER FILTRAR */
    if (status === null) {
      return this.destination;
    }

    if (status === true || status === false) { 
      const filteredDestination = {};
      for (const key in this.destination) {
        if (this.destination[key].status === status) {
          filteredDestination[key] = this.destination[key]; // TEM DE TER A MESMA CHAVE
        }
      }
      return filteredDestination;
    }
  }

  checkDestination(destination) { //RETORNA TRUE SE O DESTINO EXISTE RETORNA FALSE SE NAO EXISTE

    for(const key in this.destination) {
      if (destination === this.destination[key].destination) {
        return true;
      }
    }
    return false;
  }
}

/* FLIGHTS */

export class FlightManager {
  
    constructor() {
        this.storageKey = 'flights';
        this.flightIdCounterKey = 'flightIdCounter';
        // Initialize flights from localStorage or empty array
        this.flights = this.loadFlights();
        // Initialize ID counter from localStorage or start at 1
        this.flightIdCounter = this.loadFlightIdCounter();
    }


    // Load flights from localStorage
    loadFlights() {
        const storedFlights = localStorage.getItem(this.storageKey);
        if (storedFlights) {
            const flights = JSON.parse(storedFlights);
            // Convert schedules strings back to Date objects
            return flights.map(flight => ({
                ...flight, // create a shallow copy of the flight object's properties
                schedules: flight.schedules.map(schedule => new Date(schedule))
            }));
        }
        return [];
    }

    // Load flight ID counter from localStorage
    loadFlightIdCounter() {
        const storedCounter = localStorage.getItem(this.flightIdCounterKey);
        return storedCounter ? parseInt(storedCounter) : 1;
    }

    // Save flights to localStorage
    saveFlights() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.flights));
        localStorage.setItem(this.flightIdCounterKey, this.flightIdCounter.toString());
    }

    // Add a new flight
    addFlight(airline, departure, destination, tourismType = [], cabin = 'Economy', schedules, airport, price, status = true) {
        const flight = {
            id: this.flightIdCounter++,
            airline: airline,
            departure,
            destination: destination,
            tourismType: tourismType,
            cabin: cabin,
            schedules: schedules.map(schedule => new Date(schedule)),
            airport: airport,
            price: parseFloat(price),
            status: status,
        };
        this.flights.push(flight);
        return flight;
    }

    // List all flights
    listAllFlights() {
        return this.flights;
    }

    // List flights by airline
    listFlightsByAirline(airline) {
        return this.flights.filter(flight => flight.airline.toLowerCase() === airline.toLowerCase());
    }

    // Search for a flight by ID
    searchFlightById(id) {
        return this.flights.find(flight => flight.id === id) || null;
    }

    // Delete a flight by ID
    deleteFlight(id) {
        const index = this.flights.findIndex(flight => flight.id === id);
        if (index !== -1) {
            return this.flights.splice(index, 1)[0];
        }
        return null;
    }

    // Update a flight by ID
    updateFlight(id, updates) {
        const flight = this.searchFlightById(id);
        if (!flight) return null;

        if (updates.airline) flight.airline = updates.airline;
        if (updates.departure) flight.departure = updates.departure;
        if (updates.destination) flight.destination = updates.destination;
        if (updates.tourismType) flight.tourismType = updates.tourismType;
        if (updates.cabin) flight.cabin = updates.cabin;
        if (updates.schedules) flight.schedules = updates.schedules.map(schedule => new Date(schedule));
        if (updates.airport) flight.airport = updates.airport;
        if (updates.price) flight.price = parseFloat(updates.price);
        if (updates.status !== undefined) flight.status = updates.status;

        return flight;
    }

    // Delete all flights
    deleteAllFlights() {
        const deletedFlights = [...this.flights];
        this.flights = [];
        this.flightIdCounter = 1;
        return deletedFlights;
    }

    // Count all flights
    countAllFlights() {
        return this.flights.length;
    }

    // Count flights by airline
    countFlightsByAirline(airline) {
        return this.listFlightsByAirline(airline).length;
    }


    getFlightByInput(startDate, departure, destination, tourismType = []) {
      const date = { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit' 
      };

      const dateStart = new Date(startDate).toLocaleDateString('en-GB', date);;
      
      function checkTypes(types) {
        let count = 0;
        for (const ft in types) {
          for (const f in tourismType) {
            if (types[ft] === tourismType[f]) {
              count++;
            }
          }
        }
        return count === tourismType.length;
      }

      const matchingFlights = [];

      for (const f in this.flights) {

        const flightStartDate = this.flights[f].schedules[0].toLocaleDateString('en-GB', date);
        
        console.log(
            'SCHEDULES flight:', flightStartDate,
            'DATE INPUT:', dateStart,
            'DEPARTURE FLIGHT:', this.flights[f].departure,
            'DEPARTURE INPUT:', departure,
            'DESTINATION INPUT:', destination,
            'DESTINATION FLIGHT:', this.flights[f].destination,
            'TOURISM TYPE:', checkTypes(this.flights[f].tourismType),
            'TOURISM TYPE INPUT:', tourismType,
            'TOURISM TYPE FLIGHT:', this.flights[f].tourismType
        );

        if (
          flightStartDate === dateStart &&
          this.flights[f].departure === departure &&
          this.flights[f].destination === destination &&
          checkTypes(this.flights[f].tourismType)) {
          matchingFlights.push(this.flights[f]);
        }
      }
      return matchingFlights;
    }
}

// Example usage:
/*
const flightManager = new FlightManager();

// Add flights
flightManager.addFlight("TAP", "Paris", "Economic", ['2025-06-20T08:00:00', '2025-06-20T11:00:00'], "Lisbon Airport", 500);
flightManager.addFlight("Lufthansa", "Tokyo", "Economic", ['2025-06-20T08:00:00', '2025-06-20T11:00:00'],, "Lisbon Airport", 800);
flightManager.addFlight("Iberia", "London", "Economic", ['2025-06-20T08:00:00', '2025-06-20T11:00:00'],, "Lisbon Airport", 450);

// List all flights
console.log(flightManager.listAllFlights());

// List TAP flights
console.log(flightManager.listFlightsByAirline("TAP"));

// Search for a flight
console.log(flightManager.searchFlightById(1));

// Update a flight
console.log(flightManager.updateFlight(1, { price: 550, destination: "Rome", status: false }));

// Delete a flight
console.log(flightManager.deleteFlight(2));

// Count flights
console.log(flightManager.countAllFlights());
console.log(flightManager.countFlightsByAirline("TAP"));

// Delete all flights
console.log(flightManager.deleteAllFlights());
*/




/* STEP FIVE */

export class Cart {

  cartItems = {};
  localStorageCartKey = 'cartKeys';

  constructor(cartItems = {}) {
    this.cartItems = cartItems;
  }

  saveToLocalStorage() {
    localStorage.setItem(this.localStorageCartKey, JSON.stringify(this.cartItems));
  }

  addToCart(key, title, productType, schedules = [], destination, price, status = true ) {
    this.cartItems[key] = {
      title,
      productType,
      schedules,
      destination,
      price,
      status
    }

    this.saveToLocalStorage();

  }

  del(key) {
    if (!this.cartItems[key]) {
    throw Error(`Cart with key "${key}" does not exist!`);
    }
    delete this.cartItems[key];
    this.saveToLocalStorage();
  }

}


