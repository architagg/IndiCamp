//MIDDLEWARE  
var Campground      = require("../models/campground.js");
var Comment         = require("../models/comment.js");



var middlewareObj = {};

middlewareObj.CheckcampgroundOwner =  function(req,res,next){
        if(req.isAuthenticated()){
          Campground.findById(req.params.id,function(err,foundCampground){
            if(err){
              req.flash('error','Campground Not Found!');
              res.redirect('back');
            }else{
                   //does user own campground?
                   if(foundCampground.author.id.equals(req.user.id)){
                      next();
                    }
                   else{
                    req.flash('error','You Dont Have Permission');
                    res.redirect('back');
                        }
                  }
          });
          
        }else{
          req.flash('error','You need to be Logged in to do that !');
            res.redirect("back");
        }
      };



middlewareObj.CheckcommentOwner = function(req,res,next){
        if(req.isAuthenticated()){
          Comment.findById(req.params.comment_id,function(err,foundComment){
            if(err){
              req.flash('error','Comment Not Found!');
              res.redirect('back');
            }else{
                   //does user own comment?
                   if(foundComment.author.id.equals(req.user.id)){
                   next();
                    }
                   else{ req.flash('error','You Dont Have Permission');
                        res.redirect('back');
                        }
                  }
          });
        }else{
          req.flash('error','You need to be Logged in to do that !');
          res.redirect("back");
      }
    };


middlewareObj.isLoggedIn = function(req,res,next){
        if(req.isAuthenticated()){
          return next()
        }
        req.flash('error','You need to be Logged in to do that !');
        res.redirect('/login')
      }



    
module.exports = middlewareObj;