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
    let gamesIDb = await Game.find({});
    if(gamesIDb.length > 0){
        fetchData = false;
        console.log("no need to fetch games");
    }
    else{
        console.log("need to fetch");
    }
    /*
    //PC id = 4, PS5 id =  187, ps4 id = 18, Xbox Series S/X id = 186, Xbox One id = 1Nintendo Switch = 7.
        1.First use the fetch API and get all games data from RAWG 
        2. then add the data to the database
        3. then send the data to the home/index page
        4. then display the data by dynamically creating new containers for featured and other genres
        5. let the css handle the layout
    */
   //1.First use the fetch API and get the data from RAWG
    const API_KEY = process.env.API_KEY;
    let page = 1;
    if(fetchData){
        const url = "https://api.rawg.io/api/games?key="+API_KEY+"&dates=2020-01-01,2021-12-31&platforms=186,187,18,1,7&ordering=-added&page="+page+"&page_size=50";
        const rawgResponse = await fetch(url);
        const data = await rawgResponse.json();
        /* Used in the final version
            get 5 pages worth of games.
            any other games will have to be obtained by making individual requests to the rawg API. 
             e.g Searching for games or going to next page to find more games, will require us to make a request to the rawg API. 
        while(data.next != null || data.next != "" && page < 5){
            const rawgResponse = await fetch(data.next);
            const data = await rawgResponse.json();
            page++;
            //storing data into database
        }
        */
       
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
            let screenshots = [];
            for(screenshot of item.short_screenshots){
                screenshots.push(screenshot.image);
            }
            let tags = [];
            for(tag of item.tags){
                if(tag.language = "eng"){
                    tags.push(tag.name)
                }
            }
            //we can try using the update if the id exists, in the db, if not then we create a new one. 
            let game = new Game({
                id: item.id,
                name: item.name,
                screenshots: screenshots,
                genres: genres, 
                tags: tags,
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
        const popularGames = await Game.find({}).sort({ "rating": "desc" }).limit(5);
        const actionGames = await Game.find({}).where("genres").in(["Action"]).limit(4);
        const fpsGames = await Game.find({}).where("genres").in(["Shooter"]).limit(4);
        const rpgGames = await Game.find({}).where("genres").in(["RPG"]).limit(4);
        const adventureGames = await Game.find({}).where("genres").in(["Adventure"]).limit(4);
        //send the data from the database to the index
        res.render("index", {
            popularGames:popularGames,
            actionGames: actionGames,
            fpsGames:fpsGames,
            rpgGames:rpgGames,
            adventureGames:adventureGames
        });
    }
    catch (err){
        console.log(err);
    }
});

router.get('/popular', async function(req,res){
    try{
        const popularGames = await Game.find({}).sort({ "rating": "desc" }).limit(5);
        console.log("Popular games data requested");
        res.json(popularGames);
    }
    catch(err){
        console.log(err);
    }
});

router.get('/deleteAll', async function(req,res){
    try{
        //deletes everything in db
        const popularGames = await Game.deleteMany({});
        console.log("deleted");
        console.log(popularGames);
    }
    catch(err){
        console.log(err);
    }
});

router.get('/fetchData', async function(req,res){
    const API_KEY = process.env.API_KEY;
    const url = "https://api.rawg.io/api/games?key="+API_KEY+"&dates=2020-01-01,2021-12-31&platforms=186,187,18,1,7&ordering=-added&page_size=50";
    const rawgResponse = await fetch(url);
    const data = await rawgResponse.json();

    for(item of data.results){

        //extract the platform names and put it in an array to use for the database
        let platforms = [];
        for(object of item.platforms){
            platforms.push(object.platform.name);
        }

        let genres = [];
        for(genre of item.genres){
            genres.push(genre.name);
        }

        //2. store each data into the database schema
        let game = new Game({
            id: item.id,
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
});


router.get('/fetch',async (req,res)=>{
    const CLIENT_ID = process.env.CLIENT_ID;
    const CLIENT_SECRET = process.env.CLIENT_SECRET;
    const grant_type = 'client_credentials';

    let tokenUrl = `https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=${grant_type}`
    let access_token ='';
    let timeout;

    
    let options = {
        method: 'POST',
    }

    try{
        let response = await fetch(tokenUrl, options)
        let data = await response.json()
        console.log(data);
        access_token = data.access_token;
        timeout = data.expires_in
        console.log(access_token)
        console.log(timeout)
    }
    catch(error){
        console.log(error)
    }

    



    if(access_token == ''){
        console.log("no access token")
    }

    let url = 'https://api.igdb.com/v4/games';
    const date = new Date('2019-1-1');
    console.log(date)
    let data = "fields *; where platforms = 48 & release_dates < 1538129354; sort release_dates desc;";
    let options2 = {
        method: 'POST',
        mode: 'cors',
        headers:{
            'Client-ID': CLIENT_ID,
            'Authorization': 'Bearer '+access_token,
            'Accept': 'application/json',
            'Content-Type': 'text/plain'
        },
        body: data
    }
    
    try{
        let response = await fetch(url,options2);
        let data = await response.json();
        res.send(data);
    }
    catch(error){
        console.log(error);
        res.send(error);
    }

    

});

module.exports = router;