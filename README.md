# Server Code for InterStellar Navigation App

# Important Notes :
Run below command to start nodeJS server at port 3000 before serving Angular UI :

    node app.js

# Database setup code :
1. Available in main.js and db.js which initializes and stores the given data in Firestore Cloud.
2. Data given in the problem statement is stored in data directory as a JSON object which is persisted in Firestore Cloud upon running main.js
3. Please DONOT RUN node main.js again as it may overwrite the already existing data in FireStore DB. 

##Complete Solution available at: 

https://github.com/Chaitanya-B/Interstellar_UI
https://github.com/Chaitanya-B/InterStellar

## FireStore Cloud as the NoSQL Database : - 
    1. Created 2 collections : Planets and Routes. 
    2. Planets Collection stores planetId and name of all the planets given in the problem statement.
    3. Routes collection stores all the Routes as RouteId, source, destination, distance, traffic 

## REST Endpoints created using ExpressJS and NodeJS :

Endpoint	Method	Description	Request Body
/planets	GET	Planets Station Information	None
/routes	GET	Interstellar Routes	None
/possibleRoutes	POST	All possible routes from A to B and their distances	{"source":"A","destination":"Z","traffic":true}
/shortestRoute	POST	Shortest route from A to B with distance	{"source":"A","destination":"Z","traffic":true}


## For Request and Response please refer to excel sheet attached in the email.
## Please refer to screenshots in the attachments to see the UI.

## Angular 7 and Bootstrap in UI: 
    1. Home Page has 3 input fields : Mandatory Source Planet Id and Destination Planet Id with an optional Traffic Option which is used to capture user input. Error message is shown if a user doesnot enter source and destination.
    2. Planets Tab to see all the planets stored in the database.
    3. Routes Tab which shows all the routes available in the interstellar space.
    4. There are 3 Buttons : 
    • Calculate Shortest Route
    • Calculate Possible Routes
    • Clear :- To clear the result. 

