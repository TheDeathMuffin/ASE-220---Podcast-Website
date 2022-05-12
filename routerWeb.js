const express = require('express')
const router = express.Router()
const fs=require('fs')

//General Routes

//Compact route director.
const generalRoutes = ["about","rules","terms","login","register","discipline","tags"];			//Place routes in here. Route name must correspond to the filename at the location ./general/
router.use('/:pageName',(req, res)=> {
	if (generalRoutes.includes(req.params.pageName)) {
		res.status(200).send(fs.readFileSync('./general/' + req.params.pageName + '.html','utf-8'))
	}
	else {
		res.status(404)
	}
})

/*
router.get('/about',(req, res)=>{
	res.status(200).send(fs.readFileSync('./general/about.html','utf-8'))
})
router.get('/rules',(req, res)=>{
	res.status(200).send(fs.readFileSync('./general/rules.html','utf-8'))
})
router.get('/terms',(req, res)=>{
	res.status(200).send(fs.readFileSync('./general/terms.html','utf-8'))
})
router.get('/login',(req, res)=>{
	res.status(200).send(fs.readFileSync('./general/login.html','utf-8'))
})
router.get('/register',(req, res)=>{
	res.status(200).send(fs.readFileSync('./general/register.html','utf-8'))
})
router.get('/discipline',(req, res)=>{
	res.status(200).send(fs.readFileSync('./disciplines/index.html','utf-8'))
})
router.get('/tags',(req, res)=>{
	res.status(200).send(fs.readFileSync('./tags/index.html','utf-8'))
})
*/
module.exports = router