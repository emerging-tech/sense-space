// Paypal method form server

var express = require('express'),
    app = express(),
    fs = require('fs');

var appPort = 8000;

// Important for post request
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var positionResources = require('./resources/position.js');


fs.readFile('./main.html',function(err,data){
    if (err){
        throw err;
    }
    mainTemp=data;
});

app.use(express.static('./'));


// Resources-----------------------------------------

// GET Methods
app.get("/api/positions", positionResources.ReadAllPositions);

// POST Methods
app.post("/api/position", positionResources.NewPosition);

app.get("*", function(req,res){
    res.writeHeader(200, {"Content-Type": "text/html"});
    res.write(mainTemp);
    res.end();
});



//---------------------------------------------------

app.listen(appPort, function(){
    console.log("Listening on port " + appPort);   
});