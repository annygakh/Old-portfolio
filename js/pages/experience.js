var app = app || {};

app.goto_experience = function(){
	var $experience = $('#experience');

	app.remove_all_active_classes();
	$experience.addClass("active");
};


