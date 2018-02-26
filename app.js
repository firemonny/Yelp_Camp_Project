var express = require("express");
var app = express();
var bodyParser  = require("body-parser");
var mongoose    = require("mongoose");
var passport    =require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var Campground  = require("./models/campground");
var Comment     = require("./models/comment");
var User        = require("./models/user");
var seedDB      = require("./seeds");
var indexRoute = require("./routes/index");
var campgroundRoutes = require("./routes/campgrounds");
var commetRoutes = require("./routes/comments");
var flash= require("connect-flash");

mongoose.connect("mongodb://localhost/yelp_camp");

seedDB();

app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(flash());

//passport configuration
app.use(require("express-session")({
    secret:"Cassie<3",
    resave:false,
    saveUninitialized:false
}));
//Adding the moment
app.locals.moment = require("moment");

//Using authtication passport part
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//This is middleware for handling theall user login or not
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error =req.flash("error");
    res.locals.success =req.flash("success");
    next();
});
app.use("/",indexRoute);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commetRoutes);

app.listen(process.env.PORT, process.env.IP, function(){console.log("Yelp camp start!!")});