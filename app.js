var cors = require('cors');
var express = require('express');
var app = express();
var dbHandle = require('./db');
var routingFunctionsHandle = require('./routingAlgorithms');
var bodyParser = require('body-parser');
app.use(cors());
app.options('*', cors());

const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 


app.listen(PORT,()=>{console.log('Listening on port: ${PORT}');});

app.get("/planets", function(req,res)  {
let planets = [];
dbHandle.getPlanets().then( snapshot => {
       snapshot.forEach(planet => {
       //console.log(planet.data());
      planets.push(planet.data());
    });
   res.send({

     'interGalaxialPlanets': planets
   }
   	);
  });
});

app.get("/routes", function(req,res)  {
let routes = [];
dbHandle.getRoutes().then( snapshot => {
       snapshot.forEach(route => {
      //console.log(route.data());
      routes.push(route.data());
    });
   res.send({

     'interGalaxialRoutes': routes
   }
   	);
  });
});

 app.post("/shortestRoute",function(req,res) {
  let routes = [];
  console.log(req.body);
  let shortestRoute;

  dbHandle.getRoutes().then( snapshot => {
       snapshot.forEach(route => {
      //console.log(route.data());
      routes.push(route.data());
    });
   shortestRoute = routingFunctionsHandle.getShortestRoute(req.body.source,req.body.destination,routes,req.body.traffic)
   console.log(shortestRoute);
   res.send(shortestRoute);
  });
 });

  app.post("/possibleRoutes",function(req,res) {
  let routes = [];
  console.log(req.body);
  let possibleRoutes = [];

  dbHandle.getRoutes().then( snapshot => {
       snapshot.forEach(route => {
      //console.log(route.data());
      routes.push(route.data());
    });
   possibleRoutes = routingFunctionsHandle.getPossibleRoutes(req.body.source,req.body.destination,routes,req.body.traffic)
   console.log(possibleRoutes);
   res.send({'possibleRoutes': possibleRoutes});
  });
 });



