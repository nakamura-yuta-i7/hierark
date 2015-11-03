$(function() {
	var items = new app.Items();
	
});

void function() {
	app.Items = Items;
	function Items() {
		var self = this;
		self.area = $(".items .inner");
		self.setContextMenuEvent();
		self.setKeyEvent();
		
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
	Items.prototype.setKeyEvent = function() {
		var itemsArea = document.querySelector(".items");
		var itemsMousetrap = new Mousetrap(itemsArea);
		var pressKey = null;
		itemsMousetrap.bind('up', function(e) {
			pressKey = e.keyIdentifier;
			$(":focus").closest("li").prev().find("a").focus();
		});
		itemsMousetrap.bind('down', function(e) {
			pressKey = e.keyIdentifier;
			$(":focus").closest("li").next().find("a").focus();
		});
		itemsMousetrap.bind('right', function(e) {
			pressKey = e.keyIdentifier;
			$(":focus").closest("ul").next().find("li a").first().focus();
		});
		itemsMousetrap.bind('left', function(e) {
			pressKey = e.keyIdentifier;
			console.log( "left e.keyIdentifier:", e.keyIdentifier );
			$(":focus").closest("ul").prev().find("li[selected] a").focus();
		});
		$(document).on("focus",".items ul li a", function(e) {
			if ( pressKey ) {
				if ( pressKey != "Left" ) {
					$(this).trigger("click");
				}
				pressKey = null;
			}
		});
	}
	Items.prototype.setContextMenuEvent = function() {
		// フォルダを右クリックした時
		$(document).on("contextmenu", ".items ul li.folder", function(e) {
			e.preventDefault();
			getSelection().removeAllRanges(); // 選択範囲をすべて解除
			
			var clickedItem = $(this);
			app.Item.save(clickedItem);
			return false;
		});
		// ULを右クリックした時
		$(document).on("contextmenu", ".items ul", function(e) {
			e.preventDefault();
			getSelection().removeAllRanges(); // 選択範囲をすべて解除
			var clickedItem = $(this).prev().find("li[selected]");
			app.Item.save(clickedItem);
		});
	}
	Items.prototype.addRootItems = function(items) {
		this.area.append(new app.ItemList(items));
	}
}();
