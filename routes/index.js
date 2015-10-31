var express = require('express');
var router = express.Router();
var fs = require("fs");

router.get('/', function(req, res, next) {
	if ( req.url == "/" ) {
		return res.render('index', { title: 'Express' });
	}
	return next();
});

module.exports = router;
