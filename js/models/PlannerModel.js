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
export const departures = [
  'Lisbon, Portugal',
  'Porto, Portugal',
  'Madrid, Spain',
  'Barcelona, Spain',
  'Valencia, Spain',
  'Seville, Spain',
  'Malaga, Spain',
  'Bilbao, Spain',
  'Paris, France',
  'Nice, France',
  'Lyon, France',
  'Marseille, France',
  'Toulouse, France',
  'Berlin, Germany',
  'Munich, Germany',
  'Frankfurt, Germany',
  'Hamburg, Germany',
  'Cologne, Germany',
  'Dusseldorf, Germany',
  'Rome, Italy',
  'Venice, Italy',
  'Florence, Italy',
  'Milan, Italy',
  'Naples, Italy',
  'Athens, Greece',
  'Thessaloniki, Greece',
  'Vienna, Austria',
  'Salzburg, Austria',
  'Graz, Austria',
  'Prague, Czech Republic',
  'Brno, Czech Republic',
  'Warsaw, Poland',
  'Krakow, Poland',
  'Gdansk, Poland',
  'Budapest, Hungary',
  'Debrecen, Hungary',
  'Stockholm, Sweden',
  'Gothenburg, Sweden',
  'Malmo, Sweden',
  'Oslo, Norway',
  'Bergen, Norway',
  'Helsinki, Finland',
  'Tampere, Finland',
  'Copenhagen, Denmark',
  'Aarhus, Denmark',
  'Dublin, Ireland',
  'Belfast, United Kingdom',
  'London, United Kingdom',
  'Manchester, United Kingdom',
  'Edinburgh, United Kingdom',
  'Glasgow, United Kingdom',
  'Amsterdam, Netherlands',
  'Rotterdam, Netherlands',
  'Brussels, Belgium',
  'Antwerp, Belgium',
  'Zurich, Switzerland',
  'Geneva, Switzerland',
  'Basel, Switzerland',
  'Luxembourg, Luxembourg',
  'Ljubljana, Slovenia',
  'Zagreb, Croatia',
  'Seoul, South Korea',
  'Daegu, South Korea',
  'Split, Croatia',
  'Sarajevo, Bosnia and Herzegovina',
  'Belgrade, Serbia',
  'Skopje, North Macedonia',
  'Tirana, Albania',
  'Reykjavik, Iceland',
  'Moscow, Russia',
  'Saint Petersburg, Russia',
  'Istanbul, Turkey',
  'Ankara, Turkey',
  'Kiev, Ukraine',
  'Lviv, Ukraine',
  'Minsk, Belarus',
  'Chisinau, Moldova',
  'Tallinn, Estonia',
  'Riga, Latvia',
  'Vilnius, Lithuania',
  'Valletta, Malta'
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