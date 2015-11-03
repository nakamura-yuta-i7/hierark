app.util = {};
app.util.objectToHtml = function(obj) {
	var html = "";
	Object.keys(obj).forEach(function(key) {
		html += key + ": " + obj[key] + "<br>";
	});
	return html;
}
