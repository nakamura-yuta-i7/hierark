
void function setGlobalVariables(globals) {
	globals.app = {};
	globals.ajax = require("./jquery_ajax.js")
}(window);

require("./app/util.js")
require("./key_action.js")
require("./items.js")
require("./item_list.js")
require("./item.js")
require("./item_detail.js")

$(document).on("drop", function(e) {
	if ( e.preventDefault ) {
		e.preventDefault();
	}
	console.log( "drop" );
});

$(document).on("dragover", function(e) {
	if ( e.preventDefault ) {
		e.preventDefault();
	}
	console.log( "dragover");
});
