(function() {
	app.ItemDetail = ItemDetail;
	
	function ItemDetail() {
	}
	
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
					detailArea.find("h2").text(item.name);
					detailArea.find(".description").text(item.description);
					detailArea.find(".text").text(item.text);
					detailArea.find(".content").html( app.util.objectToHtml(item) );
				}
			});
		}, 300);
	}
	
	$(document).on("click", ".name, .description, .text", function() {
		$(this).attr("contenteditable",true);
	});
	$(document).on(".blur", ".name, .description, .text", function() {
		$(this).removeAttr("contenteditable");
	});
})();
