var express = require("express");
var http = express();
const 	PORT = 12;

http.listen(PORT, function () {
  console.log('Example app listening on port 12!')

  var MongoClient = require('mongodb').MongoClient;
  MongoClient.connect("mongodb://localhost:27017/erp_node", function (err, db) {
	    if(!err){
	    	console.log("Connected");
	    }
	    else{
	    	console.log(err);
	    }
  });
})

http.use(express.static('public'))

http.get("/registration", function (req, res){
	res.sendFile("registration.html",  { root: __dirname });
});

http.get("/", function (req, res){
	res.sendFile("login.html",  { root: __dirname });
});

var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

http.use(bodyParser.json()); // for parsing application/json
http.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


http.post("/register_user", upload.array(), function (req, res, next){
	register_user_data(req.body, res, callBack);
});

var register_user_data	=	function (data, res, callfn){
	 var MongoClient = require('mongodb').MongoClient, ret = false;
	 MongoClient.connect("mongodb://localhost:27017/erp_node", function (err, db) {
		if(!err){
			db.collection('user_info').insertOne(data, function(err, r) {
			    if(r != ""){
			    	 ret =  true;
			    	 update_login();
			    }
				callfn(ret, res);
			});		  
		}
		else{
			callfn(ret, res);
		}
	 });
}

function callBack (output, res) {
	console.log(output);
	res.send(output);
}
