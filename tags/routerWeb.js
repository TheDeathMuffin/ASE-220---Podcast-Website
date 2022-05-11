const express = require('express')
const router = express.Router()
const fs=require('fs')

//Tags Routes
router.get('/',(req, res)=>{
	res.status(200).send(fs.readFileSync('./tags/index.html','utf-8'))
})

router.get('/detail',(req, res)=>{
    res.status(200).send(fs.readFileSync('./tags/detail.html','utf-8'))
})

module.exports = router