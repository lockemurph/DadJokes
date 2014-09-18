$(document).ready(function () {
    $('#formAuthUser').validate({
        rules: {
        	username: { required: true, maxlength:10 },
            password: { required: true, maxlength:2 }
        },
        messages: {
        	username: {required: "Enter a username please", maxlength:"The username is too long"},
            password: {required: "Enter a password please", maxlength:"The password is too long"}
        }
    });
});