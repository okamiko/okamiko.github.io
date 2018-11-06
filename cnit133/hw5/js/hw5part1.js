$(document).ready(function(){
  $("#myform").validate({
		messages: {
			name: "Please enter your name",
            game: "Please choose a game",
            team: "Please choose at least one team",
            occ: "Please choose a career goal",
	    },

  errorPlacement: function(error, element) {
  if ( element.is(":radio") || element.is(":checkbox")) {
    error.appendTo( element.parent());
  } else {
    error.insertAfter(element);
  }
  } 
 });
});