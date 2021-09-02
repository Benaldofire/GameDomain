const express = require('express');
const router = express.Router();
const Game = require("../models/game_model");
const fetch = require('node-fetch');
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

//when popular games are requested send the data back to the client in json format

//checks to see if it's the first time the server is being started
let fetchData = true;
//Home(index) page route
router.get('/', async (req,res)=>{
    /*
    //PC id = 4, PS5 id =  187, ps4 id = 18, Xbox Series S/X id = 186, Xbox One id = 1
        1.First use the fetch API and get all games data from RAWG 
        2. then add the data to the database
        3. then send the data to the home/index page
        4. then display the data by dynamically creating new containers for featured and other genres
        5. let the css handle the layout
    */
   //1.First use the fetch API and get the data from RAWG
    const API_KEY = process.env.API_KEY;
    
    if(fetchData){
        const url = "https://api.rawg.io/api/games?key="+API_KEY+"&dates=2021-01-01,2021-12-31&platforms=186,187,18,1,7&ordering=-added";
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
                rating: item.metacritic,
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
                    res.render("index", {
                        errorMessage: "Error retrieving games from Database"
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
        //get the first 5 games from the database for each category
        //put in the right query
        const popularGames = await Game.find({}).limit(4);
        const actionGames = await Game.find({}).where("genres").in(["Action"]).limit(4);
        const fpsGames = await Game.find({}).where("genres").in(["Shooter"]).limit(4);
        const rpgGames = await Game.find({}).where("genres").in(["RPG"]).limit(4);
        const battleRoyalGames = await Game.find({}).limit(4);
        //send the data from the database to the index
        res.render("index", {
            popularGames:popularGames,
            actionGames: actionGames,
            fpsGames:fpsGames,
            rpgGames:rpgGames,
            battleRoyalGames:battleRoyalGames
        });
    }
    catch (err){
        console.log(err);
    }
});

router.get('/popular', async function(res,req){
    try{
        const popularGames = await Game.find({}).sort({ "rating": "asc" }).limit(4);
        console.log(popularGames);
        //res.json(popularGames);
    }
    catch(err){
        console.log(err);
    }
});

//export the router we created

module.exports = router;