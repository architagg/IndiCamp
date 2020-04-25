var express = require('express');
var router = express.Router();
var User = require('../models/user.js')
const passport = require('passport')

//LANDING PAGE REQUEST
router.get("/",function(req,res){
    res.render("landing.ejs")
  });



//===========
//AUTHENTICATION ROUTES
//===========

//SignUp Form
router.get("/signup",function(req,res){
    res.render("authentication/signup.ejs");
  });
  
  //SignUp Logic
  router.post("/signup",function(req,res){
    var newUser = new User ({username: req.body.username});
    User.register(newUser, req.body.password,function(err,user){
      if(err){
        req.flash('error', err.message);
        console.log(err);
        return res.redirect("/signup");
      }
      passport.authenticate('local')(req,res,function(){
        req.flash('success','Congratulations! Wecome to IndiCamp!'+  user.username);
        res.redirect("/campgrounds");
      });
    });
  });
  
  //lOGIN form
  router.get("/login",function(req,res){
    res.render("authentication/login.ejs");
  });
  
  //Login Logic
  router.post("/login",passport.authenticate('local',{
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
  }),
  function(req,res){
  });
  

  
  //Logout Route
  router.get('/logout',function(req,res){
    req.logout();
    req.flash('success','Logged You Out !');
    res.redirect('/campgrounds');
  })
  
  module.exports = router;