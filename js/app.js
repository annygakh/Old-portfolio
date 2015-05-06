var app = app || {};
var data;
var main = function() {
  // app.initialize_click_listeners();
  app.initialize_carousel();
  app.initialize_hover_blur_caption();
  app.initialize_rotating_words();
  var products = [];

  get_projects();
  render(window.location.hash); // follow the link

  
  function get_projects() {
    $.getJSON("./projects.json", function(data){
      console.log("getJson");
      // get data about our products
      products = data;
      console.log(data.length);
      generate_projects_html(data);
    });
  }

  
  function generate_projects_html(data) {
      console.log("generate_projects_html");
      var list = $('.projects');
      var template_script = $('#summary-project-template').html();
      var template = _.template(template_script);
      console.log(data[0]);

    for (var i = 0; i < data.length; i++){
      var obj = data[i];
      // console.log(data["id"]);
      var attrs = {
        "name" : obj.name,
        "id" : obj.id,
        "concept" : obj.concept,
        "toolkit" : obj.toolkit,
        "link" : obj.link,
        "date" : obj.date,
      }
      list.append(template(attrs));

    }
    app.initialize_carousels();
  }

  $(window).on("hashchange", function(){
  	console.log("hashchange");
  	console.log(window.location.hash);
  	render(window.location.hash);

  	// on every hash change the render function is called with the new hash
  	// this s how the navigation of our app happens
  });

  function render(url){
  	console.log("render");
  	// decides what page to show depending on the current url hash value
  	var temp = url.split('/')[0];
  	console.log(temp);
  	// hide whatever page is currently shown
  	$('.content .page').removeClass('visible');
  	$('.content .page').addClass('hidden');

  	var map = {
  		// the homepage
  		"": function(){
  			// show main page
  			app.render_main_page();// todo
  		},
  		"#about" : function(){
  			app.render_about_page();
  		},  		
  		"#skills" : function(){
  			app.render_skills_page();
  		},
  		"#work" : function(){
  			app.render_work_page();
  		},
  		"#projects" : function(){
  			url = url.split("#projects/");

  			if (url.length == 1){
  				app.render_projects_page(data);
  			} else {
	  			url = url[1].trim();
	  			app.render_detailed_project_page(url);
  			}
  		},
  		"#photography" : function(){

  			app.render_photography_page();
  		},
  		"#contact" : function(){
  			app.render_contact_page();
  		},
  		"#skills" : function(){
  			app.render_skills_page();
  		}
  	}
  	if (map[temp]){
  		map[temp]();
  	} else {
  		app.render_error_page();
  	}
  }

  


  




};

$(document).ready(main);