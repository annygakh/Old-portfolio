var app = app || {};

app.goto_photography = function(){
	var $photography = $('#photography');

	app.remove_all_active_classes();
	$photography.addClass("active");
};


