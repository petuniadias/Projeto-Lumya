import {
  TourismType,
  Destination,
  FlightManager,
  Cart,
} from "./models/PlannerModel.js";

function initdata() {
  // USERS
  if (!localStorage.users) {
    const users = [
      {
        name: "admin",
        username: "admin",
        password: "1234",
        points: 0,
        tripHistory: [],
        pendingTrips: [],
        favoriteFlights: [],
      },
    ];
    localStorage.setItem("users", JSON.stringify(users));
  }

  // FLIGHTS
  // Verifica se a chave 'flights' existe ou se está vazia no localStorage
  const storedFlights = localStorage.getItem(flights.storageKey);
  if (!storedFlights || JSON.parse(storedFlights).length === 0) {
    flights.addFlight(
      "Ryanair",
      "Madrid, Spain",
      "Paris, France",
      destination.getTourismTypes("Paris, France"),
      "Business",
      [new Date("2025-06-22T10:00:00"), new Date("2025-06-22T12:30:00")],
      "Madrid Barajas Airport",
      220.0
    );
    flights.addFlight(
      "TAP Air Portugal",
      "Lisbon, Portugal",
      "Bali, Indonesia",
      destination.getTourismTypes("Bali, Indonesia"),
      "Economy",
      [new Date("2025-06-22T10:00:00"), new Date("2025-06-22T12:30:00")],
      "Lisbon Airport",
      750.0
    );
    flights.addFlight(
      "Ryanair",
      "London, UK",
      "Paris, France",
      destination.getTourismTypes("Paris, France"),
      "Economy",
      [new Date("2025-06-22T10:00:00"), new Date("2025-06-22T12:30:00")],
      "London Heathrow Airport",
      120.0
    );
    flights.addFlight(
      "Iberia",
      "Berlin, Germany",
      "Bali, Indonesia",
      destination.getTourismTypes("Bali, Indonesia"),
      "Business",
      [new Date("2025-06-22T10:00:00"), new Date("2025-06-22T12:30:00")],
      "Berlin Brandenburg Airport",
      980.0
    );
    flights.saveFlights();
  }

  // ACHIEVEMENTS
  if (!localStorage.getItem("achievementsList")) {
    // Usar uma chave específica
    localStorage.setItem("achievementsList", JSON.stringify(achievements));
  }

  // COUNTRIES VISITED
  if (!localStorage.getItem("countriesVisitedList")) {
    // Usar uma chave específica
    localStorage.setItem(
      "countriesVisitedList",
      JSON.stringify(countriesVisited)
    );
  }

  // DESTINATIONS
  // Verifica se localStorage para destinos está vazio ou se o objeto de destinos carregado está vazio
  const storedDestinations = localStorage.getItem(
    destination.localStorageDestinationKey
  );
  // Se this.destination estiver vazio, significa que o localStorage estava vazio.
  if (Object.keys(destination.getAll()).length === 0) {
    const defaultDestinations = [
      { name: "Paris, France", tourismTypes: ["cultural", "film"] },
      { name: "Bali, Indonesia", tourismTypes: ["beach"] },
      { name: "Cannes, France", tourismTypes: ["cultural", "history"] },
      { name: "Tokyo, Japan", tourismTypes: ["cultural", "modern"] },
      { name: "Seoul, South Korea", tourismTypes: ["cultural", "film"] },
      { name: "Cannes, France", tourismTypes: ["cultural", "history"] },
    ];

    defaultDestinations.forEach((dest) => {
      try {
        destination.add(dest.name, dest.name, dest.tourismTypes);
      } catch (e) {
        console.warn(
          `Could not add default destination ${dest.name}: ${e.message}`
        );
      }
    });

    // TOURISM TYPES
    if (Object.keys(tourismType.getAll()).length === 0) {
      console.log("Initializing default tourism types...");
      const defaultTourismTypes = [
        { key: "beach", name: "Beach", status: true },
        { key: "cultural", name: "Cultural", status: true },
        { key: "film", name: "Film", status: true },
      ];

      defaultTourismTypes.forEach((type) => {
        try {
          tourismType.add(type.key, type.name, type.status);
        } catch (e) {
          console.warn(
            `Could not add default tourism type ${type.name}: ${e.message}`
          );
        }
      });
    }
  }
}

// TOURISM TYPES
export const tourismType = new TourismType();

