const express = require('express');
const router = express.Router();
const Game = require("../models/game_model");

//checks to see if it's the first time the server is being started
let fetchData = true;
//All PC Route
router.get('/', async (req,res)=>{
    /*
    //PC id = 4
        1.get pc games data from database and send it to the pc/index view
        2. then display the data by dynamically creating new containers,
        3. let the css handle the layout
    */

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

//export the router we created

module.exports = router;