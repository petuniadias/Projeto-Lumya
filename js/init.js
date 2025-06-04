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
  'paris': 
    { destination: 'Paris', 
      img: '/media/icons/paris.svg', 
      status: true 
    }
});

console.log(destination.getAll());

// FLIGHTS
export const flight = new Flight({
  'flight1': 
    { flightNumber: 'AF123', 
      origin: 'Paris', 
      destination: 'New York', 
      date: '2023-12-01', 
      status: true 
    }
});