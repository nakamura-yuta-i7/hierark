$(function() {
	app.Item.setClickEvent();
});
void function() {
	app.Item = Item;
	function Item(data) {
		var elem = this.buildElement(data);
		return elem;
	}
	Item.prototype.buildElement = function(data) {
		var name = data.name;
		var id = data.id;
		var type = data.type;
		var span = $("<span>");
		span.addClass("glyphicon").addClass("glyphicon-folder-close");
		span.text(name);
		var a = $("<a href=/api/item/" + id + " item_id=" + id + ">");
		a.append(span);
		var li = $("<li item_id="+ id +">").addClass("item");
		if ( type == "folder" ) {
			li.addClass("folder");
		}
		li.append(a);
		return li;
	}
	Item.add = function(parentItem) {
		var name = "";
		var parent_id = parentItem.attr("item_id");
		if ( name = prompt("新規作成します", "新しいアイテム") ) {
			ajax.post({
				url: "/api/item/add",
				data: {
					name: name,
					parent_id: parent_id
				},
				success: function(new_item) {
					parentItem.find("a").trigger("click");
					console.log( "ajax item/save data:", new_item );
				}
			});
		}
	};
	
	app.Item.setClickEvent = function() {
		
		$(document).on("click", ".item a", function(e) {
			e.preventDefault();
			var self = this;
			var clickedItem = $(self).closest("li");
			var clickedUl = $(self).closest("ul");
			var parentItemsArea = $(this).closest(".items");
			
			// コンテンツ読み込み
			var url = $(self).attr("href");
			app.ItemDetail.loadContent(url);
			
			// selectedアイテムにする
			// 他のアイテムはselectedを外す
			clickedUl.find(".item").removeAttr("selected");
			clickedItem.attr("selected", true);
			
			// アイテム背景色を調整
			void function adjustBgColor() {
				$(this).closest("ul").find("a").css("background-color", "transparent");
				$(this).css("background-color","#cccccc");
			}.bind(this)();
			
			// 子アイテムを読み込み
			void function loadChildItems() {
				if ( ! clickedItem.hasClass("folder") ) {
					// クリックしたアイテムがフォルダじゃないなら何もしない
					return false;
				}
				ajax.get({
					url: "/api/items",
					data: {
						parent_id: $(self).attr("item_id")
					},
					success: function(items) {
						
						// 自身のフォルダ配下のULを一度削除
						void function destroyChildItem() {
							var selfUlId = clickedUl.attr("ul_id");
							var foundFlag = false;
							parentItemsArea.find("ul").each(function(i) {
								var eachUl = $(this);
								var eachUlId = eachUl.attr("ul_id");
								if ( foundFlag ) {
									eachUl.remove();
								}
								if ( eachUlId == selfUlId ) {
									foundFlag = true;
								}
							});
						}();
						// 読み込んだアイテムを追加
						$(".items .inner").append(new app.ItemList(items));
						// UL群の合計幅を.itemsにセット
						void function setItemsWidth() {
							var width = 0;
							$(".items ul").each(function(ul) {
								width += $(this).outerWidth();
							});
							console.log( "total width:", width );
							$(".items .inner").width(width+20);
						}();
						// .itemsエリア内のスクロールを右に寄せる
						void function() {
							$(".items").scrollLeft(999999);
						}();
					}
				});
			}();
		});
	}
}();
