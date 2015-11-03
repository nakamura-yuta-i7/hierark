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
router.post("/item/add", function(req, res, next) {
	console.log( "item/add req.body:", req.body );
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
router.post("/item/update", function(req, res, next) {
	console.log( "item/save req.body:", req.body );
	
	var values = {};
	if ( req.body.name ) {
		values.name = req.body.name;
	}
	if ( req.body.description ) {
		values.description = req.body.description;
	}
	if ( req.body.text ) {
		values.text = req.body.text;
	}
	var options = {
		where: { id: req.body.id }
	};
	db.userItems.update(values, options).then(function(item) {
		return res.json(item);
	}).catch(function(err) {
		return res.json(err);
	});
});
module.exports = router;
