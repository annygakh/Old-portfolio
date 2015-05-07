var app = app || {};
var projects;
var main = function() {
  
  app.initialize_rotating_words();
  var projects = [];
  get_projects();
 // follow the link

  
  function get_projects() {
    $.getJSON("./projects.json", function(data){
      console.log("getJson");
      // get data about our projects
      projects = data;
      // console.log(data.length);
      generate_projects_html(data);
      generate_recent_project_html(data);
      render(window.location.hash); 
    });
  }

  
  function generate_projects_html(data) {
      console.log("got json completed");
      var list = $('.projects');
      var template_script = $('#summary-project-template').html();
      var template = _.template(template_script);

    for (var i = 0; i < data.length; i++){
      var obj = data[i];
      var obj_short_summary = obj["short-summary"];
      var attrs = {
        "name" : obj.name,
        "id" : obj.id,
        "concept" : obj_short_summary["concept"],
        "toolkit" : obj_short_summary["toolkit"],
        "link" : obj_short_summary["link"],
        "date" : obj_short_summary["date"],
        "photos" : obj.pictures
      }


      list.append(template(attrs));
      initialize_carousel(obj.id);
      initialize_hover_blur_caption(obj.id);

    }
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
  	$('#menu-list li').removeClass('active');
    $('.content .page').addClass('hidden');

  	var map = {
  		// the homepage
      "": function(){
        //just in case 
        render_page(0);
      },
  		"#": function(){
  			// show main page
  			// app.render_main_page();// todo
        render_page(0);
      },
      "#about" : function(){
        // app.render_about_page();
        render_page(1);
      },      
      // "#skills" : function(){
      //   // app.render_skills_page();
      //   render_page(2);
      // },
      "#work" : function(){
        // app.render_work_page();
        render_page(3);
      },
      "#projects" : function(){
        url = url.split("#projects/");

        if (url[1] == ""){
          // app.render_projects_page(data);
          render_page(4);
        } else {
          url = url[1].trim();
          render_page(8, url, projects);
          // app.render_detailed_project_page(url);
        }
      },
      "#photography" : function(){

        // app.render_photography_page();
        render_page(5);
      },
      "#contact" : function(){
        // app.render_contact_page();
        render_page(6);
      }
      
  	}
  	if (map[temp]){
  		map[temp]();
  	} else {
  		render_page(7);
  	}
  }

  


  
 


};

$(document).ready(main);