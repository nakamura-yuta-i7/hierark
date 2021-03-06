require("./items.scss");

$(function() {
	var items = new app.Items();
	app.Items.setResizableAction();
	app.Items.setKeyPressAction();
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
					app.ItemDetail.adjustHeight();
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
	Items.setResizableAction = function() {
		$(function() {
			$(".browse").resizable({
				handles: "s",
				stop: function( event, ui ) {
					// リサイズ完了した時にクッキーに高さを保存
					var h = ui.size.height;
					$.cookie('.items-resized-height', h);
				},
				resize: function( event, ui ) {
					var h = ui.size.height;
					$(".browse").height(h);
				}
			});
			// クッキーに記憶した高さがあれば調整
			var savedHeight = $.cookie('.items-resized-height');
			if ( savedHeight ) {
				$(".browse").height(savedHeight);
			}
		});
	}
	Items.setKeyPressAction = function() {
		
	}
}();
