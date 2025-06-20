/* TYPES OF TOURISM */

export class TourismType {
  tourismType = {};
  localStorageTourismTypeKey = 'tourismTypeKeys'; // Chave para guardar no localStorage

  constructor() {  // Incializa com um objeto vazio

    //VERIFICA SE JÁ EXISTE NO LOCAL STORAGE
    const storedData = localStorage.getItem(this.localStorageTourismTypeKey);
    if (storedData) {
      this.tourismType = JSON.parse(storedData);
    } else {
      this.tourismType = {}; // É um objeto vazio se não houver nada no localStorage
    }
  }

  // SALVA NO LOCAL STORAGE
  saveToLocalStorage() {
    localStorage.setItem(this.localStorageTourismTypeKey, JSON.stringify(this.tourismType));
  }

  // ADICIONA UM TIPO DE TURISMO
  add(key, name, status = true) {
    if (this.tourismType[key]) {
      throw Error(`Tourism Type with name "${key}" already exists!`);
    }
    const imgPath = `/media/img/tourism type/${key}.png`;
    this.tourismType[key] = {
      name,
      img: imgPath,
      status
    };

    this.saveToLocalStorage();
  }

  del(key) {
    if (!this.tourismType[key]) {
      throw Error(`Tourism Type with name "${key}" does not exist!`);
    }
    delete this.tourismType[key];
    
    this.saveToLocalStorage(); // SALVA NO LOCAL STORAGE APÓS ADICIONAR
  }

