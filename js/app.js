var app = app || {};
var main = function() {
  app.initialize_click_listeners();

  app.initialize_carousel();

  $('.carousel').hover(function(){
  	$('.caption').fadeToggle(500);
  	$('.panes .active img').toggleClass('blurred-image');
  });

  app.initialize_rotating_words();

};

$(document).ready(main);