var app = app || {};

app.initialize_click_listeners = function(){
	$('#me').on('click', app.goto_main);
	$('#skills').on('click', app.goto_skills);
	$('#experience').on('click', app.goto_experience);
	$('#projects').on('click', app.goto_projects);
	$('#photography').on('click', app.goto_photography);
	$('#contact').on('click', app.goto_contact);
};



app.remove_all_active_classes = function(){
	$items = $('#menu-list').children();
	for (var i = 0; i < $items.length; i++){
		var $item = $items[i];
		$items.removeClass("active");
	}
}