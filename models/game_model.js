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
    genres: [  ], 
    background_img: {type: String}, 
    description: {type: String},
    platform: [  ],
    rating: {type: Number},
    release_Date: {type: Date}
});

module.exports = mongoose.model("Game", gameSchema);