  update(key, name, status = true) {
    if (!this.tourismType[key]) {
      throw Error(`Tourism Type with name "${key}" does not exist!`);
    }
    const imgPath = `/media/img/tourism type/${key}.png`;
    this.tourismType[key] = {
      name,
      img: imgPath,
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

  add(key, destinationName, tourismType = [], status = true) {
    if(this.destination[key]) {
      throw Error(`Destination with key "${key}" already exists!`);
    }

    const imgFileName = destinationName.toLowerCase().replace(/, /g, '-').replace(/\s+/g, '-');
    const imgPath = `/media/img/destinations/${imgFileName}.jpg`;;

    this.destination[key] = {
      destination: destinationName,
      tourismType,
      img: imgPath,
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

  update(key, destinationName, tourismType, status = true) {
    if (!this.destination[key]) {
      throw Error(`Destination with key "${key}" does not exist!`);
    }

    const imgFileName = destinationName.toLowerCase().replace(/, /g, '-').replace(/\s+/g, '-');
    const imgPath = `/media/img/destinations/${imgFileName}.jpg`;

    this.destination[key] = {
      destination: destinationName,
      tourismType,
      img: imgPath,
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

  getTourismTypes(des) {
    // check if des exists in destinations
    console.log(this.destination, des);
    if (des in this.destination) {
      return this.destination[des].tourismType;
    }
    return [];
  }

}

/* FLIGHTS */

export class FlightManager {
  /**
   * CRIA UM VOO.
   *
   */
  
  constructor(destinations) {
    this.destinations = destinations;

    this.storageKey = 'flights';
    this.flightIdCounterKey = 'flightIdCounter';
    // Inicializa os voos da localStorage
    this.flights = this.loadFlights();
    // Inicializa contador de IDs da localStorage
    this.flightIdCounter = this.loadFlightIdCounter();
  }


  // Pega os voos da localStorage
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

  // Pega o ID dos voos da localStorage
  loadFlightIdCounter() {
      const storedCounter = localStorage.getItem(this.flightIdCounterKey);
      return storedCounter ? parseInt(storedCounter) : 1;
  }

  // Guarda os voos na localStorage
  saveFlights() {
      localStorage.setItem(this.storageKey, JSON.stringify(this.flights));
      localStorage.setItem(this.flightIdCounterKey, this.flightIdCounter.toString());
  }

  // Adiciona um novo voo
  addFlight(airline, departure, destination, tourismType = [], cabin = 'Economy', schedules, airport, price, status = true) {
      const flight = {
          id: this.flightIdCounter++,
          airline,
          departure,
          destination,
          tourismType: this.destinations.getTourismTypes(destination),
          cabin,
          schedules: schedules.map(schedule => new Date(schedule)),
          airport,
          price: parseFloat(price),
          status,
      };
      this.flights.push(flight);
      this.saveFlights();
      return flight;
  }

  // Lista todos os voos
  listAllFlights() {
      return this.flights;
  }

  // Lista os voos por companhia aerea
  listFlightsByAirline(airline) {
      return this.flights.filter(flight => flight.airline.toLowerCase() === airline.toLowerCase());
  }

  // Procura voo pelo ID
  searchFlightById(id) {
    /*
      for (const flight of this.flights) {
        const flightId = id;
        if (flight.id === id) {
          return flight;
        }
      }
      return null;
    */

    return this.flights.find(flight => flight.id === id) || null;
  }

  // Remove um voo pelo ID
  deleteFlight(id) {
      const index = this.flights.findIndex(flight => flight.id === id);
      if (index !== -1) {
          return this.flights.splice(index, 1)[0];
      }
      return null;
  }

  // Atualiza um voo pelo ID
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

  // Remove todos os voos
  deleteAllFlights() {
    const deletedFlights = [...this.flights];
    this.flights = [];
    this.flightIdCounter = 1;
    return deletedFlights;
  }

  // Conta todos os voos
  countAllFlights() {
    return this.flights.length;
  }

  // Conta os voos por companhia aerea
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
          if (types[ft] === tourismType[f].toLowerCase()) {
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

export class Stays {
  
  constructor(destinations) {
    this.destinations = destinations;
    this.storageKey = 'stays';
    this.staysIdCounterKey = 'staysIdCounter';
    // Inicializa os alojamento da localStorage
    this.stays = this.loadStays();
    // Initialize ID counter from localStorage or start at 1
    this.StaysIdCounter = this.loadStaysIdCounter();
  }


  // Load stays from localStorage
  loadStays() {
      const storedStays = localStorage.getItem(this.storageKey);
      if (storedStays) {
          const stays = JSON.parse(storedStays);
          // Convert schedules strings back to Date objects
          return stays.map(stay => ({
              ...stay, // create a shallow copy of the flight object's properties
              schedules: stay.schedules.map(schedule => new Date(schedule))
          }));
      }
      return [];
  }

  // Load stay ID counter from localStorage
  loadStayIdCounter() {
      const storedCounter = localStorage.getItem(this.stayIdCounterKey);
      return storedCounter ? parseInt(storedCounter) : 1;
  }

  // Save flights to localStorage
  saveStays() {
      localStorage.setItem(this.storageKey, JSON.stringify(this.stays));
      localStorage.setItem(this.staysIdCounterKey, this.staysIdCounter.toString());
  }

  // Add a new stay
  addStay() {

  }

  // List all stays
  listAllStays() {
      return this.stays;
  }

  // Search for a flight by ID
  searchStaysById(id) {
    /*
      for (const flight of this.flights) {
        const flightId = id;
        if (flight.id === id) {
          return flight;
        }
      }
      return null;
    */

    return this.stays.find(stay => stay.id === id) || null;
  }

  // Delete a stay by ID
  deleteStay(id) {
      const index = this.stays.findIndex(stay => stay.id === id);
      if (index !== -1) {
          return this.stays.splice(index, 1)[0];
      }
      return null;
  }

  // Update a stay by ID
  updateStay(id, updates) {
  }

  // Delete all stays
  deleteAllStays() {
    const deletedStays = [...this.stays];
    this.stays = [];
    this.stayIdCounter = 1;
    return deletedStays;
  }

  // Count all stays
  countAllStays() {
    return this.stays.length;
  }

  // Count stays by airline
  countStaysByAirline(airline) {
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
          if (types[ft] === tourismType[f].toLowerCase()) {
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

/* STEP FIVE */

export class Cart {
  constructor() {
    this.storageKey = 'cartItems';
    this.cartId = 0;
    this.items = this.loadItems();
  }

  // CARREGAR OS ITENS DA LOCALSTORAGE
  loadItems() {
    const storedItems = localStorage.getItem(this.storageKey);
    return storedItems ? JSON.parse(storedItems) : [];
  }

  // SALVAR OS ITENS NA LOCALSTORAGE
  saveItems() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
  }

  // ADD AN ITEM TO THE CART
  addItem(flightId, name, price, quantity) {
    const item = {
      id: this.cartId++,
      flightId,
      name,
      price,
      quantity
    }
    this.items.push(item);
    this.saveItems();
    return item;
  }

  // REMOVE AN ITEM FROM THE CART
  removeItem(id) {
    if (this.items.length > 0) { //VERIFICA SE TEM ITENS NO CARRINHO
      const index = this.items.findIndex(item => item.id === id);
      if (index !== -1) { // DEVOLVE -1 SE NAO ENCONTRAR, OU SEJA, NÃO PODE SER IGUAL A -1
        const removedItem =this.items.splice(index, 1)[0];
        this.saveItems();
        return removedItem;
      }
    }
    return null;
  }

  removeItemByFlightId(flightId) {
    const index = this.items.findIndex(item => item.flightId === flightId && item.name === 'Flight');
    if (index !== -1) {
      const removedItem = this.items.splice(index, 1)[0];
      this.saveItems();
      return removedItem;
    }
    console.warn(`Cart: Item with flightId ${flightId} not found for removal.`);
    return null;
  }

  // RETORNA TODOS OS ITEMS
  listAllItems() {
    return this.items;
  }

  // RETIRA TODOS OS ITENS DO CARRINHO
  clearCart() {
    const clearedItems = [...this.items];
    this.items = [];
    this.saveItems();
    return clearedItems;
  }

  // RETORNA O RESULTADO DO CUSTO DE TODOS OS ITENS
  getTotalCost() {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}
