var express = require("express");
var http = express();
const 	PORT = 12;

var server = http.listen(PORT, function () {
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
	var value = req.session.get('username');
	if(value != "" && username != undefined){
		res.sendFile("registration.html",  { root: __dirname });
	}
	else{
		res.redirect(302, '/');
	}
});

http.get("/index", function (req, res){
	
		res.sendFile("registration.html",  { root: __dirname });
	
});

http.get("/", function (req, res){
	res.sendFile("login.html",  { root: __dirname });
});

http.get("/activate_user/:email", function (req, res){
	console.log(req.params.email);
	var username	=	req.params.email;
	var encrypt	=	require('crypto-js');
	encrypt.decrypt.AES(username, "admin123");
	res.setHeader("username", username);
	//res.location(__dirname+"/activate");//res.end();
	res.redirect(302, '/activate');
});

http.get("/activate", function (req, res){
	//console.log(req.headers);
	res.sendFile("useractivation.html",  { root: __dirname });
});

var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

http.use(bodyParser.json()); // for parsing application/json
http.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded



http.post("/save_varyfied_user", upload.array(),  function (req, res){
	activate_user(req, res, callBack);
});


http.post("/validate_login",  upload.array(),  function (req, res){
	var md5	=	require('md5');
	var data	=	req.body;
	var pass = data.password;
	pass = pass.replace("B3c59856Us", "");
	pass = pass.replace("Y12ZTlmK09", "");
	data.password= md5(pass.trim());

	validate_login_data(data, res, callBack);
	
});

var validate_login_data	=	function (obj, res, callfn){
	var response  = res;
	 var MongoClient = require('mongodb').MongoClient, ret = false;
	 MongoClient.connect("mongodb://localhost:27017/erp_node", function (err, db) {
		if(!err){
			
			
			var query = 'db.getCollection("user_info").find({$and: ['+obj+']}, { "first_name": 1, "last_name": 1, "mobile_number": 1 })';
			db.eval('function(){ return ' + query + '.toArray(); }', function(err, result){
				ret =  true;
				callfn(ret, response);
			});
			  
		}
		else{
			callfn(ret, err);
		}
	 });
}

http.get("/logout", upload.array(), function (req, res, next){
	req.session.flush();
	res.redirect(302, '/');
});



http.post("/register_user", upload.array(), function (req, res, next){
	register_user_data(req.body, res, callBack);
});

var register_user_data	=	function (data, res, callfn){
	 var MongoClient = require('mongodb').MongoClient, ret = false;
	 MongoClient.connect("mongodb://localhost:27017/erp_node", function (err, db) {
		if(!err){
			db.collection('user').insertOne(data, function(err, r) {
			    if(r != ""){
			    	 ret =  true;
			    	 send_registration_mail(data);
			    	// update_login(data);
			    }
				callfn(ret, res);
			});		  
		}
		else{
			callfn(ret, res);
		}
	 });
}

var activate_user	=	function (req, res, callfn){
	var md5	=	require('md5');
	var data	=	req.body;
	var pass = data.password;
	pass = pass.replace("B3c59856Us", "");
	pass = pass.replace("Y12ZTlmK09", "");
	data.password= md5(pass.trim());

	 var MongoClient = require('mongodb').MongoClient, ret = false;
	 MongoClient.connect("mongodb://localhost:27017/erp_node", function (err, db) {
		if(!err){
			db.collection('user_info').insertOne(data, function(err, r) {
			    if(r != ""){
			    	 ret =  true;
			    	// send_active_mail(data);
			    	// update_login(data);
			    	 var NodeSession = require('node-session');
			    	 session = new NodeSession({secret: 'Q3UBzdH9GEfiRCTKbi5MTPyChpzXLsTD'});
			    	 session.startSession(req, res, callback)
			    	 req.session.put('username', data.email_id);
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

var update_login = function (data){
	var first_name	=	data.first_name; last_name	=	data.last_name; email_id	=	data.email_id;
	var login_data	=	{};
}

var send_registration_mail = function (data){
	var encrypt	=	require('crypto-js');
	
    var host = server.address().address;
	var first_name	=	data.first_name; last_name	=	data.last_name; email_id	=	data.email_id;
    var port = server.address().port;
    
	var nodemailer = require('nodemailer');

	// Create a SMTP transport object
	var transport = nodemailer.createTransport(
			{
			    service: 'gmail',
			    auth: {
			        user: "veneratechprojects@gmail.com",
			        pass: "venera@123"
			    }
			});

	// Message object
	var message = {
		from: 'veneratechprojects@gmail.com',
		to: email_id ,
		subject:"Venera ERP account activation link", //'Nodemailer is unicode friendly ✔', 
		//text: "Node Text body", //'Hello to myself!',
		html:'<div><p><b>Hello &nbsp;</b>'+first_name+'</p>Your are registered successfuly. One more step to activate your account. <a href="http://127.0.0.1:12/activate_user/'+encrypt.AES.encrypt(email_id, "admin123")+'" target="_blank">Click here</a> to activate your account.</div>'
	};
	transport.sendMail(message, function(error){
		if(error){
		  console.log('Error occured');
		  console.log(error.message);
		  return;
		}
	});
	
	console.log(message.html);
}
