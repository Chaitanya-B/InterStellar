
//Initialize the FireStore Database with the data given in the excel sheet 
var initializeDatabase = function() {

const admin = require('firebase-admin');

let serviceAccount = require('./cert/interstellar-traffic-system-49cdca0ea635.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


let db = admin.firestore();

return db;

}

var db = initializeDatabase();

exports.addPlanetsRoutesData = function() {

let planetsInfo = require('./data/Planets.js');
let routesInfo = require('./data/Routes.js');

 routesInfo.getRoutes().forEach(
       (route) => {
          addRoute(route.id, route.source, route.destination, route.distance, route.traffic);
       }
 	);

 planetsInfo.getPlanets().forEach(
       (planet) => {
          addPlanet(planet.planetId, planet.planetName);
       }
 	);
}


// Funcion to add new Planet documents inside Planets collection. Each planet has an id and a name
function addPlanet(planetId, planetName) {
  db.collection('Planets').add({
    'planetId': planetId,
    'planetName': planetName
  }); 
 }

// Function to add Routes Dcuments inside Routes Collection. Each route has an id, source, destination, distance, traffic 
 function addRoute(routeId, source, destination, distance, traffic) {
  db.collection('Routes').add({
    'routeId': routeId,
    'source': source,
    'destination': destination,
    'distance' : distance,
    'traffic' : traffic
  }); 
 }

exports.getPlanets = function() {
 let planets = [];
 let planetsCollRef = db.collection('Planets');
 
 //planetsCollRef.get().then( planet => {/*planets.push(planet); */console.log('Planets',planet);});

 return planetsCollRef.get();
}

exports.getRoutes = function() {
 let routes = [];
 let routesCollRef = db.collection('Routes');
 
 //planetsCollRef.get().then( planet => {/*planets.push(planet); */console.log('Planets',planet);});

 return routesCollRef.get();
}