void function() {
	app.ItemList = ItemList;
	function ItemList(items) {
		return this.buildElement(items);
	}
	ItemList.prototype.buildElement = function(items) {
		var ul = $("<ul>");
		ul.attr("ul_id", $(".items ul").size() );
		items.forEach(function(item) {
			var item = new app.Item(item);
			ul.append(item);
		});
		return ul;
	}
}();
