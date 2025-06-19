import { TourismType, Destination, FlightManager, Cart } from './models/PlannerModel.js';

function initdata() {
  // USERS
  if (!localStorage.users) {
    const users = [
      { 
        name: 'admin',
        username: 'admin',
        password: '1234',
        points: 0,
        tripHistory: [],
        pendingTrips: [],
        favoriteFlights: []
      },
    ];
    localStorage.setItem('users', JSON.stringify(users));
  }

  // FLIGHTS
  // Verifica se a chave 'flights' existe ou se está vazia no localStorage
  const storedFlights = localStorage.getItem(flights.storageKey);
  if (!storedFlights || JSON.parse(storedFlights).length === 0) {
    flights.addFlight("Lumya Air", "Lisbon, Portugal", "Paris, France", ['cultural', 'film'], 'Economy', [new Date('2024-09-15T08:00:00'), new Date('2024-09-15T11:00:00')], "LIS", 150.00);
    flights.addFlight("Lumya Air", "Madrid, Spain", "Paris, France", ['cultural'], 'Business', [new Date('2024-09-16T10:00:00'), new Date('2024-09-16T12:30:00')], "MAD", 220.00);
    flights.addFlight("Beach Hopper", "Lisbon, Portugal", "Bali, Indonesia", ['beach'], 'Economy', [new Date('2024-10-01T22:00:00'), new Date('2024-10-02T18:00:00')], "LIS", 750.00);
    flights.addFlight("City Explorer", "London, UK", "Paris, France", ['cultural'], 'Economy', [new Date('2024-09-20T09:00:00'), new Date('2024-09-20T10:30:00')], "LHR", 120.00);
    flights.addFlight("Adventure Wings", "Berlin, Germany", "Bali, Indonesia", ['beach'], 'Business', [new Date('2024-10-05T14:00:00'), new Date('2024-10-06T10:00:00')], "BER", 980.00);
    flights.saveFlights(); // Importante: FlightManager precisa de um método saveFlights() que guarde this.flights no localStorage.
  }

  // ACHIEVEMENTS
  if (!localStorage.getItem('achievementsList')) { // Usar uma chave específica
    localStorage.setItem('achievementsList', JSON.stringify(achievements));
  }

  // COUNTRIES VISITED (usando o array 'countriesVisited' definido neste ficheiro)
  if (!localStorage.getItem('countriesVisitedList')) { // Usar uma chave específica
    localStorage.setItem('countriesVisitedList', JSON.stringify(countriesVisited));
  }
}

// TOURISM TYPES

export const tourismType = new TourismType({
  'beach': 
    { name: 'Beach', 
      img: '/media/icons/beach.svg', 
      status: true 
    },
    'cultural':
    { name: 'Cultural',
      img: '/media/icons/culture.svg',
      status: true
    },
  'film':
    { name: 'Film',
      img: '/media/icons/film.svg',
      status: true
    }
});

console.log(tourismType.getAll());

export const destination = new Destination({
  'Paris, France': 
    { 
      tourismType: ['cultural', 'film'],
      img: '/media/img/destination-img.png', 
      status: true 
    },
  'Bali, Indonesia':
    {
      tourismType: ['beach'],
      img: '/media/img/bali-destination.png', // Exemplo de imagem
      status: true
    }
  });

// FLIGHTS

export const flights = new FlightManager(destination);

/* CART */

export const cart = new Cart();

/* ACHIEVEMENTS */

export const achievements = [
  //USER INTERACTION
  {
    title: 'Travel Buddy',
    category: 'user interaction',
    description: 'Invited another user to your trip.',
    img: '/media/img/achievements/travel-buddy.svg',
    points: 100
  },
  //FLIGHTS
  {
    title: 'First Flight',
    category: 'flight',
    description: 'For booking your first flight.',
    img: '/media/img/achievements/first-flight.svg',
    points: 100
  },
  {
    title: 'World Tour',
    category: 'flight',
    description: 'Booked five flights.',
    img: '/media/img/achievements/first-flight.svg',
    points: 300
  },
  // SPEACIAL
  {
    title: 'Welcome Gift',
    category: 'special',
    description: 'Using Lumya for the first time.',
    img: '/media/img/achievements/welcome-gift.svg',
    points: 100
  }
];

/* COUNTRIES VISITED */

export const countriesVisited = [
  //ASIA
  {
    country: 'Japan',
    img: '../media/img/countries visited/asia/japan.png',
    continent: 'Asia',
  },
  {
    country: 'China',
    img: '../media/img/countries visited/asia/china.png',
    continent: 'Asia'
  },
  {
    country: 'India',
    img: '../media/img/countries visited/asia/india.png',
    continent: 'Asia'
  },
  {
    country: 'Indonesia',
    img: '../media/img/countries visited/asia/indonesia.png',
    continent: 'Asia'
  },
  {
    country: 'Vietnam',
    img: '../media/img/countries visited/asia/vietnam.png',
    continent: 'Asia'
  },
  {
    country: 'Thailand',
    img: '../media/img/countries visited/asia/thailand.png',
    continent: 'Asia'
  },
  // SOUTH AMERICA
  {
    country: 'Brazil',
    img: '../media/img/countries visited/south-america/brazil.png',
    continent: 'South America'
  },
  {
    country: 'Argentina',
    img: '../media/img/countries visited/south-america/argentina.png',
    continent: 'South America'
  }, 
  {
    country: 'Peru',
    img: '/media/img/countries visited/south-america/peru.png',
    continent: 'South America'
  },
  //NORTH AMERICA
  {
    country: 'Canada',
    img: '../media/img/countries visited/north-america/canada.png',
    continent: 'North America'
  },
  {
    country: 'Mexico',
    img: '../media/img/countries visited/north-america/mexico.png',
    continent: 'North America'
  },
  {
    country: 'United States',
    img: '../media/img/countries visited/north-america/USA.png',
    continent: 'North America'
  },
  //EUROPE
  {
    country: 'Germany',
    img: '../media/img/countries visited/europe/germany.png',
    continent: 'Europe'
  },
  {
    country: 'France',
    img: '../media/img/countries visited/europe/france.png',
    continent: 'Europe'
  },
  {
    country: 'Italy',
    img: '../media/img/countries visited/europe/italy.png',
    continent: 'Europe'
  },
  {
    country: 'Spain',
    img: '../media/img/countries visited/europe/spain.png',
    continent: 'Europe'
  },
  {
    country: 'Portugal',
    img: '../media/img/countries visited/europe/portugal.png',
    continent: 'Europe'
  },
  {
    country: 'Belgium',
    img: '../media/img/countries visited/europe/belgium.png',
    continent: 'Europe'
  }, 
  {
    country: 'Germany',
    img: '../media/img/countries visited/europe/germany.png',
    continent: 'Europe'
  },
  //OCEANIA
  {
    country: 'Australia',
    img: '../media/img/countries visited/oceania/australia.png',
    continent: 'Oceania'
  },
  //AFRICA
  {
    country: 'Egypt',
    img: '../media/img/countries visited/africa/egypt.png',
    continent: 'Africa'
  },
  {
    country: 'Morocco',
    img: '../media/img/countries visited/africa/morocco.png',
    continent: 'Africa'
  },
  {
    country: 'Tunisia',
    img: '../media/img/countries visited/africa/tunisia.png',
    continent: 'Africa'
  },
  {
    country: 'Algeria',
    img: '../media/img/countries visited/africa/algeria.png',
    continent: 'Africa'
  }, {
    country: 'Nigeria',
    img: '../media/img/countries visited/africa/nigeria.png',
    continent: 'Africa'
  }
];

initdata();