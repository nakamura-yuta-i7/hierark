(function() {
	app.ItemDetail = ItemDetail;
	
	function ItemDetail() {
	}
	
	ItemDetail.loadedItem = null;
	var doLoadTimer = null;
	ItemDetail.loadContent = function(url) {
		if ( doLoadTimer ) {
			clearTimeout(doLoadTimer);
		}
		// 指定秒数待ってからリクエスト
		// アイテム移動を繰り返す場合、無駄なリクエストになるため
		doLoadTimer = setTimeout(function() {
			var detailArea = $(".detail");
			ajax.get({
				url: url,
				success: function(item) {
					ItemDetail.loadedItem = item;
					detailArea.show();
					detailArea.find("h2").text(item.name);
					detailArea.find(".description").html( app.util.autoLink(item.description) );
					detailArea.find(".text").html( app.util.autoLink(item.text) );
					
					var data = {};
					data.created_at = item.created_at;
					data.updated_at = item.updated_at;
					detailArea.find(".content").html( app.util.objectToHtml(data) );
				}
			});
		}, 100);
	}
	
	$(document).on("click", ".name, .description, .text", function() {
		$(this).attr("contenteditable","true").focus();
		// console.log( "!" );
	});
	$(document).on("blur", ".name, .description, .text", function() {
		$(this).attr("contenteditable","false");
		var detailArea = $(".detail");
		ajax.post({
			url: "/api/item/update",
			data: {
				id: ItemDetail.loadedItem.id,
				name:        detailArea.find("h2").text(),
				description: detailArea.find(".description").html(),
				text:        detailArea.find(".text").html()
			},
			success: function(item) {
				
			}
		});
	});
})();
