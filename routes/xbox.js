const express = require('express');
const router = express.Router();
const Game = require("../models/game_model");

//checks to see if it's the first time the server is being started
let fetchData = true;
//All xbox Route
router.get('/', async (req,res)=>{
    /*
    //PS5 id =  187, ps4 id = 18
        1.get ps games data from database and send it to the xbox/index view
        2. then display the data by dynamically creating new containers,
        3. let the css handle the layout
    */

    try{
        //get the first 25 playstation games from the database
        const xboxGames = await Game.find({}).where("platforms").in(["Xbox One","Xbox Series S/X"]).limit(25);
        //send the data from the database to the xbox/index
        console.log(xboxGames);
        res.render("xbox/index", {xboxGames: xboxGames});
    }
    catch (err){
        console.log(err);
    }
    
    
});

//export the router we created

module.exports = router;