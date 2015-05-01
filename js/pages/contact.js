var app = app || {};

app.goto_contact = function(){
	var $contact = $('#contact');

	app.remove_all_active_classes();
	$contact.addClass("active");
};


