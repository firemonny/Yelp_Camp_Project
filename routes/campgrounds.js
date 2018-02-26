var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

router.get("/",function(req,res){
   
    //Get all the campground from database
    Campground.find({},function(err,allcampground){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/index",{campgrounds:allcampground});
        }
    });

});
router.get("/new",middleware.isLoggedIn,function(req, res) {
   res.render("campgrounds/new"); 
});
router.post("/",middleware.isLoggedIn,function(req,res){
    //get data from form and add the campground array
    var data = req.body.newsiteadd;
    var url = req.body.newurl;
    var price = req.body.price;
    var author ={
        id: req.user._id,
        username: req.user.username
    };
    var discription = req.body.description;
    var newsite = {name: data, price:price, image: url, description:discription, author:author};
    //push the data to database
    Campground.create(newsite,function(err,newsite){
        if(err){
            console.log(err);
        }
        else{
            //redirect
             res.redirect("campgrounds");
        }
    });
});
//SHOW -show more detail 
router.get("/:id",function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        }
        else{
               res.render("campgrounds/show", {campground: foundCampground});
        }
    });

   //render show template 
});

//edit route
router.get("/:id/edit",middleware.CheckCampgroundOwnerShip,function(req, res) {
         Campground.findById(req.params.id,function(err, foundCampground){
            if(err){
                res.redirect("/campgrounds");
            }
            else{
                res.render("campgrounds/edit", {campground: foundCampground});
            }
        });  
});
//update route
router.put("/:id",function(req,res){
    //find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err, updateCampground){
        if(err){
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
    //redirect back
});

//destroy route
router.delete("/:id",middleware.CheckCampgroundOwnerShip,function(req,res){
  Campground.findByIdAndRemove(req.params.id,function(err)
  {
      if(err){
          res.redirect("/campgrounds");
      }
      else{
          req.flash("success","campground delete");
          res.redirect("/campgrounds");
      }
  });  
});


module.exports = router;