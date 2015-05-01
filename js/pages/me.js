var app = app || {};

app.goto_main = function(){
	var $me = $('#me');
	app.remove_all_active_classes();
	$me.addClass("active");
};


