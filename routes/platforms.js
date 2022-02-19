const express = require('express');
const router = express.Router();
const Game = require("../models/game_model");


/*Try for All games routes, use a nested route. so first you pass the platform in a query then assign it to a variable, 
  use that variable to retrieve the data needed, then render just one games page and pass the necessary data to it.

  also try '/:platform/:page' to get the page number to go to.

  maybe retrieve everything and store it in an array on the front end and then loop through it if the user goes to the next page. without refreshing the page, just use JS.
*/
//All PC Route

let xbox_platform = ["Xbox One","Xbox Series S/X"];
let pc_platform = ["PC"];
let ps_platform = ["PlayStation 5","PlayStation 4"];
//the platform will change based off which page we are on, and we can at least use it for the filtering
let platform = "";
router.get('/:platform', async (req,res)=>{
    platform = req.params.platform;
    let query = Game.find({});
    //get the first 24 games for the :platform param sent from the database
    if(platform == "pc"){
        option = query.where("platform").in(pc_platform).limit(24);
    }
    else if(platform == "ps"){
        option = query.where("platform").in(ps_platform).limit(24);
    }
    else if(platform == "xbox"){
        option = query.where("platform").in(xbox_platform).limit(24);
    }
    else{
        res.send("Page Not Available");
    }

    try{
        const games = await query.exec();
        //console.log(games);
        //send the data from the database to the games/index
        res.render("games/index", {
            games: games,
            action:false,
            rpg:false,
            shooter:false,
            adventure:false,
            sort:"",
            sortby:""
        });
    }
    catch (err){
        console.log(err);
    }
});

router.get('/games/filter', async (req,res)=>{
    /*
        based off the request sent, data needed in the database and render the pc/index with the new results
        Genres: includes those genres
        sort: If asc then sort by name
        recent/rating: sort by release date or rating
    */
    try{
        
        //get the first 25 platform specified games from the database        
        //{releasedate: "asc"}
        //{rating: "asc"}
        const sortField = req.query.sortby; 
        let sort = req.query.sort;
        let sortOption = {};
        sortOption[sortField] = sort;
        let genres = [];
        //if statement to see which values/genres are ticked and add it to the array
        if(req.query.action){
            genres.push("Action");
        }
        if(req.query.rpg){
            genres.push("RPG");
        }
        if(req.query.adventure){
            genres.push("Adventure");
        }
        if(req.query.shooter){
            genres.push("Shooter");
        }

        if(genres.length == 0){
            genres = ["Action","RPG","Adventure","Shooter"];
        }

        let query = Game.find({});

        if(platform == "pc"){
            option = query.where("genres").in(genres).where("platform").in(pc_platform).sort(sortOption).limit(24);
        }
        else if(platform == "ps"){
            option = query.where("genres").in(genres).where("platform").in(ps_platform).sort(sortOption).limit(24);
        }
        else if(platform == "xbox"){
            option = query.where("genres").in(genres).where("platform").in(xbox_platform).sort(sortOption).limit(24);
        }

        const games = await query.exec();

        //console.log(games);
        //send the data from the database to the pc/index, also send the data that was previously filled to repopulate the fields
        res.render("games/index", {
            games: games,
            action:req.query.action,
            rpg:req.query.rpg,
            shooter:req.query.shooter,
            adventure:req.query.adventure,
            sort:sort,
            sortby:req.query.sortby
        });
    }
    catch (err){
        console.log(err);
    }
});



router.get('/all/:genre', async (req, res)=>{
    console.log(req.params.genre);
    let genres = []
    let action = false;
    let rpg = false;
    let shooter = false;
    let adventure = false;

    try{
        if(req.params.genre =="action"){
            genres.push("Action");
            action = true;
        }
        if(req.params.genre == "rpg"){
            genres.push("RPG");
            rpg = true;
        }
        if(req.params.genre == "adventure"){
            genres.push("Adventure");
            adventure = true;
        }
        if(req.params.genre == "shooter"){
            genres.push("Shooter");
            shooter = true;
        }

        
        let games = await Game.find({}).where("genres").in(genres).limit(24);
        res.render("games/index.ejs",{
            games: games,
            action:action,
            rpg:rpg,
            shooter:shooter,
            adventure:adventure,
            sort:"Name",
            sortby:"asc"
        });
    }
    catch(err){
        console.log(err);
    }
    
});
//export the router we created

module.exports = router;