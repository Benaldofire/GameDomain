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
    background_img: {type: String}, 
    images: [ ],
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
    requirements: {},
    esrb_rating: {type: String}
});

module.exports = mongoose.model("Game", gameSchema);