// DESTINATIONS
export const destination = new Destination();

// FLIGHTS
export const flights = new FlightManager(destination);

// CART
export const cart = new Cart();


// ACHIEVEMENTS

export const achievements = [
  //USER INTERACTION
  {
    title: "Travel Buddy",
    category: "user interaction",
    description: "Invited another user to your trip.",
    img: "/media/img/achievements/travel-buddy.svg",
    points: 100,
  },

  //FLIGHTS
  {
    title: "First Flight",
    category: "flight",
    description: "For booking your first flight.",
    img: "/media/img/achievements/first-flight.svg",
    points: 100,
  },
  {
    title: "World Tour",
    category: "flight",
    description: "Booked five flights.",
    img: "/media/img/achievements/first-flight.svg",
    points: 300,
  },

  // SPEACIAL
  {
    title: "Welcome Gift",
    category: "special",
    description: "Using Lumya for the first time.",
    img: "/media/img/achievements/welcome-gift.svg",
    points: 100,
  },
];

/* COUNTRIES VISITED */

export const countriesVisited = [
  //ASIA
  {
    country: "Japan",
    img: "../media/img/countries visited/asia/japan.png",
    continent: "Asia",
  },
  {
    country: "China",
    img: "../media/img/countries visited/asia/china.png",
    continent: "Asia",
  },
  {
    country: "India",
    img: "../media/img/countries visited/asia/india.png",
    continent: "Asia",
  },
  {
    country: "Indonesia",
    img: "../media/img/countries visited/asia/indonesia.png",
    continent: "Asia",
  },
  {
    country: "Vietnam",
    img: "../media/img/countries visited/asia/vietnam.png",
    continent: "Asia",
  },
  {
    country: "Thailand",
    img: "../media/img/countries visited/asia/thailand.png",
    continent: "Asia",
  },
  // SOUTH AMERICA
  {
    country: "Brazil",
    img: "../media/img/countries visited/south-america/brazil.png",
    continent: "South America",
  },
  {
    country: "Argentina",
    img: "../media/img/countries visited/south-america/argentina.png",
    continent: "South America",
  },
  {
    country: "Peru",
    img: "/media/img/countries visited/south-america/peru.png",
    continent: "South America",
  },
  //NORTH AMERICA
  {
    country: "Canada",
    img: "../media/img/countries visited/north-america/canada.png",
    continent: "North America",
  },
  {
    country: "Mexico",
    img: "../media/img/countries visited/north-america/mexico.png",
    continent: "North America",
  },
  {
    country: "United States",
    img: "../media/img/countries visited/north-america/USA.png",
    continent: "North America",
  },
  //EUROPE
  {
    country: "Germany",
    img: "../media/img/countries visited/europe/germany.png",
    continent: "Europe",
  },
  {
    country: "France",
    img: "../media/img/countries visited/europe/france.png",
    continent: "Europe",
  },
  {
    country: "Italy",
    img: "../media/img/countries visited/europe/italy.png",
    continent: "Europe",
  },
  {
    country: "Spain",
    img: "../media/img/countries visited/europe/spain.png",
    continent: "Europe",
  },
  {
    country: "Portugal",
    img: "../media/img/countries visited/europe/portugal.png",
    continent: "Europe",
  },
  {
    country: "Belgium",
    img: "../media/img/countries visited/europe/belgium.png",
    continent: "Europe",
  },
  {
    country: "Germany",
    img: "../media/img/countries visited/europe/germany.png",
    continent: "Europe",
  },
  //OCEANIA
  {
    country: "Australia",
    img: "../media/img/countries visited/oceania/australia.png",
    continent: "Oceania",
  },
  //AFRICA
  {
    country: "Egypt",
    img: "../media/img/countries visited/africa/egypt.png",
    continent: "Africa",
  },
  {
    country: "Morocco",
    img: "../media/img/countries visited/africa/morocco.png",
    continent: "Africa",
  },
  {
    country: "Tunisia",
    img: "../media/img/countries visited/africa/tunisia.png",
    continent: "Africa",
  },
  {
    country: "Algeria",
    img: "../media/img/countries visited/africa/algeria.png",
    continent: "Africa",
  },
  {
    country: "Nigeria",
    img: "../media/img/countries visited/africa/nigeria.png",
    continent: "Africa",
  },
];

initdata();
