//move the routes which have to do with individual game querying here
const express = require('express');
const router = express.Router();
const Game = require("../models/game_model");
const fetch = require('node-fetch');
if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}


router.get('/:id', async (req,res)=>{
  //check if the game description is in the database (game.description != Null), 
  //if it's not then you have to fetch the details from the Raw.io database and then add it to your database and then send it to be rendered
  console.log("accessed");
  try{
   let game = await Game.find({}).where("id").in(req.params.id);
   if(game[0].description == "N/A"){
         //fetch the game data from raw.io
         //then update the data for the current game and then render the page for the game
         const API_KEY = process.env.API_KEY;
         const url = `https://api.rawg.io/api/games/${req.params.id}?key=`+API_KEY;
         const rawgResponse = await fetch(url);
         const data = await rawgResponse.json();
         game[0].description = data.description;
         game[0].website = data.website;
         game[0].redditUrl = data.reddit_url;
         game[0].stores = data.stores;
         game[0].publishers = data.publishers;
         game[0].developers = data.developers;

         
         for(platform of data.platforms){
            if(platform.platform.name == "PC"){
               
                let minimumRequirement = platform.requirements.minimum;
                let recommendedRequirements = platform.requirements.recommended;
                game[0].minimumRequirement = minimumRequirement;
                game[0].recommendedRequirement = recommendedRequirements;
            }
         }
         
         if(data.esrb_rating){
            game[0].esrb_rating = data.esrb_rating.name;
         }
         console.log("data was fetched");

         game[0].save((error, game)=>{
         if(error){
               //Note: if there is a single error retrieving the data then your whole page will crash.
               //consider fixing this issue in the future
               console.log(error.message);
               res.render("index", {
                  errorMessage: "Error retrieving games from Database"
               })
         }
         else{
               console.log(`${game.name} successfully saved`);
         }
      });
   }
   //Use youtube API to find the video for the game and save the video
   res.render("games/game", {
         game: game[0]
      });
  }
  catch(error){
     console.log(error)
  }
  

});

//export the router we created

/*
// Find the student with this ID
Game.findById(req.params.id, function(err, game) {
 if (stu === null) {
    console.log("Student not found");
 }
 else {
    // Increase student's GPA and save
    stu.gpa += 0.1;
    stu.save(function (err, stu) {
       console.log("New GPA: " + stu.gpa);
    });
 }
});
*/

module.exports = router;
