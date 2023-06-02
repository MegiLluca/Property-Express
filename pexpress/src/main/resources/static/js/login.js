$(document).ready(function() {

    var loginError = $("#login-error");

    var errorMsg = `
    <div class="alert alert-danger" role="alert">
        Something went wrong with your login
    </div>`;

    $("#login-btn").on('click', function(e) {
        e.preventDefault();

        var email = $("#login_email").val();
        var password = $("#login_password").val();

        var auth = {
            email: email,
            password: password
        };



        $.ajax({
            url: "http://localhost:8080/api/v1/users/login",
            type: "POST",
            data: JSON.stringify(auth),
            contentType: "application/json",
            success: function(response) {
                console.log(response)
            },
            error: function(xhr) {
                console.log(xhr);
                loginError.append(errorMsg);
            }
        });
    });
});