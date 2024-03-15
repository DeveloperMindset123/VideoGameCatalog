//game schema, modify as needed
import mongoose, { Mongoose, mongo, version } from "mongoose";
import 'dotenv/config'

//direct documentation: xhttps://www.npmjs.com/package/mongoose

//test to check if dotenv works as intended
console.log("The MongoDB URI is: ", process.env.LOCAL_URI_MAIN);  //outputs undefined, unless it's on the same level as schema.js --> if program is running correctly, this should output the process.env file

//create an active database connection using the MongoDB uri
const mongooseConnection = mongoose.createConnection(String(process.env.LOCAL_URI_MAIN));  //convert the URI into a string

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

}, {versionKey: false});
/**
 * Understanding models:
 * Models are fancy constructors compiled from Schema definitions, an instance of model is called a document.
 * Models are responsible for creating and reading documents from underlying MongoDB database.
 * The flow: Define the schema using Mongoose --> create the model based on the schema using Mongoose --> view it on MongoDB GUI/CLI interface.
 * 
 */
//create the model using mongoose
export const gameModel = mongooseConnection.model('GameModel', gameSchema);  //mongoose.model accepts the first parameter that is the name associated with the game model and the second parameter represents the actual model itself

//developer schema, for holding information regarding the developers
const DeveloperSchema = new mongoose.Schema({  //note that mongoose.schema is the right syntax for creating schema in mongoose
    name: { type: String, required: true },
    founded: { type: Date },  //not required, set to null by default
    country: { type: String }  //also not required, set to null by default
}, {versionKey: false});

//create the DeveloperModel using mongoose
export const DeveloperModel = mongooseConnection.model('DeveloperModel', DeveloperSchema);

//Publisher Schema
const publisherSchema = new mongoose.Schema({  //note that this is the correct syntax for creating schema
    name: { type: String, required: true},
    founded: { type: Date},  //not required, set to null by default
    country: { type: String},  //not required, set to null by default
}, {versionKey: false});

//create and export the model 
export const publisherModel = mongooseConnection.model("Publisher", publisherSchema);

//genre schema
const genreSchema = new mongoose.Schema({
    name: { type: String, required: true },
});

//create and export the model
export const genreModel = mongooseConnection.model("Genre", genreSchema);

//review schema
const reviewSchema = new mongoose.Schema({
    game: { type: mongoose.Schema.Types.ObjectId, ref: 'game'},  //the ref option tells mongoose.js which model to use during population
    author: { type: String },
    content: { type: String, required: true },
    score: { type: Number, required: true },
    date: { type: Date, default: Date.now },
}, {versionKey: false});  //set the version tracking to false

//create and export the model
export const reviewModel = mongooseConnection.model('Review', reviewSchema);

//retrieve and test one of the models to see if it works as intended
//create a genre (since it's the simplest method)
//wrap logic in an async function to use await
async function createAndSaveGenre() {
    //try catch block
    try {
        //instantiate an instance of the mode
        const genre = new genreModel({name: 'Action'});  //construct the data to be inserted within the model body
        //save the genre to the database
        const savedGenre = await genre.save()  //send an await signal to send a request to the database

        //log to see if the data has been saved or not
        console.log("Current Model: ", savedGenre);
        console.log("Generated id: ", savedGenre._id);   //mongoose automatically adds an _id property of type ObjectId to a document when it gets created. (this can be overwritten with custom id as well)
        console.log("Genereated Version:", savedGenre.__v);  //This __v field is used to keep track of the revisions of a document. By default, by default it's value is false
    } catch(error) {
        //Log any errors that occurs during the saving process, specify the error message that's taking place
        console.error('Error saving the genre', error);
    }
}

//call the function to test it out
createAndSaveGenre();


//to test run this file directly, cd server/db --> node schema.js


