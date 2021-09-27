///this game model will be used for pc, xbox and ps (playstation)
const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true //id must be unique
    },
    name: {
        type: String, 
        required: true
    },
    genres: [ ], 
    tags:[ ], //Use RegEx to get english tags
    background_img: {type: String}, 
    screenshots: [ ],
    description: {type: String},
    reddit_description: {type: String},
    platform: [ ],
    rating: {type: Number},
    release_Date: {type: Date},
    website: {type: String},
    redditUrl:  {type: String},
    stores: [ ],
    publishers: [ ],
    developers: [ ],
    minimumRequirement: {type: String},
    recommendedRequirement: {type: String},
    esrb_rating: {type: String}
});

module.exports = mongoose.model("Game", gameSchema);
