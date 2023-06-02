$(document).ready(function() {

    var registrationError = $("#registration-error");

    var errorMsg = `
    <div class="alert alert-danger" role="alert">
        Something went wrong with your registration
    </div>`;

    var successMsg = `
    <div class="alert alert-success" role="alert">
        Registration completed
    </div>>`;

    var registrationSuccess = $("registration-success");

    $("#register-btn").on('click', function(e) {
        e.preventDefault();

        var firstName = $("#firstName").val();
        var lastName = $("#lastName").val();
        var birthday = $("#birthday").val();
        var email = $("#email").val();
        var password = $("#password").val();

        var user = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            birthday: birthday,
            password: password
        };



        $.ajax({
            url: "http://localhost:8080/api/v1/users",
            type: "POST",
            data: JSON.stringify(user),
            contentType: "application/json",
            success: function(response) {
                registrationError.append(successMsg);
            },
            error: function(xhr) {
                console.log("errorr");
                registrationError.append(errorMsg);
            }
        });
    });
});