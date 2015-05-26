var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var salt = bcrypt.genSaltSync(10);

//only connected to mongoose in index.js file in library_app
// mongoose.connect("mongodb://localhost/intervu_app");

var userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		index: {
			unique: true
		}
	},
	passwordDigest: {
		type: String,
		required: true
	},
	//may need to add these two things on my signup page
	// first_name: {
	// 	type: String,
	// 	default: ""
	// }
	// last_name {
	// 	type: String,
	// 	default: ""
	// }
	//need favorite albums or artists here 
});


// Sign Up Info
// create secure takes a password and email in params
userSchema.statics.createSecure = function (email, password, cb) {
  // saves the user email and hashes the password
  var that = this; // save the context of the signup form 

  // generate the salt
  bcrypt.genSalt(function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      //ensure hash is working
      console.log(hash);
      that.create({
        email: email,
        passwordDigest: hash
       }, cb)
    });
  })
};


userSchema.statics.authenticate = function(email, password, cb) {
  // find just one user with the email 
  this.findOne({
     email: email // find user by email
    }, // then if user exists with that email
    function(err, user){
      console.log(user);
      if (user === null){
        throw new Error("Username does not exist");
      } else if (user.checkPassword(password)){ // verify password
        cb(null, user); // send back that user
      }
    })
 };

userSchema.methods.checkPassword= function(password) {
        return bcrypt.compareSync(password, this.passwordDigest);
};

var User = mongoose.model("User", userSchema);

module.exports = User;