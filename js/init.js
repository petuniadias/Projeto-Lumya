import { TourismType, Destination, FlightManager, Cart } from './models/PlannerModel.js';

initdata();

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
}

// TOURISM TYPES

export const tourismType = new TourismType({
  'beach': 
    { name: 'Beach', 
      img: '/media/icons/beach.svg', 
      status: true 
    }
});

console.log(tourismType.getAll());

export const destination = new Destination({
  'Paris, France': 
    { destination: 'Paris, France',
      tourismType: ['cultural', 'film'],
      img: '/media/img/destination-img.png', 
      status: true 
    }
});

console.log(destination.getAll());

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

