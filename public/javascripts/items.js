$(function() {
	var items = new app.Items();
	
});

void function() {
	app.Items = Items;
	function Items() {
		var self = this;
		self.area = $(".items .inner");
		self.setContextMenuEvent();
		
		void function setInitialState() {
			ajax.get({
				url: "/api/items",
				data: {
					parent_id: null,
				},
				success: function(data) {
					self.addRootItems(data);
				}
			});
		}();
	}
	Items.prototype.setContextMenuEvent = function() {
		// フォルダを右クリックした時
		$(document).on("contextmenu", ".items ul li.folder", function(e) {
			e.preventDefault();
			getSelection().removeAllRanges(); // 選択範囲をすべて解除
			
			var clickedItem = $(this);
			app.Item.add(clickedItem);
			return false;
		});
		// ULを右クリックした時
		$(document).on("contextmenu", ".items ul", function(e) {
			e.preventDefault();
			getSelection().removeAllRanges(); // 選択範囲をすべて解除
			var clickedItem = $(this).prev().find("li[selected]");
			app.Item.add(clickedItem);
		});
	}
	Items.prototype.addRootItems = function(items) {
		this.area.append(new app.ItemList(items));
	}
}();
