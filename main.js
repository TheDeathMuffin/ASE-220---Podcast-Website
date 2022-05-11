const open = require('open')
const fs=require('fs')
const express=require('express')
const bodyParser = require('body-parser')
const app=express()
const port=process.env.PORT || 8080

/* Middleware */
app.use(express.static('assets'))
app.use(bodyParser.json())

const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://Administrator:ScholarsAreOverrated@podscholar.2edjo.mongodb.net/PodScholar", {useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => console.log("Connected to Database"))
.catch((err) => console.log(err));
process.env.mongoose=mongoose

const main=require('./routerWeb.js');
const mainAPI=require('./routerAPI.js');
const disciplines=require('./disciplines/routerWeb.js');
const user=require('./user/routerWeb.js');
const tags=require('./tags/routerWeb.js');

app.use('/general',main)
app.use('/user',user)
app.use('/tags',tags)
app.use('/disciplines',disciplines)
app.use('/api',mainAPI)


/* WEB routes */
app.get('/',(req, res)=>{
	res.status(200).send(fs.readFileSync('./general/index.html','utf-8'))
})

app.listen(port,async() => {
  console.log(`Example app listening on port ${port}`)
  await open(`http://localhost:${port}`)
})