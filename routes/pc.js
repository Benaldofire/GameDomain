const express = require('express');
const router = express.Router();
const Game = require("../models/game_model");
const fetch = require('node-fetch');
require('dotenv').config();

//checks to see if it's the first time the server is being started
let fetchData = true;
//All PC Route
router.get('/', async (req,res)=>{
    /*
    //PC id = 4
        1.First use the fetch API and get the data from RAWG 
        2. then add the data to the database
        3. then send the data to the pc/index
        4. then display the data by dynamically creating new containers,
        5. let the css handle the layout
    */
   //1.First use the fetch API and get the data from RAWG 
    const API_KEY = process.env.API_KEY;
    
    if(fetchData){
        const url = "https://api.rawg.io/api/games?key="+API_KEY+"&dates=2021-01-01,2021-12-31&platforms=18,1,7&ordering=-added";
        const rawgResponse = await fetch(url);
        const data = await rawgResponse.json();

        for(item of data.results){
            //2. store each data into the database schema

            //extract the platform names and put it in an array to use for the database
            let platforms = [];
            for(object of item.platforms){
                platforms.push(object.platform.name);
            }
            let genres = [];
            for(genre of item.genres){
                genres.push(genre.name);
            }

            let game = new Game({
                name: item.name,
                genres: genres, 
                background_img: item.background_image, 
                description: "N/A",
                platform: platforms,
                release_Date: item.released
            });

            
            game.save((error, game)=>{
                if(error){
                    //Note: if there is a single error retrieving the data then your whole page will crash.
                    //consider fixing this issue in the future
                    console.log(error.message);
                    res.render("pc/index", {
                        errorMessage: "Error retrieving pc games from Database"
                    })
                }
                else{
                    console.log(`${game.name} successfully saved`);
                }
            });
        }
        fetchData = false;
    }

    try{
        //get the first 25 games from the database
        const games = await Game.find({}).limit(25);
        //send the data from the database to the pc/index
        console.log(games[0]);
        res.render("pc/index", {games: games});
    }
    catch{
        console.log("error");
    }
    
    
});

//export the router we created

module.exports = router;