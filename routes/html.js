var express = require('express');
var router = express.Router();
var fs = require("fs");

router.get("/*", function(req, res, next) {
	var reqUrl = req.url;
	var fullpath = __dirname + "/../views" + reqUrl;
	if ( htmlExists(fullpath) ) {
		var contents = getHtml(fullpath);
		return res.send(contents);
	}
	return next();
});

function htmlExists(fullpath) {
	try {
		fs.statSync(fullpath);
		return true;
	} catch (err) {
		return false;
	}
}

function getHtml(fullpath) {
	try {
		return fs.readFileSync(fullpath, "utf8");
	} catch (err) {
		throw err;
	}
}

module.exports = router;
