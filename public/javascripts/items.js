$(function() {
	var items = new app.Items();
});

void function() {
	app.Items = Items;
	var ajax = JqueryAjax();
	function Items() {
		var self = this;
		self.area = $(".items .inner");
		self.setClickEvent();
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
			console.log( "focus e:", e );
		});
	}
	Items.prototype.setClickEvent = function() {
		var area = this.area;
		$(document).on("click", ".items a", function(e) {
			e.preventDefault();
			var self = this;
			var clickedItem = $(self).closest("li");
			var clickedUl = $(self).closest("ul");
			var parentItemsArea = $(this).closest(".items");
			
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
						area.append(createUl(items));
						// UL群の合計幅を.itemsにセット
						void function setItemsWidth() {
							var width = 0;
							$(".items ul").each(function(ul) {
								width += $(this).outerWidth();
							});
							console.log( "total width:", width );
							$(".items .inner").width(width+1);
						}();
						// .itemsエリア内のスクロールを右に寄せる
						void function() {
							$(".items").scrollLeft(999999);
						}();
					}
				});
			}();
			// コンテンツ読み込み
			void function loadContent() {
				var view = $(".view"); // tab1用view
				ajax.get({
					url: $(self).attr("href"),
					success: function(item) {
						view.find("h2").text(item.name);
						view.find(".content").html( objectToHtml(item) );
					}
				});
			}();
		});
	}
	Items.prototype.addRootItems = function(items) {
		this.area.append(createUl(items));
	}
	
	function objectToHtml(obj) {
		var html = "";
		Object.keys(obj).forEach(function(key) {
			html += key + ": " + obj[key] + "<br>";
		});
		return html;
	}
	
	function createUl(items) {
		var ul = $("<ul>");
		ul.attr("ul_id", $(".items ul").size() );
		items.forEach(function(item) {
			var span = $("<span>");
			span.addClass("glyphicon").addClass("glyphicon-folder-close");
			span.text(item.name);
			var a = $("<a href=/api/item/" + item.id + " item_id=" + item.id + ">");
			a.append(span);
			var li = $("<li item_id="+ item.id +">").addClass("item");
			if ( item.type == "folder" ) {
				li.addClass("folder");
			}
			li.append(a);
			ul.append(li);
		});
		return ul;
	}
}();
