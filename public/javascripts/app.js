void function setGlobalVariables() {
	app = {};
	ajax = JqueryAjax();
}();

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
