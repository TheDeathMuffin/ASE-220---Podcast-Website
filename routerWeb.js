const express = require('express')
const router = express.Router()
const fs=require('fs')

//General Routes
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

module.exports = router