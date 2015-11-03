var config = require("../../config").db;
var Sequelize = require('sequelize');
var sequelize = new Sequelize(config.name, config.user, config.password, {
	host: config.host,
	dialect: 'mysql',

	pool: {
		max: 1000,
		min: 0,
		idle: 10000, // The maximum time, in milliseconds, that a connection can be idle before being released
	},
});

module.exports = sequelize;
module.Sequelize = Sequelize;
