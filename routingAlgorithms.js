/*
   Responsibility of this function is to give all the possible routes from source to destination with or without 
   traffic parameter
*/
var globalRoutes = require('./data/Routes.js');

console.log('Possible routes from A to B is',getPossibleRoutes("A","KK",globalRoutes.getRoutes(),false));

function getPossibleRoutes(source,destination,routes,traffic) {
// console.log('Params : ',source,destination,routes,traffic);

 let possibleRoutes = [];
 let workingRoutes = [{ route : [source], distance : 0 }];
  

 while(workingRoutes.length > 0) {
 let currentRoute = workingRoutes.pop();
 let currentPlanetStation = currentRoute.route[currentRoute.route.length -1];
 let neighBouringRoutes = [];
 let neighBouringPlanets = [];

 // console.log('workingRoutes',workingRoutes);

 // console.log('currentRoute',currentRoute,currentPlanetStation);
 // console.log('neighbouring routes of ',currentPlanetStation,'is : ',getNeighbouringRoutes(routes,currentPlanetStation), 'is end of route reached',checkIfEndIsReached(routes,currentPlanetStation),'(currentPlanetStation === destination)',(currentPlanetStation === destination));
 // console.log('currentPlanetStation',currentPlanetStation,'destination',destination);

   if(currentPlanetStation && !checkIfEndIsReached(routes,currentPlanetStation) && (currentPlanetStation!==destination)) {
  neighBouringRoutes = getNeighbouringRoutes(routes,currentPlanetStation);
  neighBouringRoutes.forEach(route => {
  	if(!isPlanetAlreadyVisited(currentRoute.route,route.destination)) {
  	let newRoute = JSON.parse(JSON.stringify(currentRoute));
  	newRoute.route.push(route.destination);
  	newRoute.distance = traffic ? (newRoute.distance + route.distance + route.traffic) : (newRoute.distance + route.distance);
  	workingRoutes.push(newRoute);	
   }
  });
 } else if(currentPlanetStation && (currentPlanetStation === destination)) {
 	// console.log('currentPlanetStation',currentPlanetStation);
 	possibleRoutes.push(currentRoute);
  }
 }

 return possibleRoutes;
}

function getNeighbouringRoutes(routes,planetId) {
 let neighBouringRoutes = [];
 neighBouringRoutes = routes.filter(route => route.source === planetId);
 return neighBouringRoutes;
}

/*
   Pass an array of planets and routes to check if the end of route is reached
*/
function checkIfEndIsReached(routes,planetId) {
  return (getNeighbouringRoutes(routes,planetId).length === 0);
}

/*
   Pass an array of planets and destination to check if the end of route is reached
*/
function isDestinationPlanetReached(planets,destination) {
 let currentPlanetStation;
 	if(planets && planets.length>0) {
      currentPlanetStation = planets[planets.length - 1];
      return currentPlanetStation === destination;
	}
	return true;
}

function isPlanetAlreadyVisited(stations,incomingStation) {
 return (stations.findIndex(station => station === incomingStation) > -1);
}