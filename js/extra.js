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

app.initialize_carousel = function() {
	var $slider = $('.panes'); 
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
		var is_hovered = $(".recent-project").find(".carousel:hover").length;
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

	}
	function fade_in(i){
		slides().eq(i).fadeIn($transition_time);
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

	$('.prev').on('click', switch_to_prev_carousel);
	$('.next').on('click', switch_to_next_carousel);

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

}