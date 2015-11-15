app.util = {};
app.util.objectToHtml = function(obj) {
	var html = "";
	Object.keys(obj).forEach(function(key) {
		html += key + ": " + obj[key] + "<br>";
	});
	return html;
}
app.util.autoLink = function(str) {
	if ( ! str ) return str;
	return str.replace(/((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g, '<a target="_blank" href="$1">$1</a> ');
}
