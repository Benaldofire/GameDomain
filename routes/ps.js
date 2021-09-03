const express = require('express');
const router = express.Router();
const Game = require("../models/game_model");

//All PS Route
router.get('/', async (req,res)=>{
    try{
        //get the first 25 playstation games from the database
        const psGames = await Game.find({}).where("platforms").in(["PlayStation 5","PlayStation 4"]).limit(25);
        //send the data from the database to the ps/index
        res.render("ps/index", {psGames: psGames});
    }
    catch (err){
        console.log(err);
    }
    
    
});

router.post('/filter', async (req,res)=>{
    /*
        based off the request sent, data needed in the database and render the ps/index with the new results
        Genres: includes those genres
        sort: If asc then sort by name
        recent/rating: sort by release date or rating
    */
   
    try{
        //get the first 25 ps games from the database        
        const sortField = req.body.sortby; 
        let sort = req.body.sort;
        let sortOption = {};
        sortOption[sortField] = sort;
        console.log(sortOption)
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

        if(genres.length == 0){
            genres = ["Action","RPG","battleroyale","Shooter"];
        }

        const psGames = await Game.find({}).where("genres").in(genres).sort(sortOption).limit(25);
        console.log(psGames);
        //send the data from the database to the ps/index
        res.render("ps/index", {psGames: psGames});
    }
    catch (err){
        console.log(err);
    }
});
//export the router we created

module.exports = router;