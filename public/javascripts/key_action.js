
Mousetrap.bind('tab', function(e) {
	e.preventDefault();
	$(".items ul a").first().focus().trigger("click");
});
