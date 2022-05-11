const express = require('express')
const router = express.Router()
const fs=require('fs')

//User Routes
router.get('/',(req, res)=>{
	res.status(200).send(fs.readFileSync('./user/dashboard.html','utf-8'))
})

module.exports = router