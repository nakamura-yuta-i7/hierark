var express = require('express');
var router = express.Router();
var db = require("../libs/db");
var multer = require('multer');

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
router.post("/item/save", function(req, res, next) {
	console.log( "item/save req.body:", req.body );
	var params = {
		raw:true,
		where:{
			id: req.body.id,
			name: req.body.name,
			parent_id: req.body.parent_id,
		},
	};
	db.userItems.findOrCreate(params).then(function(item) {
		return res.json(item);
	});
});
module.exports = router;
