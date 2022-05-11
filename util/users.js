/*
    This is the File that defines the Mongoose schema for the Users Collection
*/

//Set up the modules that will be used in this file
const mongoose = require('mongoose');
const Schema = mongoose.Schema

//Define the New Schema
const userSchema = new Schema(
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
        password: {
            type: String,
            required: true
        },
        isAuthor: {
            type: String,
            default: "0",
            required: true
        },
        organization: {
            type: String,
            required: true,
            default: "none"
        },
        savedPodcasts: {
            type: Array
        },
        likedPodcasts: {
            type: Array
        },
        subscribedTo: {
            type: Array
        }
    }
) 

//Create the model based on the Schema above
//The 3rd paraemeter called "Users" is intented to overrite the default naming of this specific model
const User = mongoose.model("User", userSchema, "Users");
module.exports = User;