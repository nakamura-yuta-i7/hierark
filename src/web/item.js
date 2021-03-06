$(function() {
	app.Item.setClickEvent();
	app.Item.setRightClickEvent();
	app.Item.setDnDEvent();
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
		var name_span = $("<span class=name>");
		name_span.text(name);
		span.append(name_span);
		var a = $("<a href=/api/item/" + id + " item_id=" + id + " draggable=false>");
		a.append(span);
		var li = $("<li item_id="+ id +" draggable=true>").addClass("item");
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
	
	Item.refresh = function(item) {
		$("[item_id="+ item.id +"]").find(".name").html( item.name );
		console.log( "Item.refresh:", item );
	}
	
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
				$(this).closest("ul").find("a").css("background-color", "");
				$(this).css("background-color","#cccccc");
			}.bind(this)();
			
			// 子アイテムを読み込み
			var item_id = $(self).attr("item_id");
			app.Item.loadChildItems(item_id);
		});
	}
	
	app.Item.loadChildItems = function(item_id) {
		
		void function loadChildItems(item_id) {
			ajax.get({
				url: "/api/items",
				data: {
					parent_id: item_id
				},
				success: function(items) {
					
					// 自身のフォルダ配下のULを一度削除
					void function destroyChildItem() {
						var selfUlId = $("a[item_id="+ item_id +"]").closest("ul").attr("ul_id");
						var foundFlag = false;
						$(".items ul").each(function(i) {
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
						$(".items .inner").width(width+10);
					}();
					
					// .itemsエリア内のスクロールを右に寄せる
					$(".items").scrollLeft( 9999 )
					
				}
			});
		}(item_id);
	}

	app.Item.setDnDEvent = function() {
		var drag_item_id = null;
		var drop_item_id = null;
		
		$(document).on("dragstart", ".items .item", function(e) {
			drag_item_id = $(this).attr("item_id");
			console.log( "dragstart" );
		});
		$(document).on("dragenter", ".items .item", function(e) {
			drop_item_id = $(this).attr("item_id");
			$(this).addClass("over");
			console.log( "dragenter" );
		});
		$(document).on("dragleave", ".items .item", function(e) {
			$(this).removeClass("over");
			console.log( "dragleave" );
		});
		$(document).on("dragend", ".items .item", function(e) {
			
			if ( ! drop_item_id ) {
				console.log( "dropしたitem_idがnull、return false" );
				return false;
			}
			if ( drag_item_id == drop_item_id ) {
				console.log( "同じIDの為、return false" );
				return false;
			}
			(function() {
				var parent_id = drop_item_id;
				var id = drag_item_id;
				ajax.post({
					url: "/api/item/update",
					data: {
						id: id,
						parent_id: parent_id
					},
					success: function(new_item) {
						$(".item[item_id="+ parent_id +"] a").trigger("click").focus();
						console.log( "ajax item/updated_item:", new_item );
						$(this).remove();
					}.bind(this)
				});
			})();
			dragoverStyleReset();
			console.log( "dragend" );
		});
		function dragoverStyleReset() {
			console.log("dragoverStyleReset.");
			$(".items .item").removeClass("over");
		}
	}
	
	app.Item.setRightClickEvent = function() {
		
	}
	app.Item.delete = function(id) {
		ajax.post({
			url: "/api/item/delete",
			data: {
				id: id,
			},
			success: function(deletedCount) {
				// 削除する前にフォーカスを他のアイテムに移動させる
				var target = $(".item[item_id="+id+"]");
				target.closest("ul").find("a")[0].focus();
				// アイテム削除
				target.remove();
				console.log( "del item success.  count:", deletedCount );
			}
		});
	}
	
}();
