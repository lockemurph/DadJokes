var getLatestJoke = function() {
	$.get( "jokes/latest", function( theLatestJoke ) {
		$("#latestJoke").replaceWith(theLatestJoke);
	});
};


/**
 * Starts the loop that calls every 10 seconds to get the latest joke
 * on the front page
 */
$( document ).ready(function() {
	$.get( "jokes/latest", function( theLatestJoke ) {
		$("#latestJoke").replaceWith(theLatestJoke);
		setInterval(getLatestJoke, 10000);
	});	
});

