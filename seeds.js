var mongoose =require("mongoose");
var Campground = require("./models/campground");
var Comment    = require("./models/comment");
var User = require("./models/user")

var data = [
    {name:"Taichung",
     image:"https://cdn.cnn.com/cnnnext/dam/assets/160411171025-taichung-feng-chia-night-market.jpg",
     description:"The first four tables show only the largest one-day changes between a given day's close and the close of the previous trading day,[1][2] not the largest changes during the trading day (i.e. intraday changes).",
     comments:[]
    },
     {name:"Taipei",
     image:"https://guidetotaipei.com/sites/default/files/styles/hotlink-ok/public/images/destination/98/1394939_10151771932008121_713133543_n.jpg?itok=z8x4NQfq",
     description:"The first four tables show only the largest one-day changes between a given day's close and the close of the previous trading day,[1][2] not the largest changes during the trading day (i.e. intraday changes).",
     comments:[]
    },
     {name:"Lukang",
     image:"https://upload.wikimedia.org/wikipedia/commons/7/72/Tienhou_temple_lukang.jpg",
     description:"The first four tables show only the largest one-day changes between a given day's close and the close of the previous trading day,[1][2] not the largest changes during the trading day (i.e. intraday changes).",
     comments:[]
    }
    ];
//This function is remove all the data in the database.
function seedDB(){
    Campground.remove({},function(err){
   if(err){
     console.log(err);
    };
    
    //  console.log("remove completely.");
    //  data.forEach(function(seed){
    //     //add few campgrounds
    //     Campground.create(seed,function(err, campground){
    //         if(err){
    //             console.log(err);
    //         }
        
    //         else{
    //             console.log("added a data in database.");
    //             //add a few comments
    //             Comment.create({
    //                             text:"1. Good place to travel",
    //                             author: "Monny"
    //             },function(err,comment){
    //                 if(err){
    //                     console.log(err);
    //                 }
    //                 else{
    //                     campground.comments.push(comment._id);
    //                     campground.save();
    //                     console.log("Created new comment");
    //                 }
    //             });
    //         }
    //     });
       
    
    // });
    });
  User.remove({},function(err){
  if(err){
     console.log(err);
    }
    });  
}

module.exports = seedDB;