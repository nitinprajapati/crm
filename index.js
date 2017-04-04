var express = require("express");
var http = express();
const PORT = 12;

http.listen(PORT, function () {
  console.log('Example app listening on port 12!')
})

http.get("/", function (req, res){
	res.send("Default page open");
});

http.get("/registration", function (req, res){
	res.sendFile("templates/registration.html",  { root: __dirname });
});

http.get("/", function (req, res){
	res.send("Default page open");
});