var express = require('express');
var router = express.Router();
var Campground = require('../models/campground.js')
var Comment = require('../models/comment.js')
var middleware = require("../middleware")


//================================
//Comment Routes
//================================
router.get("/campgrounds/:id/comments/new",middleware.isLoggedIn,function(req,res){
    //find campground by ID
    Campground.findById(req.params.id,function(err,foundCampground){
      if(err)
      {
        console.log(err);
      }else{
        res.render("comments/newform.ejs",{campground: foundCampground});
      }
    });
  });
  
  
  router.post("/campgrounds/:id/comments",middleware.isLoggedIn,function(req,res){
  //Lookup campground using ID
    Campground.findById(req.params.id,function(err,foundCampground){
      if(err){
        console.log(err);
        res.redirect("/campgrounds");
      }  else{
        var text = req.body.text;
        var author = req.body.author;
        var newComment = {text: text,author:author};
        Comment.create(newComment,function(err,newComm){
          if(err){
            req.flash('error','Something Went Wrong!');
            console.log(err);
  
          } else{
            //add Username and Id to comment
            newComm.author.id = req.user._id;
            newComm.author.username = req.user.username;
            //save Username
            newComm.save();
            foundCampground.comments.push(newComm); //DATA ASSOCIATION
            foundCampground.save();
            req.flash('sucess','Comment Posted Successfully!');

            res.redirect("/campgrounds/"+foundCampground._id);
          }
        });
      }
  
  });
  });


  //EDIT COMMENT ROUTES
  router.get('/campgrounds/:id/comments/:comment_id/edit',middleware.CheckcommentOwner,function(req,res){
    Comment.findById(req.params.comment_id,function(err,foundComment){
      if(err)
      {
        console.log(err);
        res.redirect('back')
      }else{
        res.render("comments/edit",{campground_id : req.params.id,comment: foundComment}); 
      }

    });
  });


  //Update Comment
router.put("/campgrounds/:id/comments/:comment_id",middleware.CheckcommentOwner,function(req,res){
  var text = req.body.text;
  var updatedComment = {text:text};
  Comment.findByIdAndUpdate(req.params.comment_id,updatedComment,function(err,updatedComment){
    if(err){
      res.redirect('back');
    }else{
      res.redirect('/campgrounds/'+req.params.id);
    }
  });
});


//DELETE COMMENT
router.delete('/campgrounds/:id/comments/:comment_id',middleware.CheckcommentOwner,function(req,res){
  //Destroy Comment
  Comment.findByIdAndRemove(req.params.comment_id,function(err){
    if(err){
      res.redirect('/campgrounds');
    }else{
      req.flash('success','Comment Deleted!');
      res.redirect("/campgrounds/"+ req.params.id );
      
    }
  });
});







  module.exports = router;






 