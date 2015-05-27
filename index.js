//Back-End Server, requires, routes
var express = require("express"),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	_ = require("underscore"),
	path = require("path"),
	db = require("./models"),
	session = require("express-session"),
	bcrypt = require("bcrypt");

//use app for routes
var app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname, '/public'));

app.use(session({
  secret: 'Spencer secret',
  resave: false,
  saveUninitialized: true
}))


var loginHelpers = function (req, res, next) {

  req.login = function (user) {
    req.session.userId = user._id;
    req.user = user;
    return user;
  };

  req.logout = function () {
    req.session.userId = null;
    req.user = null;
  };

  req.currentUser = function (cb) {
    var userId = req.session.userId;
    db.User.
      findOne({
        _id: userId
      }, cb);
  };

  // careful to have this
  next(); // real important
};

app.use("/", loginHelpers)

var views = path.join(__dirname, "views");	

app.get("/", function (req, res) {
	var homePath = path.join(views, "home.html");
	res.sendFile(homePath);
});

app.get("/signup", function (req, res) {
	var signupPath = path.join(views, "signup.html");
	res.sendFile(signupPath);
});

app.post("/signup", function (req, res) {
	var newUser = req.body.user
	  db.User.createSecure(newUser.email, newUser.password, function (err, user) {
	    if (user) {
	      req.login(user);
	      res.redirect("/activities");
	    } else {
	      res.redirect("/signup");
	    }
	  });
	req.currentUser();  
});

app.get("/login", function (req, res) {
	var loginPath = path.join(views, "login.html");
	res.sendFile(loginPath);
});

app.post("/login", function (req, res) {
	var user = req.body.user;

  db.User.authenticate(user.email, user.password, function (err, user) {
    if (!err) {
      req.login(user);
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

app.post("/activities/:id", function (req, res) {
	var clickId = req.params.id;
	res.send(clickId);
})

app.get("/contactme", function (req, res) {
	var contactPath = path.join(views, "contactMe.html");
	res.sendFile(contactPath);
});

app.get("/logout", function (req, res) {
	req.logout();
	res.redirect("/");
})

app.listen(3000, function () {
	console.log("running");
})
























