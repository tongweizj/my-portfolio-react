// Load the module dependencies
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
//
// Define a new 'UserSchema'
var SiteSchema = new Schema({
	blogname: String,
	blogdescription: String,
	profile: String,
	project: String
});

// Configure the 'UserSchema' to use getters and virtuals when transforming to JSON
SiteSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

// Create the 'User' model out of the 'UserSchema'
mongoose.model('Site', SiteSchema);