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
