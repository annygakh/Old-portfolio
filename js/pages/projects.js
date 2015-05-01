var app = app || {};

app.goto_projects = function(){
	var $projects = $('#projects');

	app.remove_all_active_classes();
	$projects.addClass("active");
};


