const express = require('express');
const router = express.Router();
const Game = require("../models/game_model");

//All PC Route
router.get('/', async (req,res)=>{
    try{
        //get the first 25 pc games from the database
        const pcGames = await Game.find({}).where("platforms").in(["PC"]).limit(25);
        console.log(pcGames);
        //send the data from the database to the pc/index
        res.render("pc/index", {pcGames: pcGames});
    }
    catch (err){
        console.log(err);
    }
});

router.post('/filter', async (req,res)=>{
    /*
        based off the request sent, data needed in the database and render the pc/index with the new results
        Genres: includes those genres
        sort: If asc then sort by name
        recent/rating: sort by release date or rating
    */
    
    try{
        //get the first 25 pc games from the database        
        //{releasedate: "asc"}
        //{rating: "asc"}
        let sortby = req.body.sortby; 
        let sort = req.body.sort;

        let genres = [];
        //if statement to see which values/genres are ticked and add it to the array
        if(req.body.action){
            genres.push("Action");
        }
        if(req.body.rpg){
            genres.push("RPG");
        }
        if(req.body.battleroyale){
            genres.push("battleroyale");
        }
        if(req.body.shooter){
            genres.push("Shooter");
        }

        const pcGames = await Game.find({}).where("genres").in(genres).sort({ sortby: sort }).limit(25);;
        //console.log(pcGames);
        //send the data from the database to the pc/index
        res.render("pc/index", {pcGames: pcGames});
    }
    catch (err){
        console.log(err);
    }
});
//export the router we created

module.exports = router;