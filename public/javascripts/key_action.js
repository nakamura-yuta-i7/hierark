(function() {
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
			
			var item = $(":focus").closest("ul").prev().find("li[selected]");
			if ( item.length ) {
				// ルートアイテムじゃなければ
				item.find("a").focus();
				var url = item.find("a").attr("href");
				app.ItemDetail.loadContent(url);
			}
		});
		$(document).on("focus",".items ul li a", function(e) {
			if ( pressKey ) {
				if ( pressKey != "Left" ) {
					$(this).trigger("click");
				}
				pressKey = null;
			}
		});
})();
	
Mousetrap.bind('tab', function(e) {
	e.preventDefault();
	
	if ( app.ItemDetail.loadedItem ) {
		// 詳細表示している場合
		var item_id = app.ItemDetail.loadedItem.id;
		$(".items ul .item[item_id="+ item_id +"] a").focus();
	} else {
		// アイテム初期表示状態でtab押した場合
		$(".items ul a").first().focus().trigger("click");
	}
});
