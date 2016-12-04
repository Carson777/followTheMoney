const request = require('request')
const Router = require('express').Router;
const proxyRouter = Router()


proxyRouter.get('/', function (req, res) {
	var fullURL = `${req.query.baseURL}?apikey=${req.query.apikey}&id=${req.query.id}&method=${req.query.method}&output=${req.query.output}`
	request(fullURL,function(error,response,body) {
		console.log('error',error)
		if (error) {
			res.status(500).json(error)
		}
		else {
			console.log(body.slice(0,10))
			console.log(body.slice(-5,-1))
			res.set('Content-Type', 'application/json');
			res.json(body.trim())
		}
	})
});


module.exports = proxyRouter