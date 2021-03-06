const express = require('express')
const router = express.Router()
const fs=require('fs')

//Disciplines Routes
router.get('/',(req, res)=>{
	res.status(200).send(fs.readFileSync('./disciplines/index.html','utf-8'))
})

router.get('/detail',(req, res)=>{
    res.status(200).send(fs.readFileSync('./disciplines/detail.html','utf-8'))
})

module.exports = router