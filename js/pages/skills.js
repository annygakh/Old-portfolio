var app = app || {};

app.goto_skills = function(){
	var $skills = $('#skills');

	app.remove_all_active_classes();
	$skills.addClass("active");

};


