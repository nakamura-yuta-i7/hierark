require("./item_detail.scss");

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
					detailArea.find(".text").html( app.util.autoLink(item.text) );
					
					var data = {};
					data.created_at = item.created_at;
					data.updated_at = item.updated_at;
					detailArea.find(".content").html( app.util.objectToHtml(data) );
				}
			});
		}, 100);
	}
	
	// 高さ調整
	app.ItemDetail.adjustHeight = function() {
		console.log( "header:", $("header").outerHeight() );
		console.log( ".browse:", $(".browse").outerHeight() );
		console.log( ".tabs:", $(".tabs").outerHeight() );
		console.log( "footer:", $("footer").outerHeight() );
		console.log( "window:", $(window).height() );
		var total = $("header").outerHeight()
			+ $(".tabs").outerHeight()
			+ $(".browse").outerHeight()
			+ $("footer").outerHeight()
		console.log( {total} );
		var h = $(window).height() - total;
		console.log( {setHeight: h} );
		$(".detail").outerHeight( h );
	}
	$(function() {
		// 初期表示で調整
		app.ItemDetail.adjustHeight();
		// ツリー高さ調整時にも調整しないと
		$(".items").on("resize", function() {
			app.ItemDetail.adjustHeight();
		});
		// ウィンドウリサイズ時にも
		$(window).on("resize", function() {
			app.ItemDetail.adjustHeight();
		});
	});
	
	// 編集モード
	$(document).on("click", ".content .name, .text", function() {
		$(this).attr("contenteditable","true").focus();
		// console.log( "!" );
	});
	// 編集確定
	$(document).on("blur", ".content .name, .text", function() {
		$(this).attr("contenteditable","false");
		var detailArea = $(".detail");
		ajax.post({
			url: "/api/item/update",
			data: {
				id: ItemDetail.loadedItem.id,
				name: detailArea.find("h2.name").text(),
				text: detailArea.find(".text").html()
			},
			success: function(item) {
				console.log( "/api/item/update item:", item );
			}
		});
	});
})();
