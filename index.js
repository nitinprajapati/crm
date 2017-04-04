var express = require("express");
var http = express();
const PORT = 12;

http.listen(PORT, function () {
  console.log('Example app listening on port 12!')
  var MongoClient = require('mongodb').MongoClient;

//Connect to the db
MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
 if(!err) {
   console.log("We are connected");
 }
 else{
	 console.log(err);
 }
});
})

http.use(express.static('public'))

/*http.get("/", function (req, res){
	res.send("Default page open");
});
*/
http.get("/registration", function (req, res){
	res.sendFile("registration.html",  { root: __dirname });
});

http.get("/", function (req, res){
	res.sendFile("login.html",  { root: __dirname });
});

