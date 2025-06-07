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

  add(key, destination, tourismType = [], img, status = true) {
    if(this.destination[key]) {
      throw Error(`Destination with key "${key}" already exists!`);
    }

    this.destination[key] = {
      destination,
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

  update(key, destination, flights = [], img, status = true) {
    if (!this.destination[key]) {
      throw Error(`Destination with key "${key}" does not exist!`);
    }
    this.destination[key] = {
      destination,
      flights,
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

export class Flight {
  flight = {};
  localStorageFlightKey = 'flightKeys'; // CHAVE PARA GUARDAR NO LOCAL STORAGE

  constructor(flight = {}) { // INICIALIZA COM UM OBJETO VAZIO SE NAO TIVER DÁ NULL
    this.flight = flight;

    //VERIFICA SE JÁ EXISTE NO LOCAL STORAGE
    if (localStorage.getItem(this.localStorageFlightKey)) {
      this.flight = JSON.parse(localStorage.getItem(this.localStorageFlightKey));
    } else {
      localStorage.setItem(this.localStorageFlightKey, JSON.stringify(this.flight));
    }
  }

  // SALVA NO LOCAL STORAGE
  saveToLocalStorage() {
    localStorage.setItem(this.localStorageFlightKey, JSON.stringify(this.flight));
  }

  add(key, airline, departure, destinationKey, cabin, schedules = [], airport, price, status = true) {
    const des = new Destination(); // INSTANCIA O DESTINO PARA PODER USAR OS DESTINOS
    const desInstance = des.get(destinationKey); // PEGA O DESTINO

    this.flight[key] = {
      airline,
      departure,
      destination: {
        destination: desInstance.destination,
        tourismType: desInstance.tourismType
      },
      cabin,
      schedules,
      airport,
      price,
      status
    };

    this.saveToLocalStorage(); // SALVA NO LOCAL STORAGE APÓS ADICIONAR
  }

  del(key) {
    if (!this.flight[key]) {
      throw Error(`Flight with key "${key}" does not exist!`);
    }
    delete this.flight[key];
    
    this.saveToLocalStorage(); // SALVA NO LOCAL STORAGE APÓS REMOVER
    }
    
  update(key, airline, departure, destinatioKey, cabin, schedules = [], airport, price, status = true) {
    if (!this.flight[key]) {
      throw Error(`Flight with key "${key}" does not exist!`);
    }

    const des = new Destination(); // INSTANCIA O DESTINO PARA PODER USAR OS DESTINOS
    const desInstance = des.get(destinatioKey); // PEGA O DESTINO

    this.flight[key] = {
      airline,
      departure,
      destination: {
        destination: desInstance.destination,
        tourismType: desInstance.tourismType
      },
      cabin,
      schedules,
      airport,
      price,
      status
    };

    this.saveToLocalStorage(); // SALVA NO LOCAL STORAGE APÓS ATUALIZAR
  }

  get(key) { // RETORNA UM VOO
    if (!this.flight[key]) {
      throw Error(`Flight with key "${key}" does not exist!`);
    }
    return this.flight[key];
  }

  getAll(status = null) { // RETORNA TODOS OS VOOS /* status = null PARA PODER FILTRAR */
    if (status === null) {
      return this.flight;
    }

    if (status === true || status === false) { 
      const filteredFlight = {};
      for (const key in this.flight) {
        if (this.flight[key].status === status) {
          filteredFlight[key] = this.flight[key];
        }
      }
      return filteredFlight;
    }
  }


  checkTourismType(type = []) {
    for (const key in this.flight) {
      for (const tourismType of type) {
        if (!this.flight[key].destination.tourismType.includes(tourismType)) {
          return false;
        }
      }
    }
    return true;
  }

  getFlightByInput(selectedStartDate, selectedDestination, selectedDeparture, selectedTourismTypeKeys) {
    console.log(selectedStartDate, selectedDestination, selectedDeparture, selectedTourismTypeKeys);
    const date = { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit' 
    };

    const matchingFlights = [];

    for(const key in this.flight) {

      const flightStartDate = new Date(this.flight[key].schedules[0]).toLocaleDateString('en-GB', date);
      const selectedDate = new Date(selectedStartDate).toLocaleDateString('en-GB', date); 
      
      if (this.flight[key].status) {
        if (
          this.flight[key].departure === selectedDeparture &&
          this.flight[key].destination.destination === selectedDestination &&
          flightStartDate === selectedDate &&
          this.checkTourismType(selectedTourismTypeKeys)
        ) {
          matchingFlights.push(this.flight[key]);
        }
      }
      console.log('MATCHING FLIGHTS:', matchingFlights);


      
    }
    return matchingFlights;
  }

}

/* COUNTRIES VISITED */

class CountryVisited {
  destination = new Destination(); // INSTANCIA O DESTINO PARA PODER USAR OS DESTINOS
  destinationKey = this.destination.getAll(); // PEGA TODOS OS DESTINOS
  countryVisited = {};

  constructor(countryVisited = {}) {
    this.countryVisited = countryVisited;
  }

  add(key, destinationKey, img, status = true) {
    if (this.countryVisited[key]) {
      throw Error(`Country with key "${key}" already exists!`);
    }

    this.countryVisited[key] = {
      destinationKey,
      img,
      status
    };
  }
}