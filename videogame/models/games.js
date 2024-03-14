const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//defines the data model for the game
const videoGameSchema = new Schema({
    title: String,
    image: String,
    price: String,
    description: String
});

module.exports = mongoose.model('videogame', videoGameSchema);