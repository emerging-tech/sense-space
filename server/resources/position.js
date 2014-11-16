var url = require("url");
var edge = require('edge');

function logError(err, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write("Error: " + err);
    console.log("Error: " + err);
    res.end("");
}

// GET ------------------------------------------------------------------
var ReadPositions = edge.func('sql', function(){/*
    SELECT top 100 [id],[latitude] ,[longitude] ,[timestamp] ,[accuracy] ,[gamerId] ,[teamId]
    FROM [spacesense].[dbo].[devicePos] where dateadd(mi,-5,getdate()) < [timestamp]
    order by id desc
*/});

exports.ReadAllPositions= function(req, res) {

	console.log("Reading Last Positions in the last 5 minutes \n");
	var msgARRAYinfo = new Array();

	//var maxmsg_tmp = req.params.maxmsg;
    ReadPositions({}, function (error, result) {
        if (error) { logError(error, res); return; }
        if (result) {
            result.forEach(function(msg) {
				var msginfo = new Object();
				msginfo.id = msg.id;
				msginfo.latitude =msg.latitude;
				msginfo.longitude =msg.longitude;
				msginfo.timestamp =msg.timestamp;
				msginfo.accuracy =msg.accuracy;
				msginfo.gamerId =msg.gamerId;
                msginfo.teamId =msg.teamId;
				msgARRAYinfo.push(msginfo); 
            });
            res.writeHead(200, { 'Content-Type': 'application/json' });
			myJSONstring = "{" + String.fromCharCode(34) + "positions" +String.fromCharCode(34) + ":"+ JSON.stringify(msgARRAYinfo) +"}";
			res.write(myJSONstring);
			
            res.end(); 
        }
        else {
            res.end("No results");
        }
    });
}

// POST --------------------------------------------------------------



var InsertPosition = edge.func('sql', function(){/*
    INSERT INTO [dbo].[devicePos]
               ([latitude] ,[longitude]  ,[accuracy] ,[gamerId] ,[teamId])
      Values (@latitude, @longitude, @accuracy, @gamerId, @teamId)
*/});

exports.NewPosition= function NewPosition(req, res) {
    
	console.log("Posting a message from "+ req.body.gamerId + " \n");
	
    var gamerId_tmp = req.body.gamerId;
    var teamId_tmp = req.body.teamId;
    var accuracy_tmp = req.body.accuracy;
    var latitude_tmp = req.body.latitude;
    var longitude_tmp = req.body.longitude;

    
    InsertPosition({
            gamerId:gamerId_tmp,
            teamId:teamId_tmp,
            accuracy:accuracy_tmp, 
            latitude:latitude_tmp, 
            longitude:longitude_tmp
    }, function (error, result) {
        if (error) { logError(error, res); return; }
        if (result) {
			myJSONstring = "done";
            res.writeHead(200, { 'Content-Type': 'application/json' });
			res.write(myJSONstring);
            res.end(); 
        }
        else {
            res.end("No results");
        }
    });
    
}


