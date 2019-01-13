var express = require('express');
var app = express();
var dbHandle = require('./db');
const PORT = 3000;

const jsonResponseObject = {
	id : '7',
	name : 'Chaitanya'
}

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
  
 });



