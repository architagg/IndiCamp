var express = require('express');
var router = express.Router();
var Campground = require('../models/campground.js')
var middleware = require("../middleware")




//CAMPGROUND PAGE REQUEST
  router.get("/campgrounds",function(req,res){
  // Get all campgrounds from DB
    Campground.find({},function(err,dbcampgrounds){
      if(err){
        console.log(err);
      }else{
        res.render("campgrounds/index.ejs" ,{campgrounds: dbcampgrounds,currentUser: req.user});   //In {thevariableinejs: thedatawearepassing}
      }
    });
  });
  
  
  router.get("/campgrounds/new",middleware.isLoggedIn,function(req,res){
  
    res.render("campgrounds/newform.ejs")
  });
  
  router.post("/campgrounds",middleware.isLoggedIn,function(req,res){
    //get data from form and add to array
      var name = req.body.name;
      var image = req.body.image;
      var description = req.body.description;
      var author = {

        id: req.user._id,
        username: req.user.username
      };
      var newCampground = {name: name,image: image,description:description , author: author}
     Campground.create(newCampground , function(err,newlyCreated){
       if(err){
         console.log(err);
       }else{
         //redirect to campground page
           res.redirect("/campgrounds");
       }
     });
    
    });
  
  
  
  //Shows more info about one Campground with ID
  router.get("/campgrounds/:id",function(req,res){
    // Find Campground with provided ID
    Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground){
      if(err){
        console.log(err);
      }else{
  
        res.render("campgrounds/show.ejs" , {campgrounds: foundCampground});
      }
    });
  });


  module.exports = router;



  //EDIT CAMPGROUND ROUTES
router.get('/campgrounds/:id/edit',middleware.CheckcampgroundOwner,function(req,res){
  Campground.findById(req.params.id,function(err,foundCampground){
    res.render("campgrounds/edit",{campground: foundCampground});
  });
});


//Update Campground
router.put("/campgrounds/:id",middleware.CheckcampgroundOwner,function(req,res){
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var updatedCampground = {name: name,image: image,description:description};
  Campground.findByIdAndUpdate(req.params.id,updatedCampground,function(err,updatedCampground){
    if(err){
      res.redirect('/campgrounds');
    }else{
      res.redirect('/campgrounds/'+req.params.id);
    }
  });
});


//DELETE CAMPGROUND
router.delete('/campgrounds/:id',middleware.CheckcampgroundOwner,function(req,res){
  // //Destroy Campground
  Campground.findByIdAndRemove(req.params.id,function(err){
    if(err){
      res.redirect('/campgrounds');
    }else{
      req.flash('success','Campground Deleted !');
      res.redirect("/campgrounds");
   
    }
  });
});

