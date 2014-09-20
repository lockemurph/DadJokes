var afterUserSubmittal = function(data){
	jokeData = jQuery.parseJSON(data);
	if(jokeData.error)
	{
		$("#errorUserMessage").append("<p>" + jokeData.error + "</p>");
	}
	else
	{
		window.location.href ="../jokes/jokelist";
	}
}

$(document).ready(function () {
    $('#formAddUser').validate({
        rules: {
        	username: { required: true, maxlength:10 },
            password: { required: true, maxlength:100 }
        },
        messages: {
        	username: {required: "Enter a username please", maxlength:"The username is too long"},
            password: {required: "Enter a password please", maxlength:"The password is too long"}
        }
    });
    
    //Override the submit event
	$( "#formAddUser" ).submit(function( event ) {
		event.preventDefault();
		if($( "#formAddUser" ).valid())
		{
			var $form = $( this );
			username = $("#inputNewUserName").val();
			password = $("#inputNewPassword").val();
			url = $form.attr( "action" );
			var posting = $.post( url, { user: username, password: password }, afterUserSubmittal );
		}
	});    
});