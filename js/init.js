import { TourismType, Destination, Flight } from './models/PlannerModel.js';

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