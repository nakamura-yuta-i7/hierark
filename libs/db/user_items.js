var sequelize = require("./sequelize");
var Sequelize = sequelize.Sequelize;

var UserItems = sequelize.define('user_items', {
	id: {
		primaryKey: true,
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	description: {
		type: Sequelize.TEXT,
		allowNull: true,
		defaultValue: null,
	},
	text: {
		type: Sequelize.TEXT,
		allowNull: true,
		defaultValue: null,
	},
	type: {
		type: Sequelize.STRING,
		allowNull: false,
		defaultValue: "folder",
	},
	parent_id: {
		type: Sequelize.BIGINT,
		defaultValue: null,
	},
}, {
	freezeTableName: true, // Model tableName will be the same as the model name
	timestamps: true,
	paranoid: true,
	underscored: true,
});

module.exports = UserItems;



// UserItems.destroy({where:{}}).then(function(result) {
// 	console.log( result );
// });


// UserItems.sync({force:true}).then(function () {
// 	UserItems.findOrCreate({
// 		where: {
// 			id: 1,
// 			name: "経営企画本部",
// 		},
// 	});
// 	UserItems.findOrCreate({
// 		where: {
// 			id: 2,
// 			name: "IT戦略部",
// 			parent_id: 1,
// 		},
// 	});
// 	UserItems.findOrCreate({
// 		where: {
// 			id: 3,
// 			name: "総務部",
// 			parent_id: 1,
// 		},
// 	});
// 	UserItems.findOrCreate({
// 		where: {
// 			id: 4,
// 			name: "IT基盤部",
// 			parent_id: 1,
// 		},
// 	});
// 	UserItems.findOrCreate({
// 		where: {
// 			id: 5,
// 			name: "GOA",
// 			parent_id: 2,
// 		},
// 	});
// 	UserItems.findOrCreate({
// 		where: {
// 			id: 6,
// 			name: "Empowerment",
// 			parent_id: 5,
// 		},
// 	});
// 	UserItems.findOrCreate({
// 		where: {
// 			id: 7,
// 			name: "マニュアル",
// 			parent_id: 6,
// 		},
// 	});
// 	UserItems.findOrCreate({
// 		where: {
// 			id: 8,
// 			name: "開発環境",
// 			parent_id: 7,
// 		},
// 	});
// 	UserItems.findOrCreate({
// 		where: {
// 			id: 9,
// 			name: "構築手順",
// 			parent_id: 8,
// 		},
// 	});
// 	UserItems.findOrCreate({
// 		where: {
// 			id: 10,
// 			name: "サービスデスク",
// 			parent_id: 3,
// 		},
// 	});
// 	UserItems.findOrCreate({
// 		where: {
// 			id: 11,
// 			name: "ヒカリエカード管理業務",
// 			parent_id: 10,
// 		},
// 	});
// 	UserItems.findOrCreate({
// 		where: {
// 			id: 12,
// 			name: "exSG",
// 			parent_id: 11,
// 		},
// 	});
// 	UserItems.findOrCreate({
// 		where: {
// 			id: 13,
// 			name: "セキュリティグループマスタ更新",
// 			parent_id: 12,
// 		},
// 	});
// 	UserItems.findOrCreate({
// 		where: {
// 			id: 14,
// 			name: "企画部",
// 			parent_id: 1,
// 		},
// 	});
// 	UserItems.findOrCreate({
// 		where: {
// 			id: 15,
// 			name: "営業部",
// 			parent_id: 1,
// 		},
// 	});
// 	UserItems.findOrCreate({
// 		where: {
// 			id: 16,
// 			name: "営業企画部",
// 			parent_id: 1,
// 		},
// 	});
// 	UserItems.findOrCreate({
// 		where: {
// 			id: 17,
// 			name: "捺印申請業務",
// 			parent_id: 16,
// 		},
// 	});
// 	UserItems.findOrCreate({
// 		where: {
// 			id: 18,
// 			name: "デヂエURL",
// 			parent_id: 17,
// 			type: "link",
// 		},
// 	});
// });
