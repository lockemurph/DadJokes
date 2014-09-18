$(document).ready(function () {
    $('#formNewJoke').validate({
        rules: {
        	setup: { required: true, maxlength:2 },
            punchline: { required: true, maxlength:2 }
        },
        messages: {
        	setup: {required: "All jokes must have a setup", maxlength:"Your setup is too long."},
            punchline: {required: "All jokes must have a punchline", maxlength:"Your punchline is too long" }
        }
    });
});