// all of middleware go here
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj ={};
middlewareObj.CheckCampgroundOwnerShip = function(req,res,next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id,function(err, foundCampground){
        if(err){
            req.flash("error","Campground was not found");
            res.redirect("/campgrounds");
            }
        else{
        //   if(foundCampground.author._id)
            if(foundCampground.author.id.equals(req.user._id) || req.user.isAdmin){
                     next();
                } else{
                 req.flash("error","You don't have permission to do that!");
                 res.redirect("back");
                }
            }
        });  
    }
    else{
        req.flash("error","Login Require!");
        res.redirect("back");
    }
};
middlewareObj.checkCommentOwnership = function(req,res,next){
   if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err, foundComment){
        if(err){
            req.flash("error","Comment was not found");
            res.redirect("back");
            }
        else{
        //   if(foundCampground.author._id)
            if(foundComment.author.id.equals(req.user._id) || req.user.isAdmin){
                     next();
                } else{
                req.flash("error","You don't have permission to do that!");
                res.redirect("back");
                }
            }
        });  
    }
    else{
        req.flash("error","Login Require!");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Login Require");
    res.redirect("/login");
};

module.exports= middlewareObj;