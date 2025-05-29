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
const tourismTypes = [
  'music',
  'film',
  'food',
  'art',
  'culture',
  'fashion',
  'technology',
  'sports',
  'spiritual',
  'literature'
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