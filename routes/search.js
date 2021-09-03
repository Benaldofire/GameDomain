const express = require('express');
const router = express.Router();
const Game = require("../models/game_model");

//All PS Route
router.get('/', async (req,res)=>{
    let search = req.query.name;
    let query = Game.find()
    if(req.query.name != null && req.query.name != ''){
        searchList = query.regex("name", new RegExp(search, "i"));
    }

    try{
        const games = await query.exec()
        res.render("search/results", {
            games: games,
            searchParam: req.query
        });
    }
    catch (err){
        res.redirect('/');
    }
    
});

module.exports = router;
