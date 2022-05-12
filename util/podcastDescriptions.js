/*
    This is the File that defines the Mongoose schema for the Users Collection
*/

//Set up the modules that will be used in this file
const mongoose = require('mongoose');
const Schema = mongoose.Schema

//Define the New Schema
const podcastDescriptionSchema = new Schema(
    {
        description: {
            type: String,
            required: true
        },
        relatedPodcast: {
            type: String,
            required: true
        }
    }
) 

//Create the model based on the Schema above
//The 3rd paraemeter called "Users" is intented to overrite the default naming of this specific model
const PodcastDescription = mongoose.model("PodcastDescription", podcastDescriptionSchema, "PodcastDescriptions");
module.exports = PodcastDescription;