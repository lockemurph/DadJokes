/**
 * Handle the redirect to the new joke if successfully inserted or display 
 * an error message
 */
var afterSubmittal = function(data){
	jokeData = jQuery.parseJSON(data);
	if(jokeData.error)
	{
		$("#errorMessage").append("<p>" + jokeData.error + "</p>");
	}
	else
	{
		window.location.href ="../jokes?jokeid=" + jokeData._id;
	}
}

$(document).ready(function () {
	//setup the rules for validating the form
	$('#formNewJoke').validate({
	    rules: {
	    	setup: { required: true, maxlength:500 },
	        punchline: { required: true, maxlength:500 }
	    },
	    messages: {
	    	setup: {required: "All jokes must have a setup", maxlength:"Your setup is too long."},
	        punchline: {required: "All jokes must have a punchline", maxlength:"Your punchline is too long" }
	    }
	})
	//Override the submit event
	$( "#formNewJoke" ).submit(function( event ) {
		event.preventDefault();
		if($( "#formNewJoke" ).valid())
		{
			var $form = $( this );
			setup = $("#inputsetup").val();
			punchline = $("#inputPunchline").val();
			url = $form.attr( "action" );
			var posting = $.post( url, { setup: setup, punchline: punchline }, afterSubmittal );
		}
	});
});