http.use(express.static('public'))

http.get("/registration", function (req, res){
	res.sendFile("registration.html",  { root: __dirname });
});

http.get("/", function (req, res){
	res.sendFile("login.html",  { root: __dirname });
});

http.post("/register_user", upload.array(), function (req, res, next){
	register_user_data(req.body, res, callBack);
});
