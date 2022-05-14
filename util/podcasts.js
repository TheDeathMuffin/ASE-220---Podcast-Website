/*
    This is the File that defines the Mongoose schema for the Users Collection
*/

//Set up the modules that will be used in this file
const mongoose = require('mongoose');
const Schema = mongoose.Schema

//Define the New Schema
const podcastSchema = new Schema(
    {
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        authors: {
            type: Array,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
        },
        journal: {
            type: String,
        },
        publishDate: {
            type: Date,
            default: Date.now
        },
        doi: {
            type: String
        },
        disciplines: {
            type: Array
        },
        tags: {
            type: Array
        },
        likes: {
            type: Number,
            default: 0
        },
        saves: {
            type: Number,
            default: 0
        }
    }
) 

//Create the model based on the Schema above
//The 3rd paraemeter called "Users" is intented to overrite the default naming of this specific model
const Podcast = mongoose.model("Podcast", podcastSchema, "Podcasts");
module.exports = Podcast;