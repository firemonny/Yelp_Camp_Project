var mongoose = require("mongoose");
var passporLocalMongoose = require("passport-local-mongoose");

//Campground SCHEMA SETUP
var UserSchema = new mongoose.Schema({
    username:String,
    password:String
});

UserSchema.plugin(passporLocalMongoose);
module.exports = mongoose.model("User",UserSchema);