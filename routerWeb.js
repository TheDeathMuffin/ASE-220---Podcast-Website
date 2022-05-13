const express = require('express')
const router = express.Router()
const fs=require('fs')

//General Routes
router.use('/',(req,res)=> {
	console.log(req.params.page)
	res.status(200).send(fs.readFileSync('./general/index.html','utf-8'))
})

//Compact route director.
const generalRoutes = ["about","rules","terms","login","register","discipline","tags","report"];		//Place routes in here. Route name must correspond to the filename at the location ./general/
router.use('/:page',(req, res)=> {
	if (generalRoutes.includes(req.params.page) && fs.existsSync('./general/' + req.params.page + '.html')) {	 //If route and corresponding HTML file exist, send appropriate page.
		res.status(200).send(fs.readFileSync('./general/' + req.params.page + '.html','utf-8'))
	}
	else {
		res.status(404).send(fs.readFileSync('./general/404.html','utf-8'))		//If route or HTML file does not exist, send 404 page.
	}
})

module.exports = router