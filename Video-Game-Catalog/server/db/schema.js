//game schema, modify as needed
import mongoose, { mongo } from "mongoose";

//direct documentation: xhttps://www.npmjs.com/package/mongoose

const gameSchema = new mongoose.Schema({
    //suhc a easy way to define database schema ha
    title: {type: String, required: true},
    description: {type: String, required: true},
    releaseDate: {type: Date, required: true},
    genre: [{type: mongoose.Schema.Types.ObjectId, ref: 'Genre'}],  //array of objects, because the game generally consists of several genres
    developer: {type: mongoose.Schema.Types.ObjectId, ref: 'Developer'}, 
    publisher: { type: mongoose.Schema.Types.ObjectId, ref: 'Publisher'},
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}],  //could be an array of reviews
    rating: { type: Number },
    platform: [{type: String}]  //games can be supported on various platforms, phone, computer, console(s), switch etc.

});
/**
 * Understanding models:
 * Models are fancy constructors compiled from Schema definitions, an instance of model is called a document.
 * Models are responsible for creating and reading documents from underlying MongoDB database.
 * The flow: Define the schema using Mongoose --> create the model based on the schema using Mongoose --> view it on MongoDB GUI/CLI interface.
 * 
 */
//create the model using mongoose
export const GameModel = mongoose.model('GameModel', GameModel);  //mongoose.model accepts the first parameter that is the name associated with the game model and the second parameter represents the actual model itself

//developer schema, for holding information regarding the developers
const DeveloperSchema = new Mongoose.Schema({
    name: { type: String, required: true },
    founded: { type: Date },  //not required, set to null by default
    country: { type: String }  //also not required, set to null by default
});

//create the DeveloperModel using mongoose
