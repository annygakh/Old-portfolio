var app = app || {};
var products = products || {};
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


app.initialize_rotating_words = function(){
	var $span_wrapper = $('.cd-words-wrapper');
  	var span = 'span';
  	var transition_time = 1000;
  	var time_between_words = 2000;

  	function spans(){
  		return $span_wrapper.find(span);
  	}
  	$spans = spans();
  	$first_span = $spans.first();

  	$spans.fadeOut();
  	$first_span.addClass('active');
  	$first_span.fadeIn(transition_time + time_between_words);

	interval = setInterval(next_span, 4000);
  	function next_span(){
  		var curr_index = get_current_index();
  		fade_out(curr_index);

  		if (spans().length == curr_index + 1) 
  			curr_index = -1; // loop to start

  		var next_index = curr_index + 1;

  		fade_in(next_index);
  	}
  	function get_current_index(){
  		var curr_index = $span_wrapper.find(span + '.active').index();
		return curr_index;
  	}
  	function fade_out(i){
		spans().eq(i).removeClass('active');
		spans().eq(i).fadeOut(transition_time);

	}
	function fade_in(i){
		spans().eq(i).fadeIn(transition_time);
	 	spans().eq(i).addClass('active');
	}
}

function render_page(index, url, projects) {
	var url = url || {};
	var projects = projects || {};
	var page, li = undefined;
	switch(index){
		case 0:
			page = $('.main');
			li = $('#main');
			break;
		case 1:
			page = $('.about');
			li = $('#about');
			break;
		// case 2:
		// 	page = $('.skills');
		// 	li = $('#skills');
		// 	break;
		case 3:
			page = $('.work');
			li = $('#work');
			break;
		case 4:
			page = $('.projects');
			li = $('#projects');
			break;
		case 5:
			page = $('.photography');
			li = $('#photography');
			break;
		case 6:
			page = $('.contact');
			li = $('#contact');
			break;
		case 7:
			page = $('.error');
			break;
		case 8:
			page = $('.detailed-project');
			create_detailed_project(url, projects);
			break;
		default:
			page = $('.error');
			break;


	}
	if (li != undefined){
		li.addClass('active');
	}
	// $('.content .page').removeClass('animated zoomOut infinite');
	page.animate({
      opacity: 1
      
    },function(){
		page.addClass('visible');
    	
		page.removeClass('hidden');
    });

}
function create_detailed_project(name, projects){
	console.log(name);
	for (var i = 0; i < projects.length; i++){
		var obj = projects[i];
		var obj_name = obj.name.toLowerCase();
		
		if (obj_name == name.toLowerCase()){
			console.log("match");
			var short = obj["short-summary"];
			var details = obj["details"];
			var unique_id = "d" + obj.id;
			var attrs = {
				id: unique_id,
				name: obj_name,
				concept: short.concept,
				toolkit: short.toolkit,
				link: short["source-code"],
				date: short.date,
				background: details.background,
				what : details["what-i-did"],
				how : details["how-it-works"],
				photos : obj.pictures
			}

			var template = $('#detailed-project-template').html();
			var templ = _.template(template);

			$('.detailed-project').html(templ(attrs));
			initialize_carousel(unique_id);
		}

	}

}
function generate_recent_project_html(projects){
	var page = $('.recent-project');
	var template_script = $('#summary-project-template').html();
	var template = _.template(template_script);

	var recent_obj = projects[0];
	var short_summary = recent_obj["short-summary"];
	var unique_id = "i" + recent_obj.id;
	var attrs = {
	  "name" : recent_obj.name,
	  "id" : unique_id,
	  "concept" : short_summary["concept"],
	  "toolkit" : short_summary["toolkit"],
	  "link" : short_summary["link"],
	  "date" : short_summary["date"],
	  "photos" : recent_obj.pictures
	}
	page.append(template(attrs));
	initialize_carousel(unique_id);
	initialize_hover_blur_caption(unique_id);
}




function initialize_carousel(id) {
	var $slider = $('.panes.' + id); 
	var $slide = 'li';
	var $transition_time = 1000; 
	var $time_between_slides = 4000; // 4 seconds

	function slides(){
	  return $slider.find($slide);
	}

	$slides = slides();
	$slides_first = $slides.first();

	$slides.fadeOut();
	$slides_first.addClass('active');
	$slides_first.fadeIn($transition_time);

	$interval = setInterval(switch_to_next_carousel, $transition_time +  $time_between_slides 
	);
	function is_hovered(){
		var is_hovered = $(".summary." + id).find(".carousel:hover").length;
		return is_hovered;
		
	}
	function switch_to_next_carousel() {
		if (!is_hovered()){

			var curr_index = get_current_index();

		 	fade_out(curr_index);

		 	if (slides().length == curr_index + 1) 
		 		curr_index = -1; // loop to start

		 	var next_index = curr_index + 1;

		 	fade_in(next_index);	
		}
	}
	function get_current_index(){
		var curr_index = $slider.find($slide + '.active').index();
		return curr_index;
	}
	function fade_out(i){
		slides().eq(i).removeClass('active');
		slides().eq(i).fadeOut($transition_time);
		slides().eq(i).addClass('hidden');

	}
	function fade_in(i){
		slides().eq(i).fadeIn($transition_time);
		slides().eq(i).removeClass('hidden');
	 	slides().eq(i).addClass('active');
	}
	function switch_to_prev_carousel(){
		if (!is_hovered()){

			var curr_index = $slider.find($slide + '.active').index();
			fade_out(curr_index);
			if (curr_index == 0)
			curr_index = slides().length - 1;
			var next_index = curr_index - 1;
			fade_in(next_index);
		}
	}

	$('.prev.' + id).on('click', switch_to_prev_carousel);
	$('.next.' + id).on('click', switch_to_next_carousel);
}
function initialize_hover_blur_caption(id){
	$('.carousel.'+id).hover(function(){
		$('.caption.' + id).fadeToggle(500);
		$('.panes.' + id + ' .active img').toggleClass('blurred-image');

	});
}