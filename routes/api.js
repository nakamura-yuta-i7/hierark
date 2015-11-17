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
	db.userItems.findOrCreate(params).then(function(items) {
		return res.json(items[0]);
	});
});
router.post("/item/update", function(req, res, next) {
	console.log( "item/save req.body:", req.body );
	
	var values = {};
	if ( req.body.name !== undefined ) {
		values.name = req.body.name;
	}
	if ( req.body.text !== undefined ) {
		values.text = req.body.text;
	}
	if ( req.body.parent_id !== undefined ) {
		values.parent_id = req.body.parent_id;
	}
	var options = {
		where: { id: req.body.id }
	};
	db.userItems.update(values, options).then(function(item) {
		db.userItems.findOne({where:{id:req.body.id}}).then(function(updatedItem) {
			return res.json(updatedItem);
		}).catch(res.json);
	}).catch(res.json);
});
router.post("/item/delete", function(req, res, next) {
	console.log( "item/delete req.body:", req.body );
	var params = {
		raw:true,
		where:{
			id: req.body.id,
		},
	};
	db.userItems.destroy(params).then(function(deleteRows) {
		return res.json({deleteRows:deleteRows});
	});
});
module.exports = router;
