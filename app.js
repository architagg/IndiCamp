var express         = require("express")
var app             = express();
var bodyparser      = require("body-parser");
const mongoose      = require("mongoose");
var Campground      = require("./models/campground.js");
var Comment         = require("./models/comment.js");
const passport      = require('passport');
var methodOverride  = require('method-override');
const LocalStrategy = require('passport-local');
var User            = require("./models/user.js");
var seedDB          = require("./seeds.js");  
var flash           = require('connect-flash');

//Requiring Routes
var commentsRoutes      = require('./routes/comments.js'),
    campgroundsRoutes   = require('./routes/campgrounds.js'),
    authRoutes          = require('./routes/auth.js')




// seedDB(); //seed the Database
mongoose.connect("mongodb://localhost/yelp_camp_v3",{useNewUrlParser:true ,useUnifiedTopology: true});
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());

//PASSPORT CONFIGURATION
app.use(require('express-session')({
  secret:"Archit is a coder!",
  resave:false,
  saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
},User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//To add Current User in all the ROutes
//To send Message to all templates
app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});



app.use(commentsRoutes);
app.use(campgroundsRoutes);
app.use(authRoutes);

app.listen(2093,function(){
  console.log("IndiCamp Server Has Started!");
});
