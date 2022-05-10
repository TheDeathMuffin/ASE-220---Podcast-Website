const express = require('express')
const router = express.Router()
const User = require("./util/users.js");
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({
        extended: false
    })
const fs=require('fs');
const { db } = require('./util/users');
//const { restart } = require('nodemon');


/* API routes */

//ROUTES FOR USERS
//GET's a user's information
router.get('/:id', async (req, res) => {
    console.log("GET request executing...")
	try{
		// const users = await User.find({id: req.params.id});
		const users = await User.findById(req.params.id).exec();
		res.status(200).json(users)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
});

//POST's information for a new user
router.post('/user', async (req,res) => {
    console.log("POST request executing...");
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        isAuthor: req.body.isAuthor
    })
    try {
        const newUser = await user.save();
        res.status(200).json(newUser);
    } catch (err){
        res.status(400).json({message: err.message})
    }
})

//DELETEs user from the database based on ID
router.delete('/:id', async (req, res) => {
    console.log("DELETE Request executing...")
	try {
		await User.findByIdAndRemove(req.params.id).exec();
		res.status(200).send("Item Deleted");
	} catch (err){
		res.status(404).send(err.message);
	}
});

//PATCH updates a user's information in the database
router.patch("/:id", getUser, async (req, res) => {
    console.log("PATCH Request executing...")
    //Modifies information from getUser() based on what's sent in the PATCH request
    if(req.body.firstname != null){
        res.user.firstname = req.body.firstname;
    }
    if(req.body.lastname != null){
        res.user.lastname = req.body.lastname;
    }
    if(req.body.email != null){
        res.user.email = req.body.email;
    }
    if(req.body.password != null){
        res.user.password = req.body.password;
    }
    if(req.body.isAuthor != null){
        res.user.isAuthor = req.body.isAuthor;
    }
    if(req.body.organization != null){
        res.user.organization = req.body.organization;
    }
    if(req.body.savedPodcasts != null){
        res.user.savedPodcasts.push(req.body.savedPodcasts);
    }
    if(req.body.likedPodcasts != null){
        res.user.likedPodcasts.push(req.body.likedPodcasts);
    }
    if(req.body.subscribedTo != null){
        res.user.subscribedTo.push(req.body.subscribedTo);
    }
    try {
        //Saves all the updated information to the database then sends a response back to the requestor with a status of 200
        const updatedUser = await res.user.save();
        res.status(200).json(updatedUser);
    } catch (err) {
        //Sends error if the code above fails for whatever reason
        res.status(500).json({message: err.message})
    }
})

//Asyncronous Function to grab user data by ID and save it to a "res.user" object value
async function getUser(req, res, next){
	let user
	try{
		user = await User.findById(req.params.id).exec();
		if(user == null){
			return res.status(404).json({message: "Can't find user"})
		}
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
	res.user = user;
	next()
}

module.exports = router