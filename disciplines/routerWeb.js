const express = require('express')
const router = express.Router()
const fs=require('fs')

//General Routes
router.get('/',(req, res)=>{
	res.status(200).send(fs.readFileSync('./disciplines/index.html','utf-8'))
})

module.exports = router