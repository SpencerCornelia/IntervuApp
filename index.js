//Back-End Server, requires, routes
var express = require("express"),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	_ = require("underscore"),
	path = require("path"),
	db = require("./models"),
	bcrypt = require("bcrypt");

//use app for routes
var app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname, '/public'));

var views = path.join(__dirname, "views");	

// app.use("/", function (req, res, next) {
// 	req.login = function (user) {
// 		req.session.userId
// 	}
// })

app.get("/", function (req, res) {
	var homePath = path.join(views, "home.html");
	res.sendFile(homePath);
});

app.get("/signup", function (req, res) {
	var signupPath = path.join(views, "signup.html");
	res.sendFile(signupPath);
});

app.post("/signup", function (req, res) {
	console.log(req.body);
	var newUser = req.body.user
	  db.User.createSecure(newUser.email, newUser.password, function (err, user) {
	    if (user) {
	      res.redirect("/activities");
	    } else {
	      res.redirect("/signup");
	    }
	  });
});

app.get("/login", function (req, res) {
	var loginPath = path.join(views, "login.html");
	res.sendFile(loginPath);
});

app.post("/login", function (req, res) {
	var user = req.body.user;
	//make sure user is form info
	console.log(user);

  db.User.authenticate(user.email, user.password, function (err, user) {
    if (!err) {
      res.redirect("/activities");
    } else {
      res.redirect("/login");
    }
  })
});

app.get("/activities", function (req, res) {
	var activitiesPath = path.join(views, "activities.html");
	res.sendFile(activitiesPath);
});

app.get("/contactme", function (req, res) {
	var contactPath = path.join(views, "contactMe.html");
	res.sendFile(contactPath);
})

app.listen(3000, function () {
	console.log("running");
})
























