var express = require('express');
var router = express.Router();
var db = require("../libs/db");

router.get("/items", function(req, res, next) {
	var reqUrl = req.url;
	var params = {raw:true};
	params.where = { parent_id: req.query.parent_id || null }
	db.userItems.findAll(params).then(function(items) {
		return res.json(items);
	});
});
router.get("/item/:id", function(req, res, next) {
	var params = {
		raw:true,
		where:{
			id: req.params.id,
		},
	};
	db.userItems.findOne(params).then(function(item) {
		return res.json(item);
	});
});
module.exports = router;
