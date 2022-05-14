const express = require('express')
const router = express.Router()
const User = require("./util/users.js");
const Podcast = require("./util/podcasts.js");
const PodcastDescription = require("./util/podcastDescriptions.js");
const Discipline = require("./util/disciplines.js");
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({
        extended: false
    })
const fs=require('fs');
const { db } = require('./util/users');
//const { restart } = require('nodemon');


/* API routes for USERS*/

//ROUTES FOR USERS

//GET's ALL Users
router.get('/user/findAll', async (req, res) => {
    console.log("GET request executing...")
	try{
		// const users = await User.find({id: req.params.id});
		const users = await User.find({}).exec();
		res.status(200).json(users)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
});

//GET's a user's information by email
router.get('/user/owned/:email', async (req, res) => {
    console.log("GET request executing...")
	try{
		const user = await User.find({email: req.params.email}).exec();
        console.log(user);
		res.status(200).json(user)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
});

//GET's a user's information by ID
router.get('/user/:id', async (req, res) => {
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
router.post('/user/', async (req,res) => {
    console.log("POST request executing...");
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        isAuthor: req.body.isAuthor,
        likedPodcasts: req.body.likedPodcasts
    })
    try {
        const newUser = await user.save();
        res.status(200).json(newUser);
    } catch (err){
        res.status(400).json({message: err.message})
    }
})

//DELETEs user from the database based on ID
router.delete('/user/:id', async (req, res) => {
    console.log("DELETE Request executing...")
	try {
		await User.findByIdAndRemove(req.params.id).exec();
		res.status(200).send("Item Deleted");
	} catch (err){
		res.status(404).send(err.message);
	}
});

//PATCH updates a user's information in the database
router.patch("/user/:id", getUser, async (req, res) => {
    console.log("PATCH Request executing...")
    //Modifies information from getUser() based on what's sent in the PATCH request
    //TODO - use loop to condense this code.
    console.log(req.body);
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
        res.user.savedPodcasts = req.body.savedPodcasts;
    }
    if(req.body.likedPodcasts != null){
        console.log('Before: ' + res.user.likedPodcasts);
        res.user.likedPodcasts = req.body.likedPodcasts;
        console.log('After: ' + res.user.likedPodcasts);
        
    }
    if(req.body.subscribedTo != null){
        res.user.subscribedTo = req.body.subscribedTo;
    }
    try {
        //Saves all the updated information to the database then sends a response back to the requestor with a status of 200
        console.log(res.user);
        const updatedUser = await res.user.save();
        res.status(200).json(updatedUser);
    } catch (err) {
        //Sends error if the code above fails for whatever reason
        res.status(500).send(err.message);
    }
})

//Asyncronous Function to grab user data by ID and save it to a "res.user" object value
async function getUser(req, res, next){
	let user
    //console.log(req.params.id);
	try{
		user = await User.findById(req.params.id).exec();
		if(user == null){
			return res.status(402).json({message: "Can't find user"})
		} else {
            //console.log(req.body);
            res.user = user;
            next()
        }
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
    
	
}


/* API Routes for Podcasts*/

//GET's ALL podcasts
router.get('/podcast/findAll', async (req, res) => {
    console.log("GET request executing...")
	try{
		// const users = await User.find({id: req.params.id});
		const podcasts = await Podcast.find({}).exec();
		res.status(200).json(podcasts)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
});

//GET's information from a podcast using the ID
router.get('/podcast/:id', async (req, res) => {
    console.log("GET request executing...")
	try{
		// const users = await User.find({id: req.params.id});
		const podcasts = await Podcast.findById(req.params.id).exec();
		res.status(200).json(podcasts)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
});


//GET's information from podcasts by DOI.
router.get('/podcast/exist/:doi', async (req, res) => {
    console.log("GET request executing...")
	try{
		const podcasts = await Podcast.find({doi: req.params.doi}).exec();
		res.status(200).json(podcasts)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
});
//GET's information from podcasts owned by a specified user.
router.get('/podcast/owned/:email', async (req, res) => {
    console.log("GET request executing...")
	try{
		const podcasts = await Podcast.find({email: req.params.email}).exec();
		res.status(200).json(podcasts)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
});
//GET's information from podcasts saved by a specified user.
router.get('/podcast/saved/:email', async (req, res) => {
    try{
        const saved = await User.find({email: req.params.email}).select("savedPodcasts").exec();
        savedPodcasts = [];
        console.log(saved);
        for (i = 0; i < saved.length; i++) {
            savedPodcasts.push(await Podcast.find({_id: saved[i]}).exec());
        }
        console.log(savedPodcasts);
        res.status(200).json(savedPodcasts);
    }
    catch (err) {res.status(500).json({ message: err.message })}
});
//GET's information from podcasts subscribed to by a specified user.
router.get('/podcast/subscribed/:email', async (req, res) => {
    try{
        const subscribed = await User.find({email: req.params.email}).select("subscribedPodcasts").exec();
        subscribedPodcasts = [];
        for (i = 0; i < subscribed.length; i++) {
            subscribedPodcasts.push(await Podcast.find({email: subscribed[i]}).exec());
        }
        res.status(200).json(subscribedPodcasts);
    }
    catch (err) {res.status(500).json({ message: err.message })}
});
//GET's information from podcasts liked by a specified user.
router.get('/podcast/liked/:email', async (req, res) => {
    try{
        const liked = await User.find({email: req.params.email}).select("likedPodcasts").exec();
        likedPodcasts = [];
        for (i = 0; i < liked.length; i++) {
            likedPodcasts.push(await Podcast.find({_id: liked[i]}).exec());
        }
        res.status(200).json(likedPodcasts);
    }
    catch (err) {res.status(500).json({ message: err.message })}
});



//GET's information from Users to get saved podcasts

//POST's information for a new podcast
router.post('/podcast/', async (req,res) => {
    console.log("POST request executing...");
    const podcast = new Podcast({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        authors: req.body.authors,
        title: req.body.title,
        descriptionLocation: req.body.descriptionLocation,
        journal: req.body.journal,
        doi: req.body.doi,
        disciplines: req.body.disciplines,
        tags: req.body.tags,
        likes: req.body.likes,
        saves: req.body.saves
    })
    try {
        const newPodcast = await podcast.save();
        res.status(200).json(newPodcast);
    } catch (err){
        res.status(400).json({message: err.message})
    }
})

//DELETE's podcast from the database
router.delete('/podcast/:id', async (req, res) => {
    console.log("DELETE Request executing...")
	try {
		await Podcast.findByIdAndRemove(req.params.id).exec();
		res.status(200).send("Podcast Deleted");
	} catch (err){
		res.status(404).send(err.message);
	}
});

//PATCH updates a podcast's information in the database
router.patch("/podcast/:id", getPodcast, async (req, res) => {
    console.log("PATCH Request executing...")
    //Modifies information from getUser() based on what's sent in the PATCH request
    //TODO - Use loops to condense this code.
    if(req.body.firstname != null){
        res.podcast.firstname = req.body.firstname;
    }
    if(req.body.lastname != null){
        res.podcast.lastname = req.body.lastname;
    }
    if(req.body.email != null){
        res.podcast.email = req.body.email;
    }
    if(req.body.authors != null){
        res.podcast.authors = req.body.authors;
    }
    if(req.body.title != null){
        res.podcast.title = req.body.title;
    }
    if(req.body.journal != null){
        res.podcast.journal = req.body.journal;
    }
    if(req.body.doi != null){
        res.podcast.doi = req.body.doi;
    }
    if(req.body.tags != null){
        res.podcast.tags = req.body.tags;
    }
    if(req.body.disciplines != null){
        res.podcast.disciplines = req.body.disciplines;
    }
    if(req.body.likes != null){
        res.podcast.likes = req.body.likes;
    }
    if(req.body.saves != null){
        res.podcast.saves = req.body.saves;
        console.log('heyo');
        console.log(res.podcast.saves);
    }
    try {
        //Saves all the updated information to the database then sends a response back to the requestor with a status of 200
        const updatedPodcast = await res.podcast.save();
        res.status(200).json(updatedPodcast);
    } catch (err) {
        //Sends error if the code above fails for whatever reason
        res.status(500).send(err.message);
    }
})

async function getPodcast(req, res, next){
	let podcast
	try{
		podcast = await Podcast.findById(req.params.id).exec();
		if(podcast == null){
			return res.status(404).json({message: "Can't find Podcast"})
		} else {
            res.podcast = podcast;
	        next();
        }
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
	
}
/* API routes for PodcastDescriptions */

//GET's podcast description based on ID
router.get('/podcastDescription/:id', async (req, res) => {
    console.log("GET description request executing...")
	try{
		// const users = await User.find({id: req.params.id});
		const podcastDescription = await PodcastDescription.findById(req.params.id).exec();
		res.status(200).json(podcastDescription)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
});

//POST's information for a new podcast
router.post('/podcastDescription/', async (req,res) => {
    console.log("POST request executing...");
    const podcastDescription = new PodcastDescription({
        description: req.body.description,
        relatedPodcast: req.body.relatedPodcast
    })
    try {
        const newPodcastDescription = await podcastDescription.save();
        res.set("Location")
        res.status(200).json(newPodcastDescription);
    } catch (err){
        res.status(400).json({message: err.message})
    }
})

//DELETE's podcast description from the database
router.delete('/podcastDescription/:id', async (req, res) => {
    console.log("DELETE Request executing...")
	try {
		await PodcastDescription.findByIdAndRemove(req.params.id).exec();
		res.status(200).send("Podcast Description Deleted");
	} catch (err){
		res.status(404).send(err.message);
	}
});

//PATCH updates a podcast description in the database
router.patch("/podcastDescription/:id", getPodcastDescription, async (req, res) => {
    console.log("PATCH Request executing...")
    //Modifies information from getPodcastDescription() based on what's sent in the PATCH request
    if(req.body.description != null){
        res.podcastDescription.description = req.body.description;
    }
    if(req.body.relatedPodcast != null){
        res.podcastDescription.relatedPodcast = req.body.relatedPodcast;
    }
    try {
        //Saves all the updated information to the database then sends a response back to the requestor with a status of 200
        const updatedPodcastDescription = await res.podcastDescription.save();
        res.status(200).json(updatedPodcastDescription);
    } catch (err) {
        //Sends error if the code above fails for whatever reason
        res.status(500).send(err.message);
    }
})

//Asyncronous Function to grab podcast data by ID and save it to a "res.user" object value
async function getPodcastDescription(req, res, next){
	let podcastDescription
	try{
		podcastDescription = await PodcastDescription.findById(req.params.id).exec();
		if(podcastDescription == null){
			return res.status(404).json({message: "Can't find Podcast Description"})
		}
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
	res.podcastDescription = podcastDescription;
	next()
}

/* API routes for Disciplines */

//GET's discipline based on ID
router.get('/discipline/findAll', async (req, res) => {
    console.log("GET description request executing...")
	try{
		// const users = await User.find({id: req.params.id});
		const discipline = await Discipline.find({}).exec();
		res.status(200).json(discipline)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
});

//GET's discipline based on ID
router.get('/discipline/:id', async (req, res) => {
    console.log("GET description request executing...")
	try{
		// const users = await User.find({id: req.params.id});
		const discipline = await Discipline.findById(req.params.id).exec();
		res.status(200).json(discipline)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
});

//POST's information for a new discipline
router.post('/discipline/', async (req,res) => {
    console.log("POST request executing...");
    const discipline = new Discipline({
        name: req.body.name
    })
    try {
        const newDiscipline = await discipline.save();
        res.status(200).json(newDiscipline);
    } catch (err){
        res.status(400).json({message: err.message})
    }
})

//PATCH updates a discipline's information in the database
router.patch("/discipline/:id", getDiscipline, async (req, res) => {
    console.log("PATCH Request executing...")
    //Modifies information from getUser() based on what's sent in the PATCH request
    if(req.body.name != null){
        res.discipline.name = req.body.name;
    }
    try {
        //Saves all the updated information to the database then sends a response back to the requestor with a status of 200
        const updatedDiscipline = await res.discipline.save();
        res.status(200).json(updatedDiscipline);
    } catch (err) {
        //Sends error if the code above fails for whatever reason
        res.status(500).send(err.message);
    }
})

//DELETE's discipline from the database
router.delete('/discipline/:id', async (req, res) => {
    console.log("DELETE Request executing...")
	try {
		await Discipline.findByIdAndRemove(req.params.id).exec();
		res.status(200).send("Discipline Deleted");
	} catch (err){
		res.status(404).send(err.message);
	}
});

//Asyncronous Function to grab discipline's data by ID and save it to a "res.user" object value
async function getDiscipline(req, res, next){
	let discipline
	try{
		discipline = await Discipline.findById(req.params.id).exec();
		if(discipline == null){
			return res.status(404).json({message: "Can't find Discipline"})
		}
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
	res.discipline = discipline;
	next()
}
module.exports = router