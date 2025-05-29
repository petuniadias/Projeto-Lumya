class Flight {
  departure = '';
  destination = '';
  tourismType = [];

  constructor(departure, destination, tourismType) {
    this.departure = departure;
    this.destination = destination;
    this.tourismType = tourismType;
  }
}

//INSTÂNCIAS DE VOOS

const flightsList = [
  new Flight('Lisbon, Portugal', 'Paris, France', ['cultural']),
  new Flight('Paris, France', 'Lisbon, Portugal', ['music', 'fashion']),
  new Flight('Paris, France', 'Lisbon, Portugal', ['music', 'fashion','food'])
]

// DEPARTURES
const departures = [
  'Lisbon, Portugal',
  'Porto, Portugal',
  'Madrid, Spain',
  'Barcelona, Spain',
  'Paris, France',
  'Berlin, Germany',
  'Rome, Italy',
  'London, United Kingdom',
  'Amsterdam, Netherlands',
  'Brussels, Belgium',
  'Vienna, Austria',
  'Prague, Czech Republic',
  'Zurich, Switzerland',
  'Athens, Greece',
  'Copenhagen, Denmark',
  'Dublin, Ireland'
];


// TYPES OF TOURISM LIST
export const tourismTypes = [
  {
    name: 'music',
    img: '/media/img/beach.png'
  }, {
    name: 'film',
    img: '/media/img/beach.png'
  }, {
    name: 'food',
    img: '/media/img/beach.png'
  }, {
    name: 'art',
    img: '/media/img/beach.png'
  }, {
    name: 'culture',
    img: '/media/img/beach.png'
  }, {
    name: 'fashion',
    img: '/media/img/beach.png'
  },   {
    name: 'technology',
    img: '/media/img/beach.png'
  }, {
    name: 'sports',
    img: '/media/img/beach.png'
  }, {
    name: 'spiritual',
    img: '/media/img/beach.png'
  }, {
    name: 'literature',
    img: '/media/img/beach.png'
  }
];

class Stay {
  title = '';
  rating = '';
  tourismTypes = [];

  constructor(title, rating, tourismTypes) {
    this.title = title;
    this.rating = rating;
    this.tourismTypes = tourismTypes;
  }
}

class Festival {
  name = '';
  tourismTypes = [];

  constructor(name, tourismTypes) {
    this.name = name;
    this.tourismTypes = tourismTypes;
  }
}