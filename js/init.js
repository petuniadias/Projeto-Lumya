import { TourismType, Destination, Flight, Cart } from './models/PlannerModel.js';

initdata();

function initdata() {
  // USERS
  if (!localStorage.users) {
    const users = [
      {
        username: 'admin',
        password: '1234',
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
    { name: 'Paris, France',
      tourismType: ['cultural', 'film'],
      img: '/media/img/destination-img.png', 
      status: true 
    }
});

console.log(destination.getAll());

// FLIGHTS
export const flight = new Flight({
    tap: {
      airline: 'TAP Air Portugal',
      departure: 'Lisbon, Portugal',
      destination: {
        destination: 'New York, USA',
        tourismType: ['cultural', 'art']
      },
      cabin: 'Economy',
      schedules: ['2025-06-20 08:00:00', '2025-06-20 11:00:00'],
      airport: 'Lisbon Airport',
      price: 500,
      status: true
    },
    iberia: {
      airline: 'Iberia',
      departure: 'Madrid, Spain',
      destination: {
        destination: 'New York, USA',
        tourismType: ['cultural', 'art']
      },
      cabin: 'Economy',
      schedules: ['2025-06-20 09:00:00', '2025-05-20 12:00:00'],
      airport:'Madrid-Barajas Airport',
      price: 550,
      status: true
    }
  });

/* CART */

export const cart = new Cart();

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